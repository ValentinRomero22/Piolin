import productModel from '../models/productModel.js'

export const getProductByIdDao = async (productId) => {
    try {
        const productFound = await productModel.findById(productId)
        return productFound
    } catch (error) {
        throw error
    }
}

export const getAllProductsDao = async () => {
    try {
        const productsFound = await productModel.find({})
        return productsFound
    } catch (error) {
        throw error
    }
}

export const getProductsByCategoryDao = async (categoryId) => {
    try {
        const productsFound = await productModel.find({ category: categoryId })
        return productsFound
    } catch (error) {
        throw error
    }
}

export const createProductDao = async (newProduct) => {
    try {
        const result = await productModel.create(newProduct)
        return result
    } catch (error) {
        throw error
    }
}

export const updateProductStockDao = async (productId, newStock) => {
    try {
        const result = await productModel.findByIdAndUpdate(
            { _id: productId },
            {
                $set: { stock: newStock }
            }
        )

        return result
    } catch (error) {
        throw error
    }
}

export const updateProductStockAfterSaleDao = async (productId, amountToSubtract) => {
    try {
        const result = await productModel.updateOne(
            { _id: productId },
            {
                $inc: { stock: - amountToSubtract }
            }
        )

        return result
    } catch (error) {
        throw error
    }
}

export const updateProductStockAfterBuyDao = async (productId, amountToIncrease) => {
    try {
        const result = await productModel.updateOne(
            { _id: productId },
            {
                $inc: { stock: + amountToIncrease }
            }
        )

        return result
    } catch (error) {
        throw error
    }
}

export const updateProductPriceDao = async (productId, newPrice) => {
    try {
        const result = await productModel.updateOne(
            { _id: productId },
            {
                $set: { price: newPrice }
            }
        )
        console.log(result)
        return result
    } catch (error) {
        throw error
    }
}

export const updateProductDao = async (productId, productToUpdate) => {
    try {
        const result = await productModel.findByIdAndUpdate(productId, productToUpdate)
        return result
    } catch (error) {
        throw error
    }
}

export const disableProductDao = async (productId) => {
    try {
        const result = await productModel.updateOne(
            { _id: productId },
            {
                $set: { enabled: false }
            }
        )

        return result
    } catch (error) {
        throw error
    }
}

export const enableProductDao = async (productId) => {
    try {
        const result = await productModel.updateOne(
            { _id: productId },
            {
                $set: { enabled: true }
            }
        )

        return result
    } catch (error) {
        throw error
    }
}