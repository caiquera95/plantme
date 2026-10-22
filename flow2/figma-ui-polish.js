// Ajustes de legibilidade após revisão visual em 375 × 667 pt.
const page=figma.getNodeById('557:1607');await figma.setCurrentPageAsync(page);
const fonts=[{family:'Nunito',style:'ExtraBold'},{family:'Manrope',style:'Medium'}];for(const f of fonts)await figma.loadFontAsync(f);
const c=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
const fill=color=>({type:'SOLID',color});const changed=[],created=[];
for(const id of ['559:1660','559:1685']){const f=figma.getNodeById(id);const n=f.findOne(x=>x.name==='Imagem / PlantMe · '+(id==='559:1660'?'signup':'login'));if(n){n.x=305;n.y=40;n.resize(46,46);changed.push(n.id)}}
for(const id of ['559:1888','559:1919','559:1955','559:2022','559:2114','559:2163','559:2191','559:2222','559:2252','559:2285','559:2318','559:2348']){
  const frame=figma.getNodeById(id),nav=frame.children.find(n=>n.name==='Navegação principal');if(!nav)continue;
  const icons=['⌂','♧','◷','◎','◉'];
  nav.children.filter(n=>n.type==='FRAME').forEach((tab,i)=>{
    const old=tab.children.find(n=>n.name==='Ícone');if(old)old.remove();
    const caption=tab.findOne(n=>n.type==='TEXT');if(caption){caption.y=35;caption.fontSize=9;changed.push(caption.id)}
    const active=tab.fills?.[0]?.color?.r<.95;
    const t=figma.createText();tab.appendChild(t);t.name='Ícone';t.fontName={family:'Nunito',style:'ExtraBold'};t.fontSize=20;t.characters=icons[i];t.fills=[fill(active?c('#176333'):c('#5D6360'))];t.resize(75,23);t.textAlignHorizontal='CENTER';t.x=0;t.y=3;created.push(t.id);
  });
}
const stats=figma.getNodeById('559:2191');
const subtitle=stats.children.find(n=>n.name==='Descrição');subtitle.characters='Acompanhe sua evolução com as plantas.';changed.push(subtitle.id);
const statsCards=stats.findAll(n=>n.type==='INSTANCE'&&n.name.startsWith('card /'));
const bodies=['7 dias seguidos com cuidados em dia.','1 planta recuperada nesta coleção.','3 de 4 plantas com rotina em dia.'];
statsCards.forEach((n,i)=>{n.setProperties({'Body#155:7':bodies[i]});changed.push(n.id)});
const note=stats.children.find(n=>n.name==='Nota');if(note){note.visible=false;changed.push(note.id)}
const permission=figma.getNodeById('559:1869');
const existing=permission.children.find(n=>n.name==='Resumo visível / cuidados criados');if(existing)existing.remove();
const box=figma.createFrame();permission.insertChild(5,box);box.name='Resumo visível / cuidados criados';box.x=20;box.y=475;box.resize(335,121);box.cornerRadius=16;box.fills=[fill(c('#F2F8F0'))];box.strokes=[fill(c('#E6E5DE'))];created.push(box.id);
function line(value,y){const t=figma.createText();box.appendChild(t);t.name='Cuidado criado';t.fontName={family:'Manrope',style:'Medium'};t.fontSize=13;t.characters=value;t.fills=[fill(c('#0C1916'))];t.resize(303,18);t.x=16;t.y=y;created.push(t.id)}
line('✓  Verificar a terra em 7 dias',20);line('✓  Adubar em 30 dias',52);line('✓  Outros cuidados ajustáveis',84);
return {mutatedNodeIds:changed,createdNodeIds:created,pageId:page.id};
