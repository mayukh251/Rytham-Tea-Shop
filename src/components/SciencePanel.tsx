import React, { useState } from 'react'
import { Microscope, Activity, BrainCircuit } from 'lucide-react'

export const SciencePanel: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'gut' | 'brain' | 'energy'>('gut')

  const pillars = [
    {
      id: 'gut' as const,
      icon: Microscope,
      title: '01 / Prebiotic Enrichment',
      headline: 'Enhancing microbiome density',
      desc: 'Our botanical extractions contain concentrated catechins and prebiotic polyphenols that selectively nourish beneficial probiotic strains, strengthening gut barrier function.',
      activeColor: 'var(--color-lime-pulse)'
    },
    {
      id: 'brain' as const,
      icon: BrainCircuit,
      title: '02 / Neuro-Modulation',
      headline: 'L-Theanine Gut-Brain Signal',
      desc: 'Crucial amino acids like L-Theanine pass through the intestinal lining to signal calming neurological responses, balancing cortisol and improving mental clarity.',
      activeColor: 'var(--color-olive-gold)'
    },
    {
      id: 'energy' as const,
      icon: Activity,
      title: '03 / Metabolic Stability',
      headline: 'Slow-Release Bio-availability',
      desc: 'Naturally bound tea tannins slow down the metabolic absorption of caffeine. This guarantees sustained, non-jittery energy release over 6 to 8 hours.',
      activeColor: 'var(--color-eucalyptus)'
    }
  ]

  const activePillarData = pillars.find(p => p.id === activePillar) || pillars[0]

  return (
    <section id="science" className="w-full bg-[var(--surface-page-canvas)] py-20 px-6 md:px-12 border-b border-[var(--color-warm-stone)]">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Column (~40% width): Scientific Context */}
        <div className="w-full lg:w-[40%] flex flex-col items-start text-left">
          <span className="font-mono text-[11px] text-[var(--color-sage-moss)] uppercase tracking-[0.2em] block mb-3">
            Systemic Wellness
          </span>
          <h2 className="font-sans text-[36px] md:text-[40px] font-[300] text-[var(--color-forest-depths)] leading-[1.1] tracking-[-0.4px] mb-6">
            Grounded in <br />
            Prebiotic Science.
          </h2>
          <p className="font-sans text-[15px] text-[var(--color-pewter)] leading-relaxed mb-8">
            Unlike commercial teas, Seed blends are designed under pharmaceutical-grade insight. We map the biological profile of each leaf to guarantee maximum bio-availability of polyphenol compounds.
          </p>

          {/* Interactive Selection List */}
          <div className="flex flex-col gap-3 w-full">
            {pillars.map((pillar) => {
              const IconComp = pillar.icon
              const isSelected = activePillar === pillar.id
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-start gap-4 border cursor-pointer ${
                    isSelected 
                      ? 'bg-[var(--color-snow-white)] border-[var(--color-forest-depths)] border-opacity-20 shadow-none' 
                      : 'bg-transparent border-transparent hover:bg-[var(--color-warm-stone)]'
                  }`}
                >
                  <div className={`p-2.5 rounded-full ${isSelected ? 'bg-[var(--color-forest-depths)] text-[var(--color-snow-white)]' : 'bg-[var(--color-warm-stone)] text-[var(--color-forest-depths)]'}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-wider block mb-0.5">
                      {pillar.title}
                    </span>
                    <span className="font-sans text-[15px] font-medium text-[var(--color-forest-depths)]">
                      {pillar.headline}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column (~60% width): Science Diagram + Apothecary card details */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6 items-center">
          {/* Main Visualizer (Scenic Video of Tea Cup Shot) */}
          <video 
            src="/videos/tea_cup_shot.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full aspect-[4/3] max-w-lg rounded-[24px] border border-[var(--color-frosted-glass)] border-opacity-35 object-cover"
          />

          {/* Frosted Glass Detail Card (apothecary-glass effect with blur) */}
          <div className="w-full max-w-lg rounded-2xl apothecary-glass p-6 text-left transition-all duration-500">
            <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-wider block mb-2">
              Clinical Assessment
            </span>
            <h4 className="font-sans text-[18px] font-semibold text-[var(--color-forest-depths)] mb-3">
              {activePillarData.headline}
            </h4>
            <p className="font-sans text-[14px] text-[var(--color-pewter)] leading-relaxed">
              {activePillarData.desc}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dashScroll {
          to {
            stroke-dashoffset: -28;
          }
        }
        .animate-dash {
          animation: dashScroll 1.5s infinite linear;
        }
      `}</style>
    </section>
  )
}
