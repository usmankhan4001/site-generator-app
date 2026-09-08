import { chromium } from 'playwright';

const BASE = 'http://localhost:3001';
const results = [];
let pass = 0, fail = 0;
const record = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  ok ? pass++ : fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'} | ${name}${detail ? ' | ' + detail : ''}`);
};

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

// auth + onboard + create project
const email = 'qa.editor.' + Date.now() + '@example.com';
const up = await context.request.post(BASE + '/api/auth/sign-up/email', {
  data: { email, password: 'QaPw@12345678', name: 'QA Editor User' },
});
await context.request.post(BASE + '/api/onboarding', { data: { niche: 'editor test', preferredMode: 'services' } });
const cp = await context.request.post(BASE + '/api/projects', {
  data: { archetypeId: 'agency', starterSetId: 'agency-digital', name: 'Editor QA Site' },
});
const cbody = await cp.json();
const pid = cbody.project.id;

const page = await context.newPage();
await page.goto(BASE + '/project/' + pid, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

// ---- Right panel shows a distinct panel per rail step (3-4 panels) ----
const panelHeadings = {};
for (const step of ['Pages', 'Design', 'Business', 'Publish']) {
  await page.locator(`button[aria-label="${step}"]`).click();
  await page.waitForTimeout(350);
  const asideText = ((await page.locator('aside').textContent()) || '').replace(/\s+/g, ' ').trim();
  panelHeadings[step] = asideText;
}
record('Pages panel has content', panelHeadings['Pages'] && panelHeadings['Pages'].length > 10, 'len=' + (panelHeadings['Pages'] || '').length);
record('Design panel differs from Pages', (panelHeadings['Design'] || '') !== (panelHeadings['Pages'] || ''));
record('Business panel differs from Pages', (panelHeadings['Business'] || '') !== (panelHeadings['Pages'] || ''));
record('Publish panel differs from Pages', (panelHeadings['Publish'] || '') !== (panelHeadings['Pages'] || ''));

// go back to Pages (home preview) before section interaction
await page.locator(`button[aria-label="Pages"]`).click();
await page.waitForTimeout(300);

// ---- select a section on the canvas (click hero text inside iframe) ----
const frame = page.frameLocator('iframe[title="Site preview"]');
const hero = frame.locator('[data-section-id="home-hero"]').first();
const heroCount = await hero.count();
record('iframe has hero section element', heroCount >= 1, 'count=' + heroCount);

// click the headline text (a non-link node) to select the section
const headline = frame.locator('text=We shape digital products that define').first();
const hlCount = await headline.count();
record('hero headline visible in iframe', hlCount >= 1, 'count=' + hlCount);
if (hlCount) {
  await headline.click({ force: true });
  await page.waitForTimeout(800);

  // CanvasToolbar should appear with Edit section button
  const editBtn = await page.locator('button[aria-label="Edit section"]').count();
  record('Canvas section toolbar (Edit) appears after select', editBtn === 1, 'count=' + editBtn);

  // right panel should show the Inspector for the hero
  const asideText = ((await page.locator('aside').textContent()) || '').replace(/\s+/g, ' ');
  const showsHero = asideText.includes('We shape digital products') || asideText.includes('hero') || asideText.includes('Headline');
  record('Right panel shows section inspector', showsHero);

  // ---- inline edit: dblclick the headline, change text, commit with Enter ----
  await headline.dblclick({ force: true });
  await page.waitForTimeout(500);
  const editable = frame.locator('[contenteditable="plaintext-only"]').first();
  const edCount = await editable.count();
  record('inline edit activates contenteditable', edCount === 1, 'count=' + edCount);

  if (edCount) {
    await editable.click({ force: true });
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.type('QA INLINE EDIT TEST HEADLINE');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000); // allow autosave

    // verify the new text is visible in the iframe (applied to content)
    const applied = await frame.locator('text=QA INLINE EDIT TEST HEADLINE').count();
    record('inline edited text applied to preview', applied >= 1, 'matches=' + applied);

    // verify persistence via API
    const gp = await context.request.get(`${BASE}/api/projects/${pid}`);
    const gbody = await gp.json();
    const contentStr = JSON.stringify(gbody);
    record('inline edit persisted via API', contentStr.includes('QA INLINE EDIT TEST HEADLINE'));
  }
}

await browser.close();
console.log('\n=============================');
console.log(`SUMMARY: ${pass} passed, ${fail} failed of ${results.length}`);
console.log('=============================');
process.exit(fail > 0 ? 1 : 0);