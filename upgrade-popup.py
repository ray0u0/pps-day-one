from pathlib import Path
p=Path(__file__).parent/'game-v2.js'
s=p.read_text(encoding='utf-8')
s=s.replace("let s=null,sound=false,ac=null,home=true,lastFocus=null,saveFailed=false,toastTimer;", "let s=null,sound=false,ac=null,home=true,lastFocus=null,saveFailed=false,toastTimer;\nlet eventOpen=false,interactionHTML='',autoMode=false,autoDelay=3000,autoTimer=null;")
s=s.replace("function closeModal(){$('overlay').innerHTML='';", "function closeModal(){eventOpen=false;$('overlay').innerHTML='';")
s=s.replace("function landing(){home=true;", "function landing(){pauseAuto();eventOpen=false;home=true;")
s=s.replace("function resume(){s=load();if(s)render();", "function resume(){s=load();eventOpen=!!(s&&s.phase==='play');if(s)render();")
s=s.replace("s.phase='play';save();render()}", "s.phase='play';eventOpen=true;save();render()}",1)
s=s.replace("function finish(title,text,effect={},source=11){if(s.phase!=='play')return;", "function finish(title,text,effect={},source=11){if(s.phase!=='play')return;closeModal();")
s=s.replace("else s.phase='play';save();render();beep()}", "else s.phase='play';eventOpen=s.phase==='play';save();render();beep()}")
s=s.replace("s.phase='play';s.local=blank();save();render();beep(true)}", "s.phase='play';s.local=blank();eventOpen=true;save();render();beep(true)}")
start=s.index('function shell(content)')
end=s.index('\nfunction title(',start)
s=s[:start]+'''function shell(content){
 interactionHTML=content;
 const isResult=s.phase==='result',entry=s.log.at(-1);
 const summaries=['학교, 공장, 문화관. 해솔시에서 온 첫 부탁에 누구의 이야기를 먼저 들을까요?','지도에서 방문할 곳을 고릅니다. 오늘의 현장 단서가 나중에 다른 선택지를 열어요.','부서만의 방식으로 문제를 풀어봅니다. 막히면 동료의 도움을 받을 수 있어요.','바쁜 하루 사이, 동기가 점심을 제안합니다. 사람을 알아가는 것도 새로운 시작입니다.','새로운 연결이 생겼습니다. 다른 방식으로 해솔시 프로젝트에 참여해 봅니다.','예상 밖의 비로 일정이 흔들립니다. 전에 얻은 단서와 동료의 힘을 떠올려 보세요.','세 기업의 전화가 도착했습니다. 필요한 정보를 가진 창구로 연결해 주세요.','남은 시간에 한 곳을 더 도울 수 있습니다. 마음이 가는 프로젝트를 고르세요.','내일이면 도시가 문을 엽니다. 앞서 쌓은 신뢰와 여유로 마지막 계획을 세웁니다.','오늘은 서류가 닿은 곳을 직접 보러 갑니다. 어느 곳에 먼저 들를까요?'];
 $('app').innerHTML=`<section class="screen compact-game"><div class="play-toolbar"><div><span class="label">DAY ${DAYS[s.step]||30} / 30</span><b>${DEPTS[s.dept].name}</b></div><div class="play-controls"><button class="btn small ${autoMode?'light':'outline'}" onclick="toggleAuto()" aria-pressed="${autoMode}">${autoMode?'Ⅱ 자동 진행 멈춤':'▶ 랜덤 자동 진행'}</button><label class="sr" for="pace">자동 진행 속도</label><select id="pace" onchange="setPace(this.value)"><option value="5000" ${autoDelay===5000?'selected':''}>느긋하게</option><option value="3000" ${autoDelay===3000?'selected':''}>보통</option><option value="1200" ${autoDelay===1200?'selected':''}>빠르게</option></select></div></div><div class="story-layout"><aside class="story-aside"><div class="mini-id"><div class="avatar">${esc(s.name.slice(0,1))}</div><div><h3>${esc(s.name)}</h3><small>${DEPTS[s.first].perk}</small></div></div>${stats()}<div class="side-heading">나의 도구함</div><div class="toolbag">${s.bag.length?s.bag.map(x=>`<span class="chip">${esc(x)}</span>`).join(''):'<p class="fine">사람을 만나면 단서가 생깁니다.</p>'}</div><button class="log-btn" onclick="showLog()">나의 이야기 기록 ↗</button><button class="log-btn" onclick="showSources()">조달청 탐험 노트 ↗</button></aside><div class="story-main"><div class="city-strip">${cityArt()}<div class="city-status">${['학교','산업단지','문화관'].map((n,i)=>`<span>${n} <b>${s.city[i]>=4?'활기':s.city[i]>=2?'준비 중':s.city[i]>0?'첫 변화':'조용함'}</b></span>`).join('')}</div><article class="paper story-preview"><div class="preview-top"><span class="chip">${isResult?'선택의 결과':KINDS[s.step]}</span><span class="label muted">SCENE ${s.step+1} / 10</span></div><h2>${isResult?entry.title:TITLES[s.step]}</h2><p>${isResult?entry.text:summaries[s.step]}</p>${isResult?`<div class="effect-chips">${effectText(entry.effect)}</div>`:''}<div class="fixed-decisions">${isResult?`<button class="btn full" onclick="advance()">${s.step===3?'다음 발령 확인 →':s.step===9?'나의 엔딩 보기 →':'다음 장면으로 →'}</button><button class="text-button" onclick="openDetail()">판단과 배경 더 보기</button>`:`<button class="btn full" onclick="openEvent()">${s.step===1?'지도 펼쳐 탐색하기':s.step===2||s.step===4?'미니게임 시작하기':'이야기 속에서 선택하기'} →</button>`}</div></article><div class="compact-status">여유 ${s.energy}/10 · 동료 신뢰 ${s.trust}/8 <span>${autoMode?'자동 진행 중 · 언제든 멈출 수 있어요':'선택은 팝업에서 · 자동 저장'}</span></div></div></div></section>`;
 if(eventOpen&&s.phase==='play')showEventDialog();
}
function openDetail(){pauseAuto();modal('이번 장면 자세히 보기',interactionHTML)}
function openEvent(){if(s.phase!=='play')return;eventOpen=true;showEventDialog()}
function showEventDialog(){
 const scroll=$('overlay').querySelector('.event-scroll')?.scrollTop||0;
 lastFocus=document.activeElement;
 $('overlay').innerHTML=`<div class="modal-back event-back"><section class="event-dialog" role="dialog" aria-modal="true" aria-labelledby="event-title"><div class="event-bar"><span id="event-title">${KINDS[s.step]} · DAY ${DAYS[s.step]}</span><div>${autoMode?'<button onclick="toggleAuto()">Ⅱ 자동 진행 멈춤</button>':''}<button onclick="closeModal()" aria-label="선택 팝업 닫기">×</button></div></div><div class="event-scroll">${interactionHTML}</div><div class="event-foot"><span>${autoMode?'가능한 선택 중 무작위로 진행합니다.':'천천히 읽어도 괜찮아요. 시간 제한은 없습니다.'}</span><button onclick="closeModal();toggleAuto()">${autoMode?'자동 진행 멈추기':'동료에게 맡기고 자동 진행'}</button></div></section></div>`;
 document.body.style.overflow='hidden';
 const sc=$('overlay').querySelector('.event-scroll');if(sc)sc.scrollTop=scroll;
 $('overlay').querySelector('button').focus();
}
function pauseAuto(){autoMode=false;clearTimeout(autoTimer);autoTimer=null}
function queueAuto(){clearTimeout(autoTimer);if(autoMode)autoTimer=setTimeout(()=>{autoStep();queueAuto()},autoDelay)}
function toggleAuto(){if(!s||['appointment','end'].includes(s.phase))return;autoMode=!autoMode;if(autoMode)queueAuto();else clearTimeout(autoTimer);if(s.phase==='play'||s.phase==='result')render(false);else if(s.phase==='transfer')transfer()}
function setPace(v){autoDelay=[1200,3000,5000].includes(Number(v))?Number(v):3000;if(autoMode)queueAuto()}
function autoStep(){
 if(!autoMode||!s)return;
 if(s.phase==='end'){pauseAuto();return}
 if(s.phase==='result'){advance();return}
 if(s.phase==='transfer'){moveDept(random(6));return}
 if(s.phase!=='play')return;
 if(s.step===0)introChoice(['school','factory','culture'][random(3)]);
 else if(s.step===1){const left=PLACES.map((_,i)=>i).filter(i=>!s.visits.includes(i));if(s.visits.length<(s.flags.observer?3:2))visit(left[random(left.length)]);else finishField()}
 else if(s.step===2||s.step===4){s.local.tries=2;s.local.tool=true;teamFinish()}
 else if(s.step===3)lunchChoice(random(3));
 else if(s.step===5){const choices=[2];if(s.flags.rain||s.flags.harbor)choices.push(0);if(s.bag.includes('여유 물량')||s.trust>=4)choices.push(1);crisisChoice(choices[random(choices.length)])}
 else if(s.step===6){s.local.order=[0,1,2];submitCalls()}
 else if(s.step===7)projectChoice(random(3));
 else if(s.step===8){let cost=0;s.local.pick=[];for(const i of shuffle([0,1,2,3,4])){if((!OPS[i].trust||s.trust>=OPS[i].trust)&&cost+OPS[i].cost<=opBudget()){s.local.pick.push(i);cost+=OPS[i].cost}}submitOps()}
 else if(s.step===9)finaleChoice(random(3));
}
''' +s[end:]
# Reset popup state for transfer and endings, expose automatic controls at transfer.
s=s.replace('function transfer(){const suggested=', 'function transfer(){closeModal();const suggested=')
s=s.replace('<div class="eyebrow"><span class="dot"></span> DAY 12 / 두 번째 발령</div>', '<div class="row space"><div class="eyebrow"><span class="dot"></span> DAY 12 / 두 번째 발령</div><button class="btn outline small" onclick="toggleAuto()">${autoMode?\'Ⅱ 자동 진행 멈춤\':\'▶ 랜덤 자동 진행\'}</button></div>')
s=s.replace('function ending(){const lit=', 'function ending(){pauseAuto();closeModal();const lit=')
s=s.replace('function showLog(){modal(', 'function showLog(){pauseAuto();modal(')
s=s.replace('function showSources(){modal(', 'function showSources(){pauseAuto();modal(')
s=s.replace('function showGuide(){modal(', 'function showGuide(){pauseAuto();modal(')
s=s.replace('function showAbout(){modal(', 'function showAbout(){pauseAuto();modal(')
s=s.replace('시간 제한 없음 · 현재 브라우저 자동 저장 · 오프라인 실행 가능', '랜덤 자동 진행: 대화·전보·프로젝트를 무작위로 선택하고, 퍼즐은 동료가 마무리합니다. 속도 조절과 일시정지가 가능합니다.<br>시간 제한 없음 · 현재 브라우저 자동 저장 · 오프라인 실행 가능')
p.write_text(s,encoding='utf-8')
