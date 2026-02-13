"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@/types";
import { useUser } from "@/hooks/use-user"; // We need to mock this hook or use mock data
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

export const MediaRoom = ({
    chatId,
    video,
    audio
}: MediaRoomProps) => {
    const { user } = useUser();
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!user?.username) return;

        (async () => {
            try {
                const resp = await fetch(
                    `/api/livekit/token?room=${chatId}&username=${user.username}`
                );
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [user?.username, chatId]); // Removed user dependence to avoid loops if user changes
    // Actually user.username is stable.

    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}
