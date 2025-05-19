import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { useLoading } from "../hooks/useLoading";
import Loading from "../components/Loading";

const BlueFlagBeaches = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/ibb/cbs/mavibayrakplajlar"
                );
                const jsonData = await response.json();
                setData(jsonData.onemliyer);
                stopLoading();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Filter data based on search term
    const filteredData = data.filter(
        (item) =>
            item.ADI.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.ILCE.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.MAHALLE.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.YOL.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            )
    );

    return (
        <main className="p-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto gap-4 flex flex-col">
            <section className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold text-center">
                    Mavi Bayraklı Plajlar Listesi
                </h1>
                <article className="flex items-center px-3 bg-white py-2 rounded-3xl border border-gray-300 text-2xl w-full md:w-[80%] lg:w-[50%]">
                    <IoIosSearch className="mr-2" />
                    <input
                        type="text"
                        placeholder="Plaj, ilçe veya mahalle arayın..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-lg bg-transparent border-none rounded w-full focus:outline-none focus:shadow-outline"
                    />
                </article>
            </section>
            {isLoading && <Loading />}
            {filteredData.map((item, index) => (
                <section
                    key={index}
                    className="p-4 border bg-white border-gray-300 rounded-2xl hover:border-gray-400">
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
                        <p className="border w-fit p-2 rounded-md text-center">
                            {item.YOL}
                        </p>
                        <FaMapLocationDot
                            className="cursor-pointer text-2xl text-blue-600"
                            onClick={() => {
                                window.open(
                                    `https://www.google.com/maps?q=${item.ENLEM},${item.BOYLAM}`,
                                    "_blank"
                                );
                            }}
                        />
                    </article>
                </section>
            ))}
            {!isLoading && filteredData.length === 0 && (
                <p className="text-center text-lg">
                    Aradığınız kriterlere uygun veri bulunamadı.
                </p>
            )}
        </main>
    );
};

export default BlueFlagBeaches;
