import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/** Must match the nginx.conf /api/monday location. */
const MONDAY_API_ORIGIN = 'https://api.monday.com';
const MONDAY_API_VERSION = '2024-01';

/**
 * Fails the build if the Monday token value ends up in any emitted file.
 * The token is only for the dev proxy / nginx and must never be referenced from src/.
 */
const forbidSecretInBundle = (secret: string | undefined): Plugin => ({
  name: 'forbid-secret-in-bundle',
  apply: 'build',
  generateBundle(_options, bundle) {
    if (!secret) return;
    for (const file of Object.values(bundle)) {
      const content = file.type === 'chunk' ? file.code : typeof file.source === 'string' ? file.source : '';
      if (content.includes(secret)) {
        this.error(`VITE_MONDAY_API_TOKEN leaked into ${file.fileName}. Never reference it from src/.`);
      }
    }
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const mondayToken = env.VITE_MONDAY_API_TOKEN;

  return {
    plugins: [react(), tailwindcss(), forbidSecretInBundle(mondayToken)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Dev equivalent of the nginx /api/monday reverse proxy.
      proxy: {
        '/api/monday': {
          target: MONDAY_API_ORIGIN,
          changeOrigin: true,
          rewrite: () => '/v2',
          headers: {
            Authorization: mondayToken ?? '',
            'API-Version': MONDAY_API_VERSION,
          },
        },
      },
    },
  };
});

