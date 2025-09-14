"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const embed_1 = require("../../structures/embed");
exports.default = {
    name: 'help',
    description: 'Veja o painel de ajuda do bot',
    category: 'Information',
    aliases: ['ajuda'],
    cooldown: 5,
    data: new discord_js_1.SlashCommandBuilder()
        .setName('help')
        .setDescription('Veja o painel de ajuda do bot')
        .addStringOption(option => option
        .setName('comando')
        .setDescription('Comando específico para obter informações')
        .setRequired(false)),
    async execute(interaction, client) {
        const commandName = interaction.options.getString('comando');
        if (commandName) {
            const command = client.commands.get(commandName) ||
                client.commands.get(client.aliases.get(commandName) || '');
            if (!command) {
                const embed = new embed_1.CustomEmbedBuilder()
                    .setErrorColor()
                    .setTitle('❌ Comando não encontrado')
                    .setDescription(`O comando \`${commandName}\` não foi encontrado.`);
                await interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }
            const embed = new embed_1.CustomEmbedBuilder()
                .setTitle(`📖 Ajuda - ${command.name}`)
                .setDescription(command.description)
                .addFields({ name: '📂 Categoria', value: command.category, inline: true }, { name: '⏱️ Cooldown', value: `${command.cooldown || 0}s`, inline: true }, { name: '🔒 Apenas Proprietário', value: command.ownerOnly ? 'Sim' : 'Não', inline: true });
            if (command.aliases && command.aliases.length > 0) {
                embed.addFields({ name: '🔗 Aliases', value: command.aliases.join(', '), inline: false });
            }
            if (command.permissions && command.permissions.length > 0) {
                embed.addFields({
                    name: '🛡️ Permissões Necessárias',
                    value: command.permissions.join(', '),
                    inline: false
                });
            }
            await interaction.reply({ embeds: [embed] });
            return;
        }
        const categories = [...new Set(client.commands.map(cmd => cmd.category))];
        const mainEmbed = new embed_1.CustomEmbedBuilder()
            .setTitle('📚 Central de Ajuda')
            .setDescription('Bem-vindo à central de ajuda! Selecione uma categoria abaixo para ver os comandos disponíveis.\n\n' +
            `**Total de comandos:** ${client.commands.size}\n` +
            `**Categorias disponíveis:** ${categories.length}`)
            .addFields({ name: '💡 Dica', value: 'Use `/help comando:<nome>` para informações específicas de um comando.', inline: false }, { name: '🔗 Links', value: '[Suporte](https://discord.gg/example) • [Convite](https://discord.com/oauth2/authorize)', inline: false })
            .setThumbnail(client.user?.displayAvatarURL({ size: 256 }) || null);
        const selectMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId('help_category')
            .setPlaceholder('Selecione uma categoria')
            .addOptions(categories.map(category => ({
            label: category,
            value: category,
            description: `Ver comandos da categoria ${category}`,
            emoji: getCategoryEmoji(category),
        })));
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(selectMenu);
        const response = await interaction.reply({
            embeds: [mainEmbed],
            components: [row],
        });
        try {
            const collector = response.createMessageComponentCollector({
                componentType: discord_js_1.ComponentType.StringSelect,
                time: 300_000,
            });
            collector.on('collect', async (selectInteraction) => {
                if (selectInteraction.user.id !== interaction.user.id) {
                    await selectInteraction.reply({
                        content: 'Apenas quem executou o comando pode usar este menu.',
                        ephemeral: true,
                    });
                    return;
                }
                const selectedCategory = selectInteraction.values[0];
                const categoryCommands = client.commands.filter(cmd => cmd.category === selectedCategory);
                const categoryEmbed = new embed_1.CustomEmbedBuilder()
                    .setTitle(`${getCategoryEmoji(selectedCategory)} Comandos - ${selectedCategory}`)
                    .setDescription(categoryCommands
                    .map(cmd => `\`/${cmd.name}\` - ${cmd.description}`)
                    .join('\n') || 'Nenhum comando encontrado nesta categoria.')
                    .setFooter({ text: `Total: ${categoryCommands.size} comandos` });
                await selectInteraction.update({
                    embeds: [categoryEmbed],
                    components: [row],
                });
            });
            collector.on('end', async () => {
                const disabledRow = new discord_js_1.ActionRowBuilder()
                    .addComponents(selectMenu.setDisabled(true).setPlaceholder('Menu expirado'));
                await interaction.editReply({ components: [disabledRow] }).catch(() => { });
            });
        }
        catch (error) {
        }
    },
};
function getCategoryEmoji(category) {
    const emojis = {
        Information: 'ℹ️',
        Moderation: '🛡️',
        General: '⚙️',
        Fun: '🎮',
        Music: '🎵',
        Economy: '💰',
        Utility: '🔧',
    };
    return emojis[category] || '📋';
}
//# sourceMappingURL=help.js.map