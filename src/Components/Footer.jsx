import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <footer className="bg-gray-200 p-4 text-center justify-center flex items-center w-full">
            <p className="mx-3">© 2024 Tüm Hakları Saklıdır.</p>|
            <p className="mx-3">
                Veriler
                <a
                    href="https://acikveri.bizizmir.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 ml-1">
                    Açık Veri İzmir Portalına Aittir.
                </a>
            </p>
            |
            <a
                className="mx-3 my-auto"
                href="https://github.com/akifalbayrak"
                target="_blank"
                rel="noopener noreferrer">
                <FaGithub className="mx-2" />
            </a>
            <a
                className="mx-3 my-auto"
                href="https://github.com/ozancck"
                target="_blank"
                rel="noopener noreferrer">
                <FaGithub className="mx-2" />
            </a>
            |
            <button className="mx-3 my-auto" onClick={toggleModal}>
                Gizlilik Politikası
            </button>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">
                            Gizlilik Politikası
                        </h2>
                        <p>
                            Gizlilik Politikası Bu uygulama, kullanıcıların
                            kişisel verilerini gizli tutmayı taahhüt eder. Bu
                            gizlilik politikası, bu uygulamanın kişisel verileri
                            nasıl topladığı, kullanıcılar tarafından sağlanan
                            verilerin nasıl kullanıldığı ve korunduğu hakkında
                            bilgi sağlamak için tasarlanmıştır. Toplanan
                            Bilgiler Bu uygulama, kullanıcıların su kesintileri
                            hakkında bilgi almak için bir API'ye bağlanır.
                            Kullanıcılar tarafından sağlanan kişisel bilgiler
                            (ad, e-posta, vb.) toplanmaz. Ancak, uygulama
                            kullanıcı cihazının internet bağlantısını kullanır
                            ve bu bağlantı üzerinden su kesintileri hakkında
                            bilgi alır. Kullanılan Bilgiler Bu uygulama,
                            kullanıcıların cihazıyla ilgili herhangi bir kişisel
                            bilgiyi saklamaz veya paylaşmaz. Sadece su
                            kesintileri hakkında genel bilgilere erişim sağlar.
                            Kişisel Verilerin Korunması Bu uygulama,
                            kullanıcıların kişisel verilerini korumak için uygun
                            güvenlik önlemlerini alır. Bu, bilgilerin yetkisiz
                            erişim, değiştirme, ifşa veya imha edilmesini
                            önlemek için gereken teknik ve idari önlemleri
                            içerir. Çerezler Bu uygulama, kullanıcı deneyimini
                            iyileştirmek ve uygulama performansını izlemek için
                            çerezleri kullanabilir. Ancak, bu çerezler kişisel
                            bilgileri toplamaz veya saklamaz. Değişiklikler Bu
                            gizlilik politikası, değişiklikler yapma hakkını
                            saklı tutar. Herhangi bir güncelleme yapıldığında,
                            bu sayfada yayınlanacak ve kullanıcılara
                            bildirilecektir. İletişim Bu gizlilik politikası ile
                            ilgili sorularınız veya endişeleriniz varsa, lütfen
                            bizimle iletişime geçmekten çekinmeyin.
                        </p>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={toggleModal}>
                            Kapat
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
