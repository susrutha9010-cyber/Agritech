import React from 'react';
import { ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreHarvests: () => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreHarvests,
  onOpenCalculator,
}) => {
  return (
    <section className="relative pt-8 pb-14 lg:pt-14 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Balanced Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Mission & Call to Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-800 uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Direct-to-Consumer Produce Bridge</span>
              <span className="text-stone-300">/</span>
              <span className="text-stone-500 font-normal">Reclaiming the Food Dollar</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-stone-900 tracking-tight leading-[1.1] mb-6 [text-wrap:balance]">
              Break the Middlemen Trap. Fresh Produce, Direct from Soil to Table.
            </h1>

            <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mb-8">
              Corporate supermarkets and industrial distributors pocket up to 86% of the consumer food dollar while produce sits for weeks in nitrogen gas warehouses. HarvestBridge connects conscious households directly with local regenerative farmers—tripling grower income while delivering morning-harvested produce at lower grocery prices.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onExploreHarvests}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 active:scale-98 transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Explore Today’s Harvests</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-800 bg-stone-100 border border-stone-300/80 rounded-lg hover:bg-stone-200/80 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-emerald-800" />
                <span>Simulate Price Breakdown</span>
              </button>
            </div>

            {/* Zero-Pill Unboxed Trust Indicators */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-500 pt-2 border-t border-stone-200">
              <span className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Tree & Vine Ripened</span>
              </span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zero Post-Harvest Wax or Gassing</span>
              </span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>84% Farm Return Guaranteed</span>
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 bg-stone-100 group">
              <img
                src="/src/assets/images/hero_organic_harvest_1793911680072.jpg"
                alt="Sunlit wooden harvest crate overflowing with organic heirloom tomatoes, rainbow chard, and golden beets"
                className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/85 backdrop-blur-md text-white border border-white/10">
                <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
                  <span className="font-medium tracking-wide uppercase">Batch #418 Live Drop</span>
                  <span className="font-mono-numbers">Picked 6:00 AM Today</span>
                </div>
                <p className="text-sm font-semibold text-stone-100 font-display">
                  Sunridge Agroecological Collective · Willamette Valley
                </p>
                <div className="flex items-center justify-between mt-2 text-xs text-stone-300 pt-2 border-t border-white/10 font-mono-numbers">
                  <span>Farm return: $2.85/lb</span>
                  <span className="text-amber-300">Retail grocery equivalent: $4.80/lb</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Metric Proof Adjacency Strip Below Split */}
        <div className="mt-14 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display text-emerald-800 font-mono-numbers">
              84.2%
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-500 mt-1">
              Farmer Dollar Retained
            </div>
            <div className="text-xs text-stone-400 mt-0.5">
              vs 15.8% conventional grocery share
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display text-stone-900 font-mono-numbers">
              28 mi
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-500 mt-1">
              Average Farm-to-Fork
            </div>
            <div className="text-xs text-stone-400 mt-0.5">
              vs 1,850 mi cross-country hauling
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display text-stone-900 font-mono-numbers">
              &lt; 24 hrs
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-500 mt-1">
              Harvest to Table
            </div>
            <div className="text-xs text-stone-400 mt-0.5">
              vs 21+ days cold storage gassing
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display text-amber-700 font-mono-numbers">
              -31.5%
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-500 mt-1">
              Consumer Grocery Savings
            </div>
            <div className="text-xs text-stone-400 mt-0.5">
              Organic grade at wholesale rates
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
