const page=await figma.getNodeByIdAsync(STATE.pageId);await figma.setCurrentPageAsync(page);
await Promise.all(STATE.fonts.map(f=>figma.loadFontAsync(f)));
const createdNodeIds=[],mutatedNodeIds=[],screens={},routes=[],annotations={};
const vars={};for(const [k,id]of Object.entries(STATE.variables))vars[k]=await figma.variables.getVariableByIdAsync(id);
const comps={};for(const [k,id]of Object.entries(STATE.components))comps[k]=await figma.getNodeByIdAsync(id);
function track(n){createdNodeIds.push(n.id);return n;}
function paint(k){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vars[k]);}
function fill(n,k){n.fills=[paint(k)];}
function gap(n,key='gap/md'){n.setBoundVariable('itemSpacing',vars[key]);}
function padding(n,value=16){n.paddingLeft=n.paddingRight=n.paddingTop=n.paddingBottom=value;}
function frame(parent,name,dir='VERTICAL',w=343){const n=track(figma.createAutoLayout(dir));n.name=name;n.fills=[];n.resize(w,40);n.layoutSizingVertical='HUG';n.itemSpacing=12;parent.appendChild(n);return n;}
function text(parent,value,w=343,style='body',color='ink'){const t=track(figma.createText());t.fontName={family:'Inter',style:'Regular'};t.textStyleId=STATE.styles[style];t.characters=value;t.resize(w,22);t.textAutoResize='HEIGHT';t.fills=[paint(color)];parent.appendChild(t);t.layoutSizingVertical='HUG';return t;}
const iconIds={home:'130:400',leaf:'130:403',book:'130:407',user:'130:410',plus:'130:416',bell:'130:331',sun:'130:337',drop:'130:353',check:'130:367',next:'130:379',star:'130:390',trophy:'130:395',back:'130:431',search:'130:435',camera:'130:439',manual:'130:443',close:'130:453',edit:'130:526',pin:'130:564'};
const iconSources={};for(const[k,id]of Object.entries(iconIds))iconSources[k]=await figma.getNodeByIdAsync(id);
function icon(parent,key,size=22,color='dark'){const n=iconSources[key in iconSources?key:'leaf'].clone();parent.appendChild(n);createdNodeIds.push(n.id,...n.findAll(()=>true).map(n=>n.id));n.rescale(size/n.width);n.name='Ícone / '+key;for(const v of [n,...n.findAll(()=>true)]){if('fills'in v&&Array.isArray(v.fills))v.fills=v.fills.map(p=>p.type==='SOLID'?figma.variables.setBoundVariableForPaint({...p},'color',vars[color]):p);if('strokes'in v&&Array.isArray(v.strokes))v.strokes=v.strokes.map(p=>p.type==='SOLID'?figma.variables.setBoundVariableForPaint({...p},'color',vars[color]):p);}return n;}
const assets={welcome:'116794610004e1e05c5018dadecc59dbb8462de8',mascot:'41329ae1a96e27d20cdf22e4e6d6f36eb8655c16',monstera:'14f49b64bd520e4ca3b6ded2423bb3afb5cc6404',jiboia:'884e65ee4147e993a7cc2df0c5983a2295b6c795',espada:'685b251c7ea3ee82cb18129c293d4e637352c1d1'};
function photo(parent,key,w=343,h=150){const r=track(figma.createRectangle());r.name='Foto / '+key;r.resize(w,h);r.cornerRadius=18;r.fills=[{type:'IMAGE',imageHash:assets[key]||assets.monstera,scaleMode:key==='mascot'?'FIT':'FILL'}];parent.appendChild(r);return r;}
function instance(parent,kind,title,body,w=343){const n=comps[kind].createInstance();parent.appendChild(n);createdNodeIds.push(n.id,...n.findAll(()=>true).map(n=>n.id));n.name=kind+' / '+title;n.resize(w,n.height);const props=STATE.properties[kind];n.setProperties({[props.title]:title,[props.body]:body||''});return n;}
function route(n,to,label,source,type='action'){if(to)routes.push({nodeId:n.id,to,label,source,type});}
function button(parent,label,to,kind='primary',source){if(kind==='link'){const row=frame(parent,'Link / '+label,'HORIZONTAL');row.resize(343,44);row.layoutSizingVertical='FIXED';row.primaryAxisAlignItems='CENTER';row.counterAxisAlignItems='CENTER';const t=text(row,label,327,'label','dark');t.textAlignHorizontal='CENTER';route(row,to,label,source);return row;}const n=comps['button_'+kind].createInstance();parent.appendChild(n);createdNodeIds.push(n.id,...n.findAll(()=>true).map(n=>n.id));n.setProperties({[STATE.properties['button_'+kind].label]:label});n.name='Ação / '+label;route(n,to,label,source);return n;}
function row(parent,title,body,to,key,source){const container=frame(parent,'Linha / '+title,'HORIZONTAL');container.itemSpacing=8;container.counterAxisAlignItems='CENTER';icon(container,key||'leaf',22);const content=instance(container,'row',title,body,289);content.layoutSizingHorizontal='FILL';route(container,to,title,source,'row');return container;}

// Component foundations: widths react to their parent before instances are created.
if(BOOTSTRAP){
  for(const c of Object.values(comps)){for(const t of c.findAllWithCriteria({types:['TEXT']})){t.layoutSizingHorizontal='FILL';mutatedNodeIds.push(t.id);}}
  const kit=await figma.getNodeByIdAsync(STATE.kitId);
  const navIds={};const names=['Início','Coleção','Dicas','Perfil'];
  for(const active of names){const c=track(figma.createComponent());c.name='Wireframe / Navigation / Active='+active;c.layoutMode='HORIZONTAL';c.resize(375,64);c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';c.paddingLeft=c.paddingRight=8;c.paddingTop=c.paddingBottom=6;c.itemSpacing=6;c.fills=[paint('white')];kit.appendChild(c);c.description='Navegação principal do PlantMe: Início, Coleção, adicionar, Dicas e Perfil. Cada item é um alvo de toque.';const cells=[['Início','home','H02'],['Coleção','leaf','D01'],['Adicionar','plus','P00'],['Dicas','book','L00'],['Perfil','user','F00']];for(const [label,key,to] of cells){const cell=frame(c,'Nav / '+label,'VERTICAL',67);cell.resize(67,52);cell.layoutSizingVertical='FIXED';cell.counterAxisAlignItems='CENTER';cell.primaryAxisAlignItems='CENTER';cell.itemSpacing=3;if(label==='Adicionar'){const circle=frame(cell,'Adicionar planta','HORIZONTAL',44);circle.resize(44,44);circle.layoutSizingVertical='FIXED';circle.primaryAxisAlignItems='CENTER';circle.counterAxisAlignItems='CENTER';fill(circle,'dark');circle.cornerRadius=22;icon(circle,key,22,'white');}else{icon(cell,key,20,label===active?'dark':'muted');const t=text(cell,label,67,'caption',label===active?'dark':'muted');t.fontSize=11;t.lineHeight={unit:'PIXELS',value:14};t.textAlignHorizontal='CENTER';} }navIds[active]=c.id;}
  const guide=await figma.getNodeByIdAsync(STATE.headerId);text(guide,'PlantMe / wireframe de alta fidelidade',2800,'title');text(guide,'125 telas e estados · 12 jornadas · 375 × 667 · camadas editáveis · fluxos conectados',2800,'body','muted');
  const cols=frame(guide,'Como usar o arquivo','HORIZONTAL',2889);cols.itemSpacing=24;
  const rules=[['01 / Percorra as jornadas','Use os pontos de entrada do protótipo. Em cada tela, os botões do app navegam; os cenários alternativos ficam fora da interface.'],['02 / Leia o contrato de cada tela','Abaixo da tela: entradas, destinos, comportamento de voltar, validações e efeitos nos dados. Campos, fotos e nomes são exemplos; o aplicativo preenche dados reais.'],['03 / Finalize o UI com o fluxo definido','Identidade reaproveitada: paleta, fotos e ícones do PlantMe; tipografia dos estilos Mobile existentes, com Manrope nas ações. Ajuste o visual sem alterar a lógica documentada.']];for(const[title,body]of rules){const col=frame(cols,title,'VERTICAL',920);instance(col,'card',title,body,920);}
  text(guide,'Decisões de fluxo',2800,'small');text(guide,'Conta opcional no primeiro acesso • Onboarding não pede permissões • + abre buscar / identificar / manual • Planta é criada somente ao salvar • Verificação sem rega é válida • Sair preserva a conta e oculta dados privados • Excluir requer confirmação e identidade recente.',2800,'body');
  text(guide,'Representação e limites do protótipo',2800,'small');text(guide,'As telas são um contrato de navegação e conteúdo, não um aplicativo funcional: formulários e listas usam dados demonstrativos. Câmera, galeria, permissões e Ajustes são representações do sistema. Reconhecimento, clima, sincronização e exportação dependem de serviços na implementação. Conteúdo editorial e jurídico precisa de texto aprovado.',2800,'body','muted');
  return {createdNodeIds,mutatedNodeIds,navIds,guideId:guide.id,componentCount:Object.keys(navIds).length};
}

for(const groupKey of BUILD_GROUPS){
  const g=INVENTORY.groups.find(g=>g.key===groupKey);const board=await figma.getNodeByIdAsync(STATE.boards[groupKey]);
  if(board.children.length)throw new Error('Grupo já preenchido: '+groupKey);
  board.resize(2937,40);board.layoutSizingVertical='HUG';board.itemSpacing=24;
  text(board,g.title,2889,'title');text(board,g.description,2889,'body','muted');
  const items=INVENTORY.screens.filter(s=>s.group===groupKey);let lane;
  for(let index=0;index<items.length;index++){
    const s=items[index];if(index%7===0){lane=frame(board,'Telas / Linha '+(Math.floor(index/7)+1),'HORIZONTAL',2889);lane.itemSpacing=44;lane.counterAxisAlignItems='MIN';}
    const cell=frame(lane,s.key+' / Tela e contrato','VERTICAL',375);cell.itemSpacing=12;
    text(cell,s.key+' · '+s.title,375,'label','dark');
    const phone=frame(cell,s.key+' / '+s.title,'VERTICAL',375);phone.resize(375,667);phone.layoutSizingVertical='FIXED';phone.layoutSizingHorizontal='FIXED';phone.itemSpacing=0;phone.cornerRadius=0;fill(phone,'bg');phone.clipsContent=true;screens[s.key]=phone.id;
    const status=frame(phone,'Status bar / SE','HORIZONTAL',375);status.resize(375,20);status.layoutSizingVertical='FIXED';status.paddingLeft=status.paddingRight=12;status.counterAxisAlignItems='CENTER';status.primaryAxisAlignItems='SPACE_BETWEEN';const time=text(status,'9:41',100,'caption');time.fontSize=11;const battery=text(status,'100%',100,'caption');battery.fontSize=11;battery.textAlignHorizontal='RIGHT';
    const head=frame(phone,'Cabeçalho','HORIZONTAL',375);head.paddingLeft=head.paddingRight=16;head.paddingTop=head.paddingBottom=12;head.itemSpacing=8;head.counterAxisAlignItems='CENTER';
    if(s.back){const back=frame(head,'Voltar','HORIZONTAL',44);back.resize(44,44);back.layoutSizingVertical='FIXED';back.primaryAxisAlignItems='CENTER';back.counterAxisAlignItems='CENTER';icon(back,'back',24);route(back,s.back,'Voltar',s.key,'back');}
    const heading=text(head,s.title,s.back?291:343,'title');heading.layoutSizingHorizontal='FILL';if(s.key==='A00'){heading.fontName={family:'Nunito',style:'Black'};heading.fontSize=34;heading.lineHeight={unit:'PIXELS',value:42};}
    const viewport=frame(phone,'Conteúdo / Rolagem vertical','VERTICAL',375);viewport.resize(375,360);viewport.layoutSizingVertical='FILL';viewport.clipsContent=true;viewport.overflowDirection='VERTICAL';viewport.itemSpacing=0;
    const content=frame(viewport,'Conteúdo editável','VERTICAL',375);content.paddingLeft=content.paddingRight=16;content.paddingTop=4;content.paddingBottom=20;content.itemSpacing=12;
    if(s.subtitle)text(content,s.subtitle,343,'body','muted');
    for(const block of s.blocks){
      if(block.kind==='photo'){photo(content,block.title,343,block.height);}
      else if(block.kind==='field'){const n=instance(content,'field',block.title,block.body);if(block.hint)text(content,block.hint,343,'caption','muted');}
      else if(block.kind==='card'||block.kind==='notice'||block.kind==='system'){const n=instance(content,block.kind==='system'?'notice':block.kind,block.title,block.body);route(n,block.to,block.title,s.key,'card');}
      else if(block.kind==='row'){row(content,block.title,block.body,block.to,block.icon,s.key);}
      else if(block.kind==='choices'){for(let i=0;i<block.items.length;i++){const [title,body]=block.items[i].split('|');const n=instance(content,'choice',title,body);if(/^Selecionad/i.test(body)||(!/Não selecionad/i.test(body)&&i===0)){n.fills=[paint('soft')];n.strokes=[paint('green')];}}}
      else if(block.kind==='chips'){const container=frame(content,'Filtros / Categorias','HORIZONTAL');container.itemSpacing=6;for(let i=0;i<block.items.length;i++){const title=block.items[i];const pill=frame(container,'Filtro / '+title,'HORIZONTAL',Math.min(110,Math.max(60,title.length*7+20)));pill.paddingLeft=pill.paddingRight=8;pill.paddingTop=pill.paddingBottom=8;pill.cornerRadius=12;fill(pill,i===0?'soft':'white');const label=text(pill,title,pill.width-16,'caption',i===0?'dark':'muted');label.textAlignHorizontal='CENTER';route(pill,block.to,title,s.key,'filter');}}
      else if(block.kind==='plants'){const plantRow=frame(content,'Plantas da coleção','HORIZONTAL');plantRow.itemSpacing=8;for(const key of block.items){const card=frame(plantRow,'Minha planta / '+key,'VERTICAL',109);fill(card,'white');card.cornerRadius=14;card.itemSpacing=6;photo(card,key,109,110);const title=text(card,key==='monstera'?'Monstera':key==='jiboia'?'Jiboia':'Espada',109,'label');title.textAlignHorizontal='CENTER';const desc=text(card,'Ver planta',109,'caption','muted');desc.textAlignHorizontal='CENTER';card.paddingBottom=10;route(card,block.to,'Ver '+key,s.key,'plant');}}
      else if(block.kind==='check'){const n=instance(content,'choice','✓ '+block.title,block.body);n.fills=[paint('soft')];}
      else if(block.kind==='skeleton'){const n=frame(content,'Skeleton / Carregando','VERTICAL');n.resize(343,80);n.layoutSizingVertical='FIXED';fill(n,'border');n.cornerRadius=14;}
    }
    if(s.actions.length){const footer=frame(phone,'Ações / Fixas','VERTICAL',375);footer.paddingLeft=footer.paddingRight=16;footer.paddingTop=footer.paddingBottom=12;footer.itemSpacing=8;for(const action of s.actions)button(footer,action.label,action.to,action.style,s.key);}
    if(s.tab){const navMain=await figma.getNodeByIdAsync(STATE.navIds[s.tab]);const nav=navMain.createInstance();phone.appendChild(nav);createdNodeIds.push(nav.id,...nav.findAll(()=>true).map(n=>n.id));nav.name='Navegação principal';const mapping={'Início':'H02','Coleção':'D01','Adicionar':'P00','Dicas':'L00','Perfil':s.key==='F01'||s.key==='H00'||s.key==='D02'?'F01':'F00'};for(const cell of nav.children){const name=cell.name.replace('Nav / ','');route(cell,mapping[name],name,s.key,'nav');}}
    const note=frame(cell,'Contrato de navegação','VERTICAL',375);note.itemSpacing=8;annotations[s.key]=note.id;
    text(note,'FLUXO / '+s.key,375,'label','dark');
    const actionLines=s.actions.map(a=>a.label+' → '+a.to);const rowLines=s.blocks.filter(b=>b.to).map(b=>b.title+' → '+b.to);
    if(s.back)actionLines.push('Voltar → '+s.back+' (ou origem registrada)');
    if(actionLines.length||rowLines.length)text(note,[...actionLines,...rowLines].join('\n'),375,'caption','muted');
    if(s.note)text(note,s.note,375,'caption');
    if(s.states.length){text(note,'CENÁRIOS ALTERNATIVOS',375,'label','dark');for(const action of s.states){const scenario=frame(note,'Cenário / '+action.label,'HORIZONTAL',375);scenario.paddingTop=scenario.paddingBottom=8;scenario.paddingLeft=scenario.paddingRight=12;scenario.cornerRadius=10;fill(scenario,'soft');const t=text(scenario,action.label+' → '+action.to,351,'caption','dark');route(scenario,action.to,action.label,s.key,'scenario');}}
  }
  board.placeholder=false;mutatedNodeIds.push(board.id);
}
return {createdNodeIds,mutatedNodeIds,screens,routes:routes.map(r=>[r.nodeId,r.to,r.label,r.source,r.type]),annotations,groups:BUILD_GROUPS,screenCount:Object.keys(screens).length};
