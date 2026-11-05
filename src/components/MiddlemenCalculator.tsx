import React, { useState } from 'react';
import { MIDDLEMAN_CROPS, MiddlemanCropData } from '../data/mockProduce.ts';
import { TrendingUp, Sparkles, Truck, Clock, ShieldCheck } from 'lucide-react';

export const MiddlemenCalculator: React.FC = () => {
  const [selectedCropId, setSelectedCropId] = useState<string>('tomatoes');
  const [volumeLbs, setVolumeLbs] = useState<number>(50);

  const crop: MiddlemanCropData =
    MIDDLEMAN_CROPS.find((c) => c.id === selectedCropId) || MIDDLEMAN_CROPS[0];

  // Conventional calculations
  const totalSupermarketCost = crop.supermarketRetailPerLb * volumeLbs;
  const conventionalFarmerIncome = crop.conventionalFarmerCutPerLb * volumeLbs;
  const wholesalerCut = crop.wholesalerCutPerLb * volumeLbs;
  const coldStorageCut = crop.coldStorageBrokerCutPerLb * volumeLbs;
  const retailerMarkup = crop.supermarketMarginPerLb * volumeLbs;

  // HarvestBridge direct calculations
  const totalBridgeCost = crop.harvestBridgeDirectPricePerLb * volumeLbs;
  const bridgeFarmerIncome = crop.harvestBridgeFarmerCutPerLb * volumeLbs;
  const bridgeLogistics = crop.harvestBridgeLogisticsPerLb * volumeLbs;

  // Net outcomes
  const farmerExtraIncome = bridgeFarmerIncome - conventionalFarmerIncome;
  const farmerIncomeMultiplier = (
    crop.harvestBridgeFarmerCutPerLb / crop.conventionalFarmerCutPerLb
  ).toFixed(1);
  const consumerSavings = totalSupermarketCost - totalBridgeCost;
  const consumerSavingsPercent = Math.round(
    ((crop.supermarketRetailPerLb - crop.harvestBridgeDirectPricePerLb) /
      crop.supermarketRetailPerLb) *
      100
  );

  return (
    <section id="middlemen-trap" className="py-16 sm:py-20 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            The Economics of Food Sovereignty
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight mb-4 [text-wrap:balance]">
            Exposing the Middlemen Trap: See Where Your Food Dollar Really Goes
          </h2>
          <p className="text-stone-600 leading-relaxed text-base sm:text-lg">
            In standard supermarket distribution, farmers receive mere pennies on the dollar while distributors, warehouses, and grocery chains mark up produce by over 400%. Test any crop below to see how our direct bridge redirects money back into growers&apos; hands.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Crop Selector */}
            <div className="md:col-span-7">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                Select Crop or Harvest Produce
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MIDDLEMAN_CROPS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCropId(item.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-all cursor-pointer truncate ${
                      selectedCropId === item.id
                        ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Slider */}
            <div className="md:col-span-5 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Harvest Volume / Basket Size
                </span>
                <span className="text-sm font-bold font-mono-numbers text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                  {volumeLbs} lbs
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={volumeLbs}
                onChange={(e) => setVolumeLbs(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer h-2 bg-stone-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-2 font-mono-numbers">
                <span>10 lbs (Small Box)</span>
                <span>50 lbs (Family / Canners)</span>
                <span>300 lbs (Neighborhood Drop)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Card 1: Conventional Supermarket Chain */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Traditional System
                  </span>
                  <h3 className="text-xl font-bold font-display text-stone-900 mt-0.5">
                    Corporate Supermarket Supply Chain
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono-numbers text-stone-900">
                    ${crop.supermarketRetailPerLb.toFixed(2)}
                    <span className="text-xs font-normal text-stone-500"> / lb</span>
                  </div>
                  <div className="text-xs text-stone-500 font-mono-numbers">
                    Total: ${totalSupermarketCost.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-stone-700">
                      Farmer Pay (Farm Gate Gross)
                    </span>
                    <span className="font-mono-numbers text-stone-500">
                      ${crop.conventionalFarmerCutPerLb.toFixed(2)}/lb ({Math.round((crop.conventionalFarmerCutPerLb / crop.supermarketRetailPerLb) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-amber-600 h-2.5 rounded-full"
                      style={{
                        width: `${(crop.conventionalFarmerCutPerLb / crop.supermarketRetailPerLb) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Barely covers fuel, fertilizer, and seed costs.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-stone-700">
                      Wholesaler & Regional Aggregators
                    </span>
                    <span className="font-mono-numbers text-stone-500">
                      ${crop.wholesalerCutPerLb.toFixed(2)}/lb ({Math.round((crop.wholesalerCutPerLb / crop.supermarketRetailPerLb) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-stone-400 h-2.5 rounded-full"
                      style={{
                        width: `${(crop.wholesalerCutPerLb / crop.supermarketRetailPerLb) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-stone-700">
                      Cold Storage Broker & Nitrogen Gassing
                    </span>
                    <span className="font-mono-numbers text-stone-500">
                      ${crop.coldStorageBrokerCutPerLb.toFixed(2)}/lb ({Math.round((crop.coldStorageBrokerCutPerLb / crop.supermarketRetailPerLb) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-stone-300 h-2.5 rounded-full"
                      style={{
                        width: `${(crop.coldStorageBrokerCutPerLb / crop.supermarketRetailPerLb) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-stone-700">
                      Supermarket Corporate Margin & Shrink
                    </span>
                    <span className="font-mono-numbers text-stone-500">
                      ${crop.supermarketMarginPerLb.toFixed(2)}/lb ({Math.round((crop.supermarketMarginPerLb / crop.supermarketRetailPerLb) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-rose-500 h-2.5 rounded-full"
                      style={{
                        width: `${(crop.supermarketMarginPerLb / crop.supermarketRetailPerLb) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Physical Costs / Ecological Impact */}
              <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-4 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>
                    <strong className="text-stone-900 font-mono-numbers">{crop.conventionalFoodMiles}</strong> food miles average
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>
                    <strong className="text-stone-900 font-mono-numbers">{crop.conventionalDaysInStorage} days</strong> post-harvest holding
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 bg-stone-50 p-4 rounded-xl text-xs text-stone-600">
              <span className="font-semibold text-stone-800">Total Farmer Cut: </span>
              <span className="font-mono-numbers text-stone-900 font-bold">
                ${conventionalFarmerIncome.toFixed(2)}
              </span>{' '}
              on {volumeLbs} lbs (only {( (conventionalFarmerIncome / totalSupermarketCost) * 100 ).toFixed(1)}% of what you pay)
            </div>
          </div>

          {/* Card 2: HarvestBridge Direct-to-Consumer Bridge */}
          <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 p-6 sm:p-8 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/80 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    The Direct Bridge
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">
                    HarvestBridge Direct-to-Consumer
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono-numbers text-amber-300">
                    ${crop.harvestBridgeDirectPricePerLb.toFixed(2)}
                    <span className="text-xs font-normal text-emerald-200"> / lb</span>
                  </div>
                  <div className="text-xs text-emerald-200 font-mono-numbers">
                    Total: ${totalBridgeCost.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-5 mb-6">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-emerald-100 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Direct Farmer Share (Retained Locally)</span>
                    </span>
                    <span className="font-mono-numbers text-amber-200 font-bold">
                      ${crop.harvestBridgeFarmerCutPerLb.toFixed(2)}/lb ({Math.round((crop.harvestBridgeFarmerCutPerLb / crop.harvestBridgeDirectPricePerLb) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-emerald-950/80 rounded-full h-3 overflow-hidden p-0.5 border border-emerald-700/60">
                    <div
                      className="bg-emerald-400 h-2 rounded-full"
                      style={{
                        width: `${(crop.harvestBridgeFarmerCutPerLb / crop.harvestBridgeDirectPricePerLb) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-emerald-300 mt-1">
                    Direct payment in the farmer&apos;s bank within 24 hours of harvest.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-emerald-200">
                      Cold-Van Regional Fleet & Compostable Packing
                    </span>
                    <span className="font-mono-numbers text-emerald-300">
                      ${crop.harvestBridgeLogisticsPerLb.toFixed(2)}/lb ({Math.round((crop.harvestBridgeLogisticsPerLb / crop.harvestBridgeDirectPricePerLb) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-emerald-950/80 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2.5 rounded-full"
                      style={{
                        width: `${(crop.harvestBridgeLogisticsPerLb / crop.harvestBridgeDirectPricePerLb) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Physical Costs / Ecological Impact */}
              <div className="pt-4 border-t border-emerald-800/80 grid grid-cols-2 gap-4 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>
                    <strong className="text-white font-mono-numbers">{crop.bridgeFoodMiles} miles</strong> local transit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>
                    <strong className="text-white font-mono-numbers">{crop.bridgeHoursToDoor} hrs</strong> vine-to-doorstep
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-800/80 bg-emerald-950/50 p-4 rounded-xl text-xs text-emerald-200">
              <span className="font-semibold text-white">Direct Farmer Payment: </span>
              <span className="font-mono-numbers text-amber-300 font-bold text-sm">
                ${bridgeFarmerIncome.toFixed(2)}
              </span>{' '}
              on {volumeLbs} lbs (Farmer retains{' '}
              {((bridgeFarmerIncome / totalBridgeCost) * 100).toFixed(1)}%)
            </div>
          </div>
        </div>

        {/* Live Net Impact Card */}
        <div className="p-6 sm:p-8 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-200/80 flex items-center justify-center shrink-0 text-amber-800">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-amber-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulated Community Value on {volumeLbs} lbs</span>
              </div>
              <h4 className="text-lg font-bold font-display text-stone-900 mt-0.5">
                The farmer earns{' '}
                <span className="text-emerald-800 font-mono-numbers font-extrabold">
                  +${farmerExtraIncome.toFixed(2)} more ({farmerIncomeMultiplier}x income)
                </span>{' '}
                while you save{' '}
                <span className="text-amber-900 font-mono-numbers font-extrabold">
                  ${consumerSavings.toFixed(2)} ({consumerSavingsPercent}% off grocery)
                </span>
              </h4>
              <p className="text-xs text-amber-900/80 mt-1">
                Zero corporate packaging waste, 98% reduced transportation emissions, and produce picked at peak flavor maturity.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="#marketplace"
              className="px-5 py-3 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              Order Direct Harvest
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
