import { connectToDatabase } from '@/lib/db'
import Task from '@/models/Task'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase()

        const { searchParams } = new URL(req.url)
        const dashboardId = searchParams.get('dashboardId')

        if (!dashboardId) {
            return NextResponse.json(
                { success: false, message: 'dashboardId is required' },
                { status: 400 }
            )
        }

        const tasks = await Task.find({ dashboardId })

        return NextResponse.json({ success: true, tasks })
    } catch (error) {
        console.error('Failed to fetch tasks:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to fetch tasks' },
            { status: 500 }
        )
    }
}

export async function PUT(req: Request) {
    try {
        await connectToDatabase()

        const { searchParams } = new URL(req.url)
        const taskId = searchParams.get('taskId')

        const data = await req.json()
        const updated = await Task.findByIdAndUpdate(taskId, data, { new: true })

        if (!updated) {
            return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, task: updated })
    } catch (err) {
        console.error('Update task error:', err)
        return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 })
    }
}