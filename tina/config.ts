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
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
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
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
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
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
