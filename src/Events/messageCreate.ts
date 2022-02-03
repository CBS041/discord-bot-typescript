import { Message, User } from "discord.js";
import NewBot from "../Structures/Client";
import { Logger } from "../Utils/Log";
import moment from "moment";

const GetMention = (id: any) => new RegExp(`^<@!?${id}>( |)$`);

export default async function messageCreate(client: NewBot, message: Message) {
  moment.locale("pt-BR");

  try {
    const guild = message.guild;

    const server = await client.guildDatabase.findOne({
      idG: guild?.id,
    });

    if (!server)
      await client.guildDatabase.create({
        idG: guild?.id,
      });

    if (message.author.bot == true) return;

    if (message.channel.type === "DM") return;

    const user = await client.usersDatabase.findOne({
      idU: message.author.id,
    });

    if (!user)
      await client.usersDatabase.create({
        idU: message.author.id,
      });

    let prefix = server?.prefix;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = args.shift()?.toLowerCase() || "";

    var cmd = client.commands.get(command) || client.aliases.get(command);

    if (!cmd) return;

    cmd?.run(client, message, args, { prefix });
  } catch (e) {
    Logger.LogError(e);
  }
}
