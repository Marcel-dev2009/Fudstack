import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents:true,
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"example.com",
        port:"",
        pathname:"/images/**" 
      },
      {
        protocol:"https",
        hostname:"**"
      }
    ]
  }
};

export default nextConfig;
