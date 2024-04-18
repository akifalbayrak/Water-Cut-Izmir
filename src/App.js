// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Routes
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Main from "./Components/Main";
import PoliticsContent from "./Components/PoliticsContent";
import DailyWater from "./Components/DailyWater";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/daily-water" element={<DailyWater />} />
                    <Route path="/politics" element={<PoliticsContent />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
