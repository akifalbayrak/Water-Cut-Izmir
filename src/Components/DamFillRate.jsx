import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { formatDate } from "../utils/dateHelpers";
import { useLoading } from "../hooks/useLoading";
import Loading from "./Loading";

const DamFillRate = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/barajdurum"
                );
                const jsonData = await response.json();
                setData(jsonData);
                stopLoading();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Filter data based on search term
    const filteredData = data.filter((item) =>
        item.BarajKuyuAdi.toLocaleLowerCase("tr-TR").includes(
            searchTerm.toLocaleLowerCase("tr-TR")
        )
    );

    return (
        <main className="p-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto gap-4 flex flex-col">
            <section className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold text-center">
                    Baraj Doluluk Oranı
                </h1>
                <article className="flex items-center px-3 bg-white py-2 rounded-3xl border border-gray-300 text-2xl w-full md:w-[80%] lg:w-[50%]">
                    <IoIosSearch className="mr-2" />
                    <input
                        type="text"
                        placeholder="Baraj arayın..."
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
                    className="p-4 border bg-white border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400">
                    <h2 className="text-xl font-semibold my-2">
                        {item.BarajKuyuAdi}
                    </h2>
                    <article className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                            <strong className="font-semibold">
                                Su Durumu:
                            </strong>{" "}
                            {(item.SuDurumu / 1e6).toFixed(3) + " Mm³"}
                        </div>
                        <div>
                            <strong className="font-semibold">
                                Su Yüksekliği:
                            </strong>{" "}
                            {item.SuYuksekligi + " m³"}
                        </div>
                        <div>
                            <strong className="font-semibold">
                                Kullanılabilir Göl Su Hacmi:
                            </strong>{" "}
                            {(item.KullanılabilirGolSuHacmi / 1e6).toFixed(3) +
                                " Mm³"}
                        </div>
                        <div>
                            <strong className="font-semibold">
                                Tüketilebilir Su Kapasitesi:
                            </strong>{" "}
                            {(item.TuketilebilirSuKapasitesi / 1e6).toFixed(3) +
                                " Mm³"}
                        </div>
                        <div>
                            <strong className="font-semibold">
                                Maksimum Su Kapasitesi:
                            </strong>{" "}
                            {(item.MaksimumSuKapasitesi / 1e6).toFixed(3) +
                                " Mm³"}
                        </div>
                        <div>
                            <strong className="font-semibold">
                                Minimum Su Kapasitesi:
                            </strong>{" "}
                            {(item.MinimumSuKapasitesi / 1e6).toFixed(3) +
                                " Mm³"}
                        </div>
                        <div>
                            <strong className="font-semibold">
                                Doluluk Oranı:
                            </strong>{" "}
                            {item.DolulukOrani}%
                        </div>
                        <div>
                            <strong className="font-semibold">
                                Minimum Su Yüksekliği:
                            </strong>{" "}
                            {item.MinimumSuYuksekligi + " m³"}
                        </div>
                        <div>
                            <strong className="font-semibold">
                                Maksimum Su Yüksekliği:
                            </strong>{" "}
                            {item.MaksimumSuYuksekligi + " m³"}
                        </div>
                        <div>
                            <strong className="font-semibold">
                                Durum Tarihi:
                            </strong>{" "}
                            {formatDate(item.DurumTarihi)}
                        </div>
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

export default DamFillRate;
