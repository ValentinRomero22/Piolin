import {
    getAllCategoriesDao,
    getCategoryByIdDao,
    createCategoryDao,
    updateCategoryDao
} from '../daos/categoryDao.js'

import {
    categoryIdSchema,
    createCategorySchema
} from '../validators/categoryValidator.js'

import { firstCapitalLetter } from '../utils/firtsCapitalLetter.js'

export const getAllCategoriesService = async () => {
    let result = {}

    try {
        const categoriesFound = await getAllCategoriesDao()

        result.data = categoriesFound
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const getCategoryByIdService = async (categoryId) => {
    let result = {}

    try {
        const { error } = categoryIdSchema.validate({ categoryId })

        if (error) {
            result.error = error
            return result
        }

        const categoryFound = await getCategoryByIdDao(categoryId)

        result.data = categoryFound
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const createCategoryService = async (newCategory) => {
    let result = {}

    try {
        const { error } = createCategorySchema.validate(newCategory)

        if (error) {
            result.error = error
            return result
        }

        newCategory.name = firstCapitalLetter(newCategory.name)

        const status = await createCategoryDao(newCategory)

        result.data = status
        return result
    } catch (error) {
        result.error = error
        return result
    }
}

export const updateCategoryService = async (categoryId, categoryToUpdate) => {
    let result = {}

    try {
        const { error } = createCategorySchema.validate(categoryToUpdate)

        if (error) {
            result.error = error
            return result
        }

        const categoryFound = await getCategoryByIdDao(categoryId)
        
        if (!categoryFound) {
            result.data = null
            return result
        }

        categoryToUpdate.name = firstCapitalLetter(categoryToUpdate.name)
        
        const status = await updateCategoryDao(categoryId, categoryToUpdate)

        result.data = status
        return result
    } catch (error) {
        result.error
        return result
    }
}