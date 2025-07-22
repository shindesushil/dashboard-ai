import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getTasksFromTranscript } from '@/lib/gemini'
import { connectToDatabase } from '@/lib/db'
import Dashboard from '@/models/Dashboard'
import Task from '@/models/Task'

export async function POST(req: Request) {
    const { transcript, dashboardName } = await req.json()

    if (!transcript || transcript.length < 10) {
        return NextResponse.json({ error: 'Transcript too short' }, { status: 400 })
    }

    try {
        // Connect DB
        await connectToDatabase()

        // Hash the transcript
        const transcriptHash = crypto
            .createHash('sha256')
            .update(transcript)
            .digest('hex')

        // Create Dashboard
        const dashboard = await Dashboard.create({
            name: dashboardName || 'Untitled Meeting',
            transcriptHash,
        })

        // Get AI Tasks
        const aiTasks = await getTasksFromTranscript(transcript)

        // Add dashboardId + save each task
        const taskDocs = await Promise.all(
            aiTasks.map((task: any) =>
                Task.create({
                    ...task,
                    dashboardId: dashboard._id,
                })
            )
        )

        return NextResponse.json({
            success: true,
            dashboardId: dashboard._id,
            tasks: taskDocs,
        })
    } catch (err: any) {
        console.error('Error:', err)
        return NextResponse.json({ error: err.message || 'Failed to save tasks' }, { status: 500 })
    }
}
