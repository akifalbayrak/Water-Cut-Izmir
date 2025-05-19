import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { formatDateTime } from "../utils/dateHelpers";
import { useLoading } from "../hooks/useLoading";
import Loading from "../_components/Loading";

const WaterCut = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/arizakaynaklisukesintileri"
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

    function remainingTime(arizaGiderilmeTarihi) {
        // Parse the date
        const endDate = new Date(arizaGiderilmeTarihi);
        const now = new Date();

        // Calculate the difference in milliseconds
        const diff = endDate.getTime() - now.getTime();
        if (diff < 0) {
            return null;
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

    // Function to filter data based on search term
    const filteredData = data.filter((item) => {
        return (
            item.IlceAdi.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.Mahalleler.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            )
        );
    });

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-8">
            <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] mx-auto space-y-6">
                <section className="flex flex-col justify-center items-center gap-6 py-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 tracking-tight">
                        Su Kesintileri
                    </h1>
                    <p className="text-gray-600 text-center max-w-2xl">
                        İzmir'deki aktif su kesintilerini takip edin. İlçe veya mahalle adına göre arama yapabilirsiniz.
                    </p>
                    <article className="flex items-center px-4 bg-white py-3 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-lg w-full md:w-[80%] lg:w-[60%]">
                        <IoIosSearch className="mr-3 text-blue-500 text-xl" />
                        <input
                            type="text"
                            placeholder="İlçe veya mahalle arayın..."
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

                <div className="grid gap-4">
                    {filteredData.map((item, index) => (
                        <section
                            className={`p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                                selectedItem === item ? 'ring-2 ring-blue-500' : ''
                            }`}
                            key={index}
                            onClick={() => {
                                if (selectedItem === item) {
                                    setSelectedItem(null);
                                    return;
                                }
                                setSelectedItem(item);
                            }}>
                            <article className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {item.IlceAdi}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {item.Mahalleler.split(",").map((mahalle, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                            {mahalle.trim()}
                                        </span>
                                    ))}
                                </div>
                            </article>

                            {selectedItem === item && (
                                <article className="mt-6 space-y-4 border-t border-gray-100 pt-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <p className="flex items-start">
                                                <strong className="text-gray-700 min-w-[140px]">Açıklama:</strong>
                                                <span className="text-gray-600">{item.Aciklama}</span>
                                            </p>
                                            <p className="flex items-center">
                                                <strong className="text-gray-700 min-w-[140px]">Kesinti Süresi:</strong>
                                                <span className="text-gray-600">{item.KesintiSuresi}</span>
                                            </p>
                                            <p className="flex items-center">
                                                <strong className="text-gray-700 min-w-[140px]">Birim:</strong>
                                                <span className="text-gray-600">{item.Birim}</span>
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="flex items-center">
                                                <strong className="text-gray-700 min-w-[140px]">Tip:</strong>
                                                <span className="text-gray-600">{item.Tip}</span>
                                            </p>
                                            <p className="flex items-center">
                                                <strong className="text-gray-700 min-w-[140px]">Kesinti Tarihi:</strong>
                                                <span className="text-gray-600">{formatDateTime(item.KesintiTarihi)}</span>
                                            </p>
                                            <p className="flex items-center">
                                                <strong className="text-gray-700 min-w-[140px]">Arıza Giderilme:</strong>
                                                <span className="text-gray-600">{formatDateTime(item.ArizaGiderilmeTarihi)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {remainingTime(item.ArizaGiderilmeTarihi) && (
                                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                            <p className="flex items-center text-blue-700">
                                                <strong className="mr-2">Arızanın Giderilme Süresine Kalan Süre:</strong>
                                                <span className="font-semibold">{remainingTime(item.ArizaGiderilmeTarihi)}</span>
                                            </p>
                                        </div>
                                    )}
                                </article>
                            )}
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

export default WaterCut;
