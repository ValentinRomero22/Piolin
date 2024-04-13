import mongoose from 'mongoose'

import { MONGO_CONNECTION, DATA_BASE } from '../config/appConfig.js'

export const mongoConnect = () => {
    mongoose.connect(MONGO_CONNECTION, {
        /* useNewUrlParser: true,
        useUniFiedTopology: true, */
        dbName: DATA_BASE
    }).then(() => console.log('Conectado a la base de datos'))
    .catch((error) => 'Error al conectarse a la base de datos')
}