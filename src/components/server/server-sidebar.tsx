import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@/types"; // We need to define types or just use any
import { db } from "@/lib/db";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ServerSearch } from "./server-search";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

interface ServerSidebarProps {
    serverId: string;
}

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const data = db.read();
    const server = data.servers.find((s: any) => s.id === serverId);

    if (!server) {
        return redirect("/");
    }

    const textChannels = server.channels.filter((channel: any) => channel.type === "TEXT");
    const audioChannels = server.channels.filter((channel: any) => channel.type === "AUDIO");
    const videoChannels = server.channels.filter((channel: any) => channel.type === "VIDEO");

    // Mock members filter (using self as role? or just listing members)
    const members = server.members.filter((member: any) => member.profileId !== "user-1");
    // const role = server.members.find((member: any) => member.profileId === "user-1")?.role;
    const role = "ADMIN"; // Hardcoded for prototype

    const iconMap = {
        ["TEXT"]: <Hash className="mr-2 h-4 w-4" />,
        ["AUDIO"]: <Mic className="mr-2 h-4 w-4" />,
        ["VIDEO"]: <Video className="mr-2 h-4 w-4" />
    }

    const roleIconMap = {
        ["GUEST"]: null,
        ["MODERATOR"]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
        ["ADMIN"]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
    }

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader server={server} role={role} />
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ServerSearch
                        data={[
                            {
                                label: "Text Channels",
                                type: "channel",
                                data: textChannels?.map((channel: any) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type as keyof typeof iconMap],
                                }))
                            },
                            {
                                label: "Voice Channels",
                                type: "channel",
                                data: audioChannels?.map((channel: any) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type as keyof typeof iconMap],
                                }))
                            },
                            {
                                label: "Video Channels",
                                type: "channel",
                                data: videoChannels?.map((channel: any) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type as keyof typeof iconMap],
                                }))
                            },
                            {
                                label: "Members",
                                type: "member",
                                data: members?.map((member: any) => ({
                                    id: member.id,
                                    name: member.profileId, // Mock name
                                    icon: roleIconMap[member.role as keyof typeof roleIconMap],
                                }))
                            },
                        ]}
                    />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType="TEXT"
                            role={role}
                            label="Text Channels"
                        />
                        <div className="space-y-[2px]">
                            {textChannels.map((channel: any) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    role={role}
                                    server={server}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType="AUDIO"
                            role={role}
                            label="Voice Channels"
                        />
                        <div className="space-y-[2px]">
                            {audioChannels.map((channel: any) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    role={role}
                                    server={server}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType="VIDEO"
                            role={role}
                            label="Video Channels"
                        />
                        <div className="space-y-[2px]">
                            {videoChannels.map((channel: any) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    role={role}
                                    server={server}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Members list is typically in the right sidebar, but I can put it here if needed. 
             But Discord has it on the right. 
             I will OMIT members from here to follow Discord. */}
            </ScrollArea>
        </div>
    );
};
