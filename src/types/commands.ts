import {
    ChatInputApplicationCommandData,
    ChatInputCommandInteraction,
    Message,
} from 'discord.js';

export type SlashCommand = {
    data: ChatInputApplicationCommandData;
    path?: string;
    kill?: boolean;
    update?: boolean;
    requiredRoles?: { roles: string[]; admin?: boolean };
    // eslint-disable-next-line unused-imports/no-unused-vars
    run: (interaction: ChatInputCommandInteraction) => Promise<any>;
};

export type LegacyCommand = {
    name: string;
    description: string;
    category?: string;
    syntax?: string;
    path?: string;
    requiredRoles?: { roles: string[]; admin?: boolean };
    // eslint-disable-next-line unused-imports/no-unused-vars
    run: (message: Message, arguments_: string[]) => Promise<any>;
};
