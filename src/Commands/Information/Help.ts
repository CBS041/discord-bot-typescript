import {
  Message,
  MessageButton,
  MessageActionRow,
  Interaction,
} from "discord.js";
import NewBot from "../../Structures/Client";
import Embed from "../../Structures/Embed";

export default {
  name: "help",
  description: "Veja o painel de ajuda do bot",
  category: "Informações",

  run: async (client: NewBot, message: Message, args: Array<String>) => {
    const { commands } = client;

    let author = message.author;

    const categoria1 = commands
    .map(x => x.category)
    .filter((x, f, y) => y.indexOf(x) === f);


    categoria1.forEach(async (category) => {
      console.log(commands
        .filter(x => x.category === category)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((f) => `${f.name}`)
        .join("\n")
        )
    })

  },
};
