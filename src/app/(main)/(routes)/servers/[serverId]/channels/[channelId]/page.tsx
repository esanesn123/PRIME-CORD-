import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MemberSidebar } from "@/components/server/member-sidebar";
import { MediaRoom } from "@/components/media-room";

interface ChannelPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelPage = async ({
    params
}: ChannelPageProps) => {
    const data = db.read();
    const server = data.servers.find((s: any) => s.id === params.serverId);
    const channel = server?.channels.find((c: any) => c.id === params.channelId);
    const member = server?.members.find((m: any) => m.profileId === "user-1") || { role: "ADMIN", id: "member-1", profileId: "user-1", profile: { name: "Me" } };

    if (!channel || !member) {
        redirect("/");
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full relative">
            <div className="flex h-full">
                <div className="flex flex-col flex-1 h-full min-w-0">
                    <ChatHeader
                        name={channel.name}
                        serverId={channel.serverId}
                        type="channel"
                    />
                    {channel.type === "TEXT" && (
                        <>
                            <ChatMessages
                                member={member}
                                name={channel.name}
                                chatId={channel.id}
                                type="channel"
                                apiUrl="/api/messages"
                                socketUrl="/api/socket/messages"
                                socketQuery={{
                                    channelId: channel.id,
                                    serverId: channel.serverId,
                                }}
                                paramKey="channelId"
                                paramValue={channel.id}
                            />
                            <ChatInput
                                name={channel.name}
                                type="channel"
                                apiUrl="/api/socket/messages"
                                query={{
                                    channelId: channel.id,
                                    serverId: channel.serverId,
                                }}
                            />
                        </>
                    )}
                    {channel.type === "AUDIO" && (
                        <MediaRoom
                            chatId={channel.id}
                            video={false}
                            audio={true}
                        />
                    )}
                    {channel.type === "VIDEO" && (
                        <MediaRoom
                            chatId={channel.id}
                            video={true}
                            audio={true}
                        />
                    )}
                </div>
                <div className="hidden md:flex w-60 z-20 flex-col inset-y-0 h-full bg-[#2B2D31]">
                    <MemberSidebar serverId={params.serverId} />
                </div>
            </div>
        </div>
    );
}

export default ChannelPage;
