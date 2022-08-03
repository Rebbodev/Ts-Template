import { ClientEvents } from 'discord.js';

export type DiscordEvent = {
    event: keyof ClientEvents;
    // eslint-disable-next-line unused-imports/no-unused-vars
    run: (...arguments_: any[]) => Promise<void>;
};

// my_long_sentence snake_case (database keys and python)
// myLongSentence camelCase (variables)
// MyLongSentence PascalCase (Classes and types)
// MYLONGSENTENCE SCREAMINGCASE (Constants)
