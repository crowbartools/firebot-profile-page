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
            createdAt: string;
            creator: string;
            game: string;
            originator: string;
            text: string;
        }>;
    };
}
