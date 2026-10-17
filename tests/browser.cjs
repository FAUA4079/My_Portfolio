const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const server = http.createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = path.join(root, pathname === '/' ? 'index.html' : pathname);
  if (!file.startsWith(root + path.sep)) {res.writeHead(403);return res.end();}
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {file=path.join(root,'404.html');res.statusCode=404;}
  const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.png':'image/png','.svg':'image/svg+xml'};
  res.setHeader('Content-Type',types[path.extname(file)] || 'text/plain');res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  let browser;
  try {
    browser = await chromium.launch({headless:true, ...(process.env.BROWSER_PATH ? {executablePath:process.env.BROWSER_PATH} : {})});
    const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.route('https://fonts.googleapis.com/**',r=>r.abort());
    const origin='http://127.0.0.1:'+server.address().port;
    for(const width of [375,1280]) {
      await page.setViewportSize({width,height:720});
      for(const name of ['index','about','education','experience','achievements','projects','blog','contact','404']) {
        await page.goto(origin+'/'+name+'.html');
        assert.equal(await page.locator('h1').count(),1,name);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true, name+' overflows at '+width);
      }
    }
    for (const [name,a,b] of [['projects','defensive','offensive'],['achievements','ctfs','seminars']]) {
      await page.goto(origin+'/'+name+'.html');
      await page.locator('[data-tab="'+a+'"]').click();await page.locator('[data-tab="'+b+'"]').click();
      await page.goBack();assert.equal(await page.locator('[data-tab="'+a+'"]').getAttribute('aria-selected'),'true');
      await page.goBack();assert.equal(new URL(page.url()).hash,'');
      assert.equal(await page.locator('[data-tab]').first().getAttribute('aria-selected'),'true');
      await page.goForward();assert.equal(new URL(page.url()).hash,'#'+a);
      await page.locator('[data-tab="'+a+'"]').focus();await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('[data-tab="'+b+'"]').getAttribute('aria-selected'),'true');
      await page.goto(origin+'/'+name+'.html#unknown');
      assert.equal(await page.locator('[data-tab]').first().getAttribute('aria-selected'),'true');
    }
    await page.goto(origin+'/projects.html');
    const trigger=page.locator('#tab-all [data-project]').first();await trigger.click();
    assert.equal(await page.locator('#projectModal').evaluate(d=>d.open),true);
    assert.equal(await page.evaluate(()=>!!document.activeElement.closest('dialog')),true);
    for(let i=0;i<5;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>!!document.activeElement.closest('dialog')),true);}
    await page.keyboard.press('Escape');assert.equal(await page.locator('#projectModal').evaluate(d=>d.open),false);
    assert.equal(await trigger.evaluate(t=>document.activeElement===t),true);
    await page.goto(origin+'/achievements.html#ctf-2');
    assert.equal(await page.locator('#ctf-modal-2').evaluate(d=>d.open),true);
    assert.equal(await page.locator('[data-tab="ctfs"]').getAttribute('aria-selected'),'true');
    await page.setViewportSize({width:375,height:320});
    assert.equal(await page.locator('#ctf-modal-2 .ctf-modal-content').evaluate(e=>getComputedStyle(e).overflowY),'auto');
    await page.keyboard.press('Escape');
    await page.goto(origin+'/blog.html');assert.equal(await page.locator('#blogContainer article').count(),5);
    await page.locator('#nextBtn').click();assert.equal(new URL(page.url()).searchParams.get('page'),'2');
    await page.goBack();assert.equal(await page.locator('#pageIndicator').textContent(),'Page 1 of 2');
    await page.setViewportSize({width:375,height:720});await page.locator('.nav-toggle').click();assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'),'false');
    const response=await page.goto(origin+'/missing/nested/page');assert.equal(response.status(),404);
    await page.locator('.navbar-brand').click();assert.equal(new URL(page.url()).pathname,'/index.html');
    await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.glitch').evaluate(e=>getComputedStyle(e,'::before').animationName),'none');
    const nojs=await browser.newContext({javaScriptEnabled:false});const staticPage=await nojs.newPage();
    await staticPage.goto(origin+'/projects.html');assert.equal(await staticPage.locator('#grid-all article').count(),1);
    await staticPage.goto(origin+'/blog.html');assert.equal(await staticPage.locator('#blogContainer article').count(),10);
    await nojs.close();assert.deepEqual(errors,[]);
    console.log('PASS: responsive pages, history, tabs, dialogs/focus, deep links, blog pagination, mobile menu, nested 404, reduced motion and no-JS content');
  } finally {await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
