//import type { NextConfig } from "next";

/*const nextConfig: NextConfig = {
  images: {
    domains: [
      "https://<APP_ID>.ufs.sh/f/<FILE_KEY>"
    ],
  },
};*/
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["discord-clone.ufs.sh", "uploadthing.com", "utfs.io"], // Add correct domains
  },
};

module.exports = nextConfig;
