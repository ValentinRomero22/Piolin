import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoría es requerido']
    }
}, {
    versionKey: false
})

export default mongoose.model('Category', categorySchema)