import React, { useState } from 'react'

interface TeaJarGraphicProps {
  variant: 'darjeeling' | 'assam' | 'nilgiri' | 'masala' | 'kahwa' | 'kangra' | 'matcha'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
}

export const TeaJarGraphic: React.FC<TeaJarGraphicProps> = ({ 
  variant, 
  size = 'md',
  interactive = true 
}) => {
  const [imageError, setImageError] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Color & Info Mapping
  const colors = {
    darjeeling: {
      content: '#8e7943', // Rich golden yellow
      accent: '#9f995b',  // Olive gold
      label: 'DJ-01®',
      name: 'Darjeeling Tea',
      spec: 'Muscatel First Flush',
      substance: 'First Flush Muscatel Darjeeling',
      imagePath: '/images/darjeeling_tea.jpeg'
    },
    assam: {
      content: '#4a2c16', // Deep malty black-brown
      accent: '#757c5d',  // Sage moss
      label: 'AS-02™',
      name: 'Assam Tea',
      spec: 'Malty Prebiotic Black',
      substance: 'Prebiotic Rich Malty Assam Black',
      imagePath: '/images/assam_tea.jpeg'
    },
    nilgiri: {
      content: '#365342', // Blue-mountain forest green
      accent: '#698e79',  // Eucalyptus/Teal
      label: 'NL-03™',
      name: 'Nilgiri Tea',
      spec: 'Brisks Winter Frost',
      substance: 'Brisk High-Altitude Nilgiri Black',
      imagePath: '/images/nilgiri_tea.jpeg'
    },
    masala: {
      content: '#703c1b', // Spiced orange-brown
      accent: '#d3fa99',  // Lime pulse
      label: 'MS-04®',
      name: 'Masala Tea',
      spec: 'Cardamom & Ginger Infusion',
      substance: 'Spiced Black Tea Masala Blend',
      imagePath: '/images/masala_tea_blend.jpeg'
    },
    kahwa: {
      content: '#926a19', // Saffron golden-orange
      accent: '#9f995b',  // Olive gold
      label: 'KW-05™',
      name: 'Kashmiri Kahwa',
      spec: 'Saffron & Almond Calm',
      substance: 'Saffron Spiced Kashmiri Green Tea',
      imagePath: '/images/kashmiri_kahwa.jpeg'
    },
    kangra: {
      content: '#4a5d3f', // High-altitude light green
      accent: '#757c5d',  // Sage moss
      label: 'KN-06™',
      name: 'Kangra Tea',
      spec: 'Cellular Immune Green',
      substance: 'Immune Supporting Kangra Green Tea',
      imagePath: '/images/kangra_tea.jpeg'
    },
    matcha: {
      content: '#224817',
      accent: '#d3fa99',
      label: 'DS-01®',
      name: 'Royal Matcha',
      spec: 'Prebiotic Wellness',
      substance: 'Ceremonial Stone-Ground Matcha',
      imagePath: '/images/matcha_jar.jpeg'
    }
  }

  const activeColor = colors[variant] || colors.darjeeling

  // Render the generated image if path is present and image loads successfully
  if (activeColor.imagePath && !imageError) {
    return (
      <div 
        className={`relative w-full h-full overflow-hidden transition-all duration-500 ${interactive ? 'hover:scale-105' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ minHeight: size === 'lg' ? '350px' : '220px' }}
      >
        <img 
          src={activeColor.imagePath} 
          alt={`Rhythm Tea ${activeColor.name}`} 
          className="w-full h-full object-cover block"
          onError={() => setImageError(true)}
        />
        {/* Specimen Label Tag Overlay */}
        <div className="absolute bottom-3 left-3 bg-[var(--color-snow-white)] bg-opacity-95 backdrop-blur-sm border border-[var(--color-forest-depths)] border-opacity-10 px-3 py-1.5 rounded-md flex flex-col items-start gap-0.5 z-10 shadow-none">
          <span className="font-mono text-[8px] text-[var(--color-pewter)] tracking-widest uppercase">Specimen {activeColor.label}</span>
          <span className="font-sans text-[11px] font-semibold text-[var(--color-forest-depths)] uppercase tracking-wider">{activeColor.name}</span>
        </div>
      </div>
    )
  }

  // Beautiful interactive SVG rendering
  return (
    <div 
      className={`relative w-full h-full flex items-center justify-center select-none transition-all duration-500 ${interactive ? 'hover:scale-105' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: size === 'lg' ? '350px' : '220px' }}
    >
      <svg 
        viewBox="0 0 240 320" 
        className="w-[180px] h-[240px] drop-shadow-none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* GLOW EFFECT */}
        <ellipse 
          cx="120" 
          cy="180" 
          rx="70" 
          ry="90" 
          fill={activeColor.accent} 
          className="transition-all duration-500 ease-in-out opacity-25"
          style={{
            transform: hovered ? 'scale(1.15)' : 'scale(1)',
            transformOrigin: 'center'
          }}
        />

        {/* CONTAINER/JAR INNER LEAF SHADOW */}
        <rect x="52" y="70" width="136" height="210" rx="20" fill="#1c3a13" fillOpacity="0.05" />

        {/* TEA CONTENT INSIDE */}
        <rect 
          x="56" 
          y="100" 
          width="128" 
          height="172" 
          rx="12" 
          fill={activeColor.content} 
          className="transition-all duration-500"
          style={{
            fillOpacity: hovered ? 0.95 : 0.85
          }}
        />
        
        {/* Texture detail */}
        <circle cx="80" cy="130" r="1.5" fill={activeColor.accent} fillOpacity="0.4" />
        <circle cx="150" cy="120" r="2" fill={activeColor.accent} fillOpacity="0.3" />
        <circle cx="160" cy="180" r="1.5" fill={activeColor.accent} fillOpacity="0.4" />
        <circle cx="90" cy="200" r="2.5" fill={activeColor.accent} fillOpacity="0.2" />
        <circle cx="140" cy="220" r="1" fill={activeColor.accent} fillOpacity="0.5" />

        {/* FROSTED GLASS BODY */}
        <rect 
          x="52" 
          y="70" 
          width="136" 
          height="210" 
          rx="20" 
          stroke="url(#glass-gradient)" 
          strokeWidth="3.5"
        />

        {/* GLASS SHINE REFLECTION */}
        <path d="M 176 90 Q 182 175 176 260" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.3" />
        <path d="M 64 90 Q 58 175 64 260" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.15" />

        {/* METAL / WOOD LID */}
        <g>
          <rect x="74" y="58" width="92" height="12" rx="2" fill="#1c3a13" fillOpacity="0.15" />
          <rect x="70" y="38" width="100" height="20" rx="4" fill="#1c3a13" />
          <line x1="75" y1="43" x2="165" y2="43" stroke="#fcfcf7" strokeWidth="0.8" strokeOpacity="0.3" />
          <ellipse cx="120" cy="48" rx="30" ry="6" fill="#9f995b" fillOpacity="0.3" />
        </g>

        {/* APOTHECARY LABEL */}
        <g>
          <rect x="72" y="115" width="96" height="110" rx="4" fill="#fcfcf7" fillOpacity="0.97" />
          <rect x="76" y="119" width="88" height="102" rx="2" stroke="#1c3a13" strokeWidth="0.75" strokeOpacity="0.15" />
          
          <text x="120" y="140" fill="#1c3a13" fontSize="10" fontWeight="500" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="0.1em">
            {activeColor.label}
          </text>
          
          <line x1="84" y1="150" x2="156" y2="150" stroke="#1c3a13" strokeWidth="0.75" strokeOpacity="0.2" />
          
          <text x="120" y="166" fill="#1c3a13" fontSize="9" fontWeight="300" fontFamily="Inter" textAnchor="middle" letterSpacing="0.06em">
            {activeColor.name.toUpperCase()}
          </text>

          <text x="120" y="180" fill="#757c5d" fontSize="7" fontWeight="400" fontFamily="Inter" textAnchor="middle" letterSpacing="0.02em">
            {activeColor.spec}
          </text>

          <text x="120" y="200" fill="#666666" fontSize="5" fontWeight="400" fontFamily="JetBrains Mono" textAnchor="middle">
            POLYPHENOLS: &gt;420mg
          </text>
          <text x="120" y="208" fill="#666666" fontSize="5" fontWeight="400" fontFamily="JetBrains Mono" textAnchor="middle">
            NET CONTENT: 100g e
          </text>
          <path d="M108 215 C112 213, 116 217, 120 215 C124 213, 128 217, 132 215" stroke={activeColor.content} strokeWidth="0.5" strokeOpacity="0.6" />
        </g>

        {/* DEFINITIONS */}
        <defs>
          <linearGradient id="glass-gradient" x1="52" y1="70" x2="188" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.65" />
            <stop offset="0.3" stopColor="white" stopOpacity="0.1" />
            <stop offset="0.7" stopColor="#1c3a13" stopOpacity="0.05" />
            <stop offset="1" stopColor="white" stopOpacity="0.35" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hover Floating Specimen Plate */}
      <div 
        className={`absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 bg-[var(--color-snow-white)] border border-[var(--color-forest-depths)] border-opacity-20 px-3 py-1 rounded-[1000px] shadow-none flex items-center gap-1.5 transition-all duration-500 ease-out z-10 whitespace-nowrap ${hovered ? 'opacity-100 translate-y-[-8px]' : 'opacity-0 translate-y-[4px]'}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-lime-pulse)]" style={{ backgroundColor: activeColor.accent }}></span>
        <span className="font-mono text-[9px] text-[var(--color-forest-depths)] tracking-wider">
          {activeColor.substance}
        </span>
      </div>
    </div>
  )
}
