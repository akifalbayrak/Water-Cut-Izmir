import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 text-center justify-center flex items-center w-full">
      <p className="mx-3">© 2024 Tüm Hakları Saklıdır.</p>
      |
      <p className="mx-3">
        Veriler
        <a
          href="https://acikveri.bizizmir.com/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 ml-1"
        >
          Açık Veri İzmir Portalına Aittir.
        </a>
      </p>
      |
      <a className="mx-3 my-auto"
        href="https://github.com/akifalbayrak"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className="mx-2" />
      </a>
      <a className="mx-3 my-auto"
        href="https://github.com/ozancck"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className="mx-2" />
      </a>
    </footer>
  );
};

export default Footer;
