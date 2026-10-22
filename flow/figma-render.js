// Injetado pelo orquestrador com PAGE_ID, SECTION_ID, SECTION_INDEX e SCREENS.
const page=await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
await Promise.all([
  {family:'Inter',style:'Regular'},
  {family:'Inter',style:'Medium'},
  {family:'Inter',style:'Semi Bold'},
  {family:'Manrope',style:'Bold'},
  {family:'Nunito',style:'Black'}
].map(f=>figma.loadFontAsync(f)));
const section=await figma.getNodeByIdAsync(SECTION_ID);
const compIds={button_primary:'155:242',button_secondary:'155:244',field:'155:250',card:'155:253',notice:'155:256',choice:'155:259',row:'155:262'};
const prop={button_primary:{label:'Label#155:0'},button_secondary:{label:'Label#155:1'},field:{title:'Title#155:4',body:'Body#155:5'},card:{title:'Title#155:6',body:'Body#155:7'},notice:{title:'Title#155:8',body:'Body#155:9'},choice:{title:'Title#155:10',body:'Body#155:11'},row:{title:'Title#155:12',body:'Body#155:13'}};
const comps={};for(const [k,id] of Object.entries(compIds))comps[k]=await figma.getNodeByIdAsync(id);
const ids=[],routes=[],built={};
function track(n){ids.push(n.id);return n}
function rgb(v){return {r:v,g:v,b:v}}
const C={white:rgb(1),paper:rgb(.98),surface:rgb(.94),selected:rgb(.88),line:rgb(.78),ink:rgb(.13),muted:rgb(.42)};
function solid(k){return {type:'SOLID',color:C[k]}}
function line(n){n.strokes=[solid('line')];n.strokeWeight=1}
function auto(parent,name,dir,w,h,fill){const n=track(figma.createAutoLayout(dir));n.name=name;parent.appendChild(n);n.resize(w,h||40);if(h===undefined)n.layoutSizingVertical='HUG';n.fills=fill?[solid(fill)]:[];return n}
function txt(parent,value,w,size=13,bold=false,color='ink',name='Texto'){
 const n=track(figma.createText());n.name=name;n.fontName={family:'Inter',style:bold?'Semi Bold':'Regular'};n.fontSize=size;n.lineHeight={unit:'PIXELS',value:Math.round(size*1.34)};n.characters=String(value||'');n.resize(w,20);n.textAutoResize='HEIGHT';n.fills=[solid(color)];parent.appendChild(n);if(parent.layoutMode&&parent.layoutMode!=='NONE')n.layoutSizingVertical='HUG';return n;
}
function instance(parent,kind,title,body,width=335){const n=comps[kind].createInstance();parent.appendChild(n);ids.push(n.id,...n.findAll(()=>true).map(x=>x.id));n.resize(width,n.height);const p=prop[kind];const values={};if(p.label)values[p.label]=title;else{values[p.title]=title;values[p.body]=body||''}n.setProperties(values);n.name=kind+' / '+title;return n}
function route(n,to,label,source,type='action'){if(to)routes.push([n.id,to,label,source,type])}
function linkButton(parent,label,to,source,primary){const n=instance(parent,primary?'button_primary':'button_secondary',label,'',335);route(n,to,label,source);return n}
function textButton(parent,label,to,source){const n=auto(parent,'Link / '+label,'HORIZONTAL',335,44,'white');n.primaryAxisAlignItems='CENTER';n.counterAxisAlignItems='CENTER';const t=txt(n,label,335,13,true);t.textAlignHorizontal='CENTER';route(n,to,label,source);return n}
function block(parent,b,s){
 const kind=b.kind,body=b.detail||'';let n;
 if(['photo','mascot','placeholder'].includes(kind)){
  n=auto(parent,'Placeholder / '+b.label,'VERTICAL',335,kind==='photo'?112:90,'surface');n.primaryAxisAlignItems='CENTER';n.counterAxisAlignItems='CENTER';n.cornerRadius=10;line(n);
  const t=txt(n,b.label,300,12,false,'muted');t.textAlignHorizontal='CENTER';if(body){const d=txt(n,body,300,11,false,'muted');d.textAlignHorizontal='CENTER';}
 }else if(kind==='input'){
  n=instance(parent,'field',b.label,body||'Digite aqui');
 }else if(kind==='choice'||kind==='check'){
  n=instance(parent,'choice',(kind==='check'?'☐ ':'○ ')+b.label,body);
 }else if(kind==='text'||kind==='bullet'||kind==='calendar'){
  n=instance(parent,'notice',b.label,body);
 }else if(kind==='summary'){
  n=instance(parent,'card',b.label,body);
 }else{
  n=instance(parent,'row',b.label,body);
 }
 route(n,b.to,b.label,s.id,'content');return n;
}
function tabs(parent,s){if(!s.tabs)return;const row=auto(parent,'Abas / '+s.tabs.map(x=>x.label).join(' · '),'HORIZONTAL',375,46,'white');row.paddingLeft=row.paddingRight=12;row.itemSpacing=3;for(const tab of s.tabs){const cell=auto(row,'Aba / '+tab.label,'HORIZONTAL',Math.floor(345/s.tabs.length),44,tab.to===s.id?'selected':'white');cell.primaryAxisAlignItems='CENTER';cell.counterAxisAlignItems='CENTER';const t=txt(cell,tab.label,Math.floor(345/s.tabs.length),11,tab.to===s.id,'ink');t.textAlignHorizontal='CENTER';route(cell,tab.to,tab.label,s.id,'tab')}return row}
function nav(parent,s){if(!s.nav)return;const items=[['Início','home'],['Minhas plantas','plants'],['Cuidados','care-today'],['Comunidade','community'],['Perfil','profile']];const n=auto(parent,'Navegação inferior','HORIZONTAL',375,60,'paper');line(n);n.itemSpacing=0;for(const [label,to]of items){const active=(s.nav==='care'&&to==='care-today')||(s.nav==='plants'&&to==='plants')||(s.nav==='community'&&to==='community')||(s.nav==='profile'&&to==='profile')||(s.nav==='home'&&to==='home');const c=auto(n,'Aba principal / '+label,'VERTICAL',75,58,active?'selected':'paper');c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';const icon=txt(c,'□',75,17,false,'muted');icon.textAlignHorizontal='CENTER';const t=txt(c,label,73,10,active,'ink');t.textAlignHorizontal='CENTER';route(c,to,label,s.id,'nav')}}
function header(parent,s,width=375){const wrap=auto(parent,'Cabeçalho','VERTICAL',width,undefined,'white');wrap.paddingLeft=wrap.paddingRight=20;wrap.paddingTop=wrap.paddingBottom=12;wrap.itemSpacing=5;
 if(s.back){const back=auto(wrap,'Voltar','HORIZONTAL',44,44,'surface');back.primaryAxisAlignItems='CENTER';back.counterAxisAlignItems='CENTER';back.cornerRadius=8;txt(back,'‹',44,22,true,'ink').textAlignHorizontal='CENTER';route(back,s.back,'Voltar',s.id,'back')}
 txt(wrap,s.title,width-40,22,true,'ink','Título');if(s.subtitle)txt(wrap,s.subtitle,width-40,12,false,'muted','Descrição');return wrap}
function main(parent,s,width=375){header(parent,s,width);tabs(parent,s);const viewport=auto(parent,'Conteúdo / rolagem','VERTICAL',width,240,'white');viewport.layoutSizingVertical='FILL';viewport.clipsContent=true;viewport.overflowDirection='VERTICAL';const inner=auto(viewport,'Conteúdo editável','VERTICAL',width,undefined,'white');inner.paddingLeft=inner.paddingRight=20;inner.paddingTop=10;inner.paddingBottom=12;inner.itemSpacing=10;for(const b of s.blocks)block(inner,b,s);
 const footer=auto(parent,'Ações fixas','VERTICAL',width,undefined,'white');footer.paddingLeft=footer.paddingRight=20;footer.paddingTop=footer.paddingBottom=8;footer.itemSpacing=2;linkButton(footer,s.action.label,s.action.to,s.id,true);if(s.secondary)textButton(footer,s.secondary.label,s.secondary.to,s.id);for(const a of s.links||[])textButton(footer,a.label,a.to,s.id);nav(parent,s);
}
function phone(s,i){const n=track(figma.createFrame());n.name=s.id+' · '+s.title;section.appendChild(n);n.resize(375,667);n.x=30+(i%5)*445;n.y=130+Math.floor(i/5)*760;n.fills=[solid('white')];n.clipsContent=true;line(n);built[s.id]=n.id;
 if(s.presentation){
  const bg=auto(n,'Contexto ao fundo','VERTICAL',375,667,'selected');bg.paddingLeft=20;bg.paddingTop=32;bg.itemSpacing=20;txt(bg,'19:02',335,11,true);txt(bg,'Tela de origem: '+(s.back||'Início'),335,14,true,'muted');const bar=auto(bg,'Conteúdo ao fundo','VERTICAL',335,240,'surface');bar.cornerRadius=10;
  const sheet=s.presentation==='sheet';const panel=auto(n,sheet?'Painel inferior':'Modal','VERTICAL',sheet?375:335,sheet?530:465,'white');panel.x=sheet?0:20;panel.y=sheet?137:108;panel.clipsContent=true;panel.cornerRadius=sheet?16:12;line(panel);if(sheet){const handle=auto(panel,'Indicador de arraste','HORIZONTAL',44,5,'line');handle.cornerRadius=3;handle.layoutAlign='CENTER';}
  main(panel,s,sheet?375:335);
 }else{
  const content=auto(n,'Tela iOS','VERTICAL',375,667,'white');content.itemSpacing=0;
  const status=auto(content,'Barra de status iOS','HORIZONTAL',375,25,'white');status.paddingLeft=status.paddingRight=16;status.primaryAxisAlignItems='SPACE_BETWEEN';status.counterAxisAlignItems='CENTER';txt(status,'19:02',80,10,true);txt(status,'••• ▰',80,10,true).textAlignHorizontal='RIGHT';
  main(content,s);
 }
 const label=txt(section,s.id+' · '+s.title,375,14,true,'ink','Identificação da tela');label.x=n.x;label.y=n.y-28;
 if(s.note){const note=txt(section,s.note,375,11,false,'muted','Regra do fluxo');note.x=n.x;note.y=n.y+676;}
 return n;
}
if(SECTION_INDEX===0&&!section.children.some(n=>n.name==='Mapa do fluxo principal')){
 const guide=txt(section,'Splash → Boas-vindas → escolha entre Criar conta e Entrar',2180,16,true,'ink','Mapa do fluxo principal');guide.x=30;guide.y=45;
}
for(let i=0;i<SCREENS.length;i++){const s=SCREENS[i];if(section.children.some(n=>n.type==='FRAME'&&n.name===s.id+' · '+s.title))continue;phone(s,i+SCREEN_OFFSET)}
return {createdNodeIds:ids,mutatedNodeIds:[section.id],screens:built,routes,sectionId:section.id,screenCount:Object.keys(built).length};
