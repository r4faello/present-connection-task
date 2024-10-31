import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReservationPage from "./pages/ReservationPage";
import DetailedBookPage from "./pages/DetailedBookPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-backgroundGradientFrom via-backgroundGradientFrom to-backgroundGradientTo pb-[200px]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/books/:id" element={<DetailedBookPage />} />
        <Route path="/search-results" element={<SearchResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
