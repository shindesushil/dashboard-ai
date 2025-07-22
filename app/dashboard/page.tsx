'use client'


import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import {DashboardType} from "@/types/dashboard.type";

import { useDashboardStore } from '@/Store/Store'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Dashboards() {


    const { dashboards, setDashboards } = useDashboardStore()

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const res = await fetch('/api/dashboards')
                const data = await res.json()
                if (data.success) {
                    setDashboards(data.dashboards)
                }
            } catch (err) {
                console.error('Error fetching dashboards:', err)
            }
        }

        fetchDashboards()
    }, [setDashboards])

    console.log(dashboards)

    // const dashboards: DashboardType[] = [
    //     {
    //         id:'1',
    //         name: 'Sprint 2025.6.1'
    //     },
    //     {
    //         id:'2',
    //         name: 'Sprint 2025.6.2'
    //     }
    // ]

    return (
        <div className="font-sans pb-20 sm:p-20">
            <main className="flex flex-row flex-wrap gap-10 sm:items-start">
                {
                    dashboards.map(dashboard => {
                        return (
                            <Link key={dashboard._id} href={`/dashboard/${dashboard._id}`} className='min-w-1/3'>
                                <Card className="hover:cursor-pointer hover:shadow-card">
                                    <CardHeader>
                                        <CardTitle>{dashboard.name}</CardTitle>
                                        <CardDescription>Card Description</CardDescription>
                                        {/*<CardAction>Card Action</CardAction>*/}
                                    </CardHeader>
                                    <CardContent>
                                        {/*<p>Card Content</p>*/}
                                    </CardContent>
                                    {/*<CardFooter>*/}
                                    {/*    <p>Card Footer</p>*/}
                                    {/*</CardFooter>*/}
                                </Card>
                            </Link>
                        )
                    })
                }
            </main>
        </div>
    );
}
