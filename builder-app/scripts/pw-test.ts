import { chromium } from 'playwright';

const BASE = 'http://localhost:3001';
const ADMIN_EMAIL = 'quraninstitute.isb@gmail.com';
const ADMIN_PASS = 'Admin@12345678';
const PROJECT_ID = 'cmtq4fg2r0003ke0shstfkyrd';

async function signInCookie(email: string, password: string) {
  const res = await fetch(`${BASE}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: BASE, Referer: `${BASE}/sign-in` },
    body: JSON.stringify({ email, password }),
  });
  const setCookie = res.headers.get('set-cookie') || '';
  const body = await res.text();
  const m = setCookie.match(/better-auth\.session_token=([^;]+)/);
  if (!m) throw new Error(`No session cookie for ${email} status=${res.status} setCookie=${setCookie} body=${body.slice(0, 200)}`);
  return m[1];
}

async function main() {
  const results: string[] = [];
  const browser = await chromium.launch();

  // ---- ADMIN session ----
  const adminCookie = await signInCookie(ADMIN_EMAIL, ADMIN_PASS);
  const adminCtx = await browser.newContext();
  await adminCtx.addCookies([
    {
      name: 'better-auth.session_token',
      value: adminCookie,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
  ]);
  const admin = await adminCtx.newPage();
  const errors: string[] = [];
  admin.on('pageerror', (e) => errors.push(`PAGEERROR: ${e}`));
  admin.on('console', (m) => {
    if (m.type() === 'error') errors.push(`CONSOLE: ${m.text}`);
  });

  // Dashboard
  await admin.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  results.push(`dashboard url=${admin.url()} title=${await admin.title()}`);
  results.push(`dashboard has 'New site' button: ${await admin.getByRole('button', { name: /new site/i }).count() > 0}`);

  // New-project wizard — drive all 4 steps
  const newBtn = admin.getByRole('button', { name: /new site/i }).first();
  if (await newBtn.count()) {
    await newBtn.click();
    await admin.waitForTimeout(800);
    const dialog = admin.locator('[role="dialog"]');
    results.push(`wizard dialog present: ${await dialog.count() > 0}`);
    // STEP 1: fill name -> Continue
    await admin.locator('#new-project-name').fill('PW Wizard Test');
    await admin.getByRole('button', { name: /continue/i }).first().click();
    await admin.waitForTimeout(400);
    results.push(`wizard step2 visible: ${await admin.getByText('Pick a vibe').count() > 0}`);
    // STEP 2: pick a theme -> Continue
    const themeBtn = admin.locator('[role="dialog"] button[aria-pressed]').first();
    if (await themeBtn.count()) { await themeBtn.click(); await admin.waitForTimeout(300); }
    await admin.getByRole('button', { name: /continue/i }).first().click();
    await admin.waitForTimeout(400);
    results.push(`wizard step3 visible: ${await admin.getByText('Pick a template').count() > 0}`);
    // STEP 3: pick a template card -> Continue
    const cards = admin.locator('[role="dialog"] [data-testid]').count();
    const card = admin.locator('[role="dialog"] button').filter({ hasText: /starter|site|pack/i }).first();
    if (await card.count()) { await card.click(); await admin.waitForTimeout(300); }
    await admin.getByRole('button', { name: /continue/i }).first().click();
    await admin.waitForTimeout(400);
    results.push(`wizard step4 visible (Review & create): ${await admin.getByText('Review & create').count() > 0}`);
    results.push(`wizard reached step 4 url=${admin.url()}`);
    await admin.keyboard.press('Escape');
    await admin.waitForTimeout(300);
  } else {
    results.push('wizard: no New site button found');
  }

  // Studio workspace
  await admin.goto(`${BASE}/project/${PROJECT_ID}`, { waitUntil: 'networkidle' });
  await admin.waitForTimeout(1500);
  results.push(`studio url=${admin.url()} title=${await admin.title()}`);
  const bodyText = await admin.locator('body').innerText();
  results.push(`studio body length=${bodyText.length}`);
  results.push(`studio has 'Publish' text: ${bodyText.includes('Publish')}`);
  // icon rail (StepRail) — 4 nav buttons
  const rail = admin.locator('nav[aria-label="Studio navigation"] button');
  results.push(`studio step-rail buttons: ${await rail.count()}`);
  results.push(`studio step-rail labels: ${(await rail.evaluateAll((els) => els.map((e) => e.getAttribute('aria-label')))).join(',')}`);
  // right panel
  const rightPanel = admin.locator('aside');
  results.push(`studio right panel present: ${await rightPanel.count() > 0}`);
  // preview iframe
  const iframes = admin.locator('iframe');
  results.push(`studio iframe count: ${await iframes.count()}`);
  if (await iframes.count()) {
    const src = await iframes.first().getAttribute('src');
    results.push(`studio iframe src: ${src}`);
  }

  // Preview page — verify the site actually renders (not a blank/404)
  await admin.goto(`${BASE}/preview/project/${PROJECT_ID}?page=/about`, { waitUntil: 'networkidle' });
  await admin.waitForTimeout(1200);
  const prevBody = await admin.locator('body').innerText();
  results.push(`preview url=${admin.url()} title=${await admin.title()}`);
  results.push(`preview body length=${prevBody.length}`);
  results.push(`preview has data-preview-root: ${await admin.locator('[data-preview-root]').count() > 0}`);
  results.push(`preview has site nav (About): ${prevBody.includes('About')}`);

  // Verify the studio iframe actually loads the site
  await admin.goto(`${BASE}/project/${PROJECT_ID}`, { waitUntil: 'networkidle' });
  await admin.waitForTimeout(1500);
  const frame = admin.frameLocator('iframe').first();
  const frameBody = await frame.locator('body').innerText();
  results.push(`studio iframe body length=${frameBody.length}`);
  results.push(`studio iframe has site content: ${frameBody.includes('Forge') || frameBody.includes('PipelineForge')}`);

  // Admin routes render
  for (const p of ['/admin', '/admin/clients', '/admin/projects', '/admin/publish', '/admin/invites']) {
    await admin.goto(`${BASE}${p}`, { waitUntil: 'networkidle' });
    results.push(`admin ${p} -> ${admin.url()} title=${await admin.title()}`);
  }

  results.push(`ADMIN console/page errors: ${errors.length ? errors.join(' ;; ') : 'none'}`);
  await adminCtx.close();

  // ---- NON-ADMIN redirect test ----
  const userCookie = await signInCookie('normaltest@example.com', 'NormalUser@123456');
  const userCtx = await browser.newContext();
  await userCtx.addCookies([
    { name: 'better-auth.session_token', value: userCookie, domain: 'localhost', path: '/', httpOnly: true, sameSite: 'Lax' },
  ]);
  const user = await userCtx.newPage();
  await user.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  results.push(`non-admin /admin -> ${user.url()}`);
  await userCtx.close();

  await browser.close();
  console.log('===== PLAYWRIGHT RESULTS =====');
  for (const r of results) console.log(r);
}

main().catch((e) => {
  console.error('PLAYWRIGHT FAILED:', e);
  process.exit(1);
});