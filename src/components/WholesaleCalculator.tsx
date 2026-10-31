import React, { useState } from 'react';
import { Calculator, Phone, Building2, ShieldCheck, CheckCircle2, FileText, Sparkles, TrendingUp } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';

export const WholesaleCalculator: React.FC = () => {
  const [productType, setProductType] = useState<'palm_oil' | 'garri' | 'cassava_flour'>('palm_oil');
  const [units, setUnits] = useState<number>(10);
  const [businessName, setBusinessName] = useState('');
  const [clientType, setClientType] = useState('Restaurant / Hotel');

  const unitPrices = {
    palm_oil: { name: '25L Heavy Duty Palm Oil Jerrican', basePrice: 82000, unitLabel: 'Jerricans (25L each)' },
    garri: { name: '50kg Fresh Yellow Garri Sack', basePrice: 66000, unitLabel: 'Sacks (50kg each)' },
    cassava_flour: { name: '50kg High Quality Cassava Flour Sack', basePrice: 57000, unitLabel: 'Sacks (50kg each)' }
  };

  const selectedItem = unitPrices[productType];

  // Wholesale discount tiers
  const discountRate = units >= 50 ? 0.15 : units >= 25 ? 0.10 : units >= 10 ? 0.05 : 0;
  const rawTotal = units * selectedItem.basePrice;
  const discountAmount = rawTotal * discountRate;
  const finalWholesalePrice = rawTotal - discountAmount;

  const handleWhatsAppQuotation = () => {
    const msg = `Hello Reyflux Management, I need a Formal Commercial Wholesale Quotation:
- Business / Company: ${businessName || 'Commercial Buyer'}
- Client Type: ${clientType}
- Product: ${selectedItem.name}
- Quantity: ${units} ${selectedItem.unitLabel}
- Raw Cost: N${rawTotal.toLocaleString()}
- Wholesale Discount (${(discountRate * 100)}%): -N${discountAmount.toLocaleString()}
- Final Estimate: N${finalWholesalePrice.toLocaleString()}
Please confirm delivery timeline and payment terms.`;
    window.open(createWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="wholesale" className="py-16 bg-white dark:bg-slate-900 border-t border-amber-200/50 dark:border-slate-800 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>COMMERCIAL & BULK DISTRIBUTORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Wholesale & B2B Supply Portal
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400">
            Specialized supply contracts for hotels, restaurants, bakeries, boarding schools, and food processing factories. Tiered discount pricing with guaranteed scheduled restocks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Calculator Controls */}
          <div className="lg:col-span-7 bg-amber-50/50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-amber-200/80 dark:border-slate-700 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">Bulk Pricing Generator</h3>
                <p className="text-xs text-slate-500">Calculate tiered volume discounts</p>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Product Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Commercial Product:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'palm_oil', label: '25L Palm Oil Jerrican' },
                    { id: 'garri', label: '50kg Yellow Garri Sack' },
                    { id: 'cassava_flour', label: '50kg Cassava Flour' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProductType(p.id as any)}
                      className={`p-3.5 text-xs sm:text-sm font-bold rounded-xl border text-left transition-colors ${
                        productType === p.id
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Quantity Needed ({selectedItem.unitLabel}):</span>
                  <span className="text-amber-600 font-mono text-base sm:text-lg font-black">{units} Units</span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />

                <div className="flex justify-between text-[11px] sm:text-xs text-slate-500">
                  <span>5 Units (Standard)</span>
                  <span>25 Units (10% OFF)</span>
                  <span>50+ Units (15% OFF)</span>
                </div>
              </div>

              {/* Client Info Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Suleja Hotel"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Sector</label>
                  <select
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="Restaurant / Hotel">Restaurant / Hotel</option>
                    <option value="Bakery / Food Factory">Bakery / Food Factory</option>
                    <option value="School / Institution">School / Institution</option>
                    <option value="Retail Reseller / Market Merchant">Retail Reseller</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Formal Quote Summary */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base sm:text-lg">Commercial Quotation</h3>
              </div>
              <span className="text-[10px] sm:text-xs font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full uppercase border border-amber-500/30">
                Official Quote
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Selected Item:</span>
                <span className="text-white font-sans font-bold text-right">{selectedItem.name}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Quantity:</span>
                <span className="text-white font-bold">{units} {selectedItem.unitLabel}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Standard Unit Price:</span>
                <span className="text-white">₦{selectedItem.basePrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="text-white">₦{rawTotal.toLocaleString()}</span>
              </div>

              {discountRate > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                  <span>Tier Discount ({(discountRate * 100)}%):</span>
                  <span>-₦{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-slate-800 pt-3 flex justify-between text-base sm:text-lg font-black text-white">
                <span>Net Wholesale Quote:</span>
                <span className="text-amber-400">₦{finalWholesalePrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppQuotation}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-lg shadow-amber-500/20"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Send Quotation to Reyflux Management</span>
            </button>

            <div className="p-3.5 bg-slate-800/80 rounded-xl text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-1 text-slate-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Reyflux B2B Guarantee
              </p>
              <p>Includes free Suleja warehouse loading, waybill documentation, and NAFDAC compliant batch certificate.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
