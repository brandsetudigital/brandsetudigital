import React from "react";
import { motion } from "framer-motion";
import "../../Style/Home.css";
import "../../App.css";
import SageUniversity from "../../assets/Sage.webp";
import BrightPathLogo from "../../assets/brightpath.webp";
import UrbanSpiceLogo from "../../assets/urbanspices.webp";
import SparkLabLogo from "../../assets/sparklab.webp";
import GreenBasketLogo from "../../assets/greenbasket.webp";
import HillViewLogo from "../../assets/hillview.webp";
import CraftoryLogo from "../../assets/craftory.webp";
import LocalRootLogo from "../../assets/localroot.webp";
import PixelNestLogo from "../../assets/PixelNest.webp";
import MotionFitLogo from "../../assets/motionfit.webp";
import NextWaveLogo from "../../assets/nextwave.webp";
import Bakery24Logo from "../../assets/bakery24.webp";

/* ===== BRANDS DATA ===== */
const brands = [
  {
    name: "SageUniversity",
    logo: SageUniversity,
    className: "Sage University",
    link: "https://www.sageuniversity.in/",
  },
  {
    name: "Urban Spice Kitchen",
    logo: UrbanSpiceLogo,
    className: "brand-urbanspice",
    link: "https://urbanspicekitchen.com/",
  },
  {
    name: "PixelNest Studio",
    logo: PixelNestLogo,
    className: "brand-pixelnest",
    link: "https://www.pixelneststudio.com/",
  },
  {
    name: "GreenBasket Mart",
    logo: GreenBasketLogo,
    className: "brand-greenbasket",
    link: "https://www.greenbasket.in/",
  },
  {
    name: "NextWave Solutions",
    logo: NextWaveLogo,
    className: "brand-nextwave",
    link: "https://www.nextwavesolutions.com/",
  },
  {
    name: "Craftory Co.",
    logo: CraftoryLogo,
    className: "brand-craftory",
    link: "https://www.craftoryco.com/",
  },
  {
    name: "BakeHouse 24",
    logo: Bakery24Logo,
    className: "brand-bakehouse",
    link: "https://www.bakehouse24.com/",
  },
  {
    name: "LocalRoots Organics",
    logo: LocalRootLogo,
    className: "brand-localroots",
    link: "https://www.localroots.com/",
  },
  {
    name: "Spark Digital Lab",
    logo: SparkLabLogo,
    className: "brand-spark",
    link: "https://www.spark.gov.in/webspark/(S(l1w3igapinjhr4t5obvdnrhj))/sparklogin.aspx",
  },
  {
    name: "HillView Stays",
    logo: HillViewLogo,
    className: "brand-hillview",
    link: "https://www.hillviewstays.com/",
  },
  {
    name: "BrightPath Academy",
    logo: BrightPathLogo,
    className: "brand-brightpath",
    link: "https://www.brightpathacademy.com/",
  },
  {
    name: "MotionFit Studio",
    logo: MotionFitLogo,
    className: "brand-motionfit",
    link: "https://www.motionfitstudio.com/",
  },
];

export default function Brands() {
  return (
    <section className="brands-clean-section">
      <div className="container text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="brands-header"
        >
          <span className="brands-pill fw-bold">OUR PARTNERS</span>
          <h2 className="brands-title display-4 fw-bold">
            Brands Who <span className="text-danger colab">Trust Us</span>
          </h2>
          <p className="brands-subtitle fw-semibold">
            Long-term partnerships built on trust, strategy, and consistently
            delivered results
          </p>
        </motion.div>

        {/* Row 1 */}
        <div className="brands-marquee p-3 gap-2">
          <motion.div
            className="brands-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands].map((brand, idx) => (
              <a
                key={idx}
                href={brand.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`brand-card ${brand.className}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={brand.logo} alt={`${brand.name} logo`} width="120" height="120" loading="lazy" decoding="async" />
                <span>{brand.name}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="brands-marquee reverse p-2">
          <motion.div
            className="brands-track"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands].map((brand, idx) => (
              <a
                key={idx}
                href={brand.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`brand-card ${brand.className}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={brand.logo} alt={`${brand.name} logo`} width="120" height="120" loading="lazy" decoding="async" />
                <span>{brand.name}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
