//Commands and Events
import { S_ConsoleCommand } from '../../commands/slash/console';
import { E_ClientReady } from '../../events/ready';
import { SlashCommand } from '../../types/commands';
import { DiscordEvent } from '../../types/event';
import { E_LegacyCommandListener } from './Legacy';
import { E_ApplicationCommandListener, E_SlashCommandRegister } from './Slash';

export const SlashCommandsRaw: SlashCommand[] = [S_ConsoleCommand];
export const EventsRaw: DiscordEvent[] = [
    E_LegacyCommandListener,
    E_SlashCommandRegister,
    E_ApplicationCommandListener,
    E_ClientReady,
];
