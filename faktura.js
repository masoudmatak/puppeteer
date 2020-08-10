const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

try {
    (async () => {
        var dataBinding = {
            items: [{
                name: "item 1",
                price: 100
            },
            {
                name: "item 2",
                price: 200
            },
            {
                name: "item 3",
                price: 300
            }
            ],
            total: 600,
            isWatermark: true
        }

        var templateHtml = fs.readFileSync(path.join(process.cwd(), 'templates/invoice.html'), 'utf8');
        var template = handlebars.compile(templateHtml);
        var finalHtml = encodeURIComponent(template(dataBinding));
        var options = {
            format: 'A4',
            headerTemplate: "<p></p>",
            footerTemplate: "<p></p>",
            displayHeaderFooter: false,
            margin: {
                top: "40px",
                bottom: "100px"
            },
            printBackground: true,
            path: 'invoice.pdf'
        }

        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
            waitUntil: 'networkidle0'
        });
        await page.pdf(options);
        await browser.close();

        console.log('Done: invoice.pdf is created!')
    })();
} catch (err) {
    console.log('ERROR:', err);
}