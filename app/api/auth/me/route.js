import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export const runtime = "nodejs";