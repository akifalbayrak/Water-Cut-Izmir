import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

const DamFillRate = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [limitor, setLimitor] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/barajdurum"
                );
                const jsonData = await response.json();
                setLoading(false);
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        // Set up interval to fetch data every minute
        const interval = setInterval(fetchData, 600000); // 600000 milliseconds = 10 minute

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const changeInput = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        data.filter((item) => {
            if (item.BarajKuyuAdi.includes(searchTerm)) {
                return item;
            }
        });
    };

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString("tr-TR");
    };

    // Function to format date and time
    const formatNumber = (num) => {
        const fixNum = num / 1000;
        return fixNum.toFixed(2);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                // User has scrolled to the bottom
                setLimitor((prev) => prev + 20);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className="DamFillRate px-8 py-4 lg:w-3/4 mx-auto bg-gray-100">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="items-center mb-2">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Su Üretiminin Aylara ve Kaynaklara Göre Dağılımı
                    </h1>
                </div>
            </div>
            <div className="relative mx-auto max-w-md my-2">
                <input
                    type="text"
                    placeholder="Ara"
                    onChange={changeInput}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <IoIosSearch className="text-gray-500" />
                </span>
            </div>
            <div className="card-container my-4 p-4 bg-white rounded-lg shadow-md">
                {loading && <p>Loading...</p>}
                {data && (
                    <div className="gap-4 grid grid-cols-3">
                        {data
                            .filter((item) =>
                                item.BarajKuyuAdi.toLowerCase().includes(
                                    searchTerm.toLowerCase()
                                )
                            )
                            .slice(0, limitor)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-xl border items-center my-2 bg-white">
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            BarajKuyuAdi{" "}
                                        </p>
                                        <p class="text-gray-500">
                                            {item.BarajKuyuAdi}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            SuDurumu{" "}
                                        </p>
                                        <p class="text-gray-500">
                                            {formatNumber(item.SuDurumu)}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            SuYuksekligi{" "}
                                        </p>
                                        <p class="text-gray-500">
                                            {item.SuYuksekligi}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            KullanılabilirGolSuHacmi{" "}
                                        </p>
                                        <p class="text-gray-500">
                                            {formatNumber(
                                                item.KullanılabilirGolSuHacmi
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            TuketilebilirSuKapasitesi
                                        </p>
                                        <p class="text-gray-500">
                                            {formatNumber(
                                                item.TuketilebilirSuKapasitesi
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            MaksimumSuKapasitesi
                                        </p>
                                        <p class="text-gray-500">
                                            {formatNumber(
                                                item.MaksimumSuKapasitesi
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            MinimumSuYuksekligi
                                        </p>
                                        <p class="text-gray-500">
                                            {item.MinimumSuYuksekligi}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            DolulukOrani
                                        </p>
                                        <p class="text-gray-500">
                                            {item.DolulukOrani}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            DurumTarihi
                                        </p>
                                        <p class="text-gray-500">
                                            {formatDateTime(item.DurumTarihi)}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            MinimumSuKapasitesi
                                        </p>
                                        <p class="text-gray-500">
                                            {formatNumber(
                                                item.MinimumSuKapasitesi
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            MaksimumSuYuksekligi
                                        </p>
                                        <p class="text-gray-500">
                                            {item.MaksimumSuYuksekligi}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        {data.filter((item) =>
                            item.BarajKuyuAdi.toLowerCase().includes(
                                searchTerm.toLowerCase()
                            )
                        ).length === 0 && (
                            <p>
                                No data found for{" "}
                                <span className="italic font-bold">
                                    {searchTerm}
                                </span>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default DamFillRate;
