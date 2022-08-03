import { DiscordEvent } from '../types/event';
import { logger } from '../util/logger';

export const E_ClientReady: DiscordEvent = {
    event: 'ready',
    run: async () => {
        logger.info('The application has started');
    },
};
