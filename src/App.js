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
                        element={<Navigate replace to="/su-kesintisi" />}
                    />
                    <Route path="/su-kesintisi" element={<WaterCut />} />
                    <Route path="/gunluk-su" element={<DailyWater />} />
                    <Route path="/siyaset" element={<PoliticsContent />} />
                    <Route
                        path="/haftalik-su-analizi"
                        element={<WeeklyWaterAnalysis />}
                    />
                    <Route
                        path="/su-uretim-dagilimi"
                        element={<MonthlySourceWaterProduction />}
                    />
                    <Route
                        path="/baraj-doluluk-orani"
                        element={<DamFillRate />}
                    />
                    <Route path="/baraj-listesi" element={<DamList />} />
                    <Route
                        path="/baraj-su-kalite-raporlari"
                        element={<DamWaterQuality />}
                    />
                    <Route
                        path="/tarihi-su-yapilari"
                        element={<HistoricalWater />}
                    />
                    <Route
                        path="/mavi-bayrakli-plajlar"
                        element={<BlueFlagBeaches />}
                    />
                    <Route
                        path="/cevre-ilce-su-kalitesi"
                        element={<SurroundingDistrictWater />}
                    />
                    <Route
                        path="/mudurluk-vezne"
                        element={<DepartmentCashDesk />}
                    />
                </Routes>
                <Footer />
            </main>
        </BrowserRouter>
    );
}

export default App;
