export interface ProfileData {
    owner: string;
    chatter: string;
    profilePage: string;
    commands: {
        allowedCmds: Array<{
            trigger: string;
            description?: string;
        }>;
    };
    quotes: {
        quotes: Array<{
            _id: number;
            createdAt: string;
            creator: string;
            game: string;
            originator: string;
            text: string;
        }>;
    };
}

export interface ChannelInfo {
    userId: string;
    username: string;
    displayName: string;
    profilePicUrl: string;
    isLive: boolean;
    description: string;
}
