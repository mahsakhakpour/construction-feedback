'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BarChart3, Home, Users } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Surveys', href: '/surveys', icon: Users },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Course Analytics
          </Link>
          
          <div className="flex gap-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-600',
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}