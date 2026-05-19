import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";
import { AUTH_COOKIE_NAME, createAuthToken} from "@/lib/auth";