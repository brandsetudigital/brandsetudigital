import React, { useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/portfolio.css";
import "../../Style/Home.css";
import "../../App.css";

const workSlides = [
  [
    {
      title: "Blue Tokai Studio",
      tag: "Specialty Café",
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=75",
      desc: "Specialty coffee cafés focused on quality and community.",
      link: "https://bluetokaicoffee.com",
    },
    {
      title: "Cafe Peter",
      tag: "Restaurant & Café",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=75",
      desc: "Modern café chain with strong youth-focused branding.",
      link: "https://cafepeter.com",
    },
    {
      title: "Chaayos",
      tag: "Food & Beverage",
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=75",
      desc: "Indian tea café brand with digital-first growth.",
      link: "https://www.chaayos.com",
    },
  ],
  [
    {
      title: "Zouk",
      tag: "Lifestyle Brand",
      img: "https://images.unsplash.com/photo-1585386959984-a41552262f3b?auto=format&fit=crop&w=600&q=75",
      desc: "Vegan lifestyle bags with strong D2C presence.",
      link: "https://zouk.co.in",
    },
    {
      title: "Suta",
      tag: "Fashion & Textiles",
      img: "https://images.unsplash.com/photo-1520974735194-6c9f63c45e91?auto=format&fit=crop&w=600&q=75",
      desc: "Handwoven saree brand with community storytelling.",
      link: "https://suta.in",
    },
    {
      title: "Slurrp Farm",
      tag: "Kids Nutrition",
      img: "https://images.unsplash.com/photo-1604908177522-402f07c7f3a4?auto=format&fit=crop&w=600&q=75",
      desc: "Wholesome nutrition brand for children.",
      link: "https://slurrpfarm.com",
    },
  ],
];

export default function HomeWork() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section className="work-section py-3 my-2">
      <Container>
        <div className="text-center mb-4">
          <span className="brands-pill fw-bold">PORTFOLIO &amp; CASE STUDIES</span>
          <h2 className="display-2 fw-bold text-dark mb-3">
            Our <span className="text-danger">Work</span> &amp; Case Studies
          </h2>
          <p className="fs-5 text-dark fw-semibold opacity-85 col-lg-8 mx-auto">
            Real brands, real campaigns, and measurable business growth powered by BrandSetu.
          </p>
        </div>

        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={5000}
          pause="hover"
          indicators={false}
          controls={false}
        >
          {workSlides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <Row className="g-4">
                {slide.map((item, i) => (
                  <Col lg={4} md={6} key={i}>
                    <motion.div
                      className="work-card h-100"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="work-card-img">
                        <img
                          src={item.img}
                          alt={`${item.title} — ${item.tag}`}
                          width="600"
                          height="450"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="work-card-content">
                        <span className="work-tag">{item.tag}</span>
                        <h3 className="fs-4 fw-bold">{item.title}</h3>
                        <p className="text-muted">{item.desc}</p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="work-link d-inline-flex align-items-center gap-1"
                        >
                          <span>Visit Brand</span>
                          <ExternalLink size={15} />
                        </a>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
        
      </Container>
    </section>
  );
}
