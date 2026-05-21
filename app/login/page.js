"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-center">Log in</h1>
        <p className="text-zinc-400 text-center mb-6">
          Welcome back to KINO
        </p>

        <form className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-600 px-4 py-3 outline-none focus:border-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-600 px-4 py-3 outline-none focus:border-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-white text-black font-semibold py-3 hover:bg-zinc-200 transition"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-zinc-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}