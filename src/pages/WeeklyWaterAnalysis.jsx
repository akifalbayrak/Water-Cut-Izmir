import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useLoading } from "../hooks/useLoading";
import Loading from "../components/Loading";

const WeeklyWaterAnalysis = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/haftaliksuanalizleri"
                );
                const jsonData = await response.json();
                setData(jsonData.TumAnalizler[0].analizSonuclari);
                stopLoading();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Filter data based on search term
    const filteredData = data.filter(
        (item) =>
            item.ParametreAdi.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.ParametreKodu.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            )
    );

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-8">
            <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] mx-auto space-y-6">
                <section className="flex flex-col justify-center items-center gap-6 py-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 tracking-tight">
                        Haftalık Su Analiz Sonuçları
                    </h1>
                    <p className="text-gray-600 text-center max-w-2xl">
                        İzmir'deki su kalitesi parametrelerinin haftalık analiz sonuçlarını takip edin.
                    </p>
                    <article className="flex items-center px-4 bg-white py-3 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-lg w-full md:w-[80%] lg:w-[60%]">
                        <IoIosSearch className="mr-3 text-blue-500 text-xl" />
                        <input
                            type="text"
                            placeholder="Parametre veya kod arayın..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                    {filteredData.map((item, index) => (
                        <section
                            className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                            key={index}>
                            <article className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                        {item.ParametreAdi}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {item.ParametreKodu}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {item.Birim !== " " && (
                                        <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                            {item.Birim}
                                        </span>
                                    )}
                                    <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                        {item.ParametreDegeri}
                                    </span>
                                    <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                        {item.Standart}
                                    </span>
                                </div>
                            </article>
                        </section>
                    ))}
                </div>

                {!isLoading && filteredData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            Aradığınız kriterlere uygun veri bulunamadı.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default WeeklyWaterAnalysis;
