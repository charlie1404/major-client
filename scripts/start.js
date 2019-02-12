process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', (err) => {
  throw err;
});

// Ensure environment variables are read.
require('./env');

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const paths = require('./paths');
const configFactory = require('./webpack.config');

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 4000;
const HOST = process.env.HOST || '0.0.0.0';

choosePort(HOST, DEFAULT_PORT)
  .then((port) => {
    if (port == null) {
      return;
    }
    const config = configFactory('development');
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls(protocol, HOST, port);
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler(webpack, config, null, urls);

    const serverConfig = {
      disableHostCheck: false,
      compress: true,
      clientLogLevel: 'none',
      contentBase: paths.appPublic,
      watchContentBase: true,
      hot: true,
      publicPath: config.output.publicPath,
      quiet: true,
      watchOptions: {
        ignored: ignoredFiles(paths.appSrc),
      },
      https: protocol === 'https',
      host: HOST,
      overlay: false,
      historyApiFallback: {
        disableDotRule: true,
      },
      public: urls.lanUrlForConfig,
    };
    const devServer = new WebpackDevServer(compiler, serverConfig);
    // Launch WebpackDevServer.
    devServer.listen(port, HOST, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(chalk.cyan('Starting the development server...\n'));
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
