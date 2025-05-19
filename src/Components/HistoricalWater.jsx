import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const HistoricalWater = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/ibb/cbs/tarihisuyapilari"
                );
                const jsonData = await response.json();
                setData(jsonData.onemliyer);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Filter data based on search term
    const filteredData = data.filter(
        (item) =>
            item.ADI?.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.MAHALLE?.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.ILCE?.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            )
    );

    return (
        <main className="p-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto gap-4 flex flex-col">
            <section className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold text-center">
                    Tarihi Çeşmeler Listesi
                </h1>
                <article className="flex items-center px-3 bg-white py-2 rounded-3xl border border-gray-300 text-2xl w-full md:w-[80%] lg:w-[50%]">
                    <IoIosSearch className="mr-2" />
                    <input
                        type="text"
                        placeholder="Mahalle veya ilçe ara"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-lg bg-transparent border-none rounded w-full focus:outline-none focus:shadow-outline"
                    />
                </article>
            </section>
            {filteredData.map((item, index) => (
                <section
                    onClick={() => {
                        setSelectedData(index);
                        window.open(
                            `https://www.google.com/maps?q=${item.ENLEM},${item.BOYLAM}`,
                            "_blank"
                        );
                    }}
                    key={index}
                    className="p-4 border bg-white border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400">
                    <article className="my-4 flex flex-col md:flex-row items-center gap-4">
                        <h2 className="text-xl font-semibold my-2">
                            {item.ADI}
                        </h2>
                        <p className="border w-fit p-2 rounded-md text-center">
                            {item.ILCE}
                        </p>
                        <p className="border w-fit p-2 rounded-md text-center">
                            {item.MAHALLE}
                        </p>
                    </article>
                    {selectedData === index && (
                        <article>
                            <p>{item.ACIKLAMA}</p>
                        </article>
                    )}
                </section>
            ))}
        </main>
    );
};

export default HistoricalWater;
