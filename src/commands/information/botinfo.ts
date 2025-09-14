import { ChatInputCommandInteraction, SlashCommandBuilder, version } from 'discord.js';
import moment from 'moment';
import 'moment-duration-format';

import { Command } from '../../structures/interfaces';
import { ExtendedClient } from '../../structures/client';
import { CustomEmbedBuilder } from '../../structures/embed';

export default {
  name: 'botinfo',
  description: 'Veja informações sobre o bot',
  category: 'Information',
  aliases: ['info', 'stats'],
  cooldown: 10,
  
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Veja informações sobre o bot'),

  async execute(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
    const uptime = moment.duration(client.uptime || 0).format('d[d] h[h] m[m] s[s]');
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    
    const embed = new CustomEmbedBuilder()
      .setTitle('🤖 Informações do Bot')
      .setThumbnail(client.user?.displayAvatarURL({ size: 256 }) || null)
      .addFields(
        {
          name: '📊 Estatísticas',
          value: [
            `**Servidores:** ${client.guilds.cache.size}`,
            `**Usuários:** ${client.users.cache.size}`,
            `**Comandos:** ${client.commands.size}`,
            `**Canais:** ${client.channels.cache.size}`,
          ].join('\n'),
          inline: true,
        },
        {
          name: '⚙️ Sistema',
          value: [
            `**Node.js:** ${process.version}`,
            `**Discord.js:** v${version}`,
            `**Uptime:** ${uptime}`,
            `**Memória:** ${memoryUsage} MB`,
          ].join('\n'),
          inline: true,
        },
        {
          name: '👨‍💻 Desenvolvedor',
          value: [
            `**Criado por:** Cassiano`,
            `**Linguagem:** TypeScript`,
            `**Criado em:** <t:${Math.floor(client.user?.createdTimestamp! / 1000)}:D>`,
          ].join('\n'),
          inline: false,
        }
      )
      .setFooter({
        text: `Latência: ${client.ws.ping}ms`,
        ...(client.user?.displayAvatarURL({ size: 32 }) && {
          iconURL: client.user.displayAvatarURL({ size: 32 })
        })
      });

    await interaction.reply({ embeds: [embed] });
  },
} satisfies Command;