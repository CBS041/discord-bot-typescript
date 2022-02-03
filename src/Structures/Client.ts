import { Client, ClientOptions, Collection } from "discord.js";
import { readdirSync, promises } from "fs";
import GuildData from "../Database/Models/Guild";
import UserData from "../Database/Models/User";
import { join } from "path";
import { Aliases, Command } from "../Interfaces/Command.Interface";

class NewBot extends Client {
  commands: Collection<string, Command> = new Collection();
  aliases: Collection<string, Aliases> = new Collection();
  categories: Array<string> = readdirSync(join(__dirname, "../Commands"));

  extension: string = "ts";

  guildDatabase = GuildData;

  usersDatabase = UserData;

  owners: string[] = [process.env.OWNER_ID || "393490411932483592"];

  constructor(options: ClientOptions) {
    super(options);

    if (join(__dirname, "../Commands").includes("build\\")) {
      this.extension = "js";
    }

    this.setCommands();
    this.runEvents();
  }

  async runEvents() {
    const events = await promises.readdir(join(__dirname, "../Events"));

    for (let i = 0; i < events.length; i++) {
      const event = require(`../Events/${events[i]}`)?.default || {};

      if (!event || typeof event !== "function") return;
      this.on(events[i].split(".")[0], (...args) => event(this, ...args));
    }
  }

  async setCommands() {
    const categories = await promises.readdir(join(__dirname, `../Commands`));

    categories.forEach(async (cat) => {
      const commands = (
        await promises.readdir(join(__dirname, `../Commands/${cat}`))
      ).filter((file) => file.endsWith(this.extension));

      for (let i = 0; i < commands.length; i++) {
        const file = commands[i];

        const command: Command =
          require(`../commands/${cat}/${file}`)?.default || {};

        if (!command.name || typeof command.run !== "function")
          throw new SyntaxError(
            "A command should have `data` property and a `execute` method"
          );

        command.aliases?.forEach((x) => this.aliases.set(x., command));

        this.commands.set(command.name, command);
      }
    });
  }
}

export default NewBot;
