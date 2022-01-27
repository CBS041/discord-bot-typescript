import Guild from "../Database/Models/Guild";
import NewBot from "../Structures/Client";

export default async function ready(client: NewBot) {


    client.user?.setActivity({
        name: `${client.users.cache.size} Usuários`,
        type: 'PLAYING'
    });

    console.log(`${client.user?.tag} Iniciado com Sucesso Com ${client.users.cache.size} usuários de ${client.guilds.cache.size}`);
}