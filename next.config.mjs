/** Static exports run on both GitHub Pages and Vercel. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default {
  output: "export",
  basePath,
  trailingSlash: false,
  reactStrictMode: true,
  images: { unoptimized: true },
};
