import React from 'react';
import { Quote } from 'lucide-react';

export const GrowerStorySection: React.FC = () => {
  return (
    <section id="our-model" className="py-16 sm:py-24 bg-[#F5F2EB] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Documentary Portrait */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-300/80 bg-stone-200">
              <img
                src="/src/assets/images/farmer_harvest_story_1793911682344.jpg"
                alt="Elena Vance holding a wicker basket of freshly harvested vegetables on her family farm"
                className="w-full h-[460px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                  Grower Spotlight
                </div>
                <div className="text-lg font-bold font-display text-white">
                  Elena Vance
                </div>
                <div className="text-xs text-stone-300">
                  Sunridge Agroecological Collective · 3rd Generation Farmer
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Human Reality of Agriculture */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
              The Reality Behind the Supermarket Shelf
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight mb-6 [text-wrap:balance]">
              &ldquo;The broker offered 38¢ a pound. The supermarket charged $3.99. We were losing our land.&rdquo;
            </h2>

            <div className="relative pl-6 border-l-2 border-emerald-800/40 mb-6">
              <Quote className="absolute -left-3 -top-1 w-6 h-6 text-emerald-800/30" />
              <p className="text-stone-700 leading-relaxed text-base italic">
                &ldquo;For decades, independent growers were forced into the commodity trap. You take on all the weather risks, invest thousands in organic compost, hand-weed every row, and then at harvest, the regional distributor drives up and dictates the price. If you refuse, your crop rots. HarvestBridge changed our destiny. By connecting with 280 families in the valley directly, we keep 85 cents on every dollar, pay our field hands $24 an hour with full benefits, and deliver produce picked six hours before dinner.&rdquo;
              </p>
            </div>

            {/* Before vs After Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-300/80">
              <div className="bg-white/80 p-4 rounded-xl border border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                  The Old Middlemen Trap
                </span>
                <ul className="mt-2 space-y-1.5 text-xs text-stone-600">
                  <li>· 38¢/lb farm-gate price for heirloom tomatoes</li>
                  <li>· Up to 35% of crops rejected for minor cosmetic curves</li>
                  <li>· 90-day payment lag from industrial buyers</li>
                  <li>· Produce held in nitrogen storage for weeks</li>
                </ul>
              </div>

              <div className="bg-emerald-800/10 p-4 rounded-xl border border-emerald-800/20">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                  The Direct Produce Bridge
                </span>
                <ul className="mt-2 space-y-1.5 text-xs text-stone-700 font-medium">
                  <li>· $2.85/lb direct return (395% income increase)</li>
                  <li>· Zero cosmetic waste—celebrating biodiversity</li>
                  <li>· Instant payment upon harvest truck departure</li>
                  <li>· 100% vine-ripened, maximum nutrient density</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
