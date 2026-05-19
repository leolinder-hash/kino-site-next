import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
        if(!token){
            return NextResponse.json({
                success: false,
                message: "Not authenticated",
            },
            {status: 401}
            );
        }
        const payload = verifyAuthToken(token);
        if(!payload){
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token",
            },
            {status: 401}
            );
        }
        await connectDB();
        const user = await User.findById(payload.userId).select("username email").lean();
        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found",
            },
            {status: 401}
            );
        }
        return NextResponse.json({
            success: true,
            user: {
                id:user._id,
                username: user.username,
                email: user.email,
            },
        },
        {status: 200}
        );
    }catch(error){
        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching user data",
        },
        {status: 500}
        );
    }
}