"use strict";
/* Aircraft-Encyclopedia v0.7 · © SCOUT SYSTEM · APP_VERSION 0.7.1 */
const APP_VERSION = "0.7.1";
const LANG_KEY = "aircraft-encyclopedia.lang";

const STR = {
  zh: {
    brand: "飛機圖鑑", kicker: "香港童軍航空活動章 · 辨認學習圖鑑",
    heroTitle: "一眼見到飛機，用一張圖認識飛機",
    heroText: "第一批跟童軍初級航空活動章清單（18 款）逐款核實：有齊相片、WEFT 辨認特徵同有來源的規格，先會出圖卡。",
    batch1Label: "第一批（初級航空活動章）進度",
    searchLabel: "搜尋", searchPh: "名稱、代碼、製造商…", catLabel: "類別", scoutLabel: "章級別", statusLabel: "狀態", facetLabel: "特徵", allFeatures: "全部特徵",
    loadErrorTitle: "資料載入失敗", loadErrorText: "請檢查網絡後重新整理；如果用檔案方式打開，請改用靜態伺服器開本站。",
    noResults: "搵唔到符合嘅飛機，試下改搜尋字或清除分類。",
    compareTitle: "比較兩款飛機", quizTitle: "小測驗：睇相認飛機",
    examTitle: "考卷（領袖出卷）", examLocked: "按章級別出試卷連領袖答案紙，要等嗰一級核實的機型夠數先開放，確保每條題目答案正確。",
    gamesTitle: "未來小遊戲", gamesLocked: "航空公司配對同機場名稱遊戲會喺資料核實後推出，對應航空活動章同空勤員章的辨認要求。",
    footerNote: "相片未核實前唔會上載；規格要有來源先會顯示。第三方相片依原授權標示，不加本站水印。",
    all: "全部", pending: "資料待核實", verifiedOnly: "已核實", pendingOnly: "待核實", codePending: "代碼待核實", verified: "已核實",
    viewCard: "睇圖卡", checkBtn: "查看核實清單", progress: "核實進度", total: "總清單", done: "已完成核實", types: "類別", batch1: "第一批已出卡",
    photoPendingShort: "相片待核實", photoFail: "相片載入失敗，請檢查網絡；資料本身不受影響。",
    introHead: "呢架係乜？", featHead: "有咩特徵？（WEFT 辨認法）", nextHead: "下次點認？同相似機型的分別",
    specsHead: "規格（每項附來源同子型號）", historyHead: "歷史", linksHead: "深入查證（開新頁）",
    firstFlight: "首飛", enteredService: "投入服務", statusWord: "現況",
    weftNames: { wings: "W · 機翼", engines: "E · 引擎", fuselage: "F · 機身", tail: "T · 機尾" },
    weftNamesHeli: { wings: "W · 主旋翼", engines: "E · 引擎", fuselage: "F · 機身", tail: "T · 機尾（尾旋翼）" },
    specNames: { length: "長度", wingspan: "翼展", rotorDiameter: "主旋翼直徑", height: "高度", engines: "引擎", seats: "座位", payload: "載重", range: "航程", cruise: "巡航速度" },
    sourceWord: "來源", variantWord: "子型號", verifiedOn: "核實",
    specsPending: "規格：資料未有（逐項核實中，唔估數字）", photoPending: "相片：待核實（要逐張確認 Wikimedia Commons 授權）",
    sourcesTitle: "待查證來源（給領袖/成員跟進）", checklistTitle: "八項核實清單",
    compareLocked: "要等至少兩款飛機完成核實先開放比較，而家已核實的數量未夠。",
    comparePick: "揀兩款已核實飛機並排比較：先睇相，再對規格。",
    cmpA: "第一款", cmpB: "第二款",
    quizLocked: "要等至少四款飛機連相片完成核實先開放測驗，而家題目池未夠。",
    quizIntro: "題目只用已核實的圖卡：睇相揀啱機型名。答錯會即刻講返點認，唔使死背。",
    quizStart: "開始測驗", quizNext: "下一題", quizAgain: "再玩一次", quizQ: "呢架係邊款飛機？",
    correct: "啱咗！", wrong: "唔啱，正確答案係：", score: "完成！你啱咗",
    checks: { identity: "身份：中英名、製造商、ICAO 代碼", history: "歷史：首飛與現況", specs: "規格：尺寸、引擎、座位/載重、航程", recognition: "辨認：肉眼特徵與相似機型分別", photo: "相片：授權與標註座標", links: "深度連結：官方、維基、FR24、圖庫", bilingual: "英文：名稱與辨認特徵", quiz: "測驗：題目與答案核對" }
  },
  en: {
    brand: "Aircraft Encyclopedia", kicker: "Hong Kong Scout Air Activity badges · Recognition field guide",
    heroTitle: "See a plane. Learn a plane.",
    heroText: "Batch 1 follows the Scout Basic Air Activity list (18 types), verified one by one: a card is published only with a licensed photo, WEFT recognition notes and sourced specs.",
    batch1Label: "Batch 1 (Basic Air Activity) progress",
    searchLabel: "Search", searchPh: "Name, code, manufacturer…", catLabel: "Category", scoutLabel: "Badge level", statusLabel: "Status", facetLabel: "Features", allFeatures: "All features",
    loadErrorTitle: "Could not load data", loadErrorText: "Check your connection and reload. If you opened this as a file, serve the folder with a static server instead.",
    noResults: "No aircraft match. Try another search or clear the filters.",
    compareTitle: "Compare two aircraft", quizTitle: "Quiz: name that plane",
    examTitle: "Exam papers (for leaders)", examLocked: "Papers by badge level with a separate leader answer key open once enough types at that level are verified.",
    gamesTitle: "Coming mini-games", gamesLocked: "Airline matching and airport-name games will arrive after their data is verified, matching Air Activity and Aircrew badge requirements.",
    footerNote: "No photo is published before its licence is verified; no spec is shown without a source. Third-party photos keep their own credit, never our watermark.",
    all: "All", pending: "Data pending", verifiedOnly: "Verified", pendingOnly: "Pending", codePending: "Code to verify", verified: "Verified",
    viewCard: "View card", checkBtn: "View checklist", progress: "Verification", total: "In list", done: "Verified", types: "Categories", batch1: "Batch 1 cards out",
    photoPendingShort: "Photo pending", photoFail: "Photo failed to load. Check your connection; the data is unaffected.",
    introHead: "What is it?", featHead: "Key features (WEFT method)", nextHead: "Next time: telling it apart",
    specsHead: "Specifications (each with source & variant)", historyHead: "History", linksHead: "Dig deeper (opens new tab)",
    firstFlight: "First flight", enteredService: "Entered service", statusWord: "Status",
    weftNames: { wings: "W · Wings", engines: "E · Engines", fuselage: "F · Fuselage", tail: "T · Tail" },
    weftNamesHeli: { wings: "W · Main rotor", engines: "E · Engines", fuselage: "F · Fuselage", tail: "T · Tail (tail rotor)" },
    specNames: { length: "Length", wingspan: "Wingspan", rotorDiameter: "Main rotor diameter", height: "Height", engines: "Engines", seats: "Seats", payload: "Payload", range: "Range", cruise: "Cruise speed" },
    sourceWord: "Source", variantWord: "Variant", verifiedOn: "Verified",
    specsPending: "Specs: not yet available (being verified item by item; nothing is guessed)", photoPending: "Photo: pending (Wikimedia Commons licence must be checked per image)",
    sourcesTitle: "Sources to check (for leaders / members)", checklistTitle: "Verification checklist (8 items)",
    compareLocked: "Comparison opens after at least two aircraft are fully verified.",
    comparePick: "Pick two verified aircraft to compare side by side: photos first, then specs.",
    cmpA: "First aircraft", cmpB: "Second aircraft",
    quizLocked: "The quiz opens after at least four aircraft with photos are fully verified.",
    quizIntro: "Questions use verified cards only: look at the photo and pick the right type. Wrong answers explain how to tell, so you learn instead of memorising.",
    quizStart: "Start quiz", quizNext: "Next question", quizAgain: "Play again", quizQ: "Which aircraft is this?",
    correct: "Correct!", wrong: "Not quite — the answer is: ", score: "Done! You scored",
    checks: { identity: "Identity: names, manufacturer, ICAO code", history: "History: first flight and status", specs: "Specs: dimensions, engines, seats/payload, range", recognition: "Recognition: visible features and look-alikes", photo: "Photo: licence and annotation points", links: "Deep links: official, Wikipedia, FR24, gallery", bilingual: "English: names and recognition notes", quiz: "Quiz: questions and answers checked" }
  }
};

