import express from 'express'
import { createServer } from 'http'

//import { mongoConnect } from 

import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const httpServer = createServer(app)

// mongoConnect()

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
httpServer.on('error', () => console.log('Se produjo un error en el servidor'))