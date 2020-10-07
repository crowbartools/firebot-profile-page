type RestrictionType = "firebot:permissions";

export interface ProfileData {
    owner: string;
    chatter: string;
    profilePage: string;
    commands: {
        allowedCmds: Array<{
            trigger: string;
            description?: string;
            cooldown: {
                user?: number;
                global?: number;
            };
            permissions?: {
                roles: string[];
            };
            restrictionData?: {
                restrictions: Array<{
                    type: RestrictionType;
                    mode?: "roles" | "viewer";
                    roleIds?: string[];
                    username?: string;
                }>;
            };
            subCommands?: Array<{
                arg: string;
                description: string;
                usage: string;
            }>;
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
