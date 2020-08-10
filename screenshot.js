const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://dn.se');
  await page.screenshot({path: 'mmmmm.jpg'});
 
  await browser.close();
})();