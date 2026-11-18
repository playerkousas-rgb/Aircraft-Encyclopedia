import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const gatePath = new URL("../web/store_gate_v1.0.js", import.meta.url);
const htmlPath = new URL("../web/index.html", import.meta.url);
const appJsPath = new URL("../web/app.js", import.meta.url);
const cssPath = new URL("../web/styles.css", import.meta.url);
const manifestPath = new URL("../web/manifest.webmanifest", import.meta.url);

const html = readFileSync(htmlPath, "utf8");
const appJs = readFileSync(appJsPath, "utf8");
const css = readFileSync(cssPath, "utf8");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const Gate = require(fileURLToPath(gatePath));

const APP_GATE_OPTIONS = {
  appKey: "aircraft-encyclopedia",
  mode: "entry-gate",
  portalIds: ["appstore"],
  allowedOrigins: Gate.portalsFromIds(["appstore", "library"]).map((p) => p.origin),
  customTitle: "需經由 SCOUT APP STORE 開啟",
  customMessage: "請按下方按鈕前往 APP STORE 開啟。",
  allowStandalone: true,
  autoRedirectSeconds: 0,
};

test("store_gate_v1.0.js 原封不動部署於 web/ 並掛喺 index.html <head> 頂部（<title> 之前）", () => {
  assert.ok(existsSync(gatePath), "web/store_gate_v1.0.js 存在");
  assert.equal(Gate.VERSION, "v1.0");

  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  assert.ok(headMatch, "有 <head>");
  const head = headMatch[1];

  const charsetIdx = head.indexOf('<meta charset="UTF-8">');
  const srcIdx = head.indexOf('<script src="/store_gate_v1.0.js"></script>');
  const initIdx = head.indexOf("initStoreGate({");
  const titleIdx = head.indexOf("<title>");

  assert.ok(charsetIdx >= 0 && charsetIdx < srcIdx, "charset 喺 gate script 前面防中文亂碼");
  assert.ok(srcIdx > 0 && srcIdx < initIdx, "先載入 /store_gate_v1.0.js 再呼叫 initStoreGate");
  assert.ok(initIdx < titleIdx, "initStoreGate 喺 <title> 之前");

  assert.match(head, /appKey:\s*'aircraft-encyclopedia'/);
  assert.match(head, /mode:\s*'entry-gate'/);
  assert.match(head, /portalIds:\s*\['appstore'\]/);
  assert.match(head, /ScoutStoreGate\.portalsFromIds\(\['appstore',\s*'library'\]\)/);
  assert.match(head, /customTitle:\s*'需經由 SCOUT APP STORE 開啟'/);
  assert.match(head, /customMessage:\s*'請按下方按鈕前往 APP STORE 開啟。'/);
  assert.match(head, /allowStandalone:\s*true/);
  assert.match(head, /autoRedirectSeconds:\s*0/);
  assert.ok(!head.includes("scoutappstore.vercel.app"), "唔准寫死 APP STORE 網址");
  assert.ok(!head.includes("scout-circulars.vercel.app"), "唔准寫死圖書館網址");
  assert.equal(manifest.display, "standalone", "PWA manifest display 維持 standalone");
});

test("情境 1：由 SCOUT APP STORE 或通告圖書館進入 → 放行＋寫入同分頁通行證，重整仍放行", () => {
  const fromStore = Gate.evaluateStoreGate(APP_GATE_OPTIONS, {
    inIframe: false,
    standalone: false,
    hasSessionPass: false,
    referrer: "https://scoutappstore.vercel.app/?app=aircraft-encyclopedia",
    selfOrigin: "https://aircraft-encyclopedia-web.vercel.app",
  });
  assert.equal(fromStore.allowed, true);
  assert.equal(fromStore.reason, "referrer-whitelist");
  assert.equal(fromStore.matchedPortalId, "appstore");
  assert.equal(fromStore.grantSessionPass, true);
  assert.equal(fromStore.passKey, "aircraft-encyclopedia.store_pass");

  const fromLibrary = Gate.evaluateStoreGate(APP_GATE_OPTIONS, {
    inIframe: false,
    standalone: false,
    hasSessionPass: false,
    referrer: "https://scout-circulars.vercel.app/",
    selfOrigin: "https://aircraft-encyclopedia-web.vercel.app",
  });
  assert.equal(fromLibrary.allowed, true);
  assert.equal(fromLibrary.reason, "referrer-whitelist");
  assert.equal(fromLibrary.matchedOrigin, "https://scout-circulars.vercel.app");
  assert.equal(fromLibrary.grantSessionPass, true);

  const reload = Gate.evaluateStoreGate(APP_GATE_OPTIONS, {
    inIframe: false,
    standalone: false,
    hasSessionPass: true,
    referrer: "",
    selfOrigin: "https://aircraft-encyclopedia-web.vercel.app",
  });
  assert.equal(reload.allowed, true);
  assert.equal(reload.reason, "session-pass");
});

