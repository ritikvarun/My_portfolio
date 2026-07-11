import React, { useState, useEffect } from "react";
import { getCertificates } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const resolveImage = (path) => {
  if (!path) return "";
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/uploads') || path.startsWith('uploads')) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'https://my-portfolio-kn46.onrender.com';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${backendUrl}${cleanPath}`;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath;
};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    getCertificates().then(setCertificates);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-6 text-black">
        Certificates
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="w-70 rounded-xl bg-white shadow-lg overflow-hidden hover:scale-105 transition transform flex flex-col justify-between"
          >
            <div>
              <img
                src={resolveImage(cert.image)}
                alt={cert.title}
                className="w-full p-2 rounded-xl h-40 object-cover"
                onError={(e) => {
                  if (!cert.image.startsWith('/uploads') && !cert.image.startsWith('http')) {
                    e.target.src = `http://localhost:3000/${cert.image.startsWith('/') ? '' : '/'}${cert.image}`;
                  }
                }}
              />
              <div className="p-4">
                <h3 className="text-xs font-semibold text-black mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{cert.issuer}</p>
              </div>
            </div>
            {cert.link && (
              <div className="p-4 pt-0">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
                >
                  View Certificate
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Carousel with Swiper */}
      <div className="md:hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {certificates.map((cert, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-xl bg-white shadow-lg overflow-hidden hover:scale-105 transition transform p-2 flex flex-col justify-between">
                <div>
                  <img
                    src={resolveImage(cert.image)}
                    alt={cert.title}
                    className="w-full rounded-xl h-40 object-cover"
                    onError={(e) => {
                      if (!cert.image.startsWith('/uploads') && !cert.image.startsWith('http')) {
                        e.target.src = `http://localhost:3000/${cert.image.startsWith('/') ? '' : '/'}${cert.image}`;
                      }
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">{cert.issuer}</p>
                  </div>
                </div>
                {cert.link && (
                  <div className="p-4 pt-0">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
                    >
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Certificates;
