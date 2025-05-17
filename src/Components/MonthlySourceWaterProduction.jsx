import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const MonthlySourceWaterProduction = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/suuretiminindagilimi"
                );
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            // Check if user reached bottom
            if (scrollTop + windowHeight >= fullHeight - 100) {
                setVisibleCount((prev) => prev + 10);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter data based on search term (always search all data)
    const filteredData = data.filter((item) =>
        item.UretimKaynagi?.toLocaleLowerCase("tr-TR").includes(
            searchTerm.toLowerCase()
        )
    );

    // If searching, show all matching results; otherwise, limit by visibleCount
    const displayedData = searchTerm
        ? filteredData
        : filteredData.slice(0, visibleCount);

    const formatMonth = (monthNum) => {
        return [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık",
        ][monthNum - 1];
    };

    return (
        <main className="p-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto gap-4 flex flex-col">
            <section className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold text-center">
                    Su Üretiminin Aylara ve Kaynaklara Göre Dağılımı
                </h1>
                <article className="flex items-center px-3 bg-white py-2 rounded-3xl border border-gray-300 text-2xl w-full md:w-[80%] lg:w-[50%]">
                    <IoIosSearch className="mr-2" />
                    <input
                        type="text"
                        placeholder="Üretim kaynağı ara"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setVisibleCount(10);
                        }}
                        className="text-lg bg-transparent border-none rounded w-full focus:outline-none focus:shadow-outline"
                    />
                </article>
            </section>
            {displayedData.map((item, index) => (
                <section
                    key={index}
                    className="p-4 border bg-white border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400">
                    <article className="my-4 flex flex-col md:flex-row items-center gap-4">
                        <h2 className="text-xl font-semibold my-2">
                            {item.UretimKaynagi}
                        </h2>
                        <p className="border w-fit p-2 rounded-md text-center">
                            {(item.UretimMiktari / 1000).toFixed(2)} m³
                        </p>
                        <p className="border w-fit p-2 rounded-md text-center">
                            {formatMonth(item.Ay)}
                        </p>
                    </article>
                </section>
            ))}
            {displayedData.length === 0 && (
                <p className="text-center text-lg">
                    Aradığınız kriterlere uygun veri bulunamadı.
                </p>
            )}
        </main>
    );
};

export default MonthlySourceWaterProduction;
