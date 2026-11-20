/* Original code-drawn pixel artwork. No remote assets or font downloads. */
function pixelIcon(kind, tone='#518b80', style) {
 const r=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
 const ink='#263f49',paper='#fff3cf',gold='#efb457';let art='';
 if(kind==='person'){
  const hair=['#27343b','#603c32','#413439','#302f37','#573b37','#3b3030'][style]||ink;
  const cuts=[
   r(8,3,16,5,hair)+r(8,7,4,3,hair),
   r(7,3,18,5,hair)+r(7,7,3,12,hair)+r(22,7,3,12,hair),
   r(7,4,18,5,hair)+r(10,2,4,3,hair)+r(18,2,5,3,hair)+r(20,8,5,2,hair),
   r(8,4,16,4,hair)+r(17,0,6,5,hair)+r(8,8,3,3,hair),
   r(7,4,18,4,hair)+r(7,7,3,4,hair)+r(10,9,6,2,hair),
   r(7,3,18,5,hair)+r(22,7,3,11,hair)+r(24,14,4,8,hair)
  ];
  art=r(8,7,16,9,'#edbb91')+(cuts[style]||r(10,2,12,5,ink))+r(11,11,2,2,ink)+r(20,11,2,2,ink)+
   (style===4?r(9,10,6,1,ink)+r(17,10,7,1,ink)+r(14,11,4,1,ink):'')+
   r(7,17,18,9,tone)+r(10,26,5,5,ink)+r(19,26,5,5,ink)+r(15,18,3,7,paper);
 }
 else if(kind==='truck')art=r(2,9,18,13,tone)+r(20,13,10,9,gold)+r(22,14,5,4,paper)+r(5,22,6,6,ink)+r(22,22,6,6,ink)+r(7,24,2,2,paper)+r(24,24,2,2,paper);
 else if(kind==='water')art=[5,13,21].map((y,i)=>r(i%2?6:2,y,10,3,'#88d5e8')+r(i%2?20:16,y,10,3,'#88d5e8')).join('');
 else if(kind==='pillar')art=r(8,3,16,4,'#b1c1bf')+r(10,7,12,18,'#879fa4')+r(10,7,4,18,'#c6d6d2')+r(7,25,18,5,ink);
 else if(kind==='box')art=r(4,7,24,22,'#a76b43')+r(4,7,24,5,'#e9b879')+r(14,7,5,22,'#f6d496')+r(7,17,6,5,paper);
 else if(kind==='cover')art=r(3,11,26,5,tone)+r(7,7,18,4,tone)+r(11,3,10,4,tone)+r(5,16,3,14,ink)+r(24,16,3,14,ink);
 else if(kind==='power')art=r(6,7,20,23,ink)+r(12,3,8,4,ink)+r(9,10,14,16,tone)+`<path d="M17 10h-5v8h5l-3 8 9-13h-6z" fill="${gold}"/>`;
 else if(kind==='speaker')art=r(7,3,18,27,ink)+r(11,7,10,6,tone)+r(10,17,12,9,'#739b9c')+r(13,20,6,3,ink);
 else if(kind==='screen')art=r(2,4,28,20,ink)+r(5,7,22,14,tone)+r(14,24,4,4,ink)+r(9,28,14,3,ink)+r(8,10,10,2,paper);
 else if(kind==='light')art=r(10,3,12,5,gold)+r(6,8,20,9,gold)+r(10,17,12,5,gold)+r(12,22,8,5,ink)+r(14,27,4,3,ink);
 else if(kind==='moon')art=r(9,3,14,4,paper)+r(5,7,16,16,paper)+r(9,23,14,4,paper)+r(15,3,10,16,'#35576a');
 else if(kind==='bag')art=r(10,3,12,5,ink)+r(6,8,20,22,tone)+r(10,18,12,9,gold)+r(8,10,3,7,paper);
 else art=r(4,10,24,20,tone)+r(2,7,28,4,ink)+r(9,15,4,5,paper)+r(19,15,4,5,paper)+r(14,23,5,7,ink);
 return `<svg class="pixel-icon" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">${art}</svg>`;
}
function pixelKitPreview(){
 const picks=s.local.pick,cost=picks.reduce((n,i)=>n+SUPPLIES[i].cost,0);
 const ready=['비','전원','안내'].every(t=>picks.some(i=>SUPPLIES[i].tags.includes(t)));
 return `<section class="packing-preview" aria-label="선택한 준비 물품"><div class="packing-title"><strong>${ready?'필요한 준비가 모두 갖춰졌어요':'현장에 보낼 물품'}</strong><span role="status">남은 예산 ${7-cost} / 7</span></div><div class="packing-slots">${Array.from({length:3},(_,slot)=>{const i=picks[slot];return i===undefined?'<div class="packing-empty"><span>＋</span><small>빈 자리</small></div>':`<button type="button" class="packing-item" onclick="pick(${i},3,7)" aria-label="${SUPPLIES[i].name} 빼기">${pixelIcon(['cover','power','speaker','screen','light','building'][i])}<small>${SUPPLIES[i].name}</small><span class="packing-remove">빼기 ×</span></button>`}).join('')}</div><div class="packing-budget" role="meter" aria-label="사용 예산" aria-valuenow="${cost}" aria-valuemin="0" aria-valuemax="7">${Array.from({length:7},(_,i)=>`<i class="${i<cost?'spent':''}"></i>`).join('')}</div></section>`;
}
function pixelCityArt(){
 const c=s?.city||[0,0,0],night=s?.phase==='end';
 const r=(x,y,w,h,color)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
 const tree=(x,y)=>r(x+6,y+16,4,10,'#785346')+r(x+2,y+4,12,16,'#387768')+r(x,y+8,16,8,'#438c71')+r(x+4,y,8,8,'#67a579');
 const buildings=c.map((v,i)=>{const x=30+i*110,lit=v>=CITY_OK,roof=['#b86b58','#547688','#5a7e70'][i];return `<g transform="translate(${x} 70)">${r(4,48,72,6,'#294c4e')}${r(0,10,76,40,['#efcda0','#b6c7c1','#dfd9b2'][i])}${i===1?r(4,-12,7,22,roof)+r(0,4,26,8,roof)+r(26,0,26,12,roof)+r(52,4,24,8,roof):r(-4,6,84,6,roof)+r(4,0,68,6,roof)+r(12,-6,52,6,roof)}${[9,29,49].map((xx,j)=>r(xx,19,13,14,'#365c69')+r(xx+2,21,9,10,v>j*2?'#ffe4a0':'#8bb1b4')+r(xx+6,21,1,10,'#48646b')).join('')}${r(33,36,12,14,'#466b67')}${r(35,38,4,8,'#b3d8cf')}<text x="38" y="-17" text-anchor="middle" font-size="8" font-weight="700" fill="${night?'#e4ece2':'#294e56'}">${CITY_SITES[i]}</text><text x="38" y="67" text-anchor="middle" font-size="7" fill="${night?'#d6e7da':'#365c54'}">${lit?'준비 완료':v>=CITY_MID?'준비 중':'점검 필요'}</text></g>`}).join('');
 return `<svg class="pixel-city" viewBox="0 0 360 190" role="img" aria-label="새봄학교, 산업단지, 모아문화관의 준비 상황" shape-rendering="crispEdges">${r(0,0,360,190,night?'#243c52':'#c7e6e8')}${r(306,16,16,16,night?'#fff0b8':'#f9cf7c')}<g class="pixel-cloud">${r(36,26,34,6,night?'#587184':'#eff7ef')}${r(44,20,18,6,night?'#587184':'#eff7ef')}${r(182,36,42,6,night?'#587184':'#eff7ef')}</g>${r(0,86,360,104,night?'#3d6658':'#91b58b')}${r(0,143,360,31,'#657a7a')}${Array.from({length:15},(_,i)=>r(i*26,157,12,2,'#dce3c3')).join('')}${buildings}${tree(8,103)}${tree(115,101)}${tree(232,103)}${tree(339,100)}<g transform="translate(${25+(s?.step||0)*26} 147) scale(.8)">${pixelIcon('truck')}</g>${r(0,176,360,14,night?'#345548':'#7aa16f')}${[18,72,135,227,309].map(x=>r(x,182,3,3,'#efd893')+r(x+4,184,3,3,'#c1d99e')).join('')}</svg>`;
}

