import { HandlerSyntax } from '../../types/handler';

export const processOn: HandlerSyntax = {
    run: async () => {
        process.on('unhandledRejection', () => {});
        process.on('uncaughtException', () => {});
        process.on('uncaughtExceptionMonitor', () => {});
    },
};
