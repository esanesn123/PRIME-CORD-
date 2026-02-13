"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                    Create an account
                </h2>
            </div>
            <form className="mt-8 space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label className="uppercase text-xs font-bold text-zinc-400">
                            Email
                        </Label>
                        <Input
                            className="bg-zinc-900/50 border-none focus-visible:ring-0 text-white mt-2"
                            type="email"
                        />
                    </div>
                    <div>
                        <Label className="uppercase text-xs font-bold text-zinc-400">
                            Username
                        </Label>
                        <Input
                            className="bg-zinc-900/50 border-none focus-visible:ring-0 text-white mt-2"
                            type="text"
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
                    </div>
                    <div>
                        <Label className="uppercase text-xs font-bold text-zinc-400">
                            Date of Birth
                        </Label>
                        <div className="flex gap-x-2 mt-2">
                            {/* Date selectors would go here */}
                            <Input
                                className="bg-zinc-900/50 border-none focus-visible:ring-0 text-white"
                                placeholder="DD"
                            />
                            <Input
                                className="bg-zinc-900/50 border-none focus-visible:ring-0 text-white"
                                placeholder="MM"
                            />
                            <Input
                                className="bg-zinc-900/50 border-none focus-visible:ring-0 text-white"
                                placeholder="YYYY"
                            />
                        </div>
                    </div>
                </div>
                <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
                    Continue
                </Button>
                <div className="text-sm text-zinc-400 mt-4">
                    <Link href="/login" className="text-sky-400 hover:underline">Already have an account?</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
