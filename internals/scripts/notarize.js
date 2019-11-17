/* eslint-disable @typescript-eslint/no-var-requires, global-require */

require('dotenv').config();
const path = require('path');
const fs = require('fs');

const { notarize: electronNotarize } = require('electron-notarize');

exports.default = async context => {
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appBundleId = 'io.ganeshrvel.openmtp';
  const appName = context.packager.appInfo.productFilename;
  const appPath = path.join(appOutDir, `${appName}.app`);
  const appleId = process.env.APPLEID;
  const appleIdPassword = `@keychain:ELECTRON_NOTORIZE_PASSWORD`;

  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`);
  }

  console.info(`Notarizing ${appBundleId} found at ${appPath}`);

  // eslint-disable-next-line no-return-await
  return await electronNotarize({
    appBundleId,
    appPath,
    appleId,
    appleIdPassword
  });
};
