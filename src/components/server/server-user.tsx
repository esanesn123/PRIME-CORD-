"use client";

import { UserAvatar } from "@/components/user-avatar";
import { Headphones, Mic, Settings } from "lucide-react";

export const ServerUser = () => {
    // Mock user
    const user = {
        name: "Me",
        imageUrl: "",
        username: "me#1234"
    }

    return (
        <div className="flex items-center p-2 bg-[#232428] dark:bg-[#1E1F22]">
            <div className="flex items-center gap-x-2 w-full">
                <UserAvatar className="h-8 w-8 md:h-8 md:w-8" src={user.imageUrl} />
                <div className="flex flex-col">
                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition line-clamp-1">
                        {user.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition line-clamp-1">
                        {user.username}
                    </p>
                </div>
                <div className="flex items-center ml-auto gap-x-1">
                    <button className="hover:bg-zinc-700/50 p-1 rounded-md transition text-zinc-500 dark:text-zinc-400">
                        <Mic className="h-4 w-4" />
                    </button>
                    <button className="hover:bg-zinc-700/50 p-1 rounded-md transition text-zinc-500 dark:text-zinc-400">
                        <Headphones className="h-4 w-4" />
                    </button>
                    <button className="hover:bg-zinc-700/50 p-1 rounded-md transition text-zinc-500 dark:text-zinc-400">
                        <Settings className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
