import React, { useEffect, useRef, useState } from 'react'

export const ScrollSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  
  const [loadedCount, setLoadedCount] = useState(0)
  const [currentFrame, setFrameState] = useState(1)
  const totalFrames = 192

  // Preload all frames on mount
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = []
    let loaded = 0

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image()
      const formattedNum = String(i).padStart(5, '0')
      img.src = `/seq/${formattedNum}.jpg`
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
      }
      img.onerror = () => {
        loaded++
        setLoadedCount(loaded)
      }
      loadedImages.push(img)
    }

    imagesRef.current = loadedImages
  }, [])

  // Draw frame helper
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[frameIndex - 1]
    if (!img || !img.complete) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate cover aspect ratio fit
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const imgWidth = img.naturalWidth || img.width
    const imgHeight = img.naturalHeight || img.height

    const r = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
    
    const drawWidth = imgWidth * r
    const drawHeight = imgHeight * r
    
    const offsetX = (canvasWidth - drawWidth) / 2
    const offsetY = (canvasHeight - drawHeight) / 2

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  // Handle canvas sizing and redraws on scroll/resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      
      // Re-draw current frame
      const scrollTop = window.scrollY
      const scrollLimit = window.innerHeight
      const fraction = Math.min(1, Math.max(0, scrollTop / scrollLimit))
      const frameIndex = Math.min(
        totalFrames,
        Math.max(1, Math.floor(fraction * (totalFrames - 1)) + 1)
      )
      drawFrame(frameIndex)
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollLimit = window.innerHeight
      const fraction = Math.min(1, Math.max(0, scrollTop / scrollLimit))
      const frameIndex = Math.min(
        totalFrames,
        Math.max(1, Math.floor(fraction * (totalFrames - 1)) + 1)
      )
      
      setFrameState(frameIndex)
      drawFrame(frameIndex)
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Also draw frame 1 initially
    drawFrame(1)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loadedCount]) // Re-run effect logic as more images load to show content early

  const isLoading = loadedCount < totalFrames

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[var(--surface-page-canvas)]">
      {/* Loading state overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[var(--surface-page-canvas)] bg-opacity-95 z-20 flex flex-col items-center justify-center p-4">
          <span className="font-mono text-[11px] text-[var(--color-pewter)] uppercase tracking-widest mb-2 animate-pulse">
            Preloading Royal Sequence...
          </span>
          <div className="w-40 bg-[var(--color-warm-stone)] h-1 rounded-full overflow-hidden">
            <div 
              className="bg-[var(--color-forest-depths)] h-full transition-all duration-300"
              style={{ width: `${(loadedCount / totalFrames) * 100}%` }}
            ></div>
          </div>
          <span className="font-mono text-[9px] text-[var(--color-pewter)] mt-2">
            {loadedCount} / {totalFrames} Frames
          </span>
        </div>
      )}

      {/* Full bleed drawing canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover block"
      />

      {/* NO WHITE OVERLAY HERE anymore. The background is fully visible in full color! */}

      {/* Monograph debug stamp */}
      <div className="absolute bottom-4 right-4 z-20 font-mono text-[9px] text-[var(--color-pewter)] uppercase tracking-wider bg-[var(--color-snow-white)] bg-opacity-80 px-2 py-1 rounded border border-[var(--color-warm-stone)]">
        SEQUENCE STAMP: FRM-{String(currentFrame).padStart(3, '0')} / {totalFrames}
      </div>
    </div>
  )
}
