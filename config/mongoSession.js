import { session } from 'express-session'
import { MongoStore } from 'connect-mongo'

import { MONGO_CONNECTION, SECRET_SESSION, SESSION_MAX_AGE } from './appConfig.js'

export const mongoSession = (app) => {
    app.use(
        session({
            store: MongoStore.create({
                mongoUrl: MONGO_CONNECTION,
                mongoOptions: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                },
            }),
            secret: SECRET_SESSION,
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: parseInt(SESSION_MAX_AGE)
            },
            rolling: true,
            resave: true,
            saveUnintialized: false
        })
    )
}