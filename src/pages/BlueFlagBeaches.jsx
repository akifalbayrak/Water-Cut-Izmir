import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { useLoading } from "../hooks/useLoading";
import Loading from "../components/Loading";

const BlueFlagBeaches = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/ibb/cbs/mavibayrakplajlar"
                );
                const jsonData = await response.json();
                setData(jsonData.onemliyer);
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
            item.ADI.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.ILCE.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.MAHALLE.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.YOL.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            )
    );

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-8">
            <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] mx-auto space-y-6">
                <section className="flex flex-col justify-center items-center gap-6 py-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 tracking-tight">
                        Mavi Bayraklı Plajlar
                    </h1>
                    <p className="text-gray-600 text-center max-w-2xl">
                        İzmir'deki mavi bayraklı plajların listesini görüntüleyin.
                    </p>
                    <article className="flex items-center px-4 bg-white py-3 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-lg w-full md:w-[80%] lg:w-[60%]">
                        <IoIosSearch className="mr-3 text-blue-500 text-xl" />
                        <input
                            type="text"
                            placeholder="Plaj, ilçe veya mahalle arayın..."
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
                            key={index}
                            className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <article className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                                        {item.ADI}
                                    </h2>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                            {item.ILCE}
                                        </span>
                                        <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                            {item.MAHALLE}
                                        </span>
                                        <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                            {item.YOL}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        window.open(
                                            `https://www.google.com/maps?q=${item.ENLEM},${item.BOYLAM}`,
                                            "_blank"
                                        );
                                    }}
                                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors duration-200">
                                    <FaMapLocationDot className="text-xl" />
                                </button>
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

export default BlueFlagBeaches;
