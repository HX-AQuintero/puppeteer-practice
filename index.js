'use-strict';

const puppeteer = require('puppeteer');

(async () => {
    console.log('Launch browser!');
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--window-size=600,600']
    });
    try {
        let infoObject = {};
        const page = await browser.newPage();
        const url = 'https://www.merriam-webster.com/word-of-the-day';
        await page.goto(url, { 
            waitUntil: "domcontentloaded",
        });
    
    
        let title = await page.evaluate(() => {
            let arrayHeaders = [];
            arrayHeaders[0]  = document.querySelector('h1').innerText + document.querySelector('div.w-a-title > span').innerText;
            arrayHeaders[1] = document.querySelector('body > div > div > div.main-wrapper.clearfix > main > article > div.article-header-container.wod-article-header > div.quick-def-box > div.word-header > div > h2').innerText;
            return arrayHeaders;
        });
    
        let paragraphs = await page.evaluate(async () => {
            let arrayParagraphs = [];
            for (let i = 2; i < 5; i++) {
                arrayParagraphs.push(await document.querySelector(`body > div > div > div.main-wrapper.clearfix > main > article > div.lr-cols-area.clearfix.sticky-column.d-flex > div.left-content > div > div.wod-definition-container > p:nth-child(${i})`).innerText); 
            }
            return arrayParagraphs;
        });
    
        infoObject['title'] = title;
        infoObject['paragraphs'] = paragraphs;
        // return infoObject;

        await page.waitForSelector('body > div > div > div.main-wrapper.clearfix > main > article > div.lr-cols-area.clearfix.sticky-column.d-flex > div.left-content > div > div.wod-definition-container > p:nth-child(4)');
        await page.screenshot({
            path: './images/img.jpg',
            clip: {
                width: 600,
                height: 900,
                x: 0,
                y: 60
            }
            // fullPage: true

        });

        await page.pdf({
            path: './pdfs/demo.pdf'
        })
    } catch (error) {
        console.error(error);
    } finally {
        await browser.close();
    }
})();

