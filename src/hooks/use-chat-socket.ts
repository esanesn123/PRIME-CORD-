import { useEffect } from "react";
import { useSocket } from "@/components/providers/socket-provider";
import { Message } from "@/types";

type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
    setMessages: (messages: any) => void; // Simple state setter
}

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey,
    setMessages
}: ChatSocketProps) => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on(updateKey, (message: Message) => {
            setMessages((prev: any) => {
                // Update logic
                return prev.map((msg: any) => msg.id === message.id ? message : msg);
            });
        });

        socket.on(addKey, (message: Message) => {
            setMessages((prev: any) => {
                return [message, ...prev];
            })
        });

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        }
    }, [socket, addKey, updateKey, setMessages]);
}
