import {NextResponse} from 'next/server';
import {connectDB} from '@/lib/mongodb';
import User from '@/models/User';

export const runtime = "nodejs";

export async function POST(request) {
    try {
        await connectDB();
        const {name, email, password} = await request.json();
        if (!name || !email || !password) {
            return NextResponse.json({success: false, message: "All fields are required"}, {status: 400});
        }
        const user = await User.create({name, email, password});

        return NextResponse.json({
            success: true,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
         }, {status: 201});
    }catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({success: false, message: "Email already exists"}, {status: 400});
        }
        return NextResponse.json({success: false, message: error.message}, {status: 500});
    }
}
