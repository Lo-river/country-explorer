import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/countries" className={({isActive}) => isActive ? "active" : ""}>Study countries</NavLink>
        <NavLink to="/collection" className={({isActive}) => isActive ? "active" : ""}>Collection</NavLink>
        <NavLink to="/quiz" className={({isActive}) => isActive ? "active" : ""}>Quiz</NavLink>
        <NavLink to="/leaderboard" className={({isActive}) => isActive ? "active" : ""}>Leaderboard</NavLink>
      </nav>
    </header>
  );
}