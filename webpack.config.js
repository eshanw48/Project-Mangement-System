/**
 * Config for webpack to transpile and bundle all necessary 
 * src files into one bundle for the front end
 */

// package dependencies
const path = require("path");


/** Webpack Loaders */

// Javascript Loader - transpile and bundle all .js and .jsx files
const JS_LOADER = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: "babel-loader"
};

// CSS Loader - transpile and bundle all .css files
const CSS_LOADER = {
    test: /\.css$/,
    use: [
        "style-loader",
        {
            loader: "css-loader",
            options: {
                // each component gets its appropriate class
                modules: {
                    localIdentName: "[name]__[local]___[hash:base64:5]"
                }
            },
        }
    ]
};

// Images Loader - transpile and bundle all image files (png/svg/jpg/gif)
const IMAGE_LOADER = {
    test: /\.(png|svg|jpg|gif)$/,
    use: ["file-loader"]
};


/** Exports for Webpack */

module.exports = {
    mode: "development",
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        filename: "main.bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [JS_LOADER, CSS_LOADER, IMAGE_LOADER]
    },
    resolve: {
        // shorthand alias for quickly importing components and styles
        alias: {
            Components: path.resolve(__dirname, "src/components"),
            Styles: path.resolve(__dirname, "src/styles"),
            Assets: path.resolve(__dirname, "src/assets"),
            Utilities: path.resolve(__dirname, "src/utilities"),
        }
    }
}
