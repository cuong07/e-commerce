/** @type {import('next').NextConfig} */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        const serverSideOrProd = isServer || !dev;
        if (!serverSideOrProd) {
            config.externals.push(
                {
                    'utf-8-validate': 'commonjs utf-8-validate',
                    bufferutil: 'commonjs bufferutill',
                },
                new BrowserSyncPlugin(
                    {
                        host: '0.0.0.0',
                        port: 3001,
                        open: false,
                        proxy: 'http://localhost:3000/',
                    },
                    {
                        reload: false,
                        injectChanges: false,
                    },
                ),
            );
        }
        return config;
    },
    images: {
        domains: [
            'localhost',
            'utfs.io',
            'sacus.vn',
            'upload.wikimedia.org',
            'inkythuatso.com',
            'www.mungbaobao.com',
            'cdn.pixabay.com',
        ],
    },
};

module.exports = nextConfig;
