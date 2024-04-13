import {
    getMovementByIdDao,
    getMovementByTypeDao,
    createMovementDao,
    getLinkedReturnsDao,
    addReturnDao
} from '../daos/movementDao.js'

import {
    updateProductStockAfterBuyService,
    updateProductStockAfterSaleService
} from './productService.js'

import {
    movementIdSchema,
    createMovementSchema
} from '../validators/movementValidator.js'

import { getProductByIdService } from './productService.js'

export const getMovementByIdService = async (movementId) => {
    let result = {}

    try {
        const { error } = movementIdSchema.validate({ movementId })

        if (error) {
            result.error = error
            return result
        }

        const movementFound = await getMovementByIdDao(movementId)

        result.data = movementFound
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const getMovementByTypeService = async (movementType) => {
    let result = {}

    try {
        if (movementType != 1 || movementType != 2 || movementType != 3) {
            result.messageError = 'El tipo de movimiento indicado no es correcto'
            return result
        }

        const movementsFound = await getMovementByTypeDao(movementType)

        result.data = movementsFound
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const createMovementService = async (newMovement) => {
    let result = {}

    switch (newMovement.type) {
        case 1:
            result = newSale(newMovement)
            break
        case 2:
            result = newBuy(newMovement)
            break
        case 3:
            result = newReturn(newMovement)
            break
        default:
            result = {
                messageError: 'El tipo de movimiento no es válido'
            }
            break
    }

    return result
}

const newSale = async (newSale) => {
    let result = {}

    try {
        const { error } = createMovementSchema.validate(newSale)

        if (error) {
            result.error = error
            return result
        }

        let productFound = {}
        //let productsFound = []
        let checkTotal = 0

        for (let i = 0; i < newSale.items.length; i++) {
            productFound = await getProductByIdService(newSale.items[i].productId)

            if (productFound) {
                if (productFound.data.stock < newSale.items[i].quantity) {
                    result.messageError = `No hay stock suficiente de ${productFound.data.name}. Elimínelo de la compra e intente nuevamente`
                    return result
                }
            } else {
                result.messageError = 'El producto a utilizar no existe'
                return result
            }

            checkTotal += newSale.items[i].unitPrice * newSale.items[i].quantity
        }

        if (newSale.total != checkTotal) {
            result.messageError = 'El total indicado no se corresponde con el total real de la venta'
            return result
        }

        let productResult = {}

        for (let i = 0; i < newSale.items.length; i++) {
            productResult = await updateProductStockAfterSaleService(newSale.items[i].productId, newSale.items[i].quantity)

            if (productResult.data.matchedCount != 1 || productResult.data.modifiedCount != 1) {

                productResult.error.details
                    ? result.messageError = productResult.error.details[0].message
                    : result.messageError = 'Se produjo un error al actualizar el stock del producto'

                return result
            }
        }

        newSale.timestamp = new Date()
        // YA TIENE ESTE VALOR SETEADO ( = [] ) DESDE EL CONTROLLER
        //newSale.relatedMovements = []

        const status = await createMovementDao(newSale)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

const newBuy = async (newBuy) => {
    let result = {}

    try {
        const { error } = createMovementSchema.validate(newBuy)

        if (error) {
            result.error = error
            return result
        }

        let productFound = {}
        let checkTotal = 0

        for (let i = 0; i < newBuy.items.length; i++) {
            productFound = await getProductByIdService(newBuy.items[i].productId)

            if (!productFound) {
                result.messageError = 'El producto a utilizar no existe'
                return result
            }

            checkTotal += newBuy.items[i].unitPrice * newBuy.items[i].quantity
        }

        if (newBuy.total != checkTotal) {
            result.messageError = 'El total indicado no se corresponde con el total real de la compra'
            return result
        }

        let productResult = {}

        for (let i = 0; i < newBuy.items.length; i++) {
            productResult = await updateProductStockAfterBuyService(newBuy.items[i].productId.valueOf(), newBuy.items[i].quantity)

            if (productResult.data.matchedCount != 1 || productResult.data.modifiedCount != 1) {

                productResult.error.details
                    ? result.messageError = productResult.error.details[0].message
                    : result.messageError = 'Se produjo un error al actualizar el stock del producto'

                return result
            }
        }

        newBuy.timestamp = new Date()
        // YA TIENE ESTE VALOR SETEADO ( = [] ) DESDE EL CONTROLLER
        //newBuy.relatedMovements = []

        const status = await createMovementDao(newBuy)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

const newReturn = async (newReturn) => {
    let result = {}

    try {
        const { error } = createMovementSchema.validate(newReturn)

        if (error) {
            result.error = error
            return result
        }

        /* 
        ***** PASOS PARA VALIDAR LA DEVOLUCIÓN *****
        1. obtener el movimiento al que se asocia la devolución
        2. obtenido el movimiento hay que rastrear si tiene más devoluciones asociadas
        2.1. en caso de que tenga devoluciones hay que recorrerlas
        2.2. armar un array para ir registrando los productos que se verifican devueltos
        2.3. para cada una de las devoluciones hay que verificar los productos e ir comparando si
        ya se verificaron en otra devolución solo se actualiza la cantidad devuelta, sino se agrega
        todo al array de productos devueltos
        2.4. finalizado el recorrido por las devoluciones, hay que verificar si los producotos y
        las cantidades que se quieren devolver están disponibles
        */

        const movementFound = await getMovementByIdDao(newReturn.relatedMovements[0]?.movementId)

        if (!movementFound) {
            result.messageError = 'El movimiento al que se intenta asociar la devolución no existe'
            return result
        }

        let productFound = {}
        let checkTotal = 0

        for (let i = 0; i < newReturn.items.length; i++) {
            productFound = await getProductByIdService(newReturn.items[i].productId)

            if (!productFound) {
                result.messageError = 'El producto a devolver no existe'
                return result
            }

            checkTotal += newReturn.items[i].unitPrice * newReturn.items[i].quantity
        }

        if (newReturn.total != checkTotal) {
            result.messageError = 'El total indicado no se corresponde con el total real de la devolución'
            return result
        }

        let returnItems = movementFound.items

        for (let i = 0; i < returnItems.length; i++) {
            for (let j = 0; j < newReturn.items.length; j++) {
                if (returnItems[i].productId == newReturn.items[j].productId) {
                    returnItems[i].quantity -= newReturn.items[j].quantity

                    if (returnItems[i].quantity < 0) {
                        result.messageError = 'La cantidad a devolver del producto es mayor a la disponible'
                        return result
                    }

                    break
                }
            }
        }

        const linkedReturns = await getLinkedReturnsDao(newReturn.relatedMovements[0].movementId)

        if (linkedReturns && linkedReturns.length > 0) {
            let found = false

            // RECORRO LAS DEVOLUCIONES YA VINCULADAS AL MOVIMIENTO QUE SE VA A DEVOLVER
            for (let i = 0; i < linkedReturns.length; i++) {

                // RECORRO LOS ÍTEMS DE CADA UNA DE LAS DEVOLUCIONES 
                for (let j = 0; j < linkedReturns[i].items.length; j++) {
                    found = true

                    // RECORRO CADA UNO DE LOS ÍTEMS DEL MOVIMIENTO ORIGINAL LUEGO DE RESTADO LA DEVOLUCIÓN ACTUAL
                    for (let k = 0; k < returnItems.length && found; k++) {

                        // COMPARO SI ES EL MISMO PRODUCTO, LE RESTO LO DEVUELTO ANTERIORMENTE
                        if (returnItems[k].productId == linkedReturns[i].items[j].productId.valueOf()) {
                            returnItems[k].quantity -= linkedReturns[i].items[j].quantity
                            found = false
                        }

                        if (returnItems[k].quantity < 0) {
                            result.messageError = 'La cantidad a devolver del producto es mayor a la disponible'
                            return result
                        }
                    }
                }
            }
        }

        let productResult = {}
        for (let i = 0; i < newReturn.items.length; i++) {
            productResult = await updateProductStockAfterBuyService(newReturn.items[i].productId, newReturn.items[i].quantity)

            if (productResult.data.matchedCount != 1 || productResult.data.modifiedCount != 1) {
                result.messageError = 'Se produjo un error al actualizar el stock del producto'
                return result
            }
        }

        newReturn.timestamp = new Date()

        const returnStatus = await createMovementDao(newReturn)

        const newRelatedMovement = {
            movementId: returnStatus._id.valueOf()
        }

        await addReturnDao(newReturn.relatedMovements[0].movementId, newRelatedMovement)

        result.data = returnStatus
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

/*
    COMPRAS Y VENTAS:
    newMovement = { type: 1/2, items: [], total }

    1. verificar items:
        a. que los productos existan
        b. que la cantidad no sea menor que 0 -- LO VALIDA EL MOVEMENTVALIDATOR
        c. que exista stock disponible del producto al momento de realizar la compra
        TODO ESTO SE PODRÍA HACER EN EL MISMO RECORRIDO DE LOS ITEMS

    2. verificar que el total se corresponda según: (producto.precio * cantidad)

    3. agregar los valores:
        * timestamp
        * relatedMovements = null
    
    DEVOLUCIONES:
    newMovement = { type: 3, itmes: [], total, relatedMovements }

    1. verificar items:
        a. que los productos existan
        b. que la cantidad no sea menor que 0 -- LO VALIDA EL MOVEMENTVALIDATOR
        c. que existn los ítems en productos y cantidad comparando con el related movement
        TODO ESTO SE PODRÍA HACER EN EL MISMO RECORRIDO DE LOS ITEMS

    2. verificar que el total se corresponda según: (producto.precio * cantidad)

    3. agregar los valores:
        * timestamp
*/