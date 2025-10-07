import type { Plugin } from 'vite';

export function injectEnvPlugin(): Plugin {
  return {
    name: 'inject-env',
    transformIndexHtml(html) {
      const apiKey = process.env.COINGECKO_API_KEY || '';
      return html.replace('__COINGECKO_API_KEY_PLACEHOLDER__', apiKey);
    },
  };
}
