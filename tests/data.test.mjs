import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync(new URL("../web/data/aircraft-inventory.json", import.meta.url), "utf8"));
const CATS = ["airliner", "freighter", "regional-light", "helicopter", "military", "historic-special"];
const CHECKS = ["identity", "history", "specs", "recognition", "photo", "links", "bilingual", "quiz"];

test("清單有 145 款，序號唯一永不重用", () => {
  assert.equal(data.aircraft.length, 145);
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
