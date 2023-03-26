const puppeteer = require('puppeteer')

xdescribe('test two', () => {
    it('interactuando con elementos', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });

        const page = await browser.newPage();

        await page.goto('https://demo.guru99.com/test/simple_context_menu.html');

        //listener para alerts
        page.on('dialog', async (dialog) => {
            await dialog.accept()
        });

        //Click derecho
        await page.click('#authentication > span', {
            button: 'right',
            delay: 500
        });

        await new Promise(r => setTimeout(r, 5000));

        //Doble Click
        await page.click('#authentication > button', {
            clickCount: 2,
            delay: 500
        });

        await new Promise(r => setTimeout(r, 5000));

        //completando un formulario
        await page.goto('https://devexpress.github.io/testcafe/example/');

        //tipeando elemento input
        await page.type('#developer-name', 'Alejandro', {
            delay: 500
        });

        await page.click('#remote-testing', {
            delay: 500
        });

        await page.click('#windows');

        //escogiendo valor de un select
        await page.select('#preferred-interface', 'JavaScript API');

        await page.click('#tried-test-cafe', {
            button: 'left', //default
            delay: 500
        });

        await page.type('#comments', 'Esto es un comentario')

        await page.click('#submit-button', {
            delay: 100
        });

        await new Promise(r => setTimeout(r, 5000));

        await browser.close();
    }, 60000);
})