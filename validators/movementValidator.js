import Joi from '@hapi/joi'

export const movementIdSchema = Joi.object({
    movementId: Joi.string()
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

export const createMovementSchema = Joi.object({
    items: Joi.array().items({ //.items(Joi.object({}))
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
        unitPrice: Joi.number()
            .positive()
            .required()
            .empty()
            .min(1)
            .messages({
                "any.required": "Debe ingresar el precio unitario",
                "number.positive": "El precio unitario ingresado no es válido",
                "number.base": "El precio unitario debe ser un número",
                "number.empty": "Debe ingresar el precio unitario",
                "number.min": "El precio unitario ingresado no es válido"
            }),
        quantity: Joi.number()
            .positive()
            .required()
            .empty()
            .min(1)
            .messages({
                "any.required": "Debe ingresar el total",
                "number.positive": "El total no debe ser menor que 1",
                "number.base": "El total debe ser un número",
                "number.empty": "Debe ingresar el total",
                "number.min": "El total no debe ser menor que 1"
            }),
    }),
    total: Joi.number()
        .positive()
        .allow(0)
        .required()
        .empty()
        .min(0)
        .messages({
            "any.required": "Debe ingresar el total",
            "number.positive": "El total no debe ser menor que 0",
            "number.base": "El total debe ser un número",
            "number.empty": "Debe ingresar el total",
            "number.min": "El total no debe ser menor que 0"
        }),
    type: Joi.number()
        .positive()
        .required()
        .empty()
        .min(1)
        .max(3)
        .messages({
            "any.required": "Debe ingresar el tipo de movimiento",
            "number.positive": "El tipo de movimiento ingresado no es válido",
            "number.base": "El tipo de movimiento debe ser un número",
            "number.empty": "Debe ingresar el tipo de movimiento",
            "number.min": "El tipo de movimiento ingresado no es válido",
            "number.max": "El tipo de movimiento ingresado no es válido"
        }),
    relatedMovements: Joi.array().items({
        movementId: Joi.string()
            .min(24)
            .max(24)
            .messages({
                "string.min": "Los datos indicados no son válidos",
                "string.max": "Los datos indicados no son válidos"
            })
    })
})