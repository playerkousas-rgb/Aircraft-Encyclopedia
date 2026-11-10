"use strict";
/* Aircraft-Encyclopedia v0.7 · © SCOUT SYSTEM · APP_VERSION 0.9.0 */
const APP_VERSION = "0.21.0";
const LANG_KEY = "aircraft-encyclopedia.lang";
const QUIZ_BEST_KEY = "aircraft-encyclopedia.quiz-best";
function loadQuizBest() { try { const v = JSON.parse(localStorage.getItem(QUIZ_BEST_KEY) || "{}"); return v && typeof v === "object" ? v : {}; } catch (e) { return {}; } }
function saveQuizBest(level, score) { try { const b = loadQuizBest(); if (b[level] == null || score > b[level]) { b[level] = score; localStorage.setItem(QUIZ_BEST_KEY, JSON.stringify(b)); } } catch (e) { /* ignore */ } }

const STR = {
  zh: {
    brand: "飛機圖鑑", kicker: "香港童軍航空活動章 · 辨認學習圖鑑",
    heroTitle: "一眼見到飛機，用一張圖認識飛機",
    heroText: "第一批跟童軍初級航空活動章清單（18 款）逐款核實：有齊相片、WEFT 辨認特徵同有來源的規格，先會出圖卡。",
    batch1Label: "第一批（初級航空活動章）進度",
    searchLabel: "搜尋", searchPh: "名稱、代碼、製造商…", catLabel: "類別", scoutLabel: "章級別", colLabel: "探索系列", eraLabel: "首飛年代", originLabel: "製造國", quizScopeLabel: "出題範圍", quizAll: "全部（已核實）", statusLabel: "狀態", facetLabel: "特徵", allFeatures: "全部特徵",
    loadErrorTitle: "資料載入失敗", loadErrorText: "請檢查網絡後重新整理；如果用檔案方式打開，請改用靜態伺服器開本站。",
    noResults: "搵唔到符合嘅飛機，試下改搜尋字或清除分類。",
    compareTitle: "比較兩款飛機", quizTitle: "小測驗：睇相認飛機",
    examTitle: "考卷（領袖出卷）", examLocked: "按章級別出試卷連領袖答案紙，要等嗰一級核實的機型夠數先開放，確保每條題目答案正確。",
    gamesTitle: "小遊戲：限時認機大挑戰",
    gameIntro: "60 秒內認得幾多款？答啱 +10 分，每連對 5 題額外 +25 分；答錯扣 3 秒、連對歸零。按章級揀題池，或者全部機型一齊玩。",
    gameStart: "開始挑戰", gameAll: "全部機型", gameTime: "時間", gameScore: "分數", gameStreak: "連對", gameBest: "最佳", gameNone: "未開始",
    gameOver: "時間到！", gameRight: "答啱", gameQuestions: "題", gameMaxStreak: "最長連對", gameAgain: "再玩一次", gameQuit: "放棄", gameBack: "返去揀模式", gameBonus: "連對獎分 +25！",
    airportTitle: "機場代碼與世界地圖", airportIntro: "第一步：52 個世界主要國際機場，代碼同座標逐個經維基百科核實。撳地圖上嘅代碼牌或者下面清單，即刻知嗰個機場喺邊。", airportSearchPh: "搜尋代碼、機場、城市…", airportCount: "個機場", airportNoMap: "地圖底圖載入唔到（可能離線），下面清單仍然用得。", airportSrc: "底圖 © OpenStreetMap contributors（後備 Esri）；機場資料來源：Wikipedia，2026-11 核實。",
    shTitle: "小遊戲：認機空防戰", shIntro: "飛機飛過防區：軍機要認啱機名先開火擊落，民航機就認啱影低佢。飛走三架就失守；每波越來越快。打完每架都會出特徵卡，教你點認——唔係齋鬥快。",
    shStart: "出擊", shLives: "防線", shWave: "第", shPromptMil: "⚠ 軍機接近——認啱機名開火！", shPromptCiv: "民航機經過——認啱機名影低佢！",
    shShot: "擊落！", shCaptured: "拍低咗！", shEscaped: "飛走咗…", shFeature: "認機特徵", shOver: "防線失守！", shDown: "擊落", shCaps: "拍低",
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
    quizIntro: "題目只用已核實圖卡，按章級混合認相、標示部件、WEFT 特徵、知識同相似分辨題。答錯會即刻講返點認，唔使死背。",
    qTypePhoto: "認相", qTypeParts: "標示部件", qTypeWeft: "WEFT 特徵", qTypeKnow: "航空知識", qTypeLook: "相似分辨", qTypeReverse: "以名認相",
    qParts: "相中「？」位置係邊個部件？", qWeft: "以下特徵描述緊邊款飛機？", qLook: "相中機型最易同邊款混淆？", qReversePre: "邊張相先係",
    quizStart: "開始測驗", quizNext: "下一題", quizAgain: "再玩一次", quizQ: "呢架係邊款飛機？",
    quizPickLevel: "按章級數分開操：揀你考緊嗰級，只出嗰級的機型。", quizFree: "自由練習（唔分級）", quizBest: "最佳", quizNone: "未開始", quizBack: "返去揀級數",
    examIntro: "揀一級即刻出卷：題目只用已核實圖卡隨機產生，每次唔同；領袖版附答案同出處，方便批改。", examGen: "出卷", examRegen: "重新出卷", examBack: "返去揀卷",
    examPrintPaper: "列印學員試卷", examPrintKey: "列印領袖答案", examShowKey: "顯示答案", examHideKey: "隱藏答案", examName: "姓名", examUnit: "支部／旅", examDate: "日期", examTotal: "總分", examMarksUnit: "分",
    secPhotoId: "認相", secParts: "標示部件", secWeft: "WEFT 簡答", secAirline: "航空公司配對", secKnowledge: "航空知識簡答", secLookalike: "相似機型分辨", secTeach: "教返人認機", secSpotting: "機場認機",
    examNote: "本卷由已核實圖卡即時隨機產生；相片版權屬原作者，依圖卡標示的授權使用。", examKey: "答案", examTypes: "款可用題池",
    correct: "啱咗！", wrong: "唔啱，正確答案係：", score: "完成！你啱咗",
    checks: { identity: "身份：中英名、製造商、ICAO 代碼", history: "歷史：首飛與現況", specs: "規格：尺寸、引擎、座位/載重、航程", recognition: "辨認：肉眼特徵與相似機型分別", photo: "相片：授權與標註座標", links: "深度連結：官方、維基、FR24、圖庫", bilingual: "英文：名稱與辨認特徵", quiz: "測驗：題目與答案核對" }
  },
  en: {
    brand: "Aircraft Encyclopedia", kicker: "Hong Kong Scout Air Activity badges · Recognition field guide",
    heroTitle: "See a plane. Learn a plane.",
    heroText: "Batch 1 follows the Scout Basic Air Activity list (18 types), verified one by one: a card is published only with a licensed photo, WEFT recognition notes and sourced specs.",
    batch1Label: "Batch 1 (Basic Air Activity) progress",
    searchLabel: "Search", searchPh: "Name, code, manufacturer…", catLabel: "Category", scoutLabel: "Badge level", colLabel: "Collections", eraLabel: "First-flight era", originLabel: "Made in", quizScopeLabel: "Quiz scope", quizAll: "All (verified)", statusLabel: "Status", facetLabel: "Features", allFeatures: "All features",
    loadErrorTitle: "Could not load data", loadErrorText: "Check your connection and reload. If you opened this as a file, serve the folder with a static server instead.",
    noResults: "No aircraft match. Try another search or clear the filters.",
    compareTitle: "Compare two aircraft", quizTitle: "Quiz: name that plane",
    examTitle: "Exam papers (for leaders)", examLocked: "Papers by badge level with a separate leader answer key open once enough types at that level are verified.",
    gamesTitle: "Game: timed spotting challenge",
    gameIntro: "How many can you spot in 60 seconds? +10 per correct answer, +25 bonus every 5 in a row; a miss costs 3 seconds and resets your streak. Pick a badge-level pool, or play with every type.",
    gameStart: "Start challenge", gameAll: "All types", gameTime: "Time", gameScore: "Score", gameStreak: "Streak", gameBest: "Best", gameNone: "Not played",
    gameOver: "Time up!", gameRight: "Correct", gameQuestions: "questions", gameMaxStreak: "Best streak", gameAgain: "Play again", gameQuit: "Quit", gameBack: "Back to modes", gameBonus: "Streak bonus +25!",
    airportTitle: "Airport codes & world map", airportIntro: "Step one: 52 major international airports worldwide, every code and coordinate verified against Wikipedia. Tap a code badge on the map or an item below to see where it is.", airportSearchPh: "Search code, airport, city…", airportCount: "airports", airportNoMap: "Map tiles could not load (possibly offline); the list below still works.", airportSrc: "Basemap © OpenStreetMap contributors (Esri fallback); airport data: Wikipedia, verified 2026-11.",
    shTitle: "Game: Sky Defence Spotter", shIntro: "Aircraft crossing your sector: name military types correctly to shoot them down; name civil types to photograph them. Three escapes and the line falls; every wave is faster. Each target ends with a feature card teaching the recognition points — not just speed.",
    shStart: "Launch", shLives: "Line", shWave: "Wave", shPromptMil: "⚠ Military contact — name it to fire!", shPromptCiv: "Civil traffic — name it to photograph!",
    shShot: "Shot down!", shCaptured: "Captured!", shEscaped: "It got away…", shFeature: "Recognition features", shOver: "The line has fallen!", shDown: "Downed", shCaps: "Snapped",
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
    quizIntro: "Questions use verified cards only, mixing photo ID, part labelling, WEFT features, knowledge and look-alike questions by badge level. Wrong answers explain how to tell, so you learn instead of memorising.",
    qTypePhoto: "Photo ID", qTypeParts: "Label the part", qTypeWeft: "WEFT feature", qTypeKnow: "Knowledge", qTypeLook: "Look-alikes", qTypeReverse: "Name to photo",
    qParts: "Which part is marked “?” in the photo?", qWeft: "Which aircraft does this feature describe?", qLook: "Which type is it most easily confused with?", qReversePre: "Which photo shows the",
    quizStart: "Start quiz", quizNext: "Next question", quizAgain: "Play again", quizQ: "Which aircraft is this?",
    quizPickLevel: "Drill by badge level: pick your level to face only its aircraft.", quizFree: "Free practice (any level)", quizBest: "Best", quizNone: "Not started", quizBack: "Back to levels",
    examIntro: "Pick a level to generate a paper instantly: questions are drawn at random from verified cards only, different every time; the leader version carries answers with sources for marking.", examGen: "Generate paper", examRegen: "Regenerate", examBack: "Back to papers",
    examPrintPaper: "Print student paper", examPrintKey: "Print leader key", examShowKey: "Show answers", examHideKey: "Hide answers", examName: "Name", examUnit: "Unit / Troop", examDate: "Date", examTotal: "Total", examMarksUnit: "marks",
    secPhotoId: "Photo identification", secParts: "Label the parts", secWeft: "WEFT short answers", secAirline: "Airline matching", secKnowledge: "Aviation knowledge", secLookalike: "Tell look-alikes apart", secTeach: "Teach it back", secSpotting: "Airport spotting",
    examNote: "This paper was generated at random from verified cards; photos remain under their credited licences.", examKey: "Key", examTypes: "types in pool",
    correct: "Correct!", wrong: "Not quite — the answer is: ", score: "Done! You scored",
    checks: { identity: "Identity: names, manufacturer, ICAO code", history: "History: first flight and status", specs: "Specs: dimensions, engines, seats/payload, range", recognition: "Recognition: visible features and look-alikes", photo: "Photo: licence and annotation points", links: "Deep links: official, Wikipedia, FR24, gallery", bilingual: "English: names and recognition notes", quiz: "Quiz: questions and answers checked" }
  }
};

