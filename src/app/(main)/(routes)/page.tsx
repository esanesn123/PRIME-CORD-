import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CreateServerModal } from "@/components/modals/create-server-modal";

export default function Home() {
    const data = db.read();
    const server = data?.servers?.[0];

    if (server) {
        redirect(`/servers/${server.id}`);
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <p className="text-zinc-500 mb-4">You have not joined any servers yet.</p>
            {/* The modal is automatically mounted by the provider, but we can also trigger it here if needed */}
            {/* Actually, user can click the Plus button on the sidebar. */}
        </div>
    )
}
