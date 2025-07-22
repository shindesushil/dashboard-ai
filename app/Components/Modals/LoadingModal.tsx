'use client'

import { Loader2 } from 'lucide-react'

export default function LoadingModal({ isOpen }: { isOpen: boolean }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg px-8 py-6 shadow-md flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm text-muted-foreground">Processing, please wait...</p>
            </div>
        </div>
    )
}
