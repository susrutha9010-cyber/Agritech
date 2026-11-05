import React, { useState } from 'react';
import { ProduceItem, FOOD_WASTE_STATS } from '../data/mockProduce.ts';
import { Trash2, ShieldCheck, Plus, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface ZeroCullRescueSectionProps {
  produceList: ProduceItem[];
  cart: { [id: string]: number };
  onAddToCart: (item: ProduceItem) => void;
  onOpenDetails: (item: ProduceItem) => void;
}

export const ZeroCullRescueSection: React.FC<ZeroCullRescueSectionProps> = ({
  produceList,
  cart,
  onAddToCart,
  onOpenDetails,
}) => {
  const [salvageLbs, setSalvageLbs] = useState<number>(35);

  const rescueItems = produceList.filter((item) => item.isRescueBatch || item.category === 'zero-cull');

  // Footprint math based on agricultural lifecycle data
  const co2eAvoided = (salvageLbs * FOOD_WASTE_STATS.methaneFactorPerLbRescued).toFixed(1);
  const waterSaved = Math.round(salvageLbs * FOOD_WASTE_STATS.waterFactorPerLbRescued);
  const averageMoneySaved = (salvageLbs * 2.25).toFixed(2);
  const extraFarmerRetained = (salvageLbs * 1.65).toFixed(2);

  return (
    <section id="zero-cull-rescue" className="py-16 sm:py-24 bg-[#F5F2EB] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-900 uppercase mb-2">
            <Trash2 className="w-3.5 h-3.5 text-amber-800" />
            <span>Real-World Agricultural Crisis #1: Cosmetic Culling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight mb-4 [text-wrap:balance]">
            The 40% Food Waste Paradox: Salvaging Prime “Cosmetic Seconds”
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Every year in the US alone, over <strong>20 million tons of edible produce</strong> are left to rot in fields or dumped in landfills because commercial supermarket distributors reject crops for minor cosmetic oddities—crooked carrots, scarred heirloom skins, or odd sizing. HarvestBridge bridges these gourmet seconds directly to conscious households at up to 55% discount.
          </p>
        </div>

        {/* Real-World Impact Interactive Simulator */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 mb-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Interactive Food Rescue Impact Simulator
              </span>
              <h3 className="text-2xl font-bold font-display text-stone-900">
                What Happens When You Rescue Harvest Seconds?
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Slide to select how many pounds of cosmetic seconds your household or cooking collective rescues this month:
              </p>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-stone-700">Rescued Monthly Volume</span>
                  <span className="text-base font-bold font-mono-numbers text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    {salvageLbs} lbs
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={salvageLbs}
                  onChange={(e) => setSalvageLbs(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer h-2 bg-stone-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono-numbers">
                  <span>5 lbs (1 tote)</span>
                  <span>35 lbs (Family)</span>
                  <span>120 lbs (Pantry / Preservers)</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Verified by Agricultural Resource Efficiency Models</span>
              </div>
            </div>

            {/* 4 Impact Stat Cards */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="bg-emerald-900 text-white p-5 rounded-2xl border border-emerald-800 shadow-sm flex flex-col justify-between">
                <div className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">
                  Methane Prevented
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-amber-300">
                    {co2eAvoided} lbs
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    CO2-equivalent landfill emissions avoided
                  </div>
                </div>
                <div className="text-[10px] text-emerald-300 pt-2 border-t border-emerald-800/80">
                  Zero rotting in hypoxic landfill piles
                </div>
              </div>

              <div className="bg-stone-900 text-white p-5 rounded-2xl border border-stone-800 shadow-sm flex flex-col justify-between">
                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                  Irrigation Water Preserved
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-emerald-400">
                    {waterSaved.toLocaleString()} gal
                  </div>
                  <div className="text-[11px] text-stone-400">
                    Embodied farm water not wasted
                  </div>
                </div>
                <div className="text-[10px] text-stone-400 pt-2 border-t border-stone-800">
                  Protects vital drought-stressed river basins
                </div>
              </div>

              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-amber-950 flex flex-col justify-between">
                <div className="text-[11px] text-amber-800 uppercase tracking-wider font-semibold">
                  Household Grocery Savings
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-stone-900">
                    ${averageMoneySaved}
                  </div>
                  <div className="text-[11px] text-amber-900/80">
                    Saved vs supermarket retail tags
                  </div>
                </div>
                <div className="text-[10px] text-amber-800 pt-2 border-t border-amber-200">
                  Healthy organic food made accessible
                </div>
              </div>

              <div className="bg-stone-100 p-5 rounded-2xl border border-stone-200 text-stone-800 flex flex-col justify-between">
                <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                  Direct Farmer Payout
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-emerald-800">
                    +${extraFarmerRetained}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    Earned on produce otherwise culled at $0
                  </div>
                </div>
                <div className="text-[10px] text-stone-500 pt-2 border-t border-stone-200">
                  Turns a 100% loss into sustainable farm profit
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Cosmetic Seconds Harvest Batches */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 block mb-1">
                Zero-Cull Active Harvest Drops
              </span>
              <h3 className="text-2xl font-bold font-display text-stone-900">
                Rescue Today&apos;s Imperfect &amp; Twisted Harvests
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono-numbers">
              {rescueItems.length} certified organic zero-cull batches active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rescueItems.map((item) => {
              const qty = cart[item.id] || 0;
              const savings = item.priceSupermarketEquiv - item.priceDirect;
              const savingsPercent = Math.round(
                (savings / item.priceSupermarketEquiv) * 100
              );

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-amber-200/90 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Media */}
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onOpenDetails(item)}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-amber-900/90 text-amber-100 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-amber-700/60 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Zero-Cull Rescue</span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-emerald-900/90 text-white text-[11px] font-mono-numbers px-2.5 py-1 rounded-md border border-emerald-600/50">
                        Save {savingsPercent}% vs Supermarket
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6">
                      <div className="text-xs text-stone-500 mb-1 flex items-center justify-between">
                        <span className="font-semibold text-emerald-800">{item.farmName}</span>
                        <span className="font-mono-numbers">{item.distanceMiles} mi away</span>
                      </div>

                      <h4
                        onClick={() => onOpenDetails(item)}
                        className="text-lg font-bold font-display text-stone-900 hover:text-emerald-900 transition-colors cursor-pointer mb-2"
                      >
                        {item.name}
                      </h4>

                      {/* Rejection reason callout */}
                      {item.rescueReason && (
                        <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200/80 text-[11px] text-amber-950 mb-3 leading-relaxed">
                          <strong className="text-amber-900">Why broker rejected: </strong>
                          {item.rescueReason}
                        </div>
                      )}

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Real metrics: Water & Brix */}
                      <div className="flex items-center justify-between text-[11px] text-stone-500 pb-3 mb-3 border-b border-stone-100 font-mono-numbers">
                        <span>Natural Brix: <strong className="text-stone-800">{item.brixSugarRating || 9.2}°</strong></span>
                        <span>Water Saved: <strong className="text-emerald-800">{item.waterSavedGal || 320} gal</strong></span>
                      </div>

                      {/* Price */}
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

                        <span className="text-[11px] font-mono-numbers font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          SNAP Eligible
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Add action */}
                  <div className="p-5 sm:p-6 pt-0">
                    <button
                      onClick={() => onAddToCart(item)}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-amber-900 hover:bg-amber-800 active:scale-98 rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{qty > 0 ? `Add Another (${qty} in box)` : 'Rescue This Batch'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-World Farmer Perspective Callout */}
        <div className="mt-12 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="flex-1 text-xs text-stone-600 leading-relaxed">
            <h4 className="text-base font-bold text-stone-900 font-display mb-1">
              The Wholesale Rejection Reality
            </h4>
            <p>
              When a commercial supermarket buyer rejects a shipment over cosmetic sizing, the farmer bears 100% of the financial penalty: harvesting cost, transportation to the broker dock, rejection freight, and dumping fees. By purchasing zero-cull batches on HarvestBridge, you guarantee living wages to the field crew while keeping food out of methane-producing municipal dumps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