let lang = "zh";
try { const v = localStorage.getItem(LANG_KEY); if (v === "en" || v === "zh") lang = v; } catch (e) { /* private mode */ }
let DATA = null, category = "all", query = "", scout = "all", statusFilter = "all", facet = "all";
let cmpA = null, cmpB = null, quiz = null;
const SCOUT_LABEL = { BAAB: ["初級航空活動章", "Basic Air Activity"], IAAB: ["中級航空活動章", "Intermediate Air Activity"], AAAB: ["高級航空活動章", "Advanced Air Activity"] };
/* Facet tags: derived only from data already in the inventory (category, tags, verified specs). Nothing is invented for pending aircraft. */
const TAG_LABEL = {
  widebody: ["廣體", "Widebody"], narrowbody: ["窄體", "Narrowbody"], "double-deck": ["雙層客艙", "Double-deck"],
  "long-haul": ["長程", "Long-haul"], regional: ["區域航線", "Regional"], "regional-jet": ["支線噴射", "Regional jet"],
  turboprop: ["渦輪螺旋槳", "Turboprop"], piston: ["活塞引擎", "Piston"], "four-engine": ["四引擎", "Four-engine"], twin: ["雙引擎", "Twin-engine"],
  "business-jet": ["商務機", "Business jet"], "light-aircraft": ["輕型飛機", "Light aircraft"],
  "medium-helicopter": ["中型直升機", "Medium helicopter"], "light-helicopter": ["輕型直升機", "Light helicopter"],
  "heavy-helicopter": ["重型直升機", "Heavy helicopter"], "military-helicopter": ["軍用直升機", "Military helicopter"],
  "naval-helicopter": ["艦載直升機", "Naval helicopter"], coaxial: ["共軸旋翼", "Coaxial rotors"], notar: ["無尾旋翼（NOTAR）", "NOTAR"],
  fighter: ["戰鬥機", "Fighter"], trainer: ["教練機", "Trainer"], bomber: ["轟炸機", "Bomber"], reconnaissance: ["偵察機", "Reconnaissance"],
  transport: ["運輸", "Transport"], "special-transport": ["特殊運輸", "Special transport"], "heavy-lift": ["重型運輸", "Heavy lift"],
  "oversize-cargo": ["超大貨物", "Oversize cargo"], tanker: ["加油機", "Tanker"], carrier: ["艦載", "Carrier-based"],
  stealth: ["匿蹤", "Stealth"], supersonic: ["超音速", "Supersonic"], stol: ["短途起降（STOL）", "STOL"], retired: ["已退役", "Retired"],
  "historic-icon": ["歷史名機", "Historic icon"], classic: ["經典機型", "Classic"], pioneer: ["先驅機型", "Pioneer"],
  warbird: ["戰鳥", "Warbird"], homebuilt: ["自製飛機", "Homebuilt"], uav: ["無人機", "UAV"], utility: ["多用途", "Utility"]
};
const ENGINE_LABEL = { "1": ["單引擎", "Single-engine"], "2": ["雙引擎", "Twin-engine"], "3": ["三引擎", "Three-engine"], "4": ["四引擎", "Four-engine"], "6": ["六引擎", "Six-engine"] };
const FACET_FILTER_KEYS = ["widebody", "narrowbody", "turboprop", "piston", "business-jet", "light-aircraft", "light-helicopter", "medium-helicopter", "heavy-helicopter", "fighter", "trainer", "bomber", "transport", "stealth", "supersonic", "double-deck", "uav"];

