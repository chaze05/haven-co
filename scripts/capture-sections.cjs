const puppeteer = require("puppeteer-core");
const fs = require("node:fs");
fs.mkdirSync("C:/rani/haven-co/qa", { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: "C:/rani/haven-co/qa/hero-desktop.jpg" });

  for (const [selector, name] of [
    ["#homes", "homes"],
    ["#neighbourhoods", "hoods"],
    ["#contact", "contact"],
  ]) {
    await page.evaluate((s) => {
      document.querySelector(s).scrollIntoView({ block: "start" });
    }, selector);
    await new Promise((r) => setTimeout(r, 1100));
    await page.screenshot({ path: `C:/rani/haven-co/qa/sec-${name}.jpg` });
  }

  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1400));
  await page.screenshot({ path: "C:/rani/haven-co/qa/hero-mobile.jpg" });

  console.log("captured");
  await browser.close();
})();
