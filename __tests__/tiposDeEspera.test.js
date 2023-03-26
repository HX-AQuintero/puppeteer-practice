const puppeteer = require('puppeteer')

xdescribe('test three', () => {
    jest.setTimeout(15000); //Timeout: 5000 ms por test
    it('interactuando con elementos', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // slowMo: 800
        });

        const page = await browser.newPage();

        // page.setDefaultTimeout(10000);
        // page.setDefaultNavigationTimeout(10000);

        await page.goto('https://platzi.com', {
            waitUntil: 'networkidle0'
        });

        //espera explicita
        await new Promise(r => setTimeout(r, 5000));

        //espera por un css selector
        await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img');

        //espera por un xpath
        await page.waitForXPath('//*[@id="Header-v2"]/nav[1]/div[1]/div/a/div/figure/img');
        
        await page.goto('https://demoqa.com/modal-dialogs', {
            waitUntil: 'networkidle2'
        });

        //espera por la visibilidad de un elemento HTML
        const boton = await page.waitForSelector('#showSmallModal', {
            visible: true
        });

        await boton.click();

        //espera por función
        await page.waitForFunction(() => document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')

        //observa el viewport
        const observaResize = page.waitForFunction('window.innerWidth < 100')
        await page.setViewport({
            width: 50,
            height: 50
        });
        await observaResize;

        //cierra el modal
        await page.click('#closeSmallModal');
        await page.waitForFunction(() => !document.querySelector('#example-modal-sizes-title-sm'))

        await browser.close();

    });
})

