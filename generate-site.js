const fs = require('fs');
const path = require('path');

const eventTitle = "Tech Talks Event"; // User-provided event title
const eventDate = "Thursday, April 30, 2026"; // Event date from initial prompt

// Read source files
const htmlTemplate = fs.readFileSync(path.join(__dirname, 'src', 'index.html.template'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'src', 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'src', 'script.js'), 'utf8');
const talksJson = fs.readFileSync(path.join(__dirname, 'data', 'talks.json'), 'utf8');

// Inject talk data directly into the JS for the single HTML file
const jsWithData = js.replace('<!--INJECT_TALKS_DATA_HERE-->', talksJson);

// Combine all parts into the final HTML
let finalHtml = htmlTemplate
  .replace('<!--INJECT_CSS_HERE-->', css)
  .replace('<!--INJECT_JAVASCRIPT_HERE-->', jsWithData)
  .replace('<h1>Tech Talks Event</h1>', `<h1>${eventTitle}</h1>`)
  .replace('<p>Thursday, April 30, 2026</p>', `<p>${eventDate}</p>`);


// Write the final HTML to index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), finalHtml, 'utf8');

console.log('Successfully generated index.html');
