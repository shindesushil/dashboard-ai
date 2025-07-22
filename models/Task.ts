import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    dashboardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard' },
    name: String,
    description: String,
    status: String,
    category: String,
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Task || mongoose.model('Task', taskSchema)
