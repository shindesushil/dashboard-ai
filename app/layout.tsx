'use client'

import { Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from './Components/Sidebar'
import { cn } from '@/lib/utils'

import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)

    return (
        <html lang="en">
        <body className={cn('min-h-screen bg-gray-100 font-sans antialiased', inter.className)}>
        <div className="flex h-screen">
            {/* Mobile Sidebar */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] p-4">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white border-r shadow-sm p-4">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <header className="bg-white border-b px-6 py-4 shadow-sm">
                    <div className="text-lg font-semibold hidden md:block">InsightBoard AI</div>
                </header>
                <main className="p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
        </body>
        </html>
    )
}
