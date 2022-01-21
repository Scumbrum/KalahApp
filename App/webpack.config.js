const path = require('path')
module.exports = {
    mode:"development",
    entry: './script/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,"./public")
    },
    module:{
        rules:[
          {
            test: /\.less$/,
            use:[
              {loader: "style-loader"},
              {loader:"css-loader"},
              {loader: "less-loader"}
            ]
          },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: "babel-loader"
                }
            },
        ]
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'index.html'),
        },
    },
    devServer: {
      static: {
        directory: __dirname,
      },
      compress: true,
      port: 9000,
    },
}