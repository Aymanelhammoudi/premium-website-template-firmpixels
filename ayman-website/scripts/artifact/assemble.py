"""Zet de vastgelegde weergaven om naar één zelfstandig Artifact-bestand."""
import base64, glob, json, os, re, sys
from bs4 import BeautifulSoup

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = sys.argv[1]            # .../ayman-website
OUTFILE = sys.argv[2]
cap = json.load(open(os.path.join(HERE, 'capture.json')))
exp = json.load(open(os.path.join(HERE, 'exp.json')))
TRACK = {e['id']: e['track'] for e in exp}

MIME = {'.webp': 'image/webp', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png'}
_cache = {}
def data_uri(path):
    if path not in _cache:
        fp = os.path.join(SITE, 'public', path.lstrip('/'))
        raw = open(fp, 'rb').read()
        _cache[path] = f"data:{MIME[os.path.splitext(fp)[1]]};base64,{base64.b64encode(raw).decode()}"
    return _cache[path]

def rewrite_href(h):
    if h is None: return h
    m = re.fullmatch(r'/ervaring/([a-z0-9-]+)/?', h)
    if m: return f'#ervaring-{m.group(1)}'
    if h in ('/ervaring/', '/ervaring'): return '#alle-ervaring'
    if h in ('/cv/', '/cv', '/cv.pdf'): return '#online-cv'
    if h == '/': return '#top'
    if h.startswith('/#'): return h[1:]
    return h

ID_ATTRS = ['aria-labelledby', 'aria-controls', 'aria-describedby', 'for']

def process(html, prefix=None):
    soup = BeautifulSoup(html, 'html.parser')
    # afbeeldingen inbedden
    for img in soup.find_all('img'):
        src = img.get('src', '')
        if src.startswith('/images/'):
            img['src'] = data_uri(src)
        for a in ('srcset', 'sizes', 'data-nimg'):
            if a in img.attrs and a != 'sizes': del img[a]
    # links
    for a in soup.find_all('a'):
        h = a.get('href')
        nh = rewrite_href(h)
        if nh != h:
            a['href'] = nh
            for x in ('target', 'rel'):
                if x in a.attrs: del a[x]
        if 'download' in a.attrs:
            del a['download']
            for x in ('target', 'rel'):
                if x in a.attrs: del a[x]
        # teksten van knoppen die naar de pdf wezen
        for s in a.find_all(string=True):
            t = s.replace('Download mijn cv', 'Bekijk mijn cv').replace('Download cv (PDF)', 'Bekijk mijn cv')
            if t != s: s.replace_with(t)
    # id's per weergave uniek maken
    if prefix:
        for el in soup.find_all(id=True):
            el['id'] = f"{prefix}-{el['id']}"
        for attr in ID_ATTRS:
            for el in soup.find_all(attrs={attr: True}):
                el[attr] = ' '.join(f'{prefix}-{v}' for v in el[attr].split())
    return soup

# ---------- Home ----------
home = process(cap['views']['home'])
# lichtvlek in de hero: volgt nu CSS-variabelen
for d in home.select('#top > div[style]'):
    if 'radial-gradient' in d.get('style', ''):
        d['style'] = 'background: radial-gradient(640px circle at var(--hx, -999px) var(--hy, -999px), var(--glow), transparent 65%)'
# cv-blok: dubbele knop "Open in nieuw tabblad" weg, delen markeren
for a in home.find_all('a'):
    if 'Open in nieuw tabblad' in a.get_text():
        wrapper = a.find_parent('span') or a
        wrapper.decompose()
for b in home.find_all('button'):
    if 'Deel dit profiel' in b.get_text():
        b['data-share'] = ''
# contactformulier: eerlijke knoptekst
for b in home.select('#contact form button[type=submit]'):
    for s in b.find_all(string=True):
        if 'Verstuur' in s: s.replace_with('Bericht klaarzetten')
for p in home.select('#contact p'):
    if 'Geen tracking' in p.get_text():
        p.string = 'Geen tracking, geen cookies. Je bericht wordt gekopieerd, zodat je het zelf naar mij kunt mailen.'

# ---------- Overzicht ----------
ov = process(cap['views']['alle-ervaring'], 'alle-ervaring')
for btn in ov.select('button[aria-controls]'):
    eid = btn['aria-controls'].replace('alle-ervaring-exp-', '')
    btn['data-exp'] = eid
    li = btn.find_parent('li')
    li['data-track'] = TRACK.get(eid, '')
FILTER = {'Alles': 'alles', 'Sales & retail': 'sales', 'Ondernemerschap': 'ondernemer'}
for b in ov.select('[role=group][aria-label="Filter werkervaring"] button'):
    b['data-filter'] = FILTER.get(b.get_text(strip=True), 'alles')
    pill = b.find('span')
    if pill and 'bg-gold' in pill.get('class', []):
        pill['class'] = pill.get('class', []) + ['filter-pill']
panels = {k: str(process(v, 'alle-ervaring')) for k, v in cap['panels'].items()}

# ---------- Overige weergaven ----------
others = {}
for name, html in cap['views'].items():
    if name in ('home', 'alle-ervaring'): continue
    soup = process(html, name)
    if name == 'online-cv':
        for b in soup.find_all('button'):
            if 'Print' in b.get_text(): b.decompose()
        for a in soup.find_all('a'):
            if 'als PDF' in a.get_text(): a.decompose()
    others[name] = soup

header = process(cap['header'])
# vastgelegde actieve menutoestand wissen; de runtime zet die zelf
for a in header.select('nav[aria-label="Hoofdnavigatie"] a'):
    for sp in a.find_all('span'):
        if 'bg-gold' in sp.get('class', []): sp.decompose()
    cls = [c for c in a.get('class', []) if c not in ('text-on-gold', 'text-muted', 'hover:text-ink')]
    a['class'] = cls + ['text-muted', 'hover:text-ink']
    if 'aria-current' in a.attrs: del a['aria-current']
# themaknop: iconen alleen via runtime aansturen
for b in header.find_all('button'):
    if b.get('aria-label', '').startswith('Schakel naar'):
        for svg in b.find_all('svg'):
            svg['class'] = [c for c in svg.get('class', []) if not c.startswith(('rotate', '-rotate', 'opacity'))]
footer = process(cap['footer'])
for sp in footer.find_all('span', class_='text-ink'):
    inner = sp.find('span')
    if inner and re.fullmatch(r'\d\d:\d\d|--:--', inner.get_text(strip=True)):
        inner['data-clock'] = ''
progress = BeautifulSoup(cap['progress'], 'html.parser')
pdiv = progress.find('div')
if pdiv:
    pdiv['data-progress'] = ''

states = {k: [str(process(h)) for h in v] for k, v in cap['states'].items()}

# ---------- CSS ----------
css = ''.join(open(f).read() for f in sorted(glob.glob(os.path.join(SITE, 'out/_next/static/chunks/*.css'))))
# next/font @font-face met eigen bestanden eruit (Google Fonts levert ze)
css = re.sub(r'@font-face\{[^}]*url\([^)]*_next[^)]*\)[^}]*\}', '', css)
css = re.sub(r'@font-face\{[^}]*url\(\.\./media[^)]*\)[^}]*\}', '', css)
extra = open(os.path.join(HERE, 'extra.css')).read()

views_html = [f'<div data-view="home">{home}</div>', f'<div data-view="alle-ervaring" hidden>{ov}</div>']
for name, soup in others.items():
    views_html.append(f'<div data-view="{name}" hidden>{soup}</div>')

js = open(os.path.join(HERE, 'runtime.js')).read()
page = f'''<title>Ayman El Hammoudi</title>
<meta name="description" content="Persoonlijke website van Ayman El Hammoudi: verkoopadviseur en e-commerceondernemer uit Noord-Holland.">
<script>(function(){{try{{var r=document.documentElement;if(!r.dataset.theme){{var t=null;try{{t=localStorage.getItem('theme')}}catch(e){{}}r.dataset.theme=t||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}}}}catch(e){{}}}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1&family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap">
<style>{css}</style>
<style>{extra}</style>
<div class="grain">
<a href="#main" class="sr-only-focusable fixed top-3 left-3 z-[80] rounded-full bg-gold px-5 py-3 text-on-gold">Direct naar inhoud</a>
{progress}
{header}
<main id="main" tabindex="-1" class="outline-none">
{''.join(views_html)}
</main>
{footer}
</div>
<script>window.__STATES__={json.dumps(states)};window.__PANELS__={json.dumps(panels)};window.__TRACKS__={json.dumps(TRACK)};</script>
<script>{js}</script>
'''
open(OUTFILE, 'w').write(page)
print('geschreven', OUTFILE, round(len(page.encode()) / 1024), 'KB')
