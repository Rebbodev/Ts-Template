import { ChatInputApplicationCommandData, Client } from 'discord.js';

import { GuildID } from '../util/settings.json';

export function G_CreateAppCommand(
    data: ChatInputApplicationCommandData,
    client: Client
) {
    const guild = client.guilds.cache.get(GuildID);

    guild?.commands.create(data);

    console.log(`..${data.name} Application command has been created!`);
}

export async function G_DeleteAppCommand(name: string, client: Client) {
    const guild = client.guilds.cache.get(GuildID);

    const commands = await guild?.commands.fetch();
    const command = commands?.find((x) => x.name === name);

    if (command) guild?.commands.delete(command.id);

    console.log(`..${name} Application command has been removed!`);
}

export async function G_EditAppCommand(
    name: string,
    client: Client,
    data: ChatInputApplicationCommandData
) {
    const guild = client.guilds.cache.get(GuildID);
    const commands = await guild?.commands.fetch();

    const command = commands?.find((x) => x.name === name);

    if (command)
        guild?.commands
            .delete(command.id)
            .then(() => guild?.commands.create(data));

    console.log(`..${name} Application command has been edited`);
}
