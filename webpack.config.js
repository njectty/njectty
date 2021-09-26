const { resolve } = require("path");

module.exports = {
    target: "node",
    mode: "production",

    entry: {
        index: "./src/public-api/index.ts",
        implementation: "./src/implementation/index.ts",
    },
    output: {
        path: resolve("package"),
        filename: "[name].js",
        library: {
            type: "commonjs2",
        },
    },

    resolve: {
        extensions: [".ts"],
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }],
    },
};
