const fs = require('fs');
const path = require('path');
const https = require('https');

// === Book catalog (static) ===
const books = [
  { title: 'The Legacy Codebase', asin: 'B0GHZL6CF8', cover: 'legacy-codebase-cover.jpg' },
  { title: 'Python For AI', asin: 'B0G4VGJX6J', cover: 'python-for-ai-cover.jpg' },
  { title: 'Wealth Work Meaning', asin: 'B0G6PJ4SQ5', cover: 'wealth-work-meaning-cover.jpg' },
  { title: 'Investing in Time', asin: 'B0GC3SHV88', cover: 'investing-in-time-cover.jpg' },
];

// === RSS fetching ===
function fetch(url) {
  return new Promise((resolve, reject) => {
    const get = (u, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      https.get(u, { headers: { 'User-Agent': 'mjt.dev-build/1.0' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location, redirects + 1);
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    };
    get(url);
  });
}

// Minimal XML tag extraction (no deps)
function extractItems(xml, max) {
  const items = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) && items.length < max) {
    const block = match[1];
    const tag = (name) => {
      const r = new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>|<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i');
      const m = block.match(r);
      return m ? (m[1] || m[2] || '').trim() : '';
    };
    const title = tag('title');
    const link = tag('link');
    const pubDate = tag('pubDate');
    const description = tag('description');
    // Substack puts subtitle in description; extract first sentence or first 120 chars
    let subtitle = '';
    if (description) {
      // Strip HTML tags
      const plain = description.replace(/<[^>]*>/g, '').trim();
      // Take first sentence or 120 chars
      const dot = plain.indexOf('. ');
      subtitle = dot > 0 && dot < 150 ? plain.slice(0, dot + 1) : plain.slice(0, 120);
      if (subtitle.length >= 120 && !subtitle.endsWith('.')) subtitle += '…';
    }
    const date = pubDate ? formatDate(pubDate) : '';
    items.push({ title, link, date, subtitle });
  }
  return items;
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return ''; }
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// === HTML generation ===
function renderBooks() {
  const cards = books.map(b => `        <a href="https://www.amazon.com/dp/${b.asin}" class="book-card" target="_blank" rel="noopener">
          <img src="../assets/${b.cover}" alt="${escapeHtml(b.title)}" loading="lazy">
          <span class="book-title">${escapeHtml(b.title)}</span>
        </a>`).join('\n');
  return `      <div class="venue-block">
        <h2>Books</h2>
        <div class="books-grid">
${cards}
        </div>
        <a href="https://www.amazon.com/stores/Matthew-J.-Taylor/author/B0G4X7C8TN" class="button" style="margin-top: var(--space-sm);">All books on Amazon</a>
      </div>`;
}

function renderArticleList(heading, items, siteUrl, buttonText, showSubtitles) {
  if (items.length === 0) {
    return `      <div class="venue-block">
        <h2>${heading}</h2>
        <p style="color: var(--text-muted);">No recent articles found.</p>
        <a href="${siteUrl}" class="button">${buttonText}</a>
      </div>`;
  }
  const rows = items.map(a => {
    const subtitleHtml = showSubtitles && a.subtitle
      ? `\n            <span class="article-subtitle">${escapeHtml(a.subtitle)}</span>`
      : '';
    return `          <li class="article-item">
            <a href="${a.link}" class="article-link" target="_blank" rel="noopener">
              <span class="article-title">${escapeHtml(a.title)}</span>${subtitleHtml}
            </a>
            <time class="article-date">${a.date}</time>
          </li>`;
  }).join('\n');
  return `      <div class="venue-block">
        <h2>${heading}</h2>
        <ul class="article-list">
${rows}
        </ul>
        <a href="${siteUrl}" class="button" style="margin-top: var(--space-sm);">${buttonText}</a>
      </div>`;
}

function renderPage(substackItems, mediumItems) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Writing — Matthew Joseph Taylor</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <div class="content">
    <nav class="nav">
      <a href="../">&larr; Home</a>
    </nav>
    <section class="section">
      <h1 style="margin-bottom: var(--space-md);">Writing</h1>
      <div class="writing-venues">
${renderBooks()}

${renderArticleList('Substack', substackItems, 'https://mjtdev.substack.com/', 'All posts on Substack', true)}

${renderArticleList('Medium', mediumItems, 'https://medium.com/@mjtdev', 'All posts on Medium', false)}
      </div>
    </section>
  </div>
</body>
</html>`;
}

// === Main ===
async function main() {
  const docsDir = path.join(process.cwd(), 'docs');
  const writingDir = path.join(docsDir, 'writing');
  if (!fs.existsSync(writingDir)) fs.mkdirSync(writingDir, { recursive: true });

  console.log('Fetching Substack RSS…');
  let substackItems = [];
  try {
    const substackXml = await fetch('https://mjtdev.substack.com/feed');
    substackItems = extractItems(substackXml, 5);
    console.log(`  → ${substackItems.length} articles`);
  } catch (e) {
    console.error('  ✗ Substack fetch failed:', e.message);
  }

  console.log('Fetching Medium RSS…');
  let mediumItems = [];
  try {
    const mediumXml = await fetch('https://medium.com/feed/@mjtdev');
    mediumItems = extractItems(mediumXml, 5);
    console.log(`  → ${mediumItems.length} articles`);
  } catch (e) {
    console.error('  ✗ Medium fetch failed:', e.message);
  }

  const html = renderPage(substackItems, mediumItems);
  fs.writeFileSync(path.join(writingDir, 'index.html'), html);
  console.log('Writing page built → docs/writing/index.html');
}

main().catch(e => { console.error(e); process.exit(1); });
