import React, { useState } from 'react';
import { ProduceItem } from '../data/mockProduce.ts';
import { X, Check, MapPin, Clock, Sparkles, Loader2, ShieldCheck, Heart } from 'lucide-react';

interface ProduceDetailModalProps {
  item: ProduceItem | null;
  onClose: () => void;
  onAddToCart: (item: ProduceItem) => void;
}

export const ProduceDetailModal: React.FC<ProduceDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectionResult, setInspectionResult] = useState<any>(null);

  if (!item) return null;

  const handleRunInspector = async () => {
    setIsInspecting(true);
    try {
      const response = await fetch('/api/freshness-inspector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: item.name,
          hoursSinceHarvest: 6,
          storageCondition: 'Farm cellar, 52°F ambient',
          appearanceNotes: item.tasteNotes,
        }),
      });
      const data = await response.json();
      if (data.data) {
        setInspectionResult(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsInspecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in fade-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media Header */}
        <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono-numbers mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{item.harvestDate}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {item.distanceMiles} miles to your doorstep
              </span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white">{item.name}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 max-h-[60vh] overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-emerald-800 text-sm">{item.farmName}</span>
              <span className="font-mono-numbers text-stone-400">{item.farmLocation}</span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Rescue Callout if applicable */}
          {item.rescueReason && (
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/90 text-xs text-amber-950 space-y-1">
              <span className="font-bold text-amber-900 uppercase tracking-wider text-[11px] block">
                Zero-Cull Salvage Reason:
              </span>
              <p className="leading-relaxed">{item.rescueReason}</p>
            </div>
          )}

          {/* Living Nutrient & Footprint Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-numbers">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold font-sans">
                Natural Brix
              </div>
              <div className="text-lg font-bold text-stone-900 mt-0.5">
                {item.brixSugarRating || 9.2}°
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold font-sans">
                Active Enzymes
              </div>
              <div className="text-lg font-bold text-emerald-800 mt-0.5">
                {item.nutrientRetentionPercent || 96}%
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold font-sans">
                Water Saved
              </div>
              <div className="text-lg font-bold text-emerald-800 mt-0.5">
                {item.waterSavedGal || 320} gal
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold font-sans">
                CO2e Avoided
              </div>
              <div className="text-lg font-bold text-amber-800 mt-0.5">
                {item.co2eAvoidedLbs || 26} lbs
              </div>
            </div>
          </div>

          {/* Farming Practices */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
              Regenerative Soil & Organic Credentials
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {item.farmingPractices.map((practice, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md border border-stone-200 flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3 text-emerald-700" />
                  <span>{practice}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Farmer Voice */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <span className="font-semibold text-stone-900 block mb-1">About the Grower:</span>
            <p className="text-stone-600 leading-relaxed">{item.farmerBio}</p>
          </div>

          {/* Taste & Sensory Notes */}
          <div className="text-xs text-stone-600">
            <span className="font-semibold text-stone-900 block mb-1">Sensory & Flavor Profile:</span>
            <p className="leading-relaxed">{item.tasteNotes}</p>
          </div>

          {/* AI Freshness Inspector Feature */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  AI Crop Physiologist & Freshness Index
                </span>
              </div>
              {!inspectionResult && (
                <button
                  onClick={handleRunInspector}
                  disabled={isInspecting}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer border border-emerald-200 flex items-center gap-1.5"
                >
                  {isInspecting ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Evaluating...</span>
                    </>
                  ) : (
                    <span>Inspect Peak Flavor Window</span>
                  )}
                </button>
              )}
            </div>

            {inspectionResult && (
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5 text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Grade: {inspectionResult.freshnessGrade}</span>
                  </span>
                  <span className="font-mono-numbers">
                    Peak Flavor: Next {inspectionResult.peakFlavorWindowDays} days
                  </span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  <strong>Preparation: </strong>
                  {inspectionResult.consumerPreparationNote}
                </p>
                <p className="text-stone-500 text-[11px]">
                  <strong>Transit Cold-Chain: </strong>
                  {inspectionResult.coldChainRequirements}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-xl font-bold font-mono-numbers text-stone-900">
              ${item.priceDirect.toFixed(2)}
              <span className="text-xs font-normal text-stone-500 ml-1">/ {item.unit}</span>
            </div>
            <div className="text-xs text-emerald-800 font-medium">
              Saves ${(item.priceSupermarketEquiv - item.priceDirect).toFixed(2)} vs supermarket
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(item);
              onClose();
            }}
            className="py-2.5 px-6 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-98 rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            <Heart className="w-3.5 h-3.5 text-emerald-300" />
            <span>Add to Harvest Box</span>
          </button>
        </div>
      </div>
    </div>
  );
};
