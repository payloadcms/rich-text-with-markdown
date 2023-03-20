import { buildConfig } from "payload/config";
import path from "path";
import Examples from "./collections/Examples";
import Users from "./collections/Users";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
    webpack: (config) => {
      // workaround for react-markdown & remark-gfm
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      });

      // Needed for local `yarn link` development
      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   "react": path.resolve(__dirname, "../node_modules/react"),
      //   "react-dom": path.resolve(__dirname, "../node_modules/react-dom"),
      //   "slate": path.resolve(__dirname, "../node_modules/slate"),
      //   "slate-react": path.resolve(__dirname, "../node_modules/slate-react"),
      // };

      return config;
    }
  },
  collections: [Users, Examples],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
