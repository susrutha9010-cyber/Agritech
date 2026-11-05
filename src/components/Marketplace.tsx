import React, { useState } from 'react';
import { ProduceItem } from '../data/mockProduce.ts';
import { Plus, Minus, Info, Check, Sparkles, MapPin, Clock } from 'lucide-react';

interface MarketplaceProps {
  produceList: ProduceItem[];
  cart: { [id: string]: number };
  onAddToCart: (item: ProduceItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onOpenDetails: (item: ProduceItem) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  produceList,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = produceList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="marketplace" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Active Farm Drops
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight [text-wrap:balance]">
            Today’s Fresh Direct-to-Consumer Harvests
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
            Harvested within 24 hours. No intermediary brokers, no artificial gassing. Direct farm revenue shown on every batch.
          </p>
        </div>

        {/* Search input */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search crops, farms, or heirloom varieties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/50 text-stone-800 placeholder-stone-400"
          />
        </div>
      </div>

      {/* Interactive Category Segmented Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl max-w-max mb-10 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-white text-stone-900 shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          All Fresh Harvests ({produceList.length})
        </button>
        <button
          onClick={() => setSelectedCategory('csa-boxes')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'csa-boxes'
              ? 'bg-white text-stone-900 shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Curated Harvest Crates
        </button>
        <button
          onClick={() => setSelectedCategory('heirlooms')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'heirlooms'
              ? 'bg-white text-stone-900 shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Heirloom Varieties
        </button>
        <button
          onClick={() => setSelectedCategory('greens-roots')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'greens-roots'
              ? 'bg-white text-stone-900 shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Artisan Greens &amp; Roots
        </button>
        <button
          onClick={() => setSelectedCategory('zero-cull')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'zero-cull'
              ? 'bg-amber-900 text-white shadow-xs font-semibold'
              : 'text-amber-900 hover:bg-amber-50 font-semibold'
          }`}
        >
          Zero-Cull Salvage (Save 50%+)
        </button>
        <button
          onClick={() => setSelectedCategory('climate-rescue')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'climate-rescue'
              ? 'bg-rose-900 text-white shadow-xs font-semibold'
              : 'text-rose-900 hover:bg-rose-50 font-semibold'
          }`}
        >
          Climate Pre-Sale Drops
        </button>
      </div>

      {/* Product Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-stone-50 rounded-2xl border border-stone-200">
          <p className="text-stone-500 text-sm">No produce batches found matching your search.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const qty = cart[item.id] || 0;
            const savings = item.priceSupermarketEquiv - item.priceDirect;
            const savingsPercent = Math.round(
              (savings / item.priceSupermarketEquiv) * 100
            );

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  {/* Image Container with Fallback */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onOpenDetails(item)}>
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    />
                    
                    {/* Clean unboxed tag for fresh harvest time */}
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-stone-100 text-[11px] font-mono-numbers px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-emerald-300" />
                      <span>{item.harvestedTimeAgo}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-emerald-950/80 backdrop-blur-md text-amber-200 text-[11px] font-mono-numbers px-2.5 py-1 rounded-md border border-emerald-500/30">
                      Save {savingsPercent}% vs Supermarket
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 truncate">
                      <span className="font-semibold text-emerald-800">{item.farmName}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="flex items-center gap-1 font-mono-numbers">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {item.distanceMiles} mi away
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onOpenDetails(item)}
                      className="text-lg font-bold font-display text-stone-900 group-hover:text-emerald-900 transition-colors cursor-pointer mb-2"
                    >
                      {item.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Farming Practice badges without pill candy */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-stone-500 mb-4 pb-4 border-b border-stone-100">
                      {item.farmingPractices.slice(0, 2).map((practice, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-700" />
                          <span>{practice}</span>
                          {idx < 1 && <span className="text-stone-300 ml-1">·</span>}
                        </span>
                      ))}
                    </div>

                    {/* Pricing Block */}
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <div className="text-xl font-bold font-mono-numbers text-stone-900">
                          ${item.priceDirect.toFixed(2)}
                          <span className="text-xs font-normal text-stone-500 ml-1">
                            / {item.unit}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400 line-through font-mono-numbers">
                          Supermarket: ${item.priceSupermarketEquiv.toFixed(2)}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-mono-numbers font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          85% to grower
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-5 sm:p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => onOpenDetails(item)}
                    className="p-2.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer border border-stone-200"
                    title="View Farm Inspection Details"
                    aria-label="View Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(item)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 active:scale-98 transition-all shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Harvest Box</span>
                    </button>
                  ) : (
                    <div className="flex-1 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-1 text-emerald-900">
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-emerald-900 hover:bg-emerald-100 transition-colors cursor-pointer shadow-xs"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold font-mono-numbers">
                        {qty} in box (${(qty * item.priceDirect).toFixed(2)})
                      </span>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-emerald-800 text-white hover:bg-emerald-900 transition-colors cursor-pointer shadow-xs"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
