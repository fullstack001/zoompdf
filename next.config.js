module.exports = {
  async redirects() {
    return [
      {
        source: "/auth/login",
        destination: "/components/auth/LoginPage",
        permanent: false,
      },
    ];
  },
  images: {
    domains: ["gravatar.com"], // Add gravatar.com to the list of allowed domains
  },
};
