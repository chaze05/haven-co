const puppeteer = require("puppeteer-core");
const fs = require("node:fs");
fs.mkdirSync("C:/rani/haven-co/qa", { recursive: true });

const BASE = "http://localhost:3000";
const OUT = "C:/rani/haven-co/qa";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message.slice(0, 140)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 140));
  });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 90000 });
  await sleep(1400);
  console.log("title:", await page.title());
  await page.screenshot({ path: OUT + "/haven-hero.jpg" });

  const heroCounter = () =>
    page.evaluate(() => {
      const el = Array.from(document.querySelectorAll("span")).find((s) =>
        /^0\d \/ 0\d$/.test(s.textContent.trim())
      );
      return el ? el.textContent.trim() : null;
    });

  const c1 = await heroCounter();
  await sleep(5600);
  const c2 = await heroCounter();
  console.log("hero autoplay:", c1, "->", c2, "|", c1 !== c2);

  // Carousel arrows
  const trackTransform = () =>
    page.evaluate(() => {
      const track = Array.from(document.querySelectorAll("div")).find((d) =>
        d.className.includes("cursor-grab")
      );
      return track ? getComputedStyle(track).transform : null;
    });

  await page.evaluate(() => {
    const button = document.querySelector('button[aria-label="Next homes"]');
    if (button) button.click();
  });
  await sleep(900);
  console.log("carousel moved:", (await trackTransform()) !== "matrix(1, 0, 0, 1, 0, 0)");

  // Favorites
  await page.evaluate(() => localStorage.removeItem("haven.favorites.v1"));
  await page.reload({ waitUntil: "networkidle0" });
  await sleep(1200);
  await page.evaluate(() => {
    const button = document.querySelector('button[aria-label="Save this home"]');
    if (button) {
      button.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      button.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      button.click();
    }
  });
  await sleep(600);
  const favBadge = () =>
    page.evaluate(() => {
      const button = document.querySelector('a[aria-label^="Saved homes"]');
      return button ? button.textContent.trim() : null;
    });
  console.log("favorite badge:", await favBadge());

  await page.reload({ waitUntil: "networkidle0" });
  await sleep(1200);
  console.log("favorite persists:", (await favBadge()) === "1");

  // Modal + inquiry
  await page.evaluate(() => {
    document.querySelector("main article")?.scrollIntoView({ block: "center" });
  });
  await sleep(800);
  const cardBox = await page.evaluate(() => {
    const card = document.querySelector("main article");
    if (!card) return null;
    const rect = card.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  });
  if (cardBox) {
    await page.mouse.click(cardBox.x, cardBox.y);
  }
  await sleep(900);
  const modal = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return dialog
      ? { title: dialog.getAttribute("aria-label"), open: true }
      : { open: false };
  });
  console.log("modal:", JSON.stringify(modal));

  if (modal.open) {
    await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll("button")).find(
        (b) => b.textContent.trim() === "Request a viewing"
      );
      if (button) button.click();
    });
    await sleep(500);
    console.log(
      "empty inquiry blocked:",
      await page.evaluate(() => document.body.innerText.includes("Please tell us your name."))
    );

    const fill = async (name, value) => {
      const el = await page.$(`[name="${name}"]`);
      if (el) await el.type(value);
    };
    await fill("name", "Camille Reyes");
    await fill("email", "camille@example.com");
    await fill("phone", "+63 917 555 0142");
    await fill("message", "I would like to schedule a viewing this weekend.");
    await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll("button")).find(
        (b) => b.textContent.trim() === "Request a viewing"
      );
      if (button) button.click();
    });
    await sleep(1300);
    console.log(
      "inquiry success:",
      await page.evaluate(() => Boolean(document.querySelector('[role="status"]')))
    );
  }

  await page.keyboard.press("Escape");
  await sleep(1200);
  console.log("modal closes on Escape:", await page.evaluate(() => !document.querySelector('[role="dialog"]')));

  // Reduced motion: autoplay disabled
  const reducePage = await browser.newPage();
  await reducePage.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await reducePage.setViewport({ width: 1440, height: 900 });
  await reducePage.goto(BASE + "/", { waitUntil: "networkidle0" });
  await sleep(1300);
  const readCounter = () =>
    reducePage.evaluate(() => {
      const el = Array.from(document.querySelectorAll("span")).find((s) =>
        /^0\d \/ 0\d$/.test(s.textContent.trim())
      );
      return el ? el.textContent.trim() : null;
    });
  const r1 = await readCounter();
  await sleep(5600);
  const r2 = await readCounter();
  console.log("reduced-motion autoplay off:", r1 === r2, "|", r1, r2);

  // Screenshots
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await sleep(1200);
  await page.screenshot({ path: OUT + "/haven-mobile.jpg" });

  console.log("errors:", errors.length);
  errors.slice(0, 8).forEach((e) => console.log(" -", e));
  await browser.close();
})();