let lang = "zh";
try { const v = localStorage.getItem(LANG_KEY); if (v === "en" || v === "zh") lang = v; } catch (e) { /* private mode */ }
let DATA = null, category = "all", query = "", scout = "all", statusFilter = "all", facet = "all", collection = "all", era = "all", origin = "all", quizScope = "all";
let cmpA = null, cmpB = null, quiz = null;
let BLUEPRINTS = null, examModel = null, examKeyShown = false;
let AIRPORTS = null, airportMap = null, airportLayer = null, airportMarkers = {}, airportQuery = "";
const SCOUT_LABEL = { BAAB: ["初級航空活動章", "Basic Air Activity"], IAAB: ["中級航空活動章", "Intermediate Air Activity"], AAAB: ["高級航空活動章", "Advanced Air Activity"] };
const COLLECTION_LABEL = { hk: ["香港常見", "Hong Kong regulars"], world: ["世界常見", "Worldwide common"], china: ["中國自產", "China-built"], classic: ["歷史名機", "Historic icons"] };
function collTags(a) { return (a.collections || []).filter((c) => COLLECTION_LABEL[c]).map((c) => `<span class="tag coll coll-${c}">${esc(lang === "en" ? COLLECTION_LABEL[c][1] : COLLECTION_LABEL[c][0])}</span>`).join(""); }
const ERA_BANDS = [["pioneer", 0, 1945, "先驅時代", "Pioneer era", "–1945"], ["jetage", 1946, 1969, "噴射時代", "Jet age", "1946–69"], ["widebody", 1970, 1989, "廣體時代", "Widebody era", "1970–89"], ["glass", 1990, 1999, "數碼座艙時代", "Glass-cockpit era", "1990–99"], ["newgen", 2000, 2009, "新世代", "New generation", "2000–09"], ["modern", 2010, 9999, "當代", "Modern era", "2010–"]];
function eraOf(a) { const y = parseInt(((a.history || {}).firstFlight || "").slice(0, 4), 10); if (!y) return null; const b = ERA_BANDS.find((x) => y >= x[1] && y <= x[2]); return b ? b[0] : null; }
const ORIGIN_LABEL = { usa: ["美國", "USA"], europe: ["歐洲", "Europe"], china: ["中國", "China"], canada: ["加拿大", "Canada"], brazil: ["巴西", "Brazil"], russia: ["俄羅斯", "Russia"], austria: ["奧地利", "Austria"], france: ["法國", "France"], italy: ["意大利", "Italy"], ukraine: ["烏克蘭", "Ukraine"], switzerland: ["瑞士", "Switzerland"], sweden: ["瑞典", "Sweden"], uk: ["英國", "UK"], japan: ["日本", "Japan"] };
const ORIGIN_BY_MANUFACTURER = {"Beechcraft": "usa", "Bell": "usa", "Boeing": "usa", "Cessna": "usa", "Cirrus Design": "usa", "Douglas": "usa", "Fairchild Republic": "usa", "Gulfstream": "usa", "Gulfstream Aerospace": "usa", "Lockheed": "usa", "Lockheed Martin": "usa", "MD Helicopters": "usa", "McDonnell Douglas": "usa", "McDonnell Douglas / Boeing": "usa", "Northrop Grumman": "usa", "North American": "usa", "Grumman": "usa", "General Atomics": "usa", "Piper": "usa", "Robinson": "usa", "Sikorsky": "usa", "Van's Aircraft": "usa", "Wright brothers": "usa", "Airbus": "europe", "Airbus Defence and Space": "europe", "Airbus Helicopters": "europe", "ATR": "europe", "Aérospatiale / BAC": "europe", "Eurocopter / Airbus Helicopters": "europe", "Eurofighter": "europe", "AVIC / CAIGA": "china", "COMAC": "china", "COMAC 中國商飛": "china", "Changhe Aircraft": "china", "Chengdu": "china", "Chengdu (AVIC)": "china", "Chengdu / PAC": "china", "Chengdu Aircraft": "china", "Harbin Aircraft Industry Group": "china", "Harbin Aircraft Manufacturing": "china", "Hongdu (Nanchang)": "china", "Hongdu Aviation": "china", "Shaanxi Aircraft Corporation": "china", "Shenyang Aircraft Corporation": "china", "Xian Aircraft": "china", "Xian Aircraft (AVIC)": "china", "Antonov": "ukraine", "Ilyushin": "russia", "Kamov": "russia", "Mikoyan": "russia", "Mil": "russia", "Sukhoi": "russia", "Bombardier": "canada", "De Havilland Canada": "canada", "de Havilland Canada": "canada", "Embraer": "brazil", "Dassault": "france", "Leonardo": "italy", "Leonardo Helicopters": "italy", "Saab": "sweden", "Pilatus": "switzerland", "Diamond Aircraft": "austria", "de Havilland": "uk", "Supermarine": "uk", "Mitsubishi": "japan"};
function originOf(a) { return ORIGIN_BY_MANUFACTURER[a.manufacturer] || null; }
function catLabel(a) { const c = (DATA && DATA.categories || {})[a.category] || {}; return lang === "en" ? (c.en || a.category) : (c.zh || a.category); }
function quizPool() { const pool = verifiedList(); if (quizScope === "all") return pool; const parts = quizScope.split(":"); const kind = parts[0], key = parts[1]; if (kind === "scout") return pool.filter((a) => a.scout && a.scout.level === key); if (kind === "coll") return pool.filter((a) => (a.collections || []).includes(key)); if (kind === "era") return pool.filter((a) => eraOf(a) === key); return pool; }
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

  const colChips = [["all", t().all]].concat(Object.entries(COLLECTION_LABEL).map(([k, v]) => [k, lang === "en" ? v[1] : v[0]]));
  $("collectionChips").innerHTML = colChips.map(([k, label]) =>
    `<button type="button" class="chip" data-coll="${k}" aria-pressed="${collection === k}">${esc(label)}</button>`).join("");
  document.querySelectorAll("[data-coll]").forEach((b) => b.addEventListener("click", () => { collection = b.getAttribute("data-coll"); render(); }));

  const eraChips = [["all", t().all]].concat(ERA_BANDS.map((b) => [b[0], (lang === "en" ? b[4] : b[3]) + " " + b[5]]));
  $("eraChips").innerHTML = eraChips.map(([k, label]) =>
    `<button type="button" class="chip" data-era="${k}" aria-pressed="${era === k}">${esc(label)}</button>`).join("");
  document.querySelectorAll("[data-era]").forEach((b) => b.addEventListener("click", () => { era = b.getAttribute("data-era"); render(); }));

  const originCounts = {}; for (const a of list) { const o = originOf(a); if (o) originCounts[o] = (originCounts[o] || 0) + 1; }
  const originChips = [["all", t().all]].concat(Object.keys(ORIGIN_LABEL).filter((k) => originCounts[k]).sort((x, y) => originCounts[y] - originCounts[x]).map((k) => [k, lang === "en" ? ORIGIN_LABEL[k][1] : ORIGIN_LABEL[k][0]]));
  $("originChips").innerHTML = originChips.map(([k, label]) =>
    `<button type="button" class="chip" data-origin="${k}" aria-pressed="${origin === k}">${esc(label)}</button>`).join("");
  document.querySelectorAll("[data-origin]").forEach((b) => b.addEventListener("click", () => { origin = b.getAttribute("data-origin"); render(); }));

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
    if (collection !== "all" && !(a.collections || []).includes(collection)) return false;
    if (era !== "all" && eraOf(a) !== era) return false;
    if (origin !== "all" && originOf(a) !== origin) return false;
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
        <div class="meta"><span class="tag">${esc(catLabel(a))}</span>${a.scout ? `<span class="tag scout">${esc(lang === "en" ? SCOUT_LABEL[a.scout.level][1] : SCOUT_LABEL[a.scout.level][0])}</span>` : ""}${collTags(a)}</div>
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
  renderExamIntro();
  renderExamPaper();
  renderGameIntro();
  renderShooterIntro();
  renderAirports();
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
      <div class="detail-badges"><span class="tag">${esc(catLabel(a))}</span>${a.scout ? `<span class="tag scout">${esc(lang === "en" ? SCOUT_LABEL[a.scout.level][1] : SCOUT_LABEL[a.scout.level][0])}</span>` : ""}<span class="tag">${esc(a.manufacturer)} · ${esc(a.icao)}</span>${collTags(a)}${facetsOf(a).map((f) => `<span class="tag facet">${esc(f.label)}</span>`).join("")}</div>
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
  const best = loadQuizBest();
  const levelCards = Object.entries(SCOUT_LABEL).map(([k, v]) => {
    const n = pool.filter((a) => a.scout && a.scout.level === k).length;
    const b = best[k];
    const bestTxt = b == null ? t().quizNone : `${t().quizBest} ${b}/12`;
    return `<div class="quiz-level"><h3>${esc(lang === "en" ? v[1] : v[0])}</h3><p>${n} ${lang === "en" ? "types" : "款"} · 12 ${lang === "en" ? "questions" : "題"} · ${esc(bestTxt)}</p><button type="button" class="quiz-start" data-level="${k}">${t().quizStart}</button></div>`;
  }).join("");
  const opt = (v, label) => `<option value="${v}"${quizScope === v ? " selected" : ""}>${esc(label)}</option>`;
  const scopeSel = `<label class="quiz-scope">${t().quizScopeLabel}<select id="quizScopeSel">${opt("all", t().quizAll)}<optgroup label="${esc(t().colLabel)}">${Object.entries(COLLECTION_LABEL).map(([k, v]) => opt("coll:" + k, lang === "en" ? v[1] : v[0])).join("")}</optgroup><optgroup label="${esc(t().eraLabel)}">${ERA_BANDS.map((b) => opt("era:" + b[0], (lang === "en" ? b[4] : b[3]) + " " + b[5])).join("")}</optgroup></select></label>`;
  body.innerHTML = `<p class="locked-note">${t().quizIntro}</p><p class="quiz-pick">${t().quizPickLevel}</p><div class="quiz-levels">${levelCards}</div><div class="quiz-free"><p class="quiz-pick">${t().quizFree}</p>${scopeSel}<button type="button" class="quiz-start" id="quizStart">${t().quizStart}</button></div>`;
  body.querySelectorAll("[data-level]").forEach((b) => b.addEventListener("click", () => startLevelQuiz(b.getAttribute("data-level"))));
  $("quizScopeSel").addEventListener("change", (e) => { quizScope = e.target.value; });
  $("quizStart").addEventListener("click", startQuiz);
}

