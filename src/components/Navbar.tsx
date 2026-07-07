import React from 'react'
import { ShoppingBag, Sparkles } from 'lucide-react'

interface NavbarProps {
  cartCount: number
  onCartClick: () => void
  onQuizClick: () => void
  onSectionClick: (sectionId: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartClick, 
  onQuizClick, 
  onSectionClick 
}) => {
  return (
    <header className="sticky top-0 w-full h-16 md:h-20 bg-[var(--color-snow-white)] border-b border-[var(--color-warm-stone)] flex items-center justify-between px-6 md:px-12 z-40 transition-all duration-300">
      {/* Left: Brand Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => onSectionClick('hero')}
      >
        <span className="font-sans text-[20px] md:text-[24px] font-[300] tracking-[0.2em] text-[var(--color-forest-depths)] uppercase">
          Rhythm
        </span>
        <span className="w-2 h-2 rounded-full bg-[var(--color-lime-pulse)] block transform translate-y-[-2px]"></span>
        <span className="font-mono text-[9px] text-[var(--color-pewter)] uppercase tracking-wider hidden sm:inline-block ml-1 border border-[var(--color-warm-stone)] px-1.5 py-0.5 rounded">
          Tea Co.
        </span>
      </div>

      {/* Center: Links */}
      <nav className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => onSectionClick('collection')}
          className="text-[var(--color-forest-depths)] font-medium text-[14px] hover:opacity-75 transition-opacity cursor-pointer uppercase tracking-wider font-sans"
        >
          The Collection
        </button>
        <button 
          onClick={() => onSectionClick('science')}
          className="text-[var(--color-forest-depths)] font-medium text-[14px] hover:opacity-75 transition-opacity cursor-pointer uppercase tracking-wider font-sans"
        >
          Prebiotic Science
        </button>
        <button 
          onClick={() => onSectionClick('deep-dive')}
          className="text-[var(--color-forest-depths)] font-medium text-[14px] hover:opacity-75 transition-opacity cursor-pointer uppercase tracking-wider font-sans"
        >
          Botanical Directory
        </button>
        <button 
          onClick={onQuizClick}
          className="text-[var(--color-forest-depths)] font-medium text-[14px] flex items-center gap-1.5 hover:opacity-75 transition-opacity cursor-pointer uppercase tracking-wider font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-sage-moss)]" />
          Ritual Quiz
        </button>
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Cart Trigger */}
        <button 
          onClick={onCartClick}
          className="flex items-center gap-2 px-4 py-2 border border-[var(--color-forest-depths)] rounded-[1000px] hover:bg-[var(--color-forest-depths)] hover:text-[var(--color-snow-white)] transition-all duration-300 text-[13px] font-medium tracking-wide uppercase font-sans cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart</span>
          <span className="w-5 h-5 rounded-full bg-[var(--color-lime-pulse)] text-[var(--color-forest-depths)] flex items-center justify-center text-[10px] font-bold font-mono">
            {cartCount}
          </span>
        </button>

        {/* Action Button */}
        <button 
          onClick={onQuizClick}
          className="bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] px-5 py-2.5 rounded-[1000px] hover:opacity-90 transition-all text-[13px] font-medium tracking-wide uppercase font-sans shadow-none cursor-pointer hidden sm:block"
        >
          Get Started
        </button>
      </div>
    </header>
  )
}
