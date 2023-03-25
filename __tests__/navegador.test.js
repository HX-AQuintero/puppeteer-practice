const puppeteer = require('puppeteer')

describe('test one', () => {
    it('abrir y cerrar el navegador', async () => {
        const browser = await puppeteer.launch(
            {
                headless: false, //por defecto es true. No muestra el navegador
                // slowMo: 0, //por defecto es 0. Cámara lenta para ingresar a la página
                // devtools: false, //por defecto es false. Abre las devtools al ingresar a la página
                // defaultViewport: { //abre el navegador con esas dimensiones de pantalla
                //     width: 1900,
                //     height: 1080
                // },
                // args: ['--window-size=1900,1080'], //configura Chromium
                defaultViewport: null //maximiza el vp de la página al tamaño de la ventana
            });
        const page = await browser.newPage();
        await page.goto('https://www.github.com');
        // await page.waitForTimeout(5000);
        await page.waitForSelector('p');
        await page.reload(); //recarga la página
        await page.waitForSelector('p');

        //navegar a otra página
        await page.goto('https://platzi.com/home');
        await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img');

        //navegar hacia atras
        await page.goBack();
        await page.goForward();
        // await page.waitForSelector('p');

        //nueva página
        const page2 = await browser.newPage();
        await page2.goto('https://google.com');
        await browser.close()
    }, 60000);
})