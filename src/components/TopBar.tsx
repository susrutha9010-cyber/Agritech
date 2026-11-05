import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface TopBarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('hero')}
              className="group text-left text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-display whitespace-nowrap cursor-pointer transition-opacity hover:opacity-90 flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-200 flex items-center justify-center font-display text-lg font-bold shadow-xs">
                H
              </span>
              <span>HarvestBridge</span>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-medium text-stone-600">
            <button
              onClick={() => onNavigate('marketplace')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-800 cursor-pointer ${
                activeSection === 'marketplace' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
              }`}
            >
              Fresh Harvests
            </button>
            <button
              onClick={() => onNavigate('middlemen-trap')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-800 cursor-pointer ${
                activeSection === 'middlemen-trap' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
              }`}
            >
              Middlemen Trap
            </button>
            <button
              onClick={() => onNavigate('zero-cull-rescue')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-900 cursor-pointer ${
                activeSection === 'zero-cull-rescue' ? 'text-amber-900 font-semibold underline decoration-2 underline-offset-8' : ''
              }`}
            >
              Zero-Cull Salvage
            </button>
            <button
              onClick={() => onNavigate('climate-rescue')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-rose-700 cursor-pointer ${
                activeSection === 'climate-rescue' ? 'text-rose-700 font-semibold underline decoration-2 underline-offset-8' : ''
              }`}
            >
              Climate Pre-Sale
            </button>
            <button
              onClick={() => onNavigate('nutrient-traceability')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-800 cursor-pointer ${
                activeSection === 'nutrient-traceability' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
              }`}
            >
              Nutrients &amp; Brix
            </button>
            <button
              onClick={() => onNavigate('labor-mitigation')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-800 cursor-pointer ${
                activeSection === 'labor-mitigation' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
              }`}
            >
              Labor Solutions
            </button>
            <button
              onClick={() => onNavigate('farmer-studio')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-800 cursor-pointer flex items-center gap-1 ${
                activeSection === 'farmer-studio' ? 'text-emerald-800 font-semibold underline decoration-2 underline-offset-8' : ''
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Farmer Studio</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold tracking-wide text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 active:scale-98 transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
              aria-label="Open Harvest Box Cart"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-200" />
              <span>Harvest Box</span>
              <span className="bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] font-mono-numbers text-amber-300">
                {cartCount} · ${cartTotal.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
