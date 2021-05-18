"use strict";

const Path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const webpack = require("webpack");
const getEntires = require("./configs/getEntries");

const pages = require("./src/pages");

let renderedPages = [];
for (let i = 0; i < pages.length; i++) {
  let page = Object.assign({}, pages[i]);
  renderedPages.push(
    new HtmlWebpackPlugin({
      template: page.template,
      filename: page.output,
      title: page.content.title,
      data: page.content.data || {},
      description: page.content.description,
      chunks: [page.controller],
    }),
  );
}

module.exports = options => {
  const dest = process.env.TO_ACTIVE ? Path.join(__dirname, "../single/hbs") : Path.join(__dirname, "dist");
  console.log('destPath is', dest)
  let webpackConfig = {
    devtool: options.devtool,
    entry: getEntires(),
    output: {
      path: dest,
      filename: "./assets/scripts/[name].[hash].js",
    },
    plugins: [
      new Webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ["popper.js", "default"],
      }),
      new CopyWebpackPlugin([{ from: "./src/assets/images", to: "./assets/images" }]),
      // new CopyWebpackPlugin([{ from: "./src/assets/fonts", to: "./assets/fonts" }]),
      new Webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(options.isProduction ? "production" : "development"),
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
          query: {
            helperDirs: [Path.join(__dirname, "src", "helpers")],
            partialDirs: [
              Path.join(__dirname, "src", "layouts"),
              Path.join(__dirname, "src", "components"),
              Path.join(__dirname, "src", "pages"),
            ],
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "./assets/fonts",
              },
            },
          ],
        },
        {
          test: /\.(gif|jpg|png)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "./assets/images",
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".json"],
      alias: {
        "@": Path.resolve(__dirname, "src/"),
      },
    },
  };

  if (options.isProduction) {

    webpackConfig.plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: 'assets/styles/[name]-[hash].css',
        chunkFilename: 'assets/styles/[name]-[chunkhash].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new CleanWebpackPlugin([dest], {
        verbose: true,
        dry: false,
      }),
    );

    webpackConfig.module.rules.push(
      {
        test: /\.scss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader"]
      },
    );
  } else {
    webpackConfig.plugins.push(new Webpack.HotModuleReplacementPlugin());

    webpackConfig.module.rules.push(
      {
        test: /\.scss$/i,
        use: ["style-loader?sourceMap", "css-loader?sourceMap", "sass-loader?sourceMap"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: "eslint-loader",
        exclude: /node_modules/,
      },
    );
    webpackConfig.devtool = "source-map";

    webpackConfig.devServer = {
      port: options.port,
      contentBase: dest,
      historyApiFallback: true,
      compress: options.isProduction,
      inline: !options.isProduction,
      hot: !options.isProduction,
      stats: {
        chunks: false,
      },
    };

    webpackConfig.plugins.push(
      new BrowserSyncPlugin(
        {
          host: "localhost",
          port: 3001,
          proxy: "http://localhost:8081/",
          files: [
            {
              match: ["**/*.hbs"],
              fn: function (event, file) {
                if (event === "change" || event === "add" || event === "unlink") {
                  const bs = require("browser-sync").get("bs-webpack-plugin");
                  bs.reload();
                }
              },
            },
          ],
        },
        {
          reload: false,
        },
      ),
    );
  }

  webpackConfig.plugins = webpackConfig.plugins.concat(renderedPages);

  return webpackConfig;
};
