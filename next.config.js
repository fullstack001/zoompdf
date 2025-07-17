const withNextIntl = require("next-intl/plugin")("./src/i18n/request.ts");

module.exports = withNextIntl({
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
});
