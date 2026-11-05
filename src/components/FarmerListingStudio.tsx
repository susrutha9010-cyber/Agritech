import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, Package, Loader2 } from 'lucide-react';
import { ProduceItem } from '../data/mockProduce.ts';

interface PricingAdvisorResult {
  supermarketAveragePricePerLb: number;
  recommendedDirectPricePerLb: number;
  farmerProfitIncreasePercent: number;
  consumerSavingsPercent: number;
  totalFarmerRevenueGain: number;
  priceBreakdown: {
    farmerSharePercent: number;
    coldLogisticsPercent: number;
    packagingPercent: number;
    platformFeePercent: number;
  };
  recommendedBundles: Array<{
    tierName: string;
    sizeLbs: number;
    price: number;
    targetAudience: string;
    packagingNote: string;
  }>;
  consumerStoryPitch: string;
  harvestFreshnessTip: string;
}

interface FarmerListingStudioProps {
  onPublishNewBatch: (newItem: ProduceItem) => void;
}

export const FarmerListingStudio: React.FC<FarmerListingStudioProps> = ({
  onPublishNewBatch,
}) => {
  const [cropName, setCropName] = useState('Heirloom Brandywine Tomatoes');
  const [category, setCategory] = useState<'csa-boxes' | 'heirlooms' | 'greens-roots' | 'orchard-berries' | 'pantry'>('heirlooms');
  const [volumeLbs, setVolumeLbs] = useState(250);
  const [farmingPractice, setFarmingPractice] = useState('No-Till Regenerative & Organic');
  const [middlemanOffer, setMiddlemanOffer] = useState(0.75);
  const [farmName, setFarmName] = useState('Valley Spring Heritage Growers');
  const [farmLocation, setFarmLocation] = useState('Columbia Basin');
  const [harvestNotes, setHarvestNotes] = useState('Vine-ripened under cool mountain nights; extraordinary natural sugars and thin skins.');

  const [isLoading, setIsLoading] = useState(false);
  const [advisorData, setAdvisorData] = useState<PricingAdvisorResult | null>(null);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleGenerateAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPublishSuccess(false);

    try {
      const response = await fetch('/api/pricing-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName,
          category,
          volumeLbs: Number(volumeLbs),
          farmingPractice,
          middlemanOfferPerLb: Number(middlemanOffer),
          location: `${farmName}, ${farmLocation}`,
          harvestNotes,
        }),
      });

      const res = await response.json();
      if (res.data) {
        setAdvisorData(res.data);
      }
    } catch (err) {
      console.error('Error fetching advisor:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!advisorData) return;

    const unitPrice = advisorData.recommendedBundles[0]?.price || advisorData.recommendedDirectPricePerLb * 8;
    const marketEquiv = (advisorData.supermarketAveragePricePerLb * (advisorData.recommendedBundles[0]?.sizeLbs || 8));

    const newProduce: ProduceItem = {
      id: `custom-batch-${Date.now()}`,
      name: `${cropName} (Farm Direct Batch)`,
      farmName: farmName,
      farmLocation: farmLocation,
      distanceMiles: 18,
      category: category,
      priceDirect: unitPrice,
      unit: `${advisorData.recommendedBundles[0]?.sizeLbs || 8} lb farm crate`,
      priceSupermarketEquiv: marketEquiv,
      harvestedTimeAgo: 'Harvested this morning',
      harvestDate: 'Scheduled for next cold-van run',
      image: '/src/assets/images/produce_heirloom_tomatoes_1793911681260.jpg',
      description: advisorData.consumerStoryPitch,
      farmingPractices: [farmingPractice, 'Direct-to-Consumer Bridge', 'Zero Gas Storage'],
      stockLbs: volumeLbs,
      farmerBio: `${farmName} in ${farmLocation} is reclaiming their fair food dollar through direct neighborhood community supply.`,
      tasteNotes: advisorData.harvestFreshnessTip,
      brixSugarRating: 9.6,
      nutrientRetentionPercent: 97,
      waterSavedGal: Math.round(volumeLbs * 3.5),
      co2eAvoidedLbs: Math.round(volumeLbs * 0.35),
      snapEligible: true,
    };

    try {
      await fetch('/api/produce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduce),
      });
    } catch (e) {
      console.warn('Backend sync:', e);
    }

    onPublishNewBatch(newProduce);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 5000);
  };

  return (
    <section id="farmer-studio" className="py-16 sm:py-20 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-300 uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grower Enablement Studio · Powered by Gemini AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight mb-4 [text-wrap:balance]">
            Farmer Studio: Calculate Your Fair Price & Break Free from Middlemen
          </h2>
          <p className="text-stone-400 text-base leading-relaxed">
            Brokers and supermarket buyers force farmers into take-it-or-leave-it wholesale contracts. Input your upcoming harvest below: our AI calculates the optimal direct-to-consumer price point, crafts an authentic farm story, and designs pre-sale bundles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-5 bg-stone-800/80 p-6 sm:p-8 rounded-2xl border border-stone-700/80">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
              <span>Your Harvest Batch Details</span>
              <span className="text-xs font-normal text-stone-400">Step 1 of 2</span>
            </h3>

            <form onSubmit={handleGenerateAdvisor} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Crop Name & Variety
                </label>
                <input
                  type="text"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="heirlooms">Heirloom Fruits</option>
                    <option value="csa-boxes">CSA Harvest Boxes</option>
                    <option value="greens-roots">Greens & Roots</option>
                    <option value="orchard-berries">Orchard & Berries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Total Volume (lbs)
                  </label>
                  <input
                    type="number"
                    value={volumeLbs}
                    onChange={(e) => setVolumeLbs(Number(e.target.value))}
                    min="10"
                    max="10000"
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono-numbers"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Farm Name
                  </label>
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Region / Valley
                  </label>
                  <input
                    type="text"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Current Broker / Middleman Offer ($/lb)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-stone-500 font-mono-numbers">$</span>
                  <input
                    type="number"
                    step="0.05"
                    value={middlemanOffer}
                    onChange={(e) => setMiddlemanOffer(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono-numbers"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  The low rate brokers usually offer at the packing dock.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Farming Practices & Soil Health
                </label>
                <input
                  type="text"
                  value={farmingPractice}
                  onChange={(e) => setFarmingPractice(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Harvest Notes & Flavor Profile
                </label>
                <textarea
                  rows={2}
                  value={harvestNotes}
                  onChange={(e) => setHarvestNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Agricultural Economics...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Fair Direct Pricing & Story</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7">
            {advisorData ? (
              <div className="bg-stone-800/90 rounded-2xl border border-stone-700 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-700">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                      Economic Analysis Result
                    </span>
                    <h3 className="text-xl font-bold font-display text-white mt-1">
                      Direct-to-Consumer Strategy for {cropName}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-stone-400">Projected Extra Income</div>
                    <div className="text-2xl font-bold font-mono-numbers text-amber-300">
                      +${advisorData.totalFarmerRevenueGain.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Key Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-700/60">
                    <div className="text-[11px] text-stone-400 uppercase">Recommended Direct</div>
                    <div className="text-lg font-bold font-mono-numbers text-emerald-400">
                      ${advisorData.recommendedDirectPricePerLb.toFixed(2)}/lb
                    </div>
                  </div>

                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-700/60">
                    <div className="text-[11px] text-stone-400 uppercase">Supermarket Shelf</div>
                    <div className="text-lg font-bold font-mono-numbers text-stone-300">
                      ${advisorData.supermarketAveragePricePerLb.toFixed(2)}/lb
                    </div>
                  </div>

                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-700/60">
                    <div className="text-[11px] text-stone-400 uppercase">Farmer Income Gain</div>
                    <div className="text-lg font-bold font-mono-numbers text-amber-300 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{advisorData.farmerProfitIncreasePercent}%
                    </div>
                  </div>

                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-700/60">
                    <div className="text-[11px] text-stone-400 uppercase">Consumer Savings</div>
                    <div className="text-lg font-bold font-mono-numbers text-emerald-300">
                      -{advisorData.consumerSavingsPercent}%
                    </div>
                  </div>
                </div>

                {/* Story Pitch */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                    Consumer Story Pitch (Generated for your harvest)
                  </h4>
                  <div className="p-4 bg-stone-900/90 rounded-xl border border-stone-700/80 text-xs text-stone-200 leading-relaxed italic">
                    &ldquo;{advisorData.consumerStoryPitch}&rdquo;
                  </div>
                </div>

                {/* Recommended Bundles */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                    Recommended Consumer Packaging Bundles
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {advisorData.recommendedBundles.map((bundle, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-700 text-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between font-bold text-white mb-1">
                            <span>{bundle.tierName} ({bundle.sizeLbs} lbs)</span>
                            <span className="font-mono-numbers text-amber-300">${bundle.price.toFixed(2)}</span>
                          </div>
                          <p className="text-stone-400 text-[11px]">{bundle.targetAudience}</p>
                        </div>
                        <div className="mt-2 pt-2 border-t border-stone-800 text-[11px] text-emerald-400 flex items-center gap-1.5">
                          <Package className="w-3 h-3" />
                          <span>{bundle.packagingNote}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Freshness Advice */}
                <div className="text-xs text-stone-400 flex items-start gap-2 bg-stone-900/50 p-3 rounded-lg border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Post-Harvest Freshness Note: </strong>
                    {advisorData.harvestFreshnessTip}
                  </span>
                </div>

                {/* Publish Action */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    onClick={handlePublish}
                    className="flex-1 py-3 px-5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Publish Batch to Active Marketplace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {publishSuccess && (
                  <div className="p-3 bg-emerald-950 text-emerald-300 rounded-lg text-xs flex items-center gap-2 border border-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      Batch successfully listed on HarvestBridge! Scroll up to Fresh Harvests to see it live.
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-stone-800/40 rounded-2xl border border-dashed border-stone-700">
                <Sparkles className="w-10 h-10 text-stone-600 mb-3" />
                <h4 className="text-base font-bold text-stone-300 font-display">
                  No Harvest Simulation Run Yet
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mt-1">
                  Fill in your crop and volume on the left and click &apos;Generate Fair Direct Pricing & Story&apos; to model your real earnings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
