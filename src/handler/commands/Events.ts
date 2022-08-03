import { botClient } from '../..';
import { EventsRaw } from './ArrayAttributes';

export const eventsBuilder = () => {
    for (const event of EventsRaw) {
        botClient.on(event.event, event.run);
    }
};
