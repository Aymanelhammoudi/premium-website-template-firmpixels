"""Zet de vastgelegde pagina's (NL + EN) om naar één zelfstandig Artifact-bestand met hash-weergaven."""
import base64, glob, json, os, re, sys
from bs4 import BeautifulSoup

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = sys.argv[1]            # .../ayman-website
OUTFILE = sys.argv[2]
cap = json.load(open(os.path.join(HERE, 'capture.json')))
VIEWS = cap['views']

MIME = {'.webp': 'image/webp', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png'}
_cache = {}
def data_uri(path):
    if path not in _cache:
        fp = os.path.join(SITE, 'public', path.lstrip('/'))
        raw = open(fp, 'rb').read()
        _cache[path] = f"data:{MIME[os.path.splitext(fp)[1]]};base64,{base64.b64encode(raw).decode()}"
    return _cache[path]

def view_of(path):
    """'/' → home, '/en/' → en, '/ervaring/bol/' → ervaring-bol."""
    return path.strip('/').replace('/', '-') or 'home'

def rewrite_href(h):
    """Interne paden → '#weergave' (of '#weergave-anker'). Externe links blijven staan."""
    if not h or not h.startswith('/'):
        return h
    path, _, frag = h.partition('#')
    if not path.endswith('/'):
        path += '/'
    v = view_of(path)
    if v in VIEWS:
        return f'#{v}-{frag}' if frag else f'#{v}'
    return h

ID_ATTRS = ['aria-labelledby', 'aria-controls', 'aria-describedby', 'for']
VIEW_TEXT = {'Download mijn cv': 'Bekijk mijn cv', 'Download my CV': 'View my CV'}
CV_VIEW = {'nl': 'cv', 'en': 'en-cv'}

def process(html, lang, prefix=None):
    """prefix: id-voorvoegsel voor deze weergave (ids zijn dan uniek over alle weergaven)."""
    soup = BeautifulSoup(html, 'html.parser')
    own_ids = {el['id'] for el in soup.find_all(id=True)}
    for img in soup.find_all('img'):
        src = img.get('src', '')
        if src.startswith('/images/'):
            img['src'] = data_uri(src)
        for a in ('srcset', 'data-nimg', 'fetchpriority'):
            if a in img.attrs: del img[a]
    for a in soup.find_all('a'):
        h = a.get('href')
        if h and h.endswith('.pdf'):
            text = a.get_text(' ', strip=True)
            # Geen pdf-bestanden in de Artifact: de cv-knoppen openen de online cv-weergave.
            if any(k in text for k in VIEW_TEXT):
                a['href'] = '#' + CV_VIEW[lang]
                for x in ('download', 'target', 'rel'):
                    if x in a.attrs: del a[x]
                for svg in a.find_all('svg'): svg.decompose()
                for s in a.find_all(string=True):
                    t = s
                    for k, v in VIEW_TEXT.items(): t = t.replace(k, v)
                    if t != s: s.replace_with(t)
            else:
                a['data-pdf'] = ''
            continue
        nh = rewrite_href(h)
        if h and h.startswith('#') and len(h) > 1 and prefix and h[1:] in own_ids:
            nh = f'#{prefix}-{h[1:]}'
        if nh != h:
            a['href'] = nh
            for x in ('target', 'rel', 'download', 'hreflang'):
                if x in a.attrs and x != 'hreflang': del a[x]
    if prefix:
        for el in soup.find_all(id=True):
            el['id'] = f"{prefix}-{el['id']}"
        for attr in ID_ATTRS:
            for el in soup.find_all(attrs={attr: True}):
                el[attr] = ' '.join(f'{prefix}-{v}' for v in el[attr].split())
    return soup

def tidy_pdf(soup):
    """Pdf-links die geen cv-weergave werden (ATS, andere taal, preview) opruimen."""
    for a in soup.select('a[data-pdf]'):
        if a.find('img'):                      # preview van het vormgegeven cv: geen link, wel beeld
            a.name = 'div'
            for x in ('href', 'target', 'rel', 'aria-label', 'data-pdf', 'download'):
                if x in a.attrs: del a[x]
            last = a.find_all('span', recursive=False)
            if last: last[-1].decompose()
        else:
            a.decompose()
    return soup

def tidy_cv(soup):
    # Geen pdf in de Artifact: de intro alleen over de online versie laten gaan.
    for p in soup.find_all('p'):
        t = p.get_text()
        if t.startswith('Bekijk mijn cv direct'): p.string = 'Bekijk mijn cv direct op deze pagina.'
        elif t.startswith('Read my CV'): p.string = 'Read my CV right here on this page.'
    for b in soup.find_all('button'):
        if b.find('svg') and re.search(r'Print', b.get_text()): b.decompose()
    # in de cv-weergave zelf zijn "Bekijk mijn cv"-knoppen overbodig
    for a in soup.find_all('a'):
        if a.get('href') in ('#cv', '#en-cv') and re.search(r'Bekijk|View', a.get_text()): a.decompose()
    return soup

def tidy_roles(soup):
    """De wisselende functietitel kan midden in een overgang zijn vastgelegd: houd er één over."""
    seen = set()
    for em in soup.select('em[data-role]'):
        parent = id(em.parent)
        if parent in seen: em.decompose()
        else: seen.add(parent)
    return soup

def tidy_contact(soup, lang):
    for b in soup.select('form button[type=submit]'):
        for s in b.find_all(string=True):
            if s.strip(): s.replace_with('Bericht klaarzetten' if lang == 'nl' else 'Prepare message')
    for p in soup.find_all('p'):
        t = p.get_text()
        if 'Geen tracking' in t:
            p.string = 'Geen tracking, geen cookies. Je bericht wordt gekopieerd, zodat je het zelf naar mij kunt mailen.'
        elif 'No tracking' in t:
            p.string = 'No tracking, no cookies. Your message is copied so you can email it to me yourself.'
    return soup

def tidy_header(soup, lang):
    h = soup.find('header')
    h['data-lang'] = lang
    if lang == 'en': h['hidden'] = ''
    for a in h.select('nav a'):
        for sp in a.find_all('span'):
            if 'bg-ink' in sp.get('class', []): sp.decompose()
        if 'aria-current' in a.attrs: del a['aria-current']
    return soup

def tidy_footer(soup, lang):
    f = soup.find('footer')
    f['data-lang'] = lang
    if lang == 'en': f['hidden'] = ''
    for sp in f.find_all('span'):
        if re.fullmatch(r'\d\d:\d\d|--:--', sp.get_text(strip=True)) and not sp.find('span'): sp['data-clock'] = ''
    return soup

# ---------- Weergaven ----------
views_html = []
search = {'nl': [], 'en': []}
for name in cap['order']:
    v = VIEWS[name]
    lang = v['lang']
    soup = tidy_roles(tidy_contact(tidy_pdf(process(v['html'], lang, prefix=name)), lang))
    if name in CV_VIEW.values(): soup = tidy_cv(soup)
    if re.fullmatch(r'(en-experience|ervaring)-.+', name):
        h1 = soup.find('h1'); role = h1.find_next('p') if h1 else None
        search[lang].append({'label': h1.get_text(strip=True), 'sub': role.get_text(strip=True) if role else '', 'href': '#' + name, 'group': 'experience'})
    views_html.append(f'<div data-view="{name}" data-lang="{lang}"{"" if name == "home" else " hidden"}>{soup}</div>')

headers, footers, labels = '', '', {}
for l in ('nl', 'en'):
    hs = tidy_header(process(cap['chrome'][l]['header'], l), l)
    pages = [{'label': 'Home', 'sub': '', 'href': '#' + ('en' if l == 'en' else 'home'), 'group': 'pages'}]
    for a in hs.select('nav a'):
        pages.append({'label': a.get_text(strip=True), 'sub': '', 'href': a['href'], 'group': 'pages'})
    pages.append({'label': 'Contact', 'sub': 'aymanae075@gmail.com', 'href': '#' + ('en-contact' if l == 'en' else 'contact'), 'group': 'pages'})
    search[l] = pages + search[l]
    headers += str(hs)
    footers += str(tidy_footer(process(cap['chrome'][l]['footer'], l), l))

progress = BeautifulSoup(cap['progress'], 'html.parser')
if progress.find('div'): progress.find('div')['data-progress'] = ''

states = {v: {**s, 'html': [str(process(h, VIEWS[v]['lang'], prefix=v)) for h in s['html']]} for v, s in cap['states'].items()}
panels = {v: {k: str(process(h, VIEWS[v]['lang'], prefix=v)) for k, h in ps.items()} for v, ps in cap['panels'].items()}

css = ''.join(open(f).read() for f in sorted(glob.glob(os.path.join(SITE, 'out/_next/static/chunks/*.css'))))
css = re.sub(r'@font-face\{[^}]*url\([^)]*(_next|\.\./media)[^)]*\)[^}]*\}', '', css)
extra = open(os.path.join(HERE, 'extra.css')).read()
js = open(os.path.join(HERE, 'runtime.js')).read()

data = json.dumps({'states': states, 'panels': panels, 'pairs': cap['pairs'], 'search': search}).replace('</', '<\\/')
page = f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ayman El Hammoudi</title>
<meta name="description" content="Persoonlijke website van Ayman El Hammoudi: verkoopadviseur en e-commerceondernemer uit Noord-Holland. Nederlands en Engels.">
<script>(function(){{try{{var r=document.documentElement;if(!r.dataset.theme){{var t=null;try{{t=localStorage.getItem('theme')}}catch(e){{}}r.dataset.theme=t||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}}}}catch(e){{}}}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Geist:wght@100..900&family=Geist+Mono:wght@400..600&display=swap">
<style>{css}</style>
<style>{extra}</style>
<a href="#main" class="sr-only-focusable fixed top-3 left-3 z-[80] rounded-full bg-ink px-5 py-3 text-bg">Direct naar inhoud</a>
{progress}
{headers}
<main id="main" tabindex="-1" class="outline-none">{''.join(views_html)}</main>
{footers}
<script>window.__DATA__={data};</script>
<script>{js}</script>
'''
open(OUTFILE, 'w').write(page)
print('geschreven', OUTFILE, round(len(page.encode()) / 1024), 'KB,', len(views_html), 'weergaven')
