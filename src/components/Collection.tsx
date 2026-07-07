import React from 'react'
import { TeaJarGraphic } from './TeaJarGraphic'

export interface Product {
  id: string
  code: string
  name: string
  price: number
  variant: 'darjeeling' | 'assam' | 'nilgiri' | 'masala' | 'kahwa' | 'kangra' | 'matcha'
  category: string
  description: string
  accentColor: string
}

interface CollectionProps {
  onAddToCart: (product: Product, isSubscription: boolean) => void
  products: Product[]
}

export const Collection: React.FC<CollectionProps> = ({ onAddToCart, products }) => {
  return (
    <section id="collection" className="w-full bg-[var(--color-forest-depths)] py-20 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[var(--color-snow-white)] border-opacity-10 pb-8 gap-6 text-left">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] text-[var(--color-lime-pulse)] uppercase tracking-[0.2em] block mb-3">
              Experimental Blends
            </span>
            <h2 className="font-sans text-[32px] md:text-[40px] font-[300] text-[var(--color-snow-white)] leading-tight tracking-[-0.48px]">
              The Royal Apothecary Collection.
            </h2>
          </div>
          <p className="font-sans text-[14px] font-[400] text-[var(--color-frosted-glass)] max-w-sm leading-relaxed">
            Six premium Indian botanical extractions. Harvested under strict protocol, designed to enrich the gut-brain microbiome axis.
          </p>
        </div>

        {/* Product Grid (3-column equal width layout for 6 products) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => {
            return (
              <div 
                key={product.id}
                className="flex flex-col items-start text-left group"
              >
                {/* Product Card Container (Full-bleed JPEGs, no padding, z-10 badges) */}
                <div className="w-full aspect-[4/3] flex items-center justify-center rounded-2xl bg-[rgba(252,252,247,0.03)] border border-[rgba(252,252,247,0.05)] mb-6 transition-all duration-500 group-hover:bg-[rgba(252,252,247,0.06)] relative overflow-hidden">
                  {/* Tag Badge (e.g. New or Bestseller) - Translucent Snow White bg */}
                  <div className="absolute top-4 left-4 bg-[rgba(28,58,19,0.7)] backdrop-blur-sm text-[var(--color-snow-white)] font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-[1000px] z-20">
                    Botanical Grade
                  </div>

                  {/* Price Badge (Top-Right) */}
                  <div className="absolute top-4 right-4 font-mono text-[12px] font-medium text-[var(--color-lime-pulse)] z-20 bg-[rgba(28,58,19,0.7)] backdrop-blur-sm px-2.5 py-1 rounded-[1000px]">
                    ${product.price}.00
                  </div>

                  {/* Graphic */}
                  <TeaJarGraphic variant={product.variant} size="md" />
                </div>

                {/* Product Code Pill (1.5px solid outline in Snow White) */}
                <div className="inline-block border-[1.5px] border-[var(--color-snow-white)] border-opacity-30 rounded-[1000px] px-3 py-1 mb-3">
                  <span className="font-mono text-[10px] font-semibold text-[var(--color-snow-white)] uppercase tracking-widest">
                    {product.code}
                  </span>
                </div>

                {/* Product Name (Seed Sans 24px/350 in Snow White) */}
                <h3 className="font-sans text-[22px] md:text-[24px] font-[300] text-[var(--color-snow-white)] tracking-[-0.48px] mb-2 group-hover:text-[var(--color-lime-pulse)] transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-[13px] text-[var(--color-frosted-glass)] leading-relaxed mb-6 h-12 overflow-hidden">
                  {product.description}
                </p>

                {/* Actions: Purchase choices */}
                <div className="flex flex-col gap-2.5 w-full mt-auto">
                  {/* One-time Order (Inverted Light Button: Snow White bg, Forest Depths text) */}
                  <button 
                    onClick={() => onAddToCart(product, false)}
                    className="w-full bg-[var(--color-snow-white)] text-[var(--color-forest-depths)] py-3 rounded-[1000px] text-[13px] font-medium tracking-wide uppercase font-sans hover:bg-[var(--color-lime-pulse)] hover:text-[var(--color-forest-depths)] transition-all cursor-pointer text-center"
                  >
                    Add One-Time
                  </button>

                  {/* Subscribe and Save (Lime Pulse text link / outline style) */}
                  <button 
                    onClick={() => onAddToCart(product, true)}
                    className="w-full border border-[rgba(252,252,247,0.2)] hover:border-[var(--color-lime-pulse)] text-[var(--color-snow-white)] hover:text-[var(--color-lime-pulse)] py-2.5 rounded-[1000px] text-[12px] font-mono tracking-wide uppercase transition-all cursor-pointer text-center"
                  >
                    Subscribe & Save 15%
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
