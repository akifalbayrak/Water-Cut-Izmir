import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import WaterCut from "./pages/WaterCut.jsx";
import PoliticsContent from "./pages/PoliticsContent.jsx";
import DailyWater from "./pages/DailyWater.jsx";
import WeeklyWaterAnalysis from "./pages/WeeklyWaterAnalysis.jsx";
import MonthlySourceWaterProduction from "./pages/MonthlySourceWaterProduction.jsx";
import DamFillRate from "./pages/DamFillRate.jsx";
import DamList from "./pages/DamList.jsx";
import DamWaterQuality from "./pages/DamWaterQuality.jsx";
import HistoricalWater from "./pages/HistoricalWater.jsx";
import BlueFlagBeaches from "./pages/BlueFlagBeaches.jsx";
import SurroundingDistrictWater from "./pages/SurroundingDistrictWater.jsx";
import DepartmentCashDesk from "./pages/DepartmentCashDesk.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
    return (
        <BrowserRouter>
            <main className="min-h-screen flex flex-col bg-[#f8f8f8]">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/su-kesintisi" element={<WaterCut />} />
                    <Route path="/gunluk-su" element={<DailyWater />} />
                    <Route path="/politika" element={<PoliticsContent />} />
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
                        path="/sube-vezne"
                        element={<DepartmentCashDesk />}
                    />
                    {/* Catch all unmatched routes */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </main>
        </BrowserRouter>
    );
}

export default App;
