/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutill",
    });

    return config;
  },
  images: {
    domains: ["localhost", "utfs.io", "sacus.vn"],
  },
};

module.exports = nextConfig;
