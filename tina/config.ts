
import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: "despair-secular-rva"
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",

        ui: {
          router: ({ document }) => {
            const filename = document._sys.filename;
            return filename === "home" ? "/" : `/${filename}`;
          },
        },

        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },

          {
            type: "object",
            name: "sections",
            label: "Page Sections",
            list: true,

            templates: [
              // 1. HERO
              {
                name: "hero",
                label: "Hero",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "body", label: "Description", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Background Image" },
                  { type: "string", name: "imageAlt", label: "Image Description" },
                  { type: "string", name: "primaryButtonText", label: "Primary Button Text" },
                  { type: "string", name: "primaryButtonLink", label: "Primary Button Link" },
                  { type: "string", name: "secondaryButtonText", label: "Secondary Button Text" },
                  { type: "string", name: "secondaryButtonLink", label: "Secondary Button Link" },
                ],
              },

              // 2. IMAGE + TEXT
              {
                name: "imageText",
                label: "Image + Text",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "imageAlt", label: "Image Description" },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  { type: "string", name: "buttonLink", label: "Button Link" },
                ],
              },

              // 3. SERVICE TIMES
              {
                name: "serviceTimes",
                label: "Service Times",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "body", label: "Description", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "locations",
                    label: "Locations",
                    list: true,
                    fields: [
                      { type: "string", name: "name", label: "Location Name", required: true },
                      { type: "string", name: "address", label: "Street Address" },
                      { type: "string", name: "city", label: "City" },
                      { type: "string", name: "state", label: "State" },
                      { type: "string", name: "zip", label: "ZIP Code" },
                      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                      { type: "string", name: "directionsUrl", label: "Directions URL" },
                      { type: "boolean", name: "isActive", label: "Show This Location" },
                      {
                        type: "object",
                        name: "serviceTimes",
                        label: "Service Times",
                        list: true,
                        fields: [
                          { type: "string", name: "time", label: "Time", required: true },
                          { type: "string", name: "label", label: "Service Label" },
                        ],
                      },
                    ],
                  },
                ],
              },

              // 4. FEATURED SERMON
              {
                name: "featuredSermon",
                label: "Featured Sermon",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "object",
                    name: "sermon",
                    label: "Sermon",
                    fields: [
                      { type: "string", name: "title", label: "Sermon Title", required: true },
                      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                      { type: "string", name: "videoUrl", label: "Video URL" },
                      { type: "datetime", name: "date", label: "Sermon Date", ui: { dateFormat: "MMMM DD, YYYY", timeFormat: false } },
                      { type: "image", name: "thumbnail", label: "Thumbnail Image" },
                      {
                        type: "object",
                        name: "speaker",
                        label: "Speaker",
                        fields: [
                          { type: "string", name: "name", label: "Speaker Name" },
                        ],
                      },
                      {
                        type: "object",
                        name: "series",
                        label: "Series",
                        fields: [
                          { type: "string", name: "title", label: "Series Title" },
                        ],
                      },
                    ],
                  },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  { type: "string", name: "buttonLink", label: "Button Link" },
                ],
              },

              // 5. NEXT STEPS
              {
                name: "nextSteps",
                label: "Next Steps",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "items",
                    label: "Next Step Items",
                    list: true,
                    fields: [
                      { type: "string", name: "title", label: "Title", required: true },
                      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                      { type: "string", name: "linkText", label: "Link Text" },
                      { type: "string", name: "link", label: "Link URL" },
                    ],
                  },
                ],
              },

              // 6. CLOSING INVITATION
              {
                name: "closingInvitation",
                label: "Closing Invitation",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  { type: "string", name: "buttonLink", label: "Button Link" },
                ],
              },

              // 7. RICH TEXT CONTENT
              {
                name: "richTextContent",
                label: "Rich Text Content",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Content",
                  },
                  {
                    type: "string",
                    name: "background",
                    label: "Background",
                    options: [
                      { label: "Default", value: "default" },
                      { label: "Muted", value: "muted" },
                      { label: "Dark", value: "dark" },
                    ],
                  },
                ],
              },

              // 8. CALL TO ACTION
              {
                name: "callToAction",
                label: "Call to Action",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  { type: "string", name: "buttonLink", label: "Button Link" },
                  { type: "image", name: "backgroundImage", label: "Background Image" },
                  {
                    type: "string",
                    name: "style",
                    label: "Style",
                    options: [
                      { label: "Dark", value: "dark" },
                      { label: "Muted", value: "muted" },
                      { label: "Primary", value: "primary" },
                      { label: "Image Background", value: "image" },
                    ],
                  },
                ],
              },

              // 9. CARD GRID
              {
                name: "cardGrid",
                label: "Card Grid",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  {
                    type: "string",
                    name: "columns",
                    label: "Number of Columns",
                    options: [
                      { label: "2 Columns", value: "2" },
                      { label: "3 Columns", value: "3" },
                      { label: "4 Columns", value: "4" },
                    ],
                  },
                  {
                    type: "object",
                    name: "cards",
                    label: "Cards",
                    list: true,
                    fields: [
                      { type: "string", name: "heading", label: "Heading" },
                      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                      { type: "image", name: "image", label: "Image" },
                      { type: "string", name: "imageAlt", label: "Image Description" },
                      { type: "string", name: "linkText", label: "Link Text" },
                      { type: "string", name: "link", label: "Link URL" },
                    ],
                  },
                ],
              },

              // 10. MINISTRY GRID
              {
                name: "ministryGrid",
                label: "Ministry Grid",
                fields: [
                  {
                    type: "string",
                    name: "eyebrow",
                    label: "Eyebrow",
                  },
                  {
                    type: "string",
                    name: "heading",
                    label: "Heading",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "columns",
                    label: "Number of Columns",
                    options: [
                      { label: "2 Columns", value: "2" },
                      { label: "3 Columns", value: "3" },
                      { label: "4 Columns", value: "4" },
                    ],
                  },
                  {
                    type: "string",
                    name: "displayMode",
                    label: "Which Ministries to Display",
                    options: [
                      { label: "All Active Ministries", value: "all" },
                      { label: "Selected Ministries", value: "selected" },
                    ],
                  },
                  {
                    type: "object",
                    name: "ministryItems",
                    label: "Selected Ministries",
                    list: true,
                    fields: [
                      {
                        type: "reference",
                        name: "ministry",
                        label: "Ministry",
                        collections: ["ministry"],
                      },
                    ],
                  },
                ],
              },

            ],
          },
        ],
      },

      // MINISTRIES COLLECTION
      {
        name: "ministry",
        label: "Ministries",
        path: "content/ministries",
        format: "json",

        ui: {
          router: ({ document }) => `/ministries/${document._sys.filename}`,
        },

        fields: [
          {
            type: "string",
            name: "title",
            label: "Ministry Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "group",
            label: "Ministry Group",
            description: "ex. Worship Arts, Outreach, Care, Families",
          },
          {
            type: "image",
            name: "image",
            label: "Ministry Image",
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Image Description",
          },
          {
            type: "string",
            name: "linkText",
            label: "Link Text",
          },
          {
            type: "string",
            name: "link",
            label: "Link URL",
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
          },
          {
            type: "boolean",
            name: "isActive",
            label: "Show on Website",
          },

          // INDIVIDUAL MINISTRY PAGE SECTIONS
          {
            type: "object",
            name: "sections",
            label: "Ministry Page Sections",
            list: true,

            templates: [
              // 1. HERO
              {
                name: "hero",
                label: "Hero",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "string",
                    name: "body",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  { type: "image", name: "image", label: "Background Image" },
                  { type: "string", name: "imageAlt", label: "Image Description" },
                  {
                    type: "string",
                    name: "primaryButtonText",
                    label: "Primary Button Text",
                  },
                  {
                    type: "string",
                    name: "primaryButtonLink",
                    label: "Primary Button Link",
                  },
                  {
                    type: "string",
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                  },
                  {
                    type: "string",
                    name: "secondaryButtonLink",
                    label: "Secondary Button Link",
                  },
                ],
              },

              // 2. IMAGE + TEXT
              {
                name: "imageText",
                label: "Image + Text",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "string",
                    name: "body",
                    label: "Body",
                    ui: { component: "textarea" },
                  },
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "imageAlt", label: "Image Description" },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  { type: "string", name: "buttonLink", label: "Button Link" },
                ],
              },

              // 3. SERVICE TIMES
              {
                name: "serviceTimes",
                label: "Service Times",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "string",
                    name: "body",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "object",
                    name: "locations",
                    label: "Locations",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "name",
                        label: "Location Name",
                        required: true,
                      },
                      { type: "string", name: "address", label: "Street Address" },
                      { type: "string", name: "city", label: "City" },
                      { type: "string", name: "state", label: "State" },
                      { type: "string", name: "zip", label: "ZIP Code" },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                      {
                        type: "string",
                        name: "directionsUrl",
                        label: "Directions URL",
                      },
                      {
                        type: "boolean",
                        name: "isActive",
                        label: "Show This Location",
                      },
                      {
                        type: "object",
                        name: "serviceTimes",
                        label: "Service Times",
                        list: true,
                        fields: [
                          {
                            type: "string",
                            name: "time",
                            label: "Time",
                            required: true,
                          },
                          {
                            type: "string",
                            name: "label",
                            label: "Service Label",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // 4. FEATURED SERMON
              {
                name: "featuredSermon",
                label: "Featured Sermon",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "object",
                    name: "sermon",
                    label: "Sermon",
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Sermon Title",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                      { type: "string", name: "videoUrl", label: "Video URL" },
                      {
                        type: "datetime",
                        name: "date",
                        label: "Sermon Date",
                        ui: {
                          dateFormat: "MMMM DD, YYYY",
                          timeFormat: false,
                        },
                      },
                      {
                        type: "image",
                        name: "thumbnail",
                        label: "Thumbnail Image",
                      },
                      {
                        type: "object",
                        name: "speaker",
                        label: "Speaker",
                        fields: [
                          { type: "string", name: "name", label: "Speaker Name" },
                        ],
                      },
                      {
                        type: "object",
                        name: "series",
                        label: "Series",
                        fields: [
                          { type: "string", name: "title", label: "Series Title" },
                        ],
                      },
                    ],
                  },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  { type: "string", name: "buttonLink", label: "Button Link" },
                ],
              },

              // 5. NEXT STEPS
              {
                name: "nextSteps",
                label: "Next Steps",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "object",
                    name: "items",
                    label: "Next Step Items",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Title",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                      { type: "string", name: "linkText", label: "Link Text" },
                      { type: "string", name: "link", label: "Link URL" },
                    ],
                  },
                ],
              },

              // 6. CLOSING INVITATION
              {
                name: "closingInvitation",
                label: "Closing Invitation",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  { type: "string", name: "buttonLink", label: "Button Link" },
                ],
              },

              // 7. RICH TEXT CONTENT
              {
                name: "richTextContent",
                label: "Rich Text Content",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Content",
                  },
                  {
                    type: "string",
                    name: "background",
                    label: "Background",
                    options: [
                      { label: "Default", value: "default" },
                      { label: "Muted", value: "muted" },
                      { label: "Dark", value: "dark" },
                    ],
                  },
                ],
              },

              // 8. CALL TO ACTION
              {
                name: "callToAction",
                label: "Call to Action",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  { type: "string", name: "buttonLink", label: "Button Link" },
                  {
                    type: "image",
                    name: "backgroundImage",
                    label: "Background Image",
                  },
                  {
                    type: "string",
                    name: "style",
                    label: "Style",
                    options: [
                      { label: "Dark", value: "dark" },
                      { label: "Muted", value: "muted" },
                      { label: "Primary", value: "primary" },
                      { label: "Image Background", value: "image" },
                    ],
                  },
                ],
              },

              // 9. CARD GRID
              {
                name: "cardGrid",
                label: "Card Grid",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "columns",
                    label: "Number of Columns",
                    options: [
                      { label: "2 Columns", value: "2" },
                      { label: "3 Columns", value: "3" },
                      { label: "4 Columns", value: "4" },
                    ],
                  },
                  {
                    type: "object",
                    name: "cards",
                    label: "Cards",
                    list: true,
                    fields: [
                      { type: "string", name: "heading", label: "Heading" },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                      { type: "image", name: "image", label: "Image" },
                      {
                        type: "string",
                        name: "imageAlt",
                        label: "Image Description",
                      },
                      { type: "string", name: "linkText", label: "Link Text" },
                      { type: "string", name: "link", label: "Link URL" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Sermons collection
      {
        name: "sermons",
        label: "Sermons",
        path: "content/sermons",
        format: "json",
        fields: [
          // Video information
          {
            type: "string",
            name: "title",
            label: "Display Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "videoUrl",
            label: "YouTube Video URL",
            description: "Paste the full YouTube video link.",
          },
          {
            type: "string",
            name: "videoId",
            label: "YouTube Video ID",
            description: "Filled in by the importer, or entered manually.",
          },
          {
            type: "string",
            name: "source",
            label: "Video Source",
            options: [
              { label: "Hope Church YouTube Channel", value: "church" },
              { label: "Another YouTube Channel", value: "other" },
            ],
          },

          // YouTube information (managed by the importer)
          {
            type: "string",
            name: "youtubeTitle",
            label: "Original YouTube Title",
          },
          {
            type: "string",
            name: "youtubeDescription",
            label: "Original YouTube Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "publishedAt",
            label: "YouTube Publish Date",
          },
          {
            type: "string",
            name: "thumbnailUrl",
            label: "YouTube Thumbnail URL",
          },
          {
            type: "number",
            name: "playlistPosition",
            label: "YouTube Playlist Position",
          },

          // Church-curated information
          {
            type: "string",
            name: "speaker",
            label: "Speaker",
          },
          {
            type: "string",
            name: "series",
            label: "Sermon Series",
          },
          {
            type: "string",
            name: "scriptureReferences",
            label: "Scripture References",
            list: true,
          },
          {
            type: "string",
            name: "sidebarContent",
            label: "Watch Page Sidebar Content",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "discussionQuestions",
            label: "Discussion Questions",
            list: true,
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "resources",
            label: "Additional Resources",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Resource Title",
              },
              {
                type: "string",
                name: "url",
                label: "Resource URL",
              },
            ],
          },

          // Watch page organization
          {
            type: "boolean",
            name: "isFeatured",
            label: "Featured Message",
          },
          {
            type: "boolean",
            name: "isVisible",
            label: "Show on Watch Page",
          },
          {
            type: "number",
            name: "sortOrder",
            label: "Display Order",
          },
        ],
      },

      // FEATURED EVENTS COLLECTION
      {
        name: "events",
        label: "Featured Events",
        path: "content/events",
        format: "json",

        fields: [
          {
            type: "string",
            name: "title",
            label: "Event Title",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Event Image",
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Image Description",
          },
          {
            type: "datetime",
            name: "date",
            label: "Event Date and Time",
            ui: {
              dateFormat: "MMMM DD, YYYY",
              timeFormat: "h:mm A",
            },
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "location",
            label: "Event Location",
          },
          {
            type: "string",
            name: "registrationUrl",
            label: "Registration URL",
          },
          {
            type: "string",
            name: "buttonText",
            label: "Button Text",
          },
          {
            type: "number",
            name: "sortOrder",
            label: "Display Order",
            description: "Use 1 for the first event, 2 for the second, and so on.",
          },
          {
            type: "boolean",
            name: "isVisible",
            label: "Show on Website",
          },
        ],
      },
    ],
  },
});