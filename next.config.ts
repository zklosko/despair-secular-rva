import type { NextConfig } from "next";
import path from "node:path";

const repoName = "despair-secular-rva";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? `/${repoName}` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  turbopack: {
    root: path.resolve(process.cwd(), ".."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
