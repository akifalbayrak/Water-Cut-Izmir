import React, { useState } from "react";
import { Link } from "react-router-dom";
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
            <header className="bg-blue-50 text-s text-gray-800 justify-between items-center py-4">
                <div className="flex items-center justify-center mb-4 md:mb-0">
                    <Link to="/" className="flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faDropletSlash}
                            className="text-sky-300 text-5xl mx-4"
                        />
                        <h1 className="text-2xl md:text-3xl font-bold mx-4 text-center">
                            İzmir Büyükşehir Belediyesi Bilgilendirme Sayfası
                        </h1>
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-end justify-end w-full md:w-auto">
                    <button
                        className="border-2 border-gray-200 rounded-xl px-3 my-2 md:my-0 md:ml-4"
                        onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <FontAwesomeIcon icon={faCaretDown} />
                        ) : (
                            <FontAwesomeIcon icon={faCaretUp} />
                        )}
                    </button>
                </div>
                {isOpen && (
                    <div className="text-s grid grid-cols-1 md:grid-cols-4 gap-3 my-4 md:my-8 mx-16">
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/">
                            Arıza Kaynaklı Düzensiz Su Kesintileri
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/daily-water">
                            Günlük Su Üretimi
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/weekly-water-analysis">
                            Haftalık Su Analiz Sonuçları
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/distribution-of-water-production">
                            Su Üretiminin Aylara ve Kaynaklara Göre Dağılımı
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/dam-fill-rate">
                            Baraj Doluluk Oranı
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/dam-list">
                            Baraj Listesi
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/dam-water-quality-reports">
                            Baraj Su Kalite Raporları
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/historical-water-structures">
                            Tarihi Su Yapıları Konum Verisi
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/blue-flag-beaches">
                            Mavi Bayraklı Plajlar Konum Verisi
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/surrounding-district-water-quality">
                            Çevre İlçe Merkezlerinin Analiz Sonuçları
                        </Link>
                        <Link
                            className="rounded-lg text-blue-500 hover:text-white border text-center py-2 border-gray-150 hover:bg-gray-500"
                            to="/department-cash-desk">
                            Şube ve Vezne Bilgileri
                        </Link>
                    </div>
                )}
            </header>
            <hr className="border-b border-gray-200" />
        </>
    );
};

export default Header;
