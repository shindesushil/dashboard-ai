import { connectToDatabase } from '@/lib/db'
import Task from '@/models/Task'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: { dashboardId: string } }
) {
    try {
        await connectToDatabase()

        const { dashboardId } = params

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
