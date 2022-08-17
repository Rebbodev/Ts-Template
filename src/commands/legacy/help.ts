import { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } from 'discord.js';

import { CategoryObjectArray } from '../../handler/commands/Legacy';
import { botClient } from '../../index';
import { LegacyCommand } from '../../types/commands';
import { Prefix } from '../../util/settings.json';

let fileName: string[] | string | undefined = __filename.split('\\');

fileName = (fileName.at(-1) || '').split('.');
fileName = fileName.at(0);

export const L_HelpCommand: LegacyCommand = {
    name: 'help',
    description: 'Help command for [Bot Name]',
    syntax: '[category]',
    run: async (message, arguments_) => {
        const DisplayEmbed = new EmbedBuilder()
            .setAuthor({
                name: 'Help Command Menu',
                iconURL: botClient.user?.displayAvatarURL(),
            })
            .setColor('#303434')
            .setFooter({
                text: `Requested by ${message.author.username}`,
                iconURL: message.author.displayAvatarURL(),
            });

        const SelectMenu = new SelectMenuBuilder()
            .setCustomId('L_HelpMenu')
            .setPlaceholder('Select a category');

        function MainEmbed() {
            let index = 0;

            while (index < CategoryObjectArray.length) {
                if (index % 2 !== 0) {
                    DisplayEmbed.addFields({
                        name: '\u200B',
                        value: '\u200B',
                        inline: true,
                    });
                }

                DisplayEmbed.addFields({
                    name: `${CategoryObjectArray[
                        index
                    ].category.toUpperCase()}`,
                    value: `\`${Prefix}${fileName} ${CategoryObjectArray[
                        index
                    ].category.toLocaleLowerCase()}\``,
                });
                SelectMenu.addOptions({
                    label: CategoryObjectArray[index].category,
                    value: `help_${CategoryObjectArray[
                        index
                    ].category.toLocaleLowerCase()}`,
                });
                index++;
            }
            const SelectRows =
                new ActionRowBuilder<SelectMenuBuilder>().addComponents(
                    SelectMenu
                );

            return message.reply({
                embeds: [DisplayEmbed],
                components: [SelectRows],
            });
        }

        if (!arguments_.at(0)) {
            return MainEmbed();
        }

        //If an argument exists and a category using that argument can be found
        const findCategory = CategoryObjectArray.find(
            (x) =>
                x.category.toLowerCase() ===
                (arguments_.at(0) || '').toLowerCase()
        );

        if (findCategory) {
            DisplayEmbed.setDescription(findCategory.cmds);

            message.reply({ embeds: [DisplayEmbed] });
        } else if (!findCategory) {
            MainEmbed();
        }
    },
};