function facetsOf(a) {
  const out = [], seen = new Set();
  const push = (key, zh, en) => { if (seen.has(key)) return; seen.add(key); out.push({ key, label: lang === "en" ? en : zh }); };
  if (a.category === "helicopter") push("rotor", "旋翼機", "Rotorcraft"); else push("fixed", "定翼機", "Fixed-wing");
  let engN = null;
  if (a.dataStatus === "verified" && a.specs && a.specs.engines) {
    const m = /^(\d+)/.exec(a.specs.engines.value || "");
    if (m && ENGINE_LABEL[m[1]]) engN = m[1];
  }
  if (engN) push("engines-" + engN, ENGINE_LABEL[engN][0], ENGINE_LABEL[engN][1]);
  for (const tg of (a.tags || [])) {
    if (engN && (tg === "twin" || tg === "four-engine")) continue;
    const l = TAG_LABEL[tg];
    if (l) push(tg, l[0], l[1]);
  }
  return out;
}

const $ = (id) => document.getElementById(id);
const t = () => STR[lang];
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nameOf = (a) => lang === "en" ? a.nameEn : a.nameZh;
const codeOf = (a) => (a.icao || (a.icaoCandidate && a.icaoCandidate !== "*" ? a.icaoCandidate : "")) || t().codePending;
const verifiedList = () => (DATA ? DATA.aircraft.filter((a) => a.dataStatus === "verified") : []);

function applyLang() {
  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.setAttribute("lang", lang === "en" ? "en" : "zh-Hant-HK");
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
  document.querySelectorAll("[data-i18n]").forEach((el) => { const k = el.getAttribute("data-i18n"); if (t()[k]) el.textContent = t()[k]; });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { const k = el.getAttribute("data-i18n-ph"); if (t()[k]) el.setAttribute("placeholder", t()[k]); });
  const btn = $("langToggle");
  btn.textContent = lang === "en" ? "中文" : "EN";
  btn.setAttribute("aria-label", lang === "en" ? "切換至中文介面" : "Switch to English");
  btn.setAttribute("title", lang === "en" ? "切換至中文介面" : "Switch to English");
  render();
}

function doneCount(a) { return Object.values(a.checklist || {}).filter((v) => v === "done").length; }

function photoImg(a, cls) {
  if (!a.photo) return "";
  return `<img class="${cls || ""}" src="${esc(a.photo.imageUrl)}" alt="${esc(nameOf(a))}" loading="lazy" onerror="this.remove()">`;
}

function render() {
  if (!DATA) return;
  const list = DATA.aircraft;
  const done = list.filter((a) => a.dataStatus === "verified").length;
  const b1 = list.filter((a) => a.scout && a.scout.level === "BAAB");
  const b1done = b1.filter((a) => a.dataStatus === "verified").length;
  $("stats").innerHTML = [
    [list.length, t().total], [done, t().done], [b1done + "/" + b1.length, t().batch1], [Object.keys(DATA.categories).length, t().types]
  ].map(([n, label]) => `<div class="stat"><b>${n}</b><span>${label}</span></div>`).join("");
  $("batch1Bar").style.width = (b1.length ? Math.round(b1done / b1.length * 100) : 0) + "%";
  $("batch1Text").textContent = b1done + " / " + b1.length;

  const chips = [["all", t().all]].concat(Object.entries(DATA.categories).map(([k, v]) => [k, lang === "en" ? v.en : v.zh]));
  $("categoryChips").innerHTML = chips.map(([k, label]) =>
    `<button type="button" class="chip" data-cat="${k}" aria-pressed="${category === k}">${esc(label)}</button>`).join("");
  document.querySelectorAll("[data-cat]").forEach((b) => b.addEventListener("click", () => { category = b.getAttribute("data-cat"); render(); }));

  const scoutChips = [["all", t().all]].concat(Object.entries(SCOUT_LABEL).map(([k, v]) => [k, lang === "en" ? v[1] : v[0]]));
  $("scoutChips").innerHTML = scoutChips.map(([k, label]) =>
    `<button type="button" class="chip" data-scout="${k}" aria-pressed="${scout === k}">${esc(label)}</button>`).join("");
  document.querySelectorAll("[data-scout]").forEach((b) => b.addEventListener("click", () => { scout = b.getAttribute("data-scout"); render(); }));

  const statusChips = [["all", t().all], ["verified", t().verifiedOnly], ["pending", t().pendingOnly]];
  $("statusChips").innerHTML = statusChips.map(([k, label]) =>
    `<button type="button" class="chip" data-status="${k}" aria-pressed="${statusFilter === k}">${esc(label)}</button>`).join("");
  document.querySelectorAll("[data-status]").forEach((b) => b.addEventListener("click", () => { statusFilter = b.getAttribute("data-status"); render(); }));

  const facetOpts = [["all", t().allFeatures], ["fixed", lang === "en" ? "Fixed-wing" : "定翼機"], ["rotor", lang === "en" ? "Rotorcraft" : "旋翼機"]]
    .concat(FACET_FILTER_KEYS.filter((k) => TAG_LABEL[k]).map((k) => [k, lang === "en" ? TAG_LABEL[k][1] : TAG_LABEL[k][0]]));
  $("facetSelect").innerHTML = facetOpts.map(([k, label]) => `<option value="${k}"${facet === k ? " selected" : ""}>${esc(label)}</option>`).join("");
  $("facetSelect").onchange = (e) => { facet = e.target.value; render(); };

  const q = query.trim().toLowerCase();
  const shown = list.filter((a) => {
    if (category !== "all" && a.category !== category) return false;
    if (scout !== "all" && !(a.scout && a.scout.level === scout)) return false;
    if (statusFilter === "verified" && a.dataStatus !== "verified") return false;
    if (statusFilter === "pending" && a.dataStatus === "verified") return false;
    if (facet !== "all" && !facetsOf(a).some((f) => f.key === facet)) return false;
    if (!q) return true;
    return [a.nameZh, a.nameEn, a.manufacturer, a.icao || a.icaoCandidate, a.seq].join(" ").toLowerCase().includes(q);
  }).sort((x, y) => (y.dataStatus === "verified") - (x.dataStatus === "verified") || x.seq.localeCompare(y.seq));
  $("noResults").hidden = shown.length !== 0;
  $("grid").innerHTML = shown.map((a) => {
    const n = doneCount(a), total = Object.keys(a.checklist || {}).length || 8;
    const isV = a.dataStatus === "verified";
    const photo = isV && a.photo
      ? `<div class="photo"><div class="photo-fallback"><span>${t().photoFail}</span></div>${photoImg(a)}</div>`
      : `<div class="photo"><div class="photo-fallback"><b>${esc((a.icao || a.seq).replace("AC-"))}</b><span>${t().photoPendingShort} · ${a.seq}</span></div></div>`;
    const intro = isV ? `<p class="intro">${esc(lang === "en" ? a.introEn : a.introZh)}</p>` : "";
    return `<article class="card">
      ${photo}
      <div class="card-body">
        <div class="card-top"><span class="seq">${a.seq} · ${esc(codeOf(a))}</span><span class="pill${isV ? " done" : ""}">${isV ? t().verified : t().pending}</span></div>
        <h3>${esc(nameOf(a))}</h3><p class="sub">${esc(a.manufacturer)} · ${esc(lang === "en" ? a.nameEn : a.nameZh)}</p>
        ${intro}
        <div class="meta"><span class="tag">${esc(lang === "en" ? a.categoryLabel.en : a.categoryLabel.zh)}</span>${a.scout ? `<span class="tag scout">${esc(lang === "en" ? SCOUT_LABEL[a.scout.level][1] : SCOUT_LABEL[a.scout.level][0])}</span>` : ""}</div>
        <div class="meta facets">${facetsOf(a).slice(0, 6).map((f) => `<span class="tag facet">${esc(f.label)}</span>`).join("")}</div>
        <div class="progress" aria-label="${t().progress} ${n}/${total}"><i style="width:${Math.round(n / total * 100)}%"></i></div>
        <p class="progress-line">${t().progress} ${n}/${total}</p>
        <button type="button" class="cta" data-seq="${a.seq}">${isV ? t().viewCard : t().checkBtn}</button>
      </div>
    </article>`;
  }).join("");
  document.querySelectorAll("[data-seq]").forEach((b) => b.addEventListener("click", () => openDetail(b.getAttribute("data-seq"))));
  renderCompare();
  renderQuizIntro();
}