// ---------- quiz question generators (v0.18: mixed types by level) ----------
const PART_LABEL = { nose: ["機鼻／駕駛艙", "Nose / cockpit"], engines: ["引擎", "Engine"], wings: ["機翼", "Wing"], fuselage: ["機身", "Fuselage"], tail: ["機尾", "Tail"] };
const partKeyOf = (p) => ({ engine: "engines", wing: "wings" }[p] || p);
function partLabel(a, key) {
  if (key === "wings" && a.category === "helicopter") return lang === "en" ? "Main rotor" : "主旋翼";
  const v = PART_LABEL[key]; return v ? v[lang === "en" ? 1 : 0] : key;
}
function nameOpts(a, pool) {
  const inScope = shuffle(pool.filter((x) => x.seq !== a.seq));
  const extra = shuffle(verifiedList().filter((x) => x.seq !== a.seq && !inScope.some((s) => s.seq === x.seq)));
  return shuffle([a.seq, ...[...inScope, ...extra].slice(0, 3).map((x) => x.seq)]);
}
const mkPhoto = (a, pool) => ({ kind: "photo", seq: a.seq, options: nameOpts(a, pool), answer: a.seq });
const mkReverse = (a, pool) => ({ kind: "reverse", seq: a.seq, options: nameOpts(a, pool), answer: a.seq });
function mkParts(a) {
  const ann = Math.floor(Math.random() * a.photo.annotations.length);
  const key = partKeyOf(a.photo.annotations[ann].part);
  const options = shuffle([key, ...sample(["nose", "engines", "wings", "fuselage", "tail"].filter((k) => k !== key), 3)]);
  return { kind: "parts", seq: a.seq, ann, options, answer: key };
}
function mkWeft(a, pool) {
  const keys = ["wings", "engines", "fuselage", "tail"];
  return { kind: "weft", seq: a.seq, part: keys[Math.floor(Math.random() * keys.length)], options: nameOpts(a, pool), answer: a.seq };
}
function mkKnow(a, pool) {
  const makers = [...new Set(pool.map((x) => x.manufacturer))];
  const roll = Math.random();
  if (roll < 0.34) {
    const y = parseInt((a.history.firstFlight || "").slice(0, 4), 10);
    const offs = sample([-7, -5, -3, -2, -1, 1, 2, 3, 4, 6], 3).map((o) => String(y + o));
    return { kind: "know", seq: a.seq, qk: "ff", options: shuffle([String(y), ...offs]), answer: String(y) };
  }
  if (roll < 0.67 && makers.length >= 4) {
    return { kind: "know", seq: a.seq, qk: "maker", options: shuffle([a.manufacturer, ...sample(makers.filter((m) => m !== a.manufacturer), 3)]), answer: a.manufacturer };
  }
  const codes = [...new Set(pool.filter((x) => x.seq !== a.seq).map((x) => x.icao))].filter((c) => c !== a.icao);
  return { kind: "know", seq: a.seq, qk: "icao", options: shuffle([a.icao, ...sample(codes, 3)]), answer: a.icao };
}
function mkLook(a, pool) {
  const opp = lookalikeOpp(a);
  const answer = (lang === "en" ? opp.en : opp.zh) || opp.en || opp.zh;
  const distract = sample(pool.filter((x) => x.seq !== a.seq), 3).map((x) => nameOf(x));
  return { kind: "lookalike", seq: a.seq, options: shuffle([answer, ...distract]), answer };
}
function mkItem(kind, a, pool) {
  if (kind === "parts") return mkParts(a);
  if (kind === "reverse") return mkReverse(a, pool);
  if (kind === "weft") return mkWeft(a, pool);
  if (kind === "know") return mkKnow(a, pool);
  if (kind === "lookalike") return mkLook(a, pool);
  return mkPhoto(a, pool);
}
const QUIZ_MIX = {
  BAAB: [["photo", 6], ["parts", 3], ["reverse", 3]],
  IAAB: [["photo", 5], ["weft", 3], ["know", 2], ["parts", 2]],
  AAAB: [["photo", 4], ["lookalike", 3], ["weft", 3], ["reverse", 2]]
};
function genLevelItems(level, pool) {
  const deck = shuffle(pool);
  let cur = 0;
  const items = [];
  for (const [kind, n] of QUIZ_MIX[level] || [["photo", 12]]) {
    let made = 0;
    while (made < n && cur < deck.length) {
      const a = deck[cur++];
      if (kind === "lookalike") { const o = lookalikeOpp(a); if (!o.en && !o.zh) continue; }
      if (kind === "parts" && !(a.photo.annotations || []).length) continue;
      items.push(mkItem(kind, a, pool)); made++;
    }
  }
  while (items.length < 12 && cur < deck.length) items.push(mkPhoto(deck[cur++], pool));
  return shuffle(items);
}

function startQuiz() {
  const scopePool = quizPool();
  const pool = scopePool.length ? scopePool : verifiedList();
  const picked = shuffle(pool).slice(0, Math.min(5, pool.length));
  quiz = { items: picked.map((a) => mkPhoto(a, pool)), idx: 0, score: 0, answered: false, level: null, pool };
  showQuestion();
}

function startLevelQuiz(level) {
  const pool = verifiedList().filter((a) => a.scout && a.scout.level === level);
  if (pool.length < 4) return;
  quiz = { items: genLevelItems(level, pool), idx: 0, score: 0, answered: false, level, pool };
  showQuestion();
}

function showQuestion() {
  const body = $("quizBody");
  const it = quiz.items[quiz.idx];
  const bySeq = bySeqMap();
  const a = bySeq.get(it.seq);
  quiz.answer = it.answer; quiz.answered = false;
  const head = (label, prompt) => `<p class="quiz-q">${prompt} (${quiz.idx + 1}/${quiz.items.length}) <span class="quiz-type">${esc(label)}</span></p>`;
  const nameBtns = (cls) => it.options.map((sq) => { const o = bySeq.get(sq); return `<button type="button" class="quiz-opt${cls || ""}" data-opt="${sq}">${esc(nameOf(o))} · ${esc(o.icao)}</button>`; }).join("");
  let inner = "";
  if (it.kind === "reverse") {
    inner = `${head(t().qTypeReverse, `${t().qReversePre}「${esc(nameOf(a))}」？`)}<div class="quiz-opts photos">${it.options.map((sq) => `<button type="button" class="quiz-opt photo" data-opt="${sq}">${photoImg(bySeq.get(sq))}</button>`).join("")}</div><div id="quizFb"></div>`;
  } else if (it.kind === "parts") {
    const d = a.photo.annotations[it.ann];
    inner = `${head(t().qTypeParts, t().qParts)}<div class="quiz-photo natural">${photoImg(a)}<span class="dot static qmark" style="left:${d.x}%;top:${d.y}%">?</span></div><div class="quiz-opts">${it.options.map((k) => `<button type="button" class="quiz-opt" data-opt="${k}">${esc(partLabel(a, k))}</button>`).join("")}</div><div id="quizFb"></div>`;
  } else if (it.kind === "weft") {
    inner = `${head(t().qTypeWeft, t().qWeft)}<blockquote class="quiz-quote">${esc(lang === "en" ? a.weft[it.part].en : a.weft[it.part].zh)}</blockquote><div class="quiz-opts">${nameBtns()}</div><div id="quizFb"></div>`;
  } else if (it.kind === "know") {
    let prompt;
    if (it.qk === "ff") prompt = lang === "en" ? `In which year did the ${esc(a.nameEn)} first fly?` : `「${esc(a.nameZh)}」邊一年首飛？`;
    else if (it.qk === "icao") prompt = lang === "en" ? `What is the ICAO type designator of the ${esc(a.nameEn)}?` : `「${esc(a.nameZh)}」的 ICAO 機型代碼係咩？`;
    else prompt = lang === "en" ? `Which company makes the ${esc(a.nameEn)}?` : `「${esc(a.nameZh)}」由邊間公司製造？`;
    inner = `${head(t().qTypeKnow, prompt)}<div class="quiz-opts">${it.options.map((s) => `<button type="button" class="quiz-opt" data-opt="${esc(s)}">${esc(s)}</button>`).join("")}</div><div id="quizFb"></div>`;
  } else if (it.kind === "lookalike") {
    inner = `${head(t().qTypeLook, t().qLook)}<div class="quiz-photo">${photoImg(a)}</div><div class="quiz-opts">${it.options.map((s) => `<button type="button" class="quiz-opt" data-opt="${esc(s)}">${esc(s)}</button>`).join("")}</div><div id="quizFb"></div>`;
  } else {
    inner = `${head(t().qTypePhoto, t().quizQ)}<div class="quiz-photo">${photoImg(a)}</div><div class="quiz-opts">${nameBtns()}</div><div id="quizFb"></div>`;
  }
  body.innerHTML = inner;
  document.querySelectorAll("[data-opt]").forEach((b) => b.addEventListener("click", () => answerQuiz(b)));
}

