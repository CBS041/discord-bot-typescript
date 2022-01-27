export interface Command {
    name: string,
    description: string,
    category: string,
    args?: string,
    aliases: string[],
    run: Function
}