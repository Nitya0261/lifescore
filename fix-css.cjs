const fs = require("fs");

let css = fs.readFileSync("./src/index.css", "utf8");
const original = css;

// Replace all background: #fff in CSS classes with var(--card-bg)
// We do this carefully to avoid replacing things inside dark-mode overrides we already wrote
// Split on our dark mode block to avoid touching it
const darkModeStart = css.indexOf("[data-theme='dark'] {");
const beforeDark = css.substring(0, darkModeStart);
const afterDark = css.substring(darkModeStart);

// Replace #fff backgrounds in the part BEFORE dark mode overrides
const fixedBefore = beforeDark.replace(/background:\s*#fff;/g, "background: var(--card-bg);");

// For the search input focus — it makes sense to keep white there
// Actually let's just let the dark override handle it — replace all
css = fixedBefore + afterDark;

// Also fix border-bottom: 3px solid var(--ink) in hero section (it inverts)
css = css.replace(
  ".hero-section {\n  background: var(--card-bg);\n  border-bottom: 3px solid var(--ink);",
  ".hero-section {\n  background: var(--card-bg);\n  border-bottom: 3px solid var(--border2);"
);

if (css !== original) {
  fs.writeFileSync("./src/index.css", css, "utf8");
  console.log("index.css updated.");
} else {
  console.log("No changes made.");
}
