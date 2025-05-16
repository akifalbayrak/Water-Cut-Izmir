import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDropletSlash,
    faCaretDown,
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { path: "/", text: "Arıza Kaynaklı Su Kesintileri" },
        { path: "/daily-water", text: "Günlük Su Üretimi" },
        {
            path: "/weekly-water-analysis",
            text: "Haftalık Su Analiz Sonuçları",
        },
        {
            path: "/distribution-of-water-production",
            text: "Su Üretim Dağılımı",
        },
        { path: "/dam-fill-rate", text: "Baraj Doluluk Oranı" },
        { path: "/dam-list", text: "Baraj Listesi" },
        {
            path: "/dam-water-quality-reports",
            text: "Baraj Su Kalite Raporları",
        },
        { path: "/historical-water-structures", text: "Tarihi Su Yapıları" },
        { path: "/blue-flag-beaches", text: "Mavi Bayraklı Plajlar" },
        {
            path: "/surrounding-district-water-quality",
            text: "Çevre İlçe Analiz Sonuçları",
        },
        { path: "/department-cash-desk", text: "Şube ve Vezne Bilgileri" },
    ];

    return (
        <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
                        onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon
                            icon={faDropletSlash}
                            className="text-3xl text-blue-200"
                        />
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold leading-tight">
                                İzmir Büyükşehir Belediyesi
                            </h1>
                            <p className="text-sm text-blue-100">
                                Su Yönetimi Bilgilendirme Portalı
                            </p>
                        </div>
                    </Link>
                    <nav className="hidden lg:flex space-x-1">
                        {menuItems.slice(0, 4).map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="px-3 py-2 text-sm font-medium hover:bg-blue-700/50 rounded-md transition-colors whitespace-nowrap">
                                {item.text}
                            </Link>
                        ))}
                        <div className="relative group">
                            <button className="flex items-center px-3 py-2 text-sm font-medium hover:bg-blue-700/50 rounded-md transition-colors">
                                <span>Diğer</span>
                                <FontAwesomeIcon
                                    icon={faCaretDown}
                                    className="ml-1 text-xs"
                                />
                            </button>
                            <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-10">
                                <div className="py-1">
                                    {menuItems.slice(4).map((item, index) => (
                                        <Link
                                            key={index}
                                            to={item.path}
                                            className="block px-4 py-2 text-sm hover:bg-blue-50 transition-colors">
                                            {item.text}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </nav>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-md hover:bg-blue-700/50 transition-colors"
                        aria-label="Toggle menu">
                        <FontAwesomeIcon
                            icon={isOpen ? faXmark : faBars}
                            className="text-xl"
                        />
                    </button>
                </div>
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-screen" : "max-h-0"
                    }`}>
                    <nav className="pb-4">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-sm font-medium hover:bg-blue-700/50 rounded-md transition-colors">
                                {item.text}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
