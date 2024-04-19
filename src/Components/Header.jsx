import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDropletSlash,
    faCaretDown,
    faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <header className="bg-white text-gray-800 flex justify-center">
                <div className="container items-center justify-center">
                    <Link to="/" className="flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faDropletSlash}
                            className="text-sky-300 text-5xl mx-4"
                        />
                        <h1 className="text-3xl font-bold mx-4">
                            İzmir Büyükşehir Belediyesi Bilgilendirme Sayfası
                        </h1>
                    </Link>
                    <button
                        className="border-2 border-gray-200 rounded-xl px-3 my-2 float-right"
                        onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <FontAwesomeIcon icon={faCaretDown} />
                        ) : (
                            <FontAwesomeIcon icon={faCaretUp} />
                        )}
                    </button>
                    {isOpen && (
                        <div className="grid grid-cols-4 gap-4 my-8 ">
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/">
                                Arıza Kaynaklı Düzensiz Su Kesintileri
                            </Link>

                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/daily-water">
                                Günlük Su Üretimi
                            </Link>
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/weekly-water-analysis">
                                Haftalık Su Analiz Sonuçları
                            </Link>
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/distribution-of-water-production">
                                Su Üretiminin Aylara ve Kaynaklara Göre Dağılımı
                            </Link>
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/dam-fill-rate">
                                Baraj Doluluk Oranı
                            </Link>
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/dam-list">
                                Baraj Listesi
                            </Link>
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/dam-water-quality-reports">
                                Baraj Su Kalite Raporları
                            </Link>
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/historical-water-structures">
                                Tarihi Su Yapıları Konum Verisi
                            </Link>
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/blue-flag-beaches">
                                Mavi Bayraklı Plajlar Konum Verisi
                            </Link>
                        </div>
                    )}
                </div>
            </header>
            <hr className="border-b border-gray-200" />
        </>
    );
};

export default Header;
