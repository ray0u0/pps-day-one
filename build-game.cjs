const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const target=path.join(root,'오늘부터_조달청.html');
const pagesDir=path.join(root,'today-pps');
const pagesHtml=path.join(pagesDir,'index.html');
const old=fs.readFileSync(target,'utf8');
const css=old.match(/<style>([\s\S]*?)<\/style>/)[1].split('/* STORY_V2 */')[0];
const newCSS=fs.readFileSync(path.join(root,'story-v2.css'),'utf8');
const asset=(name,mime)=>'data:'+mime+';base64,'+fs.readFileSync(path.join(root,'assets',name)).toString('base64');
const logo=asset('pps-logo-horizontal.svg','image/svg+xml');
const bgmPath=path.join(root,'assets','bgm-loop.mp3');
const gameCore=fs.readFileSync(path.join(root,'pixel-art.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'game-v2.js'),'utf8');
const soundBtn=`<button type="button" class="sound-toggle sound-off" id="sound" onclick="toggleSound()" aria-pressed="false" aria-label="소리 꺼짐" title="배경·효과음 꺼짐"><svg class="sound-svg icon-off" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3z"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" d="M16 8l6 8M22 8l-6 8"/></svg><svg class="sound-svg icon-on" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" hidden><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3z"/><path fill="currentColor" d="M16.5 12a4.5 4.5 0 0 0-2.5-3.91v1.57a3 3 0 0 1 0 5.66v1.57a4.5 4.5 0 0 0 2.5-3.91z"/><path fill="currentColor" d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg><span class="sound-text">소리 꺼짐</span></button>`;
function shell(gameScript,assetScript){
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#173c35"><title>오늘부터 조달청 — 첫 발령, 그다음 이야기</title><style>${css}\n/* STORY_V2 */\n${newCSS}</style></head><body><div class="wrap"><header class="top"><button class="brand" onclick="goHome()" aria-label="시작 화면"><img class="pps-logo" src="${logo}" alt="조달청"><span class="brand-game-title">오늘부터 조달청<small>첫 발령 이야기</small></span></button><nav class="nav" aria-label="게임 메뉴"><button onclick="showGuide()">플레이 안내</button>${soundBtn}<button onclick="showAbout()">게임 소개</button></nav></header><main id="app"><p class="fine" style="padding:24px">불러오는 중…</p></main><footer class="footer"><span>오늘부터 조달청 · 첫 발령 이야기</span><span><button onclick="showSources()">공식 자료 탐험 노트 ↗</button> · 비공식 창작 게임</span></footer></div><div id="overlay"></div><div id="live" class="sr" aria-live="polite"></div><script>${gameScript}</script><script>${assetScript}</script></body></html>`}
function copyPagesAssets(){const out=path.join(pagesDir,'assets');fs.mkdirSync(out,{recursive:true});for(const name of['bgm-loop.mp3','narmi-dali.png']){const src=path.join(root,'assets',name);if(fs.existsSync(src))fs.copyFileSync(src,path.join(out,name))}}
const brandPath=JSON.stringify({characters:'assets/narmi-dali.png'});
const audioPath=fs.existsSync(bgmPath)?'const AUDIO_ASSETS='+JSON.stringify({bgm:'assets/bgm-loop.mp3'})+';\n':'';
const assetBoot=`const BRAND_ASSETS=${brandPath};\n${audioPath}bootGame();\n`;
const html=shell(gameCore,assetBoot);
fs.writeFileSync(target,html,'utf8');
copyPagesAssets();
fs.writeFileSync(pagesHtml,html,'utf8');
console.log(`Built HTML (game + external assets): ${Buffer.byteLength(html)} bytes ×2`);
console.log('Open today-pps/index.html or 오늘부터_조달청.html next to assets/ folder');
