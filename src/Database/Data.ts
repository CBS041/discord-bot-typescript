import { connect } from 'mongoose'
import { LogSucess } from '../Utils/Log'

export async function start(mongoURI: any) {
  try {
    const { MODE_DEVELOPMENT } = process.env
    await connect(MODE_DEVELOPMENT ? 'mongodb://127.0.0.1:27017/discord_bot_ts' : mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    LogSucess('[DATABASE] - Conectado ao Banco de dados')
  } catch (err) {
    console.error(err)
  }
}
