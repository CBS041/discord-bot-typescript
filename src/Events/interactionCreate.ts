import NewBot from '../Structures/Client'

import { CommandInteractionOption, Interaction, User } from 'discord.js'

export default async function interactionCreate(
  client: NewBot,
  interaction: Interaction
) {
  if (!interaction.isCommand()) return

  await interaction.deferReply()

  if (!interaction.guildId || !interaction.channelId)
    return interaction.editReply(
      `Os SlashCommands ainda não podem ser usados na minha DM.`
    )

  if (!interaction.client.guilds.cache.get(interaction.guildId))
    return interaction.editReply(
      `Eu não fui adicionado corretamente ao servidor.`
    )

  const prefix = process.env.PREFIX

  const args: Array<CommandInteractionOption> = []

  interaction.options.data.forEach(v => args.push(v))

  // Searching for the command
  const command = client.commands.get(interaction.commandName)

  // Returning if the command is not found
  if (!command) return

  // Running the command
  command.run(client, interaction, args)
}
