const puppeteer = require('puppeteer');
const fs=require('fs-extra');
const hbs=require('handlebars');
const data=require('./database.json');
const path=require('path');
const moment=require('moment');


const params:{
	
"id":
{
  "name":{
    "first":"Masoud",
    "last": "Joharai"
  },
  "animal":"Dog",
  "color":"Yellow",
  "breed":"Carolina Dog"
},

"texten":"Varför inför SEB QR-kod vid identifiering med mobilt"
,


"shots":
[
 {
  "type":"Hamidi",
  "date": "2017-02-27"
 },
 {
  "type": "Kennel",
  "date": "2018-01-27"
 },
 {
  "type": "Jonsson",
  "date": "2020-12-27"
 },
 {
  "type": "Malin",
  "date": "2020-08-12"
 }
]

}
const compile = async function(templateName, data){
 const filePath= path.join(process.cwd(), 'templates','shot-list.html');
 const html = await fs.readFile(filePath,'utf-8');
 return hbs.compile(html)(params);
};


hbs.registerHelper('dateFormat', function( value,format  ){
	//console.log('formatting',value,format);
	return moment(value).format(format);
});

(async function(){

try{
const browser=await puppeteer.launch();
const page=await browser.newPage();

const content= await compile('shot-list',data);

await page.setContent(content);
await page.pdf({
path: 'advanced2.pdf',
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
