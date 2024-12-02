/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JDOODLE_CLIENT_ID: process.env.JDOODLE_CLIENT_ID,
    JDOODLE_CLIENT_SECRET: process.env.JDOODLE_CLIENT_SECRET,
  },
};

export default nextConfig;