function specRows(a) {
  const order = ["length", "wingspan", "rotorDiameter", "height", "engines", "seats", "payload", "range", "cruise"];
  return order.filter((k) => a.specs && a.specs[k]).map((k) => {
    const s = a.specs[k];
    const val = esc(s.value) + (s.unit ? " " + esc(s.unit) : "");
    const note = lang === "en" ? s.noteEn : s.noteZh;
    return `<tr><th>${esc(t().specNames[k] || k)}</th><td><b>${val}</b>${note ? ` · ${esc(note)}` : ""}<span class="src">${t().variantWord}：${esc(s.variant)} · ${t().verifiedOn}：${esc(s.verified)} · ${t().sourceWord}：<a href="${esc(s.source)}" target="_blank" rel="noopener">${esc(s.source.replace(/^https?:\/\//, "").split("/")[0])}</a></span></td></tr>`;
  }).join("");
}

function openDetail(seq) {
  const a = DATA.aircraft.find((x) => x.seq === seq); if (!a) return;
  const isV = a.dataStatus === "verified";
  $("detailTitle").textContent = nameOf(a) + " · " + codeOf(a) + " · " + a.seq;
  if (!isV) {
    const items = Object.entries(a.checklist || {}).map(([k, v]) =>
      `<li><span>${esc((t().checks && t().checks[k]) || k)}</span><span class="${v === "done" ? "done-t" : "pending"}">${v === "done" ? t().verified : t().pending}</span></li>`).join("");
    const sources = (a.sourcesToCheck || []).map((s) => {
      const label = s.labelZh || s.type;
      return s.url ? `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(label)}</a></li>` : `<li>${esc(label)}</li>`;
    }).join("");
    $("detailBody").innerHTML = `<p>${esc(a.manufacturer)}</p><p>${t().specsPending}</p><p>${t().photoPending}</p>
      <h3 class="block">${t().checklistTitle}</h3><ul class="checklist">${items}</ul>
      <h3 class="block">${t().sourcesTitle}</h3><ul class="source-list">${sources}</ul>`;
  } else {
    const ann = a.photo.annotations || [];
    const dots = ann.map((d, i) =>
      `<button type="button" class="dot" data-dot="${i}" style="left:${d.x}%;top:${d.y}%" aria-pressed="false" aria-label="${esc(lang === "en" ? d.en : d.zh)}">${i + 1}</button>`).join("");
    const legend = ann.map((d, i) =>
      `<button type="button" data-dot="${i}" aria-pressed="false">${i + 1}. ${esc(lang === "en" ? d.en : d.zh)}</button>`).join("");
    const wn = a.category === "helicopter" ? t().weftNamesHeli : t().weftNames;
    const weft = ["wings", "engines", "fuselage", "tail"].map((k) =>
      `<article data-weft="${k}"><h4>${esc(wn[k])}</h4><p>${esc(lang === "en" ? a.weft[k].en : a.weft[k].zh)}</p></article>`).join("");
    const links = (a.deepLinks || []).map((l) =>
      `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(lang === "en" ? l.labelEn : l.labelZh)} ↗</a>`).join("");
    const h = a.history || {};
    $("detailBody").innerHTML = `
      <div class="detail-badges"><span class="tag">${esc(lang === "en" ? a.categoryLabel.en : a.categoryLabel.zh)}</span>${a.scout ? `<span class="tag scout">${esc(lang === "en" ? SCOUT_LABEL[a.scout.level][1] : SCOUT_LABEL[a.scout.level][0])}</span>` : ""}<span class="tag">${esc(a.manufacturer)} · ${esc(a.icao)}</span>${facetsOf(a).map((f) => `<span class="tag facet">${esc(f.label)}</span>`).join("")}</div>
      <div class="variant-note">${esc(lang === "en" ? a.variantNoteEn : a.variantNoteZh)}</div>
      <div class="detail-photo">${photoImg(a)}${dots}</div>
      <p class="caption">${esc(lang === "en" ? a.photo.captionEn : a.photo.captionZh)}</p>
      <div class="dot-legend">${legend}</div>
      <p class="credit">${esc(lang === "en" ? a.photo.creditEn : a.photo.creditZh)} · <a href="${esc(a.photo.licenceUrl)}" target="_blank" rel="noopener">${esc(a.photo.licence)}</a> · <a href="${esc(a.photo.filePage)}" target="_blank" rel="noopener">Wikimedia Commons</a></p>
      <h3 class="block">${t().introHead}</h3><p class="caption">${esc(lang === "en" ? a.introEn : a.introZh)}</p>
      <h3 class="block">${t().featHead}</h3><div class="weft">${weft}</div>
      <h3 class="block">${t().nextHead}</h3><p class="similar">${esc(lang === "en" ? a.similarEn : a.similarZh)}</p>
      <h3 class="block">${t().specsHead}</h3><table class="specs"><tbody>${specRows(a)}</tbody></table>
      <h3 class="block">${t().historyHead}</h3>
      <p class="history-line">${t().firstFlight}：${esc(h.firstFlight || "—")} · ${t().enteredService}：${esc(h.enteredService || "—")}<br>${t().statusWord}：${esc(lang === "en" ? h.statusEn : h.statusZh)}<br><span class="credit">${t().sourceWord}：<a href="${esc(h.source || "#")}" target="_blank" rel="noopener">${esc((h.source || "").replace(/^https?:\/\//, "").split("/")[0])}</a> · ${t().verifiedOn}：${esc(a.verifiedDate)}</span></p>
      <h3 class="block">${t().linksHead}</h3><div class="links-hub">${links}</div>`;
    let activeDot = -1;
    const setActive = (i) => {
      const off = i === activeDot;
      activeDot = off ? -1 : i;
      document.querySelectorAll("[data-dot]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.getAttribute("data-dot")) === activeDot)));
      document.querySelectorAll("[data-weft]").forEach((el) => el.classList.remove("active"));
      if (off) return;
      const part = (ann[i] || {}).part;
      const card = document.querySelector(`[data-weft="${part}"]`);
      if (card) { card.classList.add("active"); card.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    };
    document.querySelectorAll("[data-dot]").forEach((b) => b.addEventListener("click", () => setActive(Number(b.getAttribute("data-dot")))));
  }
  const d = $("detailDialog");
  if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
}

function specCell(a, k) {
  const s = a.specs && a.specs[k];
  if (!s) return "—";
  return esc(s.value) + (s.unit ? " " + esc(s.unit) : "");
}

function renderCompare() {
  const body = $("compareBody"); if (!body) return;
  const pool = verifiedList();
  if (pool.length < 2) { body.innerHTML = `<p class="locked-note">${t().compareLocked} (${pool.length}/2)</p>`; return; }
  if (!cmpA || !pool.some((a) => a.seq === cmpA)) cmpA = pool[0].seq;
  if (!cmpB || !pool.some((a) => a.seq === cmpB) || cmpB === cmpA) cmpB = pool[1].seq;
  const opts = (sel) => pool.map((a) => `<option value="${a.seq}"${a.seq === sel ? " selected" : ""}>${esc(nameOf(a))} (${esc(a.icao)})</option>`).join("");
  const A = pool.find((a) => a.seq === cmpA), B = pool.find((a) => a.seq === cmpB);
  const rows = [["length"], ["wingspan"], ["rotorDiameter"], ["height"], ["engines"], ["seats"], ["payload"], ["range"], ["cruise"]].map(([k]) =>
    `<tr><th>${esc(t().specNames[k])}</th><td>${specCell(A, k)}</td><td>${specCell(B, k)}</td></tr>`).join("");
  const fus = (a) => esc(lang === "en" ? a.weft.fuselage.en : a.weft.fuselage.zh);
  body.innerHTML = `<p class="locked-note">${t().comparePick}</p>
    <div class="compare-picker">
      <label>${t().cmpA}<select id="cmpSelA">${opts(cmpA)}</select></label>
      <label>${t().cmpB}<select id="cmpSelB">${opts(cmpB)}</select></label>
    </div>
    <div class="compare-wrap"><table class="compare">
      <tr><th></th><th>${esc(nameOf(A))} · ${esc(A.icao)}</th><th>${esc(nameOf(B))} · ${esc(B.icao)}</th></tr>
      <tr><th>${t().featHead}</th><td>${A.photo ? photoImg(A) : ""}<p>${fus(A)}</p></td><td>${B.photo ? photoImg(B) : ""}<p>${fus(B)}</p></td></tr>
      ${rows}
    </table></div>`;
  $("cmpSelA").addEventListener("change", (e) => { cmpA = e.target.value; if (cmpA === cmpB) cmpB = pool.find((a) => a.seq !== cmpA).seq; renderCompare(); });
  $("cmpSelB").addEventListener("change", (e) => { cmpB = e.target.value; if (cmpB === cmpA) cmpA = pool.find((a) => a.seq !== cmpB).seq; renderCompare(); });
}

function renderQuizIntro() {
  const body = $("quizBody"); if (!body || quiz) return;
  const pool = verifiedList();
  if (pool.length < 4) { body.innerHTML = `<p class="locked-note">${t().quizLocked} (${pool.length}/4)</p>`; return; }
  body.innerHTML = `<p class="locked-note">${t().quizIntro}</p><button type="button" class="quiz-start" id="quizStart">${t().quizStart}</button>`;
  $("quizStart").addEventListener("click", startQuiz);
}

function startQuiz() {
  const pool = verifiedList();
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  quiz = { items: shuffled.slice(0, Math.min(5, shuffled.length)), idx: 0, score: 0, answered: false };
  showQuestion();
}

function showQuestion() {
  const body = $("quizBody");
  const a = quiz.items[quiz.idx];
  const others = verifiedList().filter((x) => x.seq !== a.seq).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...others, a].sort(() => Math.random() - 0.5);
  quiz.answer = a.seq; quiz.answered = false;
  body.innerHTML = `<p class="quiz-q">${t().quizQ} (${quiz.idx + 1}/${quiz.items.length})</p>
    <div class="quiz-photo">${photoImg(a)}</div>
    <div class="quiz-opts">${options.map((o) => `<button type="button" class="quiz-opt" data-opt="${o.seq}">${esc(nameOf(o))} · ${esc(o.icao)}</button>`).join("")}</div>
    <div id="quizFb"></div>`;
  document.querySelectorAll("[data-opt]").forEach((b) => b.addEventListener("click", () => answerQuiz(b, a)));
}

function answerQuiz(btn, a) {
  if (quiz.answered) return;
  quiz.answered = true;
  const right = btn.getAttribute("data-opt") === a.seq;
  if (right) quiz.score += 1;
  document.querySelectorAll("[data-opt]").forEach((b) => {
    b.disabled = true;
    if (b.getAttribute("data-opt") === a.seq) b.classList.add("right");
    else if (b === btn) b.classList.add("wrong");
  });
  const tip = lang === "en" ? a.weft.fuselage.en : a.weft.fuselage.zh;
  const last = quiz.idx + 1 >= quiz.items.length;
  $("quizFb").innerHTML = `<p class="quiz-feedback"><b>${right ? t().correct : t().wrong + esc(nameOf(a))}</b><br>${esc(tip)}</p>
    <p><button type="button" class="quiz-next" id="quizNext">${last ? (lang === "en" ? "See result" : "睇結果") : t().quizNext}</button></p>`;
  $("quizNext").addEventListener("click", () => {
    quiz.idx += 1;
    if (quiz.idx < quiz.items.length) { showQuestion(); return; }
    const finalScore = quiz.score, totalQ = quiz.items.length;
    quiz = null;
    $("quizBody").innerHTML = `<p class="quiz-score">${t().score} ${finalScore}/${totalQ}</p><p><button type="button" class="quiz-start" id="quizAgain">${t().quizAgain}</button></p>`;
    $("quizAgain").addEventListener("click", startQuiz);
  });
}

$("langToggle").addEventListener("click", () => { lang = lang === "en" ? "zh" : "en"; quiz = null; applyLang(); });
$("searchInput").addEventListener("input", (e) => { query = e.target.value; render(); });
$("detailClose").addEventListener("click", () => { const d = $("detailDialog"); if (d.close) d.close(); else d.removeAttribute("open"); });

fetch("data/aircraft-inventory.json").then((r) => { if (!r.ok) throw new Error("load"); return r.json(); })
  .then((d) => { DATA = d; applyLang(); })
  .catch(() => { $("loadError").hidden = false; applyLang(); });
