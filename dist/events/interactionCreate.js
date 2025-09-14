"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const logger_1 = require("../utils/logger");
const embed_1 = require("../structures/embed");
exports.default = {
    name: discord_js_1.Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand())
            return;
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            logger_1.logger.warn(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        if (command.ownerOnly && !client.owners.includes(interaction.user.id)) {
            await interaction.reply({
                embeds: [(0, embed_1.createErrorEmbed)('Este comando é apenas para proprietários do bot.')],
                ephemeral: true,
            });
            return;
        }
        if (command.guildOnly && !interaction.guild) {
            await interaction.reply({
                embeds: [(0, embed_1.createErrorEmbed)('Este comando só pode ser usado em servidores.')],
                ephemeral: true,
            });
            return;
        }
        if (command.nsfw && interaction.channel && 'nsfw' in interaction.channel && !interaction.channel.nsfw) {
            await interaction.reply({
                embeds: [(0, embed_1.createErrorEmbed)('Este comando só pode ser usado em canais NSFW.')],
                ephemeral: true,
            });
            return;
        }
        if (command.permissions && interaction.guild && interaction.member) {
            const memberPermissions = interaction.member.permissions;
            const hasPermissions = command.permissions.every(permission => memberPermissions.has(permission));
            if (!hasPermissions) {
                await interaction.reply({
                    embeds: [(0, embed_1.createErrorEmbed)('Você não tem permissões suficientes para usar este comando.')],
                    ephemeral: true,
                });
                return;
            }
        }
        if (command.cooldown) {
            const cooldowns = client.cooldowns.get(command.name);
            const now = Date.now();
            const cooldownAmount = command.cooldown * 1000;
            if (cooldowns?.has(interaction.user.id)) {
                const expirationTime = cooldowns.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    await interaction.reply({
                        embeds: [(0, embed_1.createErrorEmbed)(`Aguarde ${timeLeft.toFixed(1)} segundos antes de usar este comando novamente.`)],
                        ephemeral: true,
                    });
                    return;
                }
            }
            cooldowns?.set(interaction.user.id, now);
            setTimeout(() => cooldowns?.delete(interaction.user.id), cooldownAmount);
        }
        try {
            await command.execute(interaction, client);
            logger_1.logger.debug(`${interaction.user.tag} used command: ${interaction.commandName}`);
        }
        catch (error) {
            logger_1.logger.error(`Error executing command ${interaction.commandName}:`, error);
            const errorEmbed = (0, embed_1.createErrorEmbed)('Houve um erro ao executar este comando. Os desenvolvedores foram notificados.');
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            }
            else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
};
//# sourceMappingURL=interactionCreate.js.map