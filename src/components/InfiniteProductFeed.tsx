import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { PriceDropBadge } from './PriceDropBadge';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { ShoppingBag, Phone, Star, Search, Filter, Loader2, Sparkles, CheckCircle2, ZoomIn } from 'lucide-react';

interface InfiniteProductFeedProps {
  onAddToCart: (product: Product, quantity: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onProductClick?: (product: Product) => void;
}

const getLocalFilteredProducts = (
  category: string,
  search: string,
  cursor: string | null,
  limit: number = 6
) => {
  const q = search.toLowerCase().trim();
  const filtered = PRODUCTS.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  let startIndex = 0;
  if (cursor) {
    const foundIdx = filtered.findIndex((p) => p.id === cursor);
    if (foundIdx !== -1) {
      startIndex = foundIdx + 1;
    }
  }

  const items = filtered.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < filtered.length;
  const nextCursor = hasMore && items.length > 0 ? items[items.length - 1].id : null;

  return { items, hasMore, nextCursor };
};

export const InfiniteProductFeed: React.FC<InfiniteProductFeedProps> = ({
  onAddToCart,
  selectedCategory,
  onSelectCategory,
  onProductClick
}) => {
  const [products, setProducts] = useState<Product[]>(() => PRODUCTS.slice(0, 9));
  const [cursor, setCursor] = useState<string | null>(() => PRODUCTS[8]?.id || null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(
    async (isReset = false) => {
      if (loading || (!hasMore && !isReset)) return;
      setLoading(true);

      try {
        const currentCursor = isReset ? '' : cursor || '';
        const params = new URLSearchParams({
          limit: '9',
          cursor: currentCursor,
          category: selectedCategory,
          search: searchQuery
        });

        const res = await fetch(`/api/products/infinite?${params.toString()}`, {
          headers: { Accept: 'application/json' }
        });
        const contentType = res.headers.get('content-type') || '';

        let items: Product[] = [];
        let nextCursor: string | null = null;
        let more = false;

        if (res.ok && contentType.includes('application/json')) {
          const data = await res.json();
          items = data.items || [];
          nextCursor = data.nextCursor;
          more = !!data.hasMore;
        } else {
          const local = getLocalFilteredProducts(
            selectedCategory,
            searchQuery,
            currentCursor,
            9
          );
          items = local.items;
          nextCursor = local.nextCursor;
          more = local.hasMore;
        }

        if (isReset) {
          setProducts(items);
        } else {
          setProducts((prev) => [...prev, ...items]);
        }

        setCursor(nextCursor);
        setHasMore(more);
      } catch {
        const local = getLocalFilteredProducts(
          selectedCategory,
          searchQuery,
          isReset ? '' : cursor,
          9
        );
        if (isReset) {
          setProducts(local.items);
        } else {
          setProducts((prev) => [...prev, ...local.items]);
        }
        setCursor(local.nextCursor);
        setHasMore(local.hasMore);
      } finally {
        setLoading(false);
      }
    },
    [cursor, hasMore, loading, selectedCategory, searchQuery]
  );

  // Reset and fetch when category or search changes
  useEffect(() => {
    setCursor(null);
    setHasMore(true);
    fetchProducts(true);
  }, [selectedCategory, searchQuery]);

  // Intersection Observer for continuous scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchProducts(false);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchProducts, hasMore, loading]);

  const categories = [
    { id: 'all', label: 'All Foodstuffs' },
    { id: 'palm_oil', label: 'Pure Palm Oil' },
    { id: 'garri', label: 'Crispy Garri' },
    { id: 'cassava_flour', label: 'Cassava Flour' },
    { id: 'plantain_flour', label: 'Plantain Flour' },
    { id: 'amala_flour', label: 'Amala Flour' },
    { id: 'groundnut', label: 'Groundnut' },
    { id: 'bulk_wholesale', label: 'Bulk Bundles' }
  ];

  return (
    <div className="space-y-5">
      
      {/* Category Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 dark:bg-slate-800 rounded-xl overflow-x-auto w-full md:w-auto shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Garri, Palm Oil, Amala..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

      </div>

      {/* Product Discovery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Product Image Frame with Uniform Aspect Ratio */}
              <div
                onClick={() => onProductClick?.(product)}
                className="relative aspect-[4/3] w-full bg-gradient-to-b from-stone-100 to-stone-200/80 dark:from-slate-800 dark:to-slate-850 overflow-hidden cursor-pointer group/img flex items-center justify-center border-b border-slate-100 dark:border-slate-800"
                title="Click to view full uncropped image"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Hover Full Image View Overlay */}
                <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold shadow-md transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-3.5 h-3.5 text-[#E55318]" />
                    <span>View Packaging</span>
                  </span>
                </div>

                {/* Quiet Stock Tag */}
                <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md z-10">
                  {product.stockCount} in stock
                </div>
              </div>

              {/* Card Content (Refined Typography & Unboxed Metadata) */}
              <div className="p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold uppercase tracking-wider text-[11px]">
                    {product.volumeOrWeight} · {product.unit}
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {product.description}
                </p>

                {/* Quality Assurance (Clean unboxed line, zero badge clutter) */}
                <div className="flex items-center gap-1.5 pt-0.5 text-[11px] text-[#0B7B4B] dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>100% Unadulterated · Zero preservatives or artificial colors</span>
                </div>

                {/* Culinary Uses (Clean inline text, no pill chips) */}
                {product.uses && product.uses.length > 0 && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-0.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Uses: </span>
                    <span>{product.uses.join(' · ')}</span>
                  </div>
                )}

                {/* Stock & Depot Availability */}
                <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100 dark:border-slate-800 text-slate-500">
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    Suleja Central Depot
                  </span>
                  <span className="font-semibold text-[#0B7B4B] dark:text-emerald-400">
                    Direct Mill Supply
                  </span>
                </div>

                {/* Price Drop Badging Component */}
                <div className="pt-1">
                  <PriceDropBadge
                    price={product.price}
                    originalPrice={product.originalPrice}
                    badgeText={product.badgeText}
                    size="md"
                  />
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-5 pt-0">
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                <a
                  href={createWhatsAppUrl(`Hello Reyflux Enterprises, I want to order "${product.name}" (${product.volumeOrWeight}) for N${product.price.toLocaleString()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 rounded-xl transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        ))}

        {/* CSS Skeleton Loader Animation when fetching next page */}
        {loading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 opacity-80"
            >
              <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3 pt-2" />
              </div>
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>
          ))}
      </div>

      {/* Sentinel target element for Intersection Observer */}
      <div ref={observerTarget} className="h-10 flex items-center justify-center">
        {loading && (
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading more products...</span>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className="text-xs text-slate-500 font-semibold text-center">
            ✓ You've explored the full discovery feed for this category!
          </div>
        )}
      </div>

    </div>
  );
};
