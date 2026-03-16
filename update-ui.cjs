const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Buttons and Links to pill (rounded-full)
  content = content.replace(/(<button[^>]*className="[^"]*)rounded-(?:sm|md|lg|xl|2xl|3xl)([^"]*")/g, '$1rounded-full$2');
  content = content.replace(/(<Link[^>]*className="[^"]*px-[^"]*)rounded-(?:sm|md|lg|xl|2xl|3xl)([^"]*")/g, '$1rounded-full$2');
  content = content.replace(/(<a[^>]*className="[^"]*px-[^"]*)rounded-(?:sm|md|lg|xl|2xl|3xl)([^"]*")/g, '$1rounded-full$2');

  // Inputs to pill (rounded-full)
  content = content.replace(/(<input[^>]*className="[^"]*)rounded-(?:sm|md|lg|xl|2xl|3xl)([^"]*")/g, '$1rounded-full$2');
  content = content.replace(/(<select[^>]*className="[^"]*)rounded-(?:sm|md|lg|xl|2xl|3xl)([^"]*")/g, '$1rounded-full$2');

  // Cards and panels to rounded-3xl or rounded-2xl
  content = content.replace(/rounded-xl/g, 'rounded-3xl');
  content = content.replace(/rounded-2xl/g, 'rounded-3xl');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
