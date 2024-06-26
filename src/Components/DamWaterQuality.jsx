import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import Modal from "./Modal";

const DamWaterQuality = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [limitor, setLimitor] = useState(12);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/barajsukaliteraporlari"
                );
                const jsonData = await response.json();
                setLoading(false);
                setData(jsonData.BarajAnalizleri);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleDateString("tr-TR");
    };

    const changeInput = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                setLimitor((prev) => prev + 20);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className="DamWaterQuality px-8 py-4 lg:w-3/4 mx-auto bg-gray-100">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="items-center mb-2">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Baraj Listesi
                    </h1>
                </div>
            </div>
            <div className="relative mx-auto max-w-md my-2">
                <input
                    type="text"
                    placeholder="Ara"
                    onChange={changeInput}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <IoIosSearch className="text-gray-500" />
                </span>
            </div>
            <div className="card-container my-4 p-4 bg-white rounded-lg shadow-md">
                {loading && <p>Loading...</p>}
                {data && (
                    <div className="gap-4 grid grid-cols-2">
                        {data
                            .filter((item) =>
                                item.BarajAdi.toLowerCase().includes(
                                    searchTerm.toLowerCase()
                                )
                            )
                            .slice(0, limitor)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="card my-8 px-16 py-8 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-transform transform hover:scale-105 hover:shadow-lg"
                                    onClick={() => handleItemClick(item)}>
                                    <div>
                                        <p className="text-gray-700 font-bold">
                                            BarajAdi
                                        </p>
                                        <p className="text-gray-500">
                                            {item.BarajAdi}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 font-bold">
                                            Tarih
                                        </p>
                                        <p className="text-gray-500">
                                            {formatDateTime(item.Tarih)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        {data.filter((item) =>
                            item.BarajAdi.toLowerCase().includes(
                                searchTerm.toLowerCase()
                            )
                        ).length === 0 && (
                            <p>
                                No data found for{" "}
                                <span className="italic font-bold">
                                    {searchTerm}
                                </span>
                            </p>
                        )}
                    </div>
                )}
            </div>
            <Modal show={modalIsOpen} onClose={closeModal}>
                {selectedItem && (
                    <div className="modal-content ">
                        <h2 className="text-2xl font-bold mb-4">
                            {selectedItem.BarajAdi}
                        </h2>
                        <p className="mb-4">
                            Tarih: {formatDateTime(selectedItem.Tarih)}
                        </p>
                        {selectedItem.Analizler.map((analiz, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-lg font-semibold">
                                    Analiz Tipi: {analiz.AnalizTipAdi}
                                </p>
                                {analiz.AnalizElemanlari.map(
                                    (eleman, index) => (
                                        <div
                                            key={index}
                                            className="p-2 border-b border-gray-200">
                                            <p className="text-gray-700">
                                                <span className="font-semibold">
                                                    Parametre Adı:{" "}
                                                </span>
                                                {eleman.ParametreAdi}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-semibold">
                                                    Standart:{" "}
                                                </span>
                                                {eleman.Standart}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-semibold">
                                                    Birim:{" "}
                                                </span>
                                                {eleman.Birim}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-semibold">
                                                    İşlenmiş Su:{" "}
                                                </span>
                                                {eleman.IslenmisSu}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-semibold">
                                                    İşlenmemiş Su:{" "}
                                                </span>
                                                {eleman.IslenmemisSu}
                                            </p>
                                            {eleman.Regulasyon && (
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">
                                                        Regulasyon:{" "}
                                                    </span>
                                                    {eleman.Regulasyon}
                                                </p>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </main>
    );
};

export default DamWaterQuality;
