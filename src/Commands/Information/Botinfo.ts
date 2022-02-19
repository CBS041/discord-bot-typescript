import { Message } from 'discord.js'

import moment from 'moment'

import 'moment-duration-format'
import Command from '../../Structures/Interfaces/Command.Interface'

import NewBot from '../../Structures/Client'
import Embed from '../../Structures/Embed'
import CreateKey from '../../Utils/Key'

export default <Command>{
  name: 'botinfo',
  description: 'Veja as informações do bot',
  category: 'Informações',

  aliases: ['b-info', 'binfo'],

  run: async (client: NewBot, message: Message, args: Array<String>) => {
    const users = client.users.cache.size

    const guilds = client.users.cache.size

    const commands = client.commands.size

    const uptime = moment
      .duration(process.uptime() * 1000)
      .format('d[d] h[h] m[m] e s[s]')

    const memory =
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB'

    const ping = Math.ceil(client.ws.ping) + 'ms'

    const EMBED = new Embed(`Veja minhas Informações abaixo`)
      .setAuthor(`${message.guild?.name}`)
      .addFields(
        {
          name: `<:verificado_list:861686786337275962> | Nome: `,
          value: `\`${client.user?.username}\``,
          inline: true
        },
        {
          name: `<:defender_emoji:865279838523883551> | Quantidade de Servidores: `,
          value: `\`${client.guilds.cache.size.toLocaleString()} Servidores\``,
          inline: true
        },
        {
          name: '<a:carregando:865630163244810260> | Uptime: ',
          value: `${uptime}`,
          inline: true
        },
        {
          name: '<:server_data:865769168603447307> | Memoria Usada: ',
          value: `Total de Memória sendo Usado: **${memory}** | Ping: ${ping}`,
          inline: true
        },
        {
          name: `<:atlanta_server:610825960853471242> | Estou Na Minha Versão: `,
          value: `1.1.0`,
          inline: true
        },
        {
          name: `<:search_emoji:865281383836155935> | Quantidade de Comandos`,
          value: `\`${client.commands.size} Comandos\``,
          inline: true
        },
        {
          name: '<:718203557056348210:723157383857307668> | Desenvolvedores',
          value: `${client.owners.map(user => `<@${user}>`).join(' - ')}`,
          inline: true
        }
      )

    await message.reply({ embeds: [EMBED] })
  }
}
