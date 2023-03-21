/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    LOG_VERBOSE: process.env.LOG_VERBOSE,
    NEXT_PUBLIC_TOPIC_RAND:
      "bmq-deadbeef-" + Math.floor((Math.random() + 0.1) * new Date().getTime())
  }
};

module.exports = nextConfig;
