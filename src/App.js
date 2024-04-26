// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Routes
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import WaterCut from "./Components/WaterCut";
import PoliticsContent from "./Components/PoliticsContent";
import DailyWater from "./Components/DailyWater";
import WeeklyWaterAnalysis from "./Components/WeeklyWaterAnalysis";
import MonthlySourceWaterProduction from "./Components/MonthlySourceWaterProduction";
import DamFillRate from "./Components/DamFillRate";
import DamList from "./Components/DamList";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Header />
                <Routes>
                    <Route index element={<WaterCut />} />
                    <Route path="/daily-water" element={<DailyWater />} />
                    <Route path="/politics" element={<PoliticsContent />} />
                    <Route
                        path="/weekly-water-analysis"
                        element={<WeeklyWaterAnalysis />}
                    />
                    <Route
                        path="/distribution-of-water-production"
                        element={<MonthlySourceWaterProduction />}
                    />
                    <Route path="/dam-fill-rate" element={<DamFillRate />} />
                    <Route path="/dam-list" element={<DamList />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
