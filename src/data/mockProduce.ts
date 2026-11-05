export interface ProduceItem {
  id: string;
  name: string;
  farmName: string;
  farmLocation: string;
  distanceMiles: number;
  category: 'csa-boxes' | 'heirlooms' | 'greens-roots' | 'orchard-berries' | 'pantry' | 'zero-cull' | 'climate-rescue';
  priceDirect: number;
  unit: string;
  priceSupermarketEquiv: number;
  harvestedTimeAgo: string;
  harvestDate: string;
  image: string;
  description: string;
  farmingPractices: string[];
  stockLbs: number;
  farmerBio: string;
  tasteNotes: string;
  // Real-World Problem Solution Fields
  isRescueBatch?: boolean;
  rescueReason?: string;
  brixSugarRating?: number; // e.g. 10.2° Brix
  nutrientRetentionPercent?: number; // e.g. 96%
  waterSavedGal?: number;
  co2eAvoidedLbs?: number;
  snapEligible?: boolean;
}

export interface MiddlemanCropData {
  id: string;
  name: string;
  category: string;
  supermarketRetailPerLb: number;
  conventionalFarmerCutPerLb: number;
  wholesalerCutPerLb: number;
  coldStorageBrokerCutPerLb: number;
  supermarketMarginPerLb: number;
  harvestBridgeFarmerCutPerLb: number;
  harvestBridgeLogisticsPerLb: number;
  harvestBridgeDirectPricePerLb: number;
  conventionalFoodMiles: number;
  bridgeFoodMiles: number;
  conventionalDaysInStorage: number;
  bridgeHoursToDoor: number;
}

export const MIDDLEMAN_CROPS: MiddlemanCropData[] = [
  {
    id: 'tomatoes',
    name: 'Heirloom Vine Tomatoes',
    category: 'Heirloom Fruits',
    supermarketRetailPerLb: 4.80,
    conventionalFarmerCutPerLb: 0.72,
    wholesalerCutPerLb: 1.20,
    coldStorageBrokerCutPerLb: 0.72,
    supermarketMarginPerLb: 2.16,
    harvestBridgeFarmerCutPerLb: 2.85,
    harvestBridgeLogisticsPerLb: 0.55,
    harvestBridgeDirectPricePerLb: 3.40,
    conventionalFoodMiles: 1940,
    bridgeFoodMiles: 24,
    conventionalDaysInStorage: 22,
    bridgeHoursToDoor: 18,
  },
  {
    id: 'strawberries',
    name: 'Coastal Organic Strawberries',
    category: 'Orchard & Berry',
    supermarketRetailPerLb: 5.60,
    conventionalFarmerCutPerLb: 0.84,
    wholesalerCutPerLb: 1.40,
    coldStorageBrokerCutPerLb: 0.96,
    supermarketMarginPerLb: 2.40,
    harvestBridgeFarmerCutPerLb: 3.50,
    harvestBridgeLogisticsPerLb: 0.60,
    harvestBridgeDirectPricePerLb: 4.10,
    conventionalFoodMiles: 2150,
    bridgeFoodMiles: 31,
    conventionalDaysInStorage: 16,
    bridgeHoursToDoor: 14,
  },
  {
    id: 'avocados',
    name: 'Hass Avocados (Tree-Matured)',
    category: 'Orchard & Berry',
    supermarketRetailPerLb: 3.90,
    conventionalFarmerCutPerLb: 0.62,
    wholesalerCutPerLb: 0.98,
    coldStorageBrokerCutPerLb: 0.60,
    supermarketMarginPerLb: 1.70,
    harvestBridgeFarmerCutPerLb: 2.35,
    harvestBridgeLogisticsPerLb: 0.45,
    harvestBridgeDirectPricePerLb: 2.80,
    conventionalFoodMiles: 2400,
    bridgeFoodMiles: 42,
    conventionalDaysInStorage: 28,
    bridgeHoursToDoor: 20,
  },
  {
    id: 'honeycrisp',
    name: 'Honeycrisp Orchard Apples',
    category: 'Orchard & Berry',
    supermarketRetailPerLb: 3.40,
    conventionalFarmerCutPerLb: 0.51,
    wholesalerCutPerLb: 0.85,
    coldStorageBrokerCutPerLb: 0.54,
    supermarketMarginPerLb: 1.50,
    harvestBridgeFarmerCutPerLb: 2.05,
    harvestBridgeLogisticsPerLb: 0.45,
    harvestBridgeDirectPricePerLb: 2.50,
    conventionalFoodMiles: 1620,
    bridgeFoodMiles: 28,
    conventionalDaysInStorage: 180, // Often gassed with 1-MCP for up to 10 months!
    bridgeHoursToDoor: 24,
  },
  {
    id: 'greens',
    name: 'Rainbow Chard & Crisp Butterhead',
    category: 'Artisan Greens',
    supermarketRetailPerLb: 3.80,
    conventionalFarmerCutPerLb: 0.57,
    wholesalerCutPerLb: 0.95,
    coldStorageBrokerCutPerLb: 0.68,
    supermarketMarginPerLb: 1.60,
    harvestBridgeFarmerCutPerLb: 2.30,
    harvestBridgeLogisticsPerLb: 0.40,
    harvestBridgeDirectPricePerLb: 2.70,
    conventionalFoodMiles: 1880,
    bridgeFoodMiles: 19,
    conventionalDaysInStorage: 14,
    bridgeHoursToDoor: 12,
  },
  {
    id: 'carrots',
    name: 'Soil-Sweetened Rainbow Carrots',
    category: 'Roots & Earth',
    supermarketRetailPerLb: 3.20,
    conventionalFarmerCutPerLb: 0.48,
    wholesalerCutPerLb: 0.80,
    coldStorageBrokerCutPerLb: 0.52,
    supermarketMarginPerLb: 1.40,
    harvestBridgeFarmerCutPerLb: 1.95,
    harvestBridgeLogisticsPerLb: 0.35,
    harvestBridgeDirectPricePerLb: 2.30,
    conventionalFoodMiles: 1750,
    bridgeFoodMiles: 26,
    conventionalDaysInStorage: 35,
    bridgeHoursToDoor: 16,
  },
];

export const INITIAL_PRODUCE: ProduceItem[] = [
  {
    id: 'csa-weekly-box',
    name: 'Field-to-Door Curated Harvest Box',
    farmName: 'Sunridge Agroecological Collective',
    farmLocation: 'Willamette River Valley',
    distanceMiles: 22,
    category: 'csa-boxes',
    priceDirect: 36.00,
    unit: '14 lb seasonal box',
    priceSupermarketEquiv: 54.00,
    harvestedTimeAgo: 'Harvested 6 hours ago',
    harvestDate: 'Today, 6:15 AM',
    image: '/src/assets/images/produce_weekly_csa_box_1793911681693.jpg',
    description: 'A bountiful weekly assortment of crisp butterhead greens, fresh strawberries, golden carrots, purple radishes, and fresh rosemary sprigs packed in breathable kraft containers.',
    farmingPractices: ['Certified Organic', 'No-Till Living Soil', 'Zero Synthetic Fertilizers'],
    stockLbs: 38,
    farmerBio: 'Elena Vance and her family cultivate 45 acres of regenerative soil, utilizing nitrogen-fixing cover crops and pollinator hedgerows.',
    tasteNotes: 'Unmatched morning crunch, high natural brix sugars, deeply mineralized flavor profile.',
  },
  {
    id: 'heirloom-tomatoes',
    name: 'Sun-Ripened Heirloom Tomato Crate',
    farmName: 'Oakhaven Heritage Orchard & Farm',
    farmLocation: 'Oak Creek Valley',
    distanceMiles: 28,
    category: 'heirlooms',
    priceDirect: 26.50,
    unit: '8 lb vintage crate',
    priceSupermarketEquiv: 41.00,
    harvestedTimeAgo: 'Harvested 4 hours ago',
    harvestDate: 'Today, 7:30 AM',
    image: '/src/assets/images/produce_heirloom_tomatoes_1793911681260.jpg',
    description: 'Cherokee Purple, Green Zebra, and Brandywine heirlooms hand-selected at optimal vine maturity. Never gassed with ethylene; rich in natural lycopene and complex umami acidity.',
    farmingPractices: ['Dry-Farmed', 'Open Pollinated Heirlooms', 'Beneficial Insect Habitat'],
    stockLbs: 24,
    farmerBio: 'Marcus Chen preserves 18 endangered heirloom seed lineages passed down through four generations of valley growers.',
    tasteNotes: 'Intense sweet-tart balance, velvety flesh, intoxicating floral tomato-vine aroma.',
  },
  {
    id: 'harvest-cornucopia',
    name: 'Chef’s Autumn Orchard & Root Medley',
    farmName: 'Cedar Grove Biodynamic Fields',
    farmLocation: 'Columbia Foothills',
    distanceMiles: 34,
    category: 'csa-boxes',
    priceDirect: 42.00,
    unit: '18 lb family pack',
    priceSupermarketEquiv: 65.00,
    harvestedTimeAgo: 'Harvested 8 hours ago',
    harvestDate: 'Today, 5:45 AM',
    image: '/src/assets/images/hero_organic_harvest_1793911680072.jpg',
    description: 'Abundant crate featuring golden acorn squash, rainbow chard, heirloom tomatoes, and soil-sweetened root crops. Designed for families and home cooks who love wholesome, whole-food cooking.',
    farmingPractices: ['Biodynamic Demeter Certified', 'Compost-Fed', 'Zero Neonicotinoids'],
    stockLbs: 19,
    farmerBio: 'The Lindell family operates with closed-loop fertility, cycling on-farm compost and compost tea extracts into vibrant topsoil.',
    tasteNotes: 'Rich, caramelized sweetness when roasted, crisp succulent stems, earthy minerality.',
  },
  {
    id: 'crisp-greens-bundle',
    name: 'Dew-Crisp Salad & Microgreen Guild',
    farmName: 'Riverbend Micro-Farm',
    farmLocation: 'Lower Basin Ridge',
    distanceMiles: 14,
    category: 'greens-roots',
    priceDirect: 18.00,
    unit: '4.5 lb tote',
    priceSupermarketEquiv: 28.50,
    harvestedTimeAgo: 'Harvested 3 hours ago',
    harvestDate: 'Today, 8:15 AM',
    image: '/src/assets/images/produce_weekly_csa_box_1793911681693.jpg',
    description: 'Tender baby romaine, ruby red oakleaf, peppery wild arugula, and sunflower shoots washed in chilled mountain well water.',
    farmingPractices: ['Hydro-Solar Microfarm', 'Zero Pesticides', 'Same-Day Cold Pack'],
    stockLbs: 45,
    farmerBio: 'Sarah & Noah run a compact 4-acre bio-intensive farm that supplies over 120 neighborhood families with daily fresh salads.',
    tasteNotes: 'Ultra-crisp leaf rib, tender buttery tips, peppery nutty finish.',
  },
  {
    id: 'sweet-roots-box',
    name: 'Frost-Kissed Golden Beets & Rainbow Carrots',
    farmName: 'Timberline Root Homestead',
    farmLocation: 'High Meadow Plateau',
    distanceMiles: 39,
    category: 'greens-roots',
    priceDirect: 19.50,
    unit: '7 lb bundle',
    priceSupermarketEquiv: 31.00,
    harvestedTimeAgo: 'Harvested yesterday evening',
    harvestDate: 'Yesterday, 5:30 PM',
    image: '/src/assets/images/hero_organic_harvest_1793911680072.jpg',
    description: 'Cold nights convert root starches into pure natural sugars. Packed unwashed with tops trimmed to seal in vital moisture and natural soil probiotics.',
    farmingPractices: ['Certified Organic', 'Cover-Cropped Soil', 'Hand Dug'],
    stockLbs: 50,
    farmerBio: 'Artisan root specialists farming at 2,400 ft altitude where crisp mountain air yields the sweetest carrots in the Pacific Northwest.',
    tasteNotes: 'Candy-like sweetness, crisp snap, earthy floral perfume.',
    brixSugarRating: 10.4,
    nutrientRetentionPercent: 95,
    waterSavedGal: 220,
    co2eAvoidedLbs: 18,
    snapEligible: true,
  },
  {
    id: 'cosmetic-seconds-heirlooms',
    name: 'Cosmetic Seconds Heirloom Tomatoes (Zero-Cull Salvage)',
    farmName: 'Oakhaven Heritage Orchard & Farm',
    farmLocation: 'Oak Creek Valley',
    distanceMiles: 28,
    category: 'zero-cull',
    priceDirect: 14.50,
    unit: '10 lb chef cull crate',
    priceSupermarketEquiv: 48.00,
    harvestedTimeAgo: 'Harvested 5 hours ago',
    harvestDate: 'Today, 6:45 AM',
    image: '/src/assets/images/produce_heirloom_tomatoes_1793911681260.jpg',
    description: 'Rejected by wholesale packing distributor solely for slight "cat-facing" scars and irregular ribbing. 100% prime organic flesh, extraordinary sweetness, and perfect for sauces, canning, or direct slicing.',
    farmingPractices: ['Dry-Farmed Organic', 'Zero Chemical Wax', 'Zero Landfill Waste'],
    stockLbs: 65,
    farmerBio: 'Marcus Chen: "Wholesalers reject 35% of my heirloom harvest just because they aren’t spherical. It breaks our heart to disc them into the soil. HarvestBridge gives them new life."',
    tasteNotes: 'Deep sun-drenched tomato essence, velvety texture, rich lycopene depth.',
    isRescueBatch: true,
    rescueReason: 'Cosmetic Oddity: Rejected by retail broker for slight surface scarring. 100% gourmet eating quality.',
    brixSugarRating: 8.9,
    nutrientRetentionPercent: 97,
    waterSavedGal: 410,
    co2eAvoidedLbs: 32,
    snapEligible: true,
  },
  {
    id: 'frost-rescue-apples-pears',
    name: 'Frost-Rescue Orchard Honeycrisp & Asian Pears',
    farmName: 'Cedar Grove Biodynamic Fields',
    farmLocation: 'Columbia Foothills',
    distanceMiles: 34,
    category: 'climate-rescue',
    priceDirect: 21.00,
    unit: '14 lb pre-freeze rescue tote',
    priceSupermarketEquiv: 42.50,
    harvestedTimeAgo: 'Urgent harvest underway',
    harvestDate: 'Harvesting now before 26°F freeze',
    image: '/src/assets/images/hero_organic_harvest_1793911680072.jpg',
    description: 'An emergency harvest response: 26°F hard frost warning in 36 hours. Hand-picked at peak tree sweetness right before the freeze to prevent orchard fruit cell bursting.',
    farmingPractices: ['Biodynamic Demeter', 'Zero Synthetic Sprays', 'Emergency Tree Rescue'],
    stockLbs: 88,
    farmerBio: 'The Lindell family is racing against an unseasonal arctic dip to harvest 1,800 lbs of orchard fruit before temperatures plummet.',
    tasteNotes: 'Crisp honeyed sweetness, sparkling juice, floral pear notes.',
    isRescueBatch: true,
    rescueReason: 'Climate Shock: Harvested urgently to prevent freeze-rot from an unexpected frost wave.',
    brixSugarRating: 14.2,
    nutrientRetentionPercent: 98,
    waterSavedGal: 580,
    co2eAvoidedLbs: 45,
    snapEligible: true,
  },
  {
    id: 'crooked-sweet-carrots',
    name: 'Twisted & Forked Rainbow Carrots (Earth Oddities)',
    farmName: 'Timberline Root Homestead',
    farmLocation: 'High Meadow Plateau',
    distanceMiles: 39,
    category: 'zero-cull',
    priceDirect: 12.00,
    unit: '8 lb bulk earthy bag',
    priceSupermarketEquiv: 26.00,
    harvestedTimeAgo: 'Dug this dawn',
    harvestDate: 'Today, 5:30 AM',
    image: '/src/assets/images/farmer_harvest_story_1793911682344.jpg',
    description: 'Grown in rocky organic mountain soil where stones encourage charming twists, spirals, and double-roots. Commercial buyers demand straight uniform carrots—we celebrate nature’s original geometry.',
    farmingPractices: ['Certified Organic', 'No Synthetic Grading', 'Unbleached / Living Soil'],
    stockLbs: 55,
    farmerBio: 'Root grower Arthur notes that crooked carrots have identical vitamin A content and identical natural crunch, yet supermarkets discard millions of pounds yearly.',
    tasteNotes: 'Ultra-concentrated carrot sweetness, crisp snapping bite.',
    isRescueBatch: true,
    rescueReason: 'Cosmetic Divergence: Double-rooted and bent; discarded by supermarket automated mechanical sorters.',
    brixSugarRating: 9.8,
    nutrientRetentionPercent: 96,
    waterSavedGal: 290,
    co2eAvoidedLbs: 24,
    snapEligible: true,
  },
];

export interface WeatherEmergencyAlert {
  id: string;
  farmName: string;
  location: string;
  hazardType: 'Early Deep Frost (26°F)' | 'Sudden Heat Dome (102°F)' | 'Late Hailstorm Threat';
  cropAtRisk: string;
  volumeAtRiskLbs: number;
  hoursUntilEvent: number;
  targetPoundsPledged: number;
  currentPoundsPledged: number;
  directRescuePricePerLb: number;
  supermarketEquivPerLb: number;
  farmerName: string;
  farmerQuote: string;
  image: string;
  status: 'active' | 'cleared';
}

export const WEATHER_EMERGENCY_ALERTS: WeatherEmergencyAlert[] = [
  {
    id: 'alert-freeze-cedar-grove',
    farmName: 'Cedar Grove Biodynamic Fields',
    location: 'Columbia Foothills (Zone 6b)',
    hazardType: 'Early Deep Frost (26°F)',
    cropAtRisk: 'Late-Season Honeycrisp Apples & Heirloom Acorn Squash',
    volumeAtRiskLbs: 1800,
    hoursUntilEvent: 32,
    targetPoundsPledged: 1500,
    currentPoundsPledged: 1140,
    directRescuePricePerLb: 1.50,
    supermarketEquivPerLb: 3.10,
    farmerName: 'Johan Lindell',
    farmerQuote: 'An arctic front is plunging south 3 weeks ahead of historical averages. If we leave these fruits on the branches, ice crystals will rupture their cells and spoil the whole year\'s work. Community pre-orders allow us to pay our picking crew overtime right now.',
    image: '/src/assets/images/hero_organic_harvest_1793911680072.jpg',
    status: 'active',
  },
  {
    id: 'alert-heat-riverbend',
    farmName: 'Riverbend Micro-Farm',
    location: 'Lower Basin Ridge',
    hazardType: 'Sudden Heat Dome (102°F)',
    cropAtRisk: 'Tender Butterhead & Romaine Salad Greens',
    volumeAtRiskLbs: 650,
    hoursUntilEvent: 18,
    targetPoundsPledged: 600,
    currentPoundsPledged: 540,
    directRescuePricePerLb: 2.20,
    supermarketEquivPerLb: 4.50,
    farmerName: 'Sarah Albright',
    farmerQuote: 'Temperatures over 95°F will trigger premature bolting and bitter latex in tender greens. We are picking between 4:30 AM and 7:00 AM under cool dew, packing unwashed into insulated totes for same-day delivery.',
    image: '/src/assets/images/produce_weekly_csa_box_1793911681693.jpg',
    status: 'active',
  },
];

export interface NutrientDegradationFact {
  crop: string;
  nutrient: string;
  day1HarvestBridge: string;
  day21Supermarket: string;
  nutrientDeclinePercent: number;
  brixSugarDirect: string;
  brixSugarSupermarket: string;
  storageFact: string;
}

export const NUTRIENT_DEGRADATION_DATA: NutrientDegradationFact[] = [
  {
    crop: 'Strawberries & Cane Berries',
    nutrient: 'Vitamin C & Anthocyanin Flavonoids',
    day1HarvestBridge: '64 mg / 100g (100% active enzymes)',
    day21Supermarket: '19 mg / 100g (70% enzyme loss)',
    nutrientDeclinePercent: 70,
    brixSugarDirect: '11.8° Brix (Sun-converted fructose)',
    brixSugarSupermarket: '6.2° Brix (Picked green, zero sugar development)',
    storageFact: 'Commercial berries are picked unripe so they don’t bruise during 2,000-mile truck transit. Berries cannot develop sugar off the vine.',
  },
  {
    crop: 'Heirloom Vine Tomatoes',
    nutrient: 'Bioavailable Lycopene & Terpenes',
    day1HarvestBridge: '8.4 mg / 100g (Rich vine fragrance)',
    day21Supermarket: '2.8 mg / 100g (Refrigeration damage)',
    nutrientDeclinePercent: 66,
    brixSugarDirect: '9.2° Brix (Complex umami-sweet)',
    brixSugarSupermarket: '4.1° Brix (Watery, bland cardboard flesh)',
    storageFact: 'Cold storage below 54°F permanently shuts down the genes that produce tomato volatile aroma compounds, making supermarket tomatoes tasteless.',
  },
  {
    crop: 'Crisp Spinach & Tender Chard',
    nutrient: 'Folate & Vitamin C',
    day1HarvestBridge: '194 µg / 100g (Intact leaf cell turgor)',
    day21Supermarket: '42 µg / 100g (78% oxidation degradation)',
    nutrientDeclinePercent: 78,
    brixSugarDirect: '7.4° Brix (Sweet, mineral-rich crunch)',
    brixSugarSupermarket: '3.0° Brix (Bitter, limp leaves)',
    storageFact: 'Greens respire rapidly after cutting. At room/transit temperatures, spinach loses 80% of its vitamin C within 4 days of cutting.',
  },
  {
    crop: 'Orchard Apples (Honeycrisp)',
    nutrient: 'Polyphenols & Active Pectin',
    day1HarvestBridge: '142 mg / 100g (Live tree antioxidants)',
    day21Supermarket: '48 mg / 100g (Storage oxidation)',
    nutrientDeclinePercent: 66,
    brixSugarDirect: '14.5° Brix (Intense crisp tart-sweetness)',
    brixSugarSupermarket: '9.8° Brix (Mealy starch breakdown)',
    storageFact: 'Supermarket apples are commonly kept in controlled atmosphere (CA) nitrogen rooms treated with 1-Methylcyclopropene (1-MCP) for up to 10 months.',
  },
];

export const FOOD_WASTE_STATS = {
  nationalAnnualProduceDumpedTons: '20,000,000 tons',
  averageFarmRevenueLostToCullsPercent: '33%',
  householdGroceryInflationOffsetPercent: '45%',
  methaneFactorPerLbRescued: 2.8, // lbs CO2e avoided per lb rescued
  waterFactorPerLbRescued: 34, // gallons agricultural irrigation saved per lb rescued
};

export interface DropHub {
  id: string;
  name: string;
  neighborhood: string;
  pickupDay: string;
  pickupTimeWindow: string;
  address: string;
  currentBoxesPledged: number;
  thresholdToUnlockFreeTransit: number;
  isUnlocked: boolean;
  coordinator: string;
}

export const DROP_HUBS: DropHub[] = [
  {
    id: 'greenway-hub',
    name: 'Greenway Community Garden Hub',
    neighborhood: 'North Elmwood District',
    pickupDay: 'Friday Afternoon',
    pickupTimeWindow: '3:30 PM – 7:00 PM',
    address: '420 Greenway Blvd, Elmwood Park',
    currentBoxesPledged: 42,
    thresholdToUnlockFreeTransit: 45,
    isUnlocked: false,
    coordinator: 'Miriam Vance (Neighborhood Volunteer)',
  },
  {
    id: 'eastriver-market-hub',
    name: 'East River Artisan Square',
    neighborhood: 'Downtown Waterfront',
    pickupDay: 'Saturday Morning',
    pickupTimeWindow: '8:30 AM – 1:00 PM',
    address: '112 Water St, Riverfront Plaza',
    currentBoxesPledged: 58,
    thresholdToUnlockFreeTransit: 50,
    isUnlocked: true,
    coordinator: 'Chef Daniel Ortiz',
  },
  {
    id: 'sunnyside-library-hub',
    name: 'Sunnyside Civic Lawn',
    neighborhood: 'Westside Residential',
    pickupDay: 'Saturday Midday',
    pickupTimeWindow: '11:00 AM – 3:30 PM',
    address: '890 Library Way, West Garden',
    currentBoxesPledged: 33,
    thresholdToUnlockFreeTransit: 40,
    isUnlocked: false,
    coordinator: 'Clara Jenkins (PTA Co-op)',
  },
  {
    id: 'direct-home-coldvan',
    name: 'Direct Refrigerated Home Delivery',
    neighborhood: 'All Metro & Suburb Zip Codes',
    pickupDay: 'Choose at Checkout (Daily)',
    pickupTimeWindow: 'Morning (8am-12pm) or Evening (4pm-8pm)',
    address: 'Direct to your front door / porch cooler',
    currentBoxesPledged: 140,
    thresholdToUnlockFreeTransit: 1,
    isUnlocked: true,
    coordinator: 'HarvestBridge Electric Cold Fleet',
  },
];
