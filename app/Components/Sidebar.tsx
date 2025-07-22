'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Create Dashboard', href: '/' },
    { name: 'All Dashboards', href: '/dashboard' }
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="w-full">
            <div className="font-bold text-xl mb-6">InsightBoard</div>
            <nav className="flex flex-col gap-4">
                {navItems.map(({ name, href }) => (
                    <Link
                        key={name}
                        href={href}
                        className={cn(
                            'text-muted-foreground hover:text-primary transition-colors',
                            pathname === href && 'text-primary font-medium'
                        )}
                    >
                        {name}
                    </Link>
                ))}
            </nav>
        </div>
    )
}
