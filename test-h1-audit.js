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

const h1Report = [];

walkDir(pagesDir, filePath => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    const code = fs.readFileSync(filePath, 'utf8');
    const hasH1 = code.includes('<h1');
    const hasH2 = code.includes('<h2');
    h1Report.push({
      file: path.relative(pagesDir, filePath),
      hasH1,
      hasH2
    });
  }
});

console.log('📋 --- H1 ELEMENT AUDIT ---');
h1Report.forEach(item => {
  const status = item.hasH1 ? '✅ HAS H1' : '❌ NO H1';
  console.log(`📄 File: ${item.file.padEnd(45)} | ${status.padEnd(10)} | ${item.hasH2 ? 'Contains H2' : 'No H2'}`);
});
