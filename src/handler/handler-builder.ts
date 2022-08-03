import { HandlerSyntax } from '../types/handler';
import { eventsBuilder } from './commands/Events';
import { processOn } from './index/process';

export const builder = async () => {
    const HandlerList: HandlerSyntax[] = [processOn];

    eventsBuilder();

    for (const build of HandlerList) {
        await build.run();
    }
};
