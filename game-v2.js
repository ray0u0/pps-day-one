'use strict';
const $=id=>document.getElementById(id),SAVE_KEY='pps-city-story-v2';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),random=n=>Math.floor(Math.random()*n);
const DEPTS=[
{name:'전기전자구매과',org:'구매사업국',kind:'kit',icon:'▣',tag:'주요 업무: 물품 구매·설치 조건 확인',desc:'계약 물품이 현장에서 바로 쓸 수 있는지 전화와 방문으로 확인합니다.',line:'박스만 도착했다고 끝이 아니에요. 전원·배선이 안 되면 물건 안 온 것만 못해요. 설계랑 설치 조건부터 맞춰요.',source:0,perk:'현장 감각',help:'처음부터 에너지 +1'},
{name:'납품검사과',org:'조달품질원',kind:'inspect',icon:'⌕',tag:'주요 업무: 납품 검사·라벨 확인',desc:'계약과 라벨·현물이 맞는지 확인하고, 다르면 공급을 멈춥니다.',line:'다를 때만 멈춥니다. 근거 없이 전부 막지는 않아요.',source:1,perk:'관찰 노트',help:'현장 탐색 기회 +1'},
{name:'전략비축물자과',org:'공공물자국',kind:'route',icon:'◈',tag:'주요 업무: 비축물자·긴급 공급',desc:'창고 재고와 납기를 맞춰 학교·공장·문화관에 물량을 보냅니다.',line:'지금 필요한 만큼만 보내요. 다음 요청에 대비해 창고에도 물량을 남겨 둬야 하거든요.',source:2,perk:'여유 물량',help:'위기 대응 카드 보유'},
{name:'혁신공공구매과',org:'구매사업국',kind:'test',icon:'✦',tag:'주요 업무: 혁신제품·시범구매',desc:'신제품이 교실·복도 같은 실제 환경에서 되는지 시험합니다.',line:'현장 문제를 해결하는지부터 봅니다.',source:3,perk:'실험 정신',help:'혁신 단서 보유'},
{name:'설계예산검토과',org:'시설사업국',kind:'path',icon:'⌑',tag:'출입·동선은 현장에서 확인',desc:'문턱이 높으면 걸려 넘어질 수 있어요. 도면만 보지 않고 현장부터 봅니다.',line:'입구 사진 말고, 문턱 높이부터 재요.',source:4,perk:'동선 감각',help:'접근성 단서 보유'},
{name:'정보기술계약과',org:'기술서비스국',kind:'order',icon:'⌘',tag:'주요 업무: 정보화 용역·화면 점검',desc:'문화관 예약 화면에서 이용자가 어느 단계에서 헤매는지 확인하고, 버튼과 안내 문구를 고칩니다.',line:'버튼이 많으면 필요한 기능을 찾기 어려워요.',source:5,perk:'연결의 힘',help:'시작 동료 도움 +1'}
];
const SOURCES=[
{title:'조달청 물품구매 개요',url:'https://www.pps.go.kr/kor/content.do?key=00176',fact:'공공기관에 필요한 물품을 조달하는 여러 공급·계약 방식이 있습니다.'},
{title:'조달품질원 조직·기능',url:'https://www.pps.go.kr/center/content.do?key=00291',fact:'납품검사과는 조달물자의 품질·성능 검사 등에 관한 업무를 맡습니다.'},
{title:'비축업무 개요',url:'https://www.pps.go.kr/bichuk/content.do?key=00293',fact:'원자재를 비축·공급해 수급과 가격의 안정을 돕습니다.'},
{title:'혁신제품 지정 안내',url:'https://www.pps.go.kr/kor/content.do?key=00648',fact:'혁신제품을 공공현장에 연결하고 시범구매 등을 통해 활용을 지원합니다.'},
{title:'설계적정성 검토',url:'https://www.pps.go.kr/kor/content.do?key=01355',fact:'공공시설 설계의 현장 적용, 규모·예산의 적정성, 오류와 모순 등을 검토합니다.'},
{title:'용역 개요 및 종류',url:'https://www.pps.go.kr/kor/content.do?key=00719',fact:'조달청의 용역 업무에는 정보화, 유지관리, 운송, 설계 등 다양한 영역이 포함됩니다.'},
{title:'벤처나라 안내',url:'https://www.pps.go.kr/kor/content.do?key=00711',fact:'창업·벤처기업의 공공시장 판로 개척을 지원하는 전용 쇼핑몰입니다.'},
{title:'해외조달시장 진출 지원',url:'https://www.pps.go.kr/kor/content.do?key=00714',fact:'G-PASS 등 해외 공공시장 진출을 지원하는 제도를 운영합니다.'},
{title:'국유재산 개요',url:'https://www.pps.go.kr/kor/content.do?key=00017',fact:'조달청은 국유재산 현황 조사와 관리 실태 확인·점검 등의 역할을 합니다.'},
{title:'하도급지킴이',url:'https://www.pps.go.kr/kor/content.do?key=01178',fact:'공공사업의 대금 흐름을 전자적으로 관리하고 확인하는 시스템입니다.'},
{title:'공공조달 길잡이',url:'https://www.pps.go.kr/kor/bbs/list.do?key=01325',fact:'조달시장에 진입하려는 기업이 필요한 제도와 정보를 찾도록 돕습니다.'},
{title:'조달청 업무계획',url:'https://www.pps.go.kr/kor/content.do?key=00647',fact:'혁신조달, 공정한 경쟁, 안전·품질, 공급망 안정 등 여러 정책 분야를 확인할 수 있습니다. 연도별 자료가 함께 있으므로 적용 시점을 구분해야 합니다.'}
];
const DAYS=[1,3,6,9,13,16,19,23,27,30];
const CITY_SITES=['새봄학교','산업단지','모아문화관'];
const CITY_OK=5,CITY_MID=2;
const METER_ENERGY='오늘 남은 힘',METER_TRUST='동료 도움';
const DEPT_WORK_LABEL=['설치 체크','라벨 보류','물량 배분','시험 일정','면적 배치','문의 분류'];
const TITLES=['첫 전화','현장 탐색','미니게임','점심','부서 업무','돌발 기상','전화 3건','마지막 점검','개학 전날','현장 결과'];
const KINDS=['대화','현장 탐색','미니게임','점심','부서 업무','돌발 기상','창구 연결','마지막 점검','개학 전 밤','현장 결과'];
const PEOPLE=[{name:'서윤',role:'현장을 먼저 보는 선배',letter:'윤',color:'#59765d'},{name:'도현',role:'함께 발령받은 동기',letter:'현',color:'#b66d44'},{name:'은별',role:'새봄학교 현장 지원',letter:'별',color:'#5c7d88'}];
const SOUND_KEY='pps-city-sound';
function loadSound(){try{return localStorage.getItem(SOUND_KEY)!=='off'}catch{return true}}
let s=null,sound=loadSound(),ac=null,bgm=null,home=true,lastFocus=null,saveFailed=false,toastTimer;
let eventOpen=false,interactionHTML='',autoMode=false,autoDelay=3000,autoTimer=null,pathDrag=false,pathDragId=null;
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){let j=random(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function valid(x){return !!(x&&x.version===2&&typeof x.name==='string'&&Number.isInteger(x.dept)&&x.dept>=0&&x.dept<6&&Number.isInteger(x.step)&&x.step>=0&&x.step<=10&&['appointment','play','result','transfer','end'].includes(x.phase)&&x.local&&Array.isArray(x.local.pick)&&Array.isArray(x.local.path)&&Array.isArray(x.local.order)&&Array.isArray(x.local.open)&&Array.isArray(x.log)&&Array.isArray(x.route)&&Array.isArray(x.visits)&&x.flags&&Array.isArray(x.city)&&x.city.length===3&&Array.isArray(x.bag)&&typeof x.energy==='number'&&typeof x.trust==='number'&&Number.isInteger(x.first)&&x.first>=0&&x.first<6)}
function load(){try{const x=JSON.parse(localStorage.getItem(SAVE_KEY));if(!valid(x))return null;if(x.phase==='transfer'){x.phase='play';x.local=blank()}if(x.phase!=='appointment'){x.dept=x.first;x.route=[{dept:x.first,day:1}]}if(!x.bagSlots){Object.assign(x,freshBagState());const tmp=s;s=x;ensureBagSlots();x.pendingPack=null;s=tmp}if(!Number.isInteger(x.avatar)||x.avatar<0)x.avatar=0;else if(x.avatar>=PLAYER_AVATARS.length)x.avatar=x.avatar%PLAYER_AVATARS.length;return x}catch{return null}}
function save(){if(s.phase==='appointment'&&load())return;try{localStorage.setItem(SAVE_KEY,JSON.stringify(s))}catch{saveFailed=true}}
function setChrome(mode){const w=document.querySelector('.wrap');if(!w)return;w.classList.toggle('chrome-home',mode==='home');w.classList.toggle('chrome-focus',mode==='focus')}
function toast(t){$('live').textContent=t;document.querySelector('.toast')?.remove();clearTimeout(toastTimer);const e=document.createElement('div');e.className='toast';e.textContent=t;document.body.appendChild(e);toastTimer=setTimeout(()=>e.remove(),3300)}
function toastWin(t){toast(t);const el=document.querySelector('.toast');if(el)el.classList.add('toast-win');beep(true)}
function parseGrade(title,effect){if(effect?.miniGrade)return effect.miniGrade;const m=String(title).match(/^([SAB])\s*·/);if(m)return m[1];if(/\b3\/3\b/.test(title))return 'S';if(/타임오버/.test(title))return 'F';return ''}
function gradeCaption(g,effect){if(!g)return'';if(effect?.miniGrade)return ({S:'한 번에 맞춤',A:'한 번 더해서',B:'힌트 참고',F:'동료가 마무리'})[g]||'';return ({S:'완벽',A:'굿',B:'통과',F:'패널티'})[g]||''}
const MINI_TAG={kit:'예산 맞추기',inspect:'라벨 맞추기',route:'경로 그리기',test:'센서 작동 확인',path:'동선 10칸',order:'예약 버튼 배치'};
function deptSceneTitle(step){if(!s)return TITLES[step];const p=deptProf(),k=DEPTS[s.dept].kind;return[p.introTitle,p.fieldTitle,miniTitle(k),'점심 시간',s.dept===2?'비축 물량 나누기':DEPT_STORIES[s.dept][0],(s.dept===5?'홈페이지에 남은 예전 일정':DEPT_WEATHER[s.dept][0]),p.routeTitle,'마지막 점검','개학 전 밤','마지막 장면'][step]||TITLES[step]}
function deptSceneKind(step){if(!s)return KINDS[step];const mini=MINI_TAG[DEPTS[s.dept].kind];const work=['설치 체크','라벨 보류','비축 배분','시험 일정','면적 배치','문의 분류'];return['첫 업무','현장 답사',mini,'휴식',work[s.dept]||'핵심 업무','우선순위','창구 연결','프로젝트','야간 계획','마무리'][step]||KINDS[step]}
const DEPT_GOALS=[["장비 요청 세 건을 확인해요.","설치에 참고할 현장을 둘러봐요.","운동장에 보낼 장비를 골라요.","설치 장소와 전원을 확인해요."],["검사할 물품을 먼저 골라요.","납품 목록과 시험 자료를 확인해요.","상자 라벨과 시험 자료를 비교해요.","계약과 다른 라벨에 보류 표시를 해요."],["어느 곳에 물량이 먼저 필요한지 확인해요.","운송 경로와 창고 상황을 확인해요.","침수된 길을 피해 공장까지 이어 봐요.","창고 물량을 세 곳에 나눠 보내요."],["현장에서 시험할 장비를 골라요.","장비가 쓰이는 곳을 둘러봐요.","센서가 반응하지 않은 상황을 다시 시험해요.","복도에서 다시 시험할 조건을 골라요."],["출입구와 통로를 확인할 곳을 골라요.","사람이 오가는 길을 직접 살펴봐요.","문화관 입구에서 홀까지 길을 만들어요.","대기 공간을 세 구역에 나눠 배치해요."],["먼저 확인할 온라인 업무를 골라요.","홈페이지 예시를 보고 불편을 메모해요.","예약 버튼을 첫 화면에 배치해요.","예약 문의마다 해결 방법을 골라요."]];
function sceneGoal(step){
 const goals=DEPT_GOALS[s.dept];
 return [goals[0],goals[1],goals[2],'점심을 먹을 곳을 골라요.',goals[3],'비로 바뀐 현장 일정에 대응해요.','기업 문의를 듣고 알맞은 창구로 연결해요.','업무를 마치기 전에 한 곳을 더 확인해요.','남은 예산 안에서 내일 할 일을 골라요.','세 현장의 결과를 확인해요.'][step];
}
function runProgress(){return`<div class="run-progress" aria-label="장면 진행">${Array.from({length:10},(_,i)=>`<span class="${i<s.step?'done':i===s.step?'now':''}">${i+1}</span>`).join('')}</div>`}
function mobileHud(){
 const notes=s.bag.map(name=>clueCard(name)).join('');
 return `<div class="mobile-run-hud">${stats()}${notes?`<details class="mobile-notes"><summary>도구함 · 메모 ${s.bag.length}개</summary><div class="clue-grid">${notes}</div></details>`:''}</div>`;
}
function siteProgress(){
 const jobs=['개학 준비','재가동 준비','개관 준비'];
 return '<section class="site-progress" aria-label="현장별 진행 상황"><h3>현장 진행 상황</h3>'+CITY_SITES.map((site,i)=>{
  const score=s.city[i],status=score>=CITY_OK?'일정 진행 가능':score>0?'준비 중':'착수 전';
  return '<div class="site-progress-row"><div><strong>'+site+'</strong><b>'+score+'/8</b></div><progress max="8" value="'+score+'" aria-label="'+site+' '+jobs[i]+'"></progress><small>'+jobs[i]+' · '+status+'</small></div>';
 }).join('')+'</section>';
}
function deptStepHook(step){if(!s||s.phase!=='play')return'';if(step===2)return`이번 미니 · ${MINI_TAG[DEPTS[s.dept].kind]}`;if(step===3)return'이번 휴식 · 부서마다 메뉴가 달라요';if(step===4)return`이번 업무 · ${DEPT_WORK_LABEL[s.dept]}`;if(step===6)return'이번 일 · 전화 한 통씩 맞는 창구로';return''}
function streakChip(){if(!s||!s.streak)return'';return`<span class="chip streak-chip">🔥 ${s.streak}연속</span>`}
const INTRO_LOOT={school:'🏫 학교 쪽 +1',factory:'🏭 공장 쪽 +1',culture:'🎭 문화관 쪽 +1'};
function introSub(o){return o[2]||INTRO_LOOT[o[0]]}
const PLACE_LOOT=['우천 메모','시험 메모','우회 물류','동선 메모'];
const PLACE_NOTE=['교실·우천·전원','시험·센서','우회 경로·항로','출입·문턱·동선'];
const BAG_CLUES={
'우천 대비 메모':{icon:'☂',shape:'circle'},
'우천·교실 메모':{icon:'☂',shape:'circle'},
'대체 물류 연락망':{icon:'≈',shape:'bolt'},
'현장 동선 스케치':{icon:'⌑',shape:'tab'},
'현장 실험 노트':{icon:'✦',shape:'hex'},
'교실 현장 메모':{icon:'▱',shape:'diamond'},
'학교 동선 메모':{icon:'🏫',shape:'notch'},
'공장 동선 메모':{icon:'🏭',shape:'bolt'},
'검사 체크 노트':{icon:'⌕',shape:'hex'},
'여유 물량':{icon:'◈',shape:'circle'},
'배분 표':{icon:'▣',shape:'square'},
'협업 연락망':{icon:'🤝',shape:'tab'},
'기업 지원 지도':{icon:'⌘',shape:'diamond'},
'설치 체크리스트':{icon:'ϟ',shape:'square'},
'보류 라벨 목록':{icon:'▧',shape:'hex'},
'복도 시험 일정':{icon:'◐',shape:'notch'},
'대기 면적 스케치':{icon:'▤',shape:'tab'},
'FAQ 분류표':{icon:'☰',shape:'diamond'},
'검사 재대조 메모':{icon:'▨',shape:'hex'},
'대기 면적 메모':{icon:'▤',shape:'tab'}
};
const BAG_SLOT_SHAPES=['circle','hex','bolt','tab','notch','diamond','circle','hex','bolt','tab','notch','diamond'];
const BAG_SLOT_LABELS={circle:'동그라미',hex:'육각',bolt:'지그재그',tab:'탭',notch:'파인',diamond:'마름모',square:'네모'};
function clueMeta(n){const m=BAG_CLUES[n];return m?m:{icon:'📒',shape:['circle','hex','bolt','tab','notch','diamond','square'][Math.abs(String(n).length)%7]}}
function ensureBagSlots(){if(!s.bagSlots||s.bagSlots.length!==12)s.bagSlots=Array(12).fill(null);for(const name of s.bag){if(s.bagSlots.includes(name))continue;const sh=clueMeta(name).shape;let i=BAG_SLOT_SHAPES.findIndex((sp,j)=>!s.bagSlots[j]&&sp===sh);if(i<0)i=s.bagSlots.findIndex(x=>!x);if(i>=0)s.bagSlots[i]=name}}
function queueBagItem(name){ensureBagSlots();if(s.bagSlots.includes(name))return;s.pendingPack=name}
function autoPackPending(){if(!s?.pendingPack)return;ensureBagSlots();s.pendingPack=null;save()}
function packIntoSlot(i){if(s.phase!=='result'||!s.pendingPack)return;if(s.bagSlots[i])return toast('이미 차 있어요.');const need=clueMeta(s.pendingPack).shape;if(BAG_SLOT_SHAPES[i]!==need){toast(`모양이 달라요. 이 칸은 ${BAG_SLOT_LABELS[BAG_SLOT_SHAPES[i]]} 자리예요.`);beep();return}s.bagSlots[i]=s.pendingPack;s.pendingPack=null;toastWin('딸깍 — 도구함에 들어갔어요');save();render();beep(true)}
function packResultHtml(){
 const content=packInteractHtml();
 return content?'<div class="desktop-pack">'+content+'</div><details class="mobile-pack mobile-notes"><summary>도구함에 직접 넣기</summary>'+content+'</details>':'';
}
function packInteractHtml(){if(!s.pendingPack)return '';const m=clueMeta(s.pendingPack);return `<div class="bag-pack"><span class="label">도구함 맞추기</span><p>메모는 이미 저장됐어요. 같은 모양의 빈 칸에 직접 넣거나 다음 장면으로 넘어갈 수 있어요.</p><div class="bag-loose"><span class="bag-piece loose shape-${m.shape}">${m.icon}</span><small>${esc(s.pendingPack)}</small></div><div class="bag-board bag-board-pick">${BAG_SLOT_SHAPES.map((sh,j)=>`<button type="button" class="bag-slot shape-${sh} ${s.bagSlots[j]?'filled':''}" onclick="packIntoSlot(${j})" aria-label="${BAG_SLOT_LABELS[sh]} 칸" ${s.bagSlots[j]?'disabled':''}></button>`).join('')}</div></div>`}
function showClueTip(name){if(!name)return;toast(name);beep()}
function bagAsideListHtml(){ensureBagSlots();const rows=s.bag.map(n=>{const m=clueMeta(n),q=String(n).replace(/\\/g,'\\\\').replace(/'/g,"\\'");return `<button type="button" class="clue-row" onclick="showClueTip('${q}')" title="${esc(n)}" aria-label="${esc(n)}"><span class="clue-row-icon" aria-hidden="true">${m.icon}</span><span class="clue-row-text"><b>${esc(n)}</b></span></button>`}).join('');return rows?`<div class="toolbag-list" aria-label="도구함 ${s.bag.length}개">${rows}</div>`:''}
function bagBoardAsideHtml(){ensureBagSlots();const filled=s.bagSlots.filter(Boolean).length;return `<div class="bag-board bag-board-aside" aria-label="도구함 ${filled}/12">${BAG_SLOT_SHAPES.map((sh,i)=>{const n=s.bagSlots[i],m=n?clueMeta(n):null;return `<div class="bag-slot shape-${sh} ${n?'filled':''}" title="${n?esc(n):BAG_SLOT_LABELS[sh]+' 빈 칸'}">${n?`<span class="bag-piece shape-${m.shape}">${m.icon}</span>`:''}</div>`}).join('')}</div>${s.pendingPack?`<p class="fine bag-pending">넣기 대기 · ${esc(s.pendingPack)}</p>`:''}<p class="fine">칸 모양에 맞춰야 들어갑니다</p>`}
function clueCard(n,isNew){const m=clueMeta(n);return `<div class="clue-card${isNew?' clue-new':''}"><span class="bag-piece shape-${m.shape} clue-icon" aria-hidden="true">${m.icon}</span><b>${esc(n)}</b></div>`}
function toolbagAsideHtml(){if(!s.bag.length&&!s.pendingPack)return '<p class="fine toolbag-empty">현장을 다니면 메모가 쌓입니다.</p>';return `${bagAsideListHtml()}${s.pendingPack?`<p class="fine bag-pending">장면 끝에서 <b>${esc(s.pendingPack)}</b> 넣기</p>`:''}`}
function sceneCityPulse(effect={}){if(effect.miniGrade==='F'||/타임오버|부족|실수|누락|어긋남/.test(String(effect._title||'')))return 'dim';if((effect.city||[]).some(n=>n>0)||effect.bag||effect.clues?.length||effect.miniGrade==='S')return 'bright';if((effect.energy||0)<0||(effect.trust||0)<0)return 'dim';return 'neutral'}
function cityWindowFill(ci){const p=s?.cityPulse,c=ci||0;if(p==='bright')return c>0?'#fff8b8':'#a8b89a';if(p==='dim')return c>0?'#8a9488':'#5e6962';return c>=CITY_OK?'#ffea7a':c>=CITY_MID?'#ffdf87':c>0?'#c5d4a8':'#748f82'}
function cityBuildingFill(i,ci){const p=s?.cityPulse,c=ci||0;const base=['#d39b70','#a3b79b','#e3d9b7'][i];if(p==='bright'&&c>0)return['#e8b07a','#b8d4b0','#f0e6c4'][i];if(p==='dim'&&c===0)return['#a08060','#7a8f78','#b0a890'][i];return base}
function clueRevealHtml(effect){const list=(effect.clues||[]).map(n=>clueCard(n,true)).join('');return `<span class="label">도구함에 넣었어요</span><div class="clue-grid clue-grid-reveal">${list}</div>`}
function toolbagPanelHtml(label){if(!s.bag.length)return'';return `<details class="result-toolbag"><summary>${label} (${s.bag.length})</summary><div class="clue-grid">${s.bag.map(x=>clueCard(x)).join('')}</div></details>`}
function callResultsHtml(entry){
 const results=entry.effect?.callResults;
 if(!results)return '';
 return '<ol class="call-results">'+results.map(({name,selected,expected})=>
  '<li><strong>'+esc(name)+'</strong><span>내가 고른 창구 · '+esc(DESK_SHORT[selected])+'</span>'+
  (selected===expected?'<span>✓ 알맞게 연결했어요.</span>':'<span>↪ 동료가 '+esc(DESK_SHORT[expected])+' 창구로 다시 연결했어요.</span>')+'</li>'
 ).join('')+'</ol>';
}
function resultPreviewText(e){const calls=callResultsHtml(e);if(calls)return calls;if(e.title==='현장 탐색 완료'&&e.effect?.clues?.length)return `단서 ${e.effect.clues.length}개 · 아래·왼쪽 <strong>도구함</strong>을 확인하세요`;return e.text}
function isReservationResult(e){return e.step===2&&e.dept===5&&!!e.effect?.miniGrade}
function reservationPreview(){return webMock('모아문화관 예약',['이용 안내'],'예약 바로가기')}
function firstWebPreview(e){if(e.step===0&&e.dept===5){const pages=[WEB_CHECKS[0],WEB_CHECKS[2],WEB_CHECKS[3]];const page=pages[e.effect.city.findIndex(n=>n>0)];if(page)return webMock(page[0],['공지사항','자료실',page===pages[2]?'이용 안내 › 예약':page===pages[0]?'지난 공지 › 개학 안내':'문의 접수'])+'<p class="feedback">'+page[1]+'</p>';}return ''}
function resultMainHtml(e){const calls=callResultsHtml(e);if(calls)return calls;const preview=firstWebPreview(e);if(preview)return preview;if(e.title==='현장 탐색 완료'&&e.effect?.clues?.length)return `${clueRevealHtml(e.effect)}${toolbagPanelHtml('나의 도구함')}`;return `<div class="story-result"><p>${e.text}</p></div>`}
const DEPT_CHOICE_FX=[['학교 +2 · 힘 −1','동료 도움 +2','학교 +1 · 메모'], ['학교 +2 · 힘 −1','동료 도움 +2','메모 · 추가 확인'], ['산업단지 +2 · 힘 −1','동료 도움 +2','메모'], ['문화관 +2 · 힘 −1','동료 도움 +2','메모'], ['문화관 +2 · 힘 −1','동료 도움 +2','메모'], ['학교 +2 · 힘 −1','동료 도움 +2','메모']];
function lunchMeterLine(e){const t=[];if(e.trust)t.push(`${METER_TRUST} +${e.trust}`);if(e.energy)t.push(`${METER_ENERGY} +${e.energy}`);if(e.city)e.city.forEach((n,i)=>{if(n)t.push(`${CITY_SITES[i]} +${n}`)});if(e.bag)t.push(`+ ${e.bag}`);if(e.flag==='friend')t.push('밤 업무 대사 변화');return t.join(' · ')}
const LUNCH_BY_DEPT=[
[[{star:true,label:'교실 설치 얘기 털어놓기',title:'점심 회의',text:'콘센트·우천 얘기를 다 정리했어요. 오후엔 덜 헷갈릴 거예요.',effect:{trust:2,energy:1,flag:'friend'}},{star:false,label:'운동장 한 바퀴',title:'짧은 산책',text:'운동장 배선·우천 대비를 눈으로 확인했어요.',effect:{energy:3,trust:1,city:[1,0,0]}},{star:false,label:'물류과 급식 줄',title:'타 부서 수다',text:'물류 담당 연락처를 받았어요. 급하면 바로 부를 수 있어요.',effect:{trust:1,bag:'협업 연락망',flag:'network'}}]],
[[{star:true,label:'라벨 사진 비교하기',title:'점심 책상',text:'겉박스 사진을 나란히 놓고 틀린 곳에 표시했어요.',effect:{trust:2,energy:1,flag:'friend'}},{star:false,label:'복도만 걸으며 쉬기',title:'15분 산책',text:'눈을 떼고 쉬었다가, 라벨을 다시 볼 준비가 됐어요.',effect:{energy:3,trust:1}},{star:false,label:'품질원 옆자리',title:'검사팀 수다',text:'입고 검사 일정을 미리 들었어요.',effect:{trust:1,bag:'협업 연락망',flag:'network',city:[1,0,0]}}]],
[[{star:true,label:'배분 표 같이 짜기',title:'점심 표',text:'공장·학교 나눌 숫자를 동료와 맞췄어요.',effect:{trust:2,energy:1,flag:'friend'}},{star:false,label:'창고 뒤 통로 산책',title:'공기 바꾸기',text:'15분쯤 걷고 돌아오니 머리가 맑아졌어요. 배분 표도 다시 볼 만하네요.',effect:{energy:3,trust:1}},{star:false,label:'항만 담당 수다',title:'우회 루트',text:'막히는 길 대신 쓸 연락망을 받았어요.',effect:{trust:1,bag:'대체 물류 연락망',flag:'network',city:[0,1,0]}}]],
[[{star:true,label:'복도 시험 아이디어',title:'점심 스케치',text:'복도 조명과 사람들이 오가는 모습을 메모했어요.',effect:{trust:1,energy:2,city:[0,0,1]}},{star:false,label:'카페테리아 산책',title:'에너지 리셋',text:'잠깐 자리를 비웠어요. 오후 시험 집중이 나아졌어요.',effect:{energy:3,trust:1}},{star:false,label:'구매과 시범 사례',title:'부서 연결',text:'시범구매 했던 사례 연락처를 받았어요.',effect:{trust:1,bag:'협업 연락망',flag:'network'}}]],
[[{star:true,label:'점심 길 동선 찍기',title:'길걷기 점검',text:'문턱·코너를 사진으로 남겼어요. 설계 메모가 한 장 늘었어요.',effect:{energy:2,trust:1,city:[0,0,1],bag:'현장 동선 스케치'}},{star:false,label:'옥상 공기',title:'짧은 산책',text:'머리를 식혔어요. 오후 미팅에 힘이 남았어요.',effect:{energy:3,trust:1}},{star:false,label:'전산 담당자와 점심',title:'접근·화면 얘기',text:'안내 화면 담당 연락처를 받았어요.',effect:{trust:1,bag:'협업 연락망',flag:'network'}}]],
[[{star:true,label:'예약 불편 공유',title:'점심 데스크',text:'막히는 버튼 순서를 동료에게 설명했어요.',effect:{trust:2,energy:1,flag:'friend'}},{star:false,label:'1층 키오스크 테스트',title:'현장 버튼 확인',text:'사용자 시선으로 한번 눌러봤어요. 수정할 곳이 보였어요.',effect:{energy:2,trust:1,city:[0,0,1]}},{star:false,label:'구매과 점심',title:'현장 사례 수다',text:'물품 납품 쪽 연락망을 받았어요.',effect:{trust:1,bag:'협업 연락망',flag:'network'}}]]];
LUNCH_BY_DEPT.forEach((dept,i)=>{LUNCH_BY_DEPT[i]=dept.flat();LUNCH_BY_DEPT[i].forEach(o=>{o.sub=lunchMeterLine(o.effect)+(o.star?' · 이 부서 추천':'');});});
function lunchDeptOpts(){return LUNCH_BY_DEPT[s?.dept]||LUNCH_BY_DEPT[0]}
function deptChoiceSub(dept,i){const tail=(DEPT_STORIES[dept][3]||DEPT_CHOICE_SUB_BY_DEPT[dept]||DEPT_CHOICE_SUB)[i];return `${DEPT_CHOICE_FX[dept][i]} · ${tail}`}
function callScore(){if(!s||s.step!==6)return'';const calls=deptCalls();const ok=calls.filter((c,i)=>c.answer===s.local.order[i]).length;return`<div class="puzzle-hud call-score"><span>맞춤 <b>${ok}/3</b></span><span>${ok===3?'세 건 모두 연결됐어요':'질문 읽고 창구 고르기'}</span></div>`}
function bumpStreak(effect={},title=''){if(!s)return;s.streak=s.streak||0;const bad=(effect.energy||0)<0||(effect.trust||0)<0||/^미니게임/.test(title);const good=(effect.city||[]).some(n=>n>0)||(effect.bag)||(effect.trust||0)>0||(effect.energy||0)>0||effect.miniGrade==='S'||/^S\s*·/.test(title)||/\b3\/3\b/.test(title);if(bad)s.streak=0;else if(good){s.streak++;s.maxStreak=Math.max(s.maxStreak||0,s.streak);if(s.streak===3)toastWin('🔥 3연속! 동료가 박수');if(s.streak===5)toastWin('🔥 5연속! 오늘의 MVP 후보')}}
function resultPixelArt(entry){
 const departmentArt={kit:'speaker',inspect:'box',route:'truck',test:'light',path:'pillar',order:'screen'};
 if(entry.dept===5&&entry.step===0)return '';
 const sceneArt=['building','clipboard',null,'person',null,'truck','screen','building','light','building'];
 const icon=(entry.dept===5&&entry.step===1?'screen':sceneArt[entry.step]) || departmentArt[DEPTS[entry.dept]?.kind] || 'building';
 return '<div class="result-pixel-art" aria-hidden="true">'+pixelIcon(icon)+'</div>';
}
function resultChanges(entry){
 const before=entry.before;
 if(!before)return effectText(entry.effect);
 const rows=CITY_SITES.map((name,i)=>[name,before.city[i],s.city[i],8]);
 rows.push([METER_ENERGY,before.energy,s.energy,10],[METER_TRUST,before.trust,s.trust,8]);
 return rows.filter(([,old,value])=>old!==value).map(([name,old,value,max])=>
  '<span class="chip '+(value>old?'gain':'cost')+'">'+name+' '+(CITY_SITES.includes(name)?(value>old?'+':'')+(value-old):old+' → '+value+'/'+max)+'</span>'
 ).join('');
}
function ensureAc(){try{if(!ac)ac=new(window.AudioContext||window.webkitAudioContext)();return ac}catch{return null}}
function beep(good=false){if(!sound)return;const ctx=ensureAc();if(!ctx)return;const play=()=>{try{ctx.resume();const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(good?640:410,ctx.currentTime);o.frequency.exponentialRampToValueAtTime(good?960:530,ctx.currentTime+.13);g.gain.setValueAtTime(.032,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.21);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.22)}catch{}};if(ctx.state==='suspended')ctx.resume().then(play);else play()}
function ensureBgm(){if(!bgm&&typeof Audio==='function'&&typeof AUDIO_ASSETS!=='undefined'&&AUDIO_ASSETS.bgm){bgm=new Audio(AUDIO_ASSETS.bgm);bgm.loop=true;bgm.volume=.28;bgm.preload='auto'}return bgm}
function playBgm(){if(!sound||(!home&&s?.phase==='end'))return;const a=ensureBgm();if(!a||!a.paused)return;a.play().catch(()=>{})}
function stopBgm(){if(!bgm)return;bgm.pause();try{bgm.currentTime=0}catch{}}
function syncSound(){const btn=$('sound');if(!btn)return;const hasBgm=typeof AUDIO_ASSETS!=='undefined'&&!!AUDIO_ASSETS.bgm;const label=sound?'소리 켜짐':'소리 꺼짐';btn.classList.toggle('sound-on',sound);btn.classList.toggle('sound-off',!sound);btn.setAttribute('aria-pressed',sound);btn.setAttribute('aria-label',label);btn.title=sound?(hasBgm?'배경 루프 + 효과음':'효과음만'):'배경·효과음 꺼짐';const t=btn.querySelector('.sound-text');if(t)t.textContent=label;const on=btn.querySelector('.icon-on'),off=btn.querySelector('.icon-off');if(on)on.hidden=!sound;if(off)off.hidden=!!sound}
function toggleSound(){sound=!sound;try{localStorage.setItem(SOUND_KEY,sound?'on':'off')}catch{}syncSound();if(sound){beep(true);playBgm()}else stopBgm()}
function openPlayWindow(){const u=location.href;const w=window.open(u,'pps-jodal-play','noopener,noreferrer');if(w)try{w.focus()}catch{}else toast('팝업이 막혔어요. 주소를 복사해 Chrome·Edge 새 탭에서 여세요.')}
function modal(title,body){lastFocus=document.activeElement;$('overlay').innerHTML=`<div class="modal-back" onclick="if(event.target===this)closeModal()"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="mt"><button class="close" aria-label="닫기" onclick="closeModal()">×</button><span class="label muted">오늘부터 조달청</span><h2 id="mt">${title}</h2>${body}</section></div>`;document.body.style.overflow='hidden';$('overlay').querySelector('button').focus()}
function closeModal(){eventOpen=false;$('overlay').innerHTML='';document.body.style.overflow='';if(lastFocus?.isConnected)lastFocus.focus()}
function talk(who,text){const p=PEOPLE[who];return `<div class="dialogue"><div class="portrait" style="--portrait:${p.color}">${pixelIcon('person',p.color)}</div><div><span class="label">${p.name} <small class="muted">${p.role}</small></span><p>${text}</p></div></div>`}
function cityArt(){return pixelCityArt()}
function mascotWelcome(compact=false){return `<div class="mascot-welcome ${compact?'compact':''}"><img src="${BRAND_ASSETS.characters}" alt="조달청 캐릭터 나르미와 달이" width="3394" height="2304"><div><span class="label">나르미 &amp; 달이</span><p>${compact?'첫 출근, 화이팅!':'발령 축하해요. 현장부터 같이 가요!'}</p></div></div>`}
function landingVoice(){return `<div class="landing-voice"><img src="${BRAND_ASSETS.characters}" alt="나르미와 달이" width="3394" height="2304"><div><span class="label">나르미 &amp; 달이</span><p>“조달청이 뭘 하는 곳인지,<br>한 부서 발령으로 같이 맞춰 볼까요?”</p><span class="fine">비공식 체험 · 가상 이야기 · 실제 절차와 다릅니다</span></div></div>`}
function landing(){pauseAuto();eventOpen=false;home=true;setChrome('home');const old=load();$('app').innerHTML=`<section class="screen"><div class="hero"><div><div class="eyebrow"><span class="dot"></span> 조달청 업무 체험</div><h1>오늘부터 조달청<br><span>첫 발령</span></h1><p class="desc">조달청 신입으로 첫 출근을 해요.<br>발령받은 부서에서 학교 개학, 공장 재가동, 문화관 개관을 도와주세요. 오늘 업무를 마칠 때까지 세 현장의 준비를 갖추는 게 목표예요.</p><div class="hero-actions"><button class="btn" onclick="newGame()">발령 받고 체험하기 ↗</button>${old?'<button class="btn outline" onclick="resume()">이어하기</button>':''}</div><p class="fine">약 10~15분 · 부서 무작위 배정</p></div><div class="scene story-scene">${cityArt()}${landingVoice()}</div></div><div class="division"><span class="label">같은 흐름, 부서마다 다른 미니·업무</span><span class="muted" style="font-size:12px">발령만 바꿔도 체험 내용이 달라져요</span></div><div class="dept-grid six">${DEPTS.map((d,i)=>`<article class="dept-card"><span class="number">${d.org}</span><h3>${d.name}</h3><p>${["전원과 설치 조건을 확인해요.","물품과 시험 자료를 비교해요.","재고와 공급 일정을 맞춰요.","신제품을 현장에서 시험해요.","안전하게 지나갈 길을 만들어요.","예약 화면의 불편을 해결해요."][i]}</p><span class="chip mini-tag">${MINI_TAG[d.kind]}</span></article>`).join('')}</div></section>`}
function blank(){return {pick:[],open:[],path:[0],order:[],selected:null,feedback:'',tries:0,tool:false,stock:null}}
function freshBagState(){return {bagSlots:Array(12).fill(null),pendingPack:null,cityPulse:'neutral'}}
function newGame(){createGame()}
function createGame(){s={version:2,name:'신입',dept:random(6),first:0,step:0,phase:'appointment',rerolled:false,avatar:random(PLAYER_AVATARS.length),energy:6,trust:2,city:[0,0,0],flags:{},bag:[],visits:[],route:[],log:[],local:blank(),seed:random(10000),weather:random(2),sourceSeen:[],streak:0,maxStreak:0,...freshBagState()};playBgm();save();render();beep(true)}
function resume(){s=load();eventOpen=!!(s&&s.phase==='play');if(s){playBgm();render()}else toast('저장된 이야기가 없습니다.')}
function reroll(){if(s.phase!=='appointment'||s.rerolled)return;s.name=($('name').value.trim()||'신입').slice(0,12);s.dept=(s.dept+1+random(5))%6;s.rerolled=true;save();render()}
const PLAYER_AVATARS=[{kind:'person',tone:'#59765d',label:'짧은 머리'},{kind:'person',tone:'#b66d44',label:'단발'},{kind:'person',tone:'#5c7d88',label:'곱슬머리'},{kind:'person',tone:'#6b8f4e',label:'올림머리'},{kind:'person',tone:'#8b6fa8',label:'앞머리와 안경'},{kind:'person',tone:'#a25d41',label:'묶은 머리'}];
function playerAvatarIdx(){const i=s?.avatar;return Number.isInteger(i)&&i>=0&&i<PLAYER_AVATARS.length?i:0}
function playerPixelIcon(cls=''){const a=PLAYER_AVATARS[playerAvatarIdx()],extra=cls?` ${cls}`:'';return pixelIcon(a.kind,a.tone,playerAvatarIdx()).replace('class="pixel-icon"',`class="pixel-icon${extra}"`)}
function playerAvatarHtml(){return `<div class="appointment-avatar pixel-avatar" id="name-avatar" aria-hidden="true">${playerPixelIcon('pixel-avatar-lg')}</div>`}
function playerMiniAvatarHtml(){return `<div class="avatar pixel-mini" aria-hidden="true">${playerPixelIcon('pixel-avatar-sm')}</div>`}
function playerAvatarPickerHtml(){return `<div class="avatar-pick" role="group" aria-label="프로필 아이콘">${PLAYER_AVATARS.map((a,i)=>`<button type="button" class="avatar-pick-btn ${playerAvatarIdx()===i?'on':''}" onclick="pickPlayerAvatar(${i})" title="${a.label}" aria-label="${a.label}" aria-pressed="${playerAvatarIdx()===i}">${pixelIcon(a.kind,a.tone,i)}</button>`).join('')}</div>`}
function pickPlayerAvatar(i){if(s.phase!=='appointment'||!PLAYER_AVATARS[i])return;s.avatar=i;save();$('name-avatar').innerHTML=playerPixelIcon('pixel-avatar-lg');document.querySelectorAll?.('.avatar-pick-btn').forEach((button,index)=>{button.classList.toggle('on',index===i);button.setAttribute('aria-pressed',String(index===i))});beep()}
function syncAppointmentName(el){const p=$('name-preview');if(p)p.textContent=el.value.trim()||'신입'}
function deptHeroVisual(d){if(d.kind==='inspect')return '<div class="inspection-emblem" role="img" aria-label="상자와 돋보기로 납품 검사">'+pixelIcon('box')+'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="19" cy="19" r="12" fill="#f9f3df" stroke="#355e53" stroke-width="5"/><path d="M28 28L42 42" stroke="#355e53" stroke-width="7"/><path d="m12 19 5 5 9-10" fill="none" stroke="#65935d" stroke-width="3"/></svg></div>';const s={kit:`<svg class="dept-hero-art" viewBox="0 0 200 120" role="img" aria-label="전기·물품 연결"><rect width="200" height="120" rx="14" fill="#dfe9dc"/><rect x="24" y="28" width="48" height="64" rx="6" fill="#59765d" opacity=".9"/><path d="M88 40h72v8H88zm0 20h56v8H88zm0 20h64v8H88z" fill="#a8b89a"/><circle cx="48" cy="48" r="10" fill="#f0e9c8"/><text x="100" y="105" font-size="28" fill="#244f3a">${d.icon}</text></svg>`,inspect:`<svg class="dept-hero-art" viewBox="0 0 200 120" role="img" aria-label="납품 검사"><rect width="200" height="120" rx="14" fill="#ebe4cf"/><rect x="30" y="34" width="56" height="52" rx="4" fill="#d39b70"/><circle cx="130" cy="60" r="28" fill="none" stroke="#59765d" stroke-width="6"/><path d="M150 80l22 22" stroke="#59765d" stroke-width="6" stroke-linecap="round"/><text x="44" y="68" font-size="22" fill="#6b4a2a">▧</text></svg>`,route:`<svg class="dept-hero-art" viewBox="0 0 200 120" role="img" aria-label="물류·비축"><rect width="200" height="120" rx="14" fill="#dce8e5"/><path d="M0 85h200" stroke="#91b8c1" stroke-width="18"/><path d="M40 85c20-35 40-35 60 0s40 35 60 0" fill="none" stroke="#59765d" stroke-width="4"/><rect x="120" y="22" width="50" height="40" rx="4" fill="#a3b79b"/><text x="128" y="50" font-size="20" fill="#fff">창고</text></svg>`,test:`<svg class="dept-hero-art" viewBox="0 0 200 120" role="img" aria-label="혁신 시험"><rect width="200" height="120" rx="14" fill="#e8e0f0"/><circle cx="70" cy="58" r="32" fill="#8b6fa8" opacity=".35"/><rect x="110" y="32" width="70" height="56" rx="8" fill="#59765d" opacity=".85"/><text x="122" y="68" font-size="14" fill="#f0e9c8">LAB</text><text x="36" y="104" font-size="26" fill="#5c4d88">${d.icon}</text></svg>`,path:`<svg class="dept-hero-art" viewBox="0 0 200 120" role="img" aria-label="시설·동선"><rect width="200" height="120" rx="14" fill="#e6e8d6"/><path d="M50 92V48l50-28 50 28v44" fill="#a25d41" opacity=".85"/><rect x="70" y="70" width="20" height="22" fill="#ffdf87"/><path d="M78 92v8M70 100h36" stroke="#59765d" stroke-width="3"/><circle cx="140" cy="78" r="8" fill="#c56f47"/></svg>`,order:`<svg class="dept-hero-art" viewBox="0 0 200 120" role="img" aria-label="정보화·연결"><rect width="200" height="120" rx="14" fill="#dfe5eb"/><rect x="36" y="28" width="128" height="64" rx="10" fill="#fff" stroke="#91a8b8"/><rect x="52" y="44" width="40" height="12" rx="3" fill="#59765d"/><rect x="52" y="64" width="88" height="12" rx="3" fill="#c5d0d8"/><circle cx="148" cy="50" r="8" fill="#c56f47"/></svg>`};return s[d.kind]||s.kit}
function appointment(){const d=DEPTS[s.dept];const n=s.name==='신입'?'':s.name;$('app').innerHTML=`<section class="center screen"><div class="appointment"><div class="row space"><span class="label">발령 안내</span><span class="seal">발령 완료</span></div><div class="appointment-hero">${deptHeroVisual(d)}<p class="dept-scene-note">가상 발령 배지 · ${esc(d.org)}</p><h1 class="dept-name">${d.name}</h1><p class="dept-org"><span class="label">부서 업무</span> ${d.desc}</p><p class="appointment-tagline">여러 부서가 함께 학교 개학, 공장 재가동, 문화관 개관을 준비합니다.</p></div><div class="appointment-name-block appointment-name-row"><div class="appointment-name-side">${playerAvatarHtml()}</div><div class="appointment-name-fields"><p class="name-preview" id="name-preview">${esc(n||'신입')}</p><label class="field" for="name">명찰에 적을 이름</label><input id="name" type="text" maxlength="12" value="${esc(n)}" placeholder="별명도 좋아요" autocomplete="nickname" oninput="syncAppointmentName(this)" onkeydown="if(event.key==='Enter'){event.preventDefault();begin()}">${playerAvatarPickerHtml()}</div></div><blockquote class="mentor-quote"><span class="label">선배 한마디</span>${d.line}</blockquote><div class="row appointment-actions"><button class="btn" onclick="begin()">첫 출근하기 →</button><button class="btn outline" onclick="reroll()" ${s.rerolled?'disabled':''}>${s.rerolled?'발령 다시 받기 완료':'발령 다시 받기'}</button></div><p class="notice">업무 사례와 발령은 게임을 위한 가상 설정입니다.</p></div></section>`;setTimeout(()=>{const el=$('name');if(el)el.focus()},0)}
function begin(){if(s.phase!=='appointment')return;const raw=$('name').value.trim();if(!raw)toast('이름 없으면 동료들이 신입이라고 불러요');s.name=(raw||'신입').slice(0,12);s.first=s.dept;s.streak=0;s.maxStreak=0;s.route=[{dept:s.dept,day:1}];Object.assign(s,freshBagState());if(s.dept===0)s.energy++;if(s.dept===1)s.flags.observer=true;if(s.dept===2){s.bag.push('여유 물량');ensureBagSlots()}if(s.dept===3)s.flags.innovation=true;if(s.dept===4)s.flags.access=true;if(s.dept===5)s.trust++;s.phase='play';eventOpen=true;save();render();toastWin(`출근! ${DEPTS[s.dept].name} · ${MINI_TAG[DEPTS[s.dept].kind]}`)}
function render(scroll=true){if(s.step===9&&s.phase==='play')completeFinale();home=false;setChrome(s.phase==='end'||s.phase==='appointment'||s.phase==='play'||s.phase==='result'?'focus':'home');if(s.phase==='appointment')appointment();else if(s.phase==='play')play();else if(s.phase==='result')result();else if(s.phase==='transfer')transfer();else ending();if(scroll)window.scrollTo({top:0,behavior:'instant'})}
function apply(e={}){s.energy=clamp(s.energy+(e.energy||0),0,10);s.trust=clamp(s.trust+(e.trust||0),0,8);if(e.city)e.city.forEach((n,i)=>{const b=s.city[i];s.city[i]=clamp(s.city[i]+n,0,8);if(b<CITY_MID&&s.city[i]>=CITY_MID)toast(`${CITY_SITES[i]} — 겨우 일정 맞춤`);if(b<CITY_OK&&s.city[i]>=CITY_OK){toast(`${CITY_SITES[i]} 준비 끝`);beep(true)}});if(e.flag)s.flags[e.flag]=true;if(e.clues)e.clues.forEach(n=>{if(!s.bag.includes(n))s.bag.push(n);queueBagItem(n)});else if(e.bag&&!s.bag.includes(e.bag)){s.bag.push(e.bag);queueBagItem(e.bag)}}
function finish(title,text,effect={},source=11){if(s.phase!=='play')return;closeModal();const before={city:[...s.city],energy:s.energy,trust:s.trust};apply(effect);s.cityPulse=sceneCityPulse({...effect,_title:title});s.log.push({step:s.step,day:DAYS[s.step],dept:s.dept,title,text,effect,source,before});bumpStreak(effect,title);if(s.cityPulse==='bright')toastWin('도시가 환해졌어요');else if(s.cityPulse==='dim')toast('도시 불빛이 잠깐 어두워졌어요');else if(effect.bag)toastWin(`+${effect.bag}`);else if(effect.miniGrade==='S')toastWin('한 번에 맞췄어요');else if(/^S\s*·/.test(title))toastWin('한 번에 맞췄어요');s.phase='result';save();render();beep(s.cityPulse!=='dim')}
function advance(){if(s.phase!=='result')return;autoPackPending();s.step++;s.local=blank();if(s.step>=10)s.phase='end';else{s.phase='play';if(s.step===5)toast('후반 — 돌발 기상·기업 전화 구간');if(s.step===8)toast('남은 예산으로 내일 일정을 정할 시간이에요.')}eventOpen=s.phase==='play';save();render();beep()}
function miniGradeCode(){if(s.local.tool)return 'B';if(s.local.tries)return 'A';return 'S'}
function miniGrade(){if(s.local.tool)return '힌트 보고 맞췄어요';if(s.local.tries)return '한 번 더해서 맞췄어요';return '한 번에 맞췄어요'}
function miniResultTitle(kind,assisted){if(assisted)return kind==='order'?'예약 화면을 함께 정리했어요':'동료가 대신 마무리';return {kit:'운동장 안내 물품',inspect:'납품 라벨 확인',route:'우회 물량 경로',test:'현장 시험 조건',path:'홀까지 가는 길',order:'예약 바로가기 배치'}[kind]||'확인 완료'}
function miniResultText(kind,assisted,box){if(assisted)return {kit:'예산 안에서 물품을 맞추는 건 동료가 이어서 했어요.',inspect:'라벨 확인은 동료가 마무리했어요. 이상이 있던 건 따로 표시했습니다.',route:'우회 경로는 동료가 그려 넣었어요.',test:'시험 조건은 동료가 정리했어요.',path:'동선은 동료가 이어 그렸어요. 오늘은 대략 잇는 것만 확인했습니다.',order:'도현과 함께 예약 버튼을 첫 화면으로 옮겼어요. 이용자가 메뉴를 헤매지 않고 바로 예약할 수 있게 됐습니다.'}[kind]||'동료가 마무리했습니다.';return {kit:'운동장 안내에 쓸 물품을 예산 안에 맞췄습니다.',inspect:`${box}번 상자 라벨이 계약과 달라 보입니다. 납품 전에 다시 확인하기로 했습니다.`,route:'침수 구간을 피해 창고에서 공장까지 물량 경로를 잇었습니다.',test:'복도 문제를 재현할 시험 두 가지를 골라, 현장 시험 일정에 넣었습니다.',path:'기둥 사이를 피해 입구에서 홀까지 길을 잇었습니다. 휠체어·유모차가 지나갈 만한지 내일 현장에서 다시 걸어볼게요.',order:'예약 버튼을 첫 화면에 배치했어요. 이제 이용자가 메뉴를 여러 번 열지 않고 바로 예약할 수 있어요. 문화관 이용 준비에도 도움이 됐습니다.'}[kind]||'확인했습니다.'}
function departmentForMini(){return s.dept}
function stats(){return `<div class="meters meter-panel"><div title="일이 겹치면 줄어요. 점심·쉬면 회복"><span>${METER_ENERGY}</span><b>${'●'.repeat(Math.ceil(s.energy/2))}<i>${'○'.repeat(5-Math.ceil(s.energy/2))}</i></b><small>${s.energy}/10</small></div><div title="협업·연결이 쌓일수록 일부 선택지가 열려요"><span>${METER_TRUST}</span><b>${s.trust}<small> / 8</small></b></div></div>`}
function shell(content){
 interactionHTML=content;
 const isResult=s.phase==='result',entry=s.log.at(-1);
 const playBtn=eventOpen?'선택 창 보기 →':s.step===1?'지도 펼쳐 보기':s.step===2?'미니게임 열기 →':s.step===4?'핵심 업무 열기 →':'선택하기 →';
 const g=isResult?parseGrade(entry.title,entry.effect):'';
 s.streak=s.streak||0;$('app').innerHTML=`<section class="screen compact-game">${runProgress()}<div class="play-toolbar"><div><span class="label">${esc(s.name)} ${streakChip()}</span><b class="dept-play-name">${esc(DEPTS[s.dept].name)}</b><small class="dept-play-org muted">${esc(DEPTS[s.dept].org)}</small><small class="dept-run-lens">${esc(DEPTS[s.dept].tag)}</small></div><div class="play-controls"><button class="btn small ${autoMode?'light':'outline'}" onclick="toggleAuto()" aria-pressed="${autoMode}">${autoMode?'Ⅱ 자동 선택 멈춤':'자동 선택'}</button><label class="sr" for="pace">자동 진행 속도</label><select id="pace" onchange="setPace(this.value)"><option value="5000" ${autoDelay===5000?'selected':''}>느긋하게</option><option value="3000" ${autoDelay===3000?'selected':''}>보통</option><option value="1200" ${autoDelay===1200?'selected':''}>빠르게</option></select></div></div><div class="story-layout"><aside class="story-aside"><div class="mini-id">${playerMiniAvatarHtml()}<div><h3>${esc(s.name)}</h3><small>${esc(DEPTS[s.dept].perk)} · ${esc(DEPTS[s.dept].name)}</small></div></div>${siteProgress()}${stats()}<div class="side-heading">${isResult&&s.bag.length?'나의 도구함 · 단서':'나의 도구함'}</div>${toolbagAsideHtml()}<button class="log-btn" onclick="showLog()">나의 이야기 기록 ↗</button></aside><div class="story-main"><details class="mobile-site-progress mobile-notes"><summary>현장 진행 상황 · ${s.city.filter(n=>n>=CITY_OK).length}/3곳 준비 완료</summary>${siteProgress()}</details><div class="play-site-scenes" aria-label="세 현장 모습">${CITY_SITES.map((name,i)=>`<figure>${facilityPixelScene(i,s.city[i])}<figcaption>${name}</figcaption></figure>`).join('')}</div><article class="paper story-preview"><div class="preview-top"><span class="chip">${isResult?'✓ 장면 완료':deptSceneKind(s.step)}</span><span class="label muted">${s.step+1} / 10</span></div>${g?`<div class="result-grade grade-${g}"><span>${g}</span><small>${gradeCaption(g,entry.effect)}</small></div>`:''}<h2>${isResult?entry.title:deptSceneTitle(s.step)}</h2>${isResult?`<div class="effect-chips">${resultChanges(entry)}</div>`:''}${!isResult&&deptStepHook(s.step)?`<p class="scene-dept-hook">${deptStepHook(s.step)}</p>`:''}<div class="scene-mission">${isResult?(entry.effect?.miniGrade?entry.text:resultPreviewText(entry)):sceneGoal(s.step)}</div>${isResult?`${firstWebPreview(entry)||(isReservationResult(entry)?reservationPreview():resultPixelArt(entry))}`:''}${isResult&&s.pendingPack?packResultHtml():''}${eventOpen&&s.phase==='play'?'<p class="popup-hint">👇 팝업에서 고르기 (닫았으면 아래 버튼)</p>':''}<div class="fixed-decisions">${isResult?`<button class="btn full pulse" onclick="advance()" >${s.step===9?'오늘 결과 보기 →':`다음 장면 → (Enter)`}</button><button class="text-button" onclick="openDetail()">장면 다시 보기</button>`:`<button class="btn full pulse" onclick="openEvent()">${playBtn}</button>`}</div></article>${mobileHud()}<div class="compact-status" title="힘=바쁨, 도움=협업 · 큰 효과는 위 시설 점수"><span>힘 ${s.energy}/10 · 도움 ${s.trust}/8</span> <span>${autoMode?'자동 선택 중':'자동 저장'}</span></div></div></div></section>`;
 if(eventOpen&&s.phase==='play')showEventDialog();
}
function openDetail(){pauseAuto();modal('이번 장면 자세히 보기',interactionHTML)}
function openEvent(){if(s.phase!=='play')return;eventOpen=true;showEventDialog()}
function showEventDialog(){
 const scroll=$('overlay').querySelector('.event-scroll')?.scrollTop||0;
 lastFocus=document.activeElement;
 $('overlay').innerHTML=`<div class="modal-back event-back"><section class="event-dialog" role="dialog" aria-modal="true" aria-labelledby="event-title"><div class="event-bar"><span id="event-title">${deptSceneKind(s.step)}</span><div>${autoMode?'<button onclick="toggleAuto()">Ⅱ 멈춤</button>':''}<button onclick="closeModal()" aria-label="선택 팝업 닫기">×</button></div></div><div class="event-scroll">${interactionHTML}</div><div class="event-foot"><button onclick="toggleAuto()">${autoMode?'멈추기':'자동 선택 시작'}</button></div></section></div>`;
 document.body.style.overflow='hidden';
 const sc=$('overlay').querySelector('.event-scroll');if(sc)sc.scrollTop=scroll;
 $('overlay').querySelector('button').focus();
}
function stopAutoForManualChoice(event){
 if(!autoMode)return;
 const target=event.target.closest?.('.event-scroll button, .event-scroll input, .event-scroll select, .event-scroll [data-cell], .fixed-decisions button');
 if(!target||target.disabled)return;
 pauseAuto();
 $('overlay').querySelector('.event-foot button')?.replaceChildren('자동 선택 시작');
 $('overlay').querySelector('.event-bar button[onclick="toggleAuto()"]')?.remove();
}
document.addEventListener('pointerdown',stopAutoForManualChoice,true);
document.addEventListener('click',stopAutoForManualChoice,true);
document.addEventListener('change',stopAutoForManualChoice,true);
document.addEventListener('keydown',event=>{
 if(event.target.closest?.('.event-scroll [data-cell]')&&event.key.startsWith('Arrow'))stopAutoForManualChoice(event);
},true);
function pauseAuto(){autoMode=false;clearTimeout(autoTimer);autoTimer=null}
function queueAuto(){clearTimeout(autoTimer);if(autoMode)autoTimer=setTimeout(()=>{autoStep();queueAuto()},autoDelay)}
function toggleAuto(){if(!s||['appointment','end'].includes(s.phase))return;autoMode=!autoMode;if(autoMode){if(s.phase==='play')eventOpen=true;queueAuto()}else clearTimeout(autoTimer);if(s.phase==='play'||s.phase==='result')render(false);else if(s.phase==='transfer')transfer()}
function setPace(v){autoDelay=[1200,3000,5000].includes(Number(v))?Number(v):3000;if(autoMode)queueAuto()}
function autoStep(){
 if(!autoMode||!s)return;
 if(s.phase==='end'){pauseAuto();return}
 if(s.phase==='result'){autoPackPending();advance();return}
 if(s.phase==='transfer'){moveDept(random(6));return}
 if(s.phase!=='play')return;
 if(s.step===0)introChoice(['school','factory','culture'][random(3)]);
 else if(s.step===1){const left=PLACES.map((_,i)=>i).filter(i=>!s.visits.includes(i));if(s.visits.length<(s.flags.observer?3:2))visit(left[random(left.length)]);else finishField()}
 else if(s.step===4){if(s.dept===2){s.local.stock=[40,25,20];submitStock()}else if(s.dept===0){s.local.pick=[0,1,4];submitWorkKit()}else if(s.dept===1){s.local.pick=[badBox()];submitWorkInspect()}else if(s.dept===3){s.local.pick=[0,2];submitWorkTest()}else if(s.dept===4){s.local.stock=[22,20,18];submitWorkSpace()}else{s.local.order=[0,2,1];submitWorkFaq()}}else if(s.step===2){if(DEPTS[s.dept].kind==='inspect'){pauseAuto();eventOpen=true;render(false);toast('상자를 눌러 라벨을 직접 확인해 주세요.');return}s.local.tries=2;s.local.tool=true;teamFinish()}
 else if(s.step===3)lunchChoice(random(3));
 else if(s.step===5){if(s.dept===5){crisisChoice(random(3));return}const choices=[2];if(s.flags.rain||s.flags.harbor)choices.push(0);if(hasReserveStock()||s.trust>=4)choices.push(1);crisisChoice(choices[random(choices.length)])}
 else if(s.step===6){s.local.order=[0,1,2];submitCalls()}
 else if(s.step===7)projectChoice(random(3));
 else if(s.step===8){let cost=0;s.local.pick=[];for(const i of shuffle([0,1,2,3,4])){if((!OPS[i].trust||s.trust>=OPS[i].trust)&&cost+OPS[i].cost<=opBudget()){s.local.pick.push(i);cost+=OPS[i].cost}}submitOps()}
 else if(s.step===9)render();
}

function title(sub,title,desc){return `<div class="paper-header"><div class="row space"><span class="chip">${sub}</span></div><h2>${title}</h2>${desc?`<p>${desc}</p>`:''}</div>`}
function choice(text,sub,fn,disabled=false){const lock=disabled?' story-choice-locked':'';return `<button class="story-choice${lock}" onclick="${fn}" ${disabled?'disabled':''}><span>${disabled?'🔒 ':''}${text}</span><small>${sub}</small><b>${disabled?'—':'↗'}</b></button>`}
function play(){if(s.step===0)intro();else if(s.step===1)field();else if(s.step===2)mini();else if(s.step===4)departmentWork();else if(s.step===3)lunch();else if(s.step===5)crisis();else if(s.step===6)routing();else if(s.step===7)project();else if(s.step===8)finalPlan();else render()}
function npcLine(s){return String(s).replace(/^[^:]+:\s*/,'')}
function introMentor(lead){return lead.startsWith('도현')?1:lead.startsWith('은별')?2:0}
function intro(){const p=deptProf();const leadWho=introMentor(p.introLead),leadText=npcLine(p.introLead);shell(title(deptChip(DEPTS[s.dept]),p.introTitle,p.introDesc)+`<div class="paper-body">${talk(leadWho,leadText)}<h3>어디부터 점검해 볼까요?</h3><div class="choice-stack">${p.introOpts.map(o=>choice(o[1],introSub(o),"introChoice('"+o[0]+"')")).join('')}</div></div>`)}
const INTRO_OUTCOME=[[['콘센트 없는 교실','교실에 장비는 왔는데 콘센트가 없대요. 설치 조건부터 다시 잡았습니다.',{flag:'school',city:[1,0,0],bag:'교실 현장 메모'}],['납기·물량 확인','공장 납기 전에 물량·규격 일정을 맞춰 봤습니다.',{flag:'harbor',city:[0,1,0],bag:'공급 메모'}],['설비 동선 점검','문화관 설비 담당과 출입·동선을 먼저 봤습니다.',{flag:'access',city:[0,0,1],bag:'설비 동선 메모'}]],[['학교 납품 샘플','학교 납품 샘플 라벨부터 확인했습니다.',{flag:'school',city:[1,0,0],bag:'검수 샘플 메모'}],['입고 대기 물량','공장 입고 대기 줄에서 라벨·목록을 짚었습니다.',{flag:'harbor',city:[0,1,0],bag:'입고 추적 메모'}],['포장 상태 점검','문화관 안내 장비 포장·라벨을 먼저 봤습니다.',{flag:'access',city:[0,0,1],bag:'포장 점검 메모'}]],[['공장 긴급 물량','공장 긴급 요청부터 재고·우회를 맞췄습니다.',{flag:'harbor',city:[0,1,0],bag:'긴급 물류 메모'}],['학교 비상 예비','학교 비상 예비 물량을 창고와 맞춰 봤습니다.',{flag:'rain',city:[1,0,0],bag:'우천·교실 메모'}],['문화관 운영 물자','문화관 운영 물자 재고를 확인했습니다.',{flag:'access',city:[0,0,1],bag:'운영 물자 메모'}]],[['시범 설치 구역','문화관 시범 구역에서 센서 반응을 봤습니다.',{flag:'innovation',city:[0,0,1],bag:'시범 구역 메모'}],['스마트 장비 시범','학교 스마트 장비 시범 조건을 적었습니다.',{flag:'school',city:[1,0,0],bag:'교실 시험 메모'}],['자동화 센서 시험','공장 라인 센서 시험 일정을 받았습니다.',{flag:'harbor',city:[0,1,0],bag:'라인 시험 메모'}]],[['문화관 동선','문화관 입구·대기·통로부터 걸었습니다.',{flag:'access',city:[0,0,1],bag:'현장 동선 스케치'}],['학교 복도·피난','학교 복도·피난·운동장 연결을 봤습니다.',{flag:'school',city:[1,0,0],bag:'학교 동선 메모'}],['공장 출입·안전','공장 출입·안전 동선을 먼저 확인했습니다.',{flag:'harbor',city:[0,1,0],bag:'공장 동선 메모'}]],[['예약·안내 시스템','문화관 예약 화면에서 막히는 지점을 봤습니다.',{flag:'access',city:[0,0,1],bag:'UI 현장 메모'}],['전산·안내 장비','학교 전산·안내 장비 접수 흐름을 봤습니다.',{flag:'school',city:[1,0,0],bag:'교실 전산 메모'}],['문의 접수 화면','공장 문의 포털 화면을 먼저 봤습니다.',{flag:'harbor',city:[0,1,0],bag:'포털 메모'}]]];
const INTRO_SITE_IDX={school:0,factory:1,culture:2};
function introChoice(id){const pack=INTRO_OUTCOME[s.dept],idx=INTRO_SITE_IDX[id];if(pack&&pack[idx]){const o=pack[idx];finish(o[0],o[1],o[2],id==='factory'?2:id==='culture'?4:0)}}
const PLACES=[
{name:'새봄학교',x:20,y:35,icon:'▱',quote:'비 오면 현관에 물이 고입니다.',detail:'현장 확인 완료. 우천 대비 메모를 받았습니다.',flag:'rain',bag:'우천 대비 메모',source:0},
{name:'장비 시험실',x:72,y:27,icon:'✦',quote:'복도가 어두울 때나 사람이 큰 짐을 들고 지나갈 때 센서가 반응하지 않았어요.',detail:'센서가 반응하지 않았던 조명과 통행 조건을 기록했어요.',flag:'innovation',bag:'현장 실험 노트',source:3},
{name:'항구 물류 현장',x:34,y:73,icon:'≈',quote:'다리가 막히면 이 우회도로로 트럭을 보냅니다.',detail:'우회도로를 확인하고 운송 담당자의 연락처를 받았습니다.',flag:'harbor',bag:'대체 물류 연락망',source:2},
{name:'오래된 문화관',x:79,y:72,icon:'⌑',quote:'비상문은 안에서만 열립니다.',detail:'도면과 다른 출입 절차를 확인했습니다. 동선 스케치를 받았습니다.',flag:'access',bag:'현장 동선 스케치',source:4}
];
const WEB_CHECKS=[
 ['새봄학교 홈페이지','개학 공지가 지난 공지 사이에 묻혀 있어요.','학교 안내 화면 메모'],
 ['새봄학교 장비 안내','장비 사용 안내가 여러 메뉴에 나뉘어 있어요.','전산 장비 안내 메모'],
 ['산업단지 문의 포털','접수 버튼이 공지와 자료 링크 사이에 있어요.','문의 접수 화면 메모'],
 ['모아문화관 홈페이지','예약 버튼이 메뉴 안쪽에 숨어 있어요.','예약 화면 점검 메모']
];
function webMock(name,links,primary=''){
 return '<div class="web-mock"><div class="web-mock-bar">● ● ● <span>화면 예시</span></div><div class="web-mock-body"><strong>'+name+'</strong><div class="web-mock-links">'+links.map(link=>'<span>'+link+'</span>').join('')+'</div>'+(primary?'<b class="web-primary">'+primary+'</b>':'')+'</div></div>';
}
function webField(){
 const active=s.visits.at(-1),page=WEB_CHECKS[active];
 const menus=[['지난 공지','자료실','개학 안내'],['다운로드','장비 목록','사용 방법'],['공지사항','자료실','문의 접수'],['행사 사진','지난 공지','이용 안내 › 예약']];
 const tabs=WEB_CHECKS.map(([name],i)=>'<button class="btn outline small" onclick="visit('+i+')" '+(s.visits.length>=2&&!s.visits.includes(i)?'disabled':'')+'>'+ (s.visits.includes(i)?'✓ ':'')+name+'</button>').join('');
 shell(title(deptChip(DEPTS[5]),'홈페이지 점검','화면 예시 두 곳을 고르세요. 다시 누르면 선택을 취소할 수 있어요.')+
 '<div class="paper-body"><div class="row">'+tabs+'</div>'+(page?webMock(page[0],menus[active])+'<p class="feedback">'+page[1]+'</p>':'')+
 '<button class="btn full" onclick="finishField()" '+(s.visits.length<2?'disabled':'')+'>점검 마치기 · '+s.visits.length+'/2</button></div>');
}
const INSPECTION_VISITS=[
 {bag:'학교 납품 목록 메모',detail:'학교가 주문한 안내 장비의 모델명과 수량을 확인했어요. 상자 라벨과 비교할 수 있게 적어 뒀습니다.'},
 {bag:'시험 자료 대조 메모',detail:'시험실에서 시험성적서에 적힌 모델명과 상자 라벨을 따로 대조해야 한다는 점을 확인했어요.'},
 {bag:'입고 기록 메모',detail:'입고 기록과 납품 목록을 대조했어요. 검사가 늦어질 때 연락할 운송 담당자도 확인했습니다.',flag:'harbor'},
 {bag:'문화관 장비 검수 메모',detail:'안내 장비가 들어오는 통로와 상자를 열어 확인할 장소를 살폈어요. 운반 중 포장이 손상된 곳이 없는지도 점검했습니다.'}
];
function fieldPlaces(){
 return s.dept===1?PLACES.map((place,i)=>({...place,flag:undefined,...INSPECTION_VISITS[i]})):PLACES;
}
function field(){if(s.dept===5)return webField();const max=s.flags.observer?3:2,p=deptProf(),selected=s.visits.at(-1);const rec=p.fieldPin;shell(title(deptChip(DEPTS[s.dept]),p.fieldTitle,s.dept===1?`물품을 검사하기 전에 어디서 어떻게 쓰일지 확인해요. ${max}곳을 둘러볼 수 있어요.`:`둘러볼 곳 ${max}곳`) +`<div class="paper-body"><div class="puzzle-hud"><span>선택한 장소 <b>${s.visits.length}/${max}</b></span></div><div class="field-map"><div class="map-river"></div><div class="map-road"></div>${fieldPlaces().map((pl,i)=>`<button class="map-pin ${s.visits.includes(i)?'visited':''} ${i===rec?'pin-rec':''}" style="left:${pl.x}%;top:${pl.y}%" onclick="visit(${i})" ${!s.visits.includes(i)&&s.visits.length>=max?'disabled':''} aria-label="${pl.name}${i===rec?' · 추천':''}${s.visits.includes(i)?' · 선택됨, 다시 누르면 취소':''}"><b>${s.visits.includes(i)?'✓':pixelIcon(['building','light','truck','building'][i])}</b><span>${pl.name}</span>${s.visits.includes(i)?'<small class="pin-note">선택 취소</small><em class="pin-loot">'+esc(pl.bag)+'</em>':''}</button>`).join('')}</div>${selected!==undefined?`<div class="feedback ok-loot">${fieldPlaces()[selected].detail}</div>`:`<p class="hint">장소를 누르면 내용을 볼 수 있어요. 다시 누르면 선택을 취소합니다.</p>`}<button class="btn full pulse" onclick="finishField()" ${s.visits.length<max?'disabled':''}>${s.visits.length>=max?'답사 마치기 →':`아직 ${max-s.visits.length}곳 더 확인`}</button></div>`)}
function visit(i){
 if(s.phase!=='play'||s.step!==1||!fieldPlaces()[i])return;
 const index=s.visits.indexOf(i);
 if(index>=0)s.visits.splice(index,1);
 else{
  if(s.visits.length>=(s.flags.observer?3:2))return;
  s.visits.push(i);
 }
 save();play();beep();
}
function finishField(){
 if(s.phase!=='play'||s.step!==1||s.visits.length<(s.flags.observer?3:2))return;
 if(s.dept===5){
  const clues=s.visits.map(i=>WEB_CHECKS[i][2]);
  return finish('홈페이지 점검 완료','화면에서 찾은 불편을 기록했어요. 다음에는 문화관 예약 화면을 정리합니다.',{trust:1,clues},5);
 }
 const places=fieldPlaces();
 const selected=s.visits.map(i=>places[i]);
 for(const place of selected)if(place.flag)s.flags[place.flag]=true;
 const clues=selected.map(place=>place.bag);
 finish('현장 탐색 완료','메모 '+clues.length+'개를 저장했어요.',{energy:-1,trust:1,clues,crisisUnlocked:!!(s.flags.rain||s.flags.harbor)},selected[0].source);
}

const DEPT_STORIES=[
 ['개학 전날, 설비 위치 변경','개학 전날입니다. 학교에서 운동장 안내 장비 설치 위치를 바꿔 달래요. 시간이 얼마 없어요.',['현장부터 전원·동선 다시 확인','설치 담당이랑 역할 나눠 맞추기','잠깐 달아 보고 반응만 듣기']],
 ['포장은 멀쩡한데, 기록만 안 맞는다','상자는 멀쩡한데, 납품 목록이랑 라벨이 달라요.',['현물이랑 목록을 하나씩 맞춰 본다','담당자에게 목록이랑 라벨 차이를 물어본다','확실한 것이랑 애매한 것을 나눠 적는다']],
 ['비축 물량 나누기','산업단지 두 곳에서 원자재 지원 요청이 들어왔어요. 남은 기한은 14일이고, 급한 정도는 현장마다 달라요.',['각 현장 재고랑 필요한 날짜를 확인한다','동료랑 공급 일정 대안을 얘기한다','당장 쓸 양이랑 나중 수요를 나눠 본다'],['3일 소요 · 두 현장 재고·납기일 확인','5일 소요 · 공급 일정 대안 맞추기','2일 소요 · 급한 물량부터 배분']],
 ['복도 센서 재시험','센서가 사람을 놓쳤던 상황을 다시 확인합니다.',['이용자를 만나서 불편한 점을 듣는다','개발사랑 조건 바꿔 가며 원인을 찾는다','작은 구역에서 돌려보고 적어 둔다']],
 ['대기 공간 부족','문화관 도면에 대기 공간이 부족하대요. 예산도 같이 봐야 합니다.',['동선부터 따라가 본다','설계 담당자랑 비용·공간 대안을 비교한다','바쁜 시간대 이용 상황을 살펴본다']],
 ['문화관 예약 문의','문화관 예약 화면에 똑같은 문의가 쏟아졌어요.',['사람들이 실제로 누르는 순서를 본다','담당자랑 요구사항을 다시 정리한다','작은 화면 수정안을 같이 써 봤다']]
];
const DEPT_CHOICE_SUB=['현장을 깊게 본다','동료와 맞춰 본다','작게 시험하고 적는다'];
const DEPT_CHOICE_SUB_BY_DEPT={0:['설치 조건·전원부터 확인','설치팀이랑 역할 나누기','짧게 달아보고 반응 체크'],1:['현물·목록 하나씩 대조','담당자랑 라벨 차이 확인','확실한 것만 먼저 표시'],2:['재고·납기일 맞추기','공급 일정 대안','급한 물량부터 나누기'],3:['이용자 불편 듣기','개발사랑 조건 바꿔 보기','작은 구역 시험'],4:['동선 따라가기','비용·공간 대안 비교','바쁜 시간대 관찰'],5:['사람들이 누르는 순서 보기','요구사항 다시 정리','작은 화면 수정안']};
const DEPT_WORK_HINT=['전원·설치 관점에서 고르면 돼요.','라벨·현물 관점 — 정답이 아니라 방식이에요.','비축 과는 배분 숫자가 중심이에요.','시험·시범 관점이에요.','설계·동선 관점이에요.','화면·접수 순서 관점이에요.'];
const DEPT_CHOICE_TAIL=['현장에서 뭐가 급한지 윤곽이 잡혔어요.','함께 본 내용이 다음 일에 넘어갔어요.','짧게 시험한 결과가 메모에 남았어요.'];
const DEPT_CHOICE_TAIL_BY_DEPT={2:['3일 동안 재고와 필요 날짜를 맞춰 뒀어요.','5일 동안 공급 일정 대안이 정리됐어요.','2일 만에 급한 물량부터 나눠 뒀어요.']};
function deptProf(){return DEPT_PROFILES[s.dept]}
function deptChip(d){return `${d.name} / ${d.org}`}
const DEPT_PROFILES=[
{introTitle:'첫 업무',introDesc:'학교·산업단지·문화관에서 장비 관련 요청이 들어왔어요.',introLead:'서윤: 오늘 들어온 요청부터 같이 볼까요?',introOpts:[['school','학교 · 교실에 콘센트가 없대요','장비를 설치할 곳과 전원 확인'],['factory','산업단지 · 장비가 언제 도착하나요?','납품 날짜와 수량 확인'],['culture','문화관 · 안내 장비는 어디에 놓을까요?','설치 위치와 반입 통로 확인']],fieldTitle:'현장 답사',fieldDesc:'전원·설치 얘기 나오는 곳부터.',fieldPin:0,fieldMentor:0,lunch:'개학 전에 설비 위치가 또 바뀌었대. 점심은 같이 얘기할래, 잠깐 나갈래, 옆 부서랑 연락할래?',crisisLead:'물품은 도착했는데, 현장 조건이 안 맞을 때가 제일 바빠요.',crisisOpts:['콘센트·설비 맞추고 일정 우회','묶음 납품·대체 규격으로 공장 버티기','학교부터 공개 일정 재정렬'],routeTitle:'물품·견적 문의 연결',routeDesc:'업체가 조달 제도를 몰라 연락 왔어요.',routeTalk:'우리가 대신 사주진 않아요. 맞는 창구로 연결하는 게 오늘 일이에요.',routeCalls:[{name:'스타트업 제조사',say:'“규격은 있는데 나라장터 경로가 헷갈려요.”',answer:0},{name:'학교 납품 대행 업체',say:'“길잡이 상담 예약은 어디서 하죠?”',answer:1},{name:'수출 경험 있는 중소기업',say:'“G-PASS 같은 해외 제도도 같이 들을래요.”',answer:2}],projects:[['개학용 물품·전원 재점검','교실 메모 쓰면 학교 +2'],['운동장 안내 장비 패키지 정리','설치 조건 합의'],['납품업체 연락망 재정리','공장 +1 · 신뢰']],projectBias:0,nightLead:'내일 쓸 물품·설치 순서만 골라도 큰 일이에요.',nightOps:[0,3,1]},
{introTitle:'첫 업무',introDesc:'세 현장에서 도착한 물품을 확인해 달라고 요청했어요.',introLead:'서윤: 라벨을 꼼꼼히 확인하지 않으면 공급에 문제가 생길 수 있어요.',introOpts:[['school','학교 납품 물품 샘플 확인','현장 메모'],['factory','공장 입고 대기 물량 확인','물류 메모'],['culture','문화관 안내 장비 포장 상태','포장 손상 여부 확인']],fieldTitle:'검사 전에 현장 확인',fieldDesc:'계약이랑 현장이 다른 곳부터.',fieldPin:0,fieldMentor:0,lunch:'점심 고르기 전에 라벨 사진부터 찍었어요…',crisisLead:'비 때문에 검사 일정이 밀렸어요. 어디부터 열어둘까요?',crisisOpts:['우천 메모로 검사 일정 우회','검사팀 나눠 공장 샘플 우선','학교 검사 창만 먼저 열고 공지'],routeTitle:'품질·서류 문의 연결',routeDesc:'기업이 검사·인증 창구를 묻고 있어요.',routeTalk:'우리 업무 밖이면 다른 상담 창구로 넘겨요.',routeCalls:[{name:'스마트센서 스타트업',say:'“벤처나라 등록부터 할까요?”',answer:0},{name:'납품 대행 업체',say:'“검사 서류랑 길잡이 안내를 같이 듣고 싶어요.”',answer:1},{name:'해외 인증 준비 기업',say:'“국내 검사 경험을 해외에 쓰고 싶어요.”',answer:2}],projects:[['납품 샘플 현장 재검수','학교 +2 가능'],['문화관 장비 라벨 재확인','문화관 +2'],['입고 지연 물량 추적','산업단지 +1']],projectBias:0,nightLead:'내일 열어볼 검수·접수 순서를 정해요.',nightOps:[0,2,4]},
{introTitle:'첫 업무',introDesc:'학교·산업단지·문화관에서 물품 공급 요청이 들어왔어요.',introLead:'서윤: 창고에서 바로 보낼 수 있는 물량부터 확인해요.',introOpts:[['factory','공장 긴급 물량 요청 확인','물류 메모'],['school','학교 비상 예비물량 확인','우천·교실 메모'],['culture','문화관 운영 물자 재고','동선 메모']],fieldTitle:'창고와 운송 경로 확인',fieldDesc:'우회·물류 현장부터.',fieldPin:2,fieldMentor:1,lunch:'점심 자리에 급한 공장부터 물량 나누는 얘기만 나왔어요. 나도 표 하나 받았어요.',crisisLead:'다리 통제야. 창고 물량을 어디로 먼저 보낼까요?',crisisOpts:['우회 연락망으로 이중 공급','비축 물량으로 공장 라인 살리기','학교 예비품 먼저 배분·공지'],routeTitle:'공급·비축 상담 연결',routeDesc:'비축물자·공급 제도를 묻는 전화예요.',routeTalk:'급하면 물량부터, 천천히면 제도 설명 창구로 연결해요.',routeCalls:[{name:'원자재 수입 대체 업체',say:'“비축물자 조달 경로가 궁금해요.”',answer:1},{name:'지역 제조 스타트업',say:'“공공조달 길잡이 상담부터 받고 싶어요.”',answer:1},{name:'해외 조달 진출 팀',say:'“국내 비축 경험을 해외 제안서에 쓰려고요.”',answer:2}],projects:[['학교 비상물량 재배분','학교 +1~2'],['공장 긴급 차분 공급','산업단지 +2'],['문화관 운영 물자 점검','문화관 +1']],projectBias:1,nightLead:'남은 물량을 어디에 쓸지 같이 정리해 봅시다.',nightOps:[1,3,5]},
{introTitle:'새 장비 현장 시험',introDesc:'학교·공장·문화관에서 새 장비를 시험해 달라는 요청이 들어왔어요.',introLead:'은별: 사전 시험은 마쳤어요. 이제 장비를 실제로 쓸 곳에서 제대로 작동하는지 확인해 볼까요?',introOpts:[['culture','문화관 안내 장비','관람객이 오가는 곳에서 안내가 잘 보이는지 확인'],['school','학교 복도 안내 센서','어두운 복도에서도 센서가 사람을 감지하는지 확인'],['factory','공장 자동화 센서','짐을 든 작업자도 센서가 감지하는지 확인']],fieldTitle:'장비를 쓰는 곳 둘러보기',fieldDesc:'센서·시험 얘기 나는 곳부터.',fieldPin:1,fieldMentor:2,lunch:'혁신 과제 서류를 한 번 더 출력했어요.',crisisLead:'장맛에 시험 일정이 꼬였어요. 어떤 시험부터 살릴까요?',crisisOpts:['현장 메모로 시험·설치 병행','실험 데이터 먼저 공유 — 공장 우선','학교 시범구역만 먼저 개방'],routeTitle:'혁신·시범구매 문의',routeDesc:'혁신제품 지정·시범 구매를 묻는 전화예요.',routeTalk:'좋은 아이디어부터 연결하고, 제도 설명은 창구에 맡겨요.',routeCalls:[{name:'AI 안내 로봇 팀',say:'“혁신제품 지정 전에 벤처나라부터 할까요?”',answer:0},{name:'센서 스타트업',say:'“시범구매 절차를 길잡이에서 듣고 싶어요.”',answer:1},{name:'수출형 하드웨어 팀',say:'“국내 시범 실적을 해외 입찰에 쓰고 싶어요.”',answer:2}],projects:[['학교 시범 장비 재시험','학교 +2'],['문화관 센서 복도 테스트','문화관 +2'],['공장 라인 시범 연결','산업단지 +1']],projectBias:1,nightLead:'내일 돌릴 시험·시연 순서만 골라요.',nightOps:[2,0,4]},
{introTitle:'첫 업무',introDesc:'학교·공장·문화관에서 출입구와 통로를 확인해 달라는 요청이 들어왔어요.',introLead:'서윤: 사람들이 다니는 길을 직접 걸어 봐요. 통로가 좁거나 대기 줄 때문에 막히는 곳이 있는지 살펴보면 돼요.',introOpts:[['culture','문화관 · 관람객이 기다리는 곳','대기 줄이 입구나 통로를 막지 않는지 확인'],['school','학교 · 교실에서 운동장까지','학생들이 복도와 출입구를 지나 안전하게 이동할 수 있는지 확인'],['factory','공장 · 작업자와 물품이 오가는 길','물품 운반 통로와 작업자가 걷는 길이 겹치는지 확인']],fieldTitle:'출입구와 통로 살펴보기',fieldDesc:'출입·통로·대기 공간을 걸어 봅니다.',fieldPin:3,fieldMentor:0,lunch:'점심 먹으러 가는 길도 동선 검토했어요.',crisisLead:'비에 야외 공사가 멈췄어요. 어디부터 다시 열까요?',crisisOpts:['우천 대비 동선으로 우회','실내 구간부터 설계 수정 — 공장 우선','학교 출입 동선만 먼저 개방'],routeTitle:'시설·설계 상담 연결',routeDesc:'설계 검토·예산 문의 전화예요.',routeTalk:'설계·예산 문의는 담당 상담 창구로 연결해요.',routeCalls:[{name:'건축 IT 스타트업',say:'“저희가 만든 건축 설계 도구를 공공기관에 소개하고 싶은데, 벤처나라에 등록할 수 있을까요?”',answer:0},{name:'문화시설 운영사',say:'“설계적정성 검토 상담 창구가 어디죠?”',answer:1},{name:'해외 EPC 협력사',say:'“국내 검토 리포트를 해외에 쓸 수 있을까요?”',answer:2}],projects:[['학교 동선·피난로 점검','학교 +1~2'],['문화관 문턱·대기 공간','문화관 +2 강화'],['공장 출입 동선 표지','산업단지 +1']],projectBias:1,nightLead:'내일 사람 다니는 길만 먼저 고르면 돼요.',nightOps:[2,3,5]},
{introTitle:'오늘의 업무',introDesc:'학교·산업단지·문화관에서 점검 요청이 들어왔어요.',introLead:'도현: 오늘 들어온 요청부터 같이 볼까요?',introOpts:[['culture','문화관 예약·안내 시스템','예약 버튼을 쉽게 찾을 수 있는지 확인'],['school','학교 전산·안내 장비','개학 안내가 화면에 잘 나오는지 확인'],['factory','공장 문의 접수 화면','문의가 정상적으로 접수되는지 확인']],fieldTitle:'홈페이지 점검',fieldDesc:'예약·버튼 불편한 곳부터.',fieldPin:3,fieldMentor:1,lunch:'점심 자리에서도 예약 앱 메뉴얼 PDF가 나왔어요.',crisisLead:'폭우 때문에 문화관 개관 일정이 바뀌었는데, 홈페이지에는 예전 날짜가 그대로예요.',crisisOpts:[],routeTitle:'정보화·용역 문의',routeDesc:'용역·시스템 제도를 묻는 전화예요.',routeTalk:'버그 잡기 전에, 맞는 창구부터 연결해요.',routeCalls:[{name:'SaaS 스타트업',say:'저희는 공공기관에 클라우드 서비스를 공급하고 싶은 작은 회사예요. 어떤 제도를 이용할 수 있고, 어디서 상담받을 수 있을까요?',answer:1},{name:'시민 앱 개발사',say:'“길잡이에서 용역 종류를 같이 보고 싶어요.”',answer:1},{name:'글로벌 SI 협력사',say:'“국내 레퍼런스를 해외 공고에 넣고 싶어요.”',answer:2}],projects:[['학교 안내 시스템 점검','학교 +1~2'],['문화관 예약 UX 테스트','문화관 +2'],['공장 문의 포털 안내','산업단지 +1']],projectBias:2,nightLead:'내일 돌아갈 시스템·사람 업무만 고르세요.',nightOps:[2,4,3]}
];
const SCENE_SUMMARIES=[
'첫 전화 · 부서마다 다른 출발점',
'지도 탐색 · 부서 추천 현장',
'부서 전용 미니게임',
'점심 · 부서별 휴식',
'부서 고유 업무 (손으로 맞추기)',
'돌발 · 부서식 우선순위',
'부서 담당 기업 연결 퀴즈',
'마지막 점검',
'개학 전 밤 · 부서 추천 할 일',
'세 현장 결과 확인'
];
function sceneSummary(i){return SCENE_SUMMARIES[i]||''}
function isDeptWork(){return s?.phase==='play'&&s.step===4}
function workStoryLead(){return DEPT_STORIES[s.dept][1]}
function workMentor(){return DEPT_PROFILES[s.dept].fieldMentor??0}
function workFoot(ok,submitFn,hintKey){const h={kit:'전원·동선·안내 세 가지는 꼭 넣어야 해요.',inspect:'계약과 다른 라벨만 보류 표시하면 됩니다.',test:'복도에서 재현할 조건 두 가지를 고르세요.',space:'합계 60㎡ · 구역별 최소치를 맞추세요.',faq:'문의마다 원인을 해결하는 방법을 골라 주세요.'};return `${s.local.feedback?`<div class="feedback puzzle-feedback" role="status">${s.local.feedback}</div>`:''}<p class="hint">${h[hintKey]||''} </p><button type="button" class="btn full" onclick="${submitFn}()">${ok?'확정 →':'이대로 확정'}</button>`}
function submitWorkFail(ok,onOk,onFail){if(!isDeptWork())return;if(ok())return onOk();s.local.tries=(s.local.tries||0)+1;if(s.local.tries<2){s.local.feedback='✕ 한 번 더 맞춰 보세요.';save();play();beep();return}onFail()}
function departmentWork(){return [departmentWorkKit,departmentWorkInspect,departmentWorkStock,departmentWorkTest,departmentWorkSpace,departmentWorkFaq][s.dept]()}
const INSTALL_ITEMS=[{n:'교실 콘센트·전원',t:'전원'},{n:'운동장까지 동선',t:'동선'},{n:'방수·우천 덮개',t:'비'},{n:'설치팀 일정',t:'협업'},{n:'안내 표지·방송',t:'안내'}];
function workKitOk(){const p=s.local.pick;return p.length===3&&['전원','동선','안내'].every(t=>p.some(i=>INSTALL_ITEMS[i].t===t))}
function workTogglePick(i,max){if(!isDeptWork())return;const a=s.local.pick,k=a.indexOf(i);if(k>=0)a.splice(k,1);else{if(a.length>=max)return toast(`최대 ${max}개까지 고를 수 있어요.`);a.push(i)}save();play();beep()}
function departmentWorkKit(){const e=DEPT_STORIES[0],sel=s.local.pick;const ok=workKitOk();shell(title(deptChip(DEPTS[0]),e[0],'설치 위치가 바뀌었습니다. 오늘 꼭 확인할 항목 3개를 골라요.')+`<div class="paper-body">${talk(workMentor(),'설치 장소가 바뀌었대요. 새 위치에서 전원과 동선, 안내 방송을 다시 확인해 주세요.')}<div class="puzzle-hud"><span>선택 <b>${sel.length}/3</b></span><span>${['전원','동선','안내'].map(t=>`<i class="need ${sel.some(i=>INSTALL_ITEMS[i].t===t)?'met':''}">${t}</i>`).join('')}</span></div><div class="work-grid">${INSTALL_ITEMS.map((x,i)=>`<button type="button" class="supply ${sel.includes(i)?'selected':''}" onclick="workTogglePick(${i},3)"><strong>${x.n}</strong><small>${x.t}</small></button>`).join('')}</div><button type="button" class="btn outline small" onclick="workResetKit()">다시 고르기</button>${workFoot(ok,'submitWorkKit','kit')}</div>`)}
function workResetKit(){if(!isDeptWork())return;s.local.pick=[];s.local.feedback='';save();play()}
function workKitHint(){if(!isDeptWork())return;s.local.tool=true;s.local.feedback='전원·동선·안내 세 가지를 넣으면 됩니다. 비·협업은 빼도 돼요.';save();play()}
function submitWorkKit(){submitWorkFail(workKitOk,()=>finish(DEPT_STORIES[0][0],`체크: ${s.local.pick.map(i=>INSTALL_ITEMS[i].n).join(', ')}. 설치팀과 바로 공유했습니다.`,{city:[2,0,0],energy:-1,bag:'설치 체크리스트'},DEPTS[0].source),()=>finish('설치 체크 누락','일부 항목을 빼고 진행했어요. 동료가 현장에서 다시 맞췄습니다.',{city:[1,0,0],energy:-2,trust:-1,bag:'설치 체크리스트'},DEPTS[0].source))}
function manifestBad(){return badBox()}
function manifestRows(){const bad=manifestBad();return [0,1,2,3].map(i=>({id:'ABCD'[i],label:i===bad?'HS-10':'HS-20'}))}
function workInspectOk(){const b=manifestBad();return s.local.pick.length===1&&s.local.pick[0]===b}
function workToggleHold(i){if(!isDeptWork())return;const a=s.local.pick,k=a.indexOf(i);if(k>=0)a.splice(k,1);else{a.length=0;a.push(i)}save();play();beep()}
function departmentWorkInspect(){const sel=s.local.pick,ok=workInspectOk();shell(title(deptChip(DEPTS[1]),DEPT_STORIES[1][0],'납품 목록은 HS-20인데, 라벨이 다른 상자만 보류 표시하세요.')+`<div class="paper-body">${talk(workMentor(),'라벨이 납품 목록과 다른 상자는 바로 받지 말고 따로 표시해 주세요.')}<div class="puzzle-hud"><span>보류 <b>${sel.length}</b></span><span>계약 모델 <b>HS-20</b></span></div><div class="work-table">${manifestRows().map((r,i)=>`<button type="button" class="work-row ${sel.includes(i)?'hold':''}" onclick="workToggleHold(${i})"><span>${r.id}번</span><strong>라벨 ${r.label}</strong><small>${sel.includes(i)?'⏸ 보류':'탭하여 보류'}</small></button>`).join('')}</div><button type="button" class="btn outline small" onclick="workResetInspect()">표시 지우기</button>${workFoot(ok,'submitWorkInspect','inspect')}</div>`)}
function workResetInspect(){s.local.pick=[];s.local.feedback='';save();play()}
function workInspectHint(){s.local.tool=true;s.local.feedback=`${'ABCD'[manifestBad()]}번만 라벨이 달라요. 그 상자만 보류.`;save();play()}
function submitWorkInspect(){submitWorkFail(workInspectOk,()=>{const i=s.local.pick[0];finish(DEPT_STORIES[1][0],`${'ABCD'[i]}번 상자만 보류했습니다. 나머지는 통과 처리 예정입니다.`,{city:[1,0,0],energy:-1,bag:'보류 라벨 목록'},DEPTS[1].source)},()=>finish('라벨 보류 실수','보류 표시가 어긋났어요. 동료가 목록을 다시 대조했습니다.',{city:[0,0,0],energy:-2,trust:-1,bag:'검사 재대조 메모'},DEPTS[1].source))}
function departmentWorkStock(){
 const bundles=s.local.stockBundles??=Array(8).fill(-1);
 const totals=[0,0,0];
 bundles.forEach((bin,i)=>{if(bin>=0)totals[bin]+=STOCK_PIECES[i]});
 s.local.stock=totals;
 const renderPieces=bin=>bundles.map((place,i)=>place===bin?stockPiece(i,bin):'').join('');
 const remaining=100-totals.reduce((a,b)=>a+b,0);
 const missing=totals.map((n,i)=>[i,[40,25,10][i]-n]).filter(([,short])=>short>0);
 const status=missing.length?'더 필요한 물량 · '+missing.map(([i,short])=>['A공장','B공장','학교 예비'][i]+' '+short+'개').join(' · '):'세 곳의 최소 물량을 채웠어요. 창고에 '+remaining+'개를 남긴 채 보낼 수 있어요.';
 const bins=['A공장','B공장','학교 예비'].map((name,i)=>
  '<section class="stock-bin" data-stock-bin="'+i+'"><h3>'+name+'</h3><p>'+totals[i]+'개 · 최소 '+[40,25,10][i]+'개</p><div class="stock-pieces">'+renderPieces(i)+'</div><button class="btn outline small" onclick="moveStockPiece('+i+')" '+(s.local.stockSelected==null?'disabled':'')+'>여기에 담기</button></section>'
 ).join('');
 shell(title(deptChip(DEPTS[s.dept]),'비축 물량 나누기','한 칸은 5개입니다. 묶음을 끌어 원하는 칸에 놓으세요. 눌러서 옮겨도 돼요.')+
  '<div class="paper-body"><div class="stock-bin" data-stock-bin="-1"><h3>창고 · '+remaining+'개</h3><div class="stock-pieces">'+renderPieces(-1)+'</div><p class="hint">세 곳의 최소 물량만 채우면 나머지는 창고에 둬도 돼요. 15개 이상 남기면 돌발 상황에 쓸 수 있어요.</p></div><div class="stock-bins">'+bins+'</div><p class="stock-submit-status" role="status">'+status+'</p><div class="row"><button class="btn outline small" onclick="clearStockPieces()">다시 나누기</button><button class="btn" onclick="submitStock()" '+(stockOk()?'':'disabled')+'>이대로 보내기</button></div></div>');
}
const STOCK_PIECES=[20,20,15,15,10,10,5,5];
function stockPiece(i,bin){
 const n=STOCK_PIECES[i];
 return '<button type="button" class="stock-piece" data-stock-piece="'+i+'" aria-pressed="'+(s.local.stockSelected===i)+'" aria-label="'+n+'개 '+(bin<0?'묶음 선택':'창고로 돌려놓기')+'" onclick="pickStockPiece('+i+')"><span aria-hidden="true">'+ '■'.repeat(n/5)+'</span> '+n+'</button>';
}
function pickStockPiece(i){
 if(!isDeptWork()||s.dept!==2)return;
 if(s.local.stockBundles[i]<0)s.local.stockSelected=i;
 else{s.local.stockBundles[i]=-1;s.local.stockSelected=null}
 play();save();
}
function moveStockPiece(bin){
 if(!isDeptWork()||s.dept!==2||s.local.stockSelected==null)return;
 s.local.stockBundles[s.local.stockSelected]=bin;s.local.stockSelected=null;play();save();beep();
}
function clearStockPieces(){s.local.stockBundles.fill(-1);s.local.stockSelected=null;play();save()}
function workTestOk(){return s.local.pick.length===2&&s.local.pick.includes(0)&&s.local.pick.includes(2)}
function departmentWorkTest(){const ok=workTestOk();shell(title(deptChip(DEPTS[3]),DEPT_STORIES[3][0],'센서가 사람을 놓쳤던 두 조건을 골라 주세요.')+`<div class="paper-body paper-body-test">${talk(2,'지난 시험에서 센서가 사람을 놓쳤던 두 상황을 다시 만들어 볼까요?')}<div class="puzzle-hud"><span>선택 <b>${s.local.pick.length}/2</b></span></div>${testPickGrid('workPickTest')}${workFoot(ok,'submitWorkTest','test')}</div>`)}
function workPickTest(i){if(!isDeptWork())return;const a=s.local.pick,k=a.indexOf(i);if(k>=0)a.splice(k,1);else{if(a.length>=2)return toast('시험은 두 가지만 골라요.');a.push(i)}save();play();beep()}
function submitWorkTest(){submitWorkFail(workTestOk,()=>finish(DEPT_STORIES[3][0],'어두운 복도·짐 든 사람 조건을 다음 시험 일정에 넣었습니다.',{city:[0,0,2],energy:-1,bag:'복도 시험 일정'},DEPTS[3].source),()=>finish('시험 조건 누락','복도 조건을 빼먹었어요. 동료가 일정을 다시 잡았습니다.',{city:[0,0,1],energy:-2,trust:-1},DEPTS[3].source))}
const SPACE_TOTAL=60,SPACE_MIN=[22,20,18],SPACE_ZONES=['입구 대기','복도 유도','매표 근처'];
function workSpaceSum(){return(s.local.stock||[0,0,0]).reduce((a,b)=>a+b,0)}
function workSpaceOk(){const st=s.local.stock||[0,0,0];return st.every((v,i)=>v>=SPACE_MIN[i])&&workSpaceSum()===SPACE_TOTAL}
function workSpaceChecks(){const st=s.local.stock||[0,0,0];return SPACE_ZONES.map((n,i)=>({ok:st[i]>=SPACE_MIN[i],label:`${n} ${st[i]}/${SPACE_MIN[i]}㎡`}))}
function departmentWorkSpace(){if(!s.local.stock)s.local.stock=[20,20,20];const sum=workSpaceSum(),ok=workSpaceOk(),checks=workSpaceChecks();shell(title(deptChip(DEPTS[4]),DEPT_STORIES[4][0],`대기 공간 ${SPACE_TOTAL}㎡를 세 구역에 나눕니다.`) +`<div class="paper-body">${talk(0,'입구에서 기다리는 사람이 통로를 막지 않도록, 세 구역에 필요한 공간을 나눠 주세요.')}<div class="puzzle-hud stock-hud"><span>합계 <b class="${sum===SPACE_TOTAL?'':'path-over'}">${sum}/${SPACE_TOTAL}㎡</b></span></div><ul class="stock-checks">${checks.map(x=>`<li class="${x.ok?'ok':'bad'}">${x.ok?'✓':'○'} ${x.label}</li>`).join('')}</ul><div class="stock-rows">${SPACE_ZONES.map((name,i)=>`<div class="stock-row"><strong>${name}</strong><div class="stock-stepper"><button type="button" class="btn outline small" onclick="tweakWorkSpace(${i},-2)">−2</button><b>${s.local.stock[i]}</b><button type="button" class="btn outline small" onclick="tweakWorkSpace(${i},2)">+2</button></div></div>`).join('')}</div>${workFoot(ok,'submitWorkSpace','space')}</div>`)}
function tweakWorkSpace(i,d){if(!isDeptWork())return;s.local.stock??=[20,20,20];const n=s.local.stock[i]+d;if(n<0)return;const sum=s.local.stock.reduce((x,v,j)=>x+v+(j===i?d:0),0);if(sum>SPACE_TOTAL)return toast(`${SPACE_TOTAL}㎡를 넘을 수 없어요`);s.local.stock[i]=n;save();play();beep()}
function workSpaceHint(){s.local.feedback='예: 22 · 20 · 18 = 60. 입구를 가장 넓게.';s.local.tool=true;save();play()}
function submitWorkSpace(){submitWorkFail(workSpaceOk,()=>{const st=s.local.stock;finish(DEPT_STORIES[4][0],`대기 공간 ${st.join('/') }㎡로 재배치안을 넣었습니다.`,{city:[0,0,2],energy:-1,bag:'대기 면적 스케치'},DEPTS[4].source)},()=>finish('면적 배치 미달','최소 면적에 못 미쳤어요. 동료가 도면을 다시 잡았습니다.',{city:[0,0,1],energy:-2,trust:-1,bag:'대기 면적 메모'},DEPTS[4].source))}
const FAQ_ITEMS=[
 {q:'버튼이 너무 많아요',options:['자주 쓰는 기능만 앞에 두기','버튼을 더 작게 만들기','메뉴를 한 줄 더 추가하기'],a:0},
 {q:'예약 취소가 안 돼요',options:['취소 안내 문구만 굵게 쓰기','첫 화면 배너 바꾸기','취소 오류를 고치고 직접 취소해 보기'],a:2},
 {q:'어디를 눌러야 하나요?',options:['버튼을 같은 색으로 맞추기','예약 바로가기를 눈에 띄게 표시하기','예약을 안내 메뉴 안에 넣기'],a:1}
];
function assignFaq(i,p){if(!isDeptWork())return;s.local.order??=[];while(s.local.order.length<3)s.local.order.push(null);s.local.order[i]=Number(p);save();play();beep()}
function departmentWorkFaq(){
 const at=FAQ_ITEMS.findIndex((_,i)=>!Number.isInteger(s.local.order[i]));
 const item=FAQ_ITEMS[at];
 const content=item
  ? '<div class="call-card"><span class="label">문의 '+(at+1)+' / '+FAQ_ITEMS.length+'</span><h3>'+item.q+'</h3></div><div class="choice-stack">'+item.options.map((option,i)=>choice(option,'','assignFaq('+at+','+i+')')).join('')+'</div>'
  : '<p>문의 세 건의 조치안을 정했어요.</p><button class="btn full" onclick="submitWorkFaq()">업무 마치기</button>';
 shell(title(deptChip(DEPTS[5]),'문화관 예약 문의','이용자가 겪은 불편을 보고 해결 방법을 골라 주세요.')+'<div class="paper-body">'+content+'</div>');
}
function submitWorkFaq(){
 if(!isDeptWork()||s.dept!==5||!FAQ_ITEMS.every((_,i)=>Number.isInteger(s.local.order[i])))return;
 const outcomes=['자주 쓰는 버튼이 앞에 보이게 됐어요.','이용자가 직접 예약을 취소할 수 있게 됐어요.','예약 바로가기를 쉽게 찾을 수 있게 됐어요.'];
 const fixed=outcomes.filter((_,i)=>s.local.order[i]===FAQ_ITEMS[i].a);
 const count=fixed.length;
 const text=(fixed.join(' ')+' '+(count<3?'해결하지 못한 문의 '+(3-count)+'건은 추가 점검이 필요해요.':'')).trim();
 finish('예약 문의 해결 '+count+'/3',text,{city:[0,0,count===3?2:count>0?1:0],trust:count===3?2:0,energy:-1,bag:count===3?'예약 화면 점검 메모':undefined},DEPTS[5].source);
}
const STOCK_TOTAL=100,STOCK_RESERVE=15;
const STOCK_SITES=['A공장 (급함)','B공장','학교 예비'];
function stockRemainder(){const st=s.local.stock;if(!st)return STOCK_TOTAL;return STOCK_TOTAL-st.reduce((a,b)=>a+b,0)}
function stockChecks(){const [a,b,c]=s.local.stock||[0,0,0];return [{ok:a>=40,label:`A공장 ${a}/40 이상`},{ok:b>=25,label:`B공장 ${b}/25 이상`},{ok:c>=10,label:`학교 ${c}/10 이상`}]}
function stockOk(){return stockChecks().every(x=>x.ok)}
function stockIssueText(){return stockChecks().filter(x=>!x.ok).map(x=>x.label).join(' · ')}

function submitStock(){if(s.step!==4||s.phase!=='play')return;if(stockOk()){const [a,b,c]=s.local.stock;s.flags.stockReady=stockRemainder()>=STOCK_RESERVE;finish('비축 물량 배분',`A공장 ${a} · B공장 ${b} · 학교 예비 ${c} · 창고 ${stockRemainder()}개. 급한 곳부터 차례대로 보냈습니다.`,{city:[0,2,0],energy:-1,bag:'배분 표'},DEPTS[2].source);return}s.local.tries=(s.local.tries||0)+1;if(s.local.tries<2){s.local.feedback=`✕ ${stockIssueText()} — 한 번 더 맞춰 보세요.`;save();play();beep();return}finish('창고 비축이 부족했습니다',`${stockIssueText()}. 동료가 창고·공장 일정을 급히 다시 맞췄습니다.`,{city:[0,1,0],energy:-2,trust:-1,bag:'배분 표'},DEPTS[2].source)}

function miniIntro(k){return {kit:'운동장에 보낼 물건을 예산 안에서 고릅니다.',inspect:'상자 라벨을 열어 계약 모델과 맞는지 확인합니다.',route:'창고에서 공장까지 막힌 구간을 피해 경로를 잇습니다.',test:'센서가 사람을 놓쳤던 두 조건을 골라 주세요.',path:'입구에서 홀까지 10칸 이내, 기둥을 피해 동선을 잇습니다.',order:'지난 소식은 접고, 첫 화면에 예약 바로가기를 만드세요.'}[k]}
function miniFailRules(){return s.local.tries?s.local.tries<2?'<p class="hint">한 번 더 시도할 수 있어요. 두 번째 실패 시 동료가 마무리합니다.</p>':'':''}
function miniHintBtn(){return s.local.tries?`<button class="log-btn" onclick="puzzleHint()">다시 시도 — 정답 힌트 보기</button>`:''}
function mini(){const d=DEPTS[departmentForMini()];const partner=s.step===4&&s.dept===s.first;let content='';if(d.kind==='kit')content=kit();if(d.kind==='inspect')content=inspect();if(d.kind==='route')content=route();if(d.kind==='test')content=testLab();if(d.kind==='path')content=pathGame();if(d.kind==='order')content=orderGame();const bodyCls=d.kind==='test'?'paper-body paper-body-test':'';shell(title(partner?'협업 퍼즐':`${MINI_TAG[d.kind]}`,miniTitle(d.kind),partner?'옆 부서 부탁':'')+`<div class="${bodyCls||'paper-body'}"><p class="puzzle-goal puzzle-goal-prominent">${miniIntro(d.kind)}</p>${content}${s.local.feedback?`<div class="feedback puzzle-feedback" role="status">${s.local.feedback}</div>`:''}${miniFailRules()}${miniHintBtn()}${s.local.tries>=2?'<button class="btn outline small" onclick="teamFinish()">동료 합동 마무리 →</button>':''}</div>`)}
function miniTitle(k){return {kit:'운동장 안내 준비',inspect:'상자 라벨이 하나 이상해요',route:'침수를 피해 공장까지',test:'복도에서 센서 다시 시험하기',path:'이 길로 들어갈 수 있을까요',order:'예약 버튼을 찾기 쉽게'}[k]}
const SUPPLIES=[{name:'방수 덮개',cost:2,tags:['비'],icon:'☂'},{name:'보조 전원',cost:3,tags:['전원'],icon:'ϟ'},{name:'안내 스피커',cost:2,tags:['안내'],icon:'◖'},{name:'대형 화면',cost:5,tags:['안내'],icon:'▣'},{name:'장식 조명',cost:2,tags:['장식'],icon:'✧'},{name:'다기능 안내함',cost:4,tags:['안내','비'],icon:'▤'}];
function kit(){const items=s.local.pick.map(i=>SUPPLIES[i]),cost=items.reduce((a,b)=>a+b.cost,0);return `${talk(2,'개학 안내를 운동장에서 한대요. 비를 막을 덮개, 전원, 안내 방송이 필요해요. 예산 7 안에서 세 가지를 모두 챙겨 볼까요?')}<div class="puzzle-hud"><span>예산 <b>${cost}/7</b></span><span>품목 <b>${items.length}/3</b></span><span>${['비','전원','안내'].map(x=>`<i class="need ${items.some(v=>v.tags.includes(x))?'met':''}">${x}</i>`).join('')}</span></div>${pixelKitPreview()}<div class="supply-grid">${SUPPLIES.map((x,i)=>{const sel=s.local.pick.includes(i),over=!sel&&cost+SUPPLIES[i].cost>7;return `<button class="supply ${sel?'selected':''}" aria-pressed="${sel}" onclick="pick(${i},3,7)" ${over?'disabled':''}><b>${pixelIcon(['cover','power','speaker','screen','light','building'][i])}</b><strong>${SUPPLIES[i].name}</strong><small>${SUPPLIES[i].tags.join(' · ')} · ${SUPPLIES[i].cost}</small></button>`}).join('')}</div><button class="btn full" onclick="checkMini()">이렇게 보내기 →</button><p class="hint">이야기용 예산이에요. 실제 조달 절차와는 다릅니다.</p>`}
const BOXES=[{label:'A',model:'HS-20',limit:'정상',detail:'모델 HS-20 · 방수 패킹 있음 · 시험 대상 HS-20'}, {label:'B',model:'HS-20',limit:'정상',detail:'모델 HS-20 · 방수 패킹 있음 · 시험 대상 HS-20'}, {label:'C',model:'HS-20',limit:'확인 필요',detail:'모델 HS-20 · 방수 패킹 있음 · 시험 대상 HS-10'}, {label:'D',model:'HS-20',limit:'정상',detail:'모델 HS-20 · 방수 패킹 있음 · 시험 대상 HS-20'}];
function badBox(){return s.seed%4}
function boxInfo(i){return BOXES[i===badBox()?2:0]}
function inspect(){return `<div class="inspection-game">${talk(0,'계약한 센서는 HS-20이에요. 상자의 모델명과 시험 자료가 같은 제품인지 비교해 주세요.')}<div class="inspection-contract"><span>계약 모델</span><strong>HS-20</strong><span>네 상자를 열어 시험 대상까지 확인하세요.</span></div><div class="box-grid">${[0,1,2,3].map(i=>{const open=s.local.open.includes(i),selected=s.local.selected===i;return `<button type="button" class="parcel ${open?'opened':''} ${selected?'inspection-selected':''}" onclick="${open?'selectBox':'openBox'}(${i})" aria-pressed="${selected}"><span class="inspection-card-top"><b>${'ABCD'[i]}번 상자</b>${pixelIcon('box')}</span>${open?`<span class="inspection-line"><span>제품 모델</span><strong>HS-20</strong></span><span class="inspection-line"><span>시험 대상</span><strong>${i===badBox()?'HS-10':'HS-20'}</strong></span><span class="inspection-seal">방수 패킹 있음</span><span class="inspection-pick">${selected?'✓ 추가 확인 대상으로 선택':'이 상자를 추가 확인하기'}</span>`:'<strong class="inspection-unopened">라벨 열어보기</strong><span class="inspection-seal">눌러서 제품·시험 자료 확인</span>'}</button>`}).join('')}</div><button class="btn full" onclick="checkMini()" ${s.local.selected===null?'disabled':''}>${s.local.selected===null?'다른 시험 자료가 든 상자를 고르세요':'선택한 '+ 'ABCD'[s.local.selected]+'번 상자 확인 요청'}</button><p class="hint">열린 상자를 다시 누르면 선택됩니다. 제출 전에는 바꿀 수 있어요.</p></div>`}

function openBox(i){if(!isMini()||departmentForMini()<0)return;if(!s.local.open.includes(i))s.local.open.push(i);save();play();beep()}
function selectBox(i){if(!isMini())return;s.local.selected=i;save();play()}
const ROUTE_PUZZLE={blocks:[3,6,8,11,18],n:20,cols:5,start:0,goal:19,maxLen:9};
function pathTileKey(e,i,cols){
 const directions={ArrowUp:-cols,ArrowDown:cols,ArrowLeft:-1,ArrowRight:1};
 if(e.key==='Enter'||e.key===' '){e.preventDefault();walk(i);document.querySelector('.path-draw [data-cell="'+i+'"]')?.focus();return}
 if(!(e.key in directions))return;e.preventDefault();
 const from=s.local.path.at(-1),to=from+directions[e.key];walk(to);
 document.querySelector('.path-draw [data-cell="'+s.local.path.at(-1)+'"]')?.focus();
}
function routeTileHtml(i,opts){
 const blocked=opts.blocks.includes(i),idx=s.local.path.indexOf(i),active=idx>=0,current=i===s.local.path.at(-1),indoor=!!opts.boardClass;
 const adjacent=!blocked&&!active&&Math.abs(Math.floor(i/opts.cols)-Math.floor(s.local.path.at(-1)/opts.cols))+Math.abs(i%opts.cols-s.local.path.at(-1)%opts.cols)===1;
 let lines='';if(active)for(const neighbor of [s.local.path[idx-1],s.local.path[idx+1]]){if(neighbor===undefined)continue;const dx=neighbor%opts.cols-i%opts.cols,dy=Math.floor(neighbor/opts.cols)-Math.floor(i/opts.cols);lines+=`<path d="M16 16L${16+dx*16} ${16+dy*16}"/>`}
 const name=blocked?(indoor?'기둥':'침수'):i===opts.start?(indoor?'입구':'창고'):i===opts.goal?(indoor?'홀':'공장'):current?'현재 위치':active?'연결된 길':adjacent?'이동 가능':'빈 길';
 const icon=blocked?(indoor?'pillar':'water'):current?(indoor?'person':'truck'):i===opts.start||i===opts.goal?'building':null;
 return `<div role="button" tabindex="${blocked?'-1':'0'}" aria-disabled="${blocked}" class="route-tile pixel-tile ${blocked?'blocked':''} ${active?'active':''} ${current?'current':''} ${adjacent?'reachable':''}" data-cell="${i}" onclick="walk(${i})" onkeydown="pathTileKey(event,${i},${opts.cols})" aria-label="${Math.floor(i/opts.cols)+1}행 ${i%opts.cols+1}열, ${name}"><svg class="tile-road" viewBox="0 0 32 32" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>${icon?pixelIcon(icon):'<span class="tile-grass" aria-hidden="true"></span>'}<small>${name==='빈 길'||name==='연결된 길'||name==='이동 가능'?'':name}</small></div>`;
}
function routeBoardHtml(opts){const arrived=s.local.path.at(-1)===opts.goal;return `<div class="pixel-map-shell ${opts.boardClass?'indoor-map':''}"><div class="pixel-map-heading"><span>${opts.boardClass?'문화관 · 동선 설계':'산업단지 · 운송 경로'}</span><strong role="status">${arrived?'도착! 경로를 제출하세요':s.local.path.length+'칸 연결'}</strong></div><div class="route-board ${opts.boardClass||''} path-draw pixel-board" style="--map-cols:${opts.cols}" oncontextmenu="return false">${Array.from({length:opts.n},(_,i)=>routeTileHtml(i,opts)).join('')}</div><p class="pixel-map-key">${opts.boardClass?'사람':'트럭'} 옆의 밝은 칸으로 이동 · 방향키 지원 · 이전 칸으로 되돌리기</p></div>`}

function route(){return `${talk(1,'침수 칸을 피해 창고에서 공장까지 이어 주세요. 출발 칸을 포함해 9칸까지 쓸 수 있어요.')}<div class="compact-route">${routeBoardHtml(ROUTE_PUZZLE)}</div><div class="row"><button class="btn outline small" onclick="resetPuzzle()">다시 그리기</button><button class="btn" onclick="checkMini()" ${s.local.path.length<2?'disabled':''}>이 경로로 넘기기 →</button></div>`}
const TESTS=[{name:'어두운 복도',tag:'조명',desc:'불이 약할 때도 안내가 맞게 나오는지',icon:'🌙'},{name:'빠르게 지나가기',tag:'속도',desc:'서두르는 사람을 놓치지 않는지',icon:'🏃'},{name:'짐 든 사람',tag:'짐',desc:'손에 물건이 있어도 사람으로 인식하는지',icon:'🎒'},{name:'밝고 한산한 곳',tag:'조명',desc:'조명이 밝고 통행이 적을 때 작동하는지',icon:'💡'}];
function testPickGrid(fn){return `<div class="supply-grid supply-grid-test">${TESTS.map((x,i)=>`<button type="button" class="supply supply-test-card ${s.local.pick.includes(i)?'selected':''}" onclick="${fn}(${i})" aria-pressed="${s.local.pick.includes(i)}"><span class="supply-test-icon" aria-hidden="true">${pixelIcon(['moon','person','bag','light'][i])}</span><strong>${x.name}</strong><small>${x.desc}</small></button>`).join('')}</div>`}
function testLab(){return `${talk(2,'복도가 어두울 때랑 사람이 큰 짐을 들고 지나갈 때 센서가 반응하지 않았어요. 그 두 상황을 다시 시험해 볼까요?')}${testPickGrid('pickTestMini')}<p class="hint test-scene-hint">${s.local.pick.length}/2개 선택</p><button class="btn full" onclick="checkMini()" ${s.local.pick.length!==2?'disabled':''}>선택한 조건으로 시험하기</button>`}
function pickTestMini(i){pick(i,2)}
const PLAN_PUZZLE={cols:6,rows:5,blocks:[1,2,7,8,9,13,14,15,16,21,22],start:0,maxLen:10};
function planGoal(){return PLAN_PUZZLE.cols*PLAN_PUZZLE.rows-1}
function planBlocked(i){return PLAN_PUZZLE.blocks.includes(i)}
function pathStepOk(){return s.local.path.length<=PLAN_PUZZLE.maxLen}
function pathGame(){const goal=planGoal(),len=s.local.path.length,over=len>PLAN_PUZZLE.maxLen;return `${talk(0,'문화관 입구에서 홀까지 길을 만들어 주세요. 기둥은 옮길 수 없고, 입구를 포함해 10칸까지 쓸 수 있어요.')}<div class="puzzle-hud"><span>이동 <b class="${over?'path-over':len===PLAN_PUZZLE.maxLen?'path-tight':''}">${len}/${PLAN_PUZZLE.maxLen}</b>칸</span><span>기둥 ${PLAN_PUZZLE.blocks.length}개</span></div><p class="hint">입구에서 <b>끌어</b> 그리면 연속으로 칸이 잡힙니다. 한 칸씩 눌러도 됩니다.</p>${routeBoardHtml({blocks:PLAN_PUZZLE.blocks,n:goal+1,cols:PLAN_PUZZLE.cols,start:PLAN_PUZZLE.start,goal,boardClass:'blueprint plan-wide',render:(i,m)=>`<span>${i===PLAN_PUZZLE.start?'↗':i===goal?'▣':m.blocked?'■':m.active?'●':'·'}</span><small>${i===PLAN_PUZZLE.start?'입구':i===goal?'홀':m.blocked?'기둥':''}</small>`})}<p class="hint">입구 포함 10칸 · ${over?'<strong>10칸 초과 — 다시 그려야 해요</strong>':'10칸 넘기면 제출 불가'} · 길은 여러 가지가 됩니다.</p><div class="row"><button class="btn outline small" onclick="resetPuzzle()">다시 그리기</button><button class="btn" onclick="checkMini()" ${len<2?'disabled':''}>이 동선으로 넘기기 →</button></div>`}
function orderGame(){
 const hidden=s.local.order;
 const labels=['지난 공지','행사 사진','이용 안내'];
 const controls=labels.map((label,i)=>'<button class="btn outline small" aria-pressed="'+hidden.includes(i)+'" onclick="orderPick('+i+')">'+label+(hidden.includes(i)?' 다시 보이기':' 접기')+'</button>').join('');
 return talk(1,'예약 화면에 버튼이 너무 많아 쓰기 어렵대요. 이용 안내는 남겨 두고, 예약 버튼을 찾기 쉽게 배치해 볼까요?')+
 webMock('모아문화관 예약',labels.filter((_,i)=>!hidden.includes(i)).concat(hidden.includes(4)?['메뉴 › 예약']:[]),hidden.includes(3)?'예약 바로가기':'')+
 '<div class="row">'+controls+'</div><p>예약 버튼을 어디에 놓을까요?</p><div class="row"><button class="btn outline" aria-pressed="'+hidden.includes(3)+'" onclick="orderPick(3)">첫 화면에 배치</button><button class="btn outline" aria-pressed="'+hidden.includes(4)+'" onclick="orderPick(4)">메뉴 안에 배치</button></div><button class="btn full" onclick="checkMini()" '+(!hidden.includes(3)&&!hidden.includes(4)?'disabled':'')+'>이 화면으로 저장</button>';
}
function isMini(){return s?.phase==='play'&&s.step===2}
function pick(i,max,budget=0){if(s.phase!=='play')return;const a=s.local.pick,k=a.indexOf(i);if(k>=0){a.splice(k,1);save();play();beep();return}if(a.length>=max)return toast(`최대 ${max}개까지 선택할 수 있어요. 먼저 하나를 빼 주세요.`);if(budget){const costs=s.step===2&&DEPTS[departmentForMini()].kind==='kit'?SUPPLIES.map(x=>x.cost):OPS.map(x=>x.cost);const spent=a.reduce((x,j)=>x+costs[j],0);if(spent+costs[i]>budget)return toast(`예산 ${budget}까지예요. 다른 항목을 빼거나 더 가벼운 걸 골라 주세요.`)}a.push(i);save();play();beep()}
function pathPuzzleConfig(){const k=DEPTS[departmentForMini()].kind;if(k==='route')return ROUTE_PUZZLE;if(k==='path')return {blocks:PLAN_PUZZLE.blocks,n:planGoal()+1,cols:PLAN_PUZZLE.cols,start:PLAN_PUZZLE.start,maxLen:PLAN_PUZZLE.maxLen};return null}
function stepPathCell(i,quiet){if(!isMini())return false;const cfg=pathPuzzleConfig();if(!cfg)return false;const {blocks,n,cols,start,maxLen}=cfg,a=s.local.path;if(i<0||i>=n||blocks.includes(i))return false;if(!a.length){if(i!==start)return quiet?false:(toast('입구에서 시작해 주세요.'),false);a.push(i);return true}const prev=a.at(-1);if(a.length>1&&i===a.at(-2)){a.pop();return true}if(a.includes(i))return false;if(Math.abs(Math.floor(i/cols)-Math.floor(prev/cols))+Math.abs(i%cols-prev%cols)!==1)return quiet?false:(toast('바로 옆 칸만 이을 수 있어요.'),false);a.push(i);if(a.length>maxLen){a.pop();return quiet?false:(toast('허용 칸 수를 넘었어요. 이전 칸으로 되돌려 보세요.'),false)}return true}
function walk(i){if(stepPathCell(i)){save();play();beep()}}
function pathCellFromPoint(x,y){return document.elementFromPoint(x,y)?.closest?.('.path-draw [data-cell]')}
function pathApplyAt(i){const cfg=pathPuzzleConfig();if(!cfg||cfg.blocks.includes(i))return;if(!s.local.path.length){if(i!==cfg.start){toast('입구에서 시작해 주세요.');return}s.local.path=[i]}else if(!stepPathCell(i,true))return;save();play()}
function onPathPointerDown(e){if(e.button!==undefined&&e.button!==0)return;const tile=e.target.closest?.('.path-draw [data-cell]');if(!tile||!isMini()||tile.classList.contains('blocked'))return;pathDrag=true;pathDragId=e.pointerId;if(tile.setPointerCapture)tile.setPointerCapture(e.pointerId);e.preventDefault();pathApplyAt(Number(tile.dataset.cell))}
function onPathPointerMove(e){if(!pathDrag||e.pointerId!==pathDragId)return;const tile=pathCellFromPoint(e.clientX,e.clientY);if(!tile||tile.classList.contains('blocked'))return;const i=Number(tile.dataset.cell);if(stepPathCell(i,true)){save();play()}}
function pathPointerUp(e){if(e?.pointerId!==undefined&&pathDragId!==null&&e.pointerId!==pathDragId)return;pathDrag=false;pathDragId=null}
function orderPick(i){if(!isMini()||DEPTS[s.dept].kind!=='order')return;const picks=s.local.order;if(i>=3)s.local.order=picks.filter(n=>n<3).concat(i);else if(picks.includes(i))s.local.order=picks.filter(n=>n!==i);else picks.push(i);save();play();beep()}
function resetPuzzle(){s.local.pick=[];s.local.path=[0];s.local.order=[];s.local.feedback='';save();play()}
function miniCheck(){const k=DEPTS[departmentForMini()].kind,l=s.local;if(k==='kit'){const x=l.pick.map(i=>SUPPLIES[i]);return x.length<=3&&x.reduce((a,b)=>a+b.cost,0)<=7&&['비','전원','안내'].every(tag=>x.some(v=>v.tags.includes(tag)))}if(k==='inspect')return l.selected===badBox();if(k==='route')return l.path.at(-1)===ROUTE_PUZZLE.goal&&l.path.length<=ROUTE_PUZZLE.maxLen;if(k==='test')return l.pick.length===2&&l.pick.includes(0)&&l.pick.includes(2);if(k==='path')return l.path.at(-1)===planGoal()&&l.path.length<=PLAN_PUZZLE.maxLen;if(k==='order')return l.order.length===3&&[0,1,3].every(i=>l.order.includes(i));return false}
function checkMini(){if(!isMini())return;if(miniCheck()){const g=miniGrade();s.local.feedback=`✓ ${g}`;if(miniGradeCode()==='S')toastWin(g);else toast(g);save();return completeMini(false)};const id=departmentForMini(),k=DEPTS[id].kind;const reasons={kit:'예산 7 · 비·전원·안내 태그',inspect:'HS-10 라벨 찾기',route:'침수 피해 공장까지',test:'어두운 복도 + 짐 든 사람',path:'10칸 이내 입구→홀 · 기둥 회피',order:s.local.order.includes(2)?'이용 안내도 접혀 있어요. ‘이용 안내 다시 보이기’를 눌러 주세요.':'지난 공지와 행사 사진만 접고, 첫 화면에 예약 버튼을 배치해 주세요.'};s.local.tries++;if(s.local.tries<2){s.local.feedback=`✕ ${reasons[k]} — 한 번 더!`;save();play();beep();return}if(k==='order')return completeMini(true);finish('동료와 다시 점검했어요',reasons[k]+' · 동료 합동 마무리.',{energy:-2,trust:-1,flag:'rework'},DEPTS[id].source)}

function puzzleHint(){if(!isMini())return;const k=DEPTS[departmentForMini()].kind;const hints={kit:'보조 전원이랑 다기능 안내함 같이 고르면, 비·전원·안내를 7 안에 맞출 수 있어요.',inspect:`${'ABCD'[badBox()]}번 상자 라벨을 다시 봐요. 시험 대상 모델이 달라요.`,route:'창고에서 오른쪽으로 두 칸 간 뒤 아래쪽 길을 살펴보세요.',test:'어두운 복도랑 짐 든 사람, 이 둘 골라 보세요.',path:'기둥 띠를 위나 아래로 우회해 홀까지 이으면 됩니다. 10칸 안이면 OK.',order:'지난 공지와 행사 사진만 접으세요. 이용 안내는 남기고 예약 버튼은 첫 화면에 놓으세요.'};s.local.tool=true;s.local.feedback=hints[k];save();play()}
function teamFinish(){if(!isMini()||s.local.tries<2)return;completeMini(true)}
const DEPT_HANDOFFS=[
 '운동장에 보낼 장비 목록을 납품검사과에 넘겼어요.',
 '검사를 마친 물품 목록을 전략비축물자과에 전달했어요.',
 '대체 운송 일정을 혁신공공구매과에 알려 현장 시험 시간을 맞췄어요.',
 '시험 중 확인한 통행 불편을 설계예산검토과에 전달했어요.',
 '정리한 문화관 동선을 정보기술계약과에 보내 예약 안내에 반영하도록 했어요.',
 '예약 화면에 넣을 현장 안내 내용을 전기전자구매과와 맞췄어요.'
];
function completeMini(assisted){const id=departmentForMini(),d=DEPTS[id],box='ABCD'[badBox()],city=[0,0,0];const bump=assisted?1:miniGradeCode()==='S'?2:1;city[id===2?1:id===4||id===5?2:0]=bump;const grade=assisted?'F':miniGradeCode();finish(miniResultTitle(d.kind,assisted),miniResultText(d.kind,assisted,box)+(assisted?'':' '+DEPT_HANDOFFS[id]),{energy:-1,trust:assisted?1:0,city,flag:'mini'+id,miniGrade:grade,bag:id===2?'여유 물량':id===1?'검사 체크 노트':id===3?'현장 실험 노트':undefined},d.source)}
const LUNCH_SPOTS=[
 {name:'시장 분식집',food:'떡볶이와 김밥',art:'speaker',tone:'#ba674a',teaser:'장을 보러 나온 동네 손님이 많아요.'},
 {name:'골목 중국집',food:'짜장면',art:'box',tone:'#966347',teaser:'잠깐 쉬면서 오후에 볼 일을 정리해요.'},
 {name:'산업단지 국밥집',food:'따뜻한 국밥',art:'building',tone:'#538273',teaser:'옆 부서 직원들도 자주 오는 곳이에요.'}
];
function lunch(){
 const cards=LUNCH_SPOTS.map((spot,i)=>'<button type="button" class="lunch-place" onclick="lunchChoice('+i+')">'+pixelIcon(spot.art,spot.tone)+'<strong>'+spot.name+'</strong><span>'+spot.food+'</span><small>'+spot.teaser+'</small></button>').join('');
 shell(title(deptChip(DEPTS[s.dept]),'점심 시간','')+'<div class="paper-body lunch-body">'+talk(1,'오전 일도 끝났는데, 점심은 어디서 먹을까요?')+'<div class="lunch-places">'+cards+'</div></div>');
}

function lunchChoice(i){const o=lunchDeptOpts()[i];if(!o)return;const fx={...o.effect};if(fx.bag&&s.bag.includes(fx.bag)){delete fx.bag;fx.trust=(fx.trust||0)+1}finish(LUNCH_SPOTS[i].name,['옆자리 손님이 현장에서 겪은 불편을 들려줬어요. ','짜장면 한 그릇 먹고 잠깐 숨을 돌렸어요. ','같은 식당에 온 다른 부서 직원과 이야기를 나눴어요. '][i]+o.text,fx,11)}
function transfer(){s.dept=s.first;s.route=[{dept:s.first,day:1}];s.phase='play';s.local=blank();eventOpen=true;save();render()}
function moveDept(){if(s.phase==='transfer')transfer()}
function hasReserveStock(){return s.dept===2&&s.step===5&&typeof s.flags.stockReady==='boolean'?s.flags.stockReady:s.bag.includes('여유 물량')}
const NOTICE_RESPONSES=[
 {label:'변경 일정을 확인하고 두 화면을 함께 고친다',hint:'홈페이지와 예약 화면을 모두 수정 · 남은 힘 −2',title:'변경 일정 안내 완료',text:'문화관 담당자에게 새 날짜를 확인했어요. 홈페이지 첫 화면과 예약 화면에 같은 날짜를 올려 방문객이 헛걸음하지 않게 했습니다.',city:3,energy:-2},
 {label:'첫 화면에 일정 변경 안내부터 올린다',hint:'변경 사실을 먼저 알림 · 남은 힘 −1',title:'홈페이지에 변경 안내 게시',text:'홈페이지에서 일정이 바뀐 사실을 확인할 수 있어요. 예약 화면의 날짜는 담당자가 확인한 뒤 바꾸기로 했습니다.',city:2,energy:-1},
 {label:'예약자에게 먼저 연락하고 화면 수정은 맡긴다',hint:'이미 예약한 사람에게 먼저 안내',title:'예약자에게 먼저 연락',text:'기존 예약자에게 변경 사실을 알렸어요. 처음 방문하는 사람도 새 날짜를 볼 수 있도록 홈페이지 수정은 운영팀에 요청했습니다.',city:1,energy:0}
];
function noticeCrisis(){
 shell(title(deptChip(DEPTS[5]),'홈페이지에 남은 예전 일정','문화관 일정 변경 · 어디부터 안내할까요?')+
 '<div class="paper-body">'+talk(0,deptProf().crisisLead)+webMock('모아문화관 홈페이지',['개관 안내 · 변경 전 일정','예약 확인'])+
 '<div class="choice-stack">'+NOTICE_RESPONSES.map((o,i)=>choice(o.label,o.hint,'crisisChoice('+i+')')).join('')+'</div></div>');
}
const DEPT_WEATHER=[
 ['비를 피할 설치 장소 찾기','운동장의 안내 장비가 비를 맞을 수 있어요. 장비를 어디서부터 쓸 수 있게 할까요?',
  ['학교와 공장의 설치 장소 확인','두 현장 담당자와 실내 설치 위치를 확인해 장비가 도착하면 바로 설치할 수 있게 했어요.'],
  ['공장 장비부터 설치팀과 조율','공장에 설치팀을 먼저 보냈어요. 학교 장비는 다음 가능한 시간을 잡았습니다.'],
  ['학교 방송 장비를 실내로 옮기기','학교는 현관 안쪽에서 안내 방송을 할 수 있게 됐어요. 공장 설치는 다음 일정으로 남겼습니다.']],
 ['검사 장소 다시 잡기','비 때문에 야외에서 물품을 검사하기 어려워졌어요. 어디부터 검사할까요?',
  ['두 현장의 실내 검사 장소 확보','학교와 공장에서 비를 피할 장소를 찾아 검사를 이어 갔어요.'],
  ['공장에 도착한 물품부터 검사','검사 인력을 공장에 먼저 보내 도착한 물품을 확인했어요.'],
  ['학교 물품부터 실내에서 검사','학교 담당자와 장소를 맞춰 물품을 검사했어요. 공장 검사는 다음 일정에 잡았습니다.']],
 ['물량을 보낼 길 다시 찾기','비로 운송로가 막혔어요. 남은 물량을 어디부터 보낼까요?',
  ['확인해 둔 우회도로로 두 곳에 배송','운송 담당자와 우회도로를 확인해 학교와 공장에 물량을 보냈어요.'],
  ['창고 물량을 공장에 먼저 공급','창고 물량과 운송 일정을 맞춰 공장에 먼저 보냈어요.'],
  ['학교 물품부터 배송 일정 잡기','개학에 필요한 학교 물품부터 배송 일정을 잡았어요. 공장 물량은 다음 차편을 확인합니다.']],
 ['현장 시험 일정 조정','비 때문에 예정된 시험 장소를 쓰기 어려워졌어요. 어디부터 다시 시험할까요?',
  ['학교와 공장에서 실내 시험 진행','현장 메모를 보고 실제 사용 조건과 비슷한 실내 장소를 찾아 두 곳의 시험을 이어 갔어요.'],
  ['공장 센서를 먼저 시험','공장 담당자와 시간을 맞춰 센서가 작업 환경에서 제대로 반응하는지 확인했어요.'],
  ['학교 복도에서 안내 장비 시험','학교 복도에서 조명과 통행 조건을 바꿔 시험했어요. 공장 시험은 다음 일정에 잡았습니다.']],
 ['비 오는 날의 출입 동선','비 때문에 바깥 통로가 막혔어요. 사람들이 안전하게 오갈 길을 어디부터 확인할까요?',
  ['학교와 공장의 우회 동선 확인','답사 때 남긴 메모를 꺼내 학교와 공장에서 이용할 수 있는 우회 통로를 확인했어요.'],
  ['공장 실내 통로부터 확인','작업자와 함께 공장 통로를 걸어 보고 출입 안내를 바꿨어요.'],
  ['학교 대체 출입구 안내','학생과 보호자가 들어올 수 있는 다른 출입구를 확인하고 학교에 알렸어요.']]
];
function crisis(){
 if(s.dept===5)return noticeCrisis();
 const [heading,lead,...actions]=DEPT_WEATHER[s.dept];
 const covered=s.flags.rain||s.flags.harbor,help=hasReserveStock()||s.trust>=4;
 const hints=[covered?'학교·공장 준비 개선 · 남은 힘 −2':'학교 우천 메모 또는 우회 연락처 필요',help?'공장 준비 개선 · 동료 도움 −1':'비축 물량 또는 동료 도움 4 필요','학교 준비 개선 · 남은 힘 +1'];
 shell(title(deptChip(DEPTS[s.dept]),heading,'비로 바뀐 현장 일정')+
  '<div class="paper-body">'+talk(0,lead)+'<div class="choice-stack">'+actions.map(([label],i)=>choice(label,hints[i],'crisisChoice('+i+')',i===0&&!covered||i===1&&!help)).join('')+'</div></div>');
}
function crisisChoice(i){
 if(s.phase!=='play'||s.step!==5)return;
 if(s.dept===5){const o=NOTICE_RESPONSES[i];if(o)finish(o.title,o.text,{city:[0,0,o.city],energy:o.energy},5);return}
 if(i===0&&!(s.flags.rain||s.flags.harbor))return;
 if(i===1&&!hasReserveStock()&&s.trust<4)return;
 const action=DEPT_WEATHER[s.dept][i+2];
 const effect=[{city:[2,1,0],energy:-2,flag:'resilient'},{city:[0,3,0],trust:-1,flag:'resilient'},{city:[3,0,0],energy:1,flag:'phased'}][i];
 if(action&&effect)finish(action[0],action[1],effect,DEPTS[s.dept].source);
}
const DESKS=['벤처나라·판로 안내','공공조달 길잡이 상담','해외조달시장 진출 지원'];
const DESK_SHORT=['① 나라장터·벤처','② 길잡이·상담 예약','③ 해외·G-PASS'];
const DESK_NOTE=['스타트업·벤처 등록·공공 쇼핑몰','조달 절차·상담 예약·제도 안내','G-PASS·해외 공공시장'];
const DESK_EXAMPLES=['나라장터 · 벤처나라','길잡이 · 상담 예약','G-PASS · 해외 수출'];
function deptCalls(){return deptProf().routeCalls}
function callClueWord(c){const s=c.say;if(/나라장터|벤처나라/.test(s))return '나라장터';if(/길잡이/.test(s))return '길잡이';if(/G-PASS/.test(s))return 'G-PASS';if(/벤처|등록/.test(s))return '벤처나라';if(/상담|절차|제도|비축|용역|검사 서류/.test(s))return '길잡이 상담';if(/해외|수출|국내 실적|국외/.test(s))return '해외 진출';return DESK_EXAMPLES[c.answer].split(' · ')[0]}
function callSayHtml(c){
 const message=c.say.replace(/^“|”$/g,'');
 return '<div class="caller-dialogue">'+pixelIcon('person')+'<p class="call-say">“안녕하세요. '+esc(c.name)+'입니다. '+esc(message)+'”</p></div>';
}

function routingAt(){const calls=deptCalls(),o=s.local.order||[];if(Number.isInteger(s.local.editCall))return s.local.editCall;for(let i=0;i<calls.length;i++)if(!Number.isInteger(o[i]))return i;return -1}
function routingDoneChips(calls){return `<div class="routing-done">${calls.map((c,i)=>{const j=s.local.order[i];if(!Number.isInteger(j))return'';return `<button type="button" class="routing-chip" onclick="editCall(${i})"><span>전화 ${i+1}</span><b>${DESK_SHORT[j]}</b></button>`}).join('')}</div>`}
function routingWizardHtml(){
 const calls=deptCalls(),at=routingAt();
 if(at<0)return routingDoneChips(calls)+'<button class="btn full" data-routing-focus onclick="submitCalls()">연결 마무리</button>';
 const c=calls[at];
 const options=DESK_SHORT.map((name,i)=>'<button type="button" class="story-choice small-desk" onclick="assignCall('+at+','+i+')"><span>'+name+'</span><small>'+DESK_NOTE[i]+' · 예: '+DESK_EXAMPLES[i]+'</small></button>').join('');
 return '<div class="call-card call-active"><h3 tabindex="-1" data-routing-focus>전화 '+(at+1)+' / '+calls.length+' · '+c.name+'</h3>'+callSayHtml(c)+'</div><div class="desk-pick desk-pick-big">'+options+'</div>'+routingDoneChips(calls);
}
function routing(){const p=deptProf();shell(title(deptChip(DEPTS[s.dept]),p.routeTitle,'전화를 듣고 알맞은 창구를 골라 주세요.')+'<div class="paper-body routing-body routing-wizard">'+routingWizardHtml()+'</div>')}
function focusRouting(){const target=document.querySelector('[data-routing-focus]');target?.focus({preventScroll:true});if(window.matchMedia?.('(max-width: 700px)').matches)target?.scrollIntoView({block:'nearest'})}
function editCall(i){if(s.step!==6||s.phase!=='play')return;s.local.editCall=i;save();play();focusRouting()}
function assignCall(i,v){if(s.step!==6||s.phase!=='play')return;s.local.order[i]=Number(v);s.local.editCall=undefined;s.local.feedback='';beep(true);save();play();focusRouting()}
function submitCalls(){if(s.step!==6||s.phase!=='play')return;const calls=deptCalls();if(calls.some((c,i)=>!Number.isInteger(s.local.order[i])))return toast('세 통화 모두 창구를 골라 주세요');const correct=calls.filter((c,i)=>c.answer===s.local.order[i]).length;const missed=3-correct;const callResults=calls.map((c,i)=>({name:c.name,selected:s.local.order[i],expected:c.answer}));const detail=calls.map((c,i)=>{const hit=s.local.order[i]===c.answer;return hit?`${c.name} → ${DESK_SHORT[c.answer]}`:`${c.name} → ${DESK_SHORT[s.local.order[i]]} (동료가 ${DESK_SHORT[c.answer]}로 넘겼습니다)`}).join('\n');const city=correct===3?[1,1,1]:correct>=2?[0,1,0]:correct===1?[1,0,0]:[0,0,0];const tail=correct===3?' 세 곳 다 맞게 연결했어요.':correct>=2?' 대부분 맞았고, 나머지는 동료가 받았어요.':correct===1?' 한 통은 맞았어요. 동료가 나머지를 돌렸습니다.':' 동료가 창구를 다시 연결해 줬어요.';if(correct===3)toastWin('세 건 모두 연결');else if(correct>=2)toast('대체로 연결됐어요');finish(correct===3?'창구 연결 완료':`창구 연결 ${correct}/3`,detail+tail,{callResults,energy:correct===3?0:-Math.min(1,missed),trust:correct>=2?1:correct?0:-1,city,flag:correct>=2?'callsComplete':undefined,bag:correct>=1?'기업 지원 지도':undefined},10)}
// Each department checks a different part of the same three projects.
const FINAL_CHECKS=[
 [['학교 방송 장비 설치 확인','전원과 설치 위치를 확인해 학교에서 방송 장비를 쓸 수 있게 했어요.'],['문화관 안내 장비 설치 확인','안내 화면이 보이는 위치와 전원 연결을 설치팀과 확인했어요.'],['공장 장비 인수 일정 확인','공장 담당자와 장비를 받을 날짜와 설치 시간을 맞췄어요.']],
 [['학교 대여용 우산 검사','대여용 우산의 수량을 납품 목록과 대조하고, 표본을 펼쳐 살대와 손잡이 상태를 확인했어요.'],['문화관 안내 장비 재검사','보완한 안내 장비의 모델명과 시험 자료를 다시 대조했어요.'],['공장 입고 물품 확인','공장에 들어온 물품의 라벨과 수량을 납품 목록과 맞춰 봤어요.']],
 [['학교 예비 물량 확인','학교가 당장 쓸 물량과 다음 배송까지 남겨 둘 물량을 나눠 확인했어요.'],['문화관 비상 물품 확인','문화관에 먼저 보낼 비상 물품을 골라 창고 재고와 맞춰 봤어요.'],['공장 원자재 도착 일정 확인','남은 원자재가 언제 도착하는지 운송 담당자와 확인했어요.']],
 [['학교 복도 안내 센서 재시험','조명이 어두운 복도에서 안내 센서가 제대로 반응하는지 다시 시험했어요.'],['문화관 안내 장비 시범 운영','관람객이 지나가는 시간에 안내 장비를 잠깐 켜고 반응을 기록했어요.'],['공장 작업 센서 재시험','작업복을 입고 짐을 든 사람도 센서가 제대로 인식하는지 확인했어요.']],
 [['학교 출입구 동선 확인','학생과 보호자가 학교 입구에서 안내 장소까지 안전하게 이동할 수 있는지 걸어 봤어요.'],['문화관 입구와 대기 공간 확인','입구 문턱과 대기 줄을 살피고 통로를 막지 않도록 배치를 조정했어요.'],['공장 반입로와 보행로 확인','물품을 옮기는 길과 작업자가 걷는 길이 겹치는 곳을 표시했어요.']],
 [['학교 공지 화면 확인','학교 홈페이지 첫 화면에서 새 공지를 바로 찾을 수 있는지 확인했어요.'],['문화관 예약·취소 확인','문화관 예약 화면에서 신청부터 취소까지 직접 눌러 보고 안내 문구를 확인했어요.'],['공장 문의 접수 확인','테스트 문의를 보내 접수 완료 안내가 뜨고 담당자에게 전달되는지 확인했어요.']]
];
function projectEffect(i){
 const site=[0,2,1][i],city=[0,0,0];
 const extra=[s.flags.rain||s.flags.school||s.bag.includes('학교 납품 목록 메모'),s.flags.access||s.bag.includes('문화관 장비 검수 메모'),false][i];
 city[site]=extra?2:1;
 return {city,energy:i===2?0:-1,trust:i===2?1:0,flag:['schoolPrep','inclusive','bridge'][i]};
}
function project(){
 const options=FINAL_CHECKS[s.dept].map(([label],i)=>{
  const effect=projectEffect(i),site=[0,2,1][i];
  return choice(label,CITY_SITES[site]+' +'+effect.city[site]+(effect.energy?' · 남은 힘 −1':' · 동료 도움 +1'),'projectChoice('+i+')');
 }).join('');
 shell(title(deptChip(DEPTS[s.dept]),'마지막 점검','')+'<div class="paper-body">'+talk(2,'오늘 업무를 마치기 전에 어디를 더 살펴볼까요?')+'<div class="choice-stack">'+options+'</div></div>');
}
function projectChoice(i){
 if(s.phase!=='play'||s.step!==7)return;
 const option=FINAL_CHECKS[s.dept][i];
 if(option)finish(option[0],option[1],projectEffect(i),DEPTS[s.dept].source);
}
const OPS=[{name:'학교 설치팀 연결',desc:'수업 준비를 마무리',cost:2,city:[2,0,0]}, {name:'물류 공동 점검',desc:'공급 일정을 함께 조정',cost:2,city:[0,2,0]}, {name:'문화관 동선 점검',desc:'입구부터 안쪽까지 통로 확인',cost:2,city:[0,0,2]}, {name:'세 곳에 운영 안내',desc:'시민에게 변경 사항 전달',cost:1,city:[1,1,1]}, {name:'동료와 합동 지원',desc:'협업으로 세 곳 보완',cost:2,city:[1,1,1],trust:4}];
function opBudget(){return 3+(s.trust>=4?1:0)+(s.energy>=5?1:0)}
function plannedCity(){
 const city=[...s.city];
 for(const i of s.local.pick)OPS[i].city.forEach((change,site)=>{city[site]=clamp(city[site]+change,0,8)});
 return city;
}
function planPreview(){
 return '<div class="plan-preview" aria-label="확정 후 예상 준비도">'+plannedCity().map((score,i)=>
  '<div><strong>'+CITY_SITES[i]+'</strong><span>'+s.city[i]+' → '+score+'/8</span><small>'+ (score>=CITY_OK?'✓ 준비 완료':'보완 필요')+'</small></div>'
 ).join('')+'</div>';
}
function finalPlan(){const p=deptProf(),bud=opBudget(),cost=s.local.pick.reduce((a,i)=>a+OPS[i].cost,0);shell(title('개학 전 밤','내일 할 일 정하기','남은 예산에 맞춰 내일 일정을 정해 주세요.')+`<div class="paper-body"><div class="night-budget" role="status"><div><strong>남은 예산 <b>${bud-cost}</b></strong><span>${cost} 사용 / 전체 ${bud}</span></div><div class="night-budget-slots" aria-hidden="true">${Array.from({length:bud},(_,i)=>`<i class="${i<cost?'spent':''}">${i<cost?'✓':''}</i>`).join('')}</div></div><div class="operation-list">${OPS.map((o,i)=>{const sel=s.local.pick.includes(i),lack=o.trust&&s.trust<o.trust,over=!sel&&cost+o.cost>bud;return `<button class="story-choice ${sel?'selected':''}" onclick="pickOp(${i})" ${lack||over?'disabled':''} aria-pressed="${sel}"><span>${sel?'✓ ':''}${p.nightOps.includes(i)?'★ ':''}${o.name}</span><small>${o.desc}${o.trust?' · 동료 도움 4 필요':''}${p.nightOps.includes(i)?' · 추천':''}</small><b class="op-cost">${sel?'사용 중':over?'예산 부족':'비용'} ${o.cost}</b></button>`}).join('')}</div><div class="plan-preview-label">확정 후 예상 준비도</div>${planPreview()}<button class="btn full" onclick="submitOps()" ${!s.local.pick.length||cost>bud?'disabled':''}>이대로 내일 준비 →</button></div>`)}
function pickOp(i){if(s.phase!=='play'||s.step!==8||!OPS[i])return;if(OPS[i].trust&&s.trust<OPS[i].trust)return;pick(i,5,opBudget())}
function submitOps(){if(s.phase!=='play'||s.step!==8)return;const cost=s.local.pick.reduce((a,i)=>a+OPS[i].cost,0);if(!s.local.pick.length||cost>opBudget())return;const city=[0,0,0];s.local.pick.forEach(i=>OPS[i].city.forEach((n,j)=>city[j]+=n));const spent=opBudget()-cost;toast(spent?`예산 ${cost}/${opBudget()} · ${spent} 남음`:'예산을 모두 썼어요');finish('개학 전 마지막 업무',s.local.pick.map(i=>['학교 설치팀과 설치 일정을 맞췄어요.','운송 담당자와 공급 일정을 확인했어요.','문화관 입구와 통로를 점검했어요.','세 현장에 운영 안내를 전달했어요.','동료들과 역할을 나눠 세 현장의 준비를 도왔어요.'][i]).join(' '),{city,energy:-1},11)}
function topCity(){return s.city.indexOf(Math.max(...s.city))}
function lowCity(){return s.city.indexOf(Math.min(...s.city))}
function cityLogBoost(i){return s.log.reduce((a,e)=>a+((e.effect?.city?.[i])||0),0)}
function cityTier(n){if(n>=CITY_OK)return {key:'ok',label:'준비 끝',class:'tier-ok'};if(n>=CITY_MID)return {key:'mid',label:'겨우 버팀',class:'tier-mid'};if(n>=1)return {key:'weak',label:'허술함',class:'tier-weak'};return {key:'fail',label:'막힘',class:'tier-fail'}}
const FACILITY_BEAT=[{ok:'개학 첫날 수업이 시작됐습니다.',mid:'교실 일부만 정상 개학됩니다.',weak:'개학은 했지만 전원·안내가 들쭉날쭉합니다.',fail:'학교 개학이 미뤄졌습니다.'},{ok:'공장 라인이 정상 가동됩니다.',mid:'일부 라인만 돌아갑니다.',weak:'자재 대기로 가동이 느립니다.',fail:'공장 가동이 멈춰 있습니다.'},{ok:'문화관이 개관했습니다.',mid:'부분 개관만 가능합니다.',weak:'개관은 했지만 동선·안내가 엉망입니다.',fail:'문화관 문을 열지 못했습니다.'}];
const FACILITY_DETAIL=[{ok:'운동장에 안내 방송이 울렸어요. 신입생과 보호자는 방송을 듣고 입학식 장소로 모였어요.',mid:'수업은 되지만, 안내·우천 대비는 손볼 일이 남았습니다.',weak:'교실만 급히 열었고, 설치·동선은 다음 주 과제입니다.',fail:'교실 준비가 늦어져 개학 공지가 한 차례 밀렸습니다.'},{ok:'원자재가 제때 도착해 멈춰 있던 생산라인이 다시 돌아갔어요. 작업자들은 밀렸던 첫 물량을 내보낼 준비를 시작했습니다.',mid:'급한 라인만 돌고, 나머지는 일정 조율 중입니다.',weak:'납기 지연으로 라인이 자주 멈춥니다.',fail:'원자재가 끊겨 가동을 재개하지 못했습니다.'},{ok:'관람객이 입구에서 공연장까지 안내를 따라 들어갔어요. 객석이 차고 첫 공연의 막이 올랐습니다.',mid:'제한된 구역만 열었고, 안내·대기 공간은 부족합니다.',weak:'개관은 했지만 동선 불편이 그대로입니다.',fail:'개관을 연기하고 임시 안내만 내보냈습니다.'}];
function facilityOutcome(i){const k=cityTier(s.city[i]).key;return {head:FACILITY_BEAT[i][k],detail:FACILITY_DETAIL[i][k]}}
function facilityBeat(i){return facilityOutcome(i).head}
function cityEnding(i){return facilityOutcome(i).detail}
function endingVerdict(){const c=s.city,ok=c.filter(n=>n>=CITY_OK).length,top=topCity();if(ok===3)return '30일 동안 새봄학교·산업단지·모아문화관을 고르게 맞췄습니다.';if(ok===2){const lag=CITY_SITES.find((_,i)=>c[i]<CITY_OK);return lag?`세 곳 중 두 곳은 순조로웠고, ${lag}은 아직 손볼 일이 남았습니다.`:'두 곳은 일정을 맞췄습니다.';}if(ok===1&&c.filter(n=>!n).length)return `${CITY_SITES[top]}는 무리 없이 갔고, 다른 곳은 공지·일정만 겨우 맞춘 상태입니다.`;if(c.every(n=>n>=CITY_MID&&n<CITY_OK))return '세 곳 모두 돌아가긴 하지만, 어디든 빈틈이 보입니다.';if(Math.max(...c)-Math.min(...c)>=4)return `${CITY_SITES[top]}에 시간과 일이 몰렸습니다. 나머지는 뒤에 밀린 채로 끝났습니다.`;return `${CITY_SITES[top]}에 손이 가장 많이 갔습니다. 다른 두 곳은 여기저기 보완이 남았습니다.`}
const SCHOOL_FOLLOWUP=[
 ['기존 장비로 행사 진행','학교는 예정대로 문을 열었어요. 새 안내 장비는 전원과 설치 위치를 다시 확인하는 동안 기존 장비를 썼습니다.'],
 ['일부 물품 재검사','개학은 예정대로 했어요. 시험 자료가 맞지 않는 장비는 보완을 요청하고, 다시 검사한 뒤 쓰기로 했습니다.'],
 ['예비 물량으로 첫 주 운영','학교는 남아 있던 물품으로 첫 주를 시작했어요. 부족한 물량은 도착 일정을 다시 확인하고 있습니다.'],
 ['새 장비 시범 운영 연기','개학은 예정대로 했어요. 현장 시험이 끝나지 않은 새 장비는 다음 주에 다시 확인하기로 했습니다.'],
 ['입학식 동선 임시 조정','입학식은 예정대로 열렸어요. 정문 쪽 통로가 준비되지 않아 교직원이 다른 입구에서 학생과 보호자를 안내했습니다.'],
 ['입학식 안내 추가 공지','입학식은 예정대로 열렸지만 바뀐 시간이 늦게 안내돼 일부 신입생이 참석하지 못했어요. 학교는 새 일정을 다시 알리고, 참석하지 못한 학생에게 따로 안내했습니다.']
];
function endingFacilitiesHtml(){
 const events=['개학','가동','개관'];
 return '<div class="ending-facilities">'+CITY_SITES.map((name,i)=>{
  const score=s.city[i],passed=score>=CITY_OK,grade=score>=8?'S':score>=7?'A':passed?'B':score>=CITY_MID?'C':'D';
  const followup=[SCHOOL_FOLLOWUP[s.first],['일부 생산라인부터 가동','먼저 도착한 원자재로 일부 라인부터 돌렸어요. 나머지 물량은 공급 일정을 다시 확인합니다.'],(score<CITY_MID?['한산한 개관 첫날','문화관은 문을 열었지만 안내와 예약 준비가 늦어 찾아온 사람이 적었어요. 운영팀은 관람 안내를 다시 정리하기로 했습니다.']:['전시실부터 운영','관람객이 전시실을 둘러봤어요. 공연장은 장비 점검을 마친 뒤 열기로 했습니다.'])][i];
  const verdict=passed?events[i]+' 준비 완료':followup[0];
  return '<article class="ending-facility '+cityTier(score).class+'">'+facilityPixelScene(i,score)+(passed?endingCelebration(i):'')+'<div class="facility-result-copy"><h2>'+name+'</h2><span class="facility-stamp '+(passed?'stamp-ready':'stamp-followup')+'">'+(passed?'✓ 준비 완료':'! 보완 필요')+'</span><strong>'+verdict+'</strong><p>준비도 '+score+'/8 · 등급 '+grade+'</p><p>'+(passed?facilityOutcome(i).detail:followup[1])+'</p></div></article>';
 }).join('')+'</div>';
}
function deptRunPunch(){const k=DEPTS[s.first].kind;return {kit:'교실 전원·설치 조건을 맞추는 일이 많았습니다.',inspect:'납품 라벨·현물 확인이 이어졌습니다.',route:'비축 물량과 우회 공급이 공장 쪽으로 기울었습니다.',test:'현장 시험·시범 구매 조건을 맞췄습니다.',path:'출입·동선 불편을 걸어 확인했습니다.',order:'예약·안내 화면 연결을 살렸습니다.'}[k]||''}
function endingSummary(){
 const ready=CITY_SITES.filter((_,i)=>s.city[i]>=CITY_OK);
 if(ready.length===3)return '학교에 안내 방송이 울리고, 공장에 다시 불이 켜졌어요. 문화관에도 관람객이 모였습니다. 오늘 준비한 일이 세 곳의 일상으로 이어졌어요.';
 if(!ready.length)return '세 현장에 보완할 일이 남았어요. 오늘 확인한 문제와 메모를 다음 담당자에게 남겼습니다.';
 const pending=CITY_SITES.filter((_,i)=>s.city[i]<CITY_OK);
 return ready.join('·')+'의 준비를 마쳤어요. '+pending.join('·')+'에서 이어서 할 일은 동료에게 남겼습니다.';
}
function endingLead(){const ready=s.city.filter(n=>n>=CITY_OK).length;return ready===3?'세 현장 모두 준비를 마쳤어요.':'세 현장 중 '+ready+'곳의 준비를 마쳤어요.'}
function playEndingCue(){
 if(!sound)return;
 stopBgm();
 const ctx=ensureAc();
 if(!ctx||ctx.state!=='running')return;
 const start=ctx.currentTime;
 [523.25,659.25,783.99,1046.5].forEach((pitch,i)=>{
  const at=start+i*.16,osc=ctx.createOscillator(),gain=ctx.createGain();
  osc.type='sine';osc.frequency.value=pitch;
  gain.gain.setValueAtTime(.001,at);
  gain.gain.exponentialRampToValueAtTime(.035,at+.035);
  gain.gain.exponentialRampToValueAtTime(.001,at+.35);
  osc.connect(gain);gain.connect(ctx.destination);osc.start(at);osc.stop(at+.36);
 });
}
function completeFinale(){
 stopBgm();playEndingCue();
 s.log.push({step:9,day:30,dept:s.dept,title:'세 현장 결과',text:endingLead(),effect:{},source:11});
 s.step=10;s.phase='end';eventOpen=false;save();
}
function endingRecap(){const lines=[],fails=s.log.filter(e=>e.title==='미니게임 타임오버').length;if(s.flags.callsComplete)lines.push('기업 전화 세 건을 맞는 상담 창구로 연결했습니다.');else if(s.flags.misdirected)lines.push('창구 연결에서 다시 돌려야 한 전화가 있었습니다.');if(s.log.some(e=>e.title==='우회로 동시 대응'))lines.push('돌발 기상 때 학교·공장·문화관 일정을 한꺼번에 밀어 넣었습니다.');lines.push(fails?'퍼즐은 동료와 합동으로 마무리한 적이 있습니다.':'퍼즐은 스스로 통과했습니다.');if(s.bag.length)lines.push(`현장에서 모은 메모 ${s.bag.length}개가 도구함에 남았습니다.`);const uniq=[];for(const L of lines)if(!uniq.includes(L))uniq.push(L);return uniq.slice(0,5)}
function endingRecapHtml(){return endingRecap().map(t=>`<p>${t}</p>`).join('')}
function result(){const e=s.log.at(-1),src=SOURCES[e.source];const fin=s.step===9,g=parseGrade(e.title,e.effect);const nextLabel=fin?'오늘 결과 보기':deptSceneTitle(s.step+1);const body=e.effect?.miniGrade?`<div class="story-result"><p>${e.text}</p></div>`:resultMainHtml(e);const pack=packResultHtml();shell(title(fin?'🏁 마지막 장면':'✓ 장면 완료',e.title,'')+`<div class="paper-body"><div class="effect-chips">${resultChanges(e)}</div>${g?`<div class="result-grade grade-${g}"><span>${g}</span><small>${gradeCaption(g,e.effect)}</small></div>`:''}${isReservationResult(e)?reservationPreview():resultPixelArt(e)}${body}${pack}${fin?'':`<details class="learning"><summary>📚 조달청 한 줄 (보너스)</summary><p>${src.fact}</p><a href="${src.url}" target="_blank" rel="noopener noreferrer">${src.title} ↗</a></details>`}<button class="btn full pulse" onclick="advance()" >${nextLabel+' →'}</button></div>`)}
function effectText(e){let t=[];if(e.energy)t.push({t:`${METER_ENERGY} ${e.energy>0?'+':''}${e.energy}`,ok:e.energy>=0});if(e.trust)t.push({t:`${METER_TRUST} ${e.trust>0?'+':''}${e.trust}`,ok:e.trust>=0});if(e.city)e.city.forEach((n,i)=>{if(n)t.push({t:`${['학교','산업단지','문화관'][i]} +${n}`,ok:true})});if(e.bag)t.push({t:`+ ${e.bag}`,ok:true});return t.map(x=>`<span class="chip ${x.ok?'gain':'cost'}">${esc(x.t)}</span>`).join('')}
function endTitle(){const c=s.city,ok=c.filter(n=>n>=CITY_OK).length,mid=c.filter(n=>n>=CITY_MID&&n<CITY_OK).length,top=topCity();if(ok===3)return '세 곳을 다 맞췄습니다';if(ok===1&&c.filter(n=>!n).length>=2)return `${CITY_SITES[top]} 쪽을 끝까지 밀었습니다`;if(mid>=2&&ok===0)return '세 곳 모두 버텼습니다';if(Math.max(...c)-Math.min(...c)>=4)return '한곳에 일이 몰렸습니다';if(s.flags.callsComplete&&ok>=2)return '현장과 창구를 이은 하루';return '첫 업무를 마쳤습니다'}
function endingCelebration(site){
 return '<div class="ending-celebration" aria-hidden="true">'+Array.from({length:12},(_,i)=>'<i style="--x:'+(8+(i*37)%85)+'%;--delay:'+site*110+(i%7)*45+'ms;--drift:'+(i%2?24:-24)+'px;--tone:'+['#f0b447','#68a883','#e18063','#5790af'][i%4]+'"></i>').join("")+'</div>';
}
function ending(){
 pauseAuto();closeModal();stopBgm();setChrome('focus');
 $('app').innerHTML=`<section class="center wide-end screen screen-end">
  <header class="ending-heading"><span class="label">오늘 업무를 마쳤어요</span><h1>세 현장 결과</h1><p>${esc(DEPTS[s.first].name)} · ${endingLead()}</p></header>
  ${endingFacilitiesHtml()}
  <p class="ending-summary"><strong>오늘을 마치며</strong> ${endingSummary()}</p>
  <div class="row ending-actions"><button class="btn" onclick="newGame()">다시 발령받기</button><button class="btn outline" onclick="downloadReport()">이야기 저장</button><button class="btn outline" onclick="showLog()">선택 다시 보기</button></div>
 </section>`;
}
function downloadReport(){const text=`오늘부터 조달청 — 첫 발령, 그다음 이야기\n${s.name} / ${endTitle()}\n부서: ${s.route.map(x=>DEPTS[x.dept].name).join(' → ')}\n모든 사건과 수치는 가상입니다.\n\n`+s.log.map(e=>`${e.title}\n${e.text}`).join('\n\n');const u=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='오늘부터_조달청_나의이야기.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);toast('이야기 기록을 저장했습니다.')}
function goHome(){if(s&&!home)save();landing();window.scrollTo({top:0,behavior:'instant'})}
function showLog(){pauseAuto();modal('내 선택이 만든 이야기',s?.log?.length?`<ul class="report-list">${s.log.map(e=>`<li><span class="chip">${DEPTS[e.dept].name}</span><h3 style="font-size:17px;margin-top:10px">${e.title}</h3><p>${e.text}</p></li>`).join('')}</ul>`:'<p>첫 선택부터 이곳에 이야기가 쌓입니다.</p>')}
function showSources(){
 pauseAuto();
 const groups=[['게임 속 부서 업무',[0,1,2,3,4,5]],['기업 상담과 지원',[10,6,7]],['조달청의 다른 업무',[8,9,11]]];
 const sections=groups.map(([name,indices],group)=>{
  const cards=indices.map(i=>{
   const source=SOURCES[i];
   return '<article class="source-card"><h3>'+esc(source.title)+'</h3><p>'+esc(source.fact)+'</p><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">조달청 공식 자료 열기 ↗<span class="sr"> · '+esc(source.title)+' (새 탭)</span></a></article>';
  }).join('');
  return '<details class="source-group" '+(group===0?'open':'')+'><summary>'+name+'</summary><div class="source-grid">'+cards+'</div></details>';
 }).join('');
 modal('조달청 노트','<div class="source-notes"><p class="source-intro">게임에서 만난 업무와 제도를 조달청 자료에서 더 알아볼 수 있어요. 게임 속 사건과 퍼즐은 가상의 사례입니다.</p>'+sections+'</div>');
}
function showGuide(){
 pauseAuto();
 modal('플레이 안내',`<div class="help-notes">
 <section><h3>목표</h3><p>발령받은 부서에서 학교 개학, 산업단지 재가동, 문화관 개관을 도와요. 현장별 준비도가 5/8 이상이면 준비 완료입니다.</p></section>
 <section><h3>조작과 진행</h3><p>선택지는 클릭하거나 터치하세요. 답사 장소는 다시 누르면 취소할 수 있고, 답사를 마칠 때 메모가 저장돼요. 마지막 업무에서는 확정 전에 예상 준비도를 볼 수 있어요.</p></section>
 <section><h3>남은 힘과 동료 도움</h3><p>업무를 하면 힘이 줄고, 점심을 먹으면 회복돼요. 동료 도움이 쌓이면 일부 협업 선택지가 열려요.</p></section>
 <section><h3>자동 선택과 이어하기</h3><p>자동 선택을 켜도 선택지는 보이고, 직접 조작하면 멈춰요. 진행 상황은 같은 브라우저에서 이어 할 수 있어요.</p></section>
 </div>`);
}
function showAbout(){
 pauseAuto();
 modal('게임 소개',`<div class="help-notes">
 <section><h3>오늘부터 조달청</h3><p>조달청이 어떤 일을 하는 곳인지 웹에서 가볍게 알아보는 시뮬레이션이에요. 게임 속 여섯 부서 중 한 곳에 발령받아, 현장 요청을 확인하고 부서에 맞는 업무를 맡습니다.</p></section>
 <section><h3>선택이 바꾸는 세 현장</h3><p>물품 구매, 납품 검사, 비축물자 공급 등에서 착안한 일을 해보고, 내 선택이 학교·산업단지·문화관의 준비에 어떤 영향을 줬는지 확인할 수 있어요.</p></section>
 <section><h3>게임과 실제 업무</h3><p>조달청의 역할을 참고해 만든 비공식 창작 게임이에요. 사건과 퍼즐은 가상의 사례이며, 관련 공식 자료는 화면 맨 아래 ‘조달청 노트’에 모아 뒀어요.</p></section>
 </div>`);
}
document.addEventListener('visibilitychange',()=>{if(!bgm||!sound)return;if(document.hidden)bgm.pause();else bgm.play().catch(()=>{})});
document.addEventListener('pointerdown',onPathPointerDown);
document.addEventListener('pointermove',onPathPointerMove);
document.addEventListener('pointerup',pathPointerUp);
let stockDrag=null;
function clearStockDrag(){
 stockDrag?.ghost?.remove();
 stockDrag?.target?.classList.remove('stock-drop-target');
 stockDrag=null;
}
document.addEventListener('pointerdown',e=>{
 const piece=e.target.closest('.stock-piece[data-stock-piece]');
 if(!piece||e.button!==0||stockDrag)return;
 stockDrag={id:e.pointerId,index:Number(piece.dataset.stockPiece),x:e.clientX,y:e.clientY,piece};
});
document.addEventListener('pointermove',e=>{
 if(stockDrag?.id!==e.pointerId)return;
 if(!stockDrag.ghost){
  if(Math.hypot(e.clientX-stockDrag.x,e.clientY-stockDrag.y)<8)return;
  const ghost=stockDrag.piece.cloneNode(true);
  ghost.classList.add('stock-drag-ghost');ghost.setAttribute('aria-hidden','true');ghost.tabIndex=-1;
  document.body.appendChild(ghost);stockDrag.ghost=ghost;
 }
 stockDrag.ghost.style.left=e.clientX+'px';stockDrag.ghost.style.top=e.clientY+'px';
 stockDrag.target?.classList.remove('stock-drop-target');
 stockDrag.target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-stock-bin]');
 stockDrag.target?.classList.add('stock-drop-target');
});
document.addEventListener('pointerup',e=>{
 if(stockDrag?.id!==e.pointerId)return;
 const drag=stockDrag,bin=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-stock-bin]');
 clearStockDrag();
 if(!drag.ghost)return;
 const cancelClick=event=>{event.preventDefault();event.stopImmediatePropagation()};
 drag.piece.addEventListener('click',cancelClick,{capture:true,once:true});
 setTimeout(()=>drag.piece.removeEventListener('click',cancelClick,true),0);
 if(!bin||!isDeptWork()||s.dept!==2)return;
 s.local.stockBundles[drag.index]=Number(bin.dataset.stockBin);s.local.stockSelected=null;
 play();save();beep();
});
document.addEventListener('pointercancel',e=>{if(stockDrag?.id===e.pointerId)clearStockDrag()});
document.addEventListener('pointercancel',pathPointerUp);
document.addEventListener('keydown',e=>{if(s?.phase==='result'&&!$('overlay').firstElementChild&&e.key==='Enter'){e.preventDefault();advance();return}if(!$('overlay').firstElementChild)return;if(e.key==='Escape')closeModal();if(e.key==='Tab'){const a=Array.from($('overlay').querySelectorAll('button,a,input,select,[tabindex="0"]')).filter(x=>!x.disabled);if(e.shiftKey&&document.activeElement===a[0]){e.preventDefault();a.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===a.at(-1)){e.preventDefault();a[0].focus()}}});
function bootGame(){try{syncSound();landing()}catch(e){const app=$('app');if(app)app.innerHTML=`<section class="screen"><p><b>화면을 불러오지 못했어요.</b></p><p class="fine">${esc(String(e?.message||e))}</p><p class="fine">HTML과 같은 폴더에 <code>assets/</code>가 있어야 해요. <code>node build-game.cjs</code> 후 다시 열어 주세요.</p></section>`;console.error(e)}}
