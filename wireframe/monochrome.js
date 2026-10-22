const page=await figma.getNodeByIdAsync(STATE.pageId);await figma.setCurrentPageAsync(page);
await Promise.all(FONTS.map(f=>figma.loadFontAsync(f)));
const createdNodeIds=[],mutatedNodeIds=new Set(),deletedNodeIds=[],placeholders=[],removedDecorations=[];
const palette={};for(const [k,id]of Object.entries(PALETTE))palette[k]=await figma.variables.getVariableByIdAsync(id);
const sourceRoles={bg:'background',white:'surface',ink:'text',dark:'primary',green:'borderStrong',soft:'selected',muted:'muted',border:'border',danger:'primary',primary:'primary'};
const aliasRoles={};for(const [key,role]of Object.entries(sourceRoles))aliasRoles[STATE.variables[key]]=role;
for(const [key,id]of Object.entries(PALETTE))aliasRoles[id]=key;
function gray(value){const n=Math.max(0,Math.min(1,value));return {r:n,g:n,b:n};}
function paint(role,original={type:'SOLID',color:{r:0,g:0,b:0}}){return figma.variables.setBoundVariableForPaint({...original},'color',palette[role]);}
function neutralize(p,node,property){
 if(p.type==='SOLID'){
   const role=aliasRoles[p.boundVariables?.color?.id];
   if(role)return paint(role,p);
   const value=0.2126*p.color.r+0.7152*p.color.g+0.0722*p.color.b;
   const fallback=node.type==='TEXT'?(value>0.85?'surface':value>0.32?'muted':'text'):property==='strokes'?'border':value<0.35?'primary':value>0.95?'surface':value>0.78?'selected':'muted';
   return paint(fallback,p);
 }
 if(p.type.startsWith('GRADIENT'))return {...p,gradientStops:p.gradientStops.map(s=>({...s,color:{...gray(0.2126*s.color.r+0.7152*s.color.g+0.0722*s.color.b),a:s.color.a}}))};
 return p;
}
function walk(node,result=[]){result.push(node);if('children'in node)for(const child of node.children)walk(child,result);return result;}
const roots=await Promise.all(ROOT_IDS.map(id=>figma.getNodeByIdAsync(id)));
const nodes=roots.filter(Boolean).flatMap(n=>walk(n));
const reverse=Object.fromEntries(Object.entries(STATE.screens).map(([k,v])=>[v,k]));
function screenKey(node){let p=node;while(p&&p.type!=='PAGE'){if(reverse[p.id])return reverse[p.id];p=p.parent;}return null;}
const images=nodes.filter(n=>'fills'in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE'));
for(const node of nodes){
 for(const property of ['fills','strokes'])if(property in node&&Array.isArray(node[property])&&node[property].length){node[property]=node[property].map(p=>neutralize(p,node,property));mutatedNodeIds.add(node.id);}
 if('effects'in node&&node.effects.length){node.effects=node.effects.map(e=>e.color?{...e,color:{...gray(0.2126*e.color.r+0.7152*e.color.g+0.0722*e.color.b),a:e.color.a},boundVariables:{}}:e);mutatedNodeIds.add(node.id);}
 if(node.type==='TEXT'&&node.characters.startsWith('Identidade reaproveitada:')){node.characters='Fidelidade estrutural: layout, conteúdo, campos, ações e estados definidos. Tons de cinza e espaços reservados para fotos; identidade visual aplicada nas telas finais.';mutatedNodeIds.add(node.id);}
}
for(const node of images){
 const key=screenKey(node),originalName=node.name;
 const decorative=/Foto \/ (welcome|mascot)$/.test(originalName)||key==='L02';
 if(decorative){removedDecorations.push({nodeId:node.id,screen:key,name:originalName});deletedNodeIds.push(node.id);mutatedNodeIds.delete(node.id);node.remove();continue;}
 const parent=node.parent,index=parent.children.indexOf(node),width=node.width,height=node.height;
 const slot=figma.createAutoLayout('VERTICAL');createdNodeIds.push(slot.id);slot.name='Espaço reservado / '+(key==='I03'?'Câmera':'Foto da planta');slot.resize(width,height);slot.primaryAxisSizingMode='FIXED';slot.counterAxisSizingMode='FIXED';slot.primaryAxisAlignItems='CENTER';slot.counterAxisAlignItems='CENTER';slot.fills=[];slot.cornerRadius=8;slot.paddingLeft=slot.paddingRight=8;parent.insertChild(index,slot);
 slot.appendChild(node);node.layoutPositioning='ABSOLUTE';node.x=node.y=0;node.name='Fundo / Espaço reservado';node.fills=[paint('placeholder')];node.strokes=[paint('border')];node.strokeWeight=1;node.cornerRadius=8;mutatedNodeIds.add(node.id);
 const label=figma.createText();createdNodeIds.push(label.id);label.fontName={family:'Inter',style:'Regular'};label.textStyleId=STATE.styles.caption;label.characters=key==='I03'?'Área da câmera':key==='I02'?'Foto selecionada':key==='I04'?'Foto para revisão':key==='I05'?'Foto em análise':width<160?'Foto da\nplanta':'Foto da planta';label.resize(width-16,22);label.textAutoResize='HEIGHT';label.textAlignHorizontal='CENTER';label.fills=[paint('muted')];slot.appendChild(label);label.layoutSizingVertical='HUG';
 placeholders.push({screen:key,nodeId:slot.id,backgroundId:node.id,labelId:label.id,width,height});
}
if(ROOT_IDS.includes(STATE.boards.A)){
 const splash=await figma.getNodeByIdAsync(STATE.screens.A00),head=splash.children.find(n=>n.name==='Cabeçalho'),viewport=splash.children.find(n=>n.name.startsWith('Conteúdo /'));
 const content=viewport.children.find(n=>n.name==='Conteúdo editável');
 if(head){const logo=head.findAllWithCriteria({types:['TEXT']})[0];const title=figma.createText();createdNodeIds.push(title.id);title.fontName=logo.fontName;title.fontSize=logo.fontSize;title.lineHeight=logo.lineHeight;title.characters='PlantMe';title.resize(343,44);title.textAutoResize='HEIGHT';title.textAlignHorizontal='CENTER';title.fills=[paint('text')];content.insertChild(0,title);title.layoutSizingVertical='HUG';deletedNodeIds.push(head.id);head.remove();}
 viewport.primaryAxisAlignItems='CENTER';content.primaryAxisAlignItems='CENTER';content.counterAxisAlignItems='CENTER';for(const t of content.children.filter(n=>n.type==='TEXT')){t.textAlignHorizontal='CENTER';mutatedNodeIds.add(t.id);}mutatedNodeIds.add(viewport.id);mutatedNodeIds.add(content.id);
}
return {createdNodeIds,mutatedNodeIds:[...mutatedNodeIds],deletedNodeIds,placeholders,removedDecorations,rootIds:ROOT_IDS,imageCountBefore:images.length};
