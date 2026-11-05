import React, { useState, useEffect } from 'react';
import { NUTRIENT_DEGRADATION_DATA, NutrientDegradationFact } from '../data/mockProduce.ts';
import { Activity, ShieldCheck, Thermometer, Clock, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export const NutrientTraceabilityExplorer: React.FC = () => {
  const [selectedCropIndex, setSelectedCropIndex] = useState<number>(0);
  const cropData: NutrientDegradationFact = NUTRIENT_DEGRADATION_DATA[selectedCropIndex];

  // IoT Sensor Telemetry State from Authoritative Backend
  const [sensorStatus, setSensorStatus] = useState({
    vanTempF: 48.2,
    humidityPercent: 88,
    ethylenePpm: 0.02,
    gpsRoute: 'Valley Gate → Greenway Hub (22 mi)',
    sensorHealth: 'Optimal Cold-Chain Verified',
  });

  useEffect(() => {
    const fetchTelemetry = () => {
      fetch('/api/telemetry/cold-chain')
        .then((res) => res.json())
        .then((data) => {
          if (data.telemetry) {
            setSensorStatus({
              vanTempF: data.telemetry.cargoTempF,
              humidityPercent: data.telemetry.relativeHumidityPercent,
              ethylenePpm: data.telemetry.ethyleneGasPpm,
              gpsRoute: data.telemetry.currentRoute,
              sensorHealth: data.telemetry.coldChainCompliance,
            });
          }
        })
        .catch(() => {});
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="nutrient-traceability" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            <Activity className="w-4 h-4 text-emerald-800" />
            <span>Real-World Agricultural Crisis #3: The 21-Day Warehouse Illusion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight mb-4 [text-wrap:balance]">
            Living Nutrients vs. Warehouse Ethylene: Scientific Freshness
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Most supermarket produce looks shiny under retail LED lights, but was harvested <strong>14 to 30 days prior</strong>, held in chemical nitrogen storage rooms, and coated in synthetic waxes. By the time it reaches your table, up to 78% of active Vitamin C and antioxidants have oxidized. HarvestBridge delivers living harvest within 24 hours.
          </p>
        </div>

        {/* Interactive Crop Selector Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {NUTRIENT_DEGRADATION_DATA.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCropIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCropIndex === idx
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {item.crop}
            </button>
          ))}
        </div>

        {/* Side-by-Side Scientific Degradation Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Card 1: HarvestBridge Living Harvest */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Living Vine-Ripened
                  </span>
                  <h3 className="text-2xl font-bold font-display text-stone-900 mt-0.5">
                    HarvestBridge (14–24 Hours Old)
                  </h3>
                </div>
                <span className="text-xs font-mono-numbers font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  96% Enzymes Active
                </span>
              </div>

              <div className="space-y-6">
                {/* Nutrient Metric */}
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">
                    {cropData.nutrient}
                  </div>
                  <div className="text-2xl font-bold font-mono-numbers text-emerald-900">
                    {cropData.day1HarvestBridge}
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-3 mt-2 overflow-hidden">
                    <div className="bg-emerald-700 h-3 rounded-full w-[96%]"></div>
                  </div>
                </div>

                {/* Brix Sugar Metric */}
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-950 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      <span>Natural Brix Sugar Rating</span>
                    </span>
                    <span className="font-mono-numbers text-emerald-800 text-sm font-bold">
                      {cropData.brixSugarDirect}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-900/80 mt-1 leading-relaxed">
                    Allowed to ripen on the mother vine under direct sunlight. True organic sugars, volatile terpenes, and cellular crunch.
                  </p>
                </div>

                {/* Harvest handling */}
                <div className="text-xs text-stone-600 flex items-start gap-2 pt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    Zero 1-MCP chemical gassing. Untreated, unbleached, with natural living bloom intact.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 text-xs text-stone-500">
              Verified via refractometer &amp; farm gate HPLC spectrometry testing.
            </div>
          </div>

          {/* Card 2: Conventional Supermarket Storage */}
          <div className="lg:col-span-6 bg-stone-100 rounded-3xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Warehouse Aged
                  </span>
                  <h3 className="text-2xl font-bold font-display text-stone-900 mt-0.5">
                    Supermarket Shelf (18–30 Days Old)
                  </h3>
                </div>
                <span className="text-xs font-mono-numbers font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                  -{cropData.nutrientDeclinePercent}% Degraded
                </span>
              </div>

              <div className="space-y-6">
                {/* Nutrient Metric */}
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">
                    {cropData.nutrient}
                  </div>
                  <div className="text-2xl font-bold font-mono-numbers text-stone-600">
                    {cropData.day21Supermarket}
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-3 mt-2 overflow-hidden">
                    <div
                      className="bg-rose-500 h-3 rounded-full"
                      style={{ width: `${100 - cropData.nutrientDeclinePercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Brix Sugar Metric */}
                <div className="p-4 bg-white rounded-2xl border border-stone-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1">
                    <span>Supermarket Brix Sugar Rating</span>
                    <span className="font-mono-numbers text-rose-800 text-sm font-bold">
                      {cropData.brixSugarSupermarket}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                    Harvested prematurely while green so it survives rough commercial transport. Sugars never convert naturally.
                  </p>
                </div>

                {/* Storage Fact */}
                <div className="text-xs text-stone-600 p-3 bg-stone-50 rounded-xl border border-stone-200 leading-relaxed">
                  <strong className="text-stone-900">Industry Storage Method: </strong>
                  {cropData.storageFact}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 text-xs text-stone-500">
              Source: USDA Agricultural Research Service Postharvest Physiology Bulletins.
            </div>
          </div>
        </div>

        {/* Live IoT Cold-Van Telemetry Log Simulator */}
        <div className="bg-stone-900 text-stone-100 rounded-3xl border border-stone-800 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-1">
                <Thermometer className="w-3.5 h-3.5" />
                <span>IoT Cold-Chain Telemetry Guarantee</span>
              </div>
              <h4 className="text-xl font-bold font-display text-white">
                Live Van Cargo Sensor Stream (Active Transit Fleet)
              </h4>
            </div>

            <div className="flex items-center gap-2 bg-emerald-950/80 text-emerald-300 px-3.5 py-1.5 rounded-lg border border-emerald-800/80 text-xs font-mono-numbers">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{sensorStatus.sensorHealth}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
              <div className="text-[11px] text-stone-400 uppercase">Cargo Temperature</div>
              <div className="text-2xl font-bold font-mono-numbers text-emerald-400 mt-1">
                {sensorStatus.vanTempF}°F
              </div>
              <div className="text-[10px] text-stone-500 mt-1">Target range: 46°F – 52°F</div>
            </div>

            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
              <div className="text-[11px] text-stone-400 uppercase">Relative Humidity</div>
              <div className="text-2xl font-bold font-mono-numbers text-amber-300 mt-1">
                {sensorStatus.humidityPercent}%
              </div>
              <div className="text-[10px] text-stone-500 mt-1">Preserves crisp leaf turgor</div>
            </div>

            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
              <div className="text-[11px] text-stone-400 uppercase">Ethylene Gas Level</div>
              <div className="text-2xl font-bold font-mono-numbers text-emerald-400 mt-1">
                {sensorStatus.ethylenePpm} ppm
              </div>
              <div className="text-[10px] text-stone-500 mt-1">Near-zero decay trigger</div>
            </div>

            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
              <div className="text-[11px] text-stone-400 uppercase">Active Transit Leg</div>
              <div className="text-xs font-bold text-stone-200 mt-1 truncate">
                {sensorStatus.gpsRoute}
              </div>
              <div className="text-[10px] text-stone-500 mt-1 font-mono-numbers">Refrigerated Electric Transit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
