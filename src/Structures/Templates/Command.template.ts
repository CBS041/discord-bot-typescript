import { Message } from "discord.js";
import NewBot from "../../Structures/Client";

export default {
  name: "command-name",
  description: "command-description",
  category: "command-category",

  run: async (client: NewBot, message: Message, args: Array<String>) => {},
};
