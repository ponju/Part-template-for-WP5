const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    title: "My Website",
    hash: true,
    template: "./src/pages/index.html",
  }),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin()
];

module.exports = {
  //jsファイルのエントリーポイント。のちのちtsに変更
  entry: "./src/main.ts",

  //各拡張子のファイルへ作用するローダーを記述
  module: {
    rules: [
      //jsのバンドル
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }]],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      //htmlのバンドル
      {
        test: /\.html$/,
        use: "html-loader",
      },
      //scss
      {
        test: /\.(s[ac]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      //静的ファイル。Asset Modulesを利用
      {
        test: /\.(jpe?g|gif|png|svg|mp4|json)$/,
        generator: {
          filename: "./resources/[name][ext]",
        },
        type: "asset/resource",
      },
    ],
  },
  //ライブラリー参照を解決するための記述
  resolve: {
    modules: ["/node_modules"],
    extensions: [".tsx", ".ts", ".js", ".scss"],
  },
  plugins: plugins,
};
