import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Phone, CreditCard, ShieldCheck } from 'lucide-react';
import { Product } from '../data/products';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { PaystackCheckoutModal } from './PaystackCheckoutModal';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [deliveryLocation, setDeliveryLocation] = useState('Suleja Central');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'cod' | 'transfer' | 'card'>('card');
  const [isPaystackModalOpen, setIsPaystackModalOpen] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryLocation.includes('Suleja') ? 1000 : deliveryLocation.includes('Abuja') ? 2500 : 3000;
  const grandTotal = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

  const buildWhatsAppOrderMessage = () => {
    let msg = `Hello Reyflux Enterprises Limited, I want to place an official foodstuffs order from your website:\n\n`;
    msg += `👤 Customer: ${customerName || 'Customer'}\n`;
    msg += `📞 Phone: ${customerPhone || COMPANY_INFO.phones[0]}\n`;
    msg += `📍 Delivery Location: ${deliveryLocation}\n`;
    msg += `💳 Preferred Payment Method: ${paymentChoice.toUpperCase().replace('_', ' ')}\n\n`;
    msg += `📦 ORDER ITEMS:\n`;

    cartItems.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name} x${item.quantity} = N${(item.product.price * item.quantity).toLocaleString()}\n`;
    });

    msg += `\n💵 Subtotal: N${subtotal.toLocaleString()}`;
    msg += `\n🚚 Estimated Shipping: N${deliveryFee.toLocaleString()}`;
    msg += `\n💰 GRAND TOTAL: N${grandTotal.toLocaleString()}\n\n`;
    msg += `Please confirm availability and doorstep delivery timeline. Thank you!`;

    return createWhatsAppUrl(msg);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fadeIn flex justify-end">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-[#E2E8F0] dark:border-slate-800 flex flex-col justify-between overflow-hidden">
          
          {/* Drawer Header */}
          <div className="px-6 py-4 bg-[#0F172A] text-white flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[#F97316]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold leading-tight">Your Foodstuffs Cart</h2>
                <p className="text-xs text-slate-400 font-medium">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-5 overflow-y-auto flex-1 space-y-5 scrollbar-none">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-slate-800 text-[#F97316] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-[#0F172A] dark:text-white text-base">Your cart is currently empty</h3>
                <p className="text-xs text-[#64748B] dark:text-slate-400 max-w-xs mx-auto">
                  Select pure red palm oil, fresh Garri bags, Plantain flour, Amala flour, Cassava flour, or Groundnut from our catalog to build your order.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl transition-colors shadow-xs"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Cart Items List */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 bg-[#FAFAF9] dark:bg-slate-800/60 rounded-xl border border-[#E2E8F0] dark:border-slate-800 flex gap-3 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover border border-[#E2E8F0] dark:border-slate-700 shrink-0 bg-white"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-[#64748B] dark:text-slate-400">
                          {item.product.volumeOrWeight} • ₦{item.product.price.toLocaleString()}
                        </div>
                        <div className="font-mono font-black text-xs text-[#0F172A] dark:text-white pt-0.5">
                          ₦{(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="flex items-center border border-[#E2E8F0] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 text-[#64748B] hover:text-[#0F172A]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 text-[#64748B] hover:text-[#0F172A]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 text-[#94A3B8] hover:text-[#0F172A]"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Options */}
                <div className="p-4 bg-[#F8FAFC] dark:bg-slate-800/80 rounded-xl border border-[#E2E8F0] dark:border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white block">
                    Delivery &amp; Customer Details
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-medium text-[#64748B] mb-1">Your Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Amina Suleja"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#64748B] mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="customer@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#64748B] mb-1">Delivery Destination</label>
                      <select
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-xs"
                      >
                        <option value="Suleja Central">Suleja Central &amp; Yaro College (₦1,000)</option>
                        <option value="Suleja Outskirts">Suleja Outskirts - Gurara / Maje (₦1,500)</option>
                        <option value="Abuja FCT">Abuja FCT - Kubwa, Zuba, Wuse (₦2,500)</option>
                        <option value="Minna / Niger">Minna &amp; Niger State Towns (₦3,000)</option>
                        <option value="Interstate Waybill">Interstate Waybill - All 36 States (₦3,500)</option>
                      </select>
                    </div>
                  </div>

                </div>

              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#FAFAF9] dark:bg-slate-950 border-t border-[#E2E8F0] dark:border-slate-800 space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#64748B]">
                  <span>Items Subtotal:</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Delivery Fee:</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#E2E8F0] dark:border-slate-800 pt-2 flex justify-between text-base font-bold text-[#0F172A] dark:text-white">
                  <span>Grand Total:</span>
                  <span className="text-[#F97316]">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Paystack Online Payment Primary Button */}
              <button
                onClick={() => setIsPaystackModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-extrabold text-slate-950 bg-[#00C3F7] hover:bg-[#00B0DF] rounded-xl transition-all shadow-md cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Securely with Paystack (Card / Transfer)</span>
              </button>

              {/* Alternative WhatsApp Button */}
              <a
                href={buildWhatsAppOrderMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Or Order via WhatsApp</span>
              </a>

              <div className="flex justify-between items-center text-[10px] text-[#94A3B8]">
                <span className="flex items-center gap-1 text-slate-500">
                  <ShieldCheck className="w-3 h-3 text-[#00C3F7]" />
                  Server Price Validated Checkout
                </span>
                <button onClick={onClearCart} className="text-[#64748B] hover:text-[#0F172A] underline font-medium">
                  Clear Cart
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Paystack Server-Validated Checkout Modal */}
      <PaystackCheckoutModal
        isOpen={isPaystackModalOpen}
        onClose={() => setIsPaystackModalOpen(false)}
        cartItems={cartItems}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
        deliveryLocation={deliveryLocation}
        onPaymentSuccess={() => {
          onClearCart();
        }}
      />
    </>
  );
};

