import { EmbedBuilder } from 'discord.js';
export declare class CustomEmbedBuilder extends EmbedBuilder {
    constructor();
    setSuccessColor(): this;
    setErrorColor(): this;
    setWarningColor(): this;
    setInfoColor(): this;
    setRandomColor(): this;
    addBlankField(inline?: boolean): this;
    setAuthorWithIcon(name: string, iconURL?: string, url?: string): this;
    setFooterWithIcon(text: string, iconURL?: string): this;
}
export declare const createSuccessEmbed: (description: string) => CustomEmbedBuilder;
export declare const createErrorEmbed: (description: string) => CustomEmbedBuilder;
export declare const createWarningEmbed: (description: string) => CustomEmbedBuilder;
export declare const createInfoEmbed: (description: string) => CustomEmbedBuilder;
