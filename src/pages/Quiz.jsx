import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { answerQuestion, resetQuiz } from "../features/quiz/quizSlice";
import { Link, useNavigate } from "react-router-dom";

function AnswerForm({ onSubmit }) {
  const [value, setValue] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
    setValue("");
  }

  return (
    <div>
    <form onSubmit={handleSubmit} className="mt-16">

      <input
        type="text"
        id="answer"
        name="answer"
        placeholder="Type the country name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        required
      />{" "}

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    <Link className="btn" to="/quiz">Quit</Link>

    </div>
  );
}

export default function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
    username,
    region,
    questions, 
    index, 
    score, 
    status, 
    finished, 
    lastCorrect, 
    lastCountry, 
    error 
    } = useSelector((s) => s.quiz);

  const current = questions[index];

  useEffect(() => {

    if (status !== "loading" && questions.length === 0) {
      navigate("/quiz");
    }
  }, [status, questions.length, navigate]);

  if (status === "loading") return <main><p>Loading quiz...</p></main>;

  if (status === "failed") return <main><p role="alert">Error: {error}</p></main>;

  if (finished) {

    return (
      <main className="quiz-main-finished">
        <h1>Quiz finished</h1>

        <div className="quiz-finished-content">
          <h2><strong>{username}</strong></h2>
          <p>Region: <strong>{region}</strong></p>
          <p>Score: <strong>{score}</strong> / {questions.length}</p>
          <p>Your result has been saved</p>

          <div className="quiz-finished-btn">
            <Link to="/leaderboard" className="btn">See Leaderboard</Link>{" "}
            <button className="btn" onClick={() => dispatch(resetQuiz())}>Start over</button>
          </div>
        </div>

      </main>
    );
  }

  if (!current) return <main><p>Loading...</p></main>;

  return (
    <main className="quiz-main">
      <div className="quiz-container">
        <p className="question-count">Question {index + 1} / {questions.length} • Score: {score} <div className="progress">
  <div className="bar" style={{ width: `${(index+1) / questions.length * 100}%` }}></div>
</div></p>
        
        <h1>Quiz - {region}</h1>
        <p>User: <strong>{username}</strong></p>

        <img
          src={current.flag}
          alt="Guess the country by its flag"
          width={320}
          className="quiz-flag"
          style={{ borderRadius: 12 }}
        />

        <AnswerForm onSubmit={(val) => dispatch(answerQuestion(val))} />

        {lastCorrect != null && lastCountry && (
          <p className="mt-16" role="status">
            {lastCorrect ? "Correct -" : "Wrong -"} the flag belongs to <strong>{lastCountry}</strong>
          </p>
        )}
      </div>
    </main>
  );
}