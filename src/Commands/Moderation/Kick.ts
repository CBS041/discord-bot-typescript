import { Message } from "discord.js";
import { Command } from "../../Interfaces/Command.Interface";
import NewBot from "../../Structures/Client";

export default <Command>{
  name: "kick",
  description: "Expulse usuários de seu servidor",
  category: "Moderation",
  aliases: ["expulsar"],

  run: async (client: NewBot, message: Message, args: Array<String>) => {
    if (!message.member?.permissions.has("KICK_MEMBERS"))
      return message.reply(`Você não tem permissões para usar este comando.`);

    const member =
      message.mentions.users.first() ||
      message.guild?.members.cache.get(args[0]?.toLowerCase());

    if (!member)
      return message.reply(
        `Você precisa mencionar um usuário para expulsar do servidor`
      );

      
  },
};
