"use client";
import React from "react";
import data from "@/json/data.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Certificates = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-6 text-black">
        Certificates
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 gap-6">
        {data.certificates.map((cert, index) => (
          <div
            key={index}
            className="w-70 rounded-xl bg-white shadow-lg overflow-hidden hover:scale-105 transition transform"
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full p-2 rounded-xl h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xs font-semibold text-black mb-2">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3">{cert.issuer}</p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                View Certificate
              </a>
            </div>
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
          // navigation
        >
          {data.certificates.map((cert, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-xl bg-white shadow-lg overflow-hidden hover:scale-105 transition transform p-2">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full rounded-xl h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{cert.issuer}</p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-black transition"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Certificates;
