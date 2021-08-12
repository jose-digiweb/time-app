const production = 'development';
const development = 'development';

module.exports = {
  mode: development,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
};
