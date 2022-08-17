import { EmbedBuilder, Interaction, Message } from 'discord.js';

import { LegacyCommand, SlashCommand } from '../../types/commands';

export const LegacyRules = (message: Message, cmd: LegacyCommand) => {
    let perm = true;
    let reasons = '';

    // Roles Required Rule
    let RequiredRolesPerm = false;

    if (cmd.requiredRoles) {
        for (const role of cmd.requiredRoles.roles) {
            if (message.member?.roles.cache.has(role)) RequiredRolesPerm = true;
        }

        if (
            !RequiredRolesPerm &&
            cmd.requiredRoles.admin &&
            message.member?.permissions.has('Administrator')
        )
            RequiredRolesPerm = true;

        if (!RequiredRolesPerm)
            reasons += 'You do not have the required roles for this command!\n';
    } else if (!cmd.requiredRoles) {
        RequiredRolesPerm = true;
    }

    if (!RequiredRolesPerm) perm = false;

    if (!perm) {
        const embed = new EmbedBuilder()
            .setTitle('Command Failed')
            .setDescription(`**Reasons:**\n${reasons}`)
            .setColor('#303434');

        message.reply({ embeds: [embed] });
    }

    return perm;
};

export const SlashRules = async (
    interaction: Interaction,
    cmd: SlashCommand
    // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
    let perm = true;
    let reasons = '';

    let RequiredRolesPerm = false;

    if (cmd.requiredRoles) {
        if (interaction.member && interaction.inCachedGuild()) {
            for (const role of cmd.requiredRoles.roles) {
                if (interaction.member.roles.cache.has(role))
                    RequiredRolesPerm = true;
            }
        }

        if (
            !RequiredRolesPerm &&
            cmd.requiredRoles.admin &&
            interaction.inCachedGuild() &&
            interaction.member?.permissions.has('Administrator')
        )
            RequiredRolesPerm = true;

        if (!RequiredRolesPerm)
            reasons += 'You do not have the required roles for this command!\n';
    }

    if (!cmd.requiredRoles) RequiredRolesPerm = true;

    if (!RequiredRolesPerm) perm = false;

    if (!perm && interaction.isChatInputCommand()) {
        const embed = new EmbedBuilder()
            .setTitle('Command Failed')
            .setDescription(`**Reasons:**\n${reasons}`)
            .setColor('#303434');

        await interaction.reply({ embeds: [embed] });
    }

    return perm;
};
