import { Router } from 'express'

import {
    getMovementById,
    getMovementByType,
    createMovement
} from '../controllers/movementController.js'

export const movementRouter = Router()

movementRouter.get('/movimiento/:movementId', getMovementById)
movementRouter.get('/movimiento/tipo/:movementType', getMovementByType)
movementRouter.post('/movimiento', createMovement)