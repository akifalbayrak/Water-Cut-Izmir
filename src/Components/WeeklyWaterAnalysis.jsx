import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const WeeklyWaterAnalysis = () => {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/haftaliksuanalizleri"
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
        <main className="WeeklyWaterAnalysis px-8 py-4 lg:w-3/4 mx-auto ">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="items-center mb-2">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Haftalık Su Analiz Sonuçları
                    </h1>
                </div>
            </div>
            <div className="card-container my-4 p-4 rounded-lg shadow-md">
                {data.TumAnalizler && (
                    <>
                        <div className="my-4 p-6 rounded-lg shadow-md bg-white">
                            <p className="text-lg font-semibold text-gray-700">
                                {data.TumAnalizler[0].NoktaTanimi}
                            </p>
                            <p className="text-sm text-gray-500">
                                {data.TumAnalizler[0].Tarih}
                            </p>
                        </div>

                        <hr />
                        <div className="gap-4">
                            {data.TumAnalizler[0].analizSonuclari.map(
                                (item) => (
                                    <div className="p-6 rounded-xl border grid grid-cols-5 items-center space-x-4 my-2 bg-white shadow-md hover:border-gray-400 transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md">
                                        <div>
                                            <p class="text-gray-700 font-bold">
                                                Parametre Kodu
                                            </p>
                                            <p class="text-gray-500">
                                                {item.ParametreKodu.length > 0
                                                    ? item.ParametreKodu
                                                    : "--"}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-gray-700 font-bold">
                                                Parametre Adı
                                            </p>
                                            <p class="text-gray-500">
                                                {item.ParametreAdi.length > 0
                                                    ? item.ParametreAdi
                                                    : "--"}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-gray-700 font-bold">
                                                Birim
                                            </p>
                                            <p class="text-gray-500">
                                                {item.Birim !== " "
                                                    ? item.Birim
                                                    : "--"}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-gray-700 font-bold">
                                                Standart
                                            </p>
                                            <p class="text-gray-500">
                                                {item.Standart.length > 0
                                                    ? item.Standart
                                                    : "--"}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-gray-700 font-bold">
                                                Parametre Değeri
                                            </p>
                                            <p class="text-gray-500">
                                                {item.ParametreDegeri.length > 0
                                                    ? item.ParametreDegeri
                                                    : "--"}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default WeeklyWaterAnalysis;
