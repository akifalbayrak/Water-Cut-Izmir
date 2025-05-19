import { Link } from "react-router-dom";
import { FaWater, FaCalendarAlt, FaMapMarkerAlt, FaLeaf, FaInfoCircle, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";
import waterPattern from '../assets/water-pattern.jpg';

const Home = () => {
    return (
        <section className="min-h-screen">
            {/* Hero Section with Gradient Background */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: `url(${waterPattern})`, opacity: 0.1 }}></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        İzmir Su Kesintisi Bilgilendirme
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                        İzmir'deki su kesintilerini takip edin, planlarınızı yapın ve kesintilerden minimum etkilenin
                    </p>
                    <Link 
                        to="/su-kesintisi" 
                        className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    >
                        Su Kesintisi Bilgisi İçin Tıklayın
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Özelliklerimiz</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <FaWater className="text-blue-600 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Güncel Bilgiler</h3>
                            <p className="text-gray-600">
                                En güncel su kesintisi bilgilerine anında erişin. Kesinti başlangıç ve bitiş saatleri, etkilenen bölgeler ve detaylı açıklamalar.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <FaCalendarAlt className="text-blue-600 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Planlama</h3>
                            <p className="text-gray-600">
                                Kesinti programlarını görüntüleyin, takviminize ekleyin ve günlük rutininizi buna göre planlayın.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <FaMapMarkerAlt className="text-blue-600 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Bölge Takibi</h3>
                            <p className="text-gray-600">
                                Bölgenizdeki su kesintilerini takip edin, alternatif su kaynaklarını öğrenin ve hazırlıklı olun.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <FaLeaf className="text-blue-600 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Su Tasarrufu</h3>
                            <p className="text-gray-600">
                                Su tasarrufu önerileri, su kullanım alışkanlıklarınızı değiştirin ve doğal kaynaklarımızı koruyun.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Information Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Önemli Bilgiler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <FaExclamationTriangle className="text-blue-600 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Kesinti Öncesi Hazırlık</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Su tankınızı doldurun</li>
                                <li>• Gerekli su miktarını hesaplayın</li>
                                <li>• Temel ihtiyaçlarınızı planlayın</li>
                                <li>• Alternatif su kaynaklarını belirleyin</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <FaInfoCircle className="text-blue-600 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Kesinti Sırasında</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Su kullanımını minimize edin</li>
                                <li>• Muslukları kontrol edin</li>
                                <li>• Acil durum numaralarını hazır bulundurun</li>
                                <li>• Güncel bilgileri takip edin</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <FaLightbulb className="text-blue-600 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Önemli Hatırlatmalar</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Su kesintisi öncesi deponuzu doldurmayı unutmayın</li>
                                <li>• Kesinti süresince su kullanımını minimize edin</li>
                                <li>• Musluklarınızı ve su tesisatınızı kontrol edin</li>
                                <li>• Acil durumlar için yedek su kaynağı bulundurun</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">İletişim ve Destek</h2>
                        <p className="text-gray-600 mb-8">
                            Su kesintileri hakkında bilgi almak, şikayet bildirmek veya önerilerinizi iletmek için 
                            aşağıdaki numaralardan bize ulaşabilirsiniz. 7/24 destek ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
                        </p>
                        <div className="space-y-4">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-gray-600">Ana İletişim Hattı:</span>
                                <a 
                                    href="tel:02322932293" 
                                    className="text-blue-600 text-xl font-semibold hover:text-blue-700 transition-colors"
                                >
                                    0 232 293 2293
                                </a>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-gray-600">Acil Durum Hattı:</span>
                                <a 
                                    href="tel:02322932000" 
                                    className="text-blue-600 text-xl font-semibold hover:text-blue-700 transition-colors"
                                >
                                    0 232 293 2000
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
