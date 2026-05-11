const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDir = fs.statSync(dirPath).isDirectory();
    isDir ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir("./src", filePath => {
  if (!filePath.endsWith(".jsx")) return;

  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  // Fix: background: "#fff" or background: '#fff' or background: "white"
  content = content.replace(/background:\s*"#fff"/g, 'background: "var(--card-bg)"');
  content = content.replace(/background:\s*'#fff'/g, "background: 'var(--card-bg)'");
  content = content.replace(/background:\s*"white"/g, 'background: "var(--card-bg)"');

  // Fix: background: "var(--ink)" used as a card background (dark navy) — replace with dark-surface
  // We need to distinguish: 
  //   - linear-gradient(..., var(--ink), ...) → keep (these are intentional dark backgrounds like hero/admin header)
  //   - background: "var(--ink)" alone → replace with "var(--dark-surface)"
  content = content.replace(/background:\s*"var\(--ink\)"(?!\s*,)/g, 'background: "var(--dark-surface)"');

  // Fix plain hardcoded text colours
  content = content.replace(/color:\s*"#1a1a2e"/g, 'color: "var(--ink)"');
  content = content.replace(/color:\s*"#2d2d44"/g, 'color: "var(--ink2)"');
  content = content.replace(/color:\s*"#000000"/g, 'color: "var(--ink)"');
  content = content.replace(/color:\s*"#111111"/g, 'color: "var(--ink)"');
  content = content.replace(/color:\s*"#222222"/g, 'color: "var(--ink)"');

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Fixed:", filePath.replace("./src/", ""));
  }
});

console.log("Done.");
