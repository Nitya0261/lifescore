import fs from 'node:fs';
import path from 'node:path';

const pagesDir = '/Users/nitya0261/Downloads/lifescore/src/pages';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const seoUsage = [];

walkDir(pagesDir, filePath => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    const code = fs.readFileSync(filePath, 'utf8');
    const seoIndex = code.indexOf('<SEO');
    const toolLayoutIndex = code.indexOf('<ToolPageLayout');
    
    if (seoIndex !== -1) {
      // Extract the block around <SEO ... />
      const seoBlock = code.slice(seoIndex, seoIndex + 250);
      seoUsage.push({
        file: path.relative(pagesDir, filePath),
        block: seoBlock.split('/>')[0] + '/>'
      });
    } else if (toolLayoutIndex !== -1) {
      // Tool pages proxy their SEO through ToolPageLayout
      const toolLayoutBlock = code.slice(toolLayoutIndex, toolLayoutIndex + 250);
      seoUsage.push({
        file: path.relative(pagesDir, filePath),
        block: '✅ SEO & JSON-LD INJECTED VIA <ToolPageLayout ' + toolLayoutBlock.split('>')[0].replace(/\s+/g, ' ').trim() + ' />'
      });
    } else {
      seoUsage.push({
        file: path.relative(pagesDir, filePath),
        block: '⚠️ NO SEO COMPONENT FOUND!'
      });
    }
  }
});

console.log('📋 --- SEO COMPONENT USAGE SUMMARY ---');
seoUsage.forEach(item => {
  console.log(`\n📄 File: ${item.file}`);
  console.log(`   Block: ${item.block.trim().replace(/\s+/g, ' ')}`);
});
