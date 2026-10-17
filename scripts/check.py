"""Validate generated HTML structure, metadata, links, assets and script hygiene."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import os
ROOT=Path(__file__).resolve().parents[1]/'dist'
BASE='/'+os.getenv('BASE_PATH','').strip('/')+'/' if os.getenv('BASE_PATH','').strip('/') else '/'
VOID=set('area base br col embed hr img input link meta param source track wbr'.split())
class Check(HTMLParser):
 def __init__(self,path):
  super().__init__(convert_charrefs=True);self.path=path;self.stack=[];self.ids=set();self.links=[];self.h1=0;self.main=0;self.description=False;self.canonical=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  assert len(a)==len(attrs),(self.path,'duplicate attribute',tag)
  if tag not in VOID:self.stack.append(tag)
  if 'id' in a:
   assert a['id'] not in self.ids,(self.path,'duplicate id',a['id'])
   self.ids.add(a['id'])
  assert not any(k.startswith('on') for k in a),(self.path,'inline event handler')
  if tag=='script':assert a.get('src'),(self.path,'inline JS')
  self.h1+=tag=='h1';self.main+=tag=='main'
  self.description|=tag=='meta' and a.get('name')=='description'
  self.canonical|=tag=='link' and a.get('rel')=='canonical'
  for k in ['href','src']:
   if k not in a:continue
   u=urlsplit(a[k])
   if not u.scheme and not u.netloc:
    if not u.path:continue
    assert u.path.startswith(BASE),(self.path,'wrong base',a[k])
    target=ROOT/u.path[len(BASE):]
    assert target.exists(),(self.path,'missing target',a[k])
    if u.fragment:self.links.append((target,u.fragment))
 def handle_endtag(self,tag):
  assert self.stack and self.stack.pop()==tag,(self.path,'unbalanced HTML',tag)
for path in ROOT.glob('*.html'):
 if path.name.startswith('google'):continue
 c=Check(path.name);c.feed(path.read_text());assert not c.stack,(path,c.stack)
 assert c.h1==1 and c.main==1 and c.description and c.canonical,path
print('HTML structure, unique IDs, SEO metadata, local links/assets and script hygiene: PASS')
