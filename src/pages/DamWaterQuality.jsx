import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import Modal from "../_components/Modal";
import { formatDate } from "../utils/dateHelpers";
import { useLoading } from "../hooks/useLoading";
import Loading from "../_components/Loading";

// Individual parameter detail
const AnalizDetail = ({ eleman }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <h4 className="font-medium text-gray-800 mb-3">{eleman.ParametreAdi}</h4>
            <div className="space-y-2 text-sm">
                <DetailRow label="Standart" value={eleman.Standart} />
                <DetailRow label="Birim" value={eleman.Birim} />
                <DetailRow label="İşlenmiş Su" value={eleman.IslenmisSu} />
                <DetailRow label="İşlenmemiş Su" value={eleman.IslenmemisSu} />
                {eleman.Regulasyon && (
                    <DetailRow label="Regülasyon" value={eleman.Regulasyon} />
                )}
            </div>
        </div>
    );
};

// Row used for displaying label and value pairs
const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-1">
        <span className="text-gray-600">{label}:</span>
        <span className="font-medium text-gray-800">{value}</span>
    </div>
);

// Card for each dam entry
const AnalizCard = ({ item, onClick }) => (
    <section
        className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={onClick}>
        <article className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    {item.BarajAdi}
                </h2>
                <p className="text-sm text-gray-500">
                    Analiz Tarihi: {formatDate(item.Tarih)}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    Analiz Detayları
                </span>
            </div>
        </article>
    </section>
);

const DamWaterQuality = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/barajsukaliteraporlari"
                );
                const jsonData = await response.json();
                setData(jsonData.BarajAnalizleri);
                stopLoading();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter((item) =>
        item.BarajAdi.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-8">
            <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] mx-auto space-y-6">
                <section className="flex flex-col justify-center items-center gap-6 py-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 tracking-tight">
                        Su Kalite Raporları
                    </h1>
                    <p className="text-gray-600 text-center max-w-2xl">
                        İzmir'deki barajların su kalitesi analiz sonuçlarını takip edin.
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

                <div className="grid gap-4">
                    {filteredData.map((item, index) => (
                        <AnalizCard
                            key={index}
                            item={item}
                            onClick={() => setSelectedItem(item)}
                        />
                    ))}
                </div>

                {!isLoading && filteredData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            Aradığınız kriterlere uygun veri bulunamadı.
                        </p>
                    </div>
                )}

                <Modal show={selectedItem} onClose={() => setSelectedItem(null)}>
                    {selectedItem && (
                        <div className="p-6">
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {selectedItem.BarajAdi}
                                </h2>
                                <p className="text-gray-600">
                                    Analiz Tarihi: {formatDate(selectedItem.Tarih)}
                                </p>
                            </div>
                            {selectedItem.Analizler?.map((analiz, index) => (
                                <div
                                    key={index}
                                    className="mb-8 last:mb-0">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        {analiz.AnalizTipAdi}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {analiz.AnalizElemanlari?.map(
                                            (eleman, idx) => (
                                                <AnalizDetail
                                                    key={idx}
                                                    eleman={eleman}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal>
            </div>
        </main>
    );
};

export default DamWaterQuality;
