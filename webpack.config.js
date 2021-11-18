const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = (env) => {
    const inProduction = env.production;
    return {
        entry: {
            app: {
                import: "./resources/react/src/index.js",
                filename: "js/app.min.js",
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.(s(a|c)ss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: "file-loader",
                        },
                    ],
                },
            ],
        },
        devtool: !inProduction ? "source-map" : false,
        resolve: {
            alias: {
                "@": resolve("./resources/react/src"),
            },
            extensions: ["*", ".js", ".jsx"],
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({ parallel: true, extractComments: false }),
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/[name].min.css",
            }),
        ],
        output: {
            path: resolve("./public"),
            filename: "[name].min.js",
        },
    };
};
