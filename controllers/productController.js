import {
    getProductByIdService,
    getAllProductsService,
    getProductsByCategoryService,
    createProductService,
    updateProductStockService,
    updateProductStockAfterSaleService,
    updateProductPriceService,
    updateProductService,
    disableProductService,
    enableProductService
} from '../services/productService.js'

export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params

        const result = await getProductByIdService(productId)

        if (result.error) {
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Se produjo un error inesperado'

            return res.statusCode(400).json({
                statusCode: 400,
                message,
                data: null
            })
        }

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Producto encontrado',
                data: result.data
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró el producto buscado',
                data: null
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado',
            data: null
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const result = await getAllProductsService()

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

        if (result.data && result.data.length > 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Productos encontrados',
                data: result
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontraron productos',
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

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params
        const result = await getProductsByCategoryService(categoryId)

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

        if (result.data && result.data.length > 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Productos encontrados',
                data: result.data
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontraron productos para la categoría indicada',
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

export const createProduct = async (req, res) => {
    try {
        const newProduct = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            category: req.body.category
        }

        const result = await createProductService(newProduct)

        if (result.messageError) {
            return res.status(400).json({
                statusCode: 400,
                message: result.messageError
            })
        }

        if (result.error) {
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Error al intentar crear el producto'

            return res.status(400).json({
                statusCode: 400,
                message
            })
        }

        if (result.data) {
            return res.status(201).json({
                statusCode: 201,
                message: 'Producto creado correctamente'
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: 'Error al intentar crear el producto'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const updateProductStock = async (req, res) => {
    try {
        const { productId } = req.params
        const newStock = parseFloat(req.body.stock)

        const result = await updateProductStockService(productId, newStock)

        if (result.error) {
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Error al intentar actualizar el stock del producto'

            return res.status(400).json({
                statusCode: 400,
                message
            })
        }

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Se actualizó el stock del producto'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'El producto indicado no existe'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const updateProductPrice = async (req, res) => {
    try {
        const { productId } = req.params
        const newPrice = parseFloat(req.body.price)

        const result = await updateProductPriceService(productId, newPrice)

        if (result.error) {
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Error al intentar modificar el precio del producto'

            return res.status(400).json({
                statusCode: 400,
                message
            })
        }

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Se actualizó el precio del producto'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'El producto indicado no existe'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const productToUpdate = {
            name: req.body.name,
            category: req.body.category
        }

        const result = await updateProductService(productId, productToUpdate)

        if (result.error) {
            if (result.error.message) {
                return res.status(404).json({
                    statusCode: 404,
                    message: result.error.message
                })
            }

            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Error al intentar modificar los datos del producto'

            return res.status(400).json({
                statusCode: 400,
                message
            })
        }

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Producto modificado correctamente'
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: 'Se produjo un error inesperado'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const disableProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const result = await disableProductService(productId)

        if (result.error) {
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Error al intentar eliminar el producto'

            return res.status(400).json({
                statusCode: 400,
                message
            })
        }

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Se eliminó el producto correctamente'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'El producto indicado no existe'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

// REVISAR SI LLEGA HASTA EL CONTROLADOR O LO MANEJA EL SERVICIO INTERNAMENTE
export const enableProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const result = await enableProductService(productId)

        if (result.error) {
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Error al intentar habilitar el producto'

            return res.status(400).json({
                statusCode: 400,
                message
            })
        }

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Se habilitó el producto correctamente'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'El producto indicado no existe'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}