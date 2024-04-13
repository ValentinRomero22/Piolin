import Joi from '@hapi/joi'

export const productIdSchema = Joi.object({
    productId: Joi.string()
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

export const createProductSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .empty()
        .max(100)
        .messages({
            "any.required": "Debe ingresar el nombre del producto",
            "string.base": "Los datos indicados no son válidos",
            "string.empty": "Debe ingresar el nombre del producto",
            "string.max": "El nombre del producto no debe tener más de 100 caracteres"
        }),
    price: Joi.number()
        .positive()
        .allow(0)
        .required()
        .empty()
        .min(0)
        .messages({
            "any.required": "Debe ingresar el precio del producto",
            "number.positive": "El precio del producto no debe ser menor que 0",
            "number.base": "El precio del producto debe ser un número",
            "number.empty": "Debe ingresar el precio del producto",
            "number.min": "El precio del producto no debe ser menor a 1"
        }),
    category: Joi.string()
        .required()
        .trim()
        .empty()
        .messages({
            "any.required": "Debe ingresar una categoría",
            "string.base": "Los datos indicados no son válidos",
            "string.empty": "Debe ingresar una categoría"
        }),
})

export const updateProductStockSchema = Joi.object({
    productId: Joi.string()
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
        }),
    newStock: Joi.number()
        .positive()
        .integer()
        .required()
        .empty()
        .min(0)
        .messages({
            "any.required": "Debe ingresar el stock del producto",
            "number.positive": "El stock del producto no debe ser menor que 0",
            "number.integer": "El stock ingresado no es válido",
            "number.base": "El stock del producto debe ser un número",
            "number.empty": "Debe ingresar el stock del producto",
            "number.min": "El stock del producto no puede ser menor que 0"
        })
})

export const updateProductPriceSchema = Joi.object({
    productId: Joi.string()
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
        }),
    newPrice: Joi.number()
        .positive()
        .allow(0)
        .required()
        .empty()
        .min(0)
        .messages({
            "any.required": "Debe ingresar el precio del producto",
            "number.positive": "El precio del producto no debe ser menor que 0",
            "number.base": "El precio del producto debe ser un número",
            "number.empty": "Debe ingresar el precio del producto",
            "number.min": "El precio del producto no debe ser menor que 0"
        })
})

export const updateProductSchema = Joi.object({
    productId: Joi.string()
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
        }),
    name: Joi.string()
        .required()
        .trim()
        .empty()
        .max(100)
        .messages({
            "any.required": "No se encontró el nombre del producto",
            "string.base": "El nombre del producto no es válido",
            "string.empty": "No se encontró el nombre del producto",
            "string.max": "El nombre del producto no debe tener más de 100 caracteres"
        }),
    category: Joi.string()
        .required()
        .trim()
        .empty()
        .messages({
            "any.required": "Debe ingresar una categoría",
            "string.base": "Los datos indicados no son válidos",
            "string.empty": "Debe ingresar una categoría"
        }),
})