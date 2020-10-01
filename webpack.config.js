const path = require("path");

const ROOT = path.resolve(__dirname, "src");
const DESTINATION = path.resolve(__dirname, "dist");

//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    context: ROOT,
    entry: {
        main: "./index.tsx",
    },
    output: {
        filename: "firebot-profile.bundle.js",
        path: DESTINATION,
    },
    devtool: "",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: [ROOT, "node_modules"],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: [
                    "style-loader",
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [require("tailwindcss")],
                            },
                        },
                    },
                ],
            },
        ],
    },
    //plugins: [new BundleAnalyzerPlugin()],
};
