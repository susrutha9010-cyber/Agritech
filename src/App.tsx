import { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { MiddlemenCalculator } from './components/MiddlemenCalculator.tsx';
import { ZeroCullRescueSection } from './components/ZeroCullRescueSection.tsx';
import { ClimateEmergencyRescue } from './components/ClimateEmergencyRescue.tsx';
import { Marketplace } from './components/Marketplace.tsx';
import { NutrientTraceabilityExplorer } from './components/NutrientTraceabilityExplorer.tsx';
import { FarmerListingStudio } from './components/FarmerListingStudio.tsx';
import { FarmerDoubtHotline } from './components/FarmerDoubtHotline.tsx';
import { LaborMitigationSuite } from './components/LaborMitigationSuite.tsx';
import { DropHubs } from './components/DropHubs.tsx';
import { GrowerStorySection } from './components/GrowerStorySection.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { ProduceDetailModal } from './components/ProduceDetailModal.tsx';
import { Footer } from './components/Footer.tsx';
import { INITIAL_PRODUCE, ProduceItem } from './data/mockProduce.ts';

export default function App() {
  const [produceList, setProduceList] = useState<ProduceItem[]>(INITIAL_PRODUCE);
  const [cart, setCart] = useState<{ [id: string]: number }>({
    'csa-weekly-box': 1,
    'cosmetic-seconds-heirlooms': 1,
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduce, setSelectedProduce] = useState<ProduceItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('marketplace');

  // Load authoritative produce batches from backend API on mount
  useEffect(() => {
    fetch('/api/produce')
      .then((res) => res.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setProduceList(json.data);
        }
      })
      .catch((err) => console.log('Serving fallback harvest data:', err));
  }, []);

  // Cart math
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = produceList.find((p) => p.id === id);
    return total + (item ? item.priceDirect * qty : 0);
  }, 0);

  const handleAddToCart = (item: ProduceItem) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const handleUpdateQty = (itemId: string, newQty: number) => {
    setCart((prev) => {
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const handlePublishNewBatch = (newItem: ProduceItem) => {
    setProduceList((prev) => [newItem, ...prev]);
    handleNavigate('marketplace');
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-950">
      {/* Top Bar with strict 3-zone contract */}
      <TopBar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreHarvests={() => handleNavigate('marketplace')}
          onOpenCalculator={() => handleNavigate('middlemen-trap')}
        />

        {/* The Middlemen Trap Interactive Simulator */}
        <MiddlemenCalculator />

        {/* Real-World Crisis #1: Food Waste & Cosmetic Culls */}
        <ZeroCullRescueSection
          produceList={produceList}
          cart={cart}
          onAddToCart={handleAddToCart}
          onOpenDetails={(item) => setSelectedProduce(item)}
        />

        {/* Real-World Crisis #2: Extreme Weather & Climate Shock Flash Pre-Sale */}
        <ClimateEmergencyRescue
          produceList={produceList}
          onAddToCart={handleAddToCart}
          onOpenDetails={(item) => setSelectedProduce(item)}
        />

        {/* Fresh Harvest Drops (Marketplace) */}
        <Marketplace
          produceList={produceList}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenDetails={(item) => setSelectedProduce(item)}
        />

        {/* Real-World Crisis #3: Living Nutrients vs. 21-Day Warehouse Illusion */}
        <NutrientTraceabilityExplorer />

        {/* Direct Market Access While Mitigating Labor Shortages */}
        <LaborMitigationSuite />

        {/* AI Farmer Listing Studio */}
        <FarmerListingStudio onPublishNewBatch={handlePublishNewBatch} />

        {/* Farmer Doubts & Direct SMS Helpdesk Hotline */}
        <FarmerDoubtHotline />

        {/* Neighborhood Drop Hubs & Routing */}
        <DropHubs onSelectHub={() => setIsCartOpen(true)} />

        {/* Grower Documentary Story & Human Adjacency */}
        <GrowerStorySection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        produceList={produceList}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
      />

      {/* Produce Detail & Inspection Modal */}
      <ProduceDetailModal
        item={selectedProduce}
        onClose={() => setSelectedProduce(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
