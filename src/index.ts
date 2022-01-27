import "dotenv/config";
import NewBot from "./Structures/Client";
import { start } from "./Database/Data";

start(process.env.DATABASE_URL);


const client = new NewBot({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
  presence: {
    status: "idle",
  },
  restTimeOffset: 0,
});

client.login(process.env.TOKEN);
