'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { TaskType } from '@/types/task.type'

interface Props {
    task: TaskType
    open: boolean
    onClose: () => void
    onUpdate: (updatedTask: TaskType) => void
}

export default function EditTaskModal({ task, open, onClose, onUpdate }: Props) {
    const [updatedTask, setUpdatedTask] = useState<TaskType>({ ...task })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUpdatedTask((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        console.log(task._id)
        const res = await fetch(`/api/tasks?taskId=${task._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        })
        const data = await res.json()
        if (data.success) {
            onUpdate(updatedTask)
            onClose()
        } else {
            alert('Failed to update task')
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <div className='space-y-4'>
                    <Input name="name" value={updatedTask.name} onChange={handleChange} placeholder="Task name" />
                    <Textarea name="description" value={updatedTask.description} onChange={handleChange} placeholder="Description" />
                    <Input name="status" value={updatedTask.status} onChange={handleChange} placeholder="Status" />
                    <Input name="category" value={updatedTask.category} onChange={handleChange} placeholder="Category" />
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
