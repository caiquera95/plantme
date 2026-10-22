const { chromium } = require('/Users/caiqueantonio/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const page = await browser.newPage({ viewport: { width: 1300, height: 770 }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(path.join(__dirname, 'identificacao-jiboia-refino.html')).href);
  await page.evaluate(() => document.fonts.ready);
  const fontsLoaded = await page.evaluate(() => ({ nunito: document.fonts.check('800 26px Nunito'), manrope: document.fonts.check('400 14px Manrope') }));
  if (!fontsLoaded.nunito || !fontsLoaded.manrope) throw new Error(`Fonts unavailable: ${JSON.stringify(fontsLoaded)}`);
  await page.locator('.board').screenshot({ path: path.join(__dirname, 'identificacao-jiboia-refino.png') });
  const names = ['01-conferir-foto.png', '02-identificando.png', '03-confirmar-jiboia.png'];
  for (let i = 0; i < names.length; i++) {
    await page.locator('.screen').nth(i).screenshot({ path: path.join(__dirname, names[i]) });
  }
  await browser.close();
  process.exit(0);
})().catch(error => { console.error(error); process.exit(1); });
