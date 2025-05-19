import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import Modal from "./Modal";

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
                setData(jsonData.BarajAnalizleri);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString("tr-TR");
    };

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
                        placeholder="Mahalle veya ilçe ara"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-lg bg-transparent border-none rounded w-full focus:outline-none focus:shadow-outline"
                    />
                </article>
            </section>
            {data.map((item, index) => (
                <section
                    key={index}
                    className="p-4 border bg-white border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400"
                    onClick={() => setSelectedItem(item)}>
                    <article className="my-4 flex flex-col md:flex-row items-center gap-4">
                        <h2 className="text-xl font-semibold my-2">
                            {item.BarajAdi}
                        </h2>
                        <p className="border w-fit p-2 rounded-md text-center">
                            {formatDateTime(item.Tarih)}
                        </p>
                    </article>
                </section>
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
                                {formatDateTime(selectedItem.Tarih)}
                            </p>
                        </div>
                        <div className="space-y-6">
                            {selectedItem.Analizler.map((analiz, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-200 pb-6 last:border-0">
                                    <h3 className="text-xl font-semibold text-blue-600 mb-4">
                                        {analiz.AnalizTipAdi}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {analiz.AnalizElemanlari.map(
                                            (eleman, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-gray-50 p-4 rounded-lg">
                                                    <h4 className="font-medium text-gray-800 mb-3">
                                                        {eleman.ParametreAdi}
                                                    </h4>

                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">
                                                                Standart:
                                                            </span>
                                                            <span className="font-medium">
                                                                {
                                                                    eleman.Standart
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">
                                                                Birim:
                                                            </span>
                                                            <span className="font-medium">
                                                                {eleman.Birim}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">
                                                                İşlenmiş Su:
                                                            </span>
                                                            <span className="font-medium">
                                                                {
                                                                    eleman.IslenmisSu
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">
                                                                İşlenmemiş Su:
                                                            </span>
                                                            <span className="font-medium">
                                                                {
                                                                    eleman.IslenmemisSu
                                                                }
                                                            </span>
                                                        </div>
                                                        {eleman.Regulasyon && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">
                                                                    Regülasyon:
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        eleman.Regulasyon
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </main>
    );
};

export default DamWaterQuality;
