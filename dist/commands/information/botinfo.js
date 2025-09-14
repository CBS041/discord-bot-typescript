"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
require("moment-duration-format");
const embed_1 = require("../../structures/embed");
exports.default = {
    name: 'botinfo',
    description: 'Veja informações sobre o bot',
    category: 'Information',
    aliases: ['info', 'stats'],
    cooldown: 10,
    data: new discord_js_1.SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Veja informações sobre o bot'),
    async execute(interaction, client) {
        const uptime = moment_1.default.duration(client.uptime || 0).format('d[d] h[h] m[m] s[s]');
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const embed = new embed_1.CustomEmbedBuilder()
            .setTitle('🤖 Informações do Bot')
            .setThumbnail(client.user?.displayAvatarURL({ size: 256 }) || null)
            .addFields({
            name: '📊 Estatísticas',
            value: [
                `**Servidores:** ${client.guilds.cache.size}`,
                `**Usuários:** ${client.users.cache.size}`,
                `**Comandos:** ${client.commands.size}`,
                `**Canais:** ${client.channels.cache.size}`,
            ].join('\n'),
            inline: true,
        }, {
            name: '⚙️ Sistema',
            value: [
                `**Node.js:** ${process.version}`,
                `**Discord.js:** v${discord_js_1.version}`,
                `**Uptime:** ${uptime}`,
                `**Memória:** ${memoryUsage} MB`,
            ].join('\n'),
            inline: true,
        }, {
            name: '👨‍💻 Desenvolvedor',
            value: [
                `**Criado por:** Cassiano`,
                `**Linguagem:** TypeScript`,
                `**Criado em:** <t:${Math.floor(client.user?.createdTimestamp / 1000)}:D>`,
            ].join('\n'),
            inline: false,
        })
            .setFooter({
            text: `Latência: ${client.ws.ping}ms`,
            ...(client.user?.displayAvatarURL({ size: 32 }) && {
                iconURL: client.user.displayAvatarURL({ size: 32 })
            })
        });
        await interaction.reply({ embeds: [embed] });
    },
};
//# sourceMappingURL=botinfo.js.map