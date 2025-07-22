import { connectToDatabase } from '@/lib/db'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { taskId: string } }) {
    try {
        await connectToDatabase()
        const data = await req.json()
        const updated = await Task.findByIdAndUpdate(params.taskId, data, { new: true })

        if (!updated) {
            return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, task: updated })
    } catch (err) {
        console.error('Update task error:', err)
        return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 })
    }
}
