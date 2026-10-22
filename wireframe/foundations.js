const existing = figma.root.children.find(p => p.name === 'wireframe');
if (existing) return { alreadyExists: true, pageId: existing.id };
const page = figma.createPage(); page.name = 'wireframe';
await figma.setCurrentPageAsync(page);
const createdNodeIds = [page.id];
const fonts = [{family:'Inter',style:'Regular'},{family:'Inter',style:'Medium'},{family:'Inter',style:'Semi Bold'},{family:'Manrope',style:'Bold'},{family:'Nunito',style:'Black'}];
await Promise.all(fonts.map(f=>figma.loadFontAsync(f)));
const allVars = await figma.variables.getLocalVariablesAsync();
const vars = {}; for (const name of ['bg','white','ink','dark','green','soft','muted','border']) vars[name] = allVars.find(v=>v.name===name);
const coll = figma.variables.createVariableCollection('PlantMe / Wireframe');
const mode = coll.modes[0].modeId;
const variableIds = [coll.id];
function token(name,value,type,scopes){const v=figma.variables.createVariable(name,coll,type);v.scopes=scopes;v.setValueForMode(mode,value);v.setVariableCodeSyntax('WEB','var(--plantme-wireframe-'+name.replaceAll('/','-')+')');vars[name]=v;variableIds.push(v.id);return v;}
for(const [name,value] of Object.entries({'gap/sm':8,'gap/md':12,'gap/lg':16,'gap/xl':24,'radius/control':14,'radius/card':18}))token(name,value,'FLOAT',name.startsWith('gap')?['GAP']:['CORNER_RADIUS']);
token('danger',{r:0.62,g:0.18,b:0.15},'COLOR',['FRAME_FILL','SHAPE_FILL','TEXT_FILL']);
token('primary',{type:'VARIABLE_ALIAS',id:vars.dark.id},'COLOR',['FRAME_FILL','SHAPE_FILL','TEXT_FILL']);
function paint(key){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vars[key]);}
const localStyles = await figma.getLocalTextStylesAsync();
const styles = {};
for (const [key,name] of Object.entries({title:'Mobile/Title/Medium',small:'Mobile/Title/Small',body:'Mobile/Body/Medium',strong:'Mobile/Body/Strong',caption:'Mobile/Caption',label:'Mobile/Label/Medium'})) styles[key] = localStyles.find(s=>s.name===name);
const actionStyle = figma.createTextStyle(); actionStyle.name='Wireframe/Action';actionStyle.fontName={family:'Manrope',style:'Bold'};actionStyle.fontSize=16;actionStyle.lineHeight={unit:'PIXELS',value:22};styles.action=actionStyle;
function text(parent,value,width=311,style='body',color='ink'){const t=figma.createText();createdNodeIds.push(t.id);t.fontName={family:'Inter',style:'Regular'};t.textStyleId=styles[style].id;t.characters=value;t.textAutoResize='HEIGHT';t.resize(width,22);t.fills=[paint(color)];parent.appendChild(t);return t;}
function frame(parent,name,direction='VERTICAL',width=343){const n=figma.createAutoLayout(direction);createdNodeIds.push(n.id);n.name=name;n.fills=[];n.resize(width,40);n.layoutSizingVertical='HUG';n.itemSpacing=8;parent.appendChild(n);return n;}
const kit=frame(page,'00 / Kit de componentes do wireframe','VERTICAL',1800);kit.x=100;kit.y=-1300;kit.itemSpacing=24;kit.paddingTop=24;kit.paddingBottom=24;
text(kit,'Componentes reutilizáveis · PlantMe',1400,'title');
const comps={};const properties={};
function comp(name,w,h,dir='VERTICAL'){const c=figma.createComponent();createdNodeIds.push(c.id);c.name='Wireframe / '+name;c.layoutMode=dir;c.resize(w,h);c.primaryAxisSizingMode='AUTO';c.counterAxisSizingMode='FIXED';c.itemSpacing=4;c.paddingTop=12;c.paddingBottom=12;c.paddingLeft=16;c.paddingRight=16;c.cornerRadius=14;c.fills=[paint('white')];kit.appendChild(c);c.setBoundVariable('cornerRadius',vars['radius/control']);for(const p of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])c.setBoundVariable(p,vars['gap/lg']);return c;}
function prop(c,t,name){const k=c.addComponentProperty(name,'TEXT',t.characters);t.componentPropertyReferences={characters:k};return k;}
for(const kind of ['primary','secondary','danger','disabled']){const c=comp('Button / '+kind,343,48,'HORIZONTAL');c.primaryAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';c.paddingTop=0;c.paddingBottom=0;c.setBoundVariable('paddingTop',null);c.setBoundVariable('paddingBottom',null);c.fills=[paint(kind==='secondary'?'soft':kind==='disabled'?'border':kind)];const t=text(c,'Continuar',311,'action',kind==='secondary'||kind==='disabled'?'dark':'white');t.textAlignHorizontal='CENTER';properties['button_'+kind]={label:prop(c,t,'Label')};comps['button_'+kind]=c.id;c.description='Ação '+kind+' do wireframe. Label editável. Alvo de toque de 48 px.';}
for(const kind of ['field','card','notice','choice','row']){const c=comp(kind,343,80);c.fills=[paint(kind==='notice'?'soft':'white')];if(kind==='field'||kind==='choice'){c.strokes=[paint('border')];c.strokeWeight=1;}const title=text(c,kind==='field'?'Nome da planta':'Título',311,kind==='field'?'label':'strong',kind==='field'?'muted':'ink');const body=text(c,kind==='field'?'Monstera':'Descrição do conteúdo',311,kind==='field'?'body':'caption','muted');properties[kind]={title:prop(c,title,'Title'),body:prop(c,body,'Body')};comps[kind]=c.id;c.description='Estrutura reutilizável de '+kind+' para as telas e estados do PlantMe.';}
const header=frame(page,'00 / Mapa, regras e pontos de entrada','VERTICAL',3440);header.x=100;header.y=100;header.paddingLeft=24;header.paddingRight=24;header.paddingTop=24;header.paddingBottom=24;header.itemSpacing=16;header.fills=[paint('bg')];
const boards={};for(let i=0;i<GROUPS.length;i++){const g=GROUPS[i];const n=frame(page,g.title,'VERTICAL',3440);n.x=100;n.y=800+i*2550;n.paddingLeft=24;n.paddingRight=24;n.paddingTop=24;n.paddingBottom=24;n.itemSpacing=24;n.fills=[paint('bg')];n.placeholder=true;boards[g.key]=n.id;}
return {pageId:page.id,kitId:kit.id,headerId:header.id,boards,components:comps,properties,variables:Object.fromEntries(Object.entries(vars).map(([k,v])=>[k,v.id])),styles:Object.fromEntries(Object.entries(styles).map(([k,v])=>[k,v.id])),variableIds,styleIds:[actionStyle.id],createdNodeIds,fonts,scope:'125 telas e estados / componentes de apoio apenas',componentCount:Object.keys(comps).length};
