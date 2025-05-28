module.exports = {
  async redirects() {
    return [
      {
        source: '/auth/login',
        destination: '/components/auth/LoginPage',
        permanent: false,
      },
    ];
  },
};