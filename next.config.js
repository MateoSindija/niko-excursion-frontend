/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  async redirects() {
    return [
      {
        // this matches '/' since `en` is the defaultLocale
        source: '/',
        destination: '/hr',
        locale: false,
        permanent: false,
      },
      {
        // this matches '/' since `en` is the defaultLocale
        source: '/about-us',
        destination: '/hr/about-us',
        locale: false,
        permanent: false,
      },
      {
        // this matches '/' since `en` is the defaultLocale
        source: '/contact',
        destination: '/hr/contact',
        locale: false,
        permanent: false,
      },
      {
        // this matches '/' since `en` is the defaultLocale
        source: '/tours',
        destination: '/hr/tours',
        locale: false,
        permanent: false,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['lh3.googleusercontent.com'],
  },
};
