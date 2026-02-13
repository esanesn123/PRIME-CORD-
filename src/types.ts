export enum MemberRole {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    GUEST = "GUEST"
}

export enum ChannelType {
    TEXT = "TEXT",
    AUDIO = "AUDIO",
    VIDEO = "VIDEO"
}

// Simple types for now, matching our JSON structure
export type Server = {
    id: string;
    name: string;
    imageUrl: string;
    inviteCode: string;
    profileId: string;
    members: Member[];
    channels: Channel[];
}

export type Member = {
    id: string;
    profileId: string;
    role: MemberRole;
}

export type Channel = {
    id: string;
    name: string;
    type: ChannelType;
}

export type Message = {
    id: string;
    content: string;
    memberId: string;
    channelId: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    fileUrl: string | null;
    member: Member & { profile: any };
}
