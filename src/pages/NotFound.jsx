import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

function NotFound() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8">
                    <div className="relative">
                        <div className="text-9xl font-bold text-blue-100">404</div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg
                                className="w-32 h-32 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
                    Sayfa Bulunamadı
                </h1>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                    Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
                    Lütfen ana sayfaya dönerek devam edin.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg 
                             hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <IoHomeOutline className="mr-2 text-xl" />
                    Ana Sayfaya Dön
                </Link>
            </div>
        </main>
    );
}

export default NotFound; 