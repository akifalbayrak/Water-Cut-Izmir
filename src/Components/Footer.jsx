import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                    <div className="text-center md:text-left">
                        <p className="text-sm md:text-base">
                            © 2025 Tüm Hakları Saklıdır.
                        </p>
                        <p className="text-sm md:text-base mt-2">
                            Veriler{" "}
                            <a
                                href="https://acikveri.bizizmir.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-300 hover:text-blue-200 transition-colors inline-flex items-center">
                                Açık Veri İzmir Portalına Aittir
                                <FaExternalLinkAlt className="ml-1 text-xs" />
                            </a>
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/akifalbayrak"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors text-2xl"
                            aria-label="Akif Albayrak GitHub">
                            <FaGithub />
                        </a>
                        <a
                            href="https://github.com/ozancck"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors text-2xl"
                            aria-label="Ozan Çiçek GitHub">
                            <FaGithub />
                        </a>
                    </div>
                    <button
                        onClick={toggleModal}
                        className="text-sm font-medium">
                        Gizlilik Politikası
                    </button>
                </div>
                <div className="border-t border-gray-700 my-4"></div>
                <p className="text-xs text-gray-400 text-center">
                    İzmir Büyükşehir Belediyesi için geliştirilmiştir
                </p>
            </div>
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={toggleModal}>
                    <div
                        className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    Gizlilik Politikası
                                </h2>
                                <button
                                    onClick={toggleModal}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label="Close modal">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="prose prose-invert text-sm">
                                <p>
                                    Bu uygulama, kullanıcıların kişisel
                                    verilerini gizli tutmayı taahhüt eder. Bu
                                    gizlilik politikası, bu uygulamanın kişisel
                                    verileri nasıl topladığı, kullanıcılar
                                    tarafından sağlanan verilerin nasıl
                                    kullanıldığı ve korunduğu hakkında bilgi
                                    sağlamak için tasarlanmıştır.
                                </p>

                                <h3 className="font-semibold mt-4">
                                    Toplanan Bilgiler
                                </h3>
                                <p>
                                    Bu uygulama, kullanıcıların su kesintileri
                                    hakkında bilgi almak için bir API'ye
                                    bağlanır. Kullanıcılar tarafından sağlanan
                                    kişisel bilgiler (ad, e-posta, vb.)
                                    toplanmaz. Ancak, uygulama kullanıcı
                                    cihazının internet bağlantısını kullanır ve
                                    bu bağlantı üzerinden su kesintileri
                                    hakkında bilgi alır.
                                </p>
                                <h3 className="font-semibold mt-4">
                                    Kullanılan Bilgiler
                                </h3>
                                <p>
                                    Bu uygulama, kullanıcıların cihazıyla ilgili
                                    herhangi bir kişisel bilgiyi saklamaz veya
                                    paylaşmaz. Sadece su kesintileri hakkında
                                    genel bilgilere erişim sağlar.
                                </p>
                                <h3 className="font-semibold mt-4">
                                    Kişisel Verilerin Korunması
                                </h3>
                                <p>
                                    Bu uygulama, kullanıcıların kişisel
                                    verilerini korumak için uygun güvenlik
                                    önlemlerini alır. Bu, bilgilerin yetkisiz
                                    erişim, değiştirme, ifşa veya imha
                                    edilmesini önlemek için gereken teknik ve
                                    idari önlemleri içerir.
                                </p>
                                <h3 className="font-semibold mt-4">Çerezler</h3>
                                <p>
                                    Bu uygulama, kullanıcı deneyimini
                                    iyileştirmek ve uygulama performansını
                                    izlemek için çerezleri kullanabilir. Ancak,
                                    bu çerezler kişisel bilgileri toplamaz veya
                                    saklamaz.
                                </p>
                                <h3 className="font-semibold mt-4">
                                    Değişiklikler
                                </h3>
                                <p>
                                    Bu gizlilik politikası, değişiklikler yapma
                                    hakkını saklı tutar. Herhangi bir güncelleme
                                    yapıldığında, bu sayfada yayınlanacak ve
                                    kullanıcılara bildirilecektir.
                                </p>
                                <h3 className="font-semibold mt-4">İletişim</h3>
                                <p>
                                    Bu gizlilik politikası ile ilgili
                                    sorularınız veya endişeleriniz varsa, lütfen
                                    bizimle iletişime geçmekten çekinmeyin.
                                </p>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={toggleModal}
                                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md text-sm font-medium transition-colors">
                                    Kapat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
