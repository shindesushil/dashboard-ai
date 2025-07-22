'use client'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
    data: number[],
    labels: string[],
    backgroundColors: string[]
    title?: string
}

export default function CustomPieChart({ data,labels, backgroundColors, title = 'Task Breakdown' }: PieChartProps) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                labels: labels,
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 1,
            },
        ],
    }

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    }

    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
            <Pie data={chartData} options={options} />
        </div>
    )
}
