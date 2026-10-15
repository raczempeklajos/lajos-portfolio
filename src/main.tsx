
import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router";

import App from "./App";
import ChessGamePage from "./pages/ChessGamePage";
import PetMedicalPage from "./pages/PetMedicalPage";

import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />

      <PageTransition>
        <Routes>
          <Route
            path="/"
            element={<App />}
          />

          <Route
            path="/projects/chessgame"
            element={<ChessGamePage />}
          />

          <Route
            path="/projects/pet-medical-system"
            element={<PetMedicalPage />}
          />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  </React.StrictMode>
);
