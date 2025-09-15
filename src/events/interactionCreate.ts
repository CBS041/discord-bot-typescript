import { Events, ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';

import { ExtendedClient } from '../structures/client';
import { logger } from '../utils/logger';
import { createErrorEmbed } from '../structures/embed';

export default {
  name: Events.InteractionCreate,
  async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      logger.warn(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    // Check if command is owner only
    if (command.ownerOnly && !client.owners.includes(interaction.user.id)) {
      await interaction.reply({
        embeds: [createErrorEmbed('Este comando é apenas para proprietários do bot.')],
        ephemeral: true,
      });
      return;
    }

    // Check if command is guild only
    if (command.guildOnly && !interaction.guild) {
      await interaction.reply({
        embeds: [createErrorEmbed('Este comando só pode ser usado em servidores.')],
        ephemeral: true,
      });
      return;
    }

    // Check NSFW
    if (command.nsfw && interaction.channel && 'nsfw' in interaction.channel && !interaction.channel.nsfw) {
      await interaction.reply({
        embeds: [createErrorEmbed('Este comando só pode ser usado em canais NSFW.')],
        ephemeral: true,
      });
      return;
    }

    // Check permissions
    if (command.permissions && interaction.guild && interaction.member) {
      const memberPermissions = interaction.member.permissions as PermissionsBitField;
      const hasPermissions = command.permissions.every(permission =>
        memberPermissions.has(permission)
      );

      if (!hasPermissions) {
        await interaction.reply({
          embeds: [createErrorEmbed('Você não tem permissões suficientes para usar este comando.')],
          ephemeral: true,
        });
        return;
      }
    }

    // Check cooldown
    if (command.cooldown) {
      const cooldowns = client.cooldowns.get(command.name);
      const now = Date.now();
      const cooldownAmount = command.cooldown * 1000;

      if (cooldowns?.has(interaction.user.id)) {
        const expirationTime = cooldowns.get(interaction.user.id)! + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          await interaction.reply({
            embeds: [createErrorEmbed(
              `Aguarde ${timeLeft.toFixed(1)} segundos antes de usar este comando novamente.`
            )],
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
      logger.debug(`${interaction.user.tag} used command: ${interaction.commandName}`);
    } catch (error) {
      logger.error(`Error executing command ${interaction.commandName}:`, error);
      
      const errorEmbed = createErrorEmbed(
        'Houve um erro ao executar este comando. Os desenvolvedores foram notificados.'
      );

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
      } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    }
  },
};