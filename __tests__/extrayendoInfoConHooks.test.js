const puppeteer = require('puppeteer')

xdescribe('test five', () => {

    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // slowMo: 800
        });
        page = await browser.newPage();
        await page.goto('https://platzi.com', {
            waitUntil: 'networkidle0'
        });

    });

    afterAll(async () => {
        await browser.close();
    })

    it('extrayendo titulo y url', async () => {
        //extrae el título y la url
        const titulo = await page.title();
        const url = page.url();
    }, 8000);

    it('extrayendo informacion de un elemento', async () => {
        //extrae la información de un elemento
        await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > section > button.Button.Button--medium.Button--sky.Button--primary.Nav-header-mobileCtas-actions--join');
    
        //$eval análogo a querySelector
        const nombreBoton = await page.$eval('#Header-v2 > nav.Nav-header.Nav-header-mobileCtas > section > button.Button.Button--medium.Button--sky.Button--primary.Nav-header-mobileCtas-actions--join', (boton) => boton.textContent);
    }, 6000);

    it('extrayendo informacion usando XPath', async () => {
        //extrae la información de un elemento usando XPath y $x
        const [boton] = await page.$x('//*[@id="Header-v2"]/nav[1]/section/button[1]');
        const propiedad = await boton.getProperty('textContent');
        const textoBoton = await propiedad.jsonValue();
    
        //otras formas con XPath
        const textoBoton2 = await page.evaluate((name) => name.textContent, boton);
    
        const boton2 = await page.waitForXPath('//*[@id="Header-v2"]/nav[1]/section/button[1]');
        const textoBoton3 = await page.evaluate((name) => name.textContent, boton2);
    }, 10000);

    it('contando elementos', async () => {
        //contar los elementos HTML usando $$eval similar a querySelectorAll
        const images = await page.$$eval('img', (imagenes) => imagenes.length);
    });
})