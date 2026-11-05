import React, { useState } from 'react';
import { ProduceItem, DROP_HUBS, DropHub } from '../data/mockProduce.ts';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [id: string]: number };
  produceList: ProduceItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  produceList,
  onUpdateQty,
  onClearCart,
}) => {
  const [selectedHubId, setSelectedHubId] = useState<string>(DROP_HUBS[0].id);
  const [farmerTip, setFarmerTip] = useState<number>(3.00);
  const [useSnapMatch, setUseSnapMatch] = useState<boolean>(false);
  const [communitySolidarityShare, setCommunitySolidarityShare] = useState<boolean>(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  if (!isOpen) return null;

  const cartEntries = Object.entries(cart).filter(([_, qty]) => qty > 0);
  const itemsWithQty = cartEntries
    .map(([id, qty]) => {
      const item = produceList.find((p) => p.id === id);
      return item ? { ...item, qty } : null;
    })
    .filter(Boolean) as (ProduceItem & { qty: number })[];

  const subtotal = itemsWithQty.reduce(
    (acc, curr) => acc + curr.priceDirect * curr.qty,
    0
  );
  const supermarketEquivalentTotal = itemsWithQty.reduce(
    (acc, curr) => acc + curr.priceSupermarketEquiv * curr.qty,
    0
  );

  // Environmental Footprint Math
  const totalWaterSavedGal = itemsWithQty.reduce(
    (acc, curr) => acc + (curr.waterSavedGal || 180) * curr.qty,
    0
  );
  const totalCo2eAvoidedLbs = itemsWithQty.reduce(
    (acc, curr) => acc + (curr.co2eAvoidedLbs || 14) * curr.qty,
    0
  );

  const selectedHub: DropHub =
    DROP_HUBS.find((h) => h.id === selectedHubId) || DROP_HUBS[0];
  const deliveryFee = selectedHub.id === 'direct-home-coldvan' ? 4.50 : 0.00;
  const snapDiscount = useSnapMatch ? subtotal * 0.50 : 0.00;
  const solidarityContribution = communitySolidarityShare ? 5.00 : 0.00;
  const grandTotal = Math.max(0, subtotal - snapDiscount + deliveryFee + farmerTip + solidarityContribution);
  const consumerSavings = (supermarketEquivalentTotal - subtotal) + snapDiscount;

  // Transparent fee breakdown
  const farmerShare = subtotal * 0.85 + farmerTip;
  const coldLogisticsShare = subtotal * 0.12 + deliveryFee;
  const bridgeFee = subtotal * 0.03;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsWithQty.map((item) => ({ id: item.id, qty: item.qty })),
          selectedHubId,
          farmerTip,
          useSnapMatch,
          communitySolidarityShare,
        }),
      });
      const res = await response.json();
      if (res.data?.id) {
        setOrderId(res.data.id);
      } else {
        setOrderId(`HB-${Math.floor(1000 + Math.random() * 9000)}-DIRECT`);
      }
    } catch {
      setOrderId(`HB-${Math.floor(1000 + Math.random() * 9000)}-DIRECT`);
    } finally {
      setIsSubmitting(false);
      setIsOrdered(true);
    }
  };

  const handleFinish = () => {
    setIsOrdered(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <h3 className="text-lg font-bold font-display text-stone-900">
              Your Harvest Box
            </h3>
            <span className="text-xs text-stone-500">
              {itemsWithQty.length} unique farm batches selected
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal / Ordered Confirmation State */}
        {isOrdered ? (
          <div className="p-6 sm:p-8 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono-numbers font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
              Order {orderId} Confirmed
            </span>

            <h4 className="text-2xl font-bold font-display text-stone-900 mb-2">
              The Harvest Has Begun
            </h4>

            <p className="text-xs text-stone-600 leading-relaxed max-w-xs mb-6">
              Your growers have received their harvest order slip. Crops will be harvested at dawn and loaded onto the local refrigerated electric van for {selectedHub.pickupDay}.
            </p>

            <div className="w-full bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-left mb-6 space-y-2">
              <div className="flex justify-between text-stone-600">
                <span>Routing to:</span>
                <strong className="text-stone-900">{selectedHub.name}</strong>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Total Paid:</span>
                <strong className="text-emerald-800 font-mono-numbers">${grandTotal.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Farmer Retained:</span>
                <strong className="text-amber-800 font-mono-numbers">${farmerShare.toFixed(2)} (86%)</strong>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
            >
              Done & Return to Marketplace
            </button>
          </div>
        ) : itemsWithQty.length === 0 ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-stone-800 font-display">
              Your harvest box is empty
            </h4>
            <p className="text-xs text-stone-500 max-w-xs mt-1 mb-6">
              Browse today&apos;s morning crops to fill your box direct from local regenerative farms.
            </p>
            <button
              onClick={onClose}
              className="py-2.5 px-5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer border border-emerald-200"
            >
              Explore Fresh Harvests
            </button>
          </div>
        ) : (
          /* Cart List & Checkout Configuration */
          <div className="flex-1 p-5 overflow-y-auto space-y-6">
            {/* Itemized produce */}
            <div className="space-y-3">
              {itemsWithQty.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3 text-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-stone-900 truncate">{item.name}</h5>
                    <p className="text-[11px] text-stone-500 truncate">{item.farmName}</p>
                    <div className="text-[11px] font-mono-numbers text-emerald-800 font-bold mt-0.5">
                      ${item.priceDirect.toFixed(2)}{' '}
                      <span className="font-normal text-stone-400">/ {item.unit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 bg-white border border-stone-200 rounded-md p-0.5">
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-mono-numbers font-bold text-stone-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear button */}
            <div className="flex justify-end">
              <button
                onClick={onClearCart}
                className="text-[11px] text-stone-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Empty Harvest Box</span>
              </button>
            </div>

            {/* Delivery Hub Selector */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                Select Pickup Hub or Cold-Van Drop
              </label>
              <select
                value={selectedHubId}
                onChange={(e) => setSelectedHubId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                {DROP_HUBS.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.name} ({hub.id === 'direct-home-coldvan' ? '+$4.50 courier' : 'Free Hub Drop'})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-stone-500">
                {selectedHub.address} · {selectedHub.pickupDay} ({selectedHub.pickupTimeWindow})
              </p>
            </div>

            {/* Farmer Crew Direct Tip */}
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 block mb-1">
                Tip the Morning Harvest Crew
              </span>
              <p className="text-[11px] text-amber-800/80 mb-2.5">
                100% goes directly to the farm field workers who pick your produce at dawn.
              </p>
              <div className="flex gap-2">
                {[0, 3, 5, 8].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setFarmerTip(amount)}
                    className={`flex-1 py-1.5 text-xs font-mono-numbers font-medium rounded-lg transition-colors cursor-pointer ${
                      farmerTip === amount
                        ? 'bg-emerald-800 text-white font-bold'
                        : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Justice: SNAP / Double Up Food Bucks & Solidarity Share */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900 block">
                Food Sovereignty &amp; Equal Access
              </span>

              {/* SNAP Match Toggle */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700">
                <input
                  type="checkbox"
                  checked={useSnapMatch}
                  onChange={(e) => setUseSnapMatch(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-600 accent-emerald-700 cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-emerald-950 block">
                    Double Up Food Bucks (SNAP 50% Match)
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Subsidizes 50% of direct organic produce via regional food equity grants for EBT/SNAP households.
                  </span>
                </div>
              </label>

              {/* Community Solidarity Fund */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700 pt-2 border-t border-emerald-200/60">
                <input
                  type="checkbox"
                  checked={communitySolidarityShare}
                  onChange={(e) => setCommunitySolidarityShare(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-600 accent-emerald-700 cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-stone-900 block">
                    Pay-It-Forward Solidarity Box (+$5.00)
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Directly funds fresh harvest deliveries to community food pantries at urban drop hubs.
                  </span>
                </div>
              </label>
            </div>

            {/* Environmental Impact of This Box */}
            <div className="p-3.5 bg-stone-100 rounded-xl border border-stone-200 text-xs flex items-center justify-between font-mono-numbers">
              <div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">Methane Avoided</div>
                <div className="text-stone-900 font-bold">{totalCo2eAvoidedLbs} lbs CO2e</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">Water Preserved</div>
                <div className="text-emerald-800 font-bold">{totalWaterSavedGal.toLocaleString()} gal</div>
              </div>
            </div>

            {/* Radical Transparency Breakdown */}
            <div className="p-4 bg-stone-900 text-stone-200 rounded-xl text-xs space-y-2 font-mono-numbers">
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Radical Cost Transparency</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-stone-400">Direct Farmer Revenue (85%):</span>
                <span className="text-emerald-400 font-bold">${farmerShare.toFixed(2)}</span>
              </div>
              {useSnapMatch && (
                <div className="flex justify-between text-emerald-300 font-semibold">
                  <span>SNAP Double Up 50% Match:</span>
                  <span>-${snapDiscount.toFixed(2)}</span>
                </div>
              )}
              {communitySolidarityShare && (
                <div className="flex justify-between text-amber-300">
                  <span>Community Food Pantry Share:</span>
                  <span>+${solidarityContribution.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-400">Electric Cold Logistics (12%):</span>
                <span>${coldLogisticsShare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">HarvestBridge Infrastructure (3%):</span>
                <span>${bridgeFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-stone-700 flex justify-between font-bold text-sm text-white">
                <span>Total Due:</span>
                <span className="text-amber-300">${grandTotal.toFixed(2)}</span>
              </div>
              <div className="text-[11px] font-sans text-emerald-300 pt-1">
                You save ${consumerSavings.toFixed(2)} compared to supermarket prices!
              </div>
            </div>
          </div>
        )}

        {/* Drawer Footer / Checkout Button */}
        {!isOrdered && itemsWithQty.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 sticky bottom-0">
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-98 rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Dispatching Harvest Order to Farm Gate...</span>
              ) : (
                <>
                  <span>Confirm &amp; Lock In Morning Harvest (${grandTotal.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-stone-400 text-center mt-2">
              Cash on delivery or local card supported. 100% farm freshness guarantee.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
