import puppeteer from 'puppeteer';

async function testHydration() {
  console.log('🚀 Starting hydration test on preview server (production bundle) using Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const logs = [];
  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    logs.push(`[JS ERROR] ${err.toString()}`);
  });

  console.log('🌐 Navigating to http://localhost:4174/about...');
  try {
    await page.goto('http://localhost:4174/about', { waitUntil: 'networkidle0', timeout: 15000 });
    console.log('✅ Navigated successfully!');
  } catch (err) {
    console.error('❌ Navigation failed:', err.message);
  }

  await new Promise(r => setTimeout(r, 3000));

  console.log('📋 --- CONSOLE LOGS ---');
  logs.forEach(log => console.log(log));
  console.log('📋 --------------------');

  const pageText = await page.evaluate(() => document.body.innerText);
  console.log('📄 Page Body Text (first 2000 chars):');
  console.log(pageText.slice(0, 2000));

  await browser.close();
}

testHydration().catch(console.error);
