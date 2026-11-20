const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/today-pps/index.html','utf8');
const nodes=new Map(),storage=new Map();
function node(){return {innerHTML:'',textContent:'',value:'테스터',style:{},classList:{toggle(){},add(){},remove(){}},setAttribute(){},focus(){},querySelector(){return node()},querySelectorAll(){return []},remove(){},click(){}}}
const context=vm.createContext({console,setTimeout:()=>0,clearTimeout(){},Blob,URL,document:{getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)},querySelector(){return null},createElement:node,addEventListener(){},body:{style:{},appendChild(){}},activeElement:node()},window:{scrollTo(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},assert});
for(const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(m[1],context);
vm.runInContext(`
assert.ok($('app').innerHTML.includes('pixel-city'),'boot renders landing');
assert.equal(LUNCH_BY_DEPT.length,6);
LUNCH_BY_DEPT.forEach(opts=>{assert.equal(opts.length,3);opts.forEach(o=>assert.ok(o.effect&&o.sub))});
function start(dept,step=2){createGame();s.dept=dept;begin();s.step=step;s.local=blank();s.phase='play';play()}
for(let d=0;d<6;d++){
 start(d);
 if(d===0)s.local.pick=[1,5];
 if(d===1)s.local.selected=badBox();
 if(d===2)[1,2,7,12,13,14,19].forEach(walk);
 if(d===3)s.local.pick=[0,2];
 if(d===4)[6,12,18,24,25,26,27,28,29].forEach(walk);
 if(d===5)s.local.order=[0,1,3];
 assert.equal(miniCheck(),true,'solution for dept '+d);
 if(d===2||d===4)assert.ok((d===2?route():pathGame()).includes('도착!'));
 checkMini();assert.equal(s.phase,'result');assert.equal(s.log.at(-1).effect.miniGrade,'S');
 save();assert.ok(valid(load()));
}
start(2);walk(6);walk(19);assert.equal(s.local.path.join(','),'0');walk(1);walk(0);assert.equal(s.local.path.join(','),'0');
start(0);checkMini();assert.equal(s.phase,'play');assert.equal(s.local.tries,1);s.local.pick=[1,5];checkMini();assert.equal(s.log.at(-1).effect.miniGrade,'A');
start(0);puzzleHint();s.local.pick=[1,5];checkMini();assert.equal(s.log.at(-1).effect.miniGrade,'B');
start(0);checkMini();checkMini();assert.equal(s.phase,'result');assert.equal(s.flags.rework,true);
start(0);s.local.pick=[1,5];assert.ok(pixelKitPreview().includes('남은 예산 0 / 7'));assert.ok(pixelKitPreview().includes('모두 갖춰졌어요'));
start(2);const key={key:'ArrowRight',preventDefault(){}};pathTileKey(key,0,5);assert.equal(s.local.path.join(','),'0,1');
start(2,5);s.flags={};s.bag=[];s.trust=0;crisisChoice(0);crisisChoice(1);assert.equal(s.phase,'play');
start(1);assert.ok(!inspect().includes('inspection-line'));[0,1,2,3].forEach(openBox);assert.equal(inspect().split('<span>시험 대상</span>').length-1,4);assert.equal(inspect().split('<strong>HS-10</strong>').length-1,1);selectBox(badBox());assert.ok(inspect().includes('inspection-selected'));checkMini();assert.equal(s.phase,'result');
for(let d=0;d<6;d++)for(let i=0;i<3;i++){start(d,3);lunchChoice(i);assert.equal(s.phase,'result');assert.ok(Number.isFinite(s.energy))}
let completed=0;
start(2,4);
assert.equal(stockRemainder(),100);
for(const [piece,bin] of [[0,0],[1,0],[2,1],[4,1],[5,2]]){pickStockPiece(piece);moveStockPiece(bin)}
assert.equal(stockOk(),true);
assert.equal(stockRemainder(),25);
submitStock();assert.equal(s.flags.stockReady,true);
start(2,4);
for(const [piece,bin] of [[0,0],[1,0],[2,1],[3,1],[4,2],[5,2],[6,2],[7,2]]){pickStockPiece(piece);moveStockPiece(bin)}
assert.equal(stockOk(),true);submitStock();assert.equal(s.flags.stockReady,false);
for(let run=0;run<60;run++){
 start(run%6,0);s.log=[];autoMode=true;
 let ticks=0;while(s.phase!=='end'&&ticks++<90){autoStep();save();assert.ok(valid(load()))}
 assert.equal(s.phase,'end','automatic run '+run);assert.equal(s.log.length,10);completed++;
}
console.log('PASS: startup, 6 mini-games, route undo/blocked tiles, S/A/B grades, 18 lunch choices, '+completed+' full runs, save/restore.');
`,context);
if(process.argv.includes('--preview')){
 const content=vm.runInContext(`start(2);s.local.path=[0,1,2,3,7];const map=route();start(0);s.local.pick=[0,1,2];const pack=kit();'<h1>픽셀풍 미니게임 화면 점검</h1><p>시각 검증용 정지 화면입니다. 실제 플레이는 today-pps/index.html에서 가능합니다.</p><div class="qa-grid"><section class="event-dialog"><div class="paper-body">'+map+'</div></section><section class="event-dialog"><div class="paper-body">'+pack+'</div></section></div>'`,context);
 fs.mkdirSync(__dirname+'/.tools',{recursive:true});
 fs.writeFileSync(__dirname+'/.tools/pixel-preview.html','<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>픽셀 미니게임 검증</title>'+html.match(/<style>[\s\S]*?<\/style>/)[0]+'<style>body{padding:24px}h1{font-size:24px;margin:0 0 8px}.qa-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1350px;margin:20px auto}.qa-grid .event-dialog{width:100%;max-height:none}.qa-grid .paper-body{padding:20px}@media(max-width:800px){.qa-grid{grid-template-columns:1fr}}</style><body>'+content+'</body></html>');
}
