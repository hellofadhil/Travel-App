import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}