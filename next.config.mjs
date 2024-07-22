/** @type {import('next').NextConfig} */
import withImages from 'next-images';

const nextConfig = {
    images: {
        domains: ['edamam-product-images.s3.amazonaws.com'],
      },
};

export default withImages(nextConfig);