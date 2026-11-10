import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync(new URL("../web/data/aircraft-inventory.json", import.meta.url), "utf8"));
const CATS = ["airliner", "freighter", "regional-light", "helicopter", "military", "historic-special"];
const CHECKS = ["identity", "history", "specs", "recognition", "photo", "links", "bilingual", "quiz"];

test("清單有 157 款，序號唯一永不重用", () => {
  assert.equal(data.aircraft.length, 157);
  assert.equal(new Set(data.aircraft.map((a) => a.seq)).size, data.aircraft.length);
  assert.equal(new Set(data.aircraft.map((a) => a.nameEn)).size, data.aircraft.length);
});

test("類別只用白名單，每類至少一款", () => {
  for (const a of data.aircraft) assert.ok(CATS.includes(a.category), a.seq);
  for (const c of CATS) assert.ok(data.aircraft.some((a) => a.category === c), c);
});

test("未核實機型唔准有規格數字（唔估數）", () => {
  for (const a of data.aircraft) {
    if (a.dataStatus !== "verified") assert.deepEqual(a.specs, {}, a.seq);
  }
});

test("每款有齊八項清單，狀態只准 pending/done", () => {
  for (const a of data.aircraft) {
    assert.deepEqual(Object.keys(a.checklist).sort(), [...CHECKS].sort(), a.seq);
    for (const v of Object.values(a.checklist)) assert.ok(["pending", "done"].includes(v));
  }
});

test("已核實機型必須八項全 done 且有核實日期", () => {
  for (const a of data.aircraft) {
    if (a.dataStatus === "verified") {
      assert.ok(Object.values(a.checklist).every((v) => v === "done"), a.seq);
      assert.ok(a.verifiedDate, a.seq);
    }
  }
});

test("童軍航空活動章三批各 18 款（docs/06）", () => {
  for (const lvl of ["BAAB", "IAAB", "AAAB"]) {
    assert.equal(data.aircraft.filter((a) => a.scout && a.scout.level === lvl).length, 18, lvl);
  }
});

test("已核實機型必須有齊圖卡內容（WEFT、相片授權、標註、深度連結、帶來源規格）", () => {
  for (const a of data.aircraft.filter((x) => x.dataStatus === "verified")) {
    assert.ok(a.icao && !a.icao.includes("*"), a.seq + " ICAO");
    assert.ok(a.introZh && a.introEn, a.seq + " intro");
    for (const k of ["wings", "engines", "fuselage", "tail"]) assert.ok(a.weft[k].zh && a.weft[k].en, a.seq + " weft." + k);
    assert.ok(a.similarZh && a.similarEn, a.seq + " similar");
    assert.ok(a.photo && a.photo.imageUrl && a.photo.author && a.photo.licence && a.photo.filePage, a.seq + " photo");
    assert.ok(a.photo.annotations.length >= 3, a.seq + " annotations");
    for (const d of a.photo.annotations) assert.ok(d.x >= 0 && d.x <= 100 && d.y >= 0 && d.y <= 100, a.seq + " dot range");
    assert.ok(a.deepLinks.length >= 4 && a.deepLinks.every((l) => l.url.startsWith("https://")), a.seq + " links");
    assert.ok(a.history.firstFlight && a.history.enteredService, a.seq + " history");
    for (const [k, s] of Object.entries(a.specs)) {
      assert.ok(s.value && s.source.startsWith("https://") && s.variant && s.verified, a.seq + " spec." + k);
    }
  }
});

test("探索系列標籤只用白名單，且三個系列各有成員（v0.12）", () => {
  const KEYS = ["hk", "world", "china", "classic"];
  for (const a of data.aircraft) for (const c of (a.collections || [])) assert.ok(KEYS.includes(c), a.seq + " " + c);
  for (const k of KEYS) assert.ok(data.aircraft.some((a) => (a.collections || []).includes(k)), k);
  assert.deepEqual([...data.aircraft.find((a) => a.seq === "AC-0078").collections].sort(), ["china", "hk"]);
  assert.ok(data.aircraft.find((a) => a.seq === "AC-0039").collections.includes("hk"), "H175 政府飛行服務隊");
  assert.ok(data.aircraft.find((a) => a.seq === "AC-0030").collections.includes("classic"), "協和號 歷史名機");
});

