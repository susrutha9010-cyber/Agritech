import React, { useState } from 'react';
import { Users, Clock, ShieldCheck, Sparkles, Loader2, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

interface LaborOptimizationResult {
  laborHoursSaved: number;
  laborProductivityBoostPercent: number;
  projectedRevenueSaved: number;
  fieldCrateProtocol: {
    title: string;
    description: string;
    hoursSaved: number;
    laborReductionExplanation: string;
  };
  communityHarvestGuildPlan: {
    title: string;
    membersNeeded: number;
    recommendedCompensation: string;
    volunteerHarvestWindow: string;
  };
  neighborhoodDropAdvantage: string;
  recommendedEmergencyAction: string;
}

interface HarvestGuildEvent {
  id: string;
  farmName: string;
  crop: string;
  dateStr: string;
  timeWindow: string;
  slotsTotal: number;
  slotsPledged: number;
  compensation: string;
  location: string;
}

const INITIAL_GUILD_EVENTS: HarvestGuildEvent[] = [
  {
    id: 'guild-oakhaven-tomatoes',
    farmName: 'Oakhaven Heritage Farm',
    crop: 'Heirloom Vine Tomatoes',
    dateStr: 'This Saturday Morning',
    timeWindow: '7:30 AM – 10:00 AM (2.5 hrs)',
    slotsTotal: 15,
    slotsPledged: 11,
    compensation: '10 lb Heirloom Crate ($34 value) + Farmhouse Breakfast',
    location: 'Oak Creek Valley (28 miles from city center)',
  },
  {
    id: 'guild-sunridge-berries',
    farmName: 'Sunridge Agroecological Collective',
    crop: 'Autumn Raspberries & Chard',
    dateStr: 'This Sunday Morning',
    timeWindow: '8:00 AM – 10:30 AM (2.5 hrs)',
    slotsTotal: 12,
    slotsPledged: 9,
    compensation: '4 flats of berries + Fresh Sourdough & Honey',
    location: 'Willamette River Valley (22 miles)',
  },
  {
    id: 'guild-cedar-apples',
    farmName: 'Cedar Grove Biodynamic Fields',
    crop: 'Honeycrisp & Orchard Pears',
    dateStr: 'Next Saturday Morning',
    timeWindow: '8:00 AM – 11:00 AM (3 hrs)',
    slotsTotal: 20,
    slotsPledged: 14,
    compensation: '18 lb Cider & Pie Apple Peck + Fresh Pressed Cider Jug',
    location: 'Columbia Foothills (34 miles)',
  },
];

export const LaborMitigationSuite: React.FC = () => {
  const [cropName, setCropName] = useState('Heirloom Vine Tomatoes');
  const [fieldVolumeLbs, setFieldVolumeLbs] = useState(800);
  const [workersAvailable, setWorkersAvailable] = useState(2);
  const [workerDeficit, setWorkerDeficit] = useState(3);
  const [urgencyDays, setUrgencyDays] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const [laborResult, setLaborResult] = useState<LaborOptimizationResult | null>({
    laborHoursSaved: 38,
    laborProductivityBoostPercent: 65,
    projectedRevenueSaved: 2280,
    fieldCrateProtocol: {
      title: "Direct-to-Crate 'Unwashed Living Produce' Protocol",
      description: "Clip directly into 12 lb recyclable wooden field crates. Bypasses the water dump tank, sorting conveyer, and individual clamshell packaging—reducing packhouse labor by 70%.",
      hoursSaved: 24,
      laborReductionExplanation: "Consumers love unwashed, field-fresh produce that retains its natural protective bloom and stays crisp twice as long in home crispers."
    },
    communityHarvestGuildPlan: {
      title: "Saturday Morning Community Harvest Guild",
      membersNeeded: 12,
      recommendedCompensation: "10 lb free harvest crate ($32 value) + farm morning coffee & pastries",
      volunteerHarvestWindow: "Saturday 7:30 AM – 10:00 AM (2.5 hours)"
    },
    neighborhoodDropAdvantage: "Replaces 8 hours of standing at a farmers market booth in the heat with a single 10-minute refrigerated electric van loading at your farm gate.",
    recommendedEmergencyAction: "Publish a 'Labor-Saver Bulk Harvest' batch on HarvestBridge today in 12 lb crates at a $3/crate incentive discount to pre-sell the entire lot before weekend harvest."
  });

  const [guildEvents, setGuildEvents] = useState<HarvestGuildEvent[]>(INITIAL_GUILD_EVENTS);
  const [joinedGuildId, setJoinedGuildId] = useState<string | null>(null);

  const handleRunLaborOptimizer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/labor-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName,
          fieldVolumeLbs: Number(fieldVolumeLbs),
          workersAvailable: Number(workersAvailable),
          workerDeficit: Number(workerDeficit),
          urgencyDays: Number(urgencyDays),
        }),
      });

      const res = await response.json();
      if (res.data) {
        setLaborResult(res.data);
      }
    } catch (err) {
      console.error('Error optimizing labor:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGuild = (id: string) => {
    fetch(`/api/guilds/${id}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch((err) => console.log('Offline guild join:', err));

    setGuildEvents((prev) =>
      prev.map((g) => {
        if (g.id === id && g.slotsPledged < g.slotsTotal) {
          return { ...g, slotsPledged: g.slotsPledged + 1 };
        }
        return g;
      })
    );
    setJoinedGuildId(id);
    setTimeout(() => setJoinedGuildId(null), 3500);
  };

  return (
    <section id="labor-mitigation" className="py-16 sm:py-24 bg-[#F8F6F0] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            The Operational Breakthrough
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight mb-4 [text-wrap:balance]">
            Direct Market Access While Mitigating Farm Labor Shortages
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            The traditional fear for farmers leaving wholesale brokers is labor: individual retail packing, washing lines, and losing entire weekends to farmers market stalls. HarvestBridge eliminates this bottleneck through three operational innovations.
          </p>
        </div>

        {/* 3 Pillars of Labor Mitigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-display font-bold text-base mb-4">
                01
              </div>
              <h3 className="text-lg font-bold font-display text-stone-900 mb-2">
                Field-Crate Packing (Unwashed Living Produce)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Produce is clipped straight from the vine into 10–15 lb ventilated wood crates. Eliminates sorting tables, wash conveyors, and individual 1 lb plastic clamshells—<strong>cutting packing-shed labor by up to 70%</strong>.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
              ✓ Saves 18–24 hours of farm labor per ton
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-display font-bold text-base mb-4">
                02
              </div>
              <h3 className="text-lg font-bold font-display text-stone-900 mb-2">
                Zero-Staff Neighborhood Drop Hubs
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Growers don&apos;t spend 8 hours staffing a market booth. Our local electric cold-van picks up bulk pre-ordered pallets at your gate; volunteer neighborhood captains coordinate customer pick-ups at urban hubs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-semibold text-amber-900">
              ✓ Eliminates retail booth staffing entirely
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-display font-bold text-base mb-4">
                03
              </div>
              <h3 className="text-lg font-bold font-display text-stone-900 mb-2">
                Community Harvest Guilds &amp; U-Pick Surges
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                When crops ripen faster than field hands can pick, HarvestBridge dispatches vetted neighborhood consumers for Saturday morning harvest exchanges, trading 2.5 hours of labor for fresh produce crates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
              ✓ Prevents field-rot &amp; crop abandonment
            </div>
          </div>
        </div>

        {/* Interactive AI Harvest Labor Shortage Optimizer */}
        <div className="bg-stone-900 text-stone-100 rounded-3xl border border-stone-800 p-6 sm:p-10 mb-16 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-800 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-300 uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Harvest Labor Shortage &amp; Rescue Optimizer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Input Your Current Field Labor Deficit
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
                Down on crew members while 500+ lbs of crop are ripening? Run the model to get a labor-mitigated direct distribution strategy.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 bg-stone-800/80 px-3.5 py-2 rounded-xl border border-stone-700 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-stone-300">Empowering Independent Growers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Controls */}
            <form onSubmit={handleRunLaborOptimizer} className="lg:col-span-5 space-y-4 bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Crop Name Ripening in Field
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
                    Ripening Volume (lbs)
                  </label>
                  <input
                    type="number"
                    value={fieldVolumeLbs}
                    onChange={(e) => setFieldVolumeLbs(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Days Before Spoilage
                  </label>
                  <input
                    type="number"
                    value={urgencyDays}
                    onChange={(e) => setUrgencyDays(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono-numbers"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Workers Available
                  </label>
                  <input
                    type="number"
                    value={workersAvailable}
                    onChange={(e) => setWorkersAvailable(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1 text-amber-300">
                    Crew Deficit (Short by)
                  </label>
                  <input
                    type="number"
                    value={workerDeficit}
                    onChange={(e) => setWorkerDeficit(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-amber-600/60 rounded-lg text-amber-200 focus:outline-none focus:border-amber-400 font-mono-numbers"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-semibold text-stone-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                    <span>Modeling Labor-Mitigated Strategy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-stone-900" />
                    <span>Generate Labor-Mitigation Plan</span>
                  </>
                )}
              </button>
            </form>

            {/* Results Display */}
            {laborResult && (
              <div className="lg:col-span-7 bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-5">
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                    <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                      Packhouse Labor Saved
                    </div>
                    <div className="text-xl font-bold font-mono-numbers text-emerald-400 mt-0.5">
                      {laborResult.laborHoursSaved} hrs
                    </div>
                  </div>

                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                    <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                      Productivity Boost
                    </div>
                    <div className="text-xl font-bold font-mono-numbers text-amber-300 mt-0.5">
                      +{laborResult.laborProductivityBoostPercent}%
                    </div>
                  </div>

                  <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                    <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                      Crop Value Preserved
                    </div>
                    <div className="text-xl font-bold font-mono-numbers text-white mt-0.5">
                      ${laborResult.projectedRevenueSaved}
                    </div>
                  </div>
                </div>

                {/* Field-Crate Direct Protocol */}
                <div className="p-4 bg-stone-900/90 rounded-xl border border-stone-800 text-xs">
                  <div className="flex items-center justify-between text-amber-300 font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{laborResult.fieldCrateProtocol.title}</span>
                    </span>
                    <span className="font-mono-numbers text-emerald-400 text-[11px]">
                      Saves {laborResult.fieldCrateProtocol.hoursSaved} pack hours
                    </span>
                  </div>
                  <p className="text-stone-300 leading-relaxed text-[11px] mb-2">
                    {laborResult.fieldCrateProtocol.description}
                  </p>
                  <p className="text-stone-400 text-[10px] italic">
                    Reasoning: {laborResult.fieldCrateProtocol.laborReductionExplanation}
                  </p>
                </div>

                {/* Community Guild Plan */}
                <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-900/60 text-xs">
                  <div className="flex items-center justify-between text-white font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-emerald-300">
                      <Users className="w-3.5 h-3.5" />
                      <span>{laborResult.communityHarvestGuildPlan.title}</span>
                    </span>
                    <span className="text-[11px] text-amber-300 font-mono-numbers">
                      {laborResult.communityHarvestGuildPlan.membersNeeded} harvesters needed
                    </span>
                  </div>
                  <p className="text-stone-300 text-[11px]">
                    <strong>Window: </strong>{laborResult.communityHarvestGuildPlan.volunteerHarvestWindow}
                  </p>
                  <p className="text-stone-300 text-[11px] mt-1">
                    <strong>Exchange: </strong>{laborResult.communityHarvestGuildPlan.recommendedCompensation}
                  </p>
                </div>

                {/* Neighborhood Drop Advantage */}
                <div className="text-[11px] text-stone-400 flex items-start gap-2 bg-stone-900/40 p-3 rounded-lg border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-stone-200">Logistics Efficiency: </strong>
                    {laborResult.neighborhoodDropAdvantage}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Community Harvest Guild Dispatch Board */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block mb-1">
                Active Community Labor Exchange
              </span>
              <h3 className="text-2xl font-bold font-display text-stone-900">
                Community Harvest Guilds: Help Pick, Earn Pure Food
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono-numbers">
              3 active farm harvest guilds seeking hands this weekend
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guildEvents.map((event) => {
              const isFull = event.slotsPledged >= event.slotsTotal;

              return (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <span className="font-semibold text-emerald-800">{event.farmName}</span>
                      <span className="font-mono-numbers">{event.dateStr}</span>
                    </div>

                    <h4 className="text-base font-bold font-display text-stone-900 mb-2">
                      {event.crop} Harvest Exchange
                    </h4>

                    <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{event.timeWindow}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Users className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>{event.compensation}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] font-mono-numbers text-stone-500 mb-1">
                        <span>Harvest Slots Reserved</span>
                        <span className="font-bold text-stone-800">
                          {event.slotsPledged} / {event.slotsTotal}
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                        <div
                          className="bg-emerald-700 h-2 rounded-full transition-all"
                          style={{
                            width: `${(event.slotsPledged / event.slotsTotal) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100">
                    {isFull ? (
                      <div className="py-2 text-center text-xs text-stone-400 font-semibold bg-stone-50 rounded-lg">
                        All Harvest Hands Filled
                      </div>
                    ) : (
                      <button
                        onClick={() => handleJoinGuild(event.id)}
                        className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Pledge 2.5 Hours &amp; Join Guild</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {joinedGuildId === event.id && (
                      <div className="mt-2 text-center text-xs text-emerald-800 font-medium">
                        ✓ Harvest pass reserved! Farm address sent to your email.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
