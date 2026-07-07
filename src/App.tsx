import { useState } from 'react'
import { PromoBanner } from './components/PromoBanner'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Collection } from './components/Collection'
import type { Product } from './components/Collection'
import { SciencePanel } from './components/SciencePanel'
import { IngredientDeepDive } from './components/IngredientDeepDive'
import { Quiz } from './components/Quiz'
import { CartDrawer } from './components/CartDrawer'
import type { CartItem } from './components/CartDrawer'
import { ShieldCheck, ArrowUpRight } from 'lucide-react'

// Define the 4 premium tea products
const PRODUCTS: Product[] = [
  {
    id: 'darjeeling-dj01',
    code: 'DJ-01®',
    name: 'Darjeeling Tea',
    price: 46,
    variant: 'darjeeling',
    category: 'Systemic Health',
    description: 'First flush Muscatel notes from organic estates, offering high prebiotic antioxidant density.',
    accentColor: 'var(--color-olive-gold)'
  },
  {
    id: 'assam-as02',
    code: 'AS-02™',
    name: 'Assam Tea',
    price: 38,
    variant: 'assam',
    category: 'Metabolic Activation',
    description: 'Robust, malty black tea rich in prebiotic polyphenols for digestive activation and energy.',
    accentColor: 'var(--color-sage-moss)'
  },
  {
    id: 'nilgiri-nl03',
    code: 'NL-03™',
    name: 'Nilgiri Tea',
    price: 36,
    variant: 'nilgiri',
    category: 'Systemic Vitality',
    description: 'Fragrant, brisk winter frost black tea standard-tested for systemic daily vitality.',
    accentColor: 'var(--color-eucalyptus)'
  },
  {
    id: 'masala-ms04',
    code: 'MS-04®',
    name: 'Masala Tea Blend',
    price: 40,
    variant: 'masala',
    category: 'Metabolism Support',
    description: 'Cardamom, ginger, and black pepper infused black tea for metabolic and gut lining activation.',
    accentColor: 'var(--color-lime-pulse)'
  },
  {
    id: 'kahwa-kw05',
    code: 'KW-05™',
    name: 'Kashmiri Kahwa',
    price: 44,
    variant: 'kahwa',
    category: 'Cerebral Calm',
    description: 'Saffron, crushed almonds, and green tea base for cognitive focus and circadian calming.',
    accentColor: 'var(--color-olive-gold)'
  },
  {
    id: 'kangra-kn06',
    code: 'KN-06™',
    name: 'Kangra Tea',
    price: 42,
    variant: 'kangra',
    category: 'Cellular Immunity',
    description: 'Unique high-altitude herbal notes standard-tested for deep cellular immune support.',
    accentColor: 'var(--color-sage-moss)'
  }
]

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  // Add item to cart
  const handleAddToCart = (product: Product, isSubscription: boolean) => {
    setCartItems((prevItems) => {
      const existingItemIdx = prevItems.findIndex(
        (item) => item.product.id === product.id && item.isSubscription === isSubscription
      )

      if (existingItemIdx > -1) {
        const updated = [...prevItems]
        updated[existingItemIdx].quantity += 1
        return updated
      } else {
        return [...prevItems, { product, quantity: 1, isSubscription }]
      }
    })
    setIsCartOpen(true) // Open cart to show progress
  }

  // Update item quantity
  const handleUpdateQuantity = (productId: string, isSubscription: boolean, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, isSubscription)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.isSubscription === isSubscription
          ? { ...item, quantity }
          : item
      )
    )
  }

  // Remove item
  const handleRemoveItem = (productId: string, isSubscription: boolean) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.isSubscription === isSubscription))
    )
  }

  // Toggle subscription state in cart
  const handleToggleSubscription = (productId: string, currentSubState: boolean) => {
    setCartItems((prevItems) => {
      const targetIdx = prevItems.findIndex(
        (item) => item.product.id === productId && item.isSubscription === currentSubState
      )
      if (targetIdx === -1) return prevItems

      const updated = [...prevItems]
      const targetItem = updated[targetIdx]
      
      // Look if there's already an item with the opposite subscription state
      const oppositeIdx = updated.findIndex(
        (item) => item.product.id === productId && item.isSubscription === !currentSubState
      )

      if (oppositeIdx > -1) {
        // Merge them
        updated[oppositeIdx].quantity += targetItem.quantity
        updated.splice(targetIdx, 1)
      } else {
        // Just toggle state
        targetItem.isSubscription = !currentSubState
      }

      return updated
    })
  }

  // Handle smooth scroll to section
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle newsletter mock sign up
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim() !== '') {
      setNewsletterSubscribed(true)
      setNewsletterEmail('')
    }
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen bg-[var(--surface-page-canvas)] text-[var(--color-forest-depths)] antialiased selection:bg-[var(--color-lime-pulse)] selection:text-[var(--color-forest-depths)]">
      {/* 1. Top Promo Banner */}
      <PromoBanner />

      {/* 2. Main Navigation Header */}
      <Navbar 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onQuizClick={() => setIsQuizOpen(true)}
        onSectionClick={handleSectionClick}
      />

      {/* 3. Main Content Sections */}
      <main className="w-full flex flex-col items-center">
        {/* Hero Section */}
        <Hero 
          onQuizClick={() => setIsQuizOpen(true)}
          onShopClick={() => handleSectionClick('collection')}
        />

        {/* Product Collection Grid */}
        <Collection 
          onAddToCart={handleAddToCart}
          products={PRODUCTS}
        />

        {/* Science & Research Section */}
        <SciencePanel />

        {/* Ingredient Monograph Directory */}
        <IngredientDeepDive />

        {/* Editorial Trust Banner (Middle section) */}
        <section className="w-full bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] py-16 px-6 md:px-12 border-t border-[rgba(252,252,247,0.1)]">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <span className="font-mono text-[10px] text-[var(--color-lime-pulse)] uppercase tracking-[0.15em] block mb-2">
                Independent Integrity
              </span>
              <h3 className="font-sans text-[24px] md:text-[28px] font-[300] tracking-tight leading-tight">
                Traceable formulation. Zero added flavorings, coloring agents, or preservatives. 
              </h3>
            </div>
            <div className="flex items-center gap-3 border border-[rgba(252,252,247,0.2)] p-4 rounded-xl max-w-xs bg-[rgba(252,252,247,0.03)]">
              <ShieldCheck className="w-10 h-10 text-[var(--color-lime-pulse)] flex-shrink-0" />
              <div className="text-[12px] font-sans">
                <span className="font-bold block text-[var(--color-snow-white)] uppercase tracking-wide">
                  Clinical Monitored
                </span>
                <span className="text-[var(--color-frosted-glass)]">
                  Each batch is third-party analyzed under strict prebiotic compliance guidelines.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="w-full bg-[var(--surface-page-canvas)] border-t border-[var(--color-warm-stone)] py-16 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
          
          {/* Col 1 (4/12 width): Brand description */}
          <div className="md:col-span-4 flex flex-col justify-between h-full gap-6">
            <div>
              <div className="flex items-center gap-1.5 mb-4 select-none">
                <span className="font-sans text-[20px] font-[300] tracking-[0.2em] text-[var(--color-forest-depths)] uppercase">
                  Rhythm
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-lime-pulse)]"></span>
              </div>
              <p className="font-sans text-[13px] text-[var(--color-pewter)] leading-relaxed max-w-xs">
                A botanical wellness company. Merging historic royal brewing traditions with contemporary gut microbiome and systemic probiotic testing.
              </p>
            </div>
            
            <span className="font-mono text-[10px] text-[var(--color-pewter)]">
              © {new Date().getFullYear()} RHYTHM TEA CO. ALL RIGHTS RESERVED.
            </span>
          </div>

          {/* Col 2 (2/12 width): Links */}
          <div className="md:col-span-2">
            <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-widest block mb-4">
              Botanical Catalog
            </span>
            <ul className="flex flex-col gap-2.5 font-sans text-[13px]">
              <li><button onClick={() => handleSectionClick('collection')} className="text-[var(--color-forest-depths)] hover:opacity-75 cursor-pointer">Darjeeling Tea</button></li>
              <li><button onClick={() => handleSectionClick('collection')} className="text-[var(--color-forest-depths)] hover:opacity-75 cursor-pointer">Assam Tea</button></li>
              <li><button onClick={() => handleSectionClick('collection')} className="text-[var(--color-forest-depths)] hover:opacity-75 cursor-pointer">Nilgiri Tea</button></li>
              <li><button onClick={() => handleSectionClick('collection')} className="text-[var(--color-forest-depths)] hover:opacity-75 cursor-pointer">Masala Tea Blend</button></li>
            </ul>
          </div>

          {/* Col 3 (2/12 width): Info */}
          <div className="md:col-span-2">
            <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-widest block mb-4">
              Scientific Core
            </span>
            <ul className="flex flex-col gap-2.5 font-sans text-[13px]">
              <li><button onClick={() => handleSectionClick('science')} className="text-[var(--color-forest-depths)] hover:opacity-75 cursor-pointer">Microbiome Axis</button></li>
              <li><button onClick={() => handleSectionClick('deep-dive')} className="text-[var(--color-forest-depths)] hover:opacity-75 cursor-pointer">Monographs</button></li>
              <li><a href="https://vite.dev" target="_blank" rel="noreferrer" className="text-[var(--color-forest-depths)] hover:opacity-75 flex items-center gap-1">Vite Dev <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="https://react.dev" target="_blank" rel="noreferrer" className="text-[var(--color-forest-depths)] hover:opacity-75 flex items-center gap-1">React Docs <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Col 4 (4/12 width): Newsletter */}
          <div className="md:col-span-4 text-left">
            <span className="font-mono text-[10px] text-[var(--color-pewter)] uppercase tracking-widest block mb-4">
              Monograph Newsletter
            </span>
            <p className="font-sans text-[13px] text-[var(--color-pewter)] leading-relaxed mb-4">
              Subscribe to receive independent batch testing logs and botanical compound analytics.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-[var(--color-warm-stone)] border border-[var(--color-forest-depths)] border-opacity-10 p-3 rounded-lg flex items-center gap-2 font-mono text-[11px] text-[var(--color-forest-depths)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-lime-pulse)] animate-pulse"></span>
                <span>Verification registered. Laboratory monographs unlocked.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input 
                  type="email" 
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="ENTER SECURE EMAIL"
                  className="flex-1 bg-transparent border border-[var(--color-forest-depths)] border-opacity-20 focus:border-opacity-100 rounded-lg px-3 py-2 text-[12px] font-mono tracking-wider focus:outline-none"
                />
                <button 
                  type="submit"
                  className="bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] hover:opacity-95 px-4 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </footer>

      {/* 5. Cart Drawer Overlay */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onToggleSubscription={handleToggleSubscription}
      />

      {/* 6. Ritual Quiz Overlay */}
      {isQuizOpen && (
        <Quiz 
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onClose={() => setIsQuizOpen(false)}
        />
      )}
    </div>
  )
}

export default App
