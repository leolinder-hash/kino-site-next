import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";
import { AUTH_COOKIE_NAME, createAuthToken} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
    try{
        let body;
        try{
            body = await request.json();
        }catch{
            return NextResponse.json({
                success: false,
                message: "Invalid JSON body",
            },
            {status: 400}
            );
        }
        const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
        const password = typeof body.password === "string" ? body.password : "";

        const errors = {};
        if(!username){
            errors.username = "Username is required";
        }
        if(!password){
            errors.password = "Password is required";
        }
        if(Object.keys(errors).length > 0){
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                errors,
            },
            {status: 400}
            );
        }
        await connectDB();
        const user = await User.findOne({username}).select("+password username email");
        if(!user){
            return NextResponse.json({
                success: false,
                message: "Invalid username or password",
            },
            {status: 401}
            );
        }

        const passwordMatches = await user.comparePassword(password);
        if(!passwordMatches){
            return NextResponse.json({
                success: false,
                message: "Invalid username or password",
            },
            {status: 401}
            );
        }
        const token = createAuthToken(user);
        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            redirectTo: "/",
        },
        {status: 200}
    );
        response.cookies.set(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60*60*24*7, 
        });
        return response;
    }catch(error){
        return NextResponse.json({
            success: false,
            message: "An error occurred during login",
        },
        {status: 500}
        );
    }
}