import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeCountry } from "../features/collection/collectionSlice";

export default function Collection() {
  const dispatch = useDispatch();
  const items = useSelector(s => s.collection.items);

  if (!items.length) {
    return (
      <main>
        <h1>Collection</h1>
        <p>No saved countries yet</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Collection</h1>

      <div className="grid mt-16" id="country-card">
        {items.map((c) => {
          const name = c?.name?.common ?? "Unknown";
          const flag = c?.flags?.svg ?? c?.flags?.png ?? null;

          return (
            <div key={name} className="card" style={{ position: "relative" }}>
              <Link to={`/countries/${encodeURIComponent(name)}`} title={name}>
                {flag ? <img src={flag} alt={`${name} flag`} /> : <div style={{ height: 150 }} />}

                <div className="card-body">
                  <p className="card-title">{name}</p>
                </div>

              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(removeCountry(name));
                }}
                
                className="btn btn-danger"
                style={{ position: "absolute", bottom: 8, right: 8, border: "2px solid black", color: "white"}}
                aria-label={`Remove ${name} from collection`}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}