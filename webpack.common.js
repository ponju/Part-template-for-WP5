const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { htmlWebpackPluginTemplateCustomizer } = require("template-ejs-loader");
const globule=require('globule');
const rx=require('rxjs');

const SITE_NAME="My Website"

const customElements=globule.find({src:"*.html",srcBase:path.resolve(__dirname,"src/custom-elements"),prefixBase:true,matchBase:true});

const customElementPlugins=customElements.map((fileName)=>{
  console.log(fileName);
  return new HtmlWebpackPlugin({
    title:fileName,
    hash:true,
    inject:false,
    filename:path.resolve("./custom-elements",fileName),
    template:htmlWebpackPluginTemplateCustomizer(
      {
        templatePath:path.resolve("./src/custom-elements",fileName)
      }
    )
  })
});

const plugins = [
  new HtmlWebpackPlugin({
    title: SITE_NAME,
    hash: true,
    template:htmlWebpackPluginTemplateCustomizer(
      {
        templatePath:"./src/pages/index.html",
        templateEjsLoaderOption:{
          data:{
            title:SITE_NAME
          }
        }
      }
    )
  }
  ),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin()
];

customElementPlugins.every(p=>plugins.push(p));

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
        use: [
          "html-loader",
          "template-ejs-loader"
        ]
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
