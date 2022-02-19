export default interface Command {
  name: string
  description: string
  category: string
  aliases: Array<string>
  run: Function
}
