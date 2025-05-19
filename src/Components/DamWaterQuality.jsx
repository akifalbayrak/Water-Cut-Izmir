import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import Modal from "./Modal";

// Format helper
const formatDate = (date) => new Date(date).toLocaleDateString("tr-TR");

// Individual parameter detail
const AnalizDetail = ({ eleman }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">
                {eleman.ParametreAdi}
            </h4>
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
    <div className="flex justify-between">
        <span className="text-gray-500">{label}:</span>
        <span className="font-medium">{value}</span>
    </div>
);

// Card for each dam entry
const AnalizCard = ({ item, onClick }) => (
    <section
        className="p-4 border bg-white border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400"
        onClick={onClick}>
        <article className="my-4 flex flex-col md:flex-row items-center gap-4">
            <h2 className="text-xl font-semibold my-2">{item.BarajAdi}</h2>
            <p className="border w-fit p-2 rounded-md text-center">
                {formatDate(item.Tarih)}
            </p>
        </article>
    </section>
);

const DamWaterQuality = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/barajsukaliteraporlari"
                );
                const jsonData = await response.json();
                setData(jsonData.BarajAnalizleri || []);
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
        <main className="p-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto gap-4 flex flex-col">
            <section className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold text-center">
                    Baraj Su Kalite Raporları
                </h1>
                <article className="flex items-center px-3 bg-white py-2 rounded-3xl border border-gray-300 text-2xl w-full md:w-[80%] lg:w-[50%]">
                    <IoIosSearch className="mr-2" />
                    <input
                        type="text"
                        placeholder="Baraj adı ara"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-lg bg-transparent border-none rounded w-full focus:outline-none focus:shadow-outline"
                    />
                </article>
            </section>

            {filteredData.map((item, index) => (
                <AnalizCard
                    key={index}
                    item={item}
                    onClick={() => setSelectedItem(item)}
                />
            ))}

            <Modal show={selectedItem} onClose={() => setSelectedItem(null)}>
                {selectedItem && (
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {selectedItem.BarajAdi}
                            </h2>
                            <p className="text-gray-600 mt-1">
                                <span className="font-medium">Tarih:</span>{" "}
                                {formatDate(selectedItem.Tarih)}
                            </p>
                        </div>

                        {selectedItem.Analizler?.map((analiz, index) => (
                            <div
                                key={index}
                                className="border-b border-gray-200 pb-6 last:border-0 mb-4">
                                <h3 className="text-xl font-semibold text-blue-600 mb-4">
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
        </main>
    );
};

export default DamWaterQuality;
