"use client";
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
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-center mb-8 text-gray-900 tracking-tight">
        Certificates & Credentials
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-8">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="group w-full rounded-2xl bg-white border border-gray-150 hover:border-gray-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="relative">
              <div className="relative aspect-video w-full overflow-hidden bg-gray-50 border-b border-gray-100 p-2">
                <img
                  src={resolveImage(cert.image)}
                  alt={cert.title}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-103 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    if (!cert.image.startsWith('/uploads') && !cert.image.startsWith('http')) {
                      e.target.src = `http://localhost:3000/${cert.image.startsWith('/') ? '' : '/'}${cert.image}`;
                    }
                  }}
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-1">
                  {cert.issuer}
                </span>
                <h3 className="text-base font-bold text-gray-950 line-clamp-2 leading-snug group-hover:text-black transition-colors">
                  {cert.title}
                </h3>
              </div>
            </div>
            {cert.link && (
              <div className="px-5 pb-5">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all w-full hover:shadow-md cursor-pointer"
                >
                  <span>View Certificate</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
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
          className="pb-12"
        >
          {certificates.map((cert, index) => (
            <SwiperSlide key={index}>
              <div className="group rounded-2xl bg-white border border-gray-150 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-3 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-50 rounded-xl mb-4">
                    <img
                      src={resolveImage(cert.image)}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (!cert.image.startsWith('/uploads') && !cert.image.startsWith('http')) {
                          e.target.src = `http://localhost:3000/${cert.image.startsWith('/') ? '' : '/'}${cert.image}`;
                        }
                      }}
                    />
                  </div>
                  <div className="px-2 pb-4">
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-1">
                      {cert.issuer}
                    </span>
                    <h3 className="text-base font-bold text-gray-950 mb-2 leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                </div>
                {cert.link && (
                  <div className="px-2 pb-2">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all w-full cursor-pointer"
                    >
                      <span>View Certificate</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
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
