/**
 * Maakt de ATS-versies van het cv (doorzoekbare tekst) uit de online cv-pagina's:
 *   public/cv/CV_Ayman_El_Hammoudi_ATS.pdf     ← /cv/
 *   public/cv/CV_Ayman_El_Hammoudi_EN_ATS.pdf  ← /en/cv/
 * Het vormgegeven cv (exact van aymanzakelijk.nl) staat ernaast en wordt niet aangepast.
 *
 * Gebruik (na `npm run build`):
 *   npx serve out -l 4321                  (tweede terminal)
 *   npx -y playwright@1 install chromium   (eenmalig)
 *   npm run cv:pdf && npm run build
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:4321";
const jobs = [
  { url: `${base}/cv/`, out: "public/cv/CV_Ayman_El_Hammoudi_ATS.pdf" },
  { url: `${base}/en/cv/`, out: "public/cv/CV_Ayman_El_Hammoudi_EN_ATS.pdf" },
];
const browser = await chromium.launch();
for (const job of jobs) {
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.goto(job.url, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: job.out, format: "A4", printBackground: true, preferCSSPageSize: true });
  await page.close();
  console.log("✓", job.out);
}
await browser.close();
