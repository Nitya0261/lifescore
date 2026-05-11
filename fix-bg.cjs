const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir("./src", function (filePath) {
  if (filePath.endsWith(".jsx") || filePath.endsWith(".css")) {
    let content = fs.readFileSync(filePath, "utf8");
    let original = content;

    // We only want to replace background instances of var(--ink) with var(--dark-bg)
    // It can be `background: var(--ink)` or `background-color: var(--ink)`
    // Be careful with JS string literals `background: "var(--ink)"`

    content = content.replace(/background:\s*["']?var\(--ink\)["']?/g, 'background: var(--dark-bg)');
    content = content.replace(/background-color:\s*["']?var\(--ink\)["']?/g, 'background-color: var(--dark-bg)');

    // In JSX files, it's usually background: "var(--ink)"
    // The above regex with optionasl quote will match both CSS and JSX forms, 
    // but in JSX we need quotes around the replacement.
    // Let's do it safer:

    if (filePath.endsWith(".jsx")) {
      content = content.replace(/background:\s*["']var\(--ink\)["']/g, 'background: "var(--dark-bg)"');
      // Profile.jsx has linear-gradient(135deg, var(--ink), var(--ink2))
      content = content.replace(/var\(--ink\)/g, 'var(--dark-bg)'); // Just in linear gradients or anywhere! 
      // Wait, if I replace all var(--ink) in JSX, I might break color: "var(--ink)".
      // Let's restore color: "var(--dark-bg)" back to color: "var(--ink)"
      content = content.replace(/color:\s*["']var\(--dark-bg\)["']/g, 'color: "var(--ink)"');
    } else if (filePath.endsWith(".css")) {
      content = content.replace(/background:\s*var\(--ink\)/g, 'background: var(--dark-bg)');
      content = content.replace(/background-color:\s*var\(--ink\)/g, 'background-color: var(--dark-bg)');
      // borders:
      content = content.replace(/border-top:\s*3px solid var\(--ink\)/g, 'border-top: 3px solid var(--dark-bg)');
      content = content.replace(/border-bottom:\s*3px solid var\(--ink\)/g, 'border-bottom: 3px solid var(--dark-bg)');
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log("Updated", filePath);
    }
  }
});