function answerQuiz(btn) {
  if (quiz.answered) return;
  quiz.answered = true;
  const it = quiz.items[quiz.idx];
  const a = bySeqMap().get(it.seq);
  const right = btn.getAttribute("data-opt") === quiz.answer;
  if (right) quiz.score += 1;
  document.querySelectorAll("[data-opt]").forEach((b) => {
    b.disabled = true;
    if (b.getAttribute("data-opt") === quiz.answer) b.classList.add("right");
    else if (b === btn) b.classList.add("wrong");
  });
  let tip, answerShown = nameOf(a);
  if (it.kind === "parts") { const d = a.photo.annotations[it.ann]; tip = lang === "en" ? d.en : d.zh; answerShown = partLabel(a, it.answer); }
  else if (it.kind === "lookalike") { tip = lang === "en" ? a.similarEn : a.similarZh; answerShown = it.answer; }
  else if (it.kind === "know") { tip = it.qk === "ff" ? a.history.firstFlight : it.qk === "icao" ? `${a.manufacturer} · ${a.icao}` : a.specs.engines; answerShown = it.answer; }
  else tip = lang === "en" ? a.weft.fuselage.en : a.weft.fuselage.zh;
  const last = quiz.idx + 1 >= quiz.items.length;
  $("quizFb").innerHTML = `<p class="quiz-feedback"><b>${right ? t().correct : t().wrong + esc(answerShown)}</b><br>${esc(tip)}</p>
    <p><button type="button" class="quiz-next" id="quizNext">${last ? (lang === "en" ? "See result" : "睇結果") : t().quizNext}</button></p>`;
  $("quizNext").addEventListener("click", () => {
    quiz.idx += 1;
    if (quiz.idx < quiz.items.length) { showQuestion(); return; }
    const finalScore = quiz.score, totalQ = quiz.items.length, level = quiz.level;
    if (level) saveQuizBest(level, finalScore);
    quiz = null;
    const head = level ? `${esc(lang === "en" ? SCOUT_LABEL[level][1] : SCOUT_LABEL[level][0])} — ` : "";
    const again = level
      ? `<button type="button" class="quiz-start" id="quizAgain">${t().quizAgain}</button> <button type="button" class="quiz-start alt" id="quizLevels">${t().quizBack}</button>`
      : `<button type="button" class="quiz-start" id="quizAgain">${t().quizAgain}</button>`;
    $("quizBody").innerHTML = `<p class="quiz-score">${head}${t().score} ${finalScore}/${totalQ}</p><p>${again}</p>`;
    $("quizAgain").addEventListener("click", () => { if (level) startLevelQuiz(level); else startQuiz(); });
    const lv = $("quizLevels"); if (lv) lv.addEventListener("click", () => { renderQuizIntro(); });
  });
}


