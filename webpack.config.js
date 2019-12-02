const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = async env => {
  return {
    entry: {
      main: "./src/main.ts"
    },
    output: {
      filename: "./[name].js",
      path: path.resolve(__dirname, "dist")
    },
    target: "node",
    // externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.node$/,
          use: "node-loader"
        },
        {
          test: /\.tsx?$/, // typescript loader for the .ts and .tsx files
          use: [
            {
              loader: "babel-loader"
              // options: {
              //     'plugins': ['@babel/plugin-syntax-dynamic-import']
              // }
            },
            {
              loader: "ts-loader",
              options: {
                // appendTsSuffixTo: [/\.vue$/], // needed to import vue's template files in .ts files
                configFile: path.resolve(
                  // path to the tsconfig.json file
                  __dirname,
                  "./tsconfig.json"
                )
              }
            }
          ],

          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      modules: [path.resolve("./node_modules")], // necessary to resolve npm packages
      extensions: [".ts", ".js"] // necessary to build files with these extensions
    },
    optimization: {
      minimize: true, // minimize bundle size only in prod
      minimizer: [
        new TerserPlugin({
          // This plugin uses terser to minify the bundle
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: true,
          cache: true
        })
      ]
    }
  };
};
