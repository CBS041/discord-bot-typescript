import { MessageEmbed, User } from "discord.js";

class Embed extends MessageEmbed {
  constructor(user: User, data = {}) {
    super(data);

    this.setColor("RANDOM");
    this.setTimestamp(new Date());
    if (user)
      this.setFooter(
        `${user.tag}`,
        `${user.avatarURL({ dynamic: true, size: 4096 })}`
      );
  }
}

export default Embed;