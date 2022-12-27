
const path = require("path");

const HtmlWebpackPlugin=require("html-webpack-plugin");

const plugins=[
    new HtmlWebpackPlugin({
        title:"My Website",
        hash:true,
        template:"./src/pages/index.html"
    })
];

module.exports = {
  //jsファイルのエントリーポイント。のちのちtsに変更
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  //各拡張子のファイルへ作用するローダーを記述
  module: {
    rules:[
    //jsのバンドル
    {
        test:/\.js$/,
          use:{
            loader:"babel-loader",
              options:{
                presets:[
                  [
                    "@babel/preset-env",
                          {modules:false},
                      ]
                  ]
              }
          }
      },
    //htmlのバンドル
    {
        test:/\.html$/,
        loader:"html-loader"
    },
    //静的ファイル。Asset Modulesを利用
    {
        test: /\.(jpe?g|gif|png|svg|mp4|json)$/,
        generator: {
          filename: "./resources/[name][ext]",
        },
        type: "asset/resource",
      },
]
  },
  //ライブラリー参照を解決するための記述
  resolve: {
    modules: ["/node_modules"],
    extensions: [".tsx", ".ts", ".js", ".scss"],
  },
  plugins:plugins
};