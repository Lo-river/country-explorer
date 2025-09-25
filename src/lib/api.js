const BASE = "https://restcountries.com/v3.1";
const FIELDS = "name,flags,currencies,population,maps,languages";

export async function fetchByRegion(region, opts = {}) {
  const res = await fetch(`${BASE}/region/${encodeURIComponent(region)}?fields=${FIELDS}`, opts);
  
  if (!res.ok) throw new Error("Failed to fetch countries by region");
  const data = await res.json();

  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function fetchByName(name, opts = {}) {
  const res = await fetch(`${BASE}/name/${encodeURIComponent(name)}?fields=${FIELDS}`, opts);
  
  if (!res.ok) throw new Error("Failed to fetch country by name");
  const data = await res.json();
  
  return data[0];
}