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
    //domains: ["discord-clone.ufs.sh", "uploadthing.com", "utfs.io"], // Add correct domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "discord-clone.ufs.sh", // Add more hostnames as needed
      },
    ],
  },
};

module.exports = nextConfig;
