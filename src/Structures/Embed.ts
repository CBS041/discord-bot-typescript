import { MessageEmbed } from 'discord.js'

class Embed extends MessageEmbed {
  constructor(description?: string, data = {}) {
    super(data)

    if (description) {
      this.setDescription(description)
    }

    this.setColor('#ed4245')
    this.setTimestamp(new Date())
  }
}

export default Embed
