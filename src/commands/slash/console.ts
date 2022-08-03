import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from 'discord.js';

import { SlashCommand } from '../../types/commands';

export const S_ConsoleCommand: SlashCommand = {
    data: {
        name: 'console',
        description: 'Logs a value in the console',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'log',
                description: 'the value that is logged',
                required: true,
            },
        ],
        type: ApplicationCommandType.ChatInput,
    },
    run: async (interaction) => {
        console.log(interaction.options.getString('log'));
    },
};
