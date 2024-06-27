import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDropletSlash,
    faCaretDown,
    faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="bg-white text-gray-800 flex justify-center my-8">
                <div className="container mx-auto px-4 items-center justify-center">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center">
                            <FontAwesomeIcon
                                icon={faDropletSlash}
                                className="text-sky-300 text-5xl mx-4"
                            />
                            <h1 className="text-xl lg:text-3xl font-bold mx-4 text-center">
                                İzmir Büyükşehir Belediyesi Bilgilendirme
                                Sayfası
                            </h1>
                        </Link>
                        <button
                            className="border-2 border-gray-200 rounded-xl px-3 py-1 lg:hidden"
                            onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? (
                                <FontAwesomeIcon icon={faCaretDown} />
                            ) : (
                                <FontAwesomeIcon icon={faCaretUp} />
                            )}
                        </button>
                    </div>
                    {isOpen && (
                        <div className="lg:hidden grid grid-cols-1 gap-2 my-4">
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
                            <Link
                                className="text-blue-500 hover:text-blue-700"
                                to="/surrounding-district-water-quality">
                                Çevre İlçe Merkezlerinin Analiz Sonuçları
                            </Link>
                        </div>
                    )}
                    <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
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
                        <Link
                            className="text-blue-500 hover:text-blue-700"
                            to="/surrounding-district-water-quality">
                            Çevre İlçe Merkezlerinin Analiz Sonuçları
                        </Link>
                    </div>
                </div>
            </header>
            <hr className="border-b border-gray-200" />
        </>
    );
};

export default Header;
