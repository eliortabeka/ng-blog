const fs = require('fs-extra');
(async () => {
  const src = './src/int-ng-blog-firebase-adminsdk-odutv-73c60cb0f1.json';
  const lib = './lib/int-ng-blog-firebase-adminsdk-odutv-73c60cb0f1.json';
  await fs.remove(lib);
  await fs.copy(src, lib);
})();