test("情境 2：直打網址／偽造前綴／未授權入口 → 攔截，且提示卡只顯示 APP STORE 一粒掣（唔出圖書館掣）", () => {
  const blockedReferrers = [
    "",
    "https://aircraft-encyclopedia-web.vercel.app/",
    "https://www.google.com/",
    "https://scoutappstore.vercel.app.evil.com/",
    "https://scout-circulars.vercel.app.evil.com/",
    "http://scoutappstore.vercel.app/",
    "http://scout-circulars.vercel.app/",
    "https://member-portal-sigma-swart.vercel.app/",
    "https://scout-district-portal.vercel.app/",
    "https://gemini-woad-sigma.vercel.app/",
  ];
  for (const referrer of blockedReferrers) {
    const d = Gate.evaluateStoreGate(APP_GATE_OPTIONS, {
      inIframe: false,
      standalone: false,
      hasSessionPass: false,
      referrer,
      selfOrigin: "https://aircraft-encyclopedia-web.vercel.app",
    });
    assert.equal(d.allowed, false, `應攔截 referrer=${referrer || "(empty)"}`);
    assert.equal(d.reason, "missing-whitelist-entry");
  }

  // 提示卡按鈕只來自 portalIds（得 appstore 一粒，唔出 library）
  const portals = Gate.normalizePortals(APP_GATE_OPTIONS);
  assert.deepEqual(
    portals.map((p) => p.id),
    ["appstore"],
  );
});

test("情境 3：已加入主畫面（display-mode: standalone 或 iOS navigator.standalone）→ 直接放行", () => {
  assert.equal(
    Gate.isStandaloneApp({
      matchMedia: (q) => ({ matches: q === "(display-mode: standalone)" }),
      navigator: {},
    }),
    true,
  );
  assert.equal(
    Gate.isStandaloneApp({
      matchMedia: () => ({ matches: false }),
      navigator: { standalone: true },
    }),
    true,
  );

  const d = Gate.evaluateStoreGate(APP_GATE_OPTIONS, {
    inIframe: false,
    standalone: true,
    hasSessionPass: false,
    referrer: "",
    selfOrigin: "https://aircraft-encyclopedia-web.vercel.app",
  });
  assert.equal(d.allowed, true);
  assert.equal(d.reason, "standalone-pwa");
});

test("一鍵讚好／收藏掣：經註冊表導向 ?app=aircraft-encyclopedia、開新分頁 noopener、零寫死網址、雙語齊備", () => {
  assert.match(html, /id="storeSupportTop"[^>]*target="_blank"[^>]*rel="noopener"/);
  assert.match(html, /id="storeSupportFoot"[^>]*target="_blank"[^>]*rel="noopener"/);
  assert.ok(!html.includes("scoutappstore.vercel.app"), "index.html 零寫死主站網址");
  assert.ok(!appJs.includes("scoutappstore.vercel.app"), "app.js 零寫死主站網址");
  assert.match(appJs, /const APP_STORE_SLUG = "aircraft-encyclopedia"/);
  assert.match(appJs, /ScoutStoreGate\.getPortal\("appstore"\)/);

  const portal = Gate.getPortal("appstore");
  const url = portal.url.replace(/\/?$/, "/") + "?app=" + encodeURIComponent("aircraft-encyclopedia");
  assert.equal(url, "https://scoutappstore.vercel.app/?app=aircraft-encyclopedia");

  // [hidden] 唔會被 display:inline-flex / display:flex 蓋過；列印自動隱藏 topbar 同 footer
  assert.match(css, /\.support-btn\[hidden\],\.support-bar\[hidden\]\{display:none\}/);
  assert.match(css, /@media print\{[\s\S]*?\.topbar,footer/);
});
