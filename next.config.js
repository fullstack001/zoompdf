const withNextIntl = require("next-intl/plugin")("./src/i18n/request.ts");

module.exports = withNextIntl({
  experimental: {
    // Required so src/instrumentation.ts runs at server startup.
    instrumentationHook: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Ensure uploads directory exists in production
  webpack: (config) => {
    return config;
  },
});
