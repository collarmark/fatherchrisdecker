import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    // TinaCMS admin panel is output into _site/admin
    outputFolder: "admin",
    publicFolder: "_site",
  },

  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "src",
    },
  },

  schema: {
    collections: [
      // ------------------------------------------------------------------ //
      // POSTS
      // ------------------------------------------------------------------ //
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              (values?.title || "untitled")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "permalink",
            label: "URL / Permalink",
            description: "Override the URL for this post. Include leading and trailing slashes, e.g. /blog/my-custom-slug/ — leave blank to use the filename as the URL.",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "time",
            label: "Time",
            description: "Optional. 24-hour format HH:MM (e.g. 14:30). Used to order multiple posts on the same day.",
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "coverImagePosition",
            label: "Image focal point",
            description: "Controls which part of the image stays in frame when cropped. Use: top · center · bottom · left · right · or percentages like 50% 25% (x% y%). Leave blank for center.",
          },
          {
            type: "boolean",
            name: "hideHeroImage",
            label: "Hide image at top of post",
            description: "When checked, the featured image is used only as the listing thumbnail — it won't appear at the top of this post.",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            toolbarOverride: ["heading", "bold", "italic", "link", "image", "ul", "ol", "quote", "table", "embed", "code", "codeBlock", "raw"],
            templates: [
              {
                name: "Aside",
                label: "Aside",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Text",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
        ],
      },

      // ------------------------------------------------------------------ //
      // ADVENTURES
      // ------------------------------------------------------------------ //
      {
        name: "adventure",
        label: "Adventures",
        path: "content/adventures",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              (values?.title || "untitled")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "permalink",
            label: "URL / Permalink",
            description: "Override the URL for this entry. Include leading and trailing slashes, e.g. /adventures/my-custom-slug/ — leave blank to use the filename as the URL.",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "time",
            label: "Time",
            description: "Optional. 24-hour format HH:MM (e.g. 14:30). Used to order multiple entries on the same day.",
          },
          {
            type: "string",
            name: "location",
            label: "Location",
          },
          {
            type: "string",
            name: "country",
            label: "Country",
          },
          {
            type: "number",
            name: "lat",
            label: "Latitude",
          },
          {
            type: "number",
            name: "lng",
            label: "Longitude",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["pilgrimage", "travel", "retreat", "parish", "personal"],
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "coverImagePosition",
            label: "Image focal point",
            description: "Controls which part of the image stays in frame when cropped. Use: top · center · bottom · left · right · or percentages like 50% 25% (x% y%). Leave blank for center.",
          },
          {
            type: "boolean",
            name: "hideHeroImage",
            label: "Hide image at top of post",
            description: "When checked, the cover image is used only as the listing thumbnail — it won't appear at the top of this entry.",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            toolbarOverride: ["heading", "bold", "italic", "link", "image", "ul", "ol", "quote", "table", "embed", "code", "codeBlock", "raw"],
            templates: [
              {
                name: "Aside",
                label: "Aside",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Text",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
        ],
      },

      // ------------------------------------------------------------------ //
      // GALLERIES
      // ------------------------------------------------------------------ //
      {
        name: "gallery",
        label: "Galleries",
        path: "content/galleries",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              (values?.title || "untitled")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "permalink",
            label: "URL / Permalink",
            description: "Override the URL for this gallery. Include leading and trailing slashes, e.g. /galleries/my-custom-slug/ — leave blank to use the filename as the URL.",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "sacred-art",
              "sci-fi",
              "graphic-design",
              "inktober",
              "illustration",
              "other",
            ],
          },
          {
            type: "string",
            name: "year",
            label: "Year",
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "coverImagePosition",
            label: "Image focal point",
            description: "Controls which part of the image stays in frame when cropped. Use: top · center · bottom · left · right · or percentages like 50% 25% (x% y%). Leave blank for center.",
          },
          {
            type: "object",
            name: "images",
            label: "Images",
            list: true,
            fields: [
              {
                type: "image",
                name: "image",
                label: "Image",
              },
              {
                type: "string",
                name: "caption",
                label: "Caption",
              },
            ],
          },
        ],
      },

      // ------------------------------------------------------------------ //
      // CAMINO
      // ------------------------------------------------------------------ //
      {
        name: "camino",
        label: "Camino Journal",
        path: "content/camino",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              (values?.title || "untitled")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "permalink",
            label: "URL / Permalink",
            description: "Override the URL for this entry. Include leading and trailing slashes, e.g. /camino/day-01-saint-jean/ — leave blank to use the filename as the URL.",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "time",
            label: "Time",
            description: "Optional. 24-hour format HH:MM (e.g. 14:30). Used to order multiple entries on the same day.",
          },
          {
            type: "string",
            name: "stage",
            label: "Stage",
          },
          {
            type: "string",
            name: "startLocation",
            label: "Start Location",
          },
          {
            type: "string",
            name: "endLocation",
            label: "End Location",
          },
          {
            type: "number",
            name: "lat",
            label: "Latitude",
          },
          {
            type: "number",
            name: "lng",
            label: "Longitude",
          },
          {
            type: "string",
            name: "distance",
            label: "Distance (e.g. 22 km)",
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "coverImagePosition",
            label: "Image focal point",
            description: "Controls which part of the image stays in frame when cropped. Use: top · center · bottom · left · right · or percentages like 50% 25% (x% y%). Leave blank for center.",
          },
          {
            type: "boolean",
            name: "hideHeroImage",
            label: "Hide image at top of post",
            description: "When checked, the cover image is used only as the listing thumbnail — it won't appear at the top of this entry.",
          },
          {
            type: "object",
            name: "images",
            label: "Images",
            list: true,
            fields: [
              {
                type: "image",
                name: "image",
                label: "Image",
              },
              {
                type: "string",
                name: "caption",
                label: "Caption",
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            toolbarOverride: ["heading", "bold", "italic", "link", "image", "ul", "ol", "quote", "table", "embed", "code", "codeBlock", "raw"],
            templates: [
              {
                name: "Aside",
                label: "Aside",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Text",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
        ],
      },

      // ------------------------------------------------------------------ //
      // SITE DOCS  (never published — lives in docs/, excluded by .eleventyignore)
      // ------------------------------------------------------------------ //
      {
        name: "docs",
        label: "📋 Authoring Guide",
        path: "docs",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },

      // ------------------------------------------------------------------ //
      // PAGES
      // ------------------------------------------------------------------ //
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              (values?.title || "untitled")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
          },
          {
            type: "string",
            name: "aliases",
            label: "URL Aliases",
            list: true,
            description: "Additional slugs that redirect to this page (e.g. cv → /curriculum-vitae/)",
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "coverImagePosition",
            label: "Image focal point",
            description: "Controls which part of the image stays in frame when cropped. Use: top · center · bottom · left · right · or percentages like 50% 25% (x% y%). Leave blank for center.",
          },
          {
            type: "boolean",
            name: "hideHeroImage",
            label: "Hide image at top of page",
            description: "When checked, the cover image is used only as the listing thumbnail — it won't appear at the top of this page.",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            toolbarOverride: ["heading", "bold", "italic", "link", "image", "ul", "ol", "quote", "table", "embed", "code", "codeBlock", "raw"],
            templates: [
              {
                name: "Aside",
                label: "Aside",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Text",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
