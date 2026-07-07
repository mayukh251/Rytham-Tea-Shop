import React, { useState } from 'react'

export const IngredientDeepDive: React.FC = () => {
  const [activeIngredient, setActiveIngredient] = useState<'darjeeling' | 'assam' | 'nilgiri' | 'masala' | 'kahwa' | 'kangra'>('darjeeling')

  const ingredients = {
    darjeeling: {
      name: 'Darjeeling First Flush',
      code: 'MONO-DJ-01',
      source: 'Darjeeling District, West Bengal (Alt. 2000m)',
      family: 'Theaceae (Camellia sinensis var. sinensis)',
      compounds: 'Epicatechins, Thearubigins, L-Theanine, Terpenoids',
      ratio: '1:1 Whole Leaf Orthodox Grade',
      clinicalTarget: 'Microvascular circulation & neural antioxidant defense',
      specifications: [
        { label: 'MUSCATEL TERPENES', value: 'Standardized profile' },
        { label: 'CATECHINS DENSITY', value: '118 mg per serving' },
        { label: 'PREBIOTIC STABILITY', value: '94% active retention' },
        { label: 'OXIDATION FRACTION', value: 'Light (8% - 12% semi-fermented)' }
      ]
    },
    assam: {
      name: 'Malty Assam Black',
      code: 'MONO-AS-02',
      source: 'Assam Valley, Northeast India (Alt. 50m)',
      family: 'Theaceae (Camellia sinensis var. assamica)',
      compounds: 'Theaflavins, Prebiotic Tannins, Polyphenols',
      ratio: '1:1 CTC & Orthodox Blend',
      clinicalTarget: 'Mitochondrial metabolic activation & digestive tract motility',
      specifications: [
        { label: 'THEAFLAVIN DENSITY', value: '42 mg per serving' },
        { label: 'METABOLIC ACCELERATOR', value: '92 (Sustained)' },
        { label: 'SOLUBILITY VALUE', value: '99.2% bio-available' },
        { label: 'FERMENTATION LEVEL', value: '100% Fully Oxidized' }
      ]
    },
    nilgiri: {
      name: 'Nilgiri Frost Leaf',
      code: 'MONO-NL-03',
      source: 'Nilgiri Hills, Tamil Nadu (Alt. 1800m)',
      family: 'Theaceae (Camellia sinensis var. sinensis)',
      compounds: 'Methylxanthines, Catechins, Soluble Prebiotic Solids',
      ratio: '1:1 High-Elevation Winter Flush',
      clinicalTarget: 'Parasympathetic cardiovascular ease & systemic vitality',
      specifications: [
        { label: 'BRISKNESS FACTOR', value: 'High concentration' },
        { label: 'FLAVONOID CORE', value: '76 mg per serving' },
        { label: 'ANTIOXIDANT INDEX', value: '88% soluble matrix' },
        { label: 'MINERAL CO-FACTORS', value: 'Potassium, Manganese rich' }
      ]
    },
    masala: {
      name: 'Masala Spiced Core',
      code: 'MONO-MS-04',
      source: 'Kerala Spice Gardens, South India (Alt. 400m)',
      family: 'Zingiberaceae / Lauraceae / Piperaceae',
      compounds: 'Gingerol, Piperine, Cardamom Terpenes, Cinnamaldehyde',
      ratio: '8:1 Macerated Low-Temp Extraction',
      clinicalTarget: 'Thermogenic calorie clearance & intestinal lining integrity',
      specifications: [
        { label: 'GINGEROL FRACTION', value: '12.4% standardized' },
        { label: 'PIPERINE BOOST', value: 'Increases absorption by 200%' },
        { label: 'CARMINATIVE CORE', value: 'Active Gut relaxant' },
        { label: 'STARCH FRACTION', value: '0% (Completely clean)' }
      ]
    },
    kahwa: {
      name: 'Kashmiri Kahwa Saffron',
      code: 'MONO-KW-05',
      source: 'Kashmir Valley, Northern India (Alt. 1600m)',
      family: 'Iridaceae (Crocus sativus) / Rosaceae',
      compounds: 'Crocin, Safranal, Picrocrocin, L-Theanine, Green Catechins',
      ratio: '10:1 Vacuum Refined Saffron & Green Tea',
      clinicalTarget: 'Serotonergic brain signaling & neurological circadian calm',
      specifications: [
        { label: 'CROCIN PURITY', value: 'Active Saffron Standardized' },
        { label: 'CORTISOL CONTROL', value: 'Balances stress neurotransmitters' },
        { label: 'AMINO ACID SYNERGY', value: 'Green tea L-Theanine supported' },
        { label: 'PH INTEGRITY', value: '6.5 neutral balance' }
      ]
    },
    kangra: {
      name: 'Kangra Herbal Green',
      code: 'MONO-KN-06',
      source: 'Kangra Valley, Himachal Pradesh (Alt. 1500m)',
      family: 'Theaceae (Camellia sinensis var. sinensis)',
      compounds: 'EGCG, Quercetin, Flavonoid Glycosides',
      ratio: '1:1 High-Altitude Slow-Grown Green Tea',
      clinicalTarget: 'Cellular cytokine regulation & deep systemic immune defense',
      specifications: [
        { label: 'EGCG CONTENT', value: '164 mg per serving' },
        { label: 'ANTIOXIDANT INDEX', value: '820 ORAC units' },
        { label: 'PREBIOTIC FIBER', value: 'Soluble botanical fraction' },
        { label: 'CHLOROPHYLL INDEX', value: 'Highly active natural greens' }
      ]
    }
  }

  const activeData = ingredients[activeIngredient]

  return (
    <section id="deep-dive" className="w-full bg-[var(--surface-page-canvas)] py-20 px-6 md:px-12 border-b border-[var(--color-warm-stone)]">
      <div className="max-w-[1200px] mx-auto">
        {/* Title Section */}
        <div className="text-left mb-12">
          <span className="font-mono text-[11px] text-[var(--color-sage-moss)] uppercase tracking-[0.2em] block mb-3">
            Active Monographs
          </span>
          <h2 className="font-sans text-[32px] md:text-[40px] font-[300] text-[var(--color-forest-depths)] tracking-[-0.48px]">
            The Botanical Directory.
          </h2>
        </div>

        {/* Tab Buttons (Clinical labels) */}
        <div className="flex flex-wrap gap-2 border-b border-[var(--color-warm-stone)] pb-6 mb-10">
          {(Object.keys(ingredients) as Array<keyof typeof ingredients>).map((key) => {
            const isSelected = activeIngredient === key
            return (
              <button
                key={key}
                onClick={() => setActiveIngredient(key)}
                className={`px-6 py-3 rounded-[1000px] font-sans text-[13px] font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] shadow-none'
                    : 'bg-[var(--color-warm-stone)] text-[var(--color-pewter)] hover:bg-[var(--color-frosted-glass)] hover:bg-opacity-30'
                }`}
              >
                {ingredients[key].name}
              </button>
            )
          })}
        </div>

        {/* Monograph Detail Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Left Block */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Monograph code badge */}
              <div className="inline-block border border-[var(--color-forest-depths)] border-opacity-25 rounded-[1000px] px-3 py-1 mb-6">
                <span className="font-mono text-[11px] font-semibold text-[var(--color-forest-depths)] tracking-widest">
                  {activeData.code}
                </span>
              </div>

              <h3 className="font-sans text-[26px] md:text-[32px] font-[300] text-[var(--color-forest-depths)] leading-none tracking-tight mb-4">
                {activeData.name}
              </h3>

              <div className="flex flex-col gap-4 mt-6">
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-wider block">Source Origin</span>
                  <span className="font-sans text-[14px] text-[var(--color-forest-depths)] font-medium">{activeData.source}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-wider block">Botanical Family</span>
                  <span className="font-sans text-[14px] text-[var(--color-forest-depths)] font-medium">{activeData.family}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-wider block">Active Chemical Compounds</span>
                  <span className="font-sans text-[14px] text-[var(--color-forest-depths)] font-medium leading-relaxed">{activeData.compounds}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-wider block">Extraction Ratio</span>
                  <span className="font-sans text-[14px] text-[var(--color-forest-depths)] font-medium">{activeData.ratio}</span>
                </div>
              </div>
            </div>

            {/* Target Note */}
            <div className="mt-8 border-t border-[var(--color-warm-stone)] pt-6">
              <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-wider block">Clinical Target Axis</span>
              <p className="font-sans text-[14px] text-[var(--color-forest-depths)] italic leading-relaxed mt-1">
                "{activeData.clinicalTarget}"
              </p>
            </div>
          </div>

          {/* Right Block */}
          <div className="lg:col-span-7 apothecary-glass rounded-[24px] p-6 md:p-8 flex flex-col justify-center">
            <span className="font-mono text-[11px] text-[var(--color-pewter)] uppercase tracking-[0.1em] block mb-6 border-b border-[var(--color-forest-depths)] border-opacity-10 pb-3">
              Standardized Laboratory Specifications
            </span>

            <div className="flex flex-col gap-4 font-mono text-[13px]">
              {activeData.specifications.map((spec, idx) => (
                <div 
                  key={idx}
                  className="flex justify-between items-center border-b border-[var(--color-warm-stone)] pb-3 text-[var(--color-forest-depths)]"
                >
                  <span className="text-[var(--color-pewter)] font-[300] tracking-wide">
                    {spec.label}
                  </span>
                  <span className="font-[400] tracking-wider" dangerouslySetInnerHTML={{ __html: spec.value }}>
                  </span>
                </div>
              ))}
            </div>

            {/* Verification label */}
            <div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-[var(--color-sage-moss)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-lime-pulse)] animate-pulse"></span>
              <span>INDEPENDENT THIRD-PARTY LAB VERIFIED — 100% SPEC COMPLIANCE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
