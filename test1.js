const puppeteer = require('puppeteer');




(async function(){

try{
const browser=await puppeteer.launch();
const page=await browser.newPage();
await page.setContent('<h1>hello</h1>');
await page.pdf({
path: 'mypdfSSSSS.pdf',
format: 'A4',
printBackgrund:true
});
console.log('done');
await browser.close();
process.exit();

}catch(e){
console.log('our error', e);
}

})();
