import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";


import "./styles/styles.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import Collection from "./pages/Collection";
import QuizSetup from "./pages/QuizSetup";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "countries", element: <Countries /> },
      { path: "countries/:countryName", element: <CountryDetails /> },
      { path: "collection", element: <Collection /> },
      { path: "quiz", element: <QuizSetup /> },
      { path: "quiz/run", element: <Quiz /> },
      { path: "leaderboard", element: <Leaderboard /> },
    ],
  },
], 
{
      basename: "/country-explorer",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);