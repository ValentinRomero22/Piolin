import {
    getProductByIdDao,
    getAllProductsDao,
    getProductsByCategoryDao,
    createProductDao,
    updateProductStockDao,
    updateProductStockAfterSaleDao,
    updateProductStockAfterBuyDao,
    updateProductPriceDao,
    updateProductDao,
    disableProductDao,
    enableProductDao
} from '../daos/productDao.js'

import { getCategoryByIdService } from './categoryService.js'

import {
    productIdSchema,
    createProductSchema,
    updateProductStockSchema,
    updateProductPriceSchema,
    updateProductSchema,
} from '../validators/productValidator.js'

import { categoryIdSchema } from '../validators/categoryValidator.js'

import { firstCapitalLetter } from '../utils/firtsCapitalLetter.js'

export const getProductByIdService = async (productId) => {
    let result = {}

    try {
        const { error } = productIdSchema.validate({ productId })

        if (error) {
            result.error = error
            return error
        }

        const productFound = await getProductByIdDao(productId)

        result.data = productFound
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const getAllProductsService = async () => {
    let result = {}

    try {
        const productsFound = await getAllProductsDao()

        result.data = productsFound
        return result

    } catch (error) {
        result.error = error
        return result
    }
}

export const getProductsByCategoryService = async (categoryId) => {
    let result = {}

    try {
        const { error } = categoryIdSchema.validate({ categoryId })

        if (error) {
            result.error = error
            return result
        }

        const productsFound = await getProductsByCategoryDao(categoryId)

        result.data = productsFound
        return result
    } catch (error) {
        result.error = error
        return error
    }
}

export const createProductService = async (newProduct) => {
    let result = {}

    try {
        const { error } = createProductSchema.validate(newProduct)

        if (error) {
            result.error = error
            return result
        }

        const categoryFound = await getCategoryByIdService(newProduct.category)

        if (!categoryFound.data) {
            result.messageError = 'La categoría a la que pertenece el producto no existe'
            return result
        }

        newProduct.stock = 0
        newProduct.enabled = 1
        newProduct.name = firstCapitalLetter(newProduct.name)

        const status = await createProductDao(newProduct)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const updateProductStockService = async (productId, newStock) => {
    let result = {}

    try {
        const { error } = updateProductStockSchema.validate({ productId, newStock })

        if (error) {
            result.error = error
            return result
        }

        const productFound = await getProductByIdDao(productId)

        if (!productFound) {
            result.data = null
            return result
        }

        const status = await updateProductStockDao(productId, newStock)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const updateProductStockAfterSaleService = async (productId, amountToSubrtact) => {
    let result = {}

    try {
        const { error } = updateProductStockSchema.validate({ productId, newStock: amountToSubrtact })

        if (error) {
            result.error = error
            return result
        }

        const productFound = await getProductByIdDao(productId)

        if (!productFound) {
            result.data = null
            return result
        }

        const status = await updateProductStockAfterSaleDao(productId, amountToSubrtact)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const updateProductStockAfterBuyService = async (productId, amountToIncrease) => {
    let result = {}

    try {
        const newStock = amountToIncrease
        const { error } = updateProductStockSchema.validate({ productId, newStock })

        if (error) {
            result.error = error
            return result
        }

        const productFound = await getProductByIdDao(productId)

        if (!productFound) {
            result.data = null
            return result
        }

        const status = await updateProductStockAfterBuyDao(productId, amountToIncrease)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const updateProductPriceService = async (productId, newPrice) => {
    let result = {}

    try {
        const { error } = updateProductPriceSchema.validate({ productId, newPrice })

        if (error) {
            result.error = error
            return result
        }

        const productFound = await getProductByIdDao(productId)

        if (!productFound) {
            result.data = null
            return result
        }

        const status = await updateProductPriceDao(productId, newPrice)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const updateProductService = async (productId, productToUpdate) => {
    let result = {}

    try {
        const { error } = updateProductSchema.validate({
            productId,
            name: productToUpdate.name,
            category: productToUpdate.category
        })

        if (error) {
            result.error = error
            return result
        }

        const productFound = await getProductByIdDao(productId)

        if (!productFound) {
            result.error = { message: 'El producto indicado no existe' }
            return result
        }

        const categoryFound = await getCategoryByIdService(productToUpdate.category)

        if (!categoryFound.data) {
            result.error = { message: 'La categoría indicada no existe' }
            return result
        }

        productToUpdate.name = firstCapitalLetter(productToUpdate.name)

        const status = await updateProductDao(productId, productToUpdate)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const disableProductService = async (productId) => {
    let result = {}

    try {
        const { error } = productIdSchema.validate({ productId })

        if (error) {
            result.error = error
            return result
        }

        const productFound = await getProductByIdDao(productId)

        if (!productFound) {
            result.data = null
            return result
        }

        const status = await disableProductDao(productId)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const enableProductService = async (productId) => {
    let result = {}

    try {
        const { error } = productIdSchema.validate({ productId })

        if (error) {
            result.error = error
            return result
        }

        const productFound = await getProductByIdDao(productId)

        if (!productFound) {
            result.data = null
            return result
        }

        const status = await enableProductDao(productId)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}