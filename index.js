const Server = require('./server')
const server = new Server()

const start = async () => {
  const result = await server.start().catch(e => {
    console.log(e)
    process.exit(1)
  })
  console.log(result)
}

start()
