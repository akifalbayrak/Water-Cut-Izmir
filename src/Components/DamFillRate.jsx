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
        <main className="DamFillRate px-8 py-4 lg:w-3/4 mx-auto ">
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
            <div className="card-container my-4 p-4 rounded-lg shadow-md">
                {loading && <p>Loading...</p>}
                {data && (
                    <div className="gap-4 grid grid-cols-3 ">
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
                                    className="p-6 rounded-xl border items-center my-2 bg-white shadow-md hover:border-gray-400 transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md">
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Baraj Kuyu Adi :{" "}
                                            <span className="text-gray-500">
                                                {item.BarajKuyuAdi}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Su Durumu :{" "}
                                            <span className="text-gray-500">
                                                {formatNumber(item.SuDurumu)}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Su Yuksekligi :{" "}
                                            <span className="text-gray-500">
                                                {item.SuYuksekligi}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Kullanılabilir Gol Su Hacmi :{" "}
                                            <span className="text-gray-500">
                                                {formatNumber(
                                                    item.KullanılabilirGolSuHacmi
                                                )}
                                            </span>
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Tuketilebilir Su Kapasitesi :{" "}
                                            <span className="text-gray-500">
                                                {formatNumber(
                                                    item.TuketilebilirSuKapasitesi
                                                )}
                                            </span>
                                        </p>
                                        <p class="text-gray-500"></p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Maksimum Su Kapasitesi :{" "}
                                            <span className="text-gray-500">
                                                {formatNumber(
                                                    item.MaksimumSuKapasitesi
                                                )}
                                            </span>
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Minimum Su Yuksekligi :{" "}
                                            <span className="text-gray-500">
                                                {item.MinimumSuYuksekligi}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Doluluk Orani :{" "}
                                            <span className="text-gray-500">
                                                {item.DolulukOrani} %
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Durum Tarihi :{" "}
                                            <span className="text-gray-500">
                                                {formatDateTime(
                                                    item.DurumTarihi
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Minimum Su Kapasitesi :{" "}
                                            <span className="text-gray-500">
                                                {formatNumber(
                                                    item.MinimumSuKapasitesi
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Maksimum Su Yuksekligi :{" "}
                                            <span className="text-gray-500">
                                                {item.MaksimumSuYuksekligi}
                                            </span>
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
