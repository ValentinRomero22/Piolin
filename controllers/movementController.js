import {
    getMovementByIdService,
    getMovementByTypeService,
    createMovementService
} from '../services/movementService.js'

export const getMovementById = async (req, res) => {
    try {
        const { movementId } = req.params

        const result = await getMovementByIdService(movementId)

        if (result.error) {
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Se produjo un error inesperado'

            return res.status(400).json({
                statusCode: 400,
                message,
                data: null
            })
        }

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Movimiento encontrado',
                data: result.data
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                mesage: 'No se encontró el movimiento buscado',
                data: null
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inespeado',
            data: null
        })
    }
}

export const getMovementByType = async (req, res) => {
    try {
        const { movementType } = req.body

        const result = await getMovementByTypeService(movementType)

        if (result.error) {
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Se produjo un error inesperado'

            return res.status(400).json({
                statusCode: 400,
                message,
                data: null
            })
        }

        if (result.data && result.data.length) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Movimientos encontrados',
                data: result.data
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                mesage: 'No se encontraron los movimientos buscados',
                data: null
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado',
            data: null
        })
    }
}

export const createMovement = async (req, res) => {
    try {
        const newMovement = {
            type: req.body.type,
            items: req.body.items,
            total: req.body.total,
            relatedMovements: req.body.relatedMovements
        }

        const result = await createMovementService(newMovement)

        if (result.messageError) {
            return res.status(400).json({
                statusCode: 400,
                message: result.messageError
            })
        }

        if (result.error) {
            console.log(result.error)
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Se produjo un error inesperado'

            return res.status(400).json({
                statusCode: 400,
                message
            })
        }

        if (result.data) {
            return res.status(201).json({
                statusCode: 201,
                message: 'Movimiento creado correctamente'
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: 'Error al crear el movimiento'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}