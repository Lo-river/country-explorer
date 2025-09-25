import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadCountryByName, clearSelected } from "../features/countries/countriesSlice";
import { addCountry, removeCountry } from "../features/collection/collectionSlice";
import { Link } from "react-router-dom";

export default function CountryDetails() {
  const { countryName } = useParams();
  const dispatch = useDispatch();

  const { items, selected, selectedStatus, selectedError } = useSelector(s => s.countries);
  const saved = useSelector(s => s.collection.items);

  const fromList = items.find(c => c?.name?.common === countryName);

  useEffect(() => {
    if (!fromList) dispatch(loadCountryByName(countryName));
    return () => dispatch(clearSelected());
  }, [countryName, fromList, dispatch]);

  const country = fromList || selected;

  if (!country && selectedStatus === "loading") return <p>Loading country...</p>;

  if (!country && selectedStatus === "failed") return <p role="alert">Error: {selectedError}</p>;

  if (!country) return  <p>Loading...</p> ;

  const name = country?.name?.common || "Unknown";
  const flag = country?.flags?.svg || country?.flags?.png || null;
  
  const currencyNames = country?.currencies
    ? Object.values(country.currencies).map(c => c?.name).filter(Boolean).join(", ")
    : "-";
    
  const population = country?.population ?? null;
  const languageNames = country?.languages
    ? Object.values(country.languages).filter(Boolean).join(", ")
    : "-";

  const isSaved = saved.some(c => c?.name?.common === name);

  return ( 
    <main className="stack-16">
      
      {flag ? (
        <img src={flag} alt={`${name} flag`} width={320} style={{ borderRadius: 12 }} />
      ) : (
        <div style={{ width: 320, height: 180, border: "1px dashed var(--border)", borderRadius: 12, display: "grid", placeItems: "center" }}>
          No flag
        </div>
      )}

      <h1>{name}</h1>

      <p><strong>Currency:</strong> {currencyNames || "-"}</p>
      <p><strong>Population:</strong> {population?.toLocaleString?.() ?? "-"}</p>
      <p><strong>Language:</strong> {languageNames}</p>

      {country?.maps?.googleMaps && (
        <p><a href={country.maps.googleMaps} target="_blank" rel="noreferrer" className="btn">Open in Google Maps</a></p>
      )}

      {isSaved ? (
        <button onClick={() => dispatch(removeCountry(name))} className="btn btn-danger">Remove from collection</button>
      ) : (
        <button onClick={() => dispatch(addCountry(country))} className="btn btn-primary">Save to collection</button>
      )}
                <Link className="btn" to="/countries">Back</Link>

    </main>
  );
}