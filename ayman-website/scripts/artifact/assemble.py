"""Zet de vastgelegde weergaven (NL + EN) om naar één zelfstandig Artifact-bestand."""
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
    m = re.fullmatch(r'/en/experience/([a-z0-9-]+)/?', h)
    if m: return f'#en-ervaring-{m.group(1)}'
    m = re.fullmatch(r'/ervaring/([a-z0-9-]+)/?', h)
    if m: return f'#ervaring-{m.group(1)}'
    if h in ('/en/experience/', '/en/experience'): return '#en-alle-ervaring'
    if h in ('/ervaring/', '/ervaring'): return '#alle-ervaring'
    if h in ('/en/cv/', '/en/cv'): return '#en-online-cv'
    if h in ('/cv/', '/cv'): return '#online-cv'
    if h.startswith('/cv/') and h.endswith('.pdf'): return '#en-online-cv' if '_EN' in h else '#online-cv'
    if h in ('/en/', '/en'): return '#en'
    if h.startswith('/en/#'): return '#en-' + h[5:]
    if h == '/': return '#top'
    if h.startswith('/#'): return h[1:]
    return h

ID_ATTRS = ['aria-labelledby', 'aria-controls', 'aria-describedby', 'for']
VIEW_TEXT = {'Download mijn cv': 'Bekijk mijn cv', 'Download cv (PDF)': 'Bekijk mijn cv',
             'Download my CV': 'View my CV', 'Download CV (PDF)': 'View my CV'}

def process(html, prefix=None, same_page_prefix=None):
    """prefix: id-voorvoegsel voor deze weergave. same_page_prefix: voorvoegsel voor #-links naar de eigen pagina."""
    soup = BeautifulSoup(html, 'html.parser')
    own_ids = {el['id'] for el in soup.find_all(id=True)}
    for img in soup.find_all('img'):
        src = img.get('src', '')
        if src.startswith('/images/'):
            img['src'] = data_uri(src)
        for a in ('srcset', 'data-nimg'):
            if a in img.attrs: del img[a]
    for a in soup.find_all('a'):
        h = a.get('href')
        was_pdf = bool(h and h.endswith('.pdf'))
        if was_pdf and re.search(r'ATS|English CV|Nederlands cv', a.get_text()):
            (a.find_parent('span', class_='inline-block') or a).decompose()
            continue
        nh = rewrite_href(h)
        if h and h.startswith('#') and len(h) > 1:
            target = h[1:]
            if prefix and target in own_ids: nh = f'#{prefix}-{target}'
            elif same_page_prefix and target != 'main': nh = f'#{same_page_prefix}-{target}'
        if nh != h:
            a['href'] = nh
            for x in ('target', 'rel', 'download', 'hreflang'):
                if x in a.attrs: del a[x]
        if 'download' in a.attrs: del a['download']
        for s in a.find_all(string=True):
            t = s
            for k, v in VIEW_TEXT.items(): t = t.replace(k, v)
            if t != s: s.replace_with(t)
    if prefix:
        for el in soup.find_all(id=True):
            el['id'] = f"{prefix}-{el['id']}"
        for attr in ID_ATTRS:
            for el in soup.find_all(attrs={attr: True}):
                el[attr] = ' '.join(f'{prefix}-{v}' for v in el[attr].split())
    return soup

def tidy_home(soup, lang, pre):
    for d in soup.select(f'#{pre}top > div[style]'):
        if 'radial-gradient' in d.get('style', ''):
            d['style'] = 'background: radial-gradient(640px circle at var(--hx, -999px) var(--hy, -999px), var(--glow), transparent 65%)'
    for b in soup.find_all('button'):
        if re.search(r'Deel dit profiel|Share this profile', b.get_text()): b['data-share'] = ''
    for b in soup.select('form button[type=submit]'):
        for s in b.find_all(string=True):
            if re.search(r'Verstuur|Send', s): s.replace_with('Bericht klaarzetten' if lang == 'nl' else 'Prepare message')
    for p in soup.find_all('p'):
        t = p.get_text()
        if 'Geen tracking' in t:
            p.string = 'Geen tracking, geen cookies. Je bericht wordt gekopieerd, zodat je het zelf naar mij kunt mailen.'
        elif 'No tracking' in t:
            p.string = 'No tracking, no cookies. Your message is copied so you can email it to me yourself.'
    return soup

FILTER = {'Alles': 'alles', 'All': 'alles', 'Sales & retail': 'sales', 'Ondernemerschap': 'ondernemer', 'Entrepreneurship': 'ondernemer'}

def tidy_overview(soup, pre):
    for btn in soup.select('button[aria-controls]'):
        eid = btn['aria-controls'].replace(f'{pre}-exp-', '')
        btn['data-exp'] = eid
        btn.find_parent('li')['data-track'] = TRACK.get(eid, '')
    for b in soup.select('[role=group] button'):
        if b.get_text(strip=True) in FILTER:
            b['data-filter'] = FILTER[b.get_text(strip=True)]
            pill = b.find('span')
            if pill and 'bg-gold' in pill.get('class', []):
                pill['class'] = pill.get('class', []) + ['filter-pill']
    return soup

def tidy_cv(soup):
    for b in soup.find_all('button'):
        if 'Print' in b.get_text(): b.decompose()
    for a in soup.find_all('a'):
        if re.search(r'Download|PDF', a.get_text()) and a.get('href', '').startswith('#') and 'online-cv' in a.get('href', ''):
            a.decompose()
    return soup

def tidy_header(soup, lang):
    h = soup.find('header')
    h['data-lang'] = lang
    if lang == 'en': h['hidden'] = ''
    for a in h.select('nav a'):
        for sp in a.find_all('span'):
            if 'bg-gold' in sp.get('class', []): sp.decompose()
        cls = [c for c in a.get('class', []) if c not in ('text-on-gold', 'text-muted', 'hover:text-ink')]
        a['class'] = cls + ['text-muted', 'hover:text-ink']
        if 'aria-current' in a.attrs: del a['aria-current']
    for b in h.find_all('button'):
        if re.match(r'(Schakel naar|Switch to)', b.get('aria-label', '')):
            b['data-theme-toggle'] = ''
            for svg in b.find_all('svg'):
                svg['class'] = [c for c in svg.get('class', []) if not c.startswith(('rotate', '-rotate', 'opacity'))]
        if b.get('aria-controls') == 'mobile-menu': b['data-menu-btn'] = ''
    for g in h.select('[role=group]'):
        g['data-lang-switch'] = ''
    return soup

def tidy_footer(soup, lang):
    f = soup.find('footer')
    f['data-lang'] = lang
    if lang == 'en': f['hidden'] = ''
    for sp in f.find_all('span', class_='text-ink'):
        inner = sp.find('span')
        if inner and re.fullmatch(r'\d\d:\d\d|--:--', inner.get_text(strip=True)): inner['data-clock'] = ''
    return soup

views = []
for lang in ('nl', 'en'):
    pre = 'en' if lang == 'en' else ''
    vp = (lambda n: f'en-{n}') if lang == 'en' else (lambda n: n)
    home_name = 'en' if lang == 'en' else 'home'
    home = tidy_home(process(cap['views'][home_name], prefix=pre or None), lang, f'{pre}-' if pre else '')
    views.append((home_name, lang, home))
    ovn = vp('alle-ervaring')
    views.append((ovn, lang, tidy_overview(process(cap['views'][ovn], prefix=ovn), ovn)))
    for e in exp:
        n = vp('ervaring-' + e['id'])
        views.append((n, lang, process(cap['views'][n], prefix=n)))
    n = vp('online-cv')
    views.append((n, lang, tidy_cv(process(cap['views'][n], prefix=n))))

headers = ''.join(str(tidy_header(process(cap['chrome'][l]['header'], same_page_prefix='en' if l == 'en' else None), l)) for l in ('nl', 'en'))
footers = ''.join(str(tidy_footer(process(cap['chrome'][l]['footer'], same_page_prefix='en' if l == 'en' else None), l)) for l in ('nl', 'en'))
progress = BeautifulSoup(cap['progress'], 'html.parser')
if progress.find('div'): progress.find('div')['data-progress'] = ''

states = {l: {k: [str(process(h, prefix='en' if l == 'en' else None)) for h in v] for k, v in cap['states'][l].items()} for l in ('nl', 'en')}
panels = {l: {k: str(process(v, prefix='en-alle-ervaring' if l == 'en' else 'alle-ervaring')) for k, v in cap['panels'][l].items()} for l in ('nl', 'en')}

css = ''.join(open(f).read() for f in sorted(glob.glob(os.path.join(SITE, 'out/_next/static/chunks/*.css'))))
css = re.sub(r'@font-face\{[^}]*url\([^)]*(_next|\.\./media)[^)]*\)[^}]*\}', '', css)
extra = open(os.path.join(HERE, 'extra.css')).read()
js = open(os.path.join(HERE, 'runtime.js')).read()

views_html = ''.join(
    f'<div data-view="{n}" data-lang="{l}"{"" if n == "home" else " hidden"}>{s}</div>' for n, l, s in views
)
page = f'''<title>Ayman El Hammoudi</title>
<meta name="description" content="Persoonlijke website van Ayman El Hammoudi: verkoopadviseur en e-commerceondernemer uit Noord-Holland. Nederlands en Engels.">
<script>(function(){{try{{var r=document.documentElement;if(!r.dataset.theme){{var t=null;try{{t=localStorage.getItem('theme')}}catch(e){{}}r.dataset.theme=t||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}}}}catch(e){{}}}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1&family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap">
<style>{css}</style>
<style>{extra}</style>
<div class="grain">
<a href="#main" class="sr-only-focusable fixed top-3 left-3 z-[80] rounded-full bg-gold px-5 py-3 text-on-gold">Direct naar inhoud</a>
{progress}
{headers}
<main id="main" tabindex="-1" class="outline-none">{views_html}</main>
{footers}
</div>
<script>window.__STATES__={json.dumps(states)};window.__PANELS__={json.dumps(panels)};</script>
<script>{js}</script>
'''
open(OUTFILE, 'w').write(page)
print('geschreven', OUTFILE, round(len(page.encode()) / 1024), 'KB,', len(views), 'weergaven')
