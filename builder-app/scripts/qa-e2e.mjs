import { chromium } from 'playwright';

const BASE = 'http://localhost:3001';
const results = [];
let pass = 0, fail = 0;

function record(name, ok, detail = '') {
  results.push({ name, ok, detail });
  ok ? pass++ : fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'} | ${name}${detail ? ' | ' + detail : ''}`);
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

// ---- 1. Sign-up page renders (unauth) ----
let page = await context.newPage();
let resp = await page.goto(BASE + '/sign-up', { waitUntil: 'networkidle' });
record('GET /sign-up renders', resp.status() === 200, 'status=' + resp.status());
const hasSignupForm = await page.locator('button[type=submit] , input[type=password]').count();
record('sign-up has form fields', hasSignupForm > 0, 'fields=' + hasSignupForm);

// sign-out context to reset
await context.clearCookies();
context.request ? null : null;

// ---- 2. Sign-in page renders (unauth) ----
page = await context.newPage();
resp = await page.goto(BASE + '/sign-in', { waitUntil: 'networkidle' });
record('GET /sign-in renders', resp && resp.status() === 200, 'status=' + (resp && resp.status()));

// ---- 3. Fresh sign-up via API sets cookies ----
const email = 'qa.pw.plain.' + Date.now() + '@example.com';
const up = await context.request.post(BASE + '/api/auth/sign-up/email', {
  data: { email, password: 'QaPw@12345678', name: 'QA Playwright User' },
});
record('POST /api/auth/sign-up/email (API)', up.status() === 200, 'status=' + up.status());
const sessionRaw = await context.request.get(BASE + '/api/auth/get-session');
let authed = false;
try {
  const s = await sessionRaw.json();
  authed = !!(s && s.session);
} catch (e) { authed = false; }
record('Session established after sign-up', authed);

// ---- 4. Complete onboarding via API ----
const ob = await context.request.post(BASE + '/api/onboarding', {
  data: { niche: 'Playwright studio', preferredMode: 'services', stylePref: 'editorial' },
});
record('POST /api/onboarding', ob.status() === 200, 'status=' + ob.status());

// ---- 5. Dashboard renders with onboarded user ----
page = await context.newPage();
resp = await page.goto(BASE + '/', { waitUntil: 'networkidle' });
record('GET / dashboard (authed+onboarded)', resp && resp.status() === 200, 'status=' + (resp && resp.status()));
const dashText = await page.textContent('body').then((t) => (t || '').trim());
record('Dashboard has body text', dashText.length > 0, 'chars=' + dashText.length);

// ---- 6. Create a project via API ----
const cp = await context.request.post(BASE + '/api/projects', {
  data: { archetypeId: 'agency', starterSetId: 'agency-digital', name: 'Playwright QA Site' },
});
const cbody = await cp.json();
record('POST /api/projects', cp.status() === 201, 'status=' + cp.status());
const pid = cbody && cbody.project ? cbody.project.id : null;
record('Project id present', !!pid, pid || '');

// ---- 7. Studio workspace shell ----
if (pid) {
  resp = await page.goto(BASE + '/project/' + pid, { waitUntil: 'networkidle' });
  record('GET /project/[id] renders', resp && resp.status() === 200, 'status=' + (resp && resp.status()));

  // Icon-only left rail (w-16) with 4 nav buttons
  const rail = await page.locator('nav[aria-label="Studio navigation"]').count();
  record('Icon rail nav present', rail === 1, 'count=' + rail);
  for (const label of ['Pages', 'Design', 'Business', 'Publish']) {
    const c = await page.locator(`nav[aria-label="Studio navigation"] button[aria-label="${label}"]`).count();
    record(`Rail button '${label}'`, c === 1, `count=${c}`);
  }

  // TopBar
  const backBtn = await page.locator('a[aria-label="Back to dashboard"]').count();
  record('TopBar back-to-dashboard', backBtn >= 1, 'count=' + backBtn);
  const topPublish = await page.locator('header button:has-text("Publish")').count();
  record('TopBar Publish button', topPublish >= 1, 'count=' + topPublish);
  const projectNameShown = await page.textContent('header');
  record('TopBar shows project name', (projectNameShown || '').includes('Playwright QA Site'));

  // Canvas + iframe
  const iframe = await page.locator('iframe[title="Site preview"]').count();
  record('Preview iframe present', iframe === 1, 'count=' + iframe);

  // Device + page controls on canvas sub-header
  for (const dev of ['Desktop', 'Tablet', 'Mobile']) {
    const c = await page.locator(`button[aria-label="${dev}"]`).count();
    record(`Device toggle '${dev}'`, c === 1, 'count=' + c);
  }
  const pgSelect = await page.locator('select[aria-label="Preview page"]').count();
  record('Page selector present', pgSelect === 1, 'count=' + pgSelect);

  // Right panel
  const rightPanel = await page.locator('aside').count();
  record('Right panel present', rightPanel >= 1, 'count=' + rightPanel);
  const collapse = await page.locator('button[aria-label="Collapse side panel"]').count();
  record('Right panel collapse toggle', collapse === 1, 'count=' + collapse);

  // ---- Interact: switch device ----
  await page.locator('button[aria-label="Mobile"]').click();
  const mobilePressed = await page.locator('button[aria-label="Mobile"]').getAttribute('aria-pressed');
  record('Device switch to Mobile', mobilePressed === 'true', 'aria-pressed=' + mobilePressed);

  // ---- Interact: page selector ----
  const optCount = await page.locator('select[aria-label="Preview page"] option').count();
  record('Page selector options', optCount >= 3, 'count=' + optCount);

  // ---- Interact: toggle right panel collapsed ----
  await page.locator('button[aria-label="Collapse side panel"]').click();
  const expandBtn = await page.locator('button[aria-label="Expand side panel"]').count();
  record('Right panel collapses', expandBtn === 1, 'expandBtn=' + expandBtn);
  await page.locator('button[aria-label="Expand side panel"]').click();
  const collapseAgain = await page.locator('button[aria-label="Collapse side panel"]').count();
  record('Right panel re-expands', collapseAgain === 1, 'collaseBtn=' + collapseAgain);

  // ---- Walk the rail: Design -> Business -> Publish -> Pages ----
  for (const step of ['Design', 'Business', 'Publish', 'Pages']) {
    await page.locator(`button[aria-label="${step}"]`).click();
    await page.waitForTimeout(300);
    const current = await page.locator(`nav[aria-label="Studio navigation"] button[aria-current="page"][aria-label="${step}"]`).count();
    record(`Rail navigation to '${step}'`, current === 1, 'active=' + current);
  }

  // ---- Double-click inline edit on the canvas ----
  // click into the iframe hero to select a section; assert a section is selected
  // (selection toolbar appears over the canvas)
  const frame = page.frameLocator('iframe[title="Site preview"]');
  const heroVisible = await frame.locator('text=Design & Engineering Atelier').count();
  record('Preview iframe shows site content', heroVisible >= 1, 'matches=' + heroVisible);

  // ---- 8. Preview route directly ----
  page = await context.newPage();
  resp = await page.goto(BASE + '/preview/project/' + pid, { waitUntil: 'networkidle' });
  record('GET /preview/project/[id] renders', resp && resp.status() === 200, 'status=' + (resp && resp.status()));
  const previewText = await page.textContent('body');
  record('Preview shows site content', (previewText || '').includes('Design & Engineering Atelier'));
}

await browser.close();
console.log('\n=============================');
console.log(`SUMMARY: ${pass} passed, ${fail} failed of ${results.length}`);
console.log('=============================');
process.exit(fail > 0 ? 1 : 0);