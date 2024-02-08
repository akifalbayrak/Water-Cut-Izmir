import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDropletSlash } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <>
      <header className="bg-white text-gray-800 py-4 flex justify-center">
      <div className="container flex items-center justify-center my-8">
          <FontAwesomeIcon icon={faDropletSlash} className="text-sky-300 text-5xl mx-4" />
          <h1 className="text-3xl font-bold mx-4">İzmir Büyükşehir Belediyesi Aktif Su Kesintileri Bilgilendirme Sayfası</h1>
        </div>
      </header>
      <hr className="border-b border-gray-200" />
    </>
  );
};

export default Header;
