import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

const DamList = () => {
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
                    "https://openapi.izmir.bel.tr/api/izsu/barajvekuyular"
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

    const changeInput = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        data.filter((item) => {
            if (item.Adi.includes(searchTerm)) {
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
        <main className="DamList px-8 py-4 lg:w-3/4 mx-auto bg-gray-100">
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
                    <div className="gap-4 grid grid-cols-4">
                        {data
                            .filter((item) =>
                                item.Adi.toLowerCase().includes(
                                    searchTerm.toLowerCase()
                                )
                            )
                            .slice(0, limitor)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="card my-4 px-16 py-8 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-transform transform hover:scale-105 hover:shadow-lg"
                                    onClick={() => handleItemClick(item)}>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Adi{" "}
                                        </p>
                                        <p class="text-gray-500">{item.Adi}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            TurAdi{" "}
                                        </p>
                                        <p class="text-gray-500">
                                            {item.TurAdi}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Enlem
                                        </p>
                                        <p class="text-gray-500">
                                            {item.Enlem ? item.Enlem : "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-gray-700 font-bold">
                                            Boylam
                                        </p>
                                        <p class="text-gray-500">
                                            {item.Boylam ? item.Boylam : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        {data.filter((item) =>
                            item.Adi.toLowerCase().includes(
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

export default DamList;