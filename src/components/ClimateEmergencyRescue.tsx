import React, { useState } from 'react';
import { WEATHER_EMERGENCY_ALERTS, WeatherEmergencyAlert, ProduceItem } from '../data/mockProduce.ts';
import { CloudLightning, AlertTriangle, ShieldCheck, Clock, Users, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

interface ClimateEmergencyRescueProps {
  produceList: ProduceItem[];
  onAddToCart: (item: ProduceItem) => void;
  onOpenDetails: (item: ProduceItem) => void;
}

export const ClimateEmergencyRescue: React.FC<ClimateEmergencyRescueProps> = ({
  produceList,
  onAddToCart,
  onOpenDetails,
}) => {
  const [alerts, setAlerts] = useState<WeatherEmergencyAlert[]>(WEATHER_EMERGENCY_ALERTS);
  const [pledgedAlertId, setPledgedAlertId] = useState<string | null>(null);

  // Farmer SOS Form State
  const [sosCrisisType, setSosCrisisType] = useState('impending-freeze');
  const [sosCrop, setSosCrop] = useState('Late Season Acorn Squash & Pears');
  const [sosVolume, setSosVolume] = useState(1200);
  const [sosHours, setSosHours] = useState(36);
  const [sosLossVal, setSosLossVal] = useState(3200);
  const [sosNotes, setSosNotes] = useState('Unseasonal 27°F frost arriving 3 weeks early. Fruit cell structure will rupture if not picked immediately.');
  const [isGeneratingSOS, setIsGeneratingSOS] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const handlePledgeCrate = (alert: WeatherEmergencyAlert) => {
    fetch(`/api/weather-alerts/${alert.id}/pledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poundsPledged: 14 }),
    }).catch((err) => console.log('Offline weather alert pledge:', err));

    // Find matching produce item or add
    const matchingItem = produceList.find((p) => p.id === 'frost-rescue-apples-pears') || produceList[0];
    onAddToCart(matchingItem);

    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === alert.id) {
          return {
            ...a,
            currentPoundsPledged: Math.min(a.targetPoundsPledged, a.currentPoundsPledged + 14),
          };
        }
        return a;
      })
    );

    setPledgedAlertId(alert.id);
    setTimeout(() => setPledgedAlertId(null), 3000);
  };

  const handleGenerateSOS = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingSOS(true);

    try {
      const response = await fetch('/api/crop-rescue-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crisisType: sosCrisisType,
          cropName: sosCrop,
          volumeLbs: Number(sosVolume),
          estimatedLossValue: Number(sosLossVal),
          hoursRemaining: Number(sosHours),
          farmerNotes: sosNotes,
        }),
      });

      const res = await response.json();
      if (res.data) {
        setGeneratedPlan(res.data);
      }
    } catch (err) {
      console.error('Error generating rescue plan:', err);
    } finally {
      setIsGeneratingSOS(false);
    }
  };

  return (
    <section id="climate-rescue" className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-stone-800">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-400 uppercase mb-2">
              <CloudLightning className="w-4 h-4 text-rose-400" />
              <span>Real-World Agricultural Crisis #2: Climate Shocks &amp; Weather Pre-Sales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight [text-wrap:balance]">
              Climate Emergency Pre-Sale Squad: Rescuing Crops Before the Freeze Hits
            </h2>
            <p className="text-stone-400 text-base sm:text-lg mt-2 leading-relaxed">
              Erratic weather patterns, sudden 26°F hard frosts, and unseasonal heatwaves threaten entire small farm operations with overnight bankruptcy. HarvestBridge mobilizes neighborhood pre-orders within 24 hours so crews can pick around the clock before the weather strikes.
            </p>
          </div>

          <div className="shrink-0 bg-stone-800/80 px-4 py-3 rounded-xl border border-rose-500/30 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white uppercase tracking-wider">Active Climate Watch</div>
              <div className="text-stone-400 font-mono-numbers">2 Farms in Active Weather Pre-Sale</div>
            </div>
          </div>
        </div>

        {/* Live Active Weather Emergency Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {alerts.map((alert) => {
            const percentFilled = Math.round(
              (alert.currentPoundsPledged / alert.targetPoundsPledged) * 100
            );

            return (
              <div
                key={alert.id}
                className="bg-stone-950 rounded-2xl border border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                {/* Visual hazard banner */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                    <span className="text-xs font-bold font-mono-numbers uppercase tracking-wider text-rose-400">
                      {alert.hazardType}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono-numbers text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/50">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{alert.hoursUntilEvent} Hours Until Impact</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-stone-400 mb-1">
                    <span className="text-emerald-400 font-semibold">{alert.farmName}</span> · {alert.location}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
                    {alert.cropAtRisk}
                  </h3>

                  <blockquote className="p-3.5 bg-stone-900/90 rounded-xl border border-stone-800 text-xs text-stone-300 italic leading-relaxed mb-6">
                    &ldquo;{alert.farmerQuote}&rdquo;
                    <div className="mt-1 text-right text-[11px] font-sans font-semibold text-stone-400 not-italic">
                      — {alert.farmerName}, Farm Operator
                    </div>
                  </blockquote>

                  {/* Progress Meter */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-mono-numbers">
                      <span className="text-stone-400">Pledged by Community</span>
                      <span className="font-bold text-emerald-400">
                        {alert.currentPoundsPledged} / {alert.targetPoundsPledged} lbs ({percentFilled}%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-900 rounded-full h-3 overflow-hidden border border-stone-800">
                      <div
                        className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentFilled}%` }}
                      ></div>
                    </div>
                    <div className="text-[11px] text-stone-500 flex justify-between">
                      <span>Harvest Crew Dispatched</span>
                      <span className="text-stone-400">{alert.targetPoundsPledged - alert.currentPoundsPledged} lbs needed to clear field</span>
                    </div>
                  </div>

                  {/* Pricing Comparison */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-900/70 rounded-xl border border-stone-800 mb-6 text-xs">
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase">Emergency Direct Price</div>
                      <div className="text-lg font-bold font-mono-numbers text-amber-300">
                        ${alert.directRescuePricePerLb.toFixed(2)}/lb
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase">Supermarket Shelf</div>
                      <div className="text-lg font-bold font-mono-numbers text-stone-400 line-through">
                        ${alert.supermarketEquivPerLb.toFixed(2)}/lb
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pledge Action */}
                <div className="pt-2">
                  <button
                    onClick={() => handlePledgeCrate(alert)}
                    className="w-full py-3.5 px-4 text-xs font-bold text-stone-900 bg-emerald-400 hover:bg-emerald-300 active:scale-98 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Pledge 14 lb Pre-Freeze Rescue Tote ($21.00)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {pledgedAlertId === alert.id && (
                    <div className="mt-2 p-2 bg-emerald-950 text-emerald-300 text-xs rounded text-center flex items-center justify-center gap-1.5 border border-emerald-800">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>14 lb rescue tote added to your Harvest Box!</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Farmer SOS Emergency Generator */}
        <div className="bg-stone-950 rounded-3xl border border-stone-800 p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-300 uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grower Crisis Tool · Powered by Gemini AI</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              Farmer SOS: Trigger an Emergency Weather Flash-Drop
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">
              Facing sudden frost, extreme heat, or unexpected distributor cancellation? Input your crop details below: our AI calculates emergency price tiers, generates a neighborhood mobilization campaign, and coordinates cold logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handleGenerateSOS} className="lg:col-span-5 space-y-4 bg-stone-900/80 p-5 sm:p-6 rounded-2xl border border-stone-800">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Threat / Crisis Category
                </label>
                <select
                  value={sosCrisisType}
                  onChange={(e) => setSosCrisisType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="impending-freeze">Impending Freezing Front / Hard Frost</option>
                  <option value="heatwave-glut">Heatwave Spurt & Rapid Bolting</option>
                  <option value="cosmetic-cull">Wholesale Broker Cull Rejection</option>
                  <option value="broker-cancellation">Last-Minute Distributor Cancellation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Crop Name & At-Risk Field
                </label>
                <input
                  type="text"
                  value={sosCrop}
                  onChange={(e) => setSosCrop(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Volume at Risk (lbs)
                  </label>
                  <input
                    type="number"
                    value={sosVolume}
                    onChange={(e) => setSosVolume(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Hours Before Disaster
                  </label>
                  <input
                    type="number"
                    value={sosHours}
                    onChange={(e) => setSosHours(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono-numbers"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Field Situation Notes
                </label>
                <textarea
                  rows={2}
                  value={sosNotes}
                  onChange={(e) => setSosNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isGeneratingSOS}
                className="w-full py-3 px-4 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isGeneratingSOS ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                    <span>Formulating Emergency Campaign...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-stone-900" />
                    <span>Generate Emergency Rescue Campaign</span>
                  </>
                )}
              </button>
            </form>

            <div className="lg:col-span-7">
              {generatedPlan ? (
                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div>
                      <span className="text-xs uppercase font-bold text-emerald-400">
                        Emergency Plan Formulated
                      </span>
                      <h4 className="text-lg font-bold font-display text-white mt-0.5">
                        {generatedPlan.rescueCampaignTitle}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-stone-400">Farmer Salvage Recovery</div>
                      <div className="text-xl font-bold font-mono-numbers text-amber-300">
                        ${generatedPlan.farmerRecoveryRevenue.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                      <div className="text-[10px] text-stone-400 uppercase">Direct Rescue Price</div>
                      <div className="text-base font-bold font-mono-numbers text-emerald-400">
                        ${generatedPlan.discountRescuePricePerLb.toFixed(2)}/lb
                      </div>
                    </div>
                    <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                      <div className="text-[10px] text-stone-400 uppercase">CO2e Avoided</div>
                      <div className="text-base font-bold font-mono-numbers text-amber-300">
                        {generatedPlan.co2eAvoidedLbs} lbs
                      </div>
                    </div>
                    <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                      <div className="text-[10px] text-stone-400 uppercase">Water Preserved</div>
                      <div className="text-base font-bold font-mono-numbers text-white">
                        {generatedPlan.waterSavedGallons.toLocaleString()} gal
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-300 space-y-2">
                    <div className="text-amber-300 font-semibold uppercase tracking-wider text-[11px]">
                      Community Rescue Broadcast Pitch:
                    </div>
                    <p className="italic text-stone-200 text-[11px] leading-relaxed">
                      &ldquo;{generatedPlan.communityCallToAction}&rdquo;
                    </p>
                    <p className="text-[11px] text-stone-400 pt-1">
                      <strong>Kitchen Tip: </strong>{generatedPlan.consumerCulinaryUseTip}
                    </p>
                  </div>

                  <div className="text-[11px] text-stone-400 p-3 bg-emerald-950/40 rounded-xl border border-emerald-900/60 space-y-1">
                    <div className="text-emerald-300 font-semibold">Cold Logistics Dispatch Protocol:</div>
                    <div>• Van Window: {generatedPlan.emergencyLogisticsPlan.coldVanDispatchWindow}</div>
                    <div>• Drop Hubs: {generatedPlan.emergencyLogisticsPlan.dropHubMobilization}</div>
                    <div>• Packing: {generatedPlan.emergencyLogisticsPlan.packagingShortCut}</div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-stone-900/40 rounded-2xl border border-dashed border-stone-800">
                  <CloudLightning className="w-10 h-10 text-stone-600 mb-3" />
                  <h4 className="text-base font-bold text-stone-300 font-display">
                    Ready for Weather Emergency SOS
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mt-1">
                    Enter your imminent weather hazard or distributor cull notice on the left to immediately construct an actionable community pre-sale campaign.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
