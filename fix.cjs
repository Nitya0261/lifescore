const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir("./src", function(filePath) {
  if (filePath.endsWith(".jsx")) {
    let content = fs.readFileSync(filePath, "utf8");
    let original = content;
    
    // Fix backgrounds
    content = content.replace(/background:\s*["']#fff["']/g, 'background: "var(--card-bg)"');
    content = content.replace(/background:\s*["']white["']/g, 'background: "var(--card-bg)"');
    
    // Fix dark text hardcodes
    content = content.replace(/color:\s*["']#000["']/g, 'color: "var(--ink)"');
    content = content.replace(/text-dark/g, 'text-body'); // Bootstrap class fix (text-body inherits from body, which we set)
    content = content.replace(/bg-light/g, 'bg-body-secondary'); // Better bootstrap dark mode adapt
    
    // Let's specifically target the text colors that might be hardcoded to black or dark gray
    content = content.replace(/color:\s*["']#333["']/g, 'color: "var(--ink)"');
    content = content.replace(/color:\s*["']#111["']/g, 'color: "var(--ink)"');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log("Updated", filePath);
    }
  }
});
