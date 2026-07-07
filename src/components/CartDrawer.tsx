import React, { useState } from 'react'
import type { Product } from './Collection'
import { X, Plus, Minus, Trash2, ShieldAlert } from 'lucide-react'

export interface CartItem {
  product: Product
  quantity: number
  isSubscription: boolean
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (productId: string, isSubscription: boolean, quantity: number) => void
  onRemoveItem: (productId: string, isSubscription: boolean) => void
  onToggleSubscription: (productId: string, currentSubState: boolean) => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onToggleSubscription
}) => {
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(false)
  const [promoError, setPromoError] = useState('')

  if (!isOpen) return null

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity)
  }, 0)

  // Subscription discounts (15% off subscription items)
  const subDiscount = cartItems.reduce((acc, item) => {
    if (item.isSubscription) {
      return acc + (item.product.price * 0.15 * item.quantity)
    }
    return acc;
  }, 0)

  // Promo code discount (additional 10% off remaining total if 'BOTANICAL' applied)
  const remainingAfterSub = subtotal - subDiscount
  const promoDiscount = appliedPromo ? remainingAfterSub * 0.1 : 0

  const hasSubscription = cartItems.some(item => item.isSubscription)
  
  // Shipping: free if total after discounts > 75, or if has subscription
  const finalPriceBeforeShipping = remainingAfterSub - promoDiscount
  const shipping = (finalPriceBeforeShipping >= 75 || hasSubscription || cartItems.length === 0) ? 0 : 5.00

  const total = finalPriceBeforeShipping + shipping

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.toUpperCase() === 'BOTANICAL') {
      setAppliedPromo(true)
      setPromoError('')
    } else {
      setPromoError('Invalid verification code.')
      setAppliedPromo(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Drawer Content */}
        <div className="w-screen max-w-md bg-[var(--surface-page-canvas)] flex flex-col shadow-2xl border-l border-[var(--color-warm-stone)] h-full">
          {/* Header */}
          <div className="p-6 border-b border-[var(--color-warm-stone)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[18px] font-[300] tracking-wider text-[var(--color-forest-depths)] uppercase">
                Your Laboratory Cart
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-lime-pulse)]"></span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[var(--color-warm-stone)] text-[var(--color-forest-depths)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 no-scrollbar flex flex-col gap-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center my-auto">
                <span className="font-sans text-[16px] text-[var(--color-pewter)] mb-4">
                  No botanical specimens selected.
                </span>
                <button 
                  onClick={onClose}
                  className="bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] px-6 py-3 rounded-[1000px] text-[12px] font-medium tracking-wide uppercase hover:opacity-90 transition-all cursor-pointer"
                >
                  Return to Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = item.product.price
                const discountedItemPrice = item.isSubscription ? itemPrice * 0.85 : itemPrice

                return (
                  <div 
                    key={`${item.product.id}-${item.isSubscription ? 'sub' : 'one'}`}
                    className="flex gap-4 border-b border-[var(--color-warm-stone)] pb-6 last:border-0"
                  >
                    {/* Small preview block */}
                    <div className="w-20 h-24 bg-[var(--color-warm-stone)] rounded-xl flex items-center justify-center p-2 border border-[var(--color-frosted-glass)] border-opacity-35 flex-shrink-0">
                      {/* Stylized square representation of jar */}
                      <div className="w-full h-full flex flex-col justify-between items-center text-[8px] font-mono p-1 rounded bg-[var(--color-snow-white)] text-[var(--color-forest-depths)]">
                        <span className="font-bold">{item.product.code}</span>
                        <div 
                          className="w-4 h-8 rounded-sm"
                          style={{ 
                            backgroundColor: item.product.variant === 'darjeeling' ? 'var(--color-olive-gold)' :
                                             item.product.variant === 'assam' ? 'var(--color-sage-moss)' :
                                             item.product.variant === 'nilgiri' ? 'var(--color-eucalyptus)' :
                                             item.product.variant === 'masala' ? 'var(--color-lime-pulse)' :
                                             item.product.variant === 'kahwa' ? 'var(--color-olive-gold)' :
                                             item.product.variant === 'kangra' ? 'var(--color-sage-moss)' : 'var(--color-forest-depths)'
                          }}
                        />
                        <span className="text-[6px] text-[var(--color-pewter)]">100g e</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between text-left">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-sans text-[16px] font-semibold text-[var(--color-forest-depths)] leading-tight">
                            {item.product.name}
                          </h4>
                          <span className="font-mono text-[14px] font-semibold text-[var(--color-forest-depths)]">
                            ${(discountedItemPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Subscription details */}
                        <div className="flex flex-wrap gap-2 items-center mt-1.5">
                          <button
                            onClick={() => onToggleSubscription(item.product.id, item.isSubscription)}
                            className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-[1000px] border cursor-pointer transition-all ${
                              item.isSubscription 
                                ? 'bg-[var(--color-lime-pulse)] text-[var(--color-forest-depths)] border-[var(--color-lime-pulse)]' 
                                : 'bg-transparent text-[var(--color-pewter)] border-[var(--color-warm-stone)] hover:border-[var(--color-pewter)]'
                            }`}
                          >
                            {item.isSubscription ? 'Subscription — 15% Off' : 'One-Time Order'}
                          </button>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-[var(--color-warm-stone)] rounded-[1000px] px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.isSubscription, item.quantity - 1)}
                            className="p-1 text-[var(--color-pewter)] hover:text-[var(--color-forest-depths)] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-[12px] font-semibold px-3 text-[var(--color-forest-depths)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.isSubscription, item.quantity + 1)}
                            className="p-1 text-[var(--color-pewter)] hover:text-[var(--color-forest-depths)] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id, item.isSubscription)}
                          className="text-[var(--color-pewter)] hover:text-red-700 cursor-pointer p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Checkout Panel */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[var(--color-warm-stone)] bg-[var(--color-snow-white)] flex flex-col gap-4 text-left">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="PROMO CODE (e.g. BOTANICAL)"
                  className="flex-1 bg-transparent border border-[var(--color-warm-stone)] rounded-lg px-3 py-2 text-[12px] font-mono tracking-wider text-[var(--color-forest-depths)] focus:outline-none focus:border-[var(--color-forest-depths)] uppercase"
                />
                <button
                  type="submit"
                  className="bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] px-4 py-2 rounded-lg text-[11px] font-medium tracking-wide uppercase font-sans hover:opacity-90 cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {promoError && (
                <span className="font-mono text-[9px] text-red-600 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> {promoError}
                </span>
              )}

              {appliedPromo && (
                <div className="flex items-center gap-1.5 self-start">
                  {/* Lime Pulse promo badge */}
                  <span className="bg-[var(--color-lime-pulse)] text-[var(--color-forest-depths)] font-mono text-[9px] font-semibold uppercase px-2.5 py-1 rounded-[1000px]">
                    Code: BOTANICAL Active (10% Off)
                  </span>
                </div>
              )}

              {/* Price calculations */}
              <div className="flex flex-col gap-2.5 font-sans text-[13px] border-t border-[var(--color-warm-stone)] pt-4 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-pewter)] font-[300]">Laboratory Subtotal</span>
                  <span className="font-mono font-semibold text-[var(--color-forest-depths)]">${subtotal.toFixed(2)}</span>
                </div>

                {subDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-700">
                    <span className="font-[300]">Subscription Discount (15%)</span>
                    <span className="font-mono font-semibold">-${subDiscount.toFixed(2)}</span>
                  </div>
                )}

                {appliedPromo && (
                  <div className="flex justify-between items-center text-green-700">
                    <span className="font-[300]">Promo Code Discount (10%)</span>
                    <span className="font-mono font-semibold">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-pewter)] font-[300]">Environmental Shipping</span>
                  <span className="font-mono font-semibold text-[var(--color-forest-depths)]">
                    {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {hasSubscription && (
                  <div className="bg-[var(--color-warm-stone)] p-3 rounded-lg text-[11px] text-[var(--color-sage-moss)] font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-lime-pulse)] animate-pulse"></span>
                    <span>Includes Complimentary Embossed Shaker Cup</span>
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-[var(--color-warm-stone)] pt-4 mt-2 text-[16px] font-semibold text-[var(--color-forest-depths)]">
                  <span>TOTAL ESTIMATED</span>
                  <span className="font-mono text-[18px] text-[var(--color-forest-depths)]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Pill Button */}
              <button
                onClick={() => {
                  alert('Specimen dispatch process initialized. Order completed mock checkout!')
                  // clear cart, close
                }}
                className="w-full bg-[var(--color-forest-depths)] text-[var(--color-snow-white)] py-4 rounded-[1000px] text-[13px] font-medium tracking-wide uppercase font-sans hover:opacity-90 transition-all cursor-pointer text-center mt-2 shadow-none"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
