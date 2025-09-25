import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRegion, loadRegion } from "../features/countries/countriesSlice";
import RegionSelect from "../components/RegionSelect";
import { Link } from "react-router-dom";

export default function Countries() {
  const dispatch = useDispatch();
  const { region, items, status, error } = useSelector(s => s.countries);

  useEffect(() => {
    dispatch(loadRegion(region));
  }, [region, dispatch]);

  return (
    <main>
      <h1>Countries</h1>

      <label htmlFor="region"><strong>Region</strong></label>{" "}
      <RegionSelect
        id="region"
        value={region}
        disabled={status === "loading"}
        onChange={(val) => dispatch(setRegion(val))}
      />

      {status === "loading" && <p>Loading Countries...</p>}
      {status === "failed" && <p role="alert">Error: {error}</p>}

      {status === "succeeded" && (
        <div className="grid mt-16" id="country-card">
          {items.map((c) => {
            const name = c?.name?.common || "Unknown";
            const flag = c?.flags?.svg || c?.flags?.png || null;
            return (
              <Link
                key={name}
                to={`/countries/${encodeURIComponent(name)}`}
                title={name}
                className="card"
              >
                {flag ? <img src={flag} alt={`${name} flag`} /> : <div style={{ height: 150 }} />}
                <div className="card-body">
                  <p className="card-title">{name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}