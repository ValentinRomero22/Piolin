import { Router } from 'express'

import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory
} from '../controllers/categoryController.js'

export const categoryRouter = Router()

categoryRouter.get('/categoria', getAllCategories)
categoryRouter.get('/categoria/:categoryId', getCategoryById)
categoryRouter.post('/categoria', createCategory)
categoryRouter.put('/categoria/:categoryId', updateCategory)