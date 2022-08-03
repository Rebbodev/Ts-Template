import {
    ActivityType,
    Client,
    GatewayIntentBits,
    PresenceData,
} from 'discord.js';
import { config } from 'dotenv';

import { builder } from './handler/handler-builder';
import { logger } from './util/logger';

config();

const presenceList: PresenceData[] = [
    {
        status: 'online',
        activities: [{ name: 'for command', type: ActivityType.Watching }],
    },
    {
        status: 'online',
        activities: [
            { name: 'to your messages', type: ActivityType.Listening },
        ],
    },
];

const presence = presenceList[Math.floor(Math.random() * presenceList.length)];

export const botClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
    ],
    presence,
});

const logArray = [
    'Application is beginning',
    'A new client has been created',
    'Building the environment',
];

logger.info(...logArray);

builder();

logger.info('Authorizing application token');

(async () => {
    await botClient
        .login(process.env.TOKEN)
        .catch((error) => console.log(error));

    logger.info('Application token successfully authorized');
})();