test("每款首飛年份可解析，支撐首飛年代分類（v0.13）", () => {
  for (const a of data.aircraft) {
    const y = parseInt(((a.history || {}).firstFlight || "").slice(0, 4), 10);
    assert.ok(y >= 1903 && y <= 2026, a.seq + " firstFlight");
  }
});

test("已核實卡唔再帶待查清單等三欄（v0.14 瘦身，類別名由頂層推導）", () => {
  for (const a of data.aircraft.filter((x) => x.dataStatus === "verified")) {
    assert.ok(!("sourcesToCheck" in a), a.seq + " sourcesToCheck");
    assert.ok(!("categoryLabel" in a), a.seq + " categoryLabel");
    assert.ok(!("icaoCandidate" in a), a.seq + " icaoCandidate");
    assert.ok(data.categories[a.category], a.seq + " category");
  }
});

const blueprints = JSON.parse(readFileSync(new URL("../web/data/exam-blueprints.json", import.meta.url), "utf8"));
test("考卷藍本覆蓋三級航空活動章＋空勤員，且結構上冇答案", () => {
  assert.deepEqual(blueprints.papers.map((x) => x.level), ["BAAB", "IAAB", "AAAB", "AIRCREW"]);
  assert.ok(!JSON.stringify(blueprints).includes('"answer"'), "藍本唔准含答案欄");
  for (const paper of blueprints.papers) assert.ok(paper.sections.length >= 1, paper.paperIdPrefix);
});

test("出卷題池足夠：每節所需核實機型／標註／辨認資料齊備", () => {
  const byLevel = (lv) => data.aircraft.filter((a) => a.dataStatus === "verified" && a.scout && a.scout.level === lv);
  for (const paper of blueprints.papers) {
    for (const sec of paper.sections) {
      if (sec.poolLevel === "airlines") continue;
      const pool = byLevel(sec.poolLevel);
      assert.ok(pool.length >= sec.defaultCount, `${paper.level}/${sec.id} 題池 ${pool.length} < ${sec.defaultCount}`);
      if (sec.type === "parts-labelling")
        assert.ok(pool.filter((a) => a.photo.annotations.length >= 3).length >= sec.defaultCount, `${paper.level}/${sec.id} 標註不足`);
      if (sec.type === "weft-short-answer" || sec.type === "teach-back")
        assert.ok(pool.filter((a) => a.weft && a.weft.wings && a.weft.fuselage).length >= sec.defaultCount, `${paper.level}/${sec.id} WEFT 不足`);
      if (sec.type === "lookalike-differentiation")
        assert.ok(pool.filter((a) => a.similarZh && a.similarEn).length >= sec.defaultCount, `${paper.level}/${sec.id} 相似說明不足`);
      if (sec.type === "knowledge-short-answer")
        assert.ok(pool.filter((a) => a.history.firstFlight && a.icao && a.manufacturer && a.specs.engines).length >= sec.defaultCount, `${paper.level}/${sec.id} 知識題材不足`);
    }
  }
});

