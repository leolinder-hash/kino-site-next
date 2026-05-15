import {NextResponse} from 'next/server';
import {connectDB} from '@/lib/mongodb';
import User from '@/models/User';

export const runtime = "nodejs";

function isValidEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}

function isValidUsername(username) {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

function isStrongPassword(password) {
    return(
        typeof password === "string" &&
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^a-zA-Z0-9]/.test(password)
    );
}

export async function POST(request) {
    try{
        let body;
        try {
            body = await request.json();
        }catch{
            return NextResponse.json({
                success: false,
                message: "Invalid JSON body",
            },
             {status: 400});
        }
        const {username, email, password} = body;
        
        const errors = {};
        if(!username){
            errors.username = "Username is required";
        }else if(!isValidUsername(username)){
            errors.username = "Username must be 3-20 characters and can only contain letters, numbers, and underscores";
        }
        if(!email){
            errors.email = "Email is required";
        }else if(!isValidEmail(email)){
            errors.email = "Please use a valid email address";
        }
        if(!password){
            errors.password = "Password is required";
        }else if(!isStrongPassword(password)){
            errors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
        }
        if(Object.keys(errors).length > 0){
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                errors,
            },
             {status: 400});
        }
        await connectDB();

        const normalizedUsername = username.trim().toLowerCase();
        const normalizedEmail = email.trim().toLowerCase();
        
        const existingUser = await User.findOne({
            $or: [{username: normalizedUsername}, {email: normalizedEmail}],
        })
        .select("username email")
        .lean();
        if(existingUser?.username === normalizedUsername){
            return NextResponse.json({
                success: false,
                message: "Username is already taken",
                errors: {username: "Username is already taken",},
            },
             {status: 409});
        }
        if(existingUser?.email === normalizedEmail){
            return NextResponse.json({
                success: false,
                message: "Email is already registered",
                errors: {email: "Email is already registered",},
            },
             {status: 409});
        }
        const user = await User.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password,
        });
        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        },
         {status: 201});
    }catch(error){
        if(error.code === 11000){
            const duplicatedField = Object.keys(error.keyPattern || {})[0];
            return NextResponse.json({
                success: false,
                message:`${duplicatedField} already exists`,
                errors: {[duplicatedField]: `${duplicatedField} already exists`},
            },
            {status: 409}
            );
        }
        return NextResponse.json({
            success: false,
            message: "An error occurred while registering the user",
        },
         {status: 500});
    }
}