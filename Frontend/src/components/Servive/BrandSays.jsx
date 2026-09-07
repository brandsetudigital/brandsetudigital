import React, { memo, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/Services.css";
import "../../App.css";
import { motion, AnimatePresence } from "framer-motion";
import TechCorpLogo from "../../assets/tech-corp.png";
import TechCorpWork from "../../assets/top-web-development-company.png";

const img = (url) =>
  `${url}?auto=format&fit=crop&w=480&q=50`;

const brands = [
  {
    name: "UrbanNest",
    logo: "https://dummyimage.com/140x50/000/fff&text=UrbanNest",
    says:
      "BrandSetu didn’t just promote us - they shaped how people feel about our brand.",
    work: "Influencer Marketing • CGI Ads • Social Media Strategy",
    images: [
      img("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhgU-IKrEg7P61A6lk7ReEBb0XCTj_t0wHw&s"),
      img("https://images.unsplash.com/photo-1556761175-5973dc0f32e7"),
      img("https://images.unsplash.com/photo-1521737604893-d14cc237f11d"),
      img("https://images.unsplash.com/photo-1555066931-4365d14bab8c"),
    ],
  },
  {
    name: "FreshBites",
    logo: "https://dummyimage.com/140x50/000/fff&text=FreshBites",
    says:
      "The visuals, campaigns, and brand voice felt premium, modern, and truly us.",
    work: "Branding • Product Shoot • Performance Ads",
    images: [
      img("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9zgr5P_fXsrTLB2V68Ny5hd9jc-BmiFyI-w&s"),
      img("https://images.unsplash.com/photo-1545235617-9465d2a55698"),
      img("https://images.unsplash.com/photo-1611926653458-09294b3142bf"),
      img("https://images.unsplash.com/photo-1504805572947-34fad45aed93"),
    ],
  },
  {
    name: "TechCorp",
    logo: TechCorpLogo,
    says:
      "BrandSetu made our launch campaigns feel cinematic and professional.",
    work: "App Development • Website Design • SEO",
    images: [
      TechCorpWork,
      img("https://images.unsplash.com/photo-1562577309-4932fdd64cd1"),
      img("https://images.unsplash.com/photo-1556761175-b413da4baf72"),
      img("https://images.unsplash.com/photo-1519389950473-47ba0277781c"),
    ],
  },
  {
    name: "EcoWorld",
    logo: "https://dummyimage.com/140x50/000/fff&text=EcoWorld",
    says: "Sustainable campaigns that truly resonate with eco-conscious users.",
    work: "Social Media • Awareness Campaigns • Content Marketing",
    images: [
      img("https://static.vecteezy.com/system/resources/thumbnails/006/862/790/small/ecology-bulb-lamp-with-leaf-logo-energy-saving-lamp-symbol-icon-eco-friendly-eco-world-green-leaf-energy-saving-lamp-symbol-free-vector.jpg"),
      img("https://images.unsplash.com/photo-1506744038136-46273834b3fb"),
      img("https://images.unsplash.com/photo-1522202176988-66273c2fd55f"),
      img("https://images.unsplash.com/photo-1498050108023-c5249f4df085"),
    ],
  },
  {
    name: "StyleHub",
    logo: "https://dummyimage.com/140x50/000/fff&text=StyleHub",
    says: "Modern branding that aligns perfectly with fashion-forward audiences.",
    work: "Branding • Influencer Collaboration • Visual Storytelling",
    images: [
      img("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0N1PRGOgzp4H9dHTWGFGhu3cBjv5bI-lDEg&s"),
      img("https://yt3.googleusercontent.com/WA9LcDa5vNRj5A7Z6lwE8XrvhfuSt7YPtPHJOMiOot-VBjUV8xDdJ-Twtyqp_aMGaFUJSqHWIQ=s900-c-k-c0x00ffffff-no-rj"),
      img("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42Yh-qmxFtalkn7vK1DR38Tn0AIzxO4McgA&s"),
      img("https://www.nextbrand.com/cdn/shop/files/StyleHub28_345x255_crop_center.jpg?v=1710970626"),
    ],
  },
  {
    name: "BloomBox",
    logo: "https://dummyimage.com/140x50/000/fff&text=BloomBox",
    says: "Our campaigns bloomed exactly like we envisioned, creative & vibrant.",
    work: "Packaging • Social Media • Product Photography",
    images: [
      img("https://i.pinimg.com/236x/df/08/a2/df08a2c2e9472600e8a1568e31d6222b.jpg"),
      img("https://images.unsplash.com/photo-1522202176988-66273c2fd55f"),
      img("https://images.unsplash.com/photo-1498050108023-c5249f4df085"),
      img("https://images.unsplash.com/photo-1503264116251-35a269479413"),
    ],
  },
];

const BrandCard = memo(({ brand, reverse, dark }) => (
  <motion.div
    className={`brand-strip ${reverse ? "reverse" : ""} ${dark ? "dark-bg" : "light-bg"
      }`}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.6 }}
  >
    <div className="brand-text">
      <img src={brand.logo} alt={`${brand.name} logo`} width="160" height="160" loading="lazy" decoding="async" />
      <h3 className="text-warning fs-4">{brand.name}</h3>
      <p className="brand-says">“{brand.says}”</p>
      <span className="brand-work fw-bold">
        WORK WE DID -- <strong>{brand.work}</strong>
      </span>
    </div>

    <div className="brand-collage">
      {brand.images.map((imgUrl, i) => (
        <img
          key={i}
          src={imgUrl}
          className={`img${i + 1}`}
          width="400"
          height="400"
          loading="lazy"
          decoding="async"
          alt={`Work BrandSetu Digital did for ${brand.name}`}
        />
      ))}
    </div>
  </motion.div>
));

const WhatOurBrandsSay = () => {
  const batchSize = 3;
  const [currentBatch, setCurrentBatch] = useState(0);

  const totalBatches = Math.ceil(brands.length / batchSize);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap") {
      return;
    }
    const interval = setInterval(() => {
      setCurrentBatch((prev) => (prev + 1) % totalBatches);
    }, 9000); // show next batch every 4 seconds
    return () => clearInterval(interval);
  }, [totalBatches]);

  const getCurrentBrands = () => {
    const start = currentBatch * batchSize;
    const end = start + batchSize;
    return brands.slice(start, end);
  };

  return (
    <section className="brand-wall pt-5 mt-5 position-relative overflow-hidden bg-dark">
      {/* BACKGROUND BLOBS */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="brand-wall-header text-center mb-5 text-white">
          <h2 className="display-4 fw-bold mb-2">
            What Our <span className="text-warning">Brands</span> Say
          </h2>
          <p className="fs-5 fw-semibold text-danger">
            Not testimonials. Brand experiences.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {getCurrentBrands().map((brand, index) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              reverse={index % 2 !== 0}
              dark={index % 2 === 0}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default memo(WhatOurBrandsSay);
