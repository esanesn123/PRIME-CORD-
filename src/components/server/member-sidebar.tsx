import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ServerMember } from "@/components/server/server-member";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ServerSection } from "@/components/server/server-section";
import { MemberRole } from "@/types";

interface MemberSidebarProps {
    serverId: string;
}

export const MemberSidebar = async ({
    serverId
}: MemberSidebarProps) => {
    const data = db.read();
    const server = data.servers.find((s: any) => s.id === serverId);

    if (!server) {
        return redirect("/");
    }

    const members = server.members.filter((member: any) => member.profileId !== "user-1"); // Filter logic to be improved
    // For now just show all members
    const allMembers = server.members;

    // Group by role?
    const admins = allMembers.filter((member: any) => member.role === MemberRole.ADMIN);
    const moderators = allMembers.filter((member: any) => member.role === MemberRole.MODERATOR);
    const guests = allMembers.filter((member: any) => member.role === MemberRole.GUEST);

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ScrollArea>
                <div className="mt-2 px-3">
                    {!!admins?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="members"
                                role={MemberRole.ADMIN}
                                label={`Admins - ${admins.length}`}
                                server={server}
                            />
                            {admins.map((member: any) => (
                                <ServerMember
                                    key={member.id}
                                    member={member}
                                    server={server}
                                />
                            ))}
                        </div>
                    )}
                    {!!moderators?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="members"
                                role={MemberRole.ADMIN} // Only admins can manage members
                                label={`Moderators - ${moderators.length}`}
                                server={server}
                            />
                            {moderators.map((member: any) => (
                                <ServerMember
                                    key={member.id}
                                    member={member}
                                    server={server}
                                />
                            ))}
                        </div>
                    )}
                    {!!guests?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="members"
                                role={MemberRole.ADMIN}
                                label={`Members - ${guests.length}`}
                                server={server}
                            />
                            {guests.map((member: any) => (
                                <ServerMember
                                    key={member.id}
                                    member={member}
                                    server={server}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
