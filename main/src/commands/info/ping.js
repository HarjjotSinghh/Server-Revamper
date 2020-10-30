module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
       message.channel.send(`:ping_pong: Pong!\n**Ping**: - ${Math.round(client.ws.ping)}ms`)
    }
}