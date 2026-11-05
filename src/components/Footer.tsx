import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-stone-800 text-xs">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-emerald-700 text-amber-200 flex items-center justify-center font-display font-bold text-xs">
                H
              </span>
              <span className="text-base font-bold font-display text-white">
                HarvestBridge
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Direct-to-consumer agricultural logistics bridge. Returning up to 86% of the food dollar directly to family farms and community growers.
            </p>
          </div>

          {/* Nav Col */}
          <div>
            <span className="font-semibold text-white uppercase tracking-wider block mb-3 text-[11px]">
              Marketplace
            </span>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Today&apos;s Drops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Curated CSA Boxes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Heirloom Varieties
                </button>
              </li>
            </ul>
          </div>

          {/* Growers Col */}
          <div>
            <span className="font-semibold text-white uppercase tracking-wider block mb-3 text-[11px]">
              For Farmers
            </span>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('farmer-studio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Farmer Pricing Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('middlemen-trap')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Middlemen Trap Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('labor-mitigation')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Labor Solutions &amp; Harvest Guilds
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('farmer-hotline')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Grower Doubts &amp; SMS Hotline
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('drop-hubs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Neighborhood Drop Hubs
                </button>
              </li>
            </ul>
          </div>

          {/* Standards Col */}
          <div>
            <span className="font-semibold text-white uppercase tracking-wider block mb-3 text-[11px]">
              Our Agricultural Standard
            </span>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Every participating grower is verified for regenerative soil stewardship, pesticide-free practices, and fair worker compensation.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} HarvestBridge Agroecological Network. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Direct Farm Sovereignty</span>
            <span>·</span>
            <span>Zero Nitrogen Holding</span>
            <span>·</span>
            <span>Fair Grower Revenue</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
