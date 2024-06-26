import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

const DamWaterQuality = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [limitor, setLimitor] = useState(12);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/barajsukaliteraporlari"
                );
                const jsonData = await response.json();
                setLoading(false);
                setData(jsonData.BarajAnalizleri);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        // Set up interval to fetch data every minute
        const interval = setInterval(fetchData, 60000); // 60000 milliseconds = 1 minute

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Function to handle item click and toggle selected item
    const handleItemClick = (item) => {
        if (selectedItem === item) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString("tr-TR");
    };

    const changeInput = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        data.filter((item) => {
            if (item.BarajAdi.includes(searchTerm)) {
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
        <main className="DamWaterQuality px-8 py-4 lg:w-3/4 mx-auto bg-gray-100">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="items-center mb-2">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Baraj Listesi
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
                    <div className="gap-4 grid grid-cols-2">
                        {data
                            .filter((item) =>
                                item.BarajAdi.toLowerCase().includes(
                                    searchTerm.toLowerCase()
                                )
                            )
                            .slice(0, limitor)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="card my-8 px-16 py-8 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-transform transform hover:scale-105 hover:shadow-lg"
                                    onClick={() => handleItemClick(item)}>
                                    <div>
                                        <p className="text-gray-700 font-bold">
                                            BarajAdi
                                        </p>
                                        <p className="text-gray-500">
                                            {item.BarajAdi}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 font-bold">
                                            Tarih
                                        </p>
                                        <p className="text-gray-500">
                                            {formatDateTime(item.Tarih)}
                                        </p>
                                    </div>
                                    <div>
                                        {item.Analizler.map((analiz, index) => (
                                            <div
                                                key={index}
                                                className={
                                                    selectedItem?.BarajAdi ===
                                                    item.BarajAdi
                                                        ? "block"
                                                        : "hidden"
                                                }>
                                                <p className="font-bold">
                                                    <div>
                                                        <p className="text-black">
                                                            AnalizTipAdi:{" "}
                                                        </p>
                                                        <span>
                                                            {
                                                                analiz.AnalizTipAdi
                                                            }
                                                        </span>
                                                    </div>
                                                </p>
                                                {analiz.AnalizElemanlari.map(
                                                    (eleman, index) => (
                                                        <div
                                                            key={index}
                                                            className="text-black">
                                                            <hr />
                                                            <p>
                                                                ParametreAdi:{" "}
                                                                <span className="text-gray-600">
                                                                    {
                                                                        eleman.ParametreAdi
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p>
                                                                Standart:{" "}
                                                                {
                                                                    eleman.Standart
                                                                }
                                                            </p>
                                                            <p>
                                                                Birim:{" "}
                                                                {eleman.Birim}
                                                            </p>
                                                            <p>
                                                                IslenmisSu:{" "}
                                                                {
                                                                    eleman.IslenmisSu
                                                                }
                                                            </p>
                                                            <p>
                                                                IslenmemisSu:{" "}
                                                                {
                                                                    eleman.IslenmemisSu
                                                                }
                                                            </p>
                                                            <p>
                                                                Regulasyon:{" "}
                                                                {
                                                                    eleman.Regulasyon
                                                                }
                                                            </p>
                                                            <hr />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        {data.filter((item) =>
                            item.BarajAdi.toLowerCase().includes(
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

export default DamWaterQuality;
