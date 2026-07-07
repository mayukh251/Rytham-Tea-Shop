import React, { useState, useEffect } from 'react'

export const PromoBanner: React.FC = () => {
  const messages = [
    "ROYAL HERITAGE MEETS MODERN SCIENCE — COMPLIMENTARY EMBOSSED SHAKER WITH ALL SUBSCRIPTIONS",
    "FREE EXPERIMENTAL SHIPPING ON ALL ORDERS OVER $75",
    "PRESET LAB INFUSIONS ENJOY 15% OFF + CONTINUOUS BIOMONITORING UPDATES"
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [messages.length])

  return (
    <div className="w-full h-10 bg-[var(--color-snow-white)] border-b border-[var(--color-warm-stone)] flex items-center justify-center overflow-hidden px-4 z-50 relative">
      <div 
        className="text-[var(--color-forest-depths)] text-[11px] font-medium tracking-[0.05em] uppercase font-mono transition-all duration-700 ease-in-out transform opacity-0 scale-95 animate-fade-in"
        key={currentIndex}
        style={{
          animation: 'fadeIn 0.7s forwards'
        }}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-lime-pulse)] mr-2 animate-pulse"></span>
        {messages[currentIndex]}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
