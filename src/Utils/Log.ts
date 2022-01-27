import { red, blue, green, white } from "colors";

class Logger {
    static LogError(text: any) {
        return console.log(red(text));
    }
}

const LogSucess = (text: any) => {
    if (!text) return "";

    return console.log(blue(text));
}

export {
    Logger,
    LogSucess
}