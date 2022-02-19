import { GuildMember, Message } from 'discord.js'
import Command from '../../Structures/Interfaces/Command.Interface'
import NewBot from '../../Structures/Client'
import Embed from '../../Structures/Embed'

export default <Command>{
  name: 'kick',
  description: 'Expulse usuários de seu servidor',
  category: 'Moderation',
  aliases: ['expulsar'],

  run: async (client: NewBot, message: Message, args: Array<String>) => {
    if (!message.member?.permissions.has('KICK_MEMBERS'))
      return message.reply(`Você não tem permissões para usar este comando.`)

    const userOfKick = message.mentions.members?.first()

    const reasonOfKick = args.slice(1).join(' ')

    if (!userOfKick) {
      let EmbedNoUser = new Embed(`Nenhum Usuario encontrado`)

      return message.reply({
        embeds: [EmbedNoUser]
      })
    }

    if (!reasonOfKick) {
      let EmbedNoReason = new Embed(`Insira o motivo para a expulsao`)

      return message.reply({ embeds: [EmbedNoReason] })
    } else if (reasonOfKick.length > 50) {
      let EmbedNoReasonLength = new Embed(
        `Insira o motivo para a expulsao menor que 50`
      )

      return message.reply({ embeds: [EmbedNoReasonLength] })
    } else if (reasonOfKick === null || undefined) {
      let EmbedNoReasonError = new Embed(
        `Ocorreu um erro na digitacao do motivo por favor tente novamente`
      )

      return message.reply({ embeds: [EmbedNoReasonError] })
    }
  }
}