// ---------- exam papers (generated from blueprints; answers never stored) ----------
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const sample = (arr, n) => shuffle(arr).slice(0, Math.min(n, arr.length));
const scoutPool = (lv) => verifiedList().filter((a) => a.scout && a.scout.level === lv);
const bySeqMap = () => new Map((DATA ? DATA.aircraft : []).map((a) => [a.seq, a]));
const SEC_TITLE = { "photo-identification": "secPhotoId", "parts-labelling": "secParts", "weft-short-answer": "secWeft", "airline-matching": "secAirline", "knowledge-short-answer": "secKnowledge", "lookalike-differentiation": "secLookalike", "teach-back": "secTeach", "airport-spotting": "secSpotting" };
const SEC_INSTR = {
  "photo-identification": ["睇相，在四個選項中揀出正確機型名，圈出英文字母。", "Look at the photo and circle the letter of the correct aircraft name."],
  "airport-spotting": ["模擬在機場見到真機：睇相揀出正確機型名，圈出英文字母。", "As if you spotted it at the airport: circle the letter of the correct aircraft name."],
  "parts-labelling": ["寫出相中每個編號位置的部件或特徵名稱。", "Write the name of the part or feature at each numbered position."],
  "weft-short-answer": ["用一句說話，寫出指定部位的辨認特徵。", "In one sentence, write the recognition feature of the named part."],
  "airline-matching": ["將左邊機型同右邊航空公司／營運者配對，在括號內寫上英文字母（以圖卡資料為準）。", "Match each aircraft on the left with an airline / operator on the right; write the letter in the brackets (as stated on the aircraft cards)."],
  "knowledge-short-answer": ["簡短回答以下問題。", "Answer each question briefly."],
  "lookalike-differentiation": ["寫出一個可以分辨兩者的外形分別。", "Write one visible feature that tells the two apart."],
  "teach-back": ["用自己的說話，教一位初級組員點樣認出這款飛機。", "In your own words, teach a junior member how to recognise this aircraft."]
};
const AIRLINES = [
  { zh: "國泰航空", en: "Cathay Pacific", a: ["國泰航空", "國泰", "Cathay Pacific", "Cathay"] },
  { zh: "香港快運", en: "HK Express", a: ["香港快運", "HK Express"] },
  { zh: "香港航空", en: "Hong Kong Airlines", a: ["香港航空", "Hong Kong Airlines"] },
  { zh: "大灣區航空", en: "Greater Bay Airlines", a: ["大灣區航空", "Greater Bay Airlines"] },
  { zh: "卡塔爾航空", en: "Qatar Airways", a: ["卡塔爾航空", "卡塔爾", "Qatar Airways"] },
  { zh: "阿聯酋航空", en: "Emirates", a: ["阿聯酋航空", "Emirates"] },
  { zh: "新加坡航空", en: "Singapore Airlines", a: ["新加坡航空", "Singapore Airlines"] },
  { zh: "全日空", en: "All Nippon Airways (ANA)", a: ["全日空", "All Nippon", "ANA"] },
  { zh: "日本航空", en: "Japan Airlines", a: ["日本航空", "Japan Airlines"] },
  { zh: "大韓航空", en: "Korean Air", a: ["大韓航空", "Korean Air"] },
  { zh: "中國國際航空", en: "Air China", a: ["中國國際航空", "國航", "Air China"] },
  { zh: "中國南方航空", en: "China Southern Airlines", a: ["中國南方航空", "南航", "China Southern"] },
  { zh: "中國東方航空", en: "China Eastern Airlines", a: ["中國東方航空", "中國東方", "東航", "China Eastern"] },
  { zh: "漢莎航空", en: "Lufthansa", a: ["漢莎航空", "漢莎", "Lufthansa"] },
  { zh: "英國航空", en: "British Airways", a: ["英國航空", "英航", "British Airways"] },
  { zh: "法國航空", en: "Air France", a: ["法國航空", "法航", "Air France"] },
  { zh: "荷蘭皇家航空", en: "KLM Royal Dutch Airlines", a: ["荷蘭皇家航空", "KLM"] },
  { zh: "澳洲航空", en: "Qantas", a: ["澳洲航空", "澳航", "Qantas"] },
  { zh: "聯合航空", en: "United Airlines", a: ["聯合航空", "United Airlines"] },
  { zh: "達美航空", en: "Delta Air Lines", a: ["達美航空", "達美", "Delta Air Lines"] },
  { zh: "美國航空", en: "American Airlines", a: ["美國航空", "美航", "American Airlines"] },
  { zh: "泛美航空", en: "Pan American World Airways", a: ["泛美航空", "泛美", "Pan Am", "Pan American"] },
  { zh: "西南航空", en: "Southwest Airlines", a: ["西南航空", "Southwest Airlines", "Southwest"] },
  { zh: "土耳其航空", en: "Turkish Airlines", a: ["土耳其航空", "Turkish Airlines"] },
  { zh: "泰國國際航空", en: "Thai Airways", a: ["泰國國際航空", "泰航", "Thai Airways"] },
  { zh: "馬來西亞航空", en: "Malaysia Airlines", a: ["馬來西亞航空", "馬航", "Malaysia Airlines"] },
  { zh: "越南航空", en: "Vietnam Airlines", a: ["越南航空", "Vietnam Airlines"] },
  { zh: "菲律賓航空", en: "Philippine Airlines", a: ["菲律賓航空", "Philippine Airlines"] },
  { zh: "長榮航空", en: "EVA Air", a: ["長榮航空", "長榮", "EVA Air"] },
  { zh: "中華航空", en: "China Airlines", a: ["中華航空", "華航", "China Airlines"] },
  { zh: "印度航空", en: "Air India", a: ["印度航空", "Air India"] },
  { zh: "芬蘭航空", en: "Finnair", a: ["芬蘭航空", "Finnair"] },
  { zh: "瑞士國際航空", en: "SWISS", a: ["瑞士國際航空", "瑞士航空", "SWISS"] },
  { zh: "北歐航空", en: "SAS Scandinavian Airlines", a: ["北歐航空", "SAS"] },
  { zh: "紐西蘭航空", en: "Air New Zealand", a: ["紐西蘭航空", "Air New Zealand"] },
  { zh: "加拿大航空", en: "Air Canada", a: ["加拿大航空", "加航", "Air Canada"] },
  { zh: "俄羅斯航空", en: "Aeroflot", a: ["俄羅斯航空", "Aeroflot"] },
  { zh: "UPS 聯合包裹", en: "UPS Airlines", a: ["UPS"] },
  { zh: "聯邦快遞", en: "FedEx Express", a: ["聯邦快遞", "FedEx"] },
  { zh: "DHL", en: "DHL Aviation", a: ["DHL"] },
  { zh: "盧森堡貨運航空", en: "Cargolux", a: ["盧森堡貨運", "Cargolux"] }
];
function airlineMatchOf(a) {
  const find = (fields) => {
    for (let f = 0; f < fields.length; f++) {
      const text = fields[f]; if (!text) continue;
      let best = null;
      AIRLINES.forEach((al, ai) => al.a.forEach((alias) => {
        const pos = text.indexOf(alias);
        if (pos >= 0 && (!best || alias.length > best.len)) best = { ai, len: alias.length, alias };
      }));
      if (best) {
        const clause = text.split(/(?<=[。；！？.!?;])\s*/).find((c) => c.includes(best.alias)) || text;
        return { ai: best.ai, field: f, snippet: clause.trim().slice(0, 110) };
      }
    }
    return null;
  };
  const zh = find([a.history && a.history.statusZh, a.introZh, a.photo && a.photo.captionZh]);
  const en = find([a.history && a.history.statusEn, a.introEn, a.photo && a.photo.captionEn]);
  if (!zh && !en) return null;
  return { ai: (zh || en).ai, prio: Math.min(zh ? zh.field : 9, en ? en.field : 9), snippetZh: zh ? zh.snippet : "", snippetEn: en ? en.snippet : "" };
}
function buildAirlinePairs(count) {
  const byAirline = new Map();
  verifiedList().forEach((a) => {
    const m = airlineMatchOf(a); if (!m) return;
    const cur = byAirline.get(m.ai);
    if (!cur || m.prio < cur.prio || (m.prio === cur.prio && a.seq < cur.seq)) byAirline.set(m.ai, { seq: a.seq, ...m });
  });
  return sample([...byAirline.values()], count);
}
function lookalikeOpp(a) {
  const mEn = (a.similarEn || "").match(/^Versus (?:the )?(.+?)(?: \(|,|:)/);
  const mZh = (a.similarZh || "").match(/^同(.+?)比[：:]/);
  return { en: mEn ? mEn[1].trim() : "", zh: mZh ? mZh[1].trim() : "" };
}
function genExamModel(paper) {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const sections = paper.sections.map((sec) => {
    const pool = sec.poolLevel === "airlines" ? verifiedList() : scoutPool(sec.poolLevel);
    let items = [];
    if (sec.type === "photo-identification" || sec.type === "airport-spotting") {
      items = sample(pool, sec.defaultCount).map((a) => ({ seq: a.seq, options: shuffle([a.seq, ...sample(pool.filter((x) => x.seq !== a.seq), 3).map((x) => x.seq)]) }));
    } else if (sec.type === "parts-labelling") {
      items = sample(pool.filter((a) => (a.photo.annotations || []).length >= 2), sec.defaultCount)
        .map((a) => ({ seq: a.seq, ann: sample(a.photo.annotations.map((x, i) => i), Math.min(3, a.photo.annotations.length)) }));
    } else if (sec.type === "weft-short-answer") {
      const keys = ["wings", "engines", "fuselage", "tail"];
      items = sample(pool, sec.defaultCount).map((a) => ({ seq: a.seq, part: keys[Math.floor(Math.random() * keys.length)] }));
    } else if (sec.type === "airline-matching") {
      const pairs = buildAirlinePairs(sec.defaultCount);
      items = pairs.map((p) => ({ seq: p.seq, ai: p.ai, snippetZh: p.snippetZh, snippetEn: p.snippetEn }));
      return { def: sec, items, right: shuffle(pairs.map((p) => p.ai)) };
    } else if (sec.type === "knowledge-short-answer") {
      const kinds = ["ff", "icao", "maker", "engine"];
      items = sample(pool, sec.defaultCount).map((a, i) => ({ seq: a.seq, kind: kinds[i % kinds.length] }));
    } else if (sec.type === "lookalike-differentiation" || sec.type === "teach-back") {
      items = sample(pool, sec.defaultCount).map((a) => ({ seq: a.seq }));
    }
    return { def: sec, items };
  });
  return { paper, paperId: `${paper.paperIdPrefix}-${ymd}-${100 + Math.floor(Math.random() * 900)}`, sections };
}
function examPhotoHtml(a, dotsHtml) {
  return `<div class="exam-photo">${photoImg(a)}${dotsHtml || ""}</div><p class="exam-credit">${esc(lang === "en" ? a.photo.creditEn : a.photo.creditZh)} · ${esc(a.photo.licence)}</p>`;
}
function examKeyHtml(inner) { return `<div class="exam-key"><b>${t().examKey}：</b>${inner}</div>`; }
function examLines(n) { return `<div class="exam-lines">${Array.from({ length: n }, () => `<p class="exam-line"></p>`).join("")}</div>`; }
function renderExamSection(s, si, bySeq) {
  const letter = String.fromCharCode(65 + si);
  const title = t()[SEC_TITLE[s.def.type]] || s.def.type;
  const instr = SEC_INSTR[s.def.type] ? SEC_INSTR[s.def.type][lang === "en" ? 1 : 0] : "";
  let marks = 0, body = "";
  const q = (n, inner) => `<div class="exam-q"><p class="exam-qn">${n}.</p><div class="exam-qbody">${inner}</div></div>`;
  if (s.def.type === "photo-identification" || s.def.type === "airport-spotting") {
    marks = s.items.length;
    body = s.items.map((it, i) => {
      const a = bySeq.get(it.seq);
      const opts = it.options.map((sq, oi) => `<li class="${sq === it.seq ? "is-answer" : ""}">${String.fromCharCode(65 + oi)}. ${esc(nameOf(bySeq.get(sq)))}</li>`).join("");
      return q(i + 1, `${examPhotoHtml(a)}<ol class="exam-opts">${opts}</ol>`);
    }).join("");
  } else if (s.def.type === "parts-labelling") {
    body = s.items.map((it, i) => {
      const a = bySeq.get(it.seq);
      marks += it.ann.length;
      const dots = it.ann.map((ai, n) => { const dd = a.photo.annotations[ai]; return `<span class="dot static" style="left:${dd.x}%;top:${dd.y}%">${n + 1}</span>`; }).join("");
      const lines = it.ann.map((ai, n) => `<p class="exam-line"><span>${n + 1}.</span></p>`).join("");
      const key = it.ann.map((ai, n) => `${n + 1}. ${esc(lang === "en" ? a.photo.annotations[ai].en : a.photo.annotations[ai].zh)}`).join("；");
      return q(i + 1, `${examPhotoHtml(a, dots)}<div class="exam-lines">${lines}</div>${examKeyHtml(`${esc(nameOf(a))} — ${key}`)}`);
    }).join("");
  } else if (s.def.type === "weft-short-answer") {
    marks = s.items.length * 2;
    body = s.items.map((it, i) => {
      const a = bySeq.get(it.seq);
      const wn = (a.category === "helicopter" ? t().weftNamesHeli : t().weftNames)[it.part].split("· ")[1];
      const prompt = lang === "en" ? `Write one recognition feature of the ${esc(wn)} of the ${esc(a.nameEn)}.` : `寫出「${esc(a.nameZh)}」${esc(wn)}的一個辨認特徵。`;
      return q(i + 1, `<p class="exam-prompt">${prompt}</p>${examLines(2)}${examKeyHtml(esc(lang === "en" ? a.weft[it.part].en : a.weft[it.part].zh))}`);
    }).join("");
  } else if (s.def.type === "airline-matching") {
    marks = s.items.length;
    const left = s.items.map((it, i) => `<li>${esc(nameOf(bySeq.get(it.seq)))}（　）</li>`).join("");
    const right = s.right.map((ai, i) => `<li>${String.fromCharCode(65 + i)}. ${esc(lang === "en" ? AIRLINES[ai].en : AIRLINES[ai].zh)}</li>`).join("");
    const key = s.items.map((it, i) => {
      const li = s.right.indexOf(it.ai);
      const snip = lang === "en" ? (it.snippetEn || it.snippetZh) : (it.snippetZh || it.snippetEn);
      return `${i + 1}. ${esc(nameOf(bySeq.get(it.seq)))} → ${String.fromCharCode(65 + li)} ${esc(lang === "en" ? AIRLINES[it.ai].en : AIRLINES[it.ai].zh)}（${esc(snip)}）`;
    }).join("<br>");
    body = `<div class="exam-match"><ol class="match-left">${left}</ol><ol class="match-right">${right}</ol></div>${examKeyHtml(key)}`;
  } else if (s.def.type === "knowledge-short-answer") {
    marks = s.items.length * 2;
    body = s.items.map((it, i) => {
      const a = bySeq.get(it.seq);
      let prompt, ans;
      if (it.kind === "ff") { const ff = (a.history && a.history.firstFlight) || ""; prompt = lang === "en" ? `In which year did the ${esc(a.nameEn)} first fly?` : `「${esc(a.nameZh)}」邊一年首飛？`; ans = `${ff.slice(0, 4)}（${ff}）`; }
      else if (it.kind === "icao") { prompt = lang === "en" ? `What is the ICAO type designator of the ${esc(a.nameEn)}?` : `「${esc(a.nameZh)}」的 ICAO 機型代碼係咩？`; ans = a.icao; }
      else if (it.kind === "maker") { prompt = lang === "en" ? `Which company makes the ${esc(a.nameEn)}?` : `「${esc(a.nameZh)}」由邊間公司製造？`; ans = a.manufacturer; }
      else { prompt = lang === "en" ? `Which engines power the ${esc(a.nameEn)}?` : `「${esc(a.nameZh)}」用咩引擎？`; ans = a.specs.engines; }
      return q(i + 1, `<p class="exam-prompt">${prompt}</p>${examLines(1)}${examKeyHtml(esc(ans))}`);
    }).join("");
  } else if (s.def.type === "lookalike-differentiation") {
    marks = s.items.length * 2;
    body = s.items.map((it, i) => {
      const a = bySeq.get(it.seq);
      const opp = lookalikeOpp(a);
      const o = lang === "en" ? opp.en : opp.zh;
      const prompt = o
        ? (lang === "en" ? `The aircraft in the photo is the ${esc(a.nameEn)}, easily confused with the ${esc(o)}.` : `相中係「${esc(a.nameZh)}」，最易同${esc(o)}混淆。`)
        : (lang === "en" ? `Name the type the ${esc(a.nameEn)} is most easily confused with, and one difference.` : `寫出「${esc(a.nameZh)}」最易混淆的機型，同一個分別。`);
      return q(i + 1, `${examPhotoHtml(a)}<p class="exam-prompt">${prompt}</p>${examLines(2)}${examKeyHtml(esc(lang === "en" ? a.similarEn : a.similarZh))}`);
    }).join("");
  } else if (s.def.type === "teach-back") {
    marks = s.items.length * 5;
    body = s.items.map((it, i) => {
      const a = bySeq.get(it.seq);
      const key = ["wings", "engines", "fuselage", "tail"].map((k) => esc(lang === "en" ? a.weft[k].en : a.weft[k].zh)).join("<br>");
      return q(i + 1, `${examPhotoHtml(a)}<p class="exam-prompt">${esc(nameOf(a))}</p>${examLines(5)}${examKeyHtml(key)}`);
    }).join("");
  }
  return { marks, html: `<div class="exam-sec"><h4>${letter}. ${esc(title)}（${marks} ${t().examMarksUnit}）</h4><p class="exam-instr">${esc(instr)}</p>${body}</div>` };
}
function renderExamIntro() {
  const body = $("examBody"); if (!body) return;
  if (examModel) { body.innerHTML = ""; return; }
  if (!DATA || !BLUEPRINTS) { body.innerHTML = `<p class="locked-note">${t().examLocked}</p>`; return; }
  const cards = BLUEPRINTS.papers.map((p) => {
    const poolLv = p.sections[0].poolLevel;
    const n = poolLv === "airlines" ? verifiedList().length : scoutPool(poolLv).length;
    const secs = p.sections.map((s) => `${esc(t()[SEC_TITLE[s.type]] || s.type)} ×${s.defaultCount}`).join(" · ");
    const ok = n >= 4;
    return `<div class="quiz-level"><h3>${esc(lang === "en" ? p.titleEn : p.titleZh)}</h3><p>${secs}</p><p>${n} ${t().examTypes}</p><button type="button" class="quiz-start" data-paper="${p.level}"${ok ? "" : " disabled"}>${t().examGen}</button></div>`;
  }).join("");
  body.innerHTML = `<p class="locked-note">${t().examIntro}</p><div class="quiz-levels exam-cards">${cards}</div>`;
  body.querySelectorAll("[data-paper]").forEach((b) => b.addEventListener("click", () => {
    const paper = BLUEPRINTS.papers.find((p) => p.level === b.getAttribute("data-paper"));
    if (!paper) return;
    examModel = genExamModel(paper); examKeyShown = false;
    renderExamIntro(); renderExamPaper();
    const sec = $("examSection"); if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}
function renderExamPaper() {
  const el = $("examPaper"); if (!el) return;
  if (!examModel) { el.innerHTML = ""; return; }
  const bySeq = bySeqMap();
  let total = 0;
  const secs = examModel.sections.map((s, si) => { const r = renderExamSection(s, si, bySeq); total += r.marks; return r.html; }).join("");
  const p = examModel.paper;
  el.innerHTML = `<div class="exam-controls">
      <button type="button" class="quiz-start" id="exRegen">${t().examRegen}</button>
      <button type="button" class="quiz-start alt" id="exKey">${examKeyShown ? t().examHideKey : t().examShowKey}</button>
      <button type="button" class="quiz-start" id="exPrintPaper">${t().examPrintPaper}</button>
      <button type="button" class="quiz-start" id="exPrintKey">${t().examPrintKey}</button>
      <button type="button" class="quiz-start alt" id="exBack">${t().examBack}</button>
    </div>
    <article class="exam-sheet${examKeyShown ? " show-key" : ""}">
      <header class="exam-head">
        <p class="exam-id">${esc(examModel.paperId)}</p>
        <h3>${esc(lang === "en" ? p.titleEn : p.titleZh)}</h3>
        <div class="exam-info"><span>${t().examName}：<i class="exam-blank"></i></span><span>${t().examUnit}：<i class="exam-blank"></i></span><span>${t().examDate}：<i class="exam-blank s"></i></span><span class="exam-totalbox">${t().examTotal}：______ / ${total} ${t().examMarksUnit}</span></div>
      </header>
      ${secs}
      <p class="exam-foot">${t().examNote}</p>
    </article>`;
  const sheet = el.querySelector(".exam-sheet");
  const syncKey = () => { sheet.classList.toggle("show-key", examKeyShown); $("exKey").textContent = examKeyShown ? t().examHideKey : t().examShowKey; };
  $("exRegen").addEventListener("click", () => { examModel = genExamModel(examModel.paper); examKeyShown = false; renderExamPaper(); });
  $("exKey").addEventListener("click", () => { examKeyShown = !examKeyShown; syncKey(); });
  $("exPrintPaper").addEventListener("click", () => { examKeyShown = false; syncKey(); window.print(); });
  $("exPrintKey").addEventListener("click", () => { examKeyShown = true; syncKey(); window.print(); });
  $("exBack").addEventListener("click", () => { examModel = null; examKeyShown = false; renderExamIntro(); renderExamPaper(); });
}


// ---------- timed spotting game (v0.19; uses verified cards only, no new data) ----------
const GAME_BEST_KEY = "aircraft-encyclopedia.game-best";
let game = null, gameTimer = null;
function loadGameBest() { try { const v = JSON.parse(localStorage.getItem(GAME_BEST_KEY) || "{}"); return v && typeof v === "object" ? v : {}; } catch (e) { return {}; } }
function stopGameTimer() { if (gameTimer) { clearInterval(gameTimer); gameTimer = null; } }
function gamePoolOf(key) { return key === "all" ? verifiedList() : scoutPool(key); }
function renderGameIntro() {
  const body = $("gameBody"); if (!body || game) return;
  const best = loadGameBest();
  const card = (key, label) => {
    const n = gamePoolOf(key).length;
    const b = best[key];
    const bestTxt = b ? `${t().gameBest} ${b.score}` : t().gameNone;
    return `<div class="quiz-level"><h3>${esc(label)}</h3><p>${n} ${lang === "en" ? "types" : "款"} · ${esc(bestTxt)}</p><button type="button" class="quiz-start" data-game="${key}">${t().gameStart}</button></div>`;
  };
  const cards = Object.entries(SCOUT_LABEL).map(([k, v]) => card(k, lang === "en" ? v[1] : v[0])).join("") + card("all", t().gameAll);
  body.innerHTML = `<p class="locked-note">${t().gameIntro}</p><div class="quiz-levels exam-cards">${cards}</div>`;
  body.querySelectorAll("[data-game]").forEach((b) => b.addEventListener("click", () => startGame(b.getAttribute("data-game"))));
}
function startGame(key) {
  const pool = gamePoolOf(key);
  if (pool.length < 4) return;
  stopGameTimer();
  game = { key, pool, score: 0, streak: 0, maxStreak: 0, correct: 0, total: 0, lastSeq: null, locked: false, endAt: Date.now() + 60000 };
  nextGameQ();
  gameTimer = setInterval(tickGame, 100);
  tickGame();
}
function nextGameQ() {
  if (!game) return;
  const bySeq = bySeqMap();
  let a = game.pool[Math.floor(Math.random() * game.pool.length)];
  if (game.pool.length > 1) while (a.seq === game.lastSeq) a = game.pool[Math.floor(Math.random() * game.pool.length)];
  game.lastSeq = a.seq; game.locked = false; game.total += 1;
  const item = mkPhoto(a, game.pool);
  game.answer = item.answer;
  const remain = Math.max(0, game.endAt - Date.now());
  $("gameBody").innerHTML = `<div class="game-hud">
      <span class="game-stat">${t().gameScore} <b id="gameScore">${game.score}</b></span>
      <span class="game-stat">${t().gameStreak} <b id="gameStreak">x${game.streak}</b></span>
      <span class="game-timebar"><i id="gameBar" style="width:${(remain / 600).toFixed(1)}%"></i></span>
      <b class="game-clock" id="gameClock">${Math.ceil(remain / 1000)}s</b>
      <button type="button" class="quiz-start alt game-quit" id="gameQuit">${t().gameQuit}</button>
    </div>
    <div class="quiz-photo">${photoImg(a)}</div>
    <div class="quiz-opts">${item.options.map((sq) => { const o = bySeq.get(sq); return `<button type="button" class="quiz-opt" data-gopt="${sq}">${esc(nameOf(o))} · ${esc(o.icao)}</button>`; }).join("")}</div>
    <div id="gameFb"></div>`;
  document.querySelectorAll("[data-gopt]").forEach((b) => b.addEventListener("click", () => answerGame(b)));
  $("gameQuit").addEventListener("click", () => { stopGameTimer(); game = null; renderGameIntro(); });
}
function answerGame(btn) {
  if (!game || game.locked) return;
  game.locked = true;
  const right = btn.getAttribute("data-gopt") === game.answer;
  document.querySelectorAll("[data-gopt]").forEach((b) => {
    b.disabled = true;
    if (b.getAttribute("data-gopt") === game.answer) b.classList.add("right");
    else if (b === btn) b.classList.add("wrong");
  });
  let note = "";
  if (right) {
    game.correct += 1; game.streak += 1; game.maxStreak = Math.max(game.maxStreak, game.streak);
    game.score += 10;
    if (game.streak % 5 === 0) { game.score += 25; note = t().gameBonus; }
  } else {
    game.streak = 0; game.endAt -= 3000;
    const a = bySeqMap().get(game.answer);
    note = `${t().wrong}${esc(nameOf(a))}`;
  }
  const sc = $("gameScore"); if (sc) sc.textContent = game.score;
  const st = $("gameStreak"); if (st) st.textContent = `x${game.streak}`;
  const fb = $("gameFb"); if (fb && note) fb.innerHTML = `<p class="quiz-feedback">${esc(note)}</p>`;
  setTimeout(() => { if (game) { if (Date.now() >= game.endAt) finishGame(); else nextGameQ(); } }, right ? 320 : 800);
}
function tickGame() {
  if (!game) { stopGameTimer(); return; }
  const remain = game.endAt - Date.now();
  const bar = $("gameBar"), clock = $("gameClock");
  if (bar) { bar.style.width = `${Math.max(0, remain / 600)}%`; bar.classList.toggle("low", remain < 10000); }
  if (clock) clock.textContent = `${Math.max(0, Math.ceil(remain / 1000))}s`;
  if (remain <= 0) finishGame();
}
function finishGame() {
  if (!game) return;
  stopGameTimer();
  const g = game; game = null;
  try {
    const b = loadGameBest();
    if (!b[g.key] || g.score > b[g.key].score) { b[g.key] = { score: g.score, correct: g.correct, streak: g.maxStreak }; localStorage.setItem(GAME_BEST_KEY, JSON.stringify(b)); }
  } catch (e) { /* ignore */ }
  const label = g.key === "all" ? t().gameAll : (lang === "en" ? SCOUT_LABEL[g.key][1] : SCOUT_LABEL[g.key][0]);
  $("gameBody").innerHTML = `<p class="quiz-score">${t().gameOver} ${esc(label)}</p>
    <p class="game-result">${t().gameScore} <b>${g.score}</b> · ${t().gameRight} ${g.correct}/${g.total} ${t().gameQuestions} · ${t().gameMaxStreak} x${g.maxStreak}</p>
    <p><button type="button" class="quiz-start" id="gameAgain">${t().gameAgain}</button> <button type="button" class="quiz-start alt" id="gameBack">${t().gameBack}</button></p>`;
  $("gameAgain").addEventListener("click", () => startGame(g.key));
  $("gameBack").addEventListener("click", () => renderGameIntro());
}


// ---------- side-scrolling recognition shooter (v0.20) ----------
const SHOOTER_BEST_KEY = "aircraft-encyclopedia.shooter-best";
let shooter = null, shooterRaf = null, shooterTimeout = null;
const isMil = (a) => a.category === "military";
function loadShooterBest() { try { const v = JSON.parse(localStorage.getItem(SHOOTER_BEST_KEY) || "{}"); return v && typeof v === "object" ? v : {}; } catch (e) { return {}; } }
function stopShooter() {
  if (shooterRaf) { cancelAnimationFrame(shooterRaf); shooterRaf = null; }
  if (shooterTimeout) { clearTimeout(shooterTimeout); shooterTimeout = null; }
  shooter = null;
}
function renderShooterIntro() {
  const body = $("shooterBody"); if (!body || shooter) return;
  const best = loadShooterBest();
  const card = (key, label) => {
    const n = gamePoolOf(key).length;
    const b = best[key];
    const bestTxt = b ? `${t().gameBest} ${b.score}` : t().gameNone;
    return `<div class="quiz-level"><h3>${esc(label)}</h3><p>${n} ${lang === "en" ? "types" : "款"} · ${esc(bestTxt)}</p><button type="button" class="quiz-start" data-shooter="${key}">${t().shStart}</button></div>`;
  };
  const cards = Object.entries(SCOUT_LABEL).map(([k, v]) => card(k, lang === "en" ? v[1] : v[0])).join("") + card("all", t().gameAll);
  body.innerHTML = `<p class="locked-note">${t().shIntro}</p><div class="quiz-levels exam-cards">${cards}</div>`;
  body.querySelectorAll("[data-shooter]").forEach((b) => b.addEventListener("click", () => startShooter(b.getAttribute("data-shooter"))));
}
function startShooter(key) {
  const pool = gamePoolOf(key);
  if (pool.length < 4) return;
  stopShooter();
  shooter = { key, pool, score: 0, streak: 0, lives: 3, wave: 1, hits: 0, downed: 0, snapped: 0, lastSeq: null, plane: null, phase: "fly" };
  spawnPlane();
}
function spawnPlane() {
  if (!shooter) return;
  const pool = shooter.pool;
  let a = pool[Math.floor(Math.random() * pool.length)];
  if (pool.length > 1) while (a.seq === shooter.lastSeq) a = pool[Math.floor(Math.random() * pool.length)];
  shooter.lastSeq = a.seq;
  const dir = Math.random() < 0.5 ? 1 : -1;
  const speed = (0.055 + shooter.wave * 0.006) * (0.9 + Math.random() * 0.25);
  shooter.plane = { a, dir, lane: Math.floor(Math.random() * 3), speed, x: dir === 1 ? -340 : 0, startedAt: null };
  shooter.phase = "fly";
  const item = mkPhoto(a, pool);
  shooter.answer = item.answer;
  const bySeq = bySeqMap();
  const mil = isMil(a);
  $("shooterBody").innerHTML = `<div class="game-hud">
      <span class="game-stat">${t().gameScore} <b>${shooter.score}</b></span>
      <span class="game-stat">${t().gameStreak} <b>x${shooter.streak}</b></span>
      <span class="game-stat">${t().shWave} ${shooter.wave}${lang === "en" ? "" : " 波"}</span>
      <span class="game-stat">${t().shLives} <b class="sh-lives">${"♥".repeat(shooter.lives)}</b></span>
      <button type="button" class="quiz-start alt game-quit" id="shQuit">${t().gameQuit}</button>
    </div>
    <div class="sky" id="shSky">
      <div class="cloud c1"></div><div class="cloud c2"></div><div class="cloud c3"></div>
      <div class="plane" id="shPlane"><img src="${esc(a.photo.imageUrl)}" alt="" style="${dir === -1 ? "transform:scaleX(-1);" : ""}"></div>
      <div class="turret" aria-hidden="true"></div>
    </div>
    <p class="sh-prompt">${mil ? t().shPromptMil : t().shPromptCiv}</p>
    <div class="quiz-opts">${item.options.map((sq) => { const o = bySeq.get(sq); return `<button type="button" class="quiz-opt" data-sopt="${sq}">${esc(nameOf(o))} · ${esc(o.icao)}</button>`; }).join("")}</div>
    <div id="shFb"></div>`;
  document.querySelectorAll("[data-sopt]").forEach((b) => b.addEventListener("click", () => answerShooter(b)));
  $("shQuit").addEventListener("click", () => { stopShooter(); renderShooterIntro(); });
  shooterRaf = requestAnimationFrame(shooterLoop);
}
function shooterLoop(ts) {
  if (!shooter || shooter.phase !== "fly") return;
  const sky = $("shSky"), planeEl = $("shPlane");
  if (!sky || !planeEl) return;
  const p = shooter.plane;
  if (p.startedAt == null) { p.startedAt = ts; p.x = p.dir === 1 ? -340 : sky.clientWidth + 40; }
  const elapsed = ts - p.startedAt;
  const dist = p.speed * elapsed;
  const x = p.dir === 1 ? -340 + dist : sky.clientWidth + 40 - dist;
  planeEl.style.transform = `translateX(${x}px)`; planeEl.style.setProperty("--px", `${x}px`);
  planeEl.style.top = `${8 + p.lane * 22}%`;
  const exited = p.dir === 1 ? x > sky.clientWidth + 60 : x < -380;
  if (exited) { escapePlane(); return; }
  shooterRaf = requestAnimationFrame(shooterLoop);
}
function answerShooter(btn) {
  if (!shooter || shooter.phase !== "fly") return;
  const right = btn.getAttribute("data-sopt") === shooter.answer;
  if (!right) {
    shooter.streak = 0;
    btn.disabled = true; btn.classList.add("wrong");
    return;
  }
  shooter.phase = "hit";
  if (shooterRaf) cancelAnimationFrame(shooterRaf);
  const a = shooter.plane.a;
  const mil = isMil(a);
  shooter.hits += 1; shooter.streak += 1;
  shooter.score += 100;
  if (shooter.streak % 5 === 0) shooter.score += 50;
  if (mil) shooter.downed += 1; else shooter.snapped += 1;
  if (shooter.hits % 5 === 0) shooter.wave += 1;
  document.querySelectorAll("[data-sopt]").forEach((b) => {
    b.disabled = true;
    if (b.getAttribute("data-sopt") === shooter.answer) b.classList.add("right");
  });
  const sky = $("shSky"), planeEl = $("shPlane");
  if (sky && planeEl) {
    if (mil) {
      const boom = document.createElement("div");
      boom.className = "boom"; boom.style.left = "38%"; boom.style.top = "18%";
      planeEl.appendChild(boom); planeEl.classList.add("shot");
    } else {
      const fl = document.createElement("div"); fl.className = "skyflash"; sky.appendChild(fl);
      const stamp = document.createElement("div"); stamp.className = "stamp"; stamp.textContent = t().shCaptured;
      planeEl.appendChild(stamp);
    }
  }
  const fb = $("shFb");
  if (fb) fb.innerHTML = `<p class="quiz-feedback"><b>${mil ? t().shShot : t().shCaptured}</b> ${esc(nameOf(a))}</p>`;
  shooterTimeout = setTimeout(() => showFeatureCard(a), 620);
}
function escapePlane() {
  if (!shooter) return;
  shooter.phase = "hit";
  const a = shooter.plane.a;
  shooter.lives -= 1; shooter.streak = 0;
  const fb = $("shFb");
  if (fb) fb.innerHTML = `<p class="quiz-feedback"><b>${t().shEscaped}</b> ${esc(nameOf(a))}</p>`;
  document.querySelectorAll("[data-sopt]").forEach((b) => { b.disabled = true; if (b.getAttribute("data-sopt") === shooter.answer) b.classList.add("right"); });
  if (shooter.lives <= 0) { shooterTimeout = setTimeout(finishShooter, 700); return; }
  shooterTimeout = setTimeout(() => showFeatureCard(a), 700);
}
function showFeatureCard(a) {
  if (!shooter) return;
  const ann = a.photo.annotations || [];
  const dots = ann.map((d, i) => `<span class="dot static" style="left:${d.x}%;top:${d.y}%">${i + 1}</span>`).join("");
  const legend = ann.slice(0, 4).map((d, i) => `<li>${i + 1}. ${esc(lang === "en" ? d.en : d.zh)}</li>`).join("");
  $("shooterBody").innerHTML = `<div class="sh-feature">
      <p class="sh-prompt">${t().shFeature}：<b>${esc(nameOf(a))}</b> · ${esc(a.icao)}</p>
      <div class="quiz-photo natural">${photoImg(a)}${dots}</div>
      <ul class="sh-legend">${legend}</ul>
      <p class="caption">${esc(lang === "en" ? a.weft.fuselage.en : a.weft.fuselage.zh)}</p>
    </div>`;
  shooterTimeout = setTimeout(spawnPlane, 2100);
}
function finishShooter() {
  if (!shooter) return;
  const g = shooter;
  stopShooter();
  try {
    const b = loadShooterBest();
    if (!b[g.key] || g.score > b[g.key].score) { b[g.key] = { score: g.score, hits: g.hits }; localStorage.setItem(SHOOTER_BEST_KEY, JSON.stringify(b)); }
  } catch (e) { /* ignore */ }
  const label = g.key === "all" ? t().gameAll : (lang === "en" ? SCOUT_LABEL[g.key][1] : SCOUT_LABEL[g.key][0]);
  $("shooterBody").innerHTML = `<p class="quiz-score">${t().shOver} ${esc(label)}</p>
    <p class="game-result">${t().gameScore} <b>${g.score}</b> · ${t().shDown} ${g.downed} · ${t().shCaps} ${g.snapped} · ${t().shWave} ${g.wave}${lang === "en" ? "" : " 波"}</p>
    <p><button type="button" class="quiz-start" id="shAgain">${t().gameAgain}</button> <button type="button" class="quiz-start alt" id="shBack">${t().gameBack}</button></p>`;
  $("shAgain").addEventListener("click", () => startShooter(g.key));
  $("shBack").addEventListener("click", () => renderShooterIntro());
}


// ---------- airports & world map (v0.21; Leaflet/OSM pattern follows scoutworld repo) ----------
const AP_REGION = { home: ["香港與大灣區", "Hong Kong & Greater Bay"], china: ["中國內地", "Mainland China"], taiwan: ["台灣", "Taiwan"], eastasia: ["東北亞", "Northeast Asia"], seasia: ["東南亞", "Southeast Asia"], sasia: ["南亞", "South Asia"], meast: ["中東", "Middle East"], europe: ["歐洲", "Europe"], africa: ["非洲", "Africa"], namerica: ["北美洲", "North America"], samerica: ["南美洲", "South America"], oceania: ["大洋洲", "Oceania"] };
const AP_REGION_ORDER = Object.keys(AP_REGION);
const apName = (p) => lang === "en" ? p.nameEn : p.nameZh;
const apCity = (p) => lang === "en" ? `${p.cityEn}, ${p.countryEn}` : `${p.cityZh}・${p.countryZh}`;
let apTileErrors = 0, apBasemapIdx = 0;
function apBasemap(idx) {
  const cfgs = [
    { url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors", maxZoom: 19 },
    { url: "https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", attribution: "Tiles &copy; <a href=\"https://www.esri.com/\">Esri</a> — Esri, HERE, Garmin, &copy; OpenStreetMap contributors", maxZoom: 16 }
  ];
  const layer = L.tileLayer(cfgs[idx].url, { attribution: cfgs[idx].attribution, maxZoom: cfgs[idx].maxZoom });
  layer.on("tileerror", () => { apTileErrors += 1; if (apTileErrors >= 4 && idx < cfgs.length - 1 && airportMap) { airportMap.removeLayer(layer); apBasemap(idx + 1); } });
  return layer;
}
function initAirportMap() {
  if (airportMap || !window.L || !$("airportMap")) return;
  airportMap = L.map("airportMap", { minZoom: 2, maxZoom: 18 }).setView([22.3, 114.2], 3);
  apBasemap(0).addTo(airportMap);
  airportLayer = L.layerGroup().addTo(airportMap);
  setTimeout(() => { if (airportMap) airportMap.invalidateSize(); }, 150);
}
function renderAirports() {
  const body = $("airportBody"); if (!body) return;
  if (!AIRPORTS) { body.innerHTML = `<p class="locked-note">${t().examLocked}</p>`; return; }
  const list = [...AIRPORTS.airports].sort((a, b) => AP_REGION_ORDER.indexOf(a.region) - AP_REGION_ORDER.indexOf(b.region) || a.iata.localeCompare(b.iata));
  const q = airportQuery.trim().toLowerCase();
  const shown = q ? list.filter((p) => [p.iata, p.nameEn, p.nameZh, p.cityEn, p.cityZh, p.countryEn, p.countryZh].join(" ").toLowerCase().includes(q)) : list;
  const cards = shown.map((p) => `<button type="button" class="ap-card" data-ap="${p.iata}"><span class="ap-code">${p.iata}</span><span class="ap-name">${esc(apName(p))}</span><span class="ap-city">${esc(apCity(p))}</span></button>`).join("");
  body.innerHTML = `<p class="locked-note">${t().airportIntro}</p>
    <div id="airportMap" class="airport-map" role="application" aria-label="World airport map"></div>
    <label class="search ap-search"><span>${t().searchLabel}</span><input id="airportSearch" type="search" placeholder="${t().airportSearchPh}" value="${esc(airportQuery)}"></label>
    <p class="ap-count">${shown.length} ${t().airportCount}</p>
    <div class="ap-grid">${cards}</div>
    <p class="ap-src">${t().airportSrc}</p>`;
  $("airportSearch").addEventListener("input", (e) => { airportQuery = e.target.value; renderAirports(); const el = $("airportSearch"); el.focus(); el.setSelectionRange(el.value.length, el.value.length); });
  body.querySelectorAll("[data-ap]").forEach((b) => b.addEventListener("click", () => focusAirport(b.getAttribute("data-ap"))));
  if (window.L) {
    initAirportMap();
    if (airportMap && airportLayer) {
      airportLayer.clearLayers();
      airportMarkers = {};
      list.forEach((p) => {
        const icon = L.divIcon({ className: "ap-pin-wrap", html: `<span class="ap-pin">${p.iata}</span>`, iconSize: null });
        const m = L.marker([p.lat, p.lng], { icon }).bindPopup(`<b class="ap-pop-code">${p.iata}</b><br>${esc(apName(p))}<br>${esc(apCity(p))}`);
        m.addTo(airportLayer);
        airportMarkers[p.iata] = m;
      });
    }
  } else {
    $("airportMap").innerHTML = `<p class="locked-note">${t().airportNoMap}</p>`;
  }
}
function focusAirport(iata) {
  const p = AIRPORTS && AIRPORTS.airports.find((x) => x.iata === iata);
  if (!p) return;
  const sec = $("airportSection"); if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
  if (airportMap && airportMarkers[iata]) {
    airportMap.flyTo([p.lat, p.lng], Math.max(airportMap.getZoom(), 5), { duration: 1.1 });
    setTimeout(() => { if (airportMarkers[iata]) airportMarkers[iata].openPopup(); }, 1150);
  }
}

$("langToggle").addEventListener("click", () => { lang = lang === "en" ? "zh" : "en"; quiz = null; examModel = null; examKeyShown = false; stopGameTimer(); game = null; stopShooter(); applyLang(); });
$("searchInput").addEventListener("input", (e) => { query = e.target.value; render(); });
$("detailClose").addEventListener("click", () => { const d = $("detailDialog"); if (d.close) d.close(); else d.removeAttribute("open"); });

fetch("data/aircraft-inventory.json").then((r) => { if (!r.ok) throw new Error("load"); return r.json(); })
  .then((d) => { DATA = d; applyLang(); fetch("data/exam-blueprints.json").then((r) => { if (!r.ok) throw new Error("bp"); return r.json(); }).then((b) => { BLUEPRINTS = b; renderExamIntro(); }).catch(() => {}); fetch("data/airports.json").then((r) => { if (!r.ok) throw new Error("ap"); return r.json(); }).then((d) => { AIRPORTS = d; renderAirports(); }).catch(() => {}); })
  .catch(() => { $("loadError").hidden = false; applyLang(); });
