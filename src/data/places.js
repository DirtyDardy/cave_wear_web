// My four places, in the order of my story – one shared list for the hidden coordinates on
// Home, Products, Brand and Contact, the crosses on the Home map and the hidden Brand section.
// Change a number here once and the pages follow.
// The id (e.g. "gjilan") is what gets saved in the browser and what names the yellow cross
// (public/map/found-<id>.svg), so never rename it.
// name: on the coordinates, only screen readers hear it – on screen it's just the numbers.
// text: what the place means to me, in the hidden Brand section.

export const places = {
  // The hospital in Gjilan, my birth city (OpenStreetMap: Spitali Rajonal i Gjilanit)
  gjilan: { name: "Gjilan, Kosovo", coordinates: "N 42° 27′ 28″ · E 21° 27′ 45″", text: "I was born here, and lived here for a year and a half after the Kosovo war. It belongs to me. I try to combine the good sides of Albanian culture with the good sides of German culture." },
  // My pin on the island in Stora Le, where I first had the idea for this company
  "brente-holme": { name: "Brente Holme, Sweden", coordinates: "N 59° 18′ 29″ · E 11° 48′ 41″", text: "A small, beautiful island, and the first place in nature I could call home. I had never felt nature so fully before, and it was here that the idea for Cave Wear first came to me." },
  // The cave with the 140 cave bear skeletons (Peștera Urșilor)
  "bears-cave": { name: "Bears' Cave, Romania", coordinates: "N 46° 33′ 14″ · E 22° 34′ 09″", text: "The cave bear has fascinated me since I first heard about it at ten years old. A quarry blast opened this cave in 1975, and inside lay about 140 cave bear skeletons." },
  // Where the Regen meets the Danube (Wikipedia: the Regen's mouth)
  regensburg: { name: "Regensburg, Germany", coordinates: "N 49° 01′ 35″ · E 12° 06′ 13″", text: "The small Bavarian city where I grew up. I went to school here, learned my trade in production and design, and met the people who made me who I am today." },
};
