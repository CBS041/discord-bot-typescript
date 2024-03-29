import {
  Message,
  MessageButton,
  MessageActionRow,
  Interaction
} from 'discord.js'
import Command from '../../Structures/Interfaces/Command.Interface'
import NewBot from '../../Structures/Client'
import Embed from '../../Structures/Embed'

export default <Command>{
  name: 'help',
  description: 'Veja o painel de ajuda do bot',
  category: 'Informações',

  aliases: ['ajuda'],

  run: async (client: NewBot, message: Message, args: Array<String>) => {
    const { commands } = client

    let author = message.author
    
    const EMBED = new Embed()

    const categoria1 = commands
      .map(x => x.category)
      .filter((x, f, y) => y.indexOf(x) === f)

    categoria1.forEach(async category => {
        const comandos = commands
          .filter(x => x.category === category)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(f => `${f.name}`)
          .join('\n')
      
        EMBED.addField(category, comandos, false)
    })
    
    return message.reply({ embeds: [EMBED] )
  }
}