const airportsDoc = JSON.parse(readFileSync(new URL("../web/data/airports.json", import.meta.url), "utf8"));
test("機場資料：203 個國際機場（151 個香港直航），代碼唯一、座標合法、雙語齊全", () => {
  const aps = airportsDoc.airports;
  assert.equal(aps.length, 203);
  assert.equal(new Set(aps.map((p) => p.iata)).size, aps.length, "IATA 唯一");
  assert.equal(new Set(aps.map((p) => p.icao)).size, aps.length, "ICAO 唯一");
  const REGIONS = new Set(["home", "china", "taiwan", "eastasia", "seasia", "sasia", "centralasia", "meast", "europe", "africa", "namerica", "samerica", "oceania"]);
  for (const p of aps) {
    assert.match(p.iata, /^[A-Z]{3}$/, p.iata);
    assert.match(p.icao, /^[A-Z]{4}$/, p.iata + " ICAO");
    assert.ok(p.lat >= -90 && p.lat <= 90 && p.lng >= -180 && p.lng <= 180, p.iata + " 座標");
    for (const k of ["nameEn", "nameZh", "cityEn", "cityZh", "countryEn", "countryZh", "source"]) assert.ok(p[k], `${p.iata} 缺 ${k}`);
    assert.ok(p.source.startsWith("https://en.wikipedia.org/wiki/"), p.iata + " source");
    assert.equal(typeof p.hkDirect, "boolean", p.iata + " 缺 hkDirect");
    assert.ok(REGIONS.has(p.region), p.iata + " region 唔識：" + p.region);
  }
  assert.equal(aps.filter((p) => p.hkDirect).length, 151, "香港直航航點數");
  const directPool = aps.filter((p) => p.hkDirect || p.iata === "HKG");
  assert.equal(directPool.length, 152, "代碼遊戲直航線題池（直航 151＋主場）");
  assert.ok(aps.length >= 4 && directPool.length >= 4, "代碼遊戲題池夠出四選一");
  const hkg = aps.find((p) => p.iata === "HKG");
  assert.ok(hkg && Math.abs(hkg.lat - 22.308) < 0.1 && Math.abs(hkg.lng - 113.91) < 0.1, "HKG 座標合理");
  assert.equal(hkg.icao, "VHHH", "HKG ICAO 核實值");
  assert.equal(hkg.region, "home");
  assert.equal(hkg.hkDirect, false, "HKG 係主場，唔計直航航點");
});

const airlinesDoc = JSON.parse(readFileSync(new URL("../web/data/airlines.json", import.meta.url), "utf8"));
test("航空公司標誌庫：28 間（港4/亞太16/國際8），代碼齊全，標誌只准 PD Commons 檔（v0.25）", () => {
  const als = airlinesDoc.airlines;
  assert.equal(als.length, 28);
  assert.equal(new Set(als.map((e) => e.iata)).size, als.length, "IATA 唔可以重複");
  assert.equal(als.filter((e) => e.group === "hk").length, 4);
  assert.equal(als.filter((e) => e.group === "apac").length, 16);
  assert.equal(als.filter((e) => e.group === "world").length, 8);
  const airportCodes = new Set(airportsDoc.airports.map((x) => x.iata));
  let logos = 0;
  for (const e of als) {
    assert.match(e.iata, /^[A-Z0-9]{2}$/, e.iata);
    assert.match(e.icao, /^[A-Z]{3}$/, e.iata + " ICAO");
    assert.ok(e.nameEn && e.nameZh, e.iata + " 雙語名");
    assert.ok(["hk", "apac", "world"].includes(e.group), e.iata + " group");
    assert.equal(e.hkRegistered, e.group === "hk", e.iata + " hkRegistered 只限香港組");
    assert.ok(e.source && e.source.startsWith("https://en.wikipedia.org/wiki/"), e.iata + " source");
    assert.ok(e.verified, e.iata + " verified");
    if (e.hubIata) assert.ok(airportCodes.has(e.hubIata), e.iata + " hubIata 要喺機場庫：" + e.hubIata);
    if (e.logo) {
      logos++;
      assert.ok(e.logo.img.startsWith("https://upload.wikimedia.org/wikipedia/commons/thumb/"), e.iata + " logo img");
      assert.ok(e.logo.page.startsWith("https://commons.wikimedia.org/wiki/File:"), e.iata + " logo page");
      assert.equal(e.logo.license, "Public domain", e.iata + " 只准 PD");
      assert.ok(e.logo.credit, e.iata + " logo credit");
    }
  }
  assert.equal(logos, 23, "已核實 PD 標誌數（認標誌挑戰題池）");
  assert.deepEqual(als.filter((e) => !e.logo).map((e) => e.iata).sort(), ["HB", "HX", "MU", "UA", "UO"], "冇自由標誌嗰 5 間用文字牌");
  const cx = als.find((e) => e.iata === "CX");
  assert.equal(cx.icao, "CPA");
  assert.equal(cx.hubIata, "HKG");
  assert.ok(logoPoolSize(als) >= 4, "認標誌挑戰夠出四選一");
  function logoPoolSize(list) { return list.filter((e) => e.logo).length; }
});
