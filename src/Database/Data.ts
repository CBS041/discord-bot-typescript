import { connect } from "mongoose";
import { LogSucess } from "../Utils/Log";

export async function start(mongoURI: any) {
  try {
    await connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    LogSucess("[DATABASE] - Conectado ao Banco de dados");
  } catch (err) {
    console.error(err);
  }
}
