import { Message } from "discord.js";
import { Command } from "../../Interfaces/Command.Interface";
import NewBot from "../../Structures/Client";

export default <Command>{
  name: "prefix",
  description: "Altere o prefixo do seu servidor",
  category: "Geral",

  aliases: ["set-prefix"],

  run: async (client: NewBot, message: Message, args: Array<String>) => {
    if (!message.member?.permissions.has("MANAGE_GUILD" || "ADMINISTRATOR"))
      return message.reply(`Você não tem permissão para usar este comando.`);

    const server = await client.guildDatabase.findOne({
      idG: message.guild?.id,
    });

    if (!server)
      await client.guildDatabase.create({
        idG: message.guild?.id,
      });

    let prefix;

    let newPrefix = args.join(" ");

    if (!newPrefix) {
      return message.reply("Digite o novo prefixo para seu servidor");
    } else if (newPrefix === server.prefix) {
      return message.reply("Prefixo Igual ao Atual");
    } else if (newPrefix.length > 3) {
      return message.reply("Prefixo Muito Grande");
    }

    message.reply(`Prefixo Sendo Alterado...`).then(async (msg) => {
      await client.guildDatabase.findOneAndUpdate(
        {
          idG: message.guild?.id,
        },
        {
          $set: { prefix: newPrefix },
        }
      );

      setTimeout(() => {
        msg.delete();
      }, 4000)

      message.reply(`Prefixo alterado para: \`${newPrefix}\``);
    });
  },
};
