import { Message } from "discord.js";
import NewBot from "../../Structures/Client";
import Embed from "../../Structures/Embed";

export default {
  name: "ping",
  description: "Veja a Velocidade de Resposta do Bot",
  category: "Diversos",

  run: async (client: NewBot, message: Message, args: Array<String>) => {

    const ping = `${client.ws.ping}ms` 

    const embed = new Embed(message.author).setDescription(`\`${ping}\``);

    message.reply({
      embeds: [embed],
    });
  },
};
