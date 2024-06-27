import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

const MonthlySourceWaterProduction = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [limitor, setLimitor] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/suuretiminindagilimi"
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

    // Function to format date and time
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

    const changeInput = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        data.filter((item) => {
            if (item.UretimKaynagi.includes(searchTerm)) {
                return item;
            }
        });
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
        <main className="MonthlySourceWaterProduction px-8 py-4 lg:w-3/4 mx-auto bg-gray-100">
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
                    <div className="gap-4">
                        {data
                            .filter((item) =>
                                item.UretimKaynagi.toLowerCase().includes(
                                    searchTerm.toLowerCase()
                                )
                            )
                            .slice(0, limitor)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-xl border grid grid-cols-5 items-center space-x-4 my-2 bg-white">
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Uretim Kaynagi
                                        </p>
                                        <p class="text-gray-500">
                                            {item.UretimKaynagi}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Uretim Miktari
                                        </p>
                                        <p class="text-gray-500">
                                            {item.UretimMiktari / 1000}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Yil
                                        </p>
                                        <p class="text-gray-500">{item.Yil}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Ay
                                        </p>
                                        <p class="text-gray-500">
                                            {formatMonth(item.Ay)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        {data.filter((item) =>
                            item.UretimKaynagi.toLowerCase().includes(
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

export default MonthlySourceWaterProduction;
