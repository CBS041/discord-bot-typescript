import { Client, ClientOptions, Collection } from 'discord.js'
import { readdirSync, promises } from 'fs'
import GuildData from '../Database/Models/Guild'
import UserData from '../Database/Models/User'
import { join } from 'path'
import Command from './Interfaces/Command.Interface'
import { LogSucess } from '../Utils/Log'

class NewBot extends Client {
  commands: Collection<string, Command> = new Collection()
  categories: Array<string> = readdirSync(join(__dirname, '../Commands'))
  aliases: any = new Collection()

  extension: string = 'ts'

  guildDatabase = GuildData

  usersDatabase = UserData

  owners: string[] = [process.env.OWNER_ID || '393490411932483592']

  constructor(options: ClientOptions) {
    super(options)

    if (join(__dirname, '../Commands').includes('build\\')) {
      this.extension = 'js'
    }

    this.LoadCommands()
    this.LoadEvents()
  }

  async LoadEvents() {
    const events = await promises.readdir(join(__dirname, `../events`))

    LogSucess('[Loading Events] Eventos Carregados')

    for (const file of events) {
      const event = require(`../events/${file}`)?.default || {}

      if (!event || typeof event !== 'function') return

      console.log(file)

      this.on(file.split('.')[0], (...args) => event(this, ...args))
    }
  }

  async LoadCommands() {
    const categories = await promises.readdir(join(__dirname, `../commands`))

    categories.forEach(async cat => {
      const commands = (
        await promises.readdir(join(__dirname, `../commands/${cat}`))
      ).filter(file => file.endsWith(this.extension))

      for (const file of commands) {
        const props: Command =
          require(`../commands/${cat}/${file}`)?.default || {}

        if (!props.name || typeof props.run !== 'function')
          throw new SyntaxError(
            'A command should have `data` property and a `execute` method'
          )

        this.commands.set(props.name, props)
        props.aliases.forEach(aliases => {
          this.aliases.set(aliases, props.name)
        })
      }
    })
    LogSucess('[Loading Commands] Comandos Carregados')
  }
}

export default NewBot
