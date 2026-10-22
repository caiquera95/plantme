// PlantMe · Flow 2.0 — acabamento de UI para iPhone SE 2020 (375 × 667 pt).
// Executar no arquivo PlantMe 2.0 via use_figma.
const page = figma.getNodeById('557:1607');
await figma.setCurrentPageAsync(page);

const F = {
  heading:{family:'Nunito',style:'Black'},
  strong:{family:'Nunito',style:'ExtraBold'},
  button:{family:'Nunito',style:'ExtraBold'},
  body:{family:'Manrope',style:'Medium'},
  small:{family:'Manrope',style:'SemiBold'},
  normal:{family:'Manrope',style:'Regular'},
  inter:{family:'Inter',style:'Regular'},
  interMedium:{family:'Inter',style:'Medium'},
  interSemi:{family:'Inter',style:'Semi Bold'}
};
for(const font of Object.values(F)) await figma.loadFontAsync(font);

const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
const P={cream:rgb('#FBFAF6'),white:rgb('#FFFFFF'),ink:rgb('#0C1916'),green:rgb('#176333'),deep:rgb('#104824'),softGreen:rgb('#E8F4E5'),paleGreen:rgb('#F2F8F0'),body:rgb('#5D6360'),muted:rgb('#7D827F'),border:rgb('#E6E5DE'),blue:rgb('#DDF0FF'),amber:rgb('#FFF0BF'),red:rgb('#FFF1F2')};
const solid=color=>({type:'SOLID',color});
const photo=hash=>({type:'IMAGE',imageHash:hash,scaleMode:'FILL'});
const A={brotuWelcome:'63f2cbcd87394208436ec78e429c2a188a016558',brotuLogin:'8f24d7d396d5f3c59c5190e8613856e3cad68c06',brotuCare:'da786aaffbce1460c5c7ae379de217e0025a656b',brotuCelebrate:'1b03258136a614c6de2eba679b4da14f79e147cf',brotuHome:'a0ed1750040edd7f346b048937828f7867ace36e',jiboia:'3016cb6f459465741bfcd522c13151b9039bfe21',jiboiaRoom:'9d81221336e52eeb17f8e484b4a8110e60f088e9',monstera:'14f49b64bd520e4ca3b6ded2423bb3afb5cc6404',succulent:'071c8cf37c1dac5bbe4249093d3ba3c024d2bfd7',espada:'685b251c7ea3ee82cb18129c293d4e637352c1d1',tutorial:'254dd02e9aee4141faad63f47ece1cd470f81444'};
const frames=[
['splash','559:1628'],['welcome','559:1639'],['signup','559:1660'],['login','559:1685'],['recover','559:1709'],['experience','559:1725'],['interests','559:1744'],['add_plant','559:1765'],['photo_source','559:1787'],['plant_context','559:1803'],['care_frequency','559:1822'],['review_plan','559:1845'],['permission_ios','559:1869'],['home','559:1888'],['collection','559:1919'],['plant_detail','559:1955'],['care_sheet','559:1984'],['care_success','559:2008'],['alerts','559:2022'],['tips','559:2055'],['saved_tips','559:2077'],['tutorial','559:2093'],['community','559:2114'],['create_post','559:2142'],['profile','559:2163'],['stats','559:2191'],['achievements','559:2222'],['settings','559:2252'],['account','559:2285'],['notification_preferences','559:2318'],['theme_language','559:2348'],['logout','559:2375']];
const changed=[]; const created=[]; const touched=n=>{changed.push(n.id);return n};
// Permite retomar a operação após uma falha sem duplicar ornamentos.
for(const n of page.findAll(n=>/^(Imagem \/ PlantMe ·|Mancha orgânica \/ fundo|Superfície \/ painel inferior|Avatar \/ Anna|Inicial \/ Anna|Foto \/ Jiboia$)/.test(n.name)&&n.type!=='INSTANCE'))n.remove();
function setText(n,font,size,color){n.fontName=font;n.fontSize=size;n.fills=[solid(color)];touched(n)}
function img(parent,name,hash,x,y,w,h,r=0){const n=figma.createRectangle();parent.appendChild(n);n.name=name;n.resize(w,h);n.x=x;n.y=y;n.cornerRadius=r;n.fills=[photo(hash)];n.strokes=[];created.push(n.id);return n}
function shape(parent,name,x,y,w,h,color,r=0){const n=figma.createRectangle();parent.appendChild(n);n.name=name;n.resize(w,h);n.x=x;n.y=y;n.cornerRadius=r;n.fills=[solid(color)];n.strokes=[];created.push(n.id);return n}
function label(parent,name,value,x,y,w,font,size,color){const n=figma.createText();parent.appendChild(n);n.name=name;n.fontName=font;n.fontSize=size;n.fills=[solid(color)];n.characters=value;n.resize(w,20);n.textAutoResize='HEIGHT';n.x=x;n.y=y;created.push(n.id);return n}
function child(f,name){return f.children.find(n=>n.name===name)}
function cards(f){return f.findAll(n=>n.type==='INSTANCE'&&!n.name.startsWith('button /'))}
function styleCard(n,i){
  const kind=n.name.split(' / ')[0];
  n.resize(335,n.height);n.cornerRadius=16;
  n.fills=[solid(kind==='notice'?P.paleGreen:(kind==='choice'&&i===0?P.softGreen:P.white))];
  n.strokes=[solid(kind==='choice'&&i===0?rgb('#9DCE91'):P.border)];n.strokeWeight=1;
  if(kind==='card'||kind==='row')n.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:.055},offset:{x:0,y:4},radius:10,spread:0,visible:true,blendMode:'NORMAL'}];
  for(const t of n.findAll(x=>x.type==='TEXT')){
    const isBody=/descri|monstera/i.test(t.name)||t.y>35;
    setText(t,isBody?F.body:F.strong,isBody?12.5:15.5,isBody?P.body:P.ink);
  }
  touched(n);
}
function styleButton(n){n.x=16;n.resize(343,52);n.fills=[solid(P.green)];n.cornerRadius=13;n.strokes=[];n.effects=[{type:'DROP_SHADOW',color:{r:.03,g:.23,b:.1,a:.18},offset:{x:0,y:4},radius:0,spread:0,visible:true,blendMode:'NORMAL'}];for(const t of n.findAll(x=>x.type==='TEXT'))setText(t,F.button,16,P.white);touched(n)}
function decorate(id,f){
  const add=(hash,x,y,w,h)=>img(f,'Imagem / PlantMe · '+id,hash,x,y,w,h);
  if(id==='splash'){
    const content=child(f,'Conteúdo');content.visible=false;touched(content);
    const title=child(f,'Título');setText(title,F.heading,40,P.ink);title.x=20;title.y=84;title.textAlignHorizontal='CENTER';
    const desc=child(f,'Descrição');desc.x=20;desc.y=140;desc.textAlignHorizontal='CENTER';
    shape(f,'Mancha orgânica / fundo',32,204,311,311,P.paleGreen,155);
    add(A.brotuWelcome,35,206,305,305);
  }
  if(id==='welcome')add(A.brotuWelcome,125,420,125,125);
  if(id==='signup'||id==='login')add(id==='signup'?A.brotuCare:A.brotuLogin,283,65,70,70);
  if(id==='recover')add(A.brotuCare,110,351,155,155);
  if(id==='experience')add(A.brotuCare,125,423,125,125);
  if(id==='interests')add(A.brotuWelcome,134,424,110,110);
  if(id==='add_plant')add(A.jiboia,289,74,62,62);
  if(id==='photo_source')add(A.brotuHome,115,345,145,145);
  if(id==='plant_context')add(A.jiboia,111,425,150,135);
  if(id==='care_frequency')add(A.brotuCare,292,71,61,61);
  if(id==='review_plan'){
    const c=cards(f)[0];if(c)img(f,'Imagem / PlantMe · Jiboia do plano',A.jiboia,282,c.y+child(f,'Conteúdo').y+5,63,63,10);
  }
  if(id==='home'){
    const c=cards(f)[0];if(c)img(f,'Imagem / PlantMe · Jiboia do início',A.jiboia,286,c.y+child(f,'Conteúdo').y+5,65,65,10);
  }
  if(id==='collection'){
    const hashes=[A.jiboia,A.succulent,A.monstera,A.espada];
    f.children.filter(n=>n.name.startsWith('grid /')).forEach((g,i)=>{
      g.cornerRadius=16;g.fills=[solid(P.white)];g.strokes=[solid(P.border)];g.strokeWeight=1;
      const ph=g.children.find(n=>n.name==='[ foto da planta ]');if(ph){ph.fills=[photo(hashes[i])];ph.strokes=[];ph.cornerRadius=10;touched(ph)}
      touched(g);
    });
  }
  if(id==='plant_detail'){
    const ph=f.findOne(n=>n.name==='Imagem / [ Foto da Jiboia ]');if(ph){ph.fills=[photo(A.jiboiaRoom)];ph.strokes=[];ph.cornerRadius=16;const txt=ph.findAll(x=>x.type==='TEXT');for(const t of txt){t.visible=false;touched(t)}touched(ph)}
  }
  if(id==='care_sheet'){
    const sheet=shape(f,'Superfície / painel inferior',0,69,375,598,P.white,24);f.insertChild(2,sheet);sheet.resize(375,598);
  }
  if(id==='care_success')add(A.brotuCelebrate,113,361,148,148);
  if(id==='alerts')add(A.brotuCare,296,72,58,58);
  if(id==='tips')add(A.brotuHome,294,72,60,60);
  if(id==='saved_tips')add(A.brotuCare,110,360,155,155);
  if(id==='tutorial'){
    const ph=f.findOne(n=>n.name.startsWith('Imagem / [ Imagem do tutorial ]'));if(ph){ph.fills=[photo(A.tutorial)];ph.strokes=[];ph.cornerRadius=16;for(const t of ph.findAll(x=>x.type==='TEXT')){t.visible=false;touched(t)}touched(ph)}
  }
  if(id==='community')add(A.brotuHome,298,75,53,53);
  if(id==='profile'){
    shape(f,'Avatar / Anna',294,79,58,58,P.softGreen,29);const t=label(f,'Inicial / Anna','A',311,92,24,F.heading,24,P.green);t.textAlignHorizontal='CENTER';
  }
  if(id==='achievements')add(A.brotuCelebrate,116,430,140,140);
  if(id==='logout')add(A.brotuCare,112,320,150,150);
}
for(const [id,nodeId] of frames){
  const f=figma.getNodeById(nodeId);if(!f)throw new Error('Tela ausente: '+id);
  if(f.width!==375||f.height!==667)throw new Error('Tamanho incorreto: '+id);
  f.fills=[solid(P.cream)];f.strokes=[];touched(f);
  for(const t of f.children.filter(n=>n.type==='TEXT')){
    if(t.name==='Título'){setText(t,F.heading,23,P.ink);t.y=88;t.resize(335,t.height);t.textAutoResize='HEIGHT'}
    else if(t.name==='Descrição'){setText(t,F.body,12.5,P.body);t.resize(335,t.height);t.textAutoResize='HEIGHT'}
    else if(t.name==='Nota')setText(t,F.normal,10,P.muted);
    else if(t.name==='Hora'||t.name==='Sinal')setText(t,F.small,10,P.ink);
  }
  const back=child(f,'Voltar');if(back){back.fills=[solid(P.white)];back.cornerRadius=14;back.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:.1},offset:{x:0,y:3},radius:10,spread:0,visible:true,blendMode:'NORMAL'}];for(const t of back.findAll(x=>x.type==='TEXT'))setText(t,F.strong,28,P.green);touched(back)}
  const body=child(f,'Conteúdo');if(body){let i=0;for(const n of body.children.filter(x=>x.type==='INSTANCE'))styleCard(n,i++);touched(body)}
  for(const n of f.children.filter(x=>x.type==='INSTANCE'&&x.name.startsWith('button /')))styleButton(n);
  for(const n of f.children.filter(x=>x.name.startsWith('Ação secundária'))){n.fills=[];for(const t of n.findAll(x=>x.type==='TEXT'))setText(t,F.strong,12.5,P.green);touched(n)}
  const nav=child(f,'Navegação principal');if(nav){nav.fills=[solid(P.white)];nav.strokes=[solid(P.border)];nav.strokeWeight=1;for(const tab of nav.children){if(tab.type!=='FRAME')continue;const isActive=tab.fills?.[0]?.color?.r<.94;tab.fills=[solid(isActive?P.softGreen:P.white)];tab.cornerRadius=isActive?14:0;for(const t of tab.findAll(x=>x.type==='TEXT'))setText(t,F.strong,10,isActive?P.green:P.body);touched(tab)}touched(nav)}
  if(id!=='permission_ios')decorate(id,f);
}
// A permissão continua com aparência nativa do iOS; o plano salvo ao fundo recebe o tema PlantMe.
const permission=figma.getNodeById('559:1869');
const under=permission.findOne(n=>n.name==='Plano salvo / Jiboia');if(under){under.fills=[solid(P.paleGreen)];under.strokes=[solid(P.border)];under.cornerRadius=16;for(const t of under.findAll(n=>n.type==='TEXT'))setText(t,t.name==='Planta'?F.heading:F.body,t.name==='Planta'?18:12,t.name==='Local'||t.name==='Outros'?P.body:P.ink);touched(under)}
return {pageId:page.id,screenCount:frames.length,mutatedNodeIds:[...new Set(changed)],createdNodeIds:created,assetsUsed:Object.keys(A),targetSize:'375×667'};
