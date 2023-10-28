/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["avatars.githubusercontent.com", "res.cloudinary.com"]
    },
    env: {
        C_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        C_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        C_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL
    }
}

module.exports = nextConfig
