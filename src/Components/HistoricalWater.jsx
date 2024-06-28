import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const HistoricalWater = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [limitor, setLimitor] = useState(10);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "https://openapi.izmir.bel.tr/api/ibb/cbs/tarihisuyapilari"
            );
            const jsonData = await response.json();
            setLoading(false);
            setData(jsonData.onemliyer);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Fetch data every minute
        return () => clearInterval(interval);
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(selectedItem === item ? null : item);
    };

    const changeInput = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                setLimitor((prev) => prev + 10);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className="HistoricalWater px-8 py-4 lg:w-3/4 mx-auto ">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="items-center mb-2">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Tarihi Çeşmeler Listesi
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
                {data && data.length > 0 ? (
                    data
                        .filter((item) => {
                            if (searchTerm === "") {
                                return item;
                            } else if (
                                item.ADI.toLowerCase().includes(searchTerm)
                            ) {
                                return item;
                            }
                            return null;
                        })
                        .slice(0, limitor)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="card-item cursor-pointer my-2 p-4 bg-gray-50 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-300"
                                onClick={() => handleItemClick(item)}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-700 font-bold">
                                            {item.ADI}
                                        </p>
                                        <p className="text-gray-700">
                                            <span>Konum: </span> {item.ILCE},{" "}
                                            {item.MAHALLE}, <span>No: </span>{" "}
                                            {item.KAPINO},<span>Sokak: </span>
                                            {item.YOL}
                                        </p>
                                    </div>
                                    <span className="text-gray-500">
                                        {selectedItem === item ? "▲" : "▼"}
                                    </span>
                                </div>
                                {selectedItem === item && (
                                    <div className="card-item-content mt-2">
                                        <p className="text-sm text-gray-700">
                                            {item.ACIKLAMA}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                ) : (
                    <p>Veri bulunamadı.</p>
                )}
            </div>
        </main>
    );
};

export default HistoricalWater;
