import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WaterCut from "./pages/WaterCut";
import PoliticsContent from "./pages/PoliticsContent";
import DailyWater from "./pages/DailyWater";
import WeeklyWaterAnalysis from "./pages/WeeklyWaterAnalysis";
import MonthlySourceWaterProduction from "./pages/MonthlySourceWaterProduction";
import DamFillRate from "./pages/DamFillRate";
import DamList from "./pages/DamList";
import DamWaterQuality from "./pages/DamWaterQuality";
import HistoricalWater from "./pages/HistoricalWater";
import BlueFlagBeaches from "./pages/BlueFlagBeaches";
import SurroundingDistrictWater from "./pages/SurroundingDistrictWater";
import DepartmentCashDesk from "./pages/DepartmentCashDesk";

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
