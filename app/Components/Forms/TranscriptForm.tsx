'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useDashboardStore } from '@/Store/Store'
import {useRouter} from "next/navigation";
import {useState} from "react";

import LoadingModal from "@/app/Components/Modals/LoadingModal";

const formSchema = z.object({
    dashboardName: z.string().min(2, 'Dashboard name is required'),
    transcript: z.string().min(10, 'Transcript must be at least 10 characters'),
})

type TranscriptFormValues = z.infer<typeof formSchema>

export default function TranscriptForm() {

    const { addDashboard } = useDashboardStore()
    const router = useRouter()

    const [isModalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const form = useForm<TranscriptFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dashboardName: '',
            transcript: '',
        },
    })

    const onSubmit = async (data: TranscriptFormValues) => {
        try {
            setLoading(true)
            const res = await fetch('/api/transcript', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dashboardName: data.dashboardName, transcript: data.transcript }),
            })

            const result = await res.json()
            if (result.success) {
                console.log('AI Tasks:', result.tasks)
                addDashboard({
                    _id: result.dashboardId,
                    name: data.dashboardName
                })

                setModalOpen(true)

                setTimeout(() => {
                    setModalOpen(false)
                    router.push(`/dashboard/${result.dashboardId}`) // Navigate to dashboard page
                }, 2000)
            } else {
                console.error(result.error)
            }
            setLoading(false)
        } catch (err) {
            console.error('API call failed:', err)
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <LoadingModal isOpen={loading} />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
                <FormField
                    control={form.control}
                    name="dashboardName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dashboard Name</FormLabel>
                            <FormControl>
                                <Input className="min-w-[50rem]" placeholder="e.g. Sprint Planning" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="transcript"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meeting Transcript</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Paste or write your meeting transcript here..."
                                    className="min-h-[30rem] min-w-[50rem] resize"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full md:w-auto">
                    Submit
                </Button>
            </form>
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-md px-6 py-4">
                            <p className="text-xl font-semibold">Dashboard created!</p>
                            <p className="text-sm text-gray-600">Redirecting you now...</p>
                        </div>
                    </div>
                )
            }
        </Form>
    )
}
