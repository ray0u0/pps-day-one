const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/오늘부터_조달청.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const nodes=new Map(),storage=new Map();
function node(){return {innerHTML:'',textContent:'',value:'테스터',style:{},classList:{toggle(){}},setAttribute(){},focus(){},querySelector(){return node()},remove(){},click(){}}}
const context=vm.createContext({console,setTimeout:()=>0,clearTimeout(){},Blob,URL,document:{getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)},querySelector(){return null},createElement:node,addEventListener(){},body:{style:{},appendChild(){}},activeElement:node()},window:{scrollTo(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},assert});
vm.runInContext(script,context);
vm.runInContext(`
function restoreCheck(){save();const before=JSON.stringify(s);assert.ok(valid(load()));s=load();assert.equal(JSON.stringify(s),before)}
function solveMini(assisted=false){
 const kind=DEPTS[departmentForMini()].kind;
 if(assisted){checkMini();if(s.phase==='play')teamFinish();return}
 puzzleHint();
 if(kind==='kit'){pick(1,3);pick(5,3)}
 if(kind==='inspect'){[0,1,2,3].forEach(openBox);selectBox(badBox())}
 if(kind==='route')[1,2,3,7,11,15].forEach(walk);
 if(kind==='test'){pick(0,2);pick(2,2)}
 if(kind==='path')[4,8,9,10,11].forEach(walk);
 if(kind==='order')[0,1,2,3].forEach(orderPick);
 assert.equal(miniCheck(),true,'mini '+kind);restoreCheck();checkMini();
}
let runs=0;
for(let first=0;first<6;first++)for(let dest=0;dest<6;dest++)for(let style=0;style<3;style++){
 createGame();s.dept=first;begin();restoreCheck();
 for(let step=0;step<10;step++){
  assert.equal(s.step,step);assert.equal(s.phase,'play');
  if(step===0)introChoice(['school','factory','culture'][style]);
  if(step===1){(style===0?[0,2,1]:style===1?[1,3,0]:[2,3,1]).slice(0,s.flags.observer?3:2).forEach(visit);finishField()}
  if(step===2)solveMini(style===2);if(step===4)departmentChoice(style);
  if(step===3)lunchChoice(style);
  if(step===5)crisisChoice(style===0?0:style===1&&s.trust>=4?1:2);
  if(step===6){[0,1,2].forEach(i=>assignCall(i,String(i)));submitCalls()}
  if(step===7)projectChoice(style);
  if(step===8){pickOp(style);pickOp(3);submitOps()}
  if(step===9)finaleChoice(style);
  assert.equal(s.phase,'result','result '+step+' '+first+' '+dest+' '+style);assert.equal(s.log.length,step+1);
  finish('duplicate','no');assert.equal(s.log.length,step+1);restoreCheck();advance();
  assert.equal(s.dept,first);assert.equal(s.route.length,1);
 }
 assert.equal(s.phase,'end');assert.equal(s.step,10);assert.equal(s.log.length,10);assert.ok(s.city.every(x=>Number.isFinite(x)&&x>=0&&x<=8));restoreCheck();runs++;
}
createGame();begin();s.step=4;s.phase='transfer';save();s=load();assert.equal(s.phase,'play');assert.equal(s.dept,s.first);assert.equal(s.route.length,1);departmentChoice(0);assert.equal(s.phase,'result');
createGame();begin();s.step=6;s.local=blank();const e=s.energy;submitCalls();assert.equal(s.phase,'result');assert.equal(s.energy,e-3);advance();assert.equal(s.step,7);
assert.equal(valid({version:2}),false);assert.equal(esc('<img onerror=x>'),'&lt;img onerror=x&gt;');
createGame();s.dept=0;const first=s.dept;reroll();assert.notEqual(s.dept,first);const second=s.dept;reroll();assert.equal(s.dept,second);
begin();s.step=5;s.flags={};s.trust=0;s.bag=[];s.phase='play';crisisChoice(0);crisisChoice(1);assert.equal(s.phase,'play');crisisChoice(2);assert.equal(s.phase,'result');
createGame();s.dept=2;begin();s.step=2;s.local=blank();walk(15);assert.equal(s.local.path.join(','),'0');walk(1);walk(0);assert.equal(s.local.path.join(','),'0');
let autoRuns=0;
for(let i=0;i<120;i++){
 createGame();s.dept=i%6;begin();autoMode=true;let ticks=0;
 while(s.phase!=='end'&&ticks++<60){autoStep();restoreCheck()}
 assert.equal(s.phase,'end','auto must reach ending');assert.ok(ticks<60);assert.equal(s.log.length,10);assert.equal(autoMode,false);autoRuns++;
}
createGame();begin();autoMode=true;autoStep();const paused=JSON.stringify(s);pauseAuto();autoStep();assert.equal(JSON.stringify(s),paused);
console.log(JSON.stringify({fullStoryRuns:runs,completedScenes:runs*10,singleDepartment:'passed',automaticSeasons:autoRuns,saveRestore:'passed',allSixMiniGames:'passed',repeatSubmission:'passed',lockedChoices:'passed',pause:'passed',result:'PASS'}));
`,context);
