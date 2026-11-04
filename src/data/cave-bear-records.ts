// CAVE BEAR RECORDS from GBIF, a free public database of where species were found. No key needed.
// This runs while the site is being BUILT, never in the visitor's browser. So a visitor's browser
// doesn't talk to GBIF, no IP address goes there, and the page needs no JavaScript for it.
// The numbers get fresh with every deploy.

export type CountryCount = { name: string; count: number };

export type CaveBearRecords = {
  total: number; // all records of the cave bear
  withCountry: number; // how many of them name a country
  top: CountryCount[]; // the countries with the most records
  romania: CountryCount;
  checked: Date; // when these numbers were asked for
};

const CAVE_BEAR = 4833659; // GBIF's number for Ursus spelaeus
const TOP_COUNT = 5;

// If GBIF can't be reached, the build must not fail: the site then shows these numbers, with the
// date they really were checked on.
const lastKnown: CaveBearRecords = {
  total: 55035,
  withCountry: 13839,
  top: [
    { name: "Germany", count: 6143 },
    { name: "Switzerland", count: 2311 },
    { name: "Poland", count: 2199 },
    { name: "Ukraine", count: 1784 },
    { name: "Spain", count: 601 },
  ],
  romania: { name: "Romania", count: 13 },
  checked: new Date("2026-11-03"),
};

export async function getCaveBearRecords(): Promise<CaveBearRecords> {
  try {
    // limit=0 = no single records, only the counts. facet=country = also count them per country.
    const query = new URLSearchParams({
      taxonKey: String(CAVE_BEAR),
      limit: "0",
      facet: "country",
      facetLimit: "300",
    });
    const response = await fetch(`https://api.gbif.org/v1/occurrence/search?${query}`, {
      signal: AbortSignal.timeout(8000), // give up after 8 seconds
    });
    if (!response.ok) throw new Error(`GBIF answered ${response.status}`);

    // The answer looks like: { count: 55035, facets: [{ counts: [{ name: "DE", count: 6143 }, …] }] }
    const { count, facets } = await response.json();
    const counts: CountryCount[] = facets[0].counts;

    // ZZ is GBIF's code for "country unknown", so it doesn't count as a country.
    const countries = counts.filter(({ name }) => name !== "ZZ");

    // Intl.DisplayNames is built into JavaScript and turns the code "DE" into "Germany".
    const names = new Intl.DisplayNames(["en"], { type: "region" });
    const named = ({ name, count }: CountryCount) => ({ name: names.of(name) ?? name, count });

    return {
      total: count,
      withCountry: countries.reduce((sum, country) => sum + country.count, 0),
      top: countries.slice(0, TOP_COUNT).map(named),
      romania: named(countries.find(({ name }) => name === "RO") ?? { name: "RO", count: 0 }),
      checked: new Date(),
    };
  } catch (error) {
    console.warn("Cave bear records: using the last known numbers.", error);
    return lastKnown;
  }
}
