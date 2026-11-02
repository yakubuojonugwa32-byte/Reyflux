import React, { useState } from 'react';
import { ShieldCheck, Package, DollarSign, Users, RefreshCw, CheckCircle2, AlertTriangle, Search, X } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { COMPANY_INFO } from '../data/companyInfo';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);

  if (!isOpen) return null;

  const updateStock = (productId: string, newStock: number) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockCount: Math.max(0, newStock) } : p))
    );
  };

  const totalStockLitres = 450;
  const totalGarriBags = 100;
  const totalFlourBags = 120;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base leading-tight">Reyflux Merchant Portal</h2>
              <p className="text-xs text-slate-400">Inventory Stock & Product Control</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Stats Strip */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Palm Oil Volume in Stock</div>
              <div className="text-xl font-black text-amber-600 font-mono mt-0.5">{totalStockLitres} Litres</div>
            </div>
            <Package className="w-6 h-6 text-amber-500" />
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Garri Bags in Depot</div>
              <div className="text-xl font-black text-amber-600 font-mono mt-0.5">{totalGarriBags} Bags</div>
            </div>
            <Package className="w-6 h-6 text-amber-500" />
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Flour & Nut Bags</div>
              <div className="text-xl font-black text-emerald-600 font-mono mt-0.5">{totalFlourBags} Bags</div>
            </div>
            <Package className="w-6 h-6 text-emerald-500" />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Product Catalog Stock Control</h3>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price (₦)</th>
                  <th className="p-3">Current Stock</th>
                  <th className="p-3 text-right">Quick Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {productsList.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">{product.name}</td>
                    <td className="p-3 text-slate-500 uppercase text-[10px] font-bold">{product.category.replace('_', ' ')}</td>
                    <td className="p-3 font-mono font-bold">₦{product.price.toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold text-amber-600">{product.stockCount} units</td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => updateStock(product.id, product.stockCount - 1)}
                        className="px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded hover:bg-slate-300 font-bold"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => updateStock(product.id, product.stockCount + 5)}
                        className="px-2 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 font-bold"
                      >
                        +5
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold rounded-xl"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
