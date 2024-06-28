import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const DepartmentCashDesk = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTerm1, setSearchTerm1] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/subeler"
                );
                const response1 = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/vezneler"
                );
                const jsonData = await response.json();
                const jsonData1 = await response1.json();
                setData(jsonData);
                setData1(jsonData1);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        // Set up interval to fetch data every 10 minutes
        const interval = setInterval(fetchData, 600000); // 600000 milliseconds = 10 minute

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const changeInput = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setSearchTerm1(e.target.value.toLowerCase());
    };

    const filteredData = data.filter(
        (item) =>
            item.SubeAdi?.toLowerCase().includes(searchTerm) ||
            item.SubeAdresi?.toLowerCase().includes(searchTerm) ||
            item.SubeTelefon?.includes(searchTerm)
    );

    const filteredData1 = data1.filter(
        (item) =>
            item.VezneAdi?.toLowerCase().includes(searchTerm1) ||
            item.VezneAdresi?.toLowerCase().includes(searchTerm1) ||
            item.Bolge?.toLowerCase().includes(searchTerm1)
    );

    return (
        <main className="DepartmentCashDesk my-4 px-8 py-4 lg:w-3/4 mx-auto ">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="items-center mb-2">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        İZSU Şube ve Vezne Bilgileri
                    </h1>
                </div>
            </div>

            <div className="relative mx-auto max-w-md my-2">
                <input
                    type="text"
                    placeholder="Şube & Vezne Ara"
                    onChange={changeInput}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <IoIosSearch className="text-gray-500" />
                </span>
            </div>
            <div className="card-container my-4 p-4 bg-white rounded-lg shadow-md">
                {loading && (
                    <p className="inline-block text-gray-500">Loading...</p>
                )}
                {filteredData && (
                    <>
                        <p className="font-semibold text-gray-800 my-4 text-3xl">
                            Şube Bilgileri
                        </p>
                        <hr className="border border-gray-400 my-2" />
                    </>
                )}
                {!loading && filteredData.length === 0 && (
                    <p className="inline-block text-gray-500">
                        No results found
                    </p>
                )}

                {!loading &&
                    filteredData.map((item, index) => (
                        <div
                            key={index}
                            className={`text-sm my-2 ${
                                item.AktifMi ? "text-black" : "text-red-800"
                            }`}>
                            <p className="font-semibold">{item.SubeAdi}</p>
                            <p className="text-xs">{item.SubeAdresi}</p>
                            <p>{item.SubeTelefon}</p>
                            <hr />
                        </div>
                    ))}
            </div>
            <div className="card-container my-4 p-4 bg-white rounded-lg shadow-md">
                {filteredData1 && (
                    <>
                        <p className="font-semibold text-gray-800 my-4 text-3xl">
                            Vezne Bilgileri
                        </p>
                        <hr className="border border-gray-400 my-2" />
                    </>
                )}
                {!loading && filteredData1.length === 0 && (
                    <p className="inline-block text-gray-500">
                        No results found
                    </p>
                )}
                {!loading &&
                    filteredData1.map((item, index) => (
                        <div
                            key={index}
                            className={`text-sm my-2 rounded-lg ${
                                item.AktifMi ? "text-black" : "text-red-800"
                            }`}>
                            <p className="font-semibold">{item.VezneAdi}</p>
                            <p className="text-xs">{item.VezneAdresi}</p>
                            <p>{item.Bolge}</p>
                            <hr />
                        </div>
                    ))}
            </div>
        </main>
    );
};

export default DepartmentCashDesk;
