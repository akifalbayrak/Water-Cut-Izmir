import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import Modal from "../_components/Modal";
import { formatDate } from "../utils/dateHelpers";
import { useLoading } from "../hooks/useLoading";
import Loading from "../_components/Loading";

// Individual parameter detail component
const AnalizDetail = ({ parametre }) => (
    <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
        <h4 className="font-medium text-gray-800 mb-3">{parametre.ParametreAdi}</h4>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Değer:</span>
                <span className="font-medium text-gray-800">
                    {parametre.ParametreDegeri} {parametre.Birim.trim() !== "" ? `(${parametre.Birim})` : ""}
                </span>
            </div>
            <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Standart:</span>
                <span className="font-medium text-gray-800">{parametre.Standart}</span>
            </div>
        </div>
    </div>
);

// District card component
const DistrictCard = ({ district, onPointClick }) => (
    <section className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {district.IlceAdi}
            </h2>
            <p className="text-sm text-gray-500">
                Analiz Tarihi: {formatDate(district.AnalizTarihi)}
            </p>
        </div>
        <div className="grid gap-3">
            {district.Noktalar.map((nokta, idx) => (
                <article
                    key={idx}
                    onClick={() => onPointClick({
                        ilce: district.IlceAdi,
                        tarih: district.AnalizTarihi,
                        adres: nokta.Adres,
                        analizler: nokta.NoktaAnalizleri,
                    })}
                    className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {nokta.Adres}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            {nokta.NoktaAnalizleri.length} Parametre
                        </span>
                    </div>
                </article>
            ))}
        </div>
    </section>
);

const SurroundingDistrictWater = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPoint, setSelectedPoint] = useState(null);
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const response = await fetch(
                    "https://openapi.izmir.bel.tr/api/izsu/cevreilcesuanalizleri"
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
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-8">
            <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] mx-auto space-y-6">
                <section className="flex flex-col justify-center items-center gap-6 py-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 tracking-tight">
                        Çevre İlçe Merkezlerinin Güncel Analiz Sonuçları
                    </h1>
                    <p className="text-gray-600 text-center max-w-2xl">
                        İzmir'in çevre ilçelerindeki su kalitesi analiz sonuçlarını takip edin.
                    </p>
                    <article className="flex items-center px-4 bg-white py-3 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-lg w-full md:w-[80%] lg:w-[60%]">
                        <IoIosSearch className="mr-3 text-blue-500 text-xl" />
                        <input
                            type="text"
                            placeholder="İlçe veya adres arayın..."
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
                    {filteredData.map((district, index) => (
                        <DistrictCard
                            key={index}
                            district={district}
                            onPointClick={setSelectedPoint}
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

                <Modal show={selectedPoint} onClose={() => setSelectedPoint(null)}>
                    {selectedPoint && (
                        <div className="p-6">
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {selectedPoint.ilce}
                                </h2>
                                <p className="text-gray-600 mb-1">
                                    {selectedPoint.adres}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Analiz Tarihi: {formatDate(selectedPoint.tarih)}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedPoint.analizler.map((param, i) => (
                                    <AnalizDetail key={i} parametre={param} />
                                ))}
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </main>
    );
};

export default SurroundingDistrictWater;
