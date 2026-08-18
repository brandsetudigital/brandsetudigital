import React, { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import PostModal from "../Servive/servicemodals";
import "../../Style/Home.css";
import "../../App.css";
import "../../Style/Services.css";
import Influencer from "../../assets/influencer.avif";
import Development from "../../assets/app-dev.webp";
import CGIImg from "../../assets/CGI.avif";
import Graphic from "../../assets/graphics.jpg";
import Events from "../../assets/events.webp";
import Website from "../../assets/website-design.avif";
import SEOImg from "../../assets/SEO.jpg";
import SocialMedia from "../../assets/social-media.jpg";
import Ads from "../../assets/ads.jpg";
import Branding from "../../assets/branding.jpg";
import Maintainance from "../../assets/maintianance.avif";
import CRMImg from "../../assets/CRM.avif";

const posts = [
  {
    img: Influencer,
    category: "Marketing",
    title: "Influencer Marketing",
    desc: "We grow brand trust and reach through authentic influencer collaborations across multiple platforms.",
    description:
      "Influencer Marketing is a powerful strategy where brands collaborate with trusted content creators to authentically promote products or services. It helps increase engagement, brand awareness, and reach across social media, ensuring campaigns feel credible, relatable, and impactful for the target audience.",
    details: [
      "Influencer research & selection",
      "Micro & macro influencer campaigns",
      "Instagram, YouTube & regional creators",
      "Campaign planning & execution",
      "Authentic brand collaborations",
      "Engagement & performance tracking",
    ],
  },
  {
    img: Development,
    category: "Development",
    title: "App Development",
    desc: "We build secure, scalable, and high-performing mobile applications tailored to your business needs.",
    description:
      "App Development is a technology-driven service designed to create mobile applications that are fast, secure, and user-friendly. Our team ensures seamless backend integration, custom UI/UX design, and robust performance, helping businesses engage their customers effectively on both Android and iOS platforms.",
    details: [
      "Android & iOS app development",
      "Custom UI/UX design",
      "Backend & API integration",
      "High performance & security",
      "Testing & deployment",
      "Ongoing support & updates",
    ],
  },
  {
    img: CGIImg,
    category: "Creative",
    title: "CGI (Computer Generated Imagery) Ads",
    desc: "We create eye-catching CGI ads using animations and 3D visuals to showcase your products effectively.",
    description:
      "CGI Ads leverage advanced computer-generated imagery to produce visually stunning and highly engaging advertisements. This service includes 3D animations, realistic renders, and futuristic visuals that help brands stand out, elevate their marketing campaigns, and attract the attention of their audience with creative storytelling.",
    details: [
      "3D CGI animations",
      "Product visualization",
      "High-quality renders",
      "Ad-ready video formats",
      "Creative concepts",
      "Brand-focused storytelling",
    ],
  },
  {
    img: Graphic,
    category: "Creative",
    title: "Graphics Design",
    desc: "We transform ideas into professional and visually compelling designs to strengthen brand identity.",
    description:
      "Graphic Design is a creative service focused on producing visual content that effectively communicates brand messages. This includes social media creatives, banners, posters, and other digital or print assets designed to align with your brand identity, making your marketing more visually appealing and cohesive.",
    details: [
      "Social media creatives",
      "Marketing banners & posters",
      "Brand-aligned visuals",
      "High-resolution designs",
      "Print & digital assets",
      "Creative consistency",
    ],
  },
  {
    img: Events,
    category: "Media",
    title: "Event / Product Shoot & Promotion",
    desc: "Professional photography and videography to showcase your products and events creatively.",
    description:
      "Event and Product Shoot & Promotion captures high-quality visuals that effectively showcase your products and events. Using professional photography and videography techniques, we create engaging reels, promotional videos, and photos that are optimized for social media and marketing campaigns, helping to boost brand visibility and engagement.",
    details: [
      "Product shoots",
      "Event photography & videography",
      "Reels & promotional videos",
      "Professional editing",
      "Social media-ready content",
      "Brand promotion strategy",
    ],
  },
  {
    img: Website,
    category: "Development",
    title: "Website Design & Development",
    desc: "We create fast, responsive, and conversion-focused websites that represent your brand professionally.",
    description:
      "Website Design & Development focuses on building websites that are visually appealing, mobile-friendly, and optimized for speed and conversions. We ensure custom UI/UX design, SEO-friendly structure, and secure, scalable architecture, delivering a smooth experience to users while reflecting the brand’s identity effectively.",
    details: [
      "Custom UI/UX design",
      "Mobile-first development",
      "SEO-friendly structure",
      "High-speed performance",
      "Secure & scalable builds",
      "Business & landing websites",
    ],
  },
  {
    img: SEOImg,
    category: "Marketing",
    title: "SEO & Local SEO",
    desc: "Boost your website visibility and search performance using proven SEO and local SEO strategies.",
    description:
      "SEO & Local SEO services enhance your website’s visibility on search engines, driving organic traffic and improving local search rankings. We provide keyword research, on-page and technical SEO, content optimization, and Google My Business setup, ensuring your brand reaches its target audience effectively while sustaining long-term growth.",
    details: [
      "Keyword research",
      "On-page & technical SEO",
      "Content optimization",
      "Local SEO & GMB setup",
      "Website audits",
      "Long-term organic growth",
    ],
  },
  {
    img: SocialMedia,
    category: "Marketing",
    title: "Social Media Marketing & Brand Promotion",
    desc: "We grow your brand presence on social platforms through strategic content and campaigns.",
    description:
      "Social Media Marketing builds brand awareness and engagement across platforms like Instagram, Facebook, and LinkedIn. We create content calendars, design engaging posts, manage campaigns, and track analytics to ensure maximum reach and meaningful interactions with the target audience, helping brands grow their community and influence online.",
    details: [
      "Social media strategy",
      "Content creation",
      "Reels & creatives",
      "Audience engagement",
      "Brand awareness campaigns",
      "Analytics & insights",
    ],
  },
  {
    img: Ads,
    category: "Advertising",
    title: "Google Ads & Lead Generation",
    desc: "We run performance-driven paid campaigns to generate leads and maximize ROI effectively.",
    description:
      "Google Ads & Lead Generation services help businesses acquire quality leads through targeted paid campaigns on Google and YouTube. We optimize campaigns, track conversions, manage budgets, and adjust strategies to ensure maximum ROI while reaching the right audience at the right time with relevant messaging.",
    details: [
      "Google Search & Display Ads",
      "YouTube ads",
      "Audience targeting",
      "Conversion tracking",
      "Budget optimization",
      "Performance reporting",
    ],
  },
  {
    img: Branding,
    category: "Branding",
    title: "Branding & Graphic Design",
    desc: "We create consistent brand identities that communicate trust, clarity, and professionalism.",
    description:
      "Branding & Graphic Design ensures your brand identity is strong, cohesive, and memorable. We design logos, visual assets, and guidelines, maintaining consistency across marketing channels. This helps build trust with your audience while providing clarity and a professional look for all brand communications.",
    details: [
      "Logo design",
      "Brand identity creation",
      "Color palette & typography",
      "Brand guidelines",
      "Visual storytelling",
      "Cross-platform branding",
    ],
  },
  {
    img: Maintainance,
    category: "Support",
    title: "Website Maintenance & Technical Support",
    desc: "We ensure your website stays secure, updated, and fully functional at all times.",
    description:
      "Website Maintenance & Technical Support ensures your website remains secure, fast, and fully operational. We provide regular updates, bug fixes, security monitoring, and performance optimization, along with technical support to handle any issues promptly, giving you peace of mind and smooth online operations.",
    details: [
      "Regular updates & backups",
      "Security monitoring",
      "Bug fixes",
      "Performance optimization",
      "Content updates",
      "Technical support",
    ],
  },
  {
    img: CRMImg,
    title: "CRM Setup & Business Automation",
    category : "Automation",
    desc: "We help automate business processes, manage leads efficiently, and improve workflows with CRM solutions.",
    description:
      "CRM Setup & Business Automation streamlines your business operations by automating workflows, managing leads, and improving customer interactions. Our solutions integrate sales, communication, and analytics tools to provide efficiency, clarity, and actionable insights across departments, helping businesses save time and resources.",
    details: [
      "CRM setup & customization",
      "Lead & customer management",
      "Sales automation",
      "Email & WhatsApp integration",
      "Analytics & dashboards",
      "Workflow optimization",
    ],
  },
];

const DetailedServices = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(posts);
  const [showModal, setShowModal] = useState(false);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  useEffect(() => {
    setVisiblePosts(
      activeCategory === "All"
        ? posts
        : posts.filter((p) => p.category === activeCategory)
    );
  }, [activeCategory]);

  const categories = [
    "All",
    "Marketing",
    "Development",
    "Creative",
    "Media",
    "Advertising",
    "Support",
    "Automation",
  ];

  const handleShow = (post) => {
    setActivePost(post);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setActivePost(null);
  };

  return (
    <section className="py-5">
      <div className="container text-center mb-5">
        <h2 className="text-brand display-3 fw-bold mb-3">
          BrandSetu<span className="text-danger"> Marketing</span> Services
        </h2>
        <p className="text-dark opacity-75 fw-semibold lead">
          Best Digital marketing services that help your brand grow
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${
                activeCategory === cat ? "btn-dark" : "btn-outline-dark"
              } rounded-pill px-4`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="row g-5">
          {visiblePosts.map((post, index) => (
            <div className="col-md-6 d-flex" key={index} data-aos="fade-up">
              <div className="service-card d-flex gap-4 align-items-start w-100">
                {/* IMAGE */}
                <div className="service-img-box shadow flex-shrink-0">
                  <img
                    src={post.img}
                    alt={`${post.title} — BrandSetu Digital service`}
                    className="service-img"
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* TEXT */}
                <div className="d-flex flex-column justify-content-between w-100">
                  <div>
                    <h3 className="fw-bold fs-5">{post.title}</h3>
                    <p className="text-dark fw-semibold ">{post.desc}</p>
                  </div>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => handleShow(post)}
                      className="read-more-link d-inline-flex align-items-center fw-bold"
                    >
                      <BsArrowRight className="me-2" />
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PostModal show={showModal} onHide={handleClose} post={activePost} />
    </section>
  );
};

export default DetailedServices;
