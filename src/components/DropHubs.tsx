import React, { useState } from 'react';
import { DROP_HUBS, DropHub } from '../data/mockProduce.ts';
import { MapPin, Calendar, Clock, CheckCircle2, User, ChevronRight } from 'lucide-react';

interface DropHubsProps {
  onSelectHub?: (hub: DropHub) => void;
}

export const DropHubs: React.FC<DropHubsProps> = ({ onSelectHub }) => {
  const [pledgedHubs, setPledgedHubs] = useState<DropHub[]>(DROP_HUBS);
  const [justPledgedId, setJustPledgedId] = useState<string | null>(null);

  const handlePledgeBox = (hubId: string) => {
    fetch(`/api/hubs/${hubId}/pledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boxes: 1 }),
    }).catch((err) => console.log('Offline pledge:', err));

    setPledgedHubs((prev) =>
      prev.map((h) => {
        if (h.id === hubId) {
          const nextCount = h.currentBoxesPledged + 1;
          return {
            ...h,
            currentBoxesPledged: nextCount,
            isUnlocked: nextCount >= h.thresholdToUnlockFreeTransit,
          };
        }
        return h;
      })
    );
    setJustPledgedId(hubId);
    setTimeout(() => setJustPledgedId(null), 3000);
  };

  return (
    <section id="drop-hubs" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
          The Direct Route
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight mb-4 [text-wrap:balance]">
          Neighborhood Drop Hubs: Zero-Middleman Cold Chain
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          How do we beat supermarket logistics? By aggregating neighborhood orders. A single refrigerated van delivers direct from local orchards to community collection points every Friday and Saturday—eliminating distribution warehouses, plastic clamshells, and excessive freight miles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {pledgedHubs.map((hub) => {
          const progressPercent = Math.min(
            100,
            Math.round((hub.currentBoxesPledged / hub.thresholdToUnlockFreeTransit) * 100)
          );

          return (
            <div
              key={hub.id}
              className={`p-6 sm:p-7 rounded-2xl border transition-all flex flex-col justify-between ${
                hub.isUnlocked
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500">
                      {hub.neighborhood}
                    </span>
                    <h3 className="text-xl font-bold font-display text-stone-900 mt-0.5">
                      {hub.name}
                    </h3>
                  </div>

                  {hub.isUnlocked ? (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 flex items-center gap-1 font-mono-numbers">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Free Drop Unlocked
                    </span>
                  ) : (
                    <span className="text-xs font-mono-numbers text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      {hub.thresholdToUnlockFreeTransit - hub.currentBoxesPledged} more boxes needed
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-stone-600 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{hub.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>{hub.pickupDay}</span>
                    <span className="text-stone-300">·</span>
                    <Clock className="w-4 h-4 text-stone-400 shrink-0 ml-1" />
                    <span>{hub.pickupTimeWindow}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>Host: {hub.coordinator}</span>
                  </div>
                </div>

                {/* Progress bar to unlock free transit */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-1.5 font-mono-numbers">
                    <span className="text-stone-500 font-medium">Batch Threshold Target</span>
                    <span className="font-bold text-stone-800">
                      {hub.currentBoxesPledged} / {hub.thresholdToUnlockFreeTransit} boxes ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        hub.isUnlocked ? 'bg-emerald-700' : 'bg-amber-600'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1.5">
                    {hub.isUnlocked
                      ? 'Refrigerated van confirmed for delivery! Free delivery applied.'
                      : 'When 45 neighbors pledge a box, the farm van runs free of courier fees.'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex items-center gap-3">
                <button
                  onClick={() => handlePledgeBox(hub.id)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Pledge 1 Box for this Friday
                </button>

                {onSelectHub && (
                  <button
                    onClick={() => onSelectHub(hub)}
                    className="py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Select Hub</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {justPledgedId === hub.id && (
                <div className="mt-2 text-center text-xs text-emerald-800 font-medium">
                  ✓ 1 box added to {hub.name} pledge count!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
