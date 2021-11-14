const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = (env) => {
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
            ],
        },
        resolve: {
            alias: {
                "@": resolve("resources/react/src"),
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
            path: path.resolve(__dirname, "./public"),
            filename: "[name].min.js",
        },
    };
};
