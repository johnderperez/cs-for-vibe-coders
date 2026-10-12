import { defineConfig } from 'astro/config';
export default defineConfig({ site: process.env.SITE_URL || 'https://cs-for-vibe-coders.vercel.app', trailingSlash: 'ignore' });
