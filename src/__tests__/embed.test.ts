import { CustomEmbedBuilder, createSuccessEmbed, createErrorEmbed } from '../structures/embed';

describe('CustomEmbedBuilder', () => {
  test('should create embed with default color and timestamp', () => {
    const embed = new CustomEmbedBuilder();
    const embedData = embed.toJSON();
    
    expect(embedData.color).toBe(0x5865F2); // Discord brand color
    expect(embedData.timestamp).toBeDefined();
  });

  test('should set success color', () => {
    const embed = new CustomEmbedBuilder().setSuccessColor();
    const embedData = embed.toJSON();
    
    expect(embedData.color).toBe(0x57F287); // Green
  });

  test('should set error color', () => {
    const embed = new CustomEmbedBuilder().setErrorColor();
    const embedData = embed.toJSON();
    
    expect(embedData.color).toBe(0xED4245); // Red
  });

  test('should add blank field', () => {
    const embed = new CustomEmbedBuilder().addBlankField();
    const embedData = embed.toJSON();
    
    expect(embedData.fields).toHaveLength(1);
    expect(embedData.fields![0]).toEqual({
      name: '\u200B',
      value: '\u200B',
      inline: false,
    });
  });
});

describe('Embed utility functions', () => {
  test('createSuccessEmbed should create green embed with checkmark', () => {
    const embed = createSuccessEmbed('Test success');
    const embedData = embed.toJSON();
    
    expect(embedData.color).toBe(0x57F287);
    expect(embedData.description).toBe('✅ Test success');
  });

  test('createErrorEmbed should create red embed with X mark', () => {
    const embed = createErrorEmbed('Test error');
    const embedData = embed.toJSON();
    
    expect(embedData.color).toBe(0xED4245);
    expect(embedData.description).toBe('❌ Test error');
  });
});