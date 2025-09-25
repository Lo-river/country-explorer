

import { loadScores } from "../lib/storage";

const REGIONS = ["Europe", "Asia", "Oceania", "Americas", "Africa"];

export default function Leaderboard() {
  // Get all saved results
  const allScores = loadScores();

 
  const groupedByRegion = Object.fromEntries(REGIONS.map((regionName) => [regionName, []]));

  //Put every object in right region list 
  for (const scoreEntry of allScores) {
    if (groupedByRegion[scoreEntry.region]) {
      groupedByRegion[scoreEntry.region].push(scoreEntry);
    }
  }

  // Sort every region list, highest points, then after date 
  for (const regionName of REGIONS) {
    groupedByRegion[regionName].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.date) - new Date(b.date);
    });
  }

  return (
    <main>
      <h1>Leaderboard</h1>

      {REGIONS.map((regionName) => (
        <section key={regionName} style={{ marginBottom: 28 }}>
          <h2 style={{ marginBottom: 8 }}>{regionName}</h2>

          {groupedByRegion[regionName].length === 0 ? (
            <p>No results yet</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {groupedByRegion[regionName].map((scoreEntry, index) => (
                  <tr key={`${scoreEntry.username}-${scoreEntry.date}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{scoreEntry.username}</td>
                    <td>{scoreEntry.score} / {scoreEntry.total}</td>
                    <td>{new Date(scoreEntry.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}
    </main>
  );
}