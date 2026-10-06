require("../../config/cryptoPolyfill");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const fs = require("fs");
const vm = require("vm");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");

const imagePathMap = {
  seoImg: "/assets/SEO.jpg",
  googleAdsPpcImg: "/assets/google-ads-ppc-guide.png",
  googleAdsBudgetImg: "/assets/google-ads-budget-guide.jpg",
  googleAdsLeadsImg: "/assets/google-ads-leads-guide.png",
  seoImportanceImg: "/assets/seo-importance-guide.png",
  seoOnPageImg: "/assets/seo-onpage-checklist.png",
  seoLocalStrategyImg: "/assets/seo-local-strategy.png",
  instagramAdsGuideImg: "/assets/instagram-ads-guide.png",
  metaAdsFunnelImg: "/assets/meta-ads-funnel-guide.png",
  metaAdsRoasImg: "/assets/meta-ads-roas-guide.png",
  perfMarketingImg: "/assets/performance-marketing-guide.png",
  reduceCacImg: "/assets/reduce-cac-guide.png",
  brandingImg: "/assets/branding.jpg",
  webDevImg: "/assets/website-development-company.webp",
  socialImg: "/assets/social-media.jpg",
  aiImg: "/assets/Ai-automation-services.png",
  founderImg: "/assets/brandsetu-avatar.png",
  perfImg: "/assets/Performance-marketing-agency.jpg",
  digitalGrowthImg: "/assets/digital-growth-solutions.jpg",
  strategicGrowthImg: "/assets/strategic-digital-growth-brandsetu.png",
  whatsappMarketingImg: "/assets/whatsapp-marketing-services.avif",
  shootImg: "/assets/shootandvideo.jpg",
};

// Convert structured content to clean semantic HTML
const buildHtmlContent = (content) => {
  if (typeof content === "string") return content;
  if (!content) return "<p>Content coming soon.</p>";

  let html = "";
  if (content.intro) {
    html += `<p class="lead">${content.intro}</p>\n`;
  }

  if (content.sections && Array.isArray(content.sections)) {
    content.sections.forEach((sec, idx) => {
      html += `<section id="section-${idx}">\n`;
      if (sec.heading) {
        html += `  <h2>${sec.heading}</h2>\n`;
      }
      if (sec.body) {
        html += `  <p>${sec.body}</p>\n`;
      }
      html += `</section>\n`;
    });
  }

  if (content.conclusion) {
    html += `<div class="article-conclusion">\n  <h3>Conclusion & Final Takeaway</h3>\n  <p>${content.conclusion}</p>\n</div>\n`;
  }

  return html;
};

const seedBlogs = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/brandsetu";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for blog seeding...");

    const filePath = path.resolve(__dirname, "../../../Frontend/src/data/blogsData.js");
    if (!fs.existsSync(filePath)) {
      throw new Error(`blogsData.js not found at: ${filePath}`);
    }

    const file = fs.readFileSync(filePath, "utf8");

    const sandbox = { ...imagePathMap };
    const startIdx = file.indexOf("export const blogsData = [");
    if (startIdx === -1) {
      throw new Error("Could not find blogsData in file.");
    }

    const rawArray = file
      .slice(startIdx)
      .replace("export const blogsData =", "blogsData =");

    vm.createContext(sandbox);
    vm.runInContext(rawArray, sandbox);

    const blogs = sandbox.blogsData || [];
    console.log(`Extracted ${blogs.length} blogs from existing data. Seeding into MongoDB...`);

    let createdCount = 0;
    let updatedCount = 0;

    for (const b of blogs) {
      const htmlContent = buildHtmlContent(b.content);
      const featuredImage =
        typeof b.image === "string"
          ? b.image
          : imagePathMap[b.image] || "/assets/SEO.jpg";

      const authorAvatar =
        b.author && typeof b.author.avatar === "string"
          ? b.author.avatar
          : "/assets/Founder-brandsetu-digital.webp";

      const doc = {
        title: b.title,
        slug: b.slug,
        serviceSlug: b.serviceSlug || "general",
        category: b.category || "Digital Marketing",
        excerpt: b.excerpt || b.title,
        content: htmlContent,
        structuredContent: typeof b.content === "object" ? b.content : null,
        featuredImage,
        author: {
          name: b.author?.name || "BrandSetu Editorial Team",
          role: b.author?.role || "Digital Marketing Strategist",
          avatar: authorAvatar,
        },
        status: "published",
        readingTime: b.readTime || "5 min read",
        publishedAt: b.publishDate ? new Date(b.publishDate) : new Date(),
        metaTitle: b.metaTitle || b.title,
        metaDescription: b.metaDescription || b.excerpt,
        canonicalUrl: b.canonicalUrl || `/blog/${b.slug}`,
        tags: b.tags || [],
        serviceLink: b.serviceLink || "",
        serviceName: b.serviceName || "",
      };

      const result = await Blog.findOneAndUpdate(
        { slug: b.slug },
        { $set: doc },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (result) {
        createdCount++;
      }
    }

    console.log(`✅ Successfully synced ${createdCount} blogs into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding blogs:", error);
    process.exit(1);
  }
};

seedBlogs();
