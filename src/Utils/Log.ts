import { red, blue, green, white, yellow } from 'colors'

const LogError = (text: any) => {
  if (!text) return ''

  return console.log(red(text))
}

const LogSucess = (text: any) => {
  if (!text) return ''

  return console.log(green(text))
}

const LogInfo = (text: any) => {
  if (!text) return ''

  return console.log(blue(text))
}

const LogWarn = (text: any) => {
  if (!text) return ''

  return console.log(yellow(text))
}

const LogAny = (text: any) => {
  if (!text) return ''

  return console.log(white(text))
}

export { LogError, LogSucess, LogInfo, LogWarn, LogAny }
