import express from 'express'
import { createServer } from 'http'

import cors from 'cors'

import {mongoConnect} from './utils/mongoConnect.js'
import { PORT } from './config/appConfig.js'

import {
    productRouter,
    categoryRouter,
    movementRouter
} from './routes/main.routes.js'

const app = express()
app.use(express.json())
app.use(cors())

const httpServer = createServer(app)

mongoConnect()

app.use('/', productRouter)
app.use('/', categoryRouter)
app.use('/', movementRouter)

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
httpServer.on('error', () => console.log('Se produjo un error en el servidor'))