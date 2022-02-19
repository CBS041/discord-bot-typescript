import { Message } from 'discord.js'
import NewBot from '../../Structures/Client'
import Command from '../Interfaces/Command.Interface'

export default <Command>{
  name: 'command-name',
  description: 'command-description',
  category: 'command-category',
  aliases: ['command-aliase'],

  run: async (client: NewBot, message: Message, args: Array<String>) => {}
}
