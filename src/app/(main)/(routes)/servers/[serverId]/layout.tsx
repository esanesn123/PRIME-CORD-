import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { serverId: string };
}) => {
    const data = db.read();
    const server = data.servers.find((s: any) => s.id === params.serverId);

    if (!server) {
        return redirect("/");
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    );
}

export default ServerIdLayout;
