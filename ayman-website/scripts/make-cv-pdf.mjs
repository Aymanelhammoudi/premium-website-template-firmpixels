/**
 * Maakt public/cv.pdf en public/images/cv-preview.jpg uit de online cv-pagina.
 *
 * Gebruik (na `npm run build`):
 *   npx serve out -l 4321            (in een tweede terminal)
 *   npx -y playwright@1 install chromium   (eenmalig)
 *   npm run cv:pdf
 *   npm run build                    (zodat de nieuwe pdf in out/ komt)
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:4321/cv/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1.15 });
await page.goto(url, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print", colorScheme: "light" });
await page.evaluate(() => document.fonts.ready);

await page.pdf({ path: "public/cv.pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
await page.screenshot({ path: "public/images/cv-preview.jpg", type: "jpeg", quality: 82, clip: { x: 0, y: 0, width: 794, height: 1123 } });

await browser.close();
console.log("✓ public/cv.pdf en public/images/cv-preview.jpg bijgewerkt");
