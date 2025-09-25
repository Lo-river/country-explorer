import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

export default function Home() {
  return (
    <main>
      <h1>Country Explorer</h1>
      <p>Welcome! What would you like to do:</p>

      <div className="home-container">
        <div className="home-card">
          <div className="home-card-content">
            <h2 className="home-card-title">Countries</h2>
            <img src={`${BASE}images/countries-icon-.png`} alt="Countries icon" className="home-icons" />
          </div>
          <Link className="btn" to="/countries">Study countries</Link>
        </div>

        <div className="home-card">
          <div className="home-card-content">
            <h2 className="home-card-title">Collection</h2>
            <img src={`${BASE}images/collection-icon-.png`} alt="Collection icon" className="home-icons" />
          </div>
          <Link className="btn" to="/collection">Collection</Link>
        </div>

        <div className="home-card">
          <div className="home-card-content">
            <h2 className="home-card-title">Quiz</h2>
            <img src={`${BASE}images/quiz-icon-.png`} alt="Quiz icon" className="home-icons" />
          </div>
          <Link className="btn" to="/quiz">Quiz</Link>
        </div>

        <div className="home-card">
          <div className="home-card-content">
            <h2 className="home-card-title">Leaderboard</h2>
            <img src={`${BASE}images/leaderboard-icon---.png`} alt="Leaderboard icon" className="home-icons" />
          </div>
          <Link className="btn" to="/leaderboard">Leaderboard</Link>
        </div>
      </div>
    </main>
  );
}
