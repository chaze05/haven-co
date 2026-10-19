const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") console.log("[err]", m.text().slice(0, 160));
  });
  page.on("pageerror", (e) => console.log("[pageerror]", e.message.slice(0, 200)));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));

  await page.evaluate(() => {
    document.querySelector("#neighbourhoods").scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 2600));

  const info = await page.evaluate(() => {
    const grid = document.querySelector("#neighbourhoods .grid");
    const kids = grid ? Array.from(grid.children) : [];
    return {
      childCount: kids.length,
      kids: kids.map((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          opacity: cs.opacity,
          transform: cs.transform,
          top: Math.round(r.top),
          height: Math.round(r.height),
          width: Math.round(r.width),
          html: el.className.slice(0, 60),
        };
      }),
      contactForm: (() => {
        const form = document.querySelector("#contact form");
        if (!form) return "no form";
        let el = form;
        const chain = [];
        for (let i = 0; i < 4 && el; i++) {
          const cs = getComputedStyle(el);
          chain.push({ tag: el.tagName, cls: String(el.className).slice(0, 40), opacity: cs.opacity });
          el = el.parentElement;
        }
        return chain;
      })(),
    };
  });
  console.log(JSON.stringify(info, null, 1));
  await browser.close();
})();
