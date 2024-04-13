import { Router } from 'express'

import {
    getProductById,
    getAllProducts,
    getProductsByCategory,
    createProduct,
    updateProductStock,
    updateProductPrice,
    updateProduct,
    disableProduct,
    enableProduct
} from '../controllers/productController.js'

export const productRouter = Router()

productRouter.get('/producto/:productId', getProductById)
productRouter.get('/producto', getAllProducts)
productRouter.get('/producto/categoria/:categoryId', getProductsByCategory)
productRouter.post('/producto', createProduct)
productRouter.put('/producto/stock/:productId', updateProductStock)
productRouter.put('/producto/precio/:productId', updateProductPrice)
productRouter.put('/producto/:productId', updateProduct)
productRouter.delete('/producto/:productId', disableProduct)
productRouter.put('/producto/habilitar/:productId', enableProduct)