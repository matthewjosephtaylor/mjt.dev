const fs = require('fs');
const path = require('path');

const docsDir = path.join(process.cwd(), 'docs');
const artDirs = fs.readdirSync(docsDir).filter(dir => dir.startsWith('art-') && fs.statSync(path.join(docsDir, dir)).isDirectory());

const artPieces = [];

artDirs.forEach(dir => {
  const marketingPath = path.join(docsDir, dir, 'marketing.json');
  if (!fs.existsSync(marketingPath)) {
    console.warn(`No marketing.json found in ${dir}`);
    return;
  }

  const rawData = fs.readFileSync(marketingPath, 'utf8');
  let data;
  try {
    data = JSON.parse(rawData);
  } catch (e) {
    console.error(`Error parsing ${marketingPath}`);
    return;
  }

  const title = data.title || 'Untitled';
  const artId = data.artId || dir;
  
  let year = 0;
  let styles = [];
  
  if (data.property) {
    if (data.property.year) {
      year = parseInt(data.property.year, 10);
      if (isNaN(year)) year = 0;
    }
    if (Array.isArray(data.property.style)) {
      styles = data.property.style;
    }
  }

  const actions = Array.isArray(data.action) ? data.action : [];

  artPieces.push({
    dir,
    title,
    artId,
    year,
    styles,
    actions
  });

  // Generate individual art page
  const yearHtml = year > 0 ? `<p><strong>Year:</strong> ${year}</p>` : '';
  const styleHtml = styles.length > 0 ? `<p><strong>Style:</strong> ${styles.join(', ')}</p>` : '';
  
  let actionHtml = '';
  actions.forEach(act => {
    if (act.callToAction && act.url) {
      actionHtml += `<p><a href="${act.url}">${act.callToAction}</a></p>\n      `;
    }
  });

  const pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Matthew Joseph Taylor</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <div class="art-page">
    <p><a href="../art/">&larr; Gallery</a></p>
    <h1>${title}</h1>
    <img src="image-${artId}.png" alt="${title}">
    <div class="art-meta">
      ${[yearHtml, styleHtml, actionHtml.trim()].filter(Boolean).join("\n      ")}
    </div>
    <footer class="footer">
      <a href="../">Home</a> &middot;
      <a href="../art/">Gallery</a> &middot;
      <a href="../about/">About</a>
    </footer>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(docsDir, dir, 'index.html'), pageHtml);
});

// Sort art pieces
// Newest first (by year, then title alphabetically). 0 goes last.
artPieces.sort((a, b) => {
  const aYear = a.year > 0 ? a.year : -1;
  const bYear = b.year > 0 ? b.year : -1;

  if (bYear !== aYear) {
    return bYear - aYear; // Descending
  }
  return a.title.localeCompare(b.title); // Ascending title
});

// Generate gallery page
let galleryItemsHtml = '';
artPieces.forEach(piece => {
  galleryItemsHtml += `      <a href="../${piece.artId}/" class="gallery-item">
        <img src="../${piece.artId}/image-${piece.artId}.png" alt="${piece.title}" loading="lazy">
      </a>\n`;
});

const galleryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Art — Matthew Joseph Taylor</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <div class="content section">
    <p><a href="../">&larr; Home</a></p>
    <h1>Art</h1>
    <p class="" style="color: var(--text-muted); margin-bottom: var(--space-md);">${artPieces.length} pieces. Digital art, abstract expressionism, code-generated.</p>
    <div class="gallery-grid">
${galleryItemsHtml.trimEnd()}
    </div>
  </div>
  <footer class="footer">
    <a href="../">Home</a> &middot;
    <a href="../about/">About</a>
  </footer>
</body>
</html>`;

const artDir = path.join(docsDir, 'art');
if (!fs.existsSync(artDir)) {
  fs.mkdirSync(artDir, { recursive: true });
}
fs.writeFileSync(path.join(artDir, 'index.html'), galleryHtml);

console.log(`Processed ${artPieces.length} art pieces.`);
