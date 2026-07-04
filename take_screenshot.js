const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });
        
        await page.goto('http://localhost:8000/', { waitUntil: 'networkidle2' });
        await page.screenshot({ path: 'screenshot_desktop.webp', type: 'webp' });
        
        await page.setViewport({ width: 375, height: 812 });
        await page.screenshot({ path: 'screenshot_mobile.webp', type: 'webp' });
        
        await browser.close();
        console.log('Screenshots saved as screenshot_desktop.webp and screenshot_mobile.webp');
    } catch (err) {
        console.error('Puppeteer error:', err);
    }
})();
