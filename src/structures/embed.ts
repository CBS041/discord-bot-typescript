import { EmbedBuilder, ColorResolvable } from 'discord.js';

export class CustomEmbedBuilder extends EmbedBuilder {
  constructor() {
    super();
    this.setColor('#5865F2') // Discord's brand color
      .setTimestamp();
  }

  public setSuccessColor(): this {
    return this.setColor('#57F287'); // Green
  }

  public setErrorColor(): this {
    return this.setColor('#ED4245'); // Red
  }

  public setWarningColor(): this {
    return this.setColor('#FEE75C'); // Yellow
  }

  public setInfoColor(): this {
    return this.setColor('#5865F2'); // Blue
  }

  public setRandomColor(): this {
    const colors: ColorResolvable[] = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return this.setColor(randomColor);
  }

  public addBlankField(inline = false): this {
    return this.addFields({ name: '\u200B', value: '\u200B', inline });
  }

  public setAuthorWithIcon(name: string, iconURL?: string, url?: string): this {
    const authorData: { name: string; iconURL?: string; url?: string } = { name };
    if (iconURL) authorData.iconURL = iconURL;
    if (url) authorData.url = url;
    return this.setAuthor(authorData);
  }

  public setFooterWithIcon(text: string, iconURL?: string): this {
    const footerData: { text: string; iconURL?: string } = { text };
    if (iconURL) footerData.iconURL = iconURL;
    return this.setFooter(footerData);
  }
}

// Utility functions for common embed patterns
export const createSuccessEmbed = (description: string): CustomEmbedBuilder =>
  new CustomEmbedBuilder()
    .setSuccessColor()
    .setDescription(`✅ ${description}`);

export const createErrorEmbed = (description: string): CustomEmbedBuilder =>
  new CustomEmbedBuilder()
    .setErrorColor()
    .setDescription(`❌ ${description}`);

export const createWarningEmbed = (description: string): CustomEmbedBuilder =>
  new CustomEmbedBuilder()
    .setWarningColor()
    .setDescription(`⚠️ ${description}`);

export const createInfoEmbed = (description: string): CustomEmbedBuilder =>
  new CustomEmbedBuilder()
    .setInfoColor()
    .setDescription(`ℹ️ ${description}`);