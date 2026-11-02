// My four places, in the order of my story – one shared list for the hidden coordinates on
// Home, Products, Brand and Contact, the crosses on the Home map and the hidden Brand section.
// Change a number here once and the pages follow.
// The id (e.g. "gjilan") is what gets saved in the browser and what names the yellow cross
// (public/map/found-<id>.svg), so never rename it.
// name: on the coordinates, only screen readers hear it – on screen it's just the numbers.

export const places = {
  // The hospital in Gjilan, my birth city (OpenStreetMap: Spitali Rajonal i Gjilanit)
  gjilan: { name: "Gjilan, Kosovo", coordinates: "N 42° 27′ 28″ · E 21° 27′ 45″" },
  // My pin on the island in Stora Le, where I first had the idea for this company
  "brente-holme": { name: "Brente Holme, Sweden", coordinates: "N 59° 18′ 29″ · E 11° 48′ 41″" },
  // The cave with the 140 cave bear skeletons (Peștera Urșilor)
  "bears-cave": { name: "Bears' Cave, Romania", coordinates: "N 46° 33′ 14″ · E 22° 34′ 09″" },
  // Where the Regen meets the Danube (Wikipedia: the Regen's mouth)
  regensburg: { name: "Regensburg, Germany", coordinates: "N 49° 01′ 35″ · E 12° 06′ 13″" },
};
