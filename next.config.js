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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
