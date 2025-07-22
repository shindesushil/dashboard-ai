'use client'

import {TaskType} from "@/types/task.type";
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Braces, ChartLine, ChartPie, CheckCheck, Edit, Hourglass, X} from 'lucide-react'
import {Button} from "@/components/ui/button";
import {use, useEffect, useState} from "react";
import CustomPieChart from "../../Components/Charts/CustomPieChart";

import EditTaskModal from "../../Components/Modals/EditTaskModal";

const hexColors = [
    '#f87171', // red-400
    '#60a5fa', // blue-400
    '#34d399', // green-400
    '#fbbf24', // yellow-400
    '#c084fc', // purple-400
    '#f472b6', // pink-400
    '#fb923c', // orange-400
    '#2dd4bf', // teal-400
    '#818cf8', // indigo-400
    '#fb7185', // rose-400
]



export default function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [showAnalytics, setShowAnalytics] = useState<boolean>(false)

    // const tasks: TaskType[] = [
    //     {
    //         id: '1',
    //         dashboardId: '1',
    //         name: 'Implement Auth Module',
    //         description: 'Develop the login and registration functionality.',
    //         status: 'pending',
    //         category: 'DEV',
    //         createdAt: new Date('2025-07-20T10:30:00Z'),
    //     },
    //     {
    //         id: '2',
    //         dashboardId: '1',
    //         name: 'Write Unit Tests for User Service',
    //         description: 'Cover critical functions with Jest tests.',
    //         status: 'in progress',
    //         category: 'QA',
    //         createdAt: new Date('2025-07-18T12:45:00Z'),
    //     },
    //     {
    //         id: '3',
    //         dashboardId: '1',
    //         name: 'Code Review - Dashboard Module',
    //         description: 'Review PR #42 and leave feedback.',
    //         status: 'completed',
    //         category: 'REVIEW',
    //         createdAt: new Date('2025-07-17T09:00:00Z'),
    //     },
    //     {
    //         id: '4',
    //         dashboardId: '2',
    //         name: 'Fix Pagination Bug',
    //         description: 'Correct off-by-one error in paginated results.',
    //         status: 'in progress',
    //         category: 'DEV',
    //         createdAt: new Date('2025-07-19T15:20:00Z'),
    //     },
    //     {
    //         id: '5',
    //         dashboardId: '1',
    //         name: 'Regression Testing - Release v1.3',
    //         description: 'Test all key user flows for regressions.',
    //         status: 'pending',
    //         category: 'QA',
    //         createdAt: new Date('2025-07-16T14:00:00Z'),
    //     },
    //     {
    //         id: '6',
    //         dashboardId: '2',
    //         name: 'Review API Documentation',
    //         description: 'Ensure the Swagger docs match latest endpoints.',
    //         status: 'completed',
    //         category: 'REVIEW',
    //         createdAt: new Date('2025-07-15T11:10:00Z'),
    //     },
    //     {
    //         id: '7',
    //         dashboardId: '2',
    //         name: 'Add Error Boundaries',
    //         description: 'Wrap major components with React error boundaries.',
    //         status: 'pending',
    //         category: 'DEV',
    //         createdAt: new Date('2025-07-21T08:00:00Z'),
    //     },
    //     {
    //         id: '8',
    //         dashboardId: '2',
    //         name: 'Run Lighthouse Audit',
    //         description: 'Check performance and accessibility of dashboard.',
    //         status: 'in progress',
    //         category: 'QA',
    //         createdAt: new Date('2025-07-20T16:30:00Z'),
    //     },
    //     {
    //         id: '9',
    //         dashboardId: '2',
    //         name: 'Peer Review Signup Flow',
    //         description: 'Another team member should review recent signup changes.',
    //         status: 'pending',
    //         category: 'REVIEW',
    //         createdAt: new Date('2025-07-18T13:50:00Z'),
    //     },
    //     {
    //         id: '10',
    //         dashboardId: '2',
    //         name: 'Implement Loading Skeletons',
    //         description: 'Add skeleton loaders for better UX on slow connections.',
    //         status: 'completed',
    //         category: 'DEV',
    //         createdAt: new Date('2025-07-14T17:25:00Z'),
    //     },
    // ]

    const [tasks, setTasks] = useState<TaskType[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`/api/tasks?dashboardId=${id}`)
                const data = await res.json()
                if (data.success) {
                    setTasks(data.tasks)
                }
            } catch (err) {
                console.error('Error fetching tasks:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [id])

    const dashboardTasks = tasks.filter(t => t.dashboardId === id)

    const uniqueStatuses = Array.from(new Set(dashboardTasks.map((t) => t.status)))
    const uniqueCategories = Array.from(new Set(dashboardTasks.map((t) => t.category)))

    const statusColors = uniqueStatuses.map((_, i) => hexColors[i % hexColors.length])
    const categoryColors = uniqueCategories.map((_, i) => hexColors[i % hexColors.length])

    const statusCounts = uniqueStatuses.map(
        (status) => dashboardTasks.filter((t) => t.status === status).length
    )

    const categoryCounts = uniqueCategories.map(
        (category) => dashboardTasks.filter((t) => t.category === category).length
    )

   
    return (
        <div>
            <div className="flex justify-end py-3">
                <Button className='mb-2' onClick={() => setShowAnalytics(true)}>
                    <ChartLine />
                    Analytics
                </Button>
            </div>
            <div
                className={`p-2 fixed top-0 left-0 w-full h-full z-50 bg-white shadow-lg transition-transform duration-700 ease-in-out ${
                    showAnalytics ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className='flex justify-end'>
                    <Button className='mb-2 float-end' onClick={() => setShowAnalytics(false)}>
                        <X />
                        Close
                    </Button>
                </div>

                <div className='flex flex-row gap-5'>
                    <CustomPieChart
                        title="Status Distribution"
                        labels={uniqueStatuses}
                        backgroundColors={statusColors}
                        data={statusCounts}
                    />
                    <CustomPieChart
                        title="Category Distribution"
                        labels={uniqueCategories}
                        backgroundColors={categoryColors}
                        data={categoryCounts}
                    />
                </div>


            </div>
            <div className='flex flex-row gap-3 pe-6'>
                <div className='flex flex-col gap-1.5 min-w-1/3'>
                    <div className='bg-white p-4 rounded-lg flex gap-1.5'>
                        <Hourglass className='text-red-400'/>
                        <p>Pending</p>
                    </div>
                    {
                        tasks.map((task: TaskType) => {
                            if(task.status === 'pending' && task.dashboardId === id) {
                                return (
                                    <Card key={task._id} className='border-l-8 border-l-red-400'>
                                        <CardHeader>
                                            <CardTitle>{task.name}</CardTitle>
                                            <CardDescription>{task.description}</CardDescription>
                                            <CardAction>
                                                <Edit
                                                    className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer"
                                                    onClick={() => setSelectedTask(task)}
                                                />
                                            </CardAction>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='flex flex-col'>
                                                <div className='flex flex-row gap-2 text-red-400'>
                                                    <p>Status: </p>
                                                    <p className=''>{task.status.toUpperCase()}</p>
                                                </div>
                                                <div className='flex flex-row gap-2 text-blue-400'>
                                                    <p>Category: </p>
                                                    <p className=''>{task.category}</p>
                                                </div>
                                            </div>
                                            <p className='pt-2'>{task.description}</p>
                                        </CardContent>
                                    </Card>

                                )
                            }
                        })
                    }
                    {
                        selectedTask && (
                            <EditTaskModal
                                task={selectedTask}
                                open={!!selectedTask}
                                onClose={() => setSelectedTask(null)}
                                onUpdate={(updatedTask) => {
                                    // Optional: update local state if needed
                                    const updatedTasks = tasks.map(t => t._id === updatedTask._id ? updatedTask : t)
                                    setTasks(updatedTasks)
                                }}
                            />
                        )
                    }

                </div>
                <div className='flex flex-col gap-1.5 min-w-1/3'>
                    <div className='bg-white p-4 rounded-lg flex gap-1.5'>
                        <Braces className='text-blue-400' />
                        <p>In Progress</p>
                    </div>
                    {
                        tasks.map((task: TaskType) => {
                            if(task.status === 'in progress' && task.dashboardId === id) {
                                return (
                                    <Card key={task._id} className='border-l-8 border-l-blue-400'>
                                        <CardHeader>
                                            <CardTitle>{task.name}</CardTitle>
                                            <CardDescription>{task.description}</CardDescription>
                                            <CardAction>
                                                <Edit className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                                            </CardAction>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='flex flex-col'>
                                                <div className='flex flex-row gap-2 text-blue-400'>
                                                    <p>Status: </p>
                                                    <p className=''>{task.status.toUpperCase()}</p>
                                                </div>
                                                <div className='flex flex-row gap-2 text-blue-400'>
                                                    <p>Category: </p>
                                                    <p className=''>{task.category}</p>
                                                </div>
                                            </div>
                                            <p className='pt-2'>{task.description}</p>
                                        </CardContent>
                                    </Card>
                                )
                            }
                        })
                    }
                </div>
                <div className='flex flex-col gap-1.5 min-w-1/3'>
                    <div className='bg-white p-4 rounded-lg flex gap-1.5'>
                        <CheckCheck className='text-green-400' />
                        <p>Completed</p>
                    </div>
                    {
                        tasks.map((task: TaskType) => {
                            if(task.status === 'completed' && task.dashboardId === id) {
                                return (
                                    <Card key={task._id} className='border-l-8 border-l-green-400'>
                                        <CardHeader>
                                            <CardTitle>{task.name}</CardTitle>
                                            <CardDescription>{task.description}</CardDescription>
                                            <CardAction>
                                                <Edit className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                                            </CardAction>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='flex flex-col'>
                                                <div className='flex flex-row gap-2 text-green-400'>
                                                    <p>Status: </p>
                                                    <p className=''>{task.status.toUpperCase()}</p>
                                                </div>
                                                <div className='flex flex-row gap-2 text-blue-400'>
                                                    <p>Category: </p>
                                                    <p className=''>{task.category}</p>
                                                </div>
                                            </div>
                                            <p className='pt-2'>{task.description}</p>
                                        </CardContent>
                                    </Card>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )

}
