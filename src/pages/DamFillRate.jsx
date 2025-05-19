import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { formatDate } from "../utils/dateHelpers";
import { useLoading } from "../hooks/useLoading";
import Loading from "../_components/Loading";

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
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-8">
            <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] mx-auto space-y-6">
                <section className="flex flex-col justify-center items-center gap-6 py-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 tracking-tight">
                        Baraj Doluluk Oranı
                    </h1>
                    <p className="text-gray-600 text-center max-w-2xl">
                        İzmir'deki barajların güncel doluluk oranlarını ve su durumlarını takip edin.
                    </p>
                    <article className="flex items-center px-4 bg-white py-3 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-lg w-full md:w-[80%] lg:w-[60%]">
                        <IoIosSearch className="mr-3 text-blue-500 text-xl" />
                        <input
                            type="text"
                            placeholder="Baraj arayın..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-lg bg-transparent border-none rounded w-full focus:outline-none focus:ring-0 placeholder-gray-400"
                        />
                    </article>
                </section>

                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <Loading />
                    </div>
                )}

                <div className="grid gap-6">
                    {filteredData.map((item, index) => (
                        <section
                            key={index}
                            className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {item.BarajKuyuAdi}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        Son Güncelleme: {formatDate(item.DurumTarihi)}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-blue-700 mb-1">Su Durumu</h3>
                                    <p className="text-lg font-semibold text-blue-900">
                                        {(item.SuDurumu / 1e6).toFixed(3)} Mm³
                                    </p>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-green-700 mb-1">Doluluk Oranı</h3>
                                    <p className="text-lg font-semibold text-green-900">
                                        {item.DolulukOrani}%
                                    </p>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-purple-700 mb-1">Su Yüksekliği</h3>
                                    <p className="text-lg font-semibold text-purple-900">
                                        {item.SuYuksekligi} m³
                                    </p>
                                </div>

                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-indigo-700 mb-1">Kullanılabilir Göl Su Hacmi</h3>
                                    <p className="text-lg font-semibold text-indigo-900">
                                        {(item.KullanılabilirGolSuHacmi / 1e6).toFixed(3)} Mm³
                                    </p>
                                </div>

                                <div className="bg-pink-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-pink-700 mb-1">Tüketilebilir Su Kapasitesi</h3>
                                    <p className="text-lg font-semibold text-pink-900">
                                        {(item.TuketilebilirSuKapasitesi / 1e6).toFixed(3)} Mm³
                                    </p>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-yellow-700 mb-1">Maksimum Su Kapasitesi</h3>
                                    <p className="text-lg font-semibold text-yellow-900">
                                        {(item.MaksimumSuKapasitesi / 1e6).toFixed(3)} Mm³
                                    </p>
                                </div>

                                <div className="bg-red-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-red-700 mb-1">Minimum Su Kapasitesi</h3>
                                    <p className="text-lg font-semibold text-red-900">
                                        {(item.MinimumSuKapasitesi / 1e6).toFixed(3)} Mm³
                                    </p>
                                </div>

                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-orange-700 mb-1">Minimum Su Yüksekliği</h3>
                                    <p className="text-lg font-semibold text-orange-900">
                                        {item.MinimumSuYuksekligi} m³
                                    </p>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-teal-700 mb-1">Maksimum Su Yüksekliği</h3>
                                    <p className="text-lg font-semibold text-teal-900">
                                        {item.MaksimumSuYuksekligi} m³
                                    </p>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {!isLoading && filteredData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            Aradığınız kriterlere uygun veri bulunamadı.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default DamFillRate;
