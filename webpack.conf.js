import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import merge from 'webpack-merge'; // eslint-disable-line import/no-extraneous-dependencies

const TARGET = process.env.npm_lifecycle_event;

const common = {
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    jquery: 'jQuery',
    jQuery: 'jQuery',
  },
};

if (TARGET === 'start' || TARGET === 'continue') {
  module.exports = merge(common, {
    devtool: '#source-map',
  });
} else if (TARGET === 'build' || 0 === TARGET.indexOf( 'wp-' )) {
  module.exports = merge(common, {
    devtool: false,
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: { comments: false },
        sourceMap: false,
      }),
    ],
  });
} else {
  module.exports = common;
}
