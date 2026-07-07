import React from 'react'
import { ScrollSequence } from './ScrollSequence'
import { Sparkles, ArrowRight } from 'lucide-react'

interface HeroProps {
  onQuizClick: () => void
  onShopClick: () => void
}

export const Hero: React.FC<HeroProps> = ({ onQuizClick, onShopClick }) => {
  return (
    <section 
      id="hero" 
      className="relative w-full h-[220vh] bg-[var(--surface-page-canvas)]"
    >
      {/* Pinned Sticky Wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center z-10">
        
        {/* Full-bleed Scroll Sequence Background */}
        <ScrollSequence />

        {/* Hero Content Overlay (Text and Specs float on top of the canvas) */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Glassmorphic apothecary text panel */}
          <div className="flex-1 flex flex-col items-start text-left p-6 md:p-10 apothecary-glass rounded-[32px] max-w-xl animate-fade-in shadow-none lg:-ml-8 xl:-ml-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--color-forest-depths)] border-opacity-25 rounded-[1000px] bg-[var(--color-warm-stone)] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-sage-moss)]" />
              <span className="font-mono text-[10px] text-[var(--color-forest-depths)] uppercase tracking-wider">
                Botanical Alchemy
              </span>
            </div>

            {/* Display Title (Seed Sans 48px/350, letter-spacing -0.72px) */}
            <h1 className="font-sans text-[36px] md:text-[46px] font-[300] text-[var(--color-forest-depths)] leading-[1.1] tracking-[-0.72px] mb-6">
              The Alchemy <br />
              of Botanical Tea.
            </h1>

            {/* Subtitle / Body text (16px weight 400, line-height 1.5) */}
            <p className="font-sans text-[14px] md:text-[15px] font-[400] text-[var(--color-pewter)] leading-[1.6] mb-8">
              Formulated for systemic prebiotic health. Rhythm Tea Co. merges clinical research with the heritage of high-altitude harvesting. Elevated density, organic purity, and clinical transparency.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Primary Filled Button */}
              <button 
                onClick={onShopClick}
                className="bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] px-8 py-4 rounded-[1000px] text-[14px] font-normal tracking-wide uppercase font-sans hover:opacity-90 transition-all cursor-pointer text-center"
              >
                Explore the Collection
              </button>
              
              {/* Secondary Text Link with Arrow */}
              <button 
                onClick={onQuizClick}
                className="inline-flex items-center justify-center gap-1.5 text-[var(--color-forest-depths)] font-medium text-[13px] uppercase tracking-wider hover:opacity-75 transition-opacity py-2 border-b border-[var(--color-forest-depths)] border-opacity-30 cursor-pointer font-sans"
              >
                Discover Your Match <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Monospaced Clinical Footnote */}
            <div className="mt-8 flex items-center gap-4 border-t border-[var(--color-forest-depths)] border-opacity-10 pt-6 w-full">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[var(--color-forest-depths)] font-[500]">ACTIVE CONSTITUENTS</span>
                <span className="font-mono text-[8px] text-[var(--color-pewter)] tracking-widest uppercase">93% Achromatic Core</span>
              </div>
              <div className="w-px h-6 bg-[var(--color-forest-depths)] bg-opacity-10"></div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[var(--color-forest-depths)] font-[500]">CLINICAL STABILITY</span>
                <span className="font-mono text-[8px] text-[var(--color-pewter)] tracking-widest uppercase">Prebiotic Tested</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating specifications tag */}
          <div className="flex-shrink-0 w-full md:w-[280px] p-6 md:p-8 apothecary-glass rounded-[24px] text-left relative z-20 self-end md:mb-12 shadow-none">
            <span className="font-mono text-[9px] text-[var(--color-pewter)] block mb-1">01 / LAB RECORD</span>
            <span className="font-sans text-[13px] font-semibold text-[var(--color-forest-depths)] block leading-tight">
              Prebiotic botanical infusion.
            </span>
            <span className="font-mono text-[9px] text-[var(--color-sage-moss)] block mt-2 mb-4">
              93% Pure Active Core
            </span>
            
            {/* Divider */}
            <div className="w-full border-t border-[var(--color-forest-depths)] border-opacity-10 pt-4 flex flex-col gap-1.5 text-[9px] font-mono text-[var(--color-pewter)]">
              <span>JAR REF: #DS-01</span>
              <span>TEMP STABILITY: 4°C - 25°C</span>
              <span>SPECIMEN GRADE: ROYAL</span>
            </div>

            {/* Floating highlight tag */}
            <div className="absolute top-4 right-4 bg-[var(--color-lime-pulse)] text-[var(--color-forest-depths)] font-mono text-[8px] font-medium uppercase px-2 py-0.5 rounded-[1000px]">
              Active
            </div>
          </div>

        </div>

        {/* Floating Scroll Indicator Badge */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 font-mono text-[9px] text-[var(--color-forest-depths)] uppercase tracking-[0.2em] bg-[var(--color-snow-white)] bg-opacity-80 px-4 py-2 rounded-[1000px] border border-[var(--color-warm-stone)] flex items-center gap-1.5 animate-pulse select-none">
          <span>Scroll to Animate</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-forest-depths)] block"></span>
        </div>

      </div>
    </section>
  )
}
