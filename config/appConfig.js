import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
})

export const PORT = process.env.PORT || 8080
export const DATA_BASE = process.env.DATA_BASE
export const MONGO_CONNECTION = process.env.MONGO_CONNECTION
export const SECRET_SESSION = process.env.SECRET_SESSION
export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE