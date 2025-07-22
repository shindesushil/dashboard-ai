import { connectToDatabase } from '@/lib/db'
import Dashboard from '@/models/Dashboard'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        await connectToDatabase()
        const dashboards = await Dashboard.find().sort({ createdAt: -1 }) // optional sort
        return NextResponse.json({ success: true, dashboards })
    } catch (error) {
        console.error('Error fetching dashboards:', error)
        return NextResponse.json({ success: false, message: 'Failed to fetch dashboards' }, { status: 500 })
    }
}
