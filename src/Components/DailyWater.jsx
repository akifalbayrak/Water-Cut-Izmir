import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const DailyWater = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/gunluksuuretimi"
                );
                const jsonData = await response.json();
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
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString("tr-TR");
    };

    return (
        <main className="DailyWater px-8 py-4 lg:w-3/4 mx-auto bg-gray-100">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="items-center mb-2">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Günlük Su Üretimi
                    </h1>
                    <h3 className="text-2xl text-center text-gray-800">
                        {formatDateTime(data.UretimTarihi)}
                    </h3>
                </div>
            </div>
            <div className="card-container my-4 p-4 bg-white rounded-lg shadow-md">
                {data.BarajKuyuUretimleri && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.BarajKuyuUretimleri.map((item) => (
                            <div
                                key={item.BarajKuyuId}
                                className={`card border rounded-md cursor-pointer hover:bg-gray-100 ${
                                    selectedItem === item ? "bg-gray-200" : ""
                                }`}>
                                <div className="card-header flex justify-between px-4 py-2">
                                    <h2 className="card-title text-lg font-medium text-gray-800">
                                        {item.BarajKuyuAdi}
                                    </h2>
                                    <span className="card-date text-gray-600 text-sm"></span>
                                </div>
                                <div className="card-body px-4 py-2">
                                    <p className="card-value text-gray-800 font-bold">
                                        {item.UretimMiktari.toLocaleString()} m³
                                    </p>
                                    <p className="card-type text-gray-600 text-sm">
                                        {item.TurAdi}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default DailyWater;
