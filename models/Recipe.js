import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true},
    ingredients: [],
    instructions: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);