"""Public PPS research snapshot. Bounded, sequential, robots-aware; no staff records."""
from urllib.request import Request,urlopen
from urllib.parse import urljoin,urlsplit,urlunsplit
from urllib.robotparser import RobotFileParser
from html.parser import HTMLParser
from pathlib import Path
import json,time,re
BASE='https://www.pps.go.kr'; OUT=Path(__file__).parent/'research'; OUT.mkdir(exist_ok=True)
class Page(HTMLParser):
 def __init__(self):super().__init__();self.parts=[];self.links=[];self.ignore=0;self.href=None;self.label=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if t in ('script','style'):self.ignore+=1
  if t=='a':self.href=a.get('href');self.label=[]
 def handle_endtag(self,t):
  if t in ('script','style'):self.ignore=max(0,self.ignore-1)
  if t=='a' and self.href:self.links.append((self.href,''.join(self.label).strip()));self.href=None
 def handle_data(self,s):
  if not self.ignore and s.strip():self.parts.append(s.strip())
  if self.href:self.label.append(s)
def fetch(url):
 req=Request(url,headers={'User-Agent':'PPS-Game-Research/1.0 (public educational content)'})
 with urlopen(req,timeout=18) as r:return r.read().decode('utf-8',errors='replace'),r.geturl()
def clean(url):return re.sub(r';jsessionid=[^?/#]+','',url,flags=re.I).split('#')[0]
robots=RobotFileParser(BASE+'/robots.txt')
try:
 raw,_=fetch(BASE+'/robots.txt');robots.parse(raw.splitlines())
except Exception:robots.parse([])
root,_=fetch(BASE+'/kor/index.do');p=Page();p.feed(root)
labels=('물품구매 개요','총액계약','다수공급자계약','우수제품','개요 및 종류','일반용역 계약절차','기술용역 계약절차','외자구매개요','시설공사개요','시설공사종류','설계적정성 검토','비축업무안내','국유재산개요','국유재산 관리절차','혁신제품 지정','벤처나라','사회적책임조달','공정한 거래환경','해외조달시장진출','업무계획','주요정책 국정성과','업체등록','보증납부','공공조달 길잡이')
queue=[(BASE+'/kor/index.do','메인'),(BASE+'/center/content.do?key=00291','조달품질원 기능')]
for href,label in p.links:
 url=clean(urljoin(BASE+'/kor/index.do',href))
 if urlsplit(url).hostname=='www.pps.go.kr' and any(label==v or (v=='공공조달 길잡이' and v in label) for v in labels):queue.append((url,label))
seen=set();records=[]
for url,label in queue:
 if url in seen or len(records)>=36:continue
 seen.add(url)
 if not robots.can_fetch('PPS-Game-Research',url):records.append({'url':url,'label':label,'status':'robots-excluded'});continue
 try:
  html,final=fetch(url);q=Page();q.feed(html)
  text='\n'.join(q.parts)
  records.append({'url':url,'final_url':clean(final),'label':label,'status':'ok','text':text,'links':[{'url':clean(urljoin(final,h)),'label':l} for h,l in q.links if l]})
  print('OK',label,len(text),flush=True)
 except Exception as ex:records.append({'url':url,'label':label,'status':'failed','error':str(ex)});print('FAILED',label,flush=True)
 time.sleep(.35)
(OUT/'pps-public-pages.json').write_text(json.dumps({'checked':'2026-11-11','scope':'Main linked public policy and work guides; not whole-site archive. Staff directories, sign-in, downloads and external platforms excluded.','pages':records},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pages':len(records),'ok':sum(r['status']=='ok' for r in records),'output':str(OUT/'pps-public-pages.json')},ensure_ascii=False))
