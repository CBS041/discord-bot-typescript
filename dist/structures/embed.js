"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfoEmbed = exports.createWarningEmbed = exports.createErrorEmbed = exports.createSuccessEmbed = exports.CustomEmbedBuilder = void 0;
const discord_js_1 = require("discord.js");
class CustomEmbedBuilder extends discord_js_1.EmbedBuilder {
    constructor() {
        super();
        this.setColor('#5865F2')
            .setTimestamp();
    }
    setSuccessColor() {
        return this.setColor('#57F287');
    }
    setErrorColor() {
        return this.setColor('#ED4245');
    }
    setWarningColor() {
        return this.setColor('#FEE75C');
    }
    setInfoColor() {
        return this.setColor('#5865F2');
    }
    setRandomColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return this.setColor(randomColor);
    }
    addBlankField(inline = false) {
        return this.addFields({ name: '\u200B', value: '\u200B', inline });
    }
    setAuthorWithIcon(name, iconURL, url) {
        const authorData = { name };
        if (iconURL)
            authorData.iconURL = iconURL;
        if (url)
            authorData.url = url;
        return this.setAuthor(authorData);
    }
    setFooterWithIcon(text, iconURL) {
        const footerData = { text };
        if (iconURL)
            footerData.iconURL = iconURL;
        return this.setFooter(footerData);
    }
}
exports.CustomEmbedBuilder = CustomEmbedBuilder;
const createSuccessEmbed = (description) => new CustomEmbedBuilder()
    .setSuccessColor()
    .setDescription(`✅ ${description}`);
exports.createSuccessEmbed = createSuccessEmbed;
const createErrorEmbed = (description) => new CustomEmbedBuilder()
    .setErrorColor()
    .setDescription(`❌ ${description}`);
exports.createErrorEmbed = createErrorEmbed;
const createWarningEmbed = (description) => new CustomEmbedBuilder()
    .setWarningColor()
    .setDescription(`⚠️ ${description}`);
exports.createWarningEmbed = createWarningEmbed;
const createInfoEmbed = (description) => new CustomEmbedBuilder()
    .setInfoColor()
    .setDescription(`ℹ️ ${description}`);
exports.createInfoEmbed = createInfoEmbed;
//# sourceMappingURL=embed.js.map