# Artifact-versie bouwen (claude.ai-link)

Maakt van de multi-pagina Next.js-site (NL + EN) één zelfstandig HTML-bestand dat werkt als Claude Artifact:
één hash-weergave per pagina en taal, ingebedde afbeeldingen, Google Fonts en een kleine vanilla runtime
(menu met actieve pil, ⌘K-zoeken, NL/EN-wissel naar dezelfde pagina, tijdlijnfilters en -panelen, tabs,
inhoudsopgave, contactformulier dat het bericht kopieert).

Weergaven volgen de URL's: `/` → `#home`, `/over-mij/` → `#over-mij`, `/ervaring/bol/` → `#ervaring-bol`,
`/en/` → `#en`, `/en/about/` → `#en-about`, `/en/experience/bol/` → `#en-experience-bol`, enzovoort.

```bash
cd ayman-website && npm run build
(cd out && python3 -m http.server 4321 &)           # preview-server
python3 -c "import re,json;s=open('content/site.ts').read();a=s.index('export const experience');b=s.index('\n];',a);print(json.dumps([{'id':i,'track':t} for i,t in re.findall(r'id: \"([^\"]+)\",\n    track: \"([^\"]+)\"',s[a:b])]))" > scripts/artifact/exp.json
node scripts/artifact/capture.js scripts/artifact/capture.json "$(cat scripts/artifact/exp.json)"
python3 scripts/artifact/assemble.py "$PWD" ../artifact/ayman-el-hammoudi.html
```

Publiceer daarna `../artifact/ayman-el-hammoudi.html` naar dezelfde Artifact-URL:
https://claude.ai/artifact/FMbYhvbEH6g9ZCZDV7gGQQ