function facilityPixelScene(site,score){
 const open=score>=CITY_OK;
 const wall=['#eccb9f','#afc5c2','#dbd2ae'][site];
 const roof=['#ae624e','#426577','#4f7564'][site];
 const people=open?score-2:score>=CITY_MID?1:0;
 const rect=(x,y,w,h,fill)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+fill+'"/>';
 const windows=Array.from({length:4},(_,i)=>rect(28+i*25,43,17,14,'#355763')+rect(30+i*25,45,13,10,open&&i<score-3?'#ffe6a0':'#6c8b91')).join('');
 const crowd=Array.from({length:people},(_,i)=>{
  const x=14+i*24,y=i%2?86:77;
  return '<g transform="translate('+x+' '+y+') scale(.45)">'+pixelIcon('person',['#427d72','#b36549','#637eaa'][i%3])+'</g>';
 }).join('');
 const door=open?'#ffe5a3':'#596e71';
 const school=rect(18,32,124,42,wall)+rect(14,29,132,7,roof)+rect(57,23,46,9,roof)+
  rect(73,9,3,18,roof)+rect(76,9,15,9,'#ea9b59')+windows+rect(70,59,20,15,door)+
  rect(125,79,24,2,'#f7f1d6')+rect(128,72,2,9,'#f7f1d6')+rect(145,72,2,9,'#f7f1d6');
 const factory=rect(15,41,130,34,wall)+rect(112,12,12,37,roof)+rect(109,11,18,5,'#324c5b')+
  '<path d="M13 41l29-17v17l29-17v17l29-17v17h47v6H13z" fill="#426577"/>'+
  rect(25,50,48,9,open?'#ffe5a3':'#6c8b91')+rect(94,51,32,24,door)+
  [54,59,64,69].map(y=>rect(94,y,32,1,'#657b79')).join('')+
  (open?'<g transform="translate(115 77) scale(.8)">'+pixelIcon('truck')+'</g>':'');
 const theater=rect(19,35,122,42,wall)+rect(13,29,134,7,roof)+rect(27,23,106,7,roof)+
  rect(47,36,66,9,'#305a50')+rect(53,40,54,2,open?'#ffe5a3':'#8ca8a0')+
  [27,42,110,125].map(x=>rect(x,46,5,28,'#f6ecd0')).join('')+
  rect(57,49,46,25,'#344f51')+rect(62,54,16,20,door)+rect(82,54,16,20,door)+
  rect(46,74,68,4,'#bcb28e')+rect(39,78,82,4,'#e4d5ac');
 return '<svg class="facility-pixel-scene" viewBox="0 0 160 108" aria-hidden="true" shape-rendering="crispEdges">'+
  rect(0,0,160,108,open?'#c3e5e3':'#b5c6cb')+rect(0,66,160,42,open?'#8db281':'#8d9f93')+
  rect(0,89,160,14,'#b9ad92')+[school,factory,theater][site]+
  rect(0,103,160,5,'#688876')+crowd+'</svg>';
}
