const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Blog slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    serviceSlug: {
      type: String,
      trim: true,
      lowercase: true,
      default: "general",
    },
    excerpt: {
      type: String,
      required: [true, "Blog excerpt is required"],
      trim: true,
    },
    // HTML article content from rich-text editor
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    // Optional structured content (key takeaways, sections, conclusion) for existing rich blogs
    structuredContent: {
      intro: String,
      keyTakeaways: [String],
      sections: [
        {
          heading: String,
          body: String,
        },
      ],
      conclusion: String,
    },
    featuredImage: {
      type: String,
      default: "/assets/SEO.jpg",
    },
    category: {
      type: String,
      required: [true, "Blog category is required"],
      trim: true,
      index: true,
    },
    author: {
      name: {
        type: String,
        default: "BrandSetu Team",
      },
      role: {
        type: String,
        default: "Digital Marketing Strategist",
      },
      avatar: {
        type: String,
        default: "/assets/brandsetu-avatar.png",
      },
    },
    status: {
      type: String,
      enum: ["draft", "published", "unpublished"],
      default: "published",
      index: true,
    },
    readingTime: {
      type: String,
      default: "5 min read",
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    // SEO fields
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    focusKeyword: {
      type: String,
      trim: true,
    },
    canonicalUrl: {
      type: String,
      trim: true,
    },
    ogTitle: {
      type: String,
      trim: true,
    },
    ogDescription: {
      type: String,
      trim: true,
    },
    ogImage: {
      type: String,
      trim: true,
    },
    // FAQs for schema and accordion
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    tags: [String],
    serviceLink: String,
    serviceName: String,
  },
  {
    timestamps: true,
  }
);

// Auto-generate canonicalUrl if not provided
blogSchema.pre("save", function (next) {
  if (!this.canonicalUrl && this.slug) {
    this.canonicalUrl = `/blog/${this.slug}`;
  }
  if (!this.metaTitle && this.title) {
    this.metaTitle = this.title;
  }
  if (!this.metaDescription && this.excerpt) {
    this.metaDescription = this.excerpt;
  }
  if (typeof next === "function") {
    next();
  }
});

module.exports = mongoose.model("Blog", blogSchema);
