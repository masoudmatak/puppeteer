const puppeteer = require('puppeteer');
const fs=require('fs-extra');
const hbs=require('handlebars');
const path=require('path');
const moment=require('moment');



const compile2 = async function(mallen, data){
	return hbs.compile(mallen)(data);
   };

hbs.registerHelper('dateFormat', function( value,format  ){
	return moment(value).format(format);
});

(async function(){

try{
const browser=await puppeteer.launch();
const page=await browser.newPage();

const mallen="<html><body><center><p>{{id.name.first}}  {{id.name.last}}</p><p>{{id.animal}}  {{id.color}}  {{id.breed}}</p>"
+"<table  border=\"0\"><tr><th>Type</th><th>Date</th></tr>{{#each shots as |shot|}}<tr><td>{{shot.type}}</td>"+
"<td>{{dateFormat shot.date 'MM Do'}}</td></tr>{{/each}}</table><p>{{texten}}  </p></center></body></html>";


const mindata ={
	id:
	{
	  name:{
		first:"Magnus",
		last: "Bigersson"
	  },
	  animal:"Hund",
	  color:"Gul",
	  breed:"Karolins hund"
	},
	
	texten:"Varför inför SEB QR-kod vid identifiering.. logga in på internetbanken."
	,
	
	
	shots:
	[
	 {
	  type:"Hamidi",
	  date: "2017-02-27"
	 },
	 {
	  type: "Kennel",
	  date: "2018-01-27"
	 },
	 {
	  type: "Jonsson",
	  date: "2020-12-27"
	 },
	 {
	  type: "Malin",
	  date: "2020-08-12"
	 }
	]
	};
const content= await compile2(mallen,mindata);
await page.setContent(content);
await page.pdf({
path: 'inbyggdMallGen.pdf',
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
