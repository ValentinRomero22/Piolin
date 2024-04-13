import mongoose, { Schema } from 'mongoose'

const itemSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId, ref: 'Product',
        required: [true, 'El producto es requerido']
    },
    unitPrice: {
        type: Number,
        required: [true, 'Debe indicar el precio unitario'],
        min: [0, 'El precio unitario no es válido']
    },
    quantity: {
        type: Number,
        required: [true, 'La cantidad es requerida'],
        min: [0, 'La cantidad no es válida']
    }
}, {
    _id: false
})

const relatedMovementSchema = new mongoose.Schema({
    movementId: {
        type: Schema.Types.ObjectId, ref: 'Movement'
    }
}, {
    _id: false
})

const movementSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        required: [true, 'La fecha es requerida']
    },
    type: {
        type: Number,
        required: [true, 'Debe inidicar el tipo de movimiento'],
        enum: [1, 2, 3]
    },
    items: [itemSchema],
    total: {
        type: Number,
        required: [true, 'La suma total del movimiento es requerida']
    },
    relatedMovements: [relatedMovementSchema]
}, {
    versionKey: false
})

export default mongoose.model('Movement', movementSchema)