import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const WaterCut = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/arizakaynaklisukesintileri"
                );
                const jsonData = await response.json();
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

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return (
            dateTime.toLocaleDateString("tr-TR") +
            " " +
            dateTime.toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    };

    function remainingTime(arizaGiderilmeTarihi) {
        // Parse the date
        const endDate = new Date(arizaGiderilmeTarihi);
        const now = new Date();

        // Calculate the difference in milliseconds
        const diff = endDate.getTime() - now.getTime();
        if (diff < 0) {
            return "";
        }

        // Convert milliseconds to minutes and seconds
        const totalSeconds = Math.abs(Math.floor(diff / 1000));
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        // Construct the remaining time string
        let remainingTimeStr = "";
        remainingTimeStr += `${days > 0 ? days + " gün " : ""}`;
        remainingTimeStr += `${hours > 0 ? hours + " saat " : ""}`;
        remainingTimeStr += `${minutes > 0 ? minutes + " dakika " : ""}`;

        return remainingTimeStr.trim();
    }

    // Function to handle item click and toggle selected item
    const handleItemClick = (item) => {
        if (selectedItem === item) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    // Function to filter data based on search term
    const filteredData = data.filter((item) => {
        const searchTermsArray = searchTerm
            .split(",")
            .map((term) => term.trim().toUpperCase());
        return searchTermsArray.some(
            (searchTerm) =>
                item.Mahalleler.toUpperCase().includes(searchTerm) ||
                item.IlceAdi.toUpperCase().includes(searchTerm)
        );
    });

    return (
        <main className="WaterCut p-8 lg:w-3/4 mx-auto ">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="flex items-center mb-8">
                    <h1 className="text-3xl font-bold text-center">
                        Aktif Su Kesintileri
                    </h1>
                </div>
                <div className="search-bar flex items-center px-3 rounded-3xl border border-gray-300 bg-gray-200 text-2xl w-full md:w-1/2">
                    <IoIosSearch className="mr-2 text-lg" />
                    <input
                        type="text"
                        placeholder="Mahalle veya ilçe ara"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 rounded-3xl focus:outline-none focus:border-blue-500 bg-gray-200 text-lg"
                    />
                </div>
            </div>
            <div className="card-container my-4 p-8">
                {filteredData.map((item, index) => (
                    <div
                        className="card my-4 px-16 py-8 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-transform transform hover:scale-105 hover:shadow-lg"
                        key={index}
                        onClick={() => handleItemClick(item)}>
                        <h2 className="text-xl font-semibold my-2">
                            {item.IlceAdi}
                        </h2>
                        <div className="my-4">
                            <strong className="text-black mx-3 mb-2">
                                Mahalleler
                            </strong>
                            <div className="flex flex-wrap gap-2 mt-2 md:flex-wrap-wrap md:justify-content-center">
                                {item.Mahalleler.split(",").map(
                                    (mahalle, index) => (
                                        <span
                                            key={index}
                                            className="border p-2 mx-2 md:mx-4 lg:mx-6 rounded-md text-center">
                                            {mahalle.trim()}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {selectedItem === item && (
                            <div>
                                <p className="my-4">
                                    <strong className="text-black mx-3">
                                        Kesinti Tarihi:
                                    </strong>
                                    {formatDateTime(item.KesintiTarihi)}
                                </p>
                                <p className="my-4">
                                    <strong className="text-black mx-3">
                                        Açıklama:
                                    </strong>
                                    {item.Aciklama}
                                </p>
                                <p className="my-4">
                                    <strong className="text-black mx-3">
                                        Tip:
                                    </strong>
                                    {item.Tip}
                                </p>
                                <p className="my-4">
                                    <strong className="text-black mx-3">
                                        Ariza Giderilme Tarihi:
                                    </strong>
                                    {formatDateTime(item.ArizaGiderilmeTarihi)}
                                </p>
                                <p className="my-4">
                                    <strong className="text-black mx-3">
                                        Birim:
                                    </strong>
                                    {item.Birim}
                                </p>
                                <p className="my-4">
                                    <strong className="text-black mx-3">
                                        Kesinti Suresi :
                                    </strong>
                                    {item.KesintiSuresi}
                                </p>
                                <p className="my-4">
                                    <strong className="text-black mx-3">
                                        Guncelleme Tarihi:
                                    </strong>
                                    {formatDateTime(item.GuncellemeTarihi)}
                                </p>
                                {remainingTime(item.ArizaGiderilmeTarihi) && (
                                    <p className="my-4">
                                        <strong className="text-black mx-3">
                                            Arızanın Giderilme Süresine Kalan
                                            Süre:
                                        </strong>
                                        {remainingTime(
                                            item.ArizaGiderilmeTarihi
                                        )}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
};

export default WaterCut;
