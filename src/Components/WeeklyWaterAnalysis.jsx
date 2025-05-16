import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const WeeklyWaterAnalysis = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/haftaliksuanalizleri"
                );
                const jsonData = await response.json();
                setData(jsonData.TumAnalizler[0].analizSonuclari);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Filter data based on search term
    const filteredData = data.filter(
        (item) =>
            item.ParametreAdi.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLowerCase()
            ) ||
            item.ParametreKodu.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLowerCase()
            )
    );

    return (
        <main className="p-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto gap-4 flex flex-col">
            <section className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold text-center">
                    Haftalık Su Analiz Sonuçları
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
                    className="p-4 border bg-white border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400"
                    key={index}>
                    <article className="my-4 flex flex-col md:flex-row items-center gap-4">
                        <h2 className="text-xl font-semibold my-2">
                            {item.ParametreAdi +
                                " (" +
                                item.ParametreKodu +
                                ")"}
                        </h2>
                        {item.Birim !== " " && (
                            <p className="border w-fit p-2 rounded-md text-center">
                                {item.Birim}
                            </p>
                        )}
                        <p className="border w-fit p-2 rounded-md text-center">
                            {item.ParametreDegeri}
                        </p>
                        <p className="border w-fit p-2 rounded-md text-center">
                            {item.Standart}
                        </p>
                    </article>
                </section>
            ))}
        </main>
    );
};

export default WeeklyWaterAnalysis;
