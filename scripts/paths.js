const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(pathParam, needsSlash) {
  const hasSlash = pathParam.endsWith('/');
  if (hasSlash && !needsSlash) {
    return pathParam.substr(pathParam, pathParam.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${pathParam}/`;
  }
  return pathParam;
}

const getServedPath = () => ensureSlash(envPublicUrl || '/', true);

module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.jsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: envPublicUrl,
  servedPath: getServedPath(),
};