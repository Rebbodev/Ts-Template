import { Interaction } from 'discord.js';

import { botClient } from '../../index';
import { DiscordEvent } from '../../types/event';
import {
    G_CreateAppCommand,
    G_DeleteAppCommand,
    G_EditAppCommand,
} from '../../util/functions';
import { GuildID, ScEnabled } from '../../util/settings.json';
import { SlashCommandsRaw } from './ArrayAttributes';
import { SlashRules } from './Rules';

export const E_SlashCommandRegister: DiscordEvent = {
    event: 'ready',
    run: async () => {
        const guild = botClient.guilds.cache.get(GuildID);
        const commands = await guild?.commands.fetch();

        if (!ScEnabled && commands) {
            for (const cmd of commands.values()) {
                G_DeleteAppCommand(cmd.name, botClient);
            }

            return;
        }

        for (const command of SlashCommandsRaw) {
            const cmd = commands?.find((x) => x.name === command.data.name);

            if (!cmd && !command.kill === true) {
                G_CreateAppCommand(command.data, botClient);
            } else if (command.kill === true) {
                await G_DeleteAppCommand(command.data.name, botClient);
            } else if (cmd && command.update === true) {
                await G_EditAppCommand(
                    command.data.name,
                    botClient,
                    command.data
                );
            }
        }

        if (!commands) return;

        for (const cmd of commands.values()) {
            const FOUND = SlashCommandsRaw.find(
                (x) => x.data.name === cmd.name
            );

            if (!FOUND) {
                G_DeleteAppCommand(cmd.name, botClient);
            }
        }
    },
};

// Interaction Listener
export const E_ApplicationCommandListener: DiscordEvent = {
    event: 'interactionCreate',
    run: async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const cmd = SlashCommandsRaw.find(
            (x) => x.data.name === interaction.commandName
        );

        if (!cmd) return;

        const permission = await SlashRules(interaction, cmd);

        if (!permission) return;

        await cmd.run(interaction);
    },
};
