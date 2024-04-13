import Joi from '@hapi/joi'

export const categoryIdSchema = Joi.object({
    categoryId: Joi.string()
        .required()
        .trim()
        .empty()
        .min(24)
        .max(24)
        .messages({
            "any.required": "No se encontraron datos requeridos",
            "string.base": "Los datos indicados no son válidos",
            "string.empty": "No se encontraron datos requeridos",
            "string.min": "Los datos indicados no son válidos",
            "string.max": "Los datos indicados no son válidos"
        })
})

export const createCategorySchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .empty()
        .messages({
            "any.required": "Debe ingresar la categoría",
            "string.base": "Los datos indicados no son válidos",
            "string.empty": "Debe ingresar la categoría"
        })
})