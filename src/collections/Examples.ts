import { CollectionConfig } from "payload/types";
import { markdownElement } from "../Markdown";

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Examples: CollectionConfig = {
  slug: "examples",
  admin: {
    useAsTitle: "someField",
  },
  fields: [
    {
      name: "richText",
      type: "richText",
      admin: {
        elements: ["h2", markdownElement],
      },
    },
  ],
};

export default Examples;
