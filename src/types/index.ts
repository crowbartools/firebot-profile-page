type RestrictionType = "firebot:permissions";

export type Restriction = {
    type: RestrictionType;
    mode?: "roles" | "viewer";
    roleIds?: string[];
    username?: string;
};

export type Command = {
    active: boolean;
    trigger: string;
    description?: string;
    usage?: string;
    baseCommandDescription?: string;
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
    fallbackSubcommand?: Subcommand;
};

export type Subcommand = { arg: string; regex: boolean } & Omit<
    Partial<Command>,
    "subCommands" | "trigger" | "fallbackSubcommand"
>;

export interface ProfileData {
    owner: string;
    chatter: string;
    profilePage: "commands" | "quotes";
    commands: {
        allowedCmds: Command[];
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
