import mongoose from 'mongoose'

const dashboard = new mongoose.Schema({
    name: String,
    transcriptHash: String,
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Dashboard ||
mongoose.model('Dashboard', dashboard)
