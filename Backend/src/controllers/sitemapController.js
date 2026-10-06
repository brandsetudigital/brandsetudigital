const Blog = require("../models/Blog");

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/services", priority: "0.9", changefreq: "weekly" },
  { url: "/services/influencer-marketing-agency-indore", priority: "0.85", changefreq: "monthly" },
  { url: "/services/google-ads-agency-indore", priority: "0.85", changefreq: "monthly" },
  { url: "/services/graphic-design-services-indore", priority: "0.85", changefreq: "monthly" },
  { url: "/services/app-development-company-indore", priority: "0.85", changefreq: "monthly" },
  { url: "/services/product-photography-video-production-indore", priority: "0.85", changefreq: "monthly" },
  { url: "/services/website-development-company-indore", priority: "0.85", changefreq: "monthly" },
  { url: "/services/social-media-marketing-agency-indore", priority: "0.85", changefreq: "monthly" },
  { url: "/services/website-maintenance-services-indore", priority: "0.85", changefreq: "monthly" },
  { url: "/services/crm-setup-business-automation", priority: "0.85", changefreq: "monthly" },
  { url: "/services/seo-services-indore", priority: "0.85", changefreq: "monthly" },
  { url: "/services/cgi-ads", priority: "0.85", changefreq: "monthly" },
  { url: "/services/branding-strategy", priority: "0.85", changefreq: "monthly" },
  { url: "/work", priority: "0.8", changefreq: "monthly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/career", priority: "0.6", changefreq: "monthly" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
  { url: "/blog", priority: "0.85", changefreq: "daily" },
];

exports.getSitemap = async (req, res) => {
  try {
    const publishedBlogs = await Blog.find({ status: "published" })
      .select("slug updatedAt publishedAt")
      .sort({ publishedAt: -1 });

    const baseUrl = "https://brandsetudigital.com";
    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static Pages
    staticPages.forEach((page) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Published Blogs (Strictly excluding drafts and unpublished)
    publishedBlogs.forEach((blog) => {
      const lastmod = (blog.updatedAt || blog.publishedAt || new Date())
        .toISOString()
        .split("T")[0];
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${blog.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    return res.status(200).send(xml);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return res.status(500).send("Error generating sitemap");
  }
};
