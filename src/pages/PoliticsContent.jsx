function PoliticsContent() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
                        Gizlilik Politikası
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Kişisel verilerinizin güvenliği ve gizliliği bizim için önemlidir. 
                        Bu politika, verilerinizin nasıl korunduğunu açıklar.
                    </p>
                </section>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Privacy Commitment */}
                    <section className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Gizlilik Taahhüdümüz
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bu uygulama, kullanıcıların kişisel verilerini gizli tutmayı taahhüt eder. 
                            Bu gizlilik politikası, bu uygulamanın kişisel verileri nasıl topladığı, 
                            kullanıcılar tarafından sağlanan verilerin nasıl kullanıldığı ve korunduğu 
                            hakkında bilgi sağlamak için tasarlanmıştır.
                        </p>
                    </section>

                    {/* Collected Information */}
                    <section className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Toplanan Bilgiler
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bu uygulama, kullanıcıların su kesintileri hakkında bilgi almak için bir API'ye bağlanır. 
                            Kullanıcılar tarafından sağlanan kişisel bilgiler (ad, e-posta, vb.) toplanmaz. 
                            Ancak, uygulama kullanıcı cihazının internet bağlantısını kullanır ve bu bağlantı 
                            üzerinden su kesintileri hakkında bilgi alır.
                        </p>
                    </section>

                    {/* Information Usage */}
                    <section className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Kullanılan Bilgiler
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bu uygulama, kullanıcıların cihazıyla ilgili herhangi bir kişisel bilgiyi 
                            saklamaz veya paylaşmaz. Sadece su kesintileri hakkında genel bilgilere 
                            erişim sağlar.
                        </p>
                    </section>

                    {/* Data Protection */}
                    <section className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Kişisel Verilerin Korunması
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bu uygulama, kullanıcıların kişisel verilerini korumak için uygun güvenlik 
                            önlemlerini alır. Bu, bilgilerin yetkisiz erişim, değiştirme, ifşa veya 
                            imha edilmesini önlemek için gereken teknik ve idari önlemleri içerir.
                        </p>
                    </section>

                    {/* Cookies */}
                    <section className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Çerezler
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bu uygulama, kullanıcı deneyimini iyileştirmek ve uygulama performansını 
                            izlemek için çerezleri kullanabilir. Ancak, bu çerezler kişisel bilgileri 
                            toplamaz veya saklamaz.
                        </p>
                    </section>

                    {/* Changes */}
                    <section className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Değişiklikler
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bu gizlilik politikası, değişiklikler yapma hakkını saklı tutar. 
                            Herhangi bir güncelleme yapıldığında, bu sayfada yayınlanacak ve 
                            kullanıcılara bildirilecektir.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            İletişim
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bu gizlilik politikası ile ilgili sorularınız veya endişeleriniz varsa, 
                            lütfen bizimle iletişime geçmekten çekinmeyin.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default PoliticsContent;
