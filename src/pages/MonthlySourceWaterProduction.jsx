import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useLoading } from "../hooks/useLoading";
import Loading from "../components/Loading";

const MonthlySourceWaterProduction = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/suuretiminindagilimi"
                );
                const jsonData = await response.json();
                setData(jsonData);
                stopLoading();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            // Check if user reached bottom
            if (scrollTop + windowHeight >= fullHeight - 100) {
                setVisibleCount((prev) => prev + 10);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter data based on search term (always search all data)
    const filteredData = data.filter((item) =>
        item.UretimKaynagi?.toLocaleLowerCase("tr-TR").includes(
            searchTerm.toLocaleLowerCase("tr-TR")
        )
    );

    // If searching, show all matching results; otherwise, limit by visibleCount
    const displayedData = searchTerm
        ? filteredData
        : filteredData.slice(0, visibleCount);

    const formatMonth = (monthNum) => {
        return [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık",
        ][monthNum - 1];
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-8">
            <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] mx-auto space-y-6">
                <section className="flex flex-col justify-center items-center gap-6 py-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 tracking-tight">
                        Su Üretiminin Aylara ve Kaynaklara Göre Dağılımı
                    </h1>
                    <p className="text-gray-600 text-center max-w-2xl">
                        İzmir'deki su kaynaklarının aylık üretim miktarlarını takip edin.
                    </p>
                    <article className="flex items-center px-4 bg-white py-3 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-lg w-full md:w-[80%] lg:w-[60%]">
                        <IoIosSearch className="mr-3 text-blue-500 text-xl" />
                        <input
                            type="text"
                            placeholder="Kaynak arayın..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setVisibleCount(10);
                            }}
                            className="text-lg bg-transparent border-none rounded w-full focus:outline-none focus:ring-0 placeholder-gray-400"
                        />
                    </article>
                </section>

                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <Loading />
                    </div>
                )}

                <div className="grid gap-4">
                    {displayedData.map((item, index) => (
                        <section
                            key={index}
                            className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <article className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {item.UretimKaynagi}
                                    </h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                        {(item.UretimMiktari / 1000).toFixed(2)} m³
                                    </span>
                                    <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                        {formatMonth(item.Ay)}
                                    </span>
                                </div>
                            </article>
                        </section>
                    ))}
                </div>

                {!isLoading && displayedData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            Aradığınız kriterlere uygun veri bulunamadı.
                        </p>
                    </div>
                )}

                {!isLoading && !searchTerm && displayedData.length < filteredData.length && (
                    <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">
                            Daha fazla sonuç görmek için aşağı kaydırın...
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MonthlySourceWaterProduction;
