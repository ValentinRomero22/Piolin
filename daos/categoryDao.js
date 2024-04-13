import categoryModel from '../models/categoryModel.js'

export const getAllCategoriesDao = async () => {
    try {
        const categoriesFound = await categoryModel.find({})
        return categoriesFound
    } catch (error) {
        throw error
    }
}

export const getCategoryByIdDao = async (categoryId) => {
    try {
        const categoryFound = await categoryModel.findById(categoryId)
        return categoryFound
    } catch (error) {
        throw error
    }
}

export const createCategoryDao = async (newCategory) => {
    try {
        const result = await categoryModel.create(newCategory)
        return result
    } catch (error) {
        throw error
    }
}

export const updateCategoryDao = async (categoryId, categoryToUpdate) => {
    try {
        const result = await categoryModel.findByIdAndUpdate(
            { _id: categoryId },
            {
                $set: { name: categoryToUpdate.name }
            }
        )
        
        return result
    } catch (error) {
        throw error
    }
}