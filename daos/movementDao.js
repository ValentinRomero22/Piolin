import movementModel from '../models/movementModel.js'

export const getMovementByIdDao = async (movementId) => {
    try {
        const movementFound = await movementModel.findById(movementId)
        return movementFound
    } catch (error) {
        throw error
    }
}

export const getMovementByTypeDao = async (movementType) => {
    try {
        const movementsFound = await movementModel.find({ type: movementType })
        return movementsFound
    } catch (error) {
        throw error
    }
}

export const createMovementDao = async (newMovement) => {
    try {
        const result = await movementModel.create(newMovement)
        return result
    } catch (error) {
        throw error
    }
}

export const getLinkedReturnsDao = async (movementId) => {
    try {
        const linkedReturns = await movementModel.find({
            relatedMovements: {
                $elemMatch: { movementId: movementId }
            }
        })

        return linkedReturns
    } catch (error) {
        throw error
    }
}

export const addReturnDao = async(movementId, newRelatedMovement) => {
    try {
        const result = await movementModel.updateOne(
            { _id: movementId },
            {
                $push: { relatedMovements: newRelatedMovement }
            }
        )

        return result
    } catch (error) {
        throw error
    }
}