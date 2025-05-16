import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import DamWaterQuality from "./Components/DamWaterQuality";
import HistoricalWater from "./Components/HistoricalWater";
import BlueFlagBeaches from "./Components/BlueFlagBeaches";
import SurroundingDistrictWater from "./Components/SurroundingDistrictWater";
import DepartmentCashDesk from "./Components/DepartmentCashDesk";

function App() {
    return (
        <BrowserRouter>
            <main className="min-h-screen flex flex-col bg-[#f8f8f8]">
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/water-cut" />}
                    />
                    <Route path="water-cut" element={<WaterCut />} />
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
                    <Route
                        path="/dam-water-quality-reports"
                        element={<DamWaterQuality />}
                    />
                    <Route
                        path="/historical-water-structures"
                        element={<HistoricalWater />}
                    />
                    <Route
                        path="/blue-flag-beaches"
                        element={<BlueFlagBeaches />}
                    />
                    <Route
                        path="/surrounding-district-water-quality"
                        element={<SurroundingDistrictWater />}
                    />
                    <Route
                        path="/department-cash-desk"
                        element={<DepartmentCashDesk />}
                    />
                </Routes>
                <Footer />
            </main>
        </BrowserRouter>
    );
}

export default App;
