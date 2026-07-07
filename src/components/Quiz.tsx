import React, { useState } from 'react'
import type { Product } from './Collection'
import { TeaJarGraphic } from './TeaJarGraphic'
import { ArrowLeft, ArrowRight, RotateCcw, Check } from 'lucide-react'

interface QuizProps {
  products: Product[]
  onAddToCart: (product: Product, isSubscription: boolean) => void
  onClose: () => void
}

export const Quiz: React.FC<QuizProps> = ({ products, onAddToCart, onClose }) => {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    focus: '',
    flavor: '',
    timing: ''
  })
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null)

  const steps = [
    {
      id: 1,
      question: 'Identify your primary wellness vector:',
      field: 'focus' as const,
      options: [
        { label: 'Cerebral Focus & Cognitive Clarity', value: 'Cerebral Focus' },
        { label: 'Metabolic Support & Sustained Vitality', value: 'Metabolic Support' },
        { label: 'Systemic Immunity & Cellular Defense', value: 'Systemic Immunity' },
        { label: 'Circadian Calming & Restorative Sleep', value: 'Circadian Calming' }
      ]
    },
    {
      id: 2,
      question: 'Select your preferred flavor profile:',
      field: 'flavor' as const,
      options: [
        { label: 'Vibrant, grassy, and highly concentrated', value: 'Vibrant & Grassy' },
        { label: 'Rich, roasted, and warm amber tones', value: 'Rich & Roasted' },
        { label: 'Mild, clean, and herbal-earthy accents', value: 'Clean & Herbal' },
        { label: 'Cool, soothing, and botanical-fresh notes', value: 'Cool & Aromatic' }
      ]
    },
    {
      id: 3,
      question: 'When do you request biological support?',
      field: 'timing' as const,
      options: [
        { label: 'Morning Activation (6 AM - 10 AM)', value: 'Morning' },
        { label: 'Mid-Day Sustainability (11 AM - 3 PM)', value: 'Mid-Day' },
        { label: 'Afternoon Balance (4 PM - 7 PM)', value: 'Afternoon' },
        { label: 'Circadian Sleep Transition (8 PM - 11 PM)', value: 'Evening' }
      ]
    }
  ]

  const handleSelectOption = (value: string) => {
    const currentField = steps[step - 1].field
    setAnswers(prev => ({ ...prev, [currentField]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1)
    } else {
      calculateMatch()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1)
    }
  }

  const calculateMatch = () => {
    let matched: Product

    // Circadian rest or evening timing -> Kashmiri Kahwa
    if (answers.focus === 'Circadian Calming' || answers.timing === 'Evening') {
      matched = products.find(p => p.variant === 'kahwa') || products[0]
    } 
    // Metabolic or Roasted flavor -> Assam Tea
    else if (answers.focus === 'Metabolic Support' || answers.flavor === 'Rich & Roasted') {
      matched = products.find(p => p.variant === 'assam') || products[0]
    } 
    // Systemic immunity or herbal flavor -> Kangra Tea
    else if (answers.focus === 'Systemic Immunity' || answers.flavor === 'Clean & Herbal') {
      matched = products.find(p => p.variant === 'kangra') || products[0]
    } 
    // Spiced / aromatic -> Masala Blend
    else if (answers.flavor === 'Cool & Aromatic') {
      matched = products.find(p => p.variant === 'masala') || products[0]
    }
    // Fallback -> Darjeeling
    else {
      matched = products.find(p => p.variant === 'darjeeling') || products[0]
    }

    setMatchedProduct(matched)
    setStep(4) // Reveal match step
  }

  const handleReset = () => {
    setAnswers({ focus: '', flavor: '', timing: '' })
    setMatchedProduct(null)
    setStep(1)
  }

  const currentStepData = steps[step - 1]
  const isOptionSelected = currentStepData ? answers[currentStepData.field] !== '' : false

  return (
    <div className="fixed inset-0 bg-[var(--color-forest-depths)] bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-[var(--surface-page-canvas)] border border-[var(--color-forest-depths)] border-opacity-10 rounded-[24px] overflow-hidden p-6 md:p-10 flex flex-col justify-between min-h-[450px] relative max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-[11px] text-[var(--color-pewter)] hover:text-[var(--color-forest-depths)] tracking-wider uppercase border border-[var(--color-warm-stone)] px-3 py-1.5 rounded-[1000px] cursor-pointer"
        >
          Exit Quiz
        </button>

        {step < 4 ? (
          <>
            {/* Header info */}
            <div className="text-left mb-6">
              <span className="font-mono text-[10px] text-[var(--color-sage-moss)] tracking-[0.15em] uppercase block mb-1">
                Clinical Profiler — Step {step} of 3
              </span>
              <div className="w-full bg-[var(--color-warm-stone)] h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-[var(--color-forest-depths)] h-full transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question (Seed Sans weight 350 subheading) */}
            <div className="text-left my-auto">
              <h3 className="font-sans text-[22px] md:text-[26px] font-[300] text-[var(--color-forest-depths)] tracking-tight mb-8 leading-snug">
                {currentStepData.question}
              </h3>

              {/* Options list */}
              <div className="flex flex-col gap-3">
                {currentStepData.options.map((option) => {
                  const isSelected = answers[currentStepData.field] === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelectOption(option.value)}
                      className={`w-full text-left p-4 rounded-xl border font-sans text-[14px] md:text-[15px] transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-[var(--color-forest-depths)] border-[var(--color-forest-depths)] text-[var(--color-snow-white)] font-medium' 
                          : 'bg-[var(--color-snow-white)] border-[var(--color-warm-stone)] hover:bg-[var(--color-warm-stone)] text-[var(--color-forest-depths)]'
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-[var(--color-lime-pulse)]" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Nav controls */}
            <div className="flex justify-between items-center mt-10 pt-4 border-t border-[var(--color-warm-stone)]">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-pewter)] hover:text-[var(--color-forest-depths)] tracking-wider uppercase py-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleNext}
                disabled={!isOptionSelected}
                className={`flex items-center gap-1.5 px-6 py-3 rounded-[1000px] font-sans text-[12px] font-medium tracking-wide uppercase cursor-pointer transition-all duration-300 ${
                  isOptionSelected
                    ? 'bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] hover:opacity-90'
                    : 'bg-[var(--color-ash)] text-[var(--color-pewter)] cursor-not-allowed'
                }`}
              >
                {step === 3 ? 'Match Profile' : 'Next Question'} 
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          /* Match Reveal Step (Step 4) */
          <div className="flex flex-col md:flex-row items-center gap-8 text-left my-auto py-4">
            {/* Left side: graphics */}
            <div className="w-48 h-64 md:w-56 md:h-72 bg-[var(--color-warm-stone)] rounded-[20px] flex items-center justify-center p-4 apothecary-glass relative flex-shrink-0">
              {matchedProduct && <TeaJarGraphic variant={matchedProduct.variant} size="md" />}
            </div>

            {/* Right side: match content */}
            <div className="flex-1">
              <span className="font-mono text-[10px] text-[var(--color-sage-moss)] tracking-[0.2em] uppercase block mb-1">
                Your Biological Match
              </span>
              <h3 className="font-sans text-[28px] md:text-[32px] font-[300] text-[var(--color-forest-depths)] leading-none tracking-tight mb-2">
                {matchedProduct?.name}
              </h3>
              <div className="inline-block border border-[var(--color-forest-depths)] border-opacity-30 rounded-[1000px] px-2.5 py-0.5 mb-4">
                <span className="font-mono text-[9px] text-[var(--color-forest-depths)] uppercase tracking-widest">
                  {matchedProduct?.code}
                </span>
              </div>

              <p className="font-sans text-[14px] text-[var(--color-pewter)] leading-relaxed mb-6">
                Based on your preference for <span className="font-semibold">{answers.focus}</span> and <span className="font-semibold">{answers.timing}</span> activity, we recommend this prebiotic infusion. It supports cellular pathways specifically aligned with your physiological profile.
              </p>

              {/* Add to Cart Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() => {
                    if (matchedProduct) {
                      onAddToCart(matchedProduct, true)
                      onClose()
                    }
                  }}
                  className="bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] px-6 py-3.5 rounded-[1000px] text-[12px] font-medium tracking-wide uppercase font-sans hover:opacity-90 transition-all cursor-pointer flex-1 text-center"
                >
                  Subscribe Match (15% Off)
                </button>
                <button
                  onClick={() => {
                    if (matchedProduct) {
                      onAddToCart(matchedProduct, false)
                      onClose()
                    }
                  }}
                  className="border border-[var(--color-forest-depths)] text-[var(--color-forest-depths)] px-6 py-3.5 rounded-[1000px] text-[12px] font-medium tracking-wide uppercase font-sans hover:bg-[var(--color-forest-depths)] hover:text-[var(--color-snow-white)] transition-all cursor-pointer flex-1 text-center"
                >
                  Add One-Time (${matchedProduct?.price})
                </button>
              </div>

              {/* Reset / Redo quiz link */}
              <button
                onClick={handleReset}
                className="mt-6 flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-pewter)] hover:text-[var(--color-forest-depths)] tracking-wider uppercase cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Retake Profiler Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
