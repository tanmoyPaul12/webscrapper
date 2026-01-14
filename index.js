import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
app.use(cors());

app.get("/results", async (req, res) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://tanmoypaul-portfolio.vercel.app");

  const data = await page.evaluate(() => {
    return {
      name: document.querySelector("h1")?.innerText,
      role: document.querySelector("h3")?.innerText,
      email: document.querySelector("a[href^='mailto']")?.innerText,
      description: document.querySelector("p")?.innerText
    };
  });

  await browser.close();
  res.json(data);
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});


// try {
//   const response = await fetch(url);
//   const html = await response.text();
//   console.log(html);
// } catch (err) {
//   console.log(err);
// }

// app.listen(PORT, () => {
//   console.log("Server running at http://localhost:8000");
//  });