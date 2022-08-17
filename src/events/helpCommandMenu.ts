import { EmbedBuilder, Interaction } from 'discord.js';

import { botClient } from '..';
import { CategoryObjectArray } from '../handler/commands/Legacy';
import { DiscordEvent } from '../types/event';

export const E_HelpMenu: DiscordEvent = {
    event: 'interactionCreate',
    run: async (interaction: Interaction) => {
        if (
            !interaction.isSelectMenu() ||
            interaction.customId !== 'L_HelpMenu'
        )
            return;

        let found = false;

        for (const object of CategoryObjectArray) {
            if (
                interaction.values.at(0) ===
                `help_${object.category.toLocaleLowerCase()}`
            ) {
                const DisplayEmbed = new EmbedBuilder()
                    .setAuthor({
                        name: 'Help Command Menu',
                        iconURL: botClient.user?.displayAvatarURL(),
                    })
                    .setColor('#303434')
                    .setDescription(object.cmds)
                    .setFooter({
                        text: `Requested by ${interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    });

                await interaction.deferUpdate();
                interaction.message.edit({
                    embeds: [DisplayEmbed],
                    components: [],
                });

                found = true;
            }
        }

        if (!found) {
            const notFoundEmbed = new EmbedBuilder().setDescription(
                '**The category no longer exists!**'
            );

            interaction.reply({ embeds: [notFoundEmbed], ephemeral: true });
        }
    },
};
