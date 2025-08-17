/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr']
  },
  // Forcer le rendu dynamique pour éviter les erreurs de cookies
  output: 'standalone',
  // Désactiver la génération statique pour les pages avec cookies
  trailingSlash: false,
  // Forcer le rendu côté serveur
  reactStrictMode: true,
}

module.exports = nextConfig
