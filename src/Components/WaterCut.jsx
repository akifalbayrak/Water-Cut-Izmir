import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { formatDateTime } from "../utils/dateHelpers";
import { useLoading } from "../hooks/useLoading";
import Loading from "./Loading";

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
        <main className="p-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto gap-4 flex flex-col">
            <section className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold text-center">
                    Aktif Su Kesintileri
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
            {isLoading && <Loading />}
            {filteredData.map((item, index) => (
                <section
                    className="p-4 border bg-white border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400"
                    key={index}
                    onClick={() => {
                        if (selectedItem === item) {
                            setSelectedItem(null);
                            return;
                        }
                        setSelectedItem(item);
                    }}>
                    <article className="my-4 flex flex-col md:flex-row items-center gap-4">
                        <h2 className="text-xl font-semibold my-2">
                            {item.IlceAdi}
                        </h2>
                        {item.Mahalleler.split(",").map((mahalle, index) => (
                            <p
                                key={index}
                                className="border w-fit p-2 rounded-md text-center">
                                {mahalle}
                            </p>
                        ))}
                    </article>
                    {selectedItem === item && (
                        <article>
                            <p className="my-4">
                                <strong className="mr-1">Açıklama:</strong>
                                {item.Aciklama}
                            </p>
                            <p className="my-4">
                                <strong className="mr-1">
                                    Kesinti Süresi:
                                </strong>
                                <span>{item.KesintiSuresi}</span>
                            </p>
                            <p className="my-4">
                                <strong className="mr-1">Birim:</strong>
                                {item.Birim}
                            </p>
                            <p className="my-4">
                                <strong className="mr-1">Tip:</strong>
                                {item.Tip}
                            </p>
                            <p className="my-4">
                                <strong className="mr-1">
                                    Kesinti Tarihi:
                                </strong>
                                {formatDateTime(item.KesintiTarihi)}
                            </p>
                            <p className="my-4">
                                <strong className="mr-1">
                                    Arıza Giderilme Tarihi:
                                </strong>
                                {formatDateTime(item.ArizaGiderilmeTarihi)}
                            </p>
                            {remainingTime(item.ArizaGiderilmeTarihi) && (
                                <p className="my-4">
                                    <strong className="mr-1">
                                        Arızanın Giderilme Süresine Kalan Süre:
                                    </strong>
                                    {remainingTime(item.ArizaGiderilmeTarihi)}
                                </p>
                            )}
                        </article>
                    )}
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

export default WaterCut;
