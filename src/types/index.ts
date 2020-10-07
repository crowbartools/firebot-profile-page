type RestrictionType = "firebot:permissions";

export type Restriction = {
    type: RestrictionType;
    mode?: "roles" | "viewer";
    roleIds?: string[];
    username?: string;
};

export type Command = {
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
        restrictions: Restriction[];
    };
    subCommands?: Subcommand[];
};

export type Subcommand = { arg: string; regex: boolean } & Omit<
    Partial<Command>,
    "subCommands" | "trigger"
>;

export interface ProfileData {
    owner: string;
    chatter: string;
    profilePage: "commands" | "quotes";
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
                restrictions: Restriction[];
            };
            subCommands?: Array<{
                arg: string;
                description: string;
                usage: string;
                regex: boolean;
                active: boolean;
                restrictionData?: {
                    restrictions: Restriction[];
                };
                cooldown: {
                    user?: number;
                    global?: number;
                };
                permissions?: {
                    roles: string[];
                };
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
