import {
    getAllCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService
} from '../services/categoryService.js'

export const getAllCategories = async (req, res) => {
    try {
        const result = await getAllCategoriesService()

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
                message: 'Categorías encontradas',
                data: result.data
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontraron categorías',
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

export const getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params

        const result = await getCategoryByIdService(categoryId)

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
                message: 'Categoría encontrada',
                data: result.data
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró la categoría buscada',
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

export const createCategory = async (req, res) => {
    try {
        const newCategory = {
            name: req.body.name
        }

        const result = await createCategoryService(newCategory)

        if (result.error) {
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
                message: 'Categoría creada correctamente'
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: 'Error al intentar crear la categoría'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params
        const categoryToUpdate = {
            name: req.body.name
        }

        const result = await updateCategoryService(categoryId, categoryToUpdate)

        if (result.error) {
            let message = ''

            result.error.details
                ? message = result.error.details[0].message
                : message = 'Error al intentar modificar la categoría'
        }

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Categoría modificada correctamente'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'La categoría indicada no existe'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}