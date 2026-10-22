const { chromium } = require('/Users/caiqueantonio/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const page = await browser.newPage({ viewport: { width: 430, height: 844 }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(path.join(__dirname, 'conheca-sua-jiboia-refino.html')).href);
  await page.screenshot({ path: path.join(__dirname, 'conheca-sua-jiboia-refino.png') });
  await browser.close();
})();
