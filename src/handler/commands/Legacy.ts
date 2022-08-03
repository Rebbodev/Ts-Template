import { Message } from 'discord.js';

// Commands
import { L_HelpCommand } from '../../commands/legacy/help';
import { LegacyCommand } from '../../types/commands';
import { DiscordEvent } from '../../types/event';
import { LcEnabled, Prefix } from '../../util/settings.json';
import { LegacyRules } from './Rules';

const LegacyCommandsRaw: LegacyCommand[] = [L_HelpCommand];

export const LegacyCommandsObject: {
    [key: string]: LegacyCommand;
} = {};

const CategoryArray: string[] = [];

export const CategoryObjectArray: {
    category: string;
    cmds: string;
}[] = [];

for (const cmd of LegacyCommandsRaw) {
    LegacyCommandsObject[cmd.name] = cmd;

    if (cmd.category) {
        const alreadyRegistered = CategoryArray.includes(cmd.category);

        const syntax = cmd.syntax ? ` ${cmd.syntax}` : '';

        const CmdString = `\`${Prefix}${cmd.name}${syntax}\`\n*${cmd.description}*\n\n`;

        if (!alreadyRegistered) {
            CategoryArray.push(cmd.category);

            CategoryObjectArray.push({
                category: cmd.category,
                cmds: CmdString,
            });
        } else if (alreadyRegistered) {
            const object = CategoryObjectArray.find(
                (x) => x.category === cmd.category
            );

            if (object) object.cmds += CmdString;
        }
    }
}

// Message Listener
export const E_LegacyCommandListener: DiscordEvent = {
    event: 'messageCreate',
    run: async (message: Message) => {
        if (!message.content.startsWith(Prefix)) return;

        if (!LcEnabled) return;

        const Splitted: string[] | string = message.content.split(' ');
        const commandName = (Splitted.at(0) || '').slice(Prefix.length);

        const arguments_ = Splitted.slice(1);

        const cmd = LegacyCommandsObject[commandName];

        const permission = LegacyRules(message, cmd);

        if (!permission) return;

        if (!cmd) return;

        await cmd.run(message, arguments_);
    },
};
