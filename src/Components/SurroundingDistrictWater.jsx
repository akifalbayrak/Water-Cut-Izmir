import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import Modal from "./Modal";
import { formatDate } from "../utils/dateHelpers";

const SurroundingDistrictWater = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPoint, setSelectedPoint] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/cevreilcesuanalizleri"
                );
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter(
        (item) =>
            item.IlceAdi.toLocaleLowerCase("tr-TR").includes(
                searchTerm.toLocaleLowerCase("tr-TR")
            ) ||
            item.Noktalar.some((n) =>
                n.Adres.toLocaleLowerCase("tr-TR").includes(
                    searchTerm.toLocaleLowerCase("tr-TR")
                )
            )
    );

    return (
        <main className="p-8 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto gap-4 flex flex-col">
            <section className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold text-center">
                    Çevre İlçe Merkezlerinin Güncel Analiz Sonuçları
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
            {filteredData.map((district, index) => (
                <section key={index} className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">
                        {district.IlceAdi} ({formatDate(district.AnalizTarihi)})
                    </h2>
                    {district.Noktalar.map((nokta, idx) => (
                        <article
                            key={idx}
                            className="p-4 border bg-white border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400"
                            onClick={() =>
                                setSelectedPoint({
                                    ilce: district.IlceAdi,
                                    tarih: district.AnalizTarihi,
                                    adres: nokta.Adres,
                                    analizler: nokta.NoktaAnalizleri,
                                })
                            }>
                            <h3 className="text-lg font-medium">
                                {nokta.Adres}
                            </h3>
                        </article>
                    ))}
                </section>
            ))}
            {filteredData.length === 0 && (
                <p className="text-center text-lg">
                    Aradığınız kriterlere uygun veri bulunamadı.
                </p>
            )}
            <Modal show={selectedPoint} onClose={() => setSelectedPoint(null)}>
                {selectedPoint && (
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">
                                {selectedPoint.ilce}
                            </h2>
                            <p>{selectedPoint.adres}</p>
                            <p>{formatDate(selectedPoint.tarih)}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedPoint.analizler.map((param, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-3">
                                        {param.ParametreAdi}
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Değer:</span>
                                            <span>
                                                {param.ParametreDegeri}{" "}
                                                {param.Birim.trim() !== ""
                                                    ? `(${param.Birim})`
                                                    : ""}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Standart:</span>
                                            <span>{param.Standart}</span>
                                        </div>
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

export default SurroundingDistrictWater;
