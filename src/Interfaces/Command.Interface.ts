export interface Command {
    name: string,
    description: string,
    category: string,
    args?: string,
    aliases?: Array<string> | string[],
    run: Function
}

export interface Aliases {
    name: string,
    aliases?: Array<string> | string[],
    run: Function
}