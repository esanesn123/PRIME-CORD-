"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                    Welcome back!
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                    We're so excited to see you again!
                </p>
            </div>
            <form className="mt-8 space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label className="uppercase text-xs font-bold text-zinc-400">
                            Email or Phone Number
                        </Label>
                        <Input
                            className="bg-zinc-900/50 border-none focus-visible:ring-0 text-white mt-2"
                            type="email"
                        />
                    </div>
                    <div>
                        <Label className="uppercase text-xs font-bold text-zinc-400">
                            Password
                        </Label>
                        <Input
                            className="bg-zinc-900/50 border-none focus-visible:ring-0 text-white mt-2"
                            type="password"
                        />
                        <div className="text-xs text-sky-400 mt-2 hover:underline cursor-pointer">
                            Forgot your password?
                        </div>
                    </div>
                </div>
                <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
                    Log In
                </Button>
                <div className="text-sm text-zinc-400 mt-4">
                    Need an account? <Link href="/register" className="text-sky-400 hover:underline">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
