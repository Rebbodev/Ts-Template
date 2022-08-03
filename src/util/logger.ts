import { createLogger, shimLog } from '@lvksh/logger';
import { blueBright, cyan, redBright, yellowBright } from 'colorette';

export const logger = createLogger(
    {
        debug: cyan('[DEBUG]'),
        info: blueBright('[INFO]'),
        warning: yellowBright('[WARNING]'),
        error: redBright('[ERROR]'),
    },
    {
        divider: '> ',
        padding: 'NONE',
    }
);

// replaces: console.log() => logger.debug
shimLog(logger, 'debug');
