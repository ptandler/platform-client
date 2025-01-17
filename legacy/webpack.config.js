var path = require('path');
var webpack = require('webpack');
var imgPath = path.resolve('node_modules/ushahidi-platform-pattern-library/assets/');


var GIT_COMMIT;
// Try to get the current GIT COMMIT
try {
    GIT_COMMIT = require('child_process').execSync('git rev-parse HEAD').toString().trim();
} catch (e) {
    GIT_COMMIT = process.env.CI_COMMIT_ID || null;
}

module.exports = {
    devtool: 'source-map',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'system'
},
    module: {
        rules: [
            {
                type: 'javascript/auto',
                test: /\.js$/,
                exclude: [/app\/lib/, /node_modules/],
                use: [
                    'ng-annotate-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', { modules: false }],
                                'stage-0'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'use:xlink:href', 'link:href'],
                            root: imgPath
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    //MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.png/,
                use: {
                    // loader: 'url-loader?limit=10000'
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader?limit=1',
                    options: {
                        // make loader to behave like url-loader, for all svg files
                        encoding: 'base64'
                    },
                }
            },
            {
                test: /\.woff/,
                use: 'url-loader?limit=10000'
            },
            {
                test: /\.ttf|\.eot/,
                use: 'file-loader'
            },
            {
                type: 'javascript/auto',
                test: /manifest\.json$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'manifest.json',
                            esModule: false
                        }
                    }
                ]
            },
            {
                parser: {
                    system: false
                }
            }
        ]
    },
    plugins: [
        // Skip locales
        new webpack.IgnorePlugin(/^\.\/locale$/, /dayjs$/),
        new webpack.DefinePlugin({
            BACKEND_URL: JSON.stringify(process.env.BACKEND_URL || 'http://backend.url.undefined'),
            ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT || 'dev'),
            VERIFIER: JSON.stringify(process.env.VERIFIER || false),
            GIT_COMMIT: JSON.stringify(GIT_COMMIT || false),
            USH_DISABLE_CHECKS: JSON.stringify(process.env.USH_DISABLE_CHECKS) || false
        })
    ]
}

