import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const SurroundingDistrictWater = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [limitor, setLimitor] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/cevreilcesuanalizleri"
                );
                const jsonData = await response.json();
                setLoading(false);
                setData(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 600000); // 600000 milliseconds = 10 minutes
        return () => clearInterval(interval);
    }, []);

    const changeInput = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                setLimitor((prev) => prev + 5);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString("tr-TR");
    };

    // Filtering data based on the search term
    const filteredData = data.filter((item) =>
        item.IlceAdi.toLowerCase().includes(searchTerm)
    );

    return (
        <main className="SurroundingDistrictWater px-8 py-4 lg:w-3/4 mx-auto ">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="items-center mb-2">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Çevre İlçe Merkezlerinin Güncel Analiz Sonuçları
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
            <div className="my-4 p-6  rounded-lg shadow-lg">
                {loading && <p className="text-gray-500">Loading...</p>}
                {!loading && (
                    <>
                        {filteredData.length > 0 ? (
                            filteredData
                                .slice(0, limitor)
                                .map((item, index) => (
                                    <div key={index} className="mb-8 last:mb-0">
                                        <p className="text-lg font-semibold text-gray-700 flex flex-wrap items-center">
                                            <span>{item.IlceAdi}</span>
                                            <span className="mx-2 text-gray-500">
                                                -
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {formatDateTime(
                                                    item.AnalizTarihi
                                                )}
                                            </span>
                                        </p>
                                        {item.Noktalar.map(
                                            (nokta, noktaIndex) => (
                                                <div
                                                    key={noktaIndex}
                                                    className="mt-6 bg-white p-4 rounded-lg shadow-inner">
                                                    <p className="font-medium text-gray-800">
                                                        Nokta Adres:{" "}
                                                        <span className="font-normal">
                                                            {nokta.Adres}
                                                        </span>
                                                    </p>
                                                    <hr className="border-gray-200 my-3" />
                                                    <div>
                                                        {nokta.NoktaAnalizleri.map(
                                                            (
                                                                noktaAnalizi,
                                                                analizIndex
                                                            ) => (
                                                                <p
                                                                    key={
                                                                        analizIndex
                                                                    }
                                                                    className="flex flex-wrap gap-2 justify-start items-center text-sm text-gray-600 mb-2">
                                                                    <span className="font-semibold text-gray-700">
                                                                        {
                                                                            noktaAnalizi.ParametreAdi
                                                                        }
                                                                        :
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            noktaAnalizi.ParametreDegeri
                                                                        }
                                                                        {` (${noktaAnalizi.Standart})`}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {
                                                                            noktaAnalizi.Birim
                                                                        }
                                                                    </span>
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-500 text-center">
                                Sonuç bulunamadı.
                            </p>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default SurroundingDistrictWater;
