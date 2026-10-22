const { chromium } = require('/Users/caiqueantonio/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const page = await browser.newPage({ viewport: { width: 375, height: 667 }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(path.join(__dirname, 'conheca-sua-monstera.html')).href);
  await page.evaluate(() => document.fonts.ready);
  const fontsLoaded = await page.evaluate(() => ({ nunito: document.fonts.check('800 26px Nunito'), manrope: document.fonts.check('500 14px Manrope') }));
  if (!fontsLoaded.nunito || !fontsLoaded.manrope) throw new Error(`Fonts unavailable: ${JSON.stringify(fontsLoaded)}`);
  await page.screenshot({ path: path.join(__dirname, 'conheca-sua-monstera.png') });
  await browser.close();
  process.exit(0);
})().catch(error => { console.error(error); process.exit(1); });
