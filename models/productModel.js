import mongoose, { Schema } from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es requerido'],
        maxLength: [100, 'El nombre del producto no debe tener más de 100 caracteres'],
        unique: true
    },
    stock: {
        type: Number,
        required: [true, 'El stock del producto es requerido'],
        min: [0, 'El valor del stock del producto no es válido'],
    },
    price: {
        type: Number,
        required: [true, 'El precio del producto es requerido'],
        min: [0, 'El precio del producto no es válido'],
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category',
        required: [true, 'La categoría a la que pertenece el producto es requerida']
    },
    enabled: {
        type: Number,
        required: [true, 'El estado del producto es requerido'],
        enum: [0, 1]
    }
}, {
    versionKey: false
})

export default mongoose.model('Product', productSchema)