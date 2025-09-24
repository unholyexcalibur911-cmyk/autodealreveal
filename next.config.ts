import { Http2ServerRequest } from "http2";
import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { 
        protocol: "https",
        hostname: "committed-comfort-10a5c2f98d.media.strapiapp.com"
      },
    ],
  },
};

export default nextConfig;
