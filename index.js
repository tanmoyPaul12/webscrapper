import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
app.use(cors()); 
const PORT = 8000;
const URL = "https://tanmoypaul-portfolio.vercel.app";

app.get("/results", async (req, res) => {
  try {
    console.log("Launching browser...");

    const browser = await puppeteer.launch({
      headless: "new"
    });

    const page = await browser.newPage();

    console.log("Opening page...");
    await page.goto(URL, { waitUntil: "domcontentloaded" });

    console.log("Waiting for H1...");
    await page.waitForSelector("h1", { timeout: 15000 });

    console.log("Extracting data...");

    const data = await page.evaluate(() => {
      const name = document.querySelector("h1")?.innerText || "NOT FOUND";
      const role = document.querySelector("h3")?.innerText || "NOT FOUND";
      const email = document.querySelector("a[href^='mailto']")?.innerText || "NOT FOUND";
      const desc = document.querySelector("p")?.innerText || "NOT FOUND";

      return { name, role, email, description: desc };
    });

    console.log("SCRAPED:", data);

    await browser.close();

    res.json(data);

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:8000");
});
