const loaderUtils = require('loader-utils');
const path = require('path');

module.exports = function (content) {
  const options = loaderUtils.getOptions(this);
  if (!options || !options.transform) {
    return content;
  }
  const filePath = loaderUtils.interpolateName(
    this,
    '[path][name].[ext]',
    {},
  );
  const dirPath = path.dirname(filePath);
  const fileName = path.basename(filePath);
  return options.transform(content, {
    filePath, dirPath, fileName,
  });
};
