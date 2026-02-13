import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        // Mock User ID for now (simulating logged in user)
        const userId = "user-1";

        if (!name || !imageUrl) {
            return new NextResponse("Missing data", { status: 400 });
        }

        const data = db.read();

        const newServer = {
            id: uuidv4(),
            name,
            imageUrl,
            inviteCode: uuidv4(),
            profileId: userId,
            channels: [
                { id: uuidv4(), name: "general", type: "TEXT" }
            ],
            members: [
                { id: uuidv4(), profileId: userId, role: "ADMIN" }
            ]
        };

        data.servers.push(newServer);
        db.write(data);

        return NextResponse.json(newServer);

    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
