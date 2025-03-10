module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 'current'
            }
        }]
    ],
    ignore: ['node_modules'],
    include: [
        './src/**/**.js',
        './index.js',
    ],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread'
    ],
    sourceMaps: false,
};