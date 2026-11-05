import React, { useState } from 'react';
import { MessageSquare, Send, PhoneCall, ShieldAlert, Sparkles, Loader2, CheckCircle2, Copy, Check } from 'lucide-react';

interface FarmerDoubtResponse {
  smsResponse: string;
  category: string;
  legalOrPolicyFact: string;
  immediateActionStep: string;
  liaisonName: string;
  liaisonPhone: string;
}

const PRESET_DOUBTS = [
  {
    title: 'Broker Blacklist Threat',
    text: 'What if my commercial distributor or packing broker threatens to blacklist me if I start selling direct on HarvestBridge?',
  },
  {
    title: 'Refrigerated Transport',
    text: 'Do I need my own refrigerated van, or does the HarvestBridge cold-van pick up directly at my farm packing shed?',
  },
  {
    title: 'Payment Lag & Escrow',
    text: 'Commercial brokers take 60-90 days to pay and often deduct hidden packaging/grading fees. How fast does HarvestBridge pay?',
  },
  {
    title: 'Crop Loss & Weather Risk',
    text: 'What happens if hail or unseasonal rain damages 30% of my harvest batch after community members have already pledged orders?',
  },
];

export const FarmerDoubtHotline: React.FC = () => {
  const [question, setQuestion] = useState(
    'What if my commercial distributor or packing broker threatens to blacklist me if I start selling direct on HarvestBridge?'
  );
  const [farmerPhone, setFarmerPhone] = useState('');
  const [cropContext, setCropContext] = useState('Heirloom Vegetables & Berries');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [smsSentNotice, setSmsSentNotice] = useState(false);

  const [doubtResult, setDoubtResult] = useState<FarmerDoubtResponse>({
    smsResponse:
      'Hi from HarvestBridge! You are 100% legally protected to sell surplus and harvest batches direct to consumers. Under federal agricultural fair-trade and PACA guidelines, brokers cannot legally lock your harvest without binding minimum volume advance payments. Our refrigerated electric van picks up directly at your farm gate, and payment is deposited into your bank the moment crates are loaded. You retain full ownership of your crops.',
    category: 'Contract & Broker Threat',
    legalOrPolicyFact:
      'Per USDA Agricultural Marketing Service guidelines, growers own their produce until delivery acceptance. Brokers cannot enforce exclusivity without guaranteed purchase contracts.',
    immediateActionStep:
      "Start with a 20% test batch on this Friday's neighborhood drop—no need to cut off your existing channels until you see the 3x revenue difference.",
    liaisonName: 'Elena Vance (Grower Advocacy Lead)',
    liaisonPhone: '(503) 892-FARM',
  });

  const handleSubmitDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setSmsSentNotice(false);

    try {
      const response = await fetch('/api/farmer-doubt-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          farmerPhone,
          cropContext,
        }),
      });

      const res = await response.json();
      if (res.data) {
        setDoubtResult(res.data);
        if (farmerPhone.trim()) {
          setSmsSentNotice(true);
        }
      }
    } catch (err) {
      console.error('Error raising doubt:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySMS = () => {
    if (doubtResult?.smsResponse) {
      navigator.clipboard.writeText(doubtResult.smsResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="farmer-hotline" className="py-16 sm:py-20 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-300 uppercase mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Grower Doubts & Direct SMS Helpdesk Hotline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight [text-wrap:balance]">
              Have Doubts About Leaving the Middlemen? Text Us Directly.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Transitioning away from conventional brokers can feel daunting. Ask any question regarding exclusivity contracts, payment security, refrigerated farm-gate pickups, or crop insurance.
            </p>
          </div>

          {/* Hotline Quick Call/SMS Pill Badge Replacement (Clean unboxed lockup) */}
          <div className="bg-stone-800/90 p-4 rounded-xl border border-stone-700/80 flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-300">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">
                Toll-Free Farmer SMS Hotline
              </div>
              <div className="text-base font-bold font-mono-numbers text-amber-300">
                Text &ldquo;DOUBT&rdquo; to (503) 892-FARM
              </div>
              <div className="text-[11px] text-stone-400">
                Available 24/7 · Direct response from farmer liaisons
              </div>
            </div>
          </div>
        </div>

        {/* Preset Doubts Tabs */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-3">
            Common Grower Doubts (Click to Test Instant Clarification):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_DOUBTS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuestion(preset.text);
                }}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  question === preset.text
                    ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-xs'
                    : 'bg-stone-800/60 border-stone-700/70 text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-amber-300 mb-1">{preset.title}</div>
                <div className="line-clamp-2 text-stone-400 text-[11px]">{preset.text}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Split: Input Form + Live SMS Thread Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inquiry / Doubt Submission Form */}
          <div className="lg:col-span-6 bg-stone-800/70 p-6 sm:p-7 rounded-2xl border border-stone-700/80">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Raise Your Question or Broker Dispute</span>
            </h3>

            <form onSubmit={handleSubmitDoubt} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  What is holding your farm back? (Describe your doubt or broker clause)
                </label>
                <textarea
                  rows={4}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. My distributor says if I sell at the local drop hub, they won't buy my remaining 50 bins of apples. Is that legal?"
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Your Crop / Acreage Context
                  </label>
                  <input
                    type="text"
                    value={cropContext}
                    onChange={(e) => setCropContext(e.target.value)}
                    placeholder="e.g. 20 acres sweet corn & berries"
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Your Phone (for Real SMS Text Reply)
                  </label>
                  <input
                    type="tel"
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value)}
                    placeholder="e.g. (503) 555-0142"
                    className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-mono-numbers"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                    <span>Consulting Agricultural Policy & Logistics...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-stone-900" />
                    <span>Send Doubt & Generate Immediate Guidance</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-2">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  100% confidential. We never disclose grower inquiries to regional distributors or supermarket buyers.
                </span>
              </div>
            </form>
          </div>

          {/* Right Column: Live SMS Text Message Thread Simulation */}
          <div className="lg:col-span-6 bg-stone-950 p-6 sm:p-7 rounded-2xl border border-stone-800 shadow-xl flex flex-col justify-between min-h-[420px]">
            <div>
              {/* Phone Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="font-semibold text-white">HarvestBridge Grower Hotline</span>
                  <span className="text-stone-500">·</span>
                  <span className="text-stone-400 font-mono-numbers">(503) 892-FARM</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono-numbers">
                  Verified Farmer Liaison
                </div>
              </div>

              {/* Message Thread */}
              <div className="space-y-4 mb-6">
                {/* Outgoing Farmer Message (Right/Green) */}
                <div className="flex flex-col items-end">
                  <div className="max-w-[85%] bg-stone-800 text-stone-200 text-xs p-3.5 rounded-2xl rounded-tr-xs border border-stone-700 leading-relaxed">
                    {question}
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1 font-mono-numbers">
                    Sent from farm gate · Today
                  </span>
                </div>

                {/* Inbound Answer from HarvestBridge Advisor (Left/Amber) */}
                <div className="flex flex-col items-start">
                  <div className="max-w-[90%] bg-emerald-950/80 text-emerald-100 text-xs p-4 rounded-2xl rounded-tl-xs border border-emerald-700/60 leading-relaxed shadow-sm">
                    <p className="mb-3 text-stone-100 font-medium">
                      {doubtResult.smsResponse}
                    </p>

                    <div className="pt-2 border-t border-emerald-800/60 space-y-1.5 text-[11px]">
                      <div className="text-emerald-300">
                        <strong className="text-amber-300">Legal Protection: </strong>
                        {doubtResult.legalOrPolicyFact}
                      </div>
                      <div className="text-emerald-200">
                        <strong className="text-white">Recommended Step: </strong>
                        {doubtResult.immediateActionStep}
                      </div>
                      <div className="text-stone-400 font-mono-numbers pt-1">
                        Direct Liaison: {doubtResult.liaisonName} · {doubtResult.liaisonPhone}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1 font-mono-numbers">
                    Delivered via HarvestBridge Secure SMS Gateway
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions for SMS Output */}
            <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopySMS}
                className="px-3.5 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-900 border border-stone-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied SMS Advice</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text Message</span>
                  </>
                )}
              </button>

              <a
                href="tel:5038923276"
                className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Grower Liaison Directly</span>
              </a>
            </div>

            {smsSentNotice && (
              <div className="mt-3 p-2.5 bg-emerald-950 text-emerald-300 text-xs rounded-lg border border-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>SMS notification dispatched to {farmerPhone}. Check your mobile phone.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
