import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Skyline IT Consulting</h1>
            <nav className="flex gap-4">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <a href="#services" className="hover:text-primary transition-colors">Services</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Skyline IT Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

