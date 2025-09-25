import { useState } from "react";
import { useDispatch } from "react-redux";
import { startQuiz } from "../features/quiz/quizSlice";
import { useNavigate } from "react-router-dom";
import RegionSelect from "../components/RegionSelect";

export default function QuizSetup() {
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("Europe");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const u = username.trim();

    if (!u) return alert("Please enter a username");
   
    try {
      await dispatch(startQuiz({ username: u, region })).unwrap();
      navigate("/quiz/run");

    } catch (err) {
      alert(err.message || "Failed to start quiz");
    }
  }

  return (
    <main className="quiz-setup-main">
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit} className="quizsetup-container">
        
        <div className="row">
          <label htmlFor="username"><strong>Username :</strong></label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="row">
          <label htmlFor="quiz-region"><strong>Region : </strong></label>{" "}
          <RegionSelect id="quiz-region" value={region} onChange={setRegion} />
        </div>

        <button type="submit" className="btn btn-primary">Start quiz</button>
      </form>
    </main>
  );
}