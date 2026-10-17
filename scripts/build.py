"""Dependency-free static build. BASE_PATH supports GitHub Pages project sites."""
from pathlib import Path
import os, json, html, re, shutil
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'dist'
BASE='/'+os.getenv('BASE_PATH','').strip('/')+'/' if os.getenv('BASE_PATH','').strip('/') else '/'
SITE='https://toreno79.vercel.app'
e=lambda value:html.escape(str(value),quote=True)
pages={'index':('Home','Fuad Hasan (Toreno79), Cyber Security Engineering student focused on web security, CTF challenges and practical security projects.'),'about':('About','Meet Fuad Hasan: Cyber Security Engineering student, Cyber Invasion Army member and web security learner.'),'education':('Education','Explore Fuad Hasan’s education in Cyber Security Engineering at the University of Frontier Technology, Bangladesh.'),'achievements':('Achievements','Explore Toreno79’s cybersecurity credentials, CTF results and seminars.'),'experience':('Experience','Fuad Hasan’s experience with Cyber Invasion Army and Python programming at CodSoft.'),'projects':('Projects','Explore LogRisk Analyzer and practical security projects built by Fuad Hasan.'),'blog':('Blog','Read Toreno79’s web security, CTF, PortSwigger and TryHackMe writeups.'),'contact':('Contact','Contact Fuad Hasan for cybersecurity collaborations, projects and professional opportunities.'),'404':('Page not found','The requested page could not be found. Return to Toreno79’s portfolio.')}
projects=json.loads((ROOT/'data/projects.json').read_text())
blogs=json.loads((ROOT/'data/blogs.json').read_text())
if OUT.exists():shutil.rmtree(OUT)
OUT.mkdir()
shutil.copytree(ROOT/'assets',OUT/'assets')
for name,data in [('project-data',projects),('blog-data',blogs)]:
 (OUT/'assets/js'/f'{name}.js').write_text('const '+('projects' if name=='project-data' else 'blogs')+' = '+json.dumps(data,ensure_ascii=False)+';\n')
for asset in ['style.css','favicon.svg','google7810fc9a19af5a34.html']:
 shutil.copy2(ROOT/asset,OUT/asset)
# Share image is a simple text-based card, generated separately and versioned as PNG.
def cards(category):
 selected=[p for p in projects if category=='all' or p['category']==category]
 return ''.join(f'<article class="card"><h3>{e(p["title"])}</h3><p>{e(p["goal"])}</p><div class="card-tech">'+''.join(f'<span>{e(t)}</span>' for t in p['tech'])+f'</div><a href="{e(p["link"])}" target="_blank" rel="noopener noreferrer">View on GitHub →</a> <button class="btn-link-style js-only" data-project="{e(p["id"])}">Details →</button></article>' for p in selected) or '<p>No projects in this category yet.</p>'
for slug,(title,desc) in pages.items():
 s=(ROOT/'src/pages'/f'{slug}.html').read_text()
 nav=(ROOT/'src/partials/nav.html').read_text().replace('{{LINKS}}','\n'.join(f'<a href="{key}.html"'+(' class="active" aria-current="page"' if key==slug else '')+f'>{value[0]}</a>' for key,value in pages.items() if key!='404'))
 s=s.replace('{{NAV}}',nav).replace('{{FOOTER}}',(ROOT/'src/partials/footer.html').read_text())
 canonical=SITE+('/' if slug=='index' else '/'+slug+'.html')
 fulltitle='Fuad Hasan (Toreno79) | '+title
 meta=f'<title>{e(fulltitle)}</title>\n<meta name="description" content="{e(desc)}">\n<link rel="canonical" href="{canonical}">\n<meta property="og:type" content="website">\n<meta property="og:title" content="{e(fulltitle)}">\n<meta property="og:description" content="{e(desc)}">\n<meta property="og:url" content="{canonical}">\n<meta property="og:image" content="{SITE}/assets/og-card.png">\n<meta property="og:image:alt" content="Fuad Hasan — Toreno79, Web Security and CTF">\n<meta name="twitter:card" content="summary_large_image">'
 if slug=='404':meta+='\n<meta name="robots" content="noindex">'
 s=s.replace('{{META}}',meta)
 for cat in ['all','defensive','offensive']:s=s.replace('{{PROJECTS_'+cat.upper()+'}}',cards(cat))
 s=s.replace('{{BLOGS}}',''.join(f'<article class="blog-row"><div class="blog-info"><h2 class="blog-title">{e(b["title"])}</h2><time datetime="{e(b["date"])}">{e(b["date"])}</time></div><a href="{e(b["link"])}" target="_blank" rel="noopener noreferrer">Read article →</a></article>' for b in sorted(blogs,key=lambda b:(b['date'],b['id']),reverse=True)))
 # Resolve local assets and navigation against deployment base, including nested 404 URLs.
 s=re.sub(r'\b(href|src)="(?!https?:|mailto:|#|/)([^"]+)"',lambda m:f'{m[1]}="{BASE}{m[2]}"',s)
 assert '{{' not in s, slug
 (OUT/f'{slug}.html').write_text(s)
(OUT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>'+SITE+('/' if slug=='index' else '/'+slug+'.html')+'</loc></url>' for slug in pages if slug!='404')+'</urlset>\n')
(OUT/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+SITE+'/sitemap.xml\n')
(OUT/'.nojekyll').touch()
print('Built',len(pages),'pages with base',BASE)
