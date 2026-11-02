import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Phone, Truck, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/products';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';

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
  const [paymentChoice, setPaymentChoice] = useState<'cod' | 'transfer' | 'card'>('cod');

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-amber-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden">
        
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <div>
              <h2 className="text-base font-extrabold leading-tight">Your Foodstuffs Order</h2>
              <p className="text-xs text-amber-100 font-medium">{cartItems.length} items in cart</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-slate-800 text-amber-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Your cart is currently empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Select pure red palm oil, fresh Garri bags, Plantain flour, Amala flour, Cassava flour, or Groundnut from our catalog to build your order.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-colors"
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
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-slate-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] font-mono font-bold text-amber-600">
                        ₦{item.product.price.toLocaleString()}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right font-mono font-extrabold text-xs text-slate-900 dark:text-white shrink-0">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="p-4 bg-amber-50/60 dark:bg-slate-800/60 rounded-xl border border-amber-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-xs text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Delivery & Contact Information
                </h4>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number (e.g. 09064153934)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />

                  <select
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Suleja Central">Suleja Central / Yaro College Road (₦1,000)</option>
                    <option value="Suleja Outskirts">Suleja Outskirts (₦1,500)</option>
                    <option value="Abuja FCT">Abuja FCT (₦2,500)</option>
                    <option value="Minna / Niger State">Minna / Niger State Towns (₦3,000)</option>
                  </select>
                </div>

                {/* Payment Option */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Payment Preference:</label>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
                    {[
                      { id: 'cod', label: 'Cash on Delivery' },
                      { id: 'transfer', label: 'Bank Transfer' },
                      { id: 'card', label: 'Card Payment' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPaymentChoice(opt.id as any)}
                        className={`p-2 rounded-lg border text-center transition-colors ${
                          paymentChoice === opt.id
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-4 shrink-0">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Items Subtotal:</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping Fee:</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between text-base font-black text-slate-900 dark:text-white">
                <span>Grand Total:</span>
                <span className="text-amber-600">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <a
              href={buildWhatsAppOrderMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
            >
              <Phone className="w-4 h-4" />
              <span>Checkout & Place Order via WhatsApp</span>
            </a>

            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>Direct fulfillment from Reyflux Suleja</span>
              <button onClick={onClearCart} className="text-red-500 hover:underline font-semibold">
                Clear Cart
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
