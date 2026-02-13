"use client";

import { Fragment, useRef, ElementRef, useState } from "react";
import { format } from "date-fns";
import { Member, Message } from "@/types";
import { Loader2, ServerCrash } from "lucide-react";
import { ChatWelcome } from "./chat-welcome";
import { ChatItem } from "./chat-item";
import { useChatSocket } from "@/hooks/use-chat-socket";

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

export const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;

    // State for messages
    const [messages, setMessages] = useState<any[]>([
        { id: "1", content: "Hello world!", member: { profile: { name: "User 1", imageUrl: "" }, role: "ADMIN", id: "m1" }, createdAt: new Date().toISOString() },
        { id: "2", content: "Welcome to the server!", member: { profile: { name: "Bot", imageUrl: "" }, role: "GUEST", id: "m2" }, createdAt: new Date().toISOString() }
    ]);

    useChatSocket({
        queryKey,
        addKey,
        updateKey,
        setMessages
    });

    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!messages.length && (
                <div className="flex-1" />
            )}
            <ChatWelcome
                type={type}
                name={name}
            />
            <div className="flex flex-col-reverse mt-auto">
                {messages.map((message: any) => (
                    <ChatItem
                        key={message.id}
                        id={message.id}
                        currentMember={member}
                        member={message.member}
                        content={message.content}
                        fileUrl={message.fileUrl}
                        deleted={message.deleted}
                        timestamp={format(new Date(message.createdAt), "d MMM yyyy, HH:mm")}
                        isUpdated={message.updatedAt !== message.createdAt}
                        socketUrl={socketUrl}
                        socketQuery={socketQuery}
                    />
                ))}
            </div>
        </div>
    );
};
