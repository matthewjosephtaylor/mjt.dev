const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
// const ThreadsPlugin = require("threads-plugin");
const nodeExternals = require("webpack-node-externals");
// const WebpackUserscript = require('webpack-userscript')
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const path = require("path");

const BUILD_TIME_MILLIS = new Date().getTime();
const projectPackage = require("./package.json");
// import projectPackage  from "./package.json";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  mode: "development",
  // mode: "production",
  cache: {
    type: "filesystem",
    // cacheDirectory: path.resolve(__dirname, '.temp_cache')
  },
  // target: "node",
  target: "web",
  node: {
    // empty polyfill for node globals
    fs: "empty",
    child_process: "empty",
  },
  watch: false,
  entry: "./src/ts/index.ts",
  // entry: "./src/ts/content/ContentTests.ts",
  output: {
    // path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
  },
  // devtool: 'eval-source-map',
  devtool: "inline-source-map",
  // devtool: "source-map",
  plugins: [
    // new ThreadsPlugin(),
    new HtmlWebpackPlugin({
      title: JSON.stringify(projectPackage.name),
      template: 'src/html/index.html'
    }),
    gitRevisionPlugin,
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      NAME: JSON.stringify(projectPackage.name),
      VERSION: JSON.stringify(projectPackage.version),
      PROJECT_PACKAGE: JSON.stringify(projectPackage),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      BUILD_TIME_MILLIS: BUILD_TIME_MILLIS,
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   sourceRoot: "",
    // }),
  ],
  devServer: {
    // https: true,
    open: "Google Chrome",
    contentBase: [
      path.join(__dirname, "assets"),
      path.join(__dirname, "src/html"),
    ],
    disableHostCheck: true,
    watchContentBase: true,
    serveIndex: true,
    // http2: true, // http2 broken in devserver https://github.com/webpack/webpack-dev-server/issues/1713
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",

      // @see https://developer.chrome.com/blog/enabling-shared-array-buffer/
      // "Cross-Origin-Embedder-Policy": "require-corp",
      // "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      // web workers
      // {
      //   test: /\.worker\.js$/,
      //   use: { loader: "worker-loader" },
      // },
      // html
      // {
      //   test: /\.html$/i,
      //   loader: "raw-loader",
      //   // options: {
      //   //   // Disables attributes processing
      //   //   sources: false,
      //   // },
      // },
      // css
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // typescript
      {
        test: /\.tsx?$/,
        // use: 'ts-loader',
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: "esnext",
              },
            },
          },
        ],
        exclude: /node_modules/,
      },

      // jquery
      {
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: "jQuery",
          },
          {
            loader: "expose-loader",
            options: "$",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          keep_fnames: /AbortSignal/, // needed for node-fetch
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          output: {
            comments: false,
          },
        },
        extractComments: true,
      }),
    ],
    // splitChunks: {
    //   chunks: "all"
    // },

    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
    // runtimeChunk: "single",
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\\/]node_modules[\\\/]/,
    //       name: "vendors",
    //       chunks: "all",
    //     },
    //     styles: {
    //       name: "styles",
    //       test: /\.css$/,
    //       chunks: "all",
    //       enforce: true,
    //     },
    //   },
    // },
  },
};

if (process.argv.includes("node")) {
  module.exports["externals"] = [nodeExternals()];
}
