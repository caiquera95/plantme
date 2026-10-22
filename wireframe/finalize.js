const page=await figma.getNodeByIdAsync(STATE.pageId);await figma.setCurrentPageAsync(page);
await Promise.all(STATE.fonts.map(f=>figma.loadFontAsync(f)));
const createdNodeIds=[],mutatedNodeIds=[],extraRoutes=[];
function nodeAction(key){return {type:'NODE',destinationId:STATE.screens[key],navigation:'NAVIGATE',transition:null};}
function set(name,value){return {type:'SET_VARIABLE',variableId:STATE.runtime[name],variableValue:{type:typeof value==='boolean'?'BOOLEAN':'STRING',resolvedType:typeof value==='boolean'?'BOOLEAN':'STRING',value}};}
function eq(name,value){return {type:'EXPRESSION',resolvedType:'BOOLEAN',value:{expressionFunction:'EQUALS',expressionArguments:[{type:'VARIABLE_ALIAS',resolvedType:'BOOLEAN',value:{type:'VARIABLE_ALIAS',id:STATE.runtime[name]}},{type:'BOOLEAN',resolvedType:'BOOLEAN',value}]}};}
const splash=await figma.getNodeByIdAsync(STATE.screens.A00);
await splash.setReactionsAsync([{trigger:{type:'AFTER_TIMEOUT',timeout:1.2},actions:[{type:'CONDITIONAL',conditionalBlocks:[{condition:eq('auth',true),actions:[nodeAction('H02')]},{condition:eq('hasPlants',true),actions:[nodeAction('H01')]},{actions:[nodeAction('A01')]}]}]}]);mutatedNodeIds.push(splash.id);
const green=await figma.variables.getVariableByIdAsync(STATE.variables.dark),soft=await figma.variables.getVariableByIdAsync(STATE.variables.soft);
function label(parent,value,width=343){const t=figma.createText();t.fontName={family:'Inter',style:'Regular'};t.textStyleId=STATE.styles.label;t.characters=value;t.resize(width,22);t.textAutoResize='HEIGHT';t.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',green)];parent.appendChild(t);t.layoutSizingVertical='HUG';createdNodeIds.push(t.id);return t;}
for(const key of ['N00','N02','N03','N05','N08']){
 const phone=await figma.getNodeByIdAsync(STATE.screens[key]);const footer=phone.children.find(c=>c.name==='Ações / Fixas');const link=figma.createAutoLayout('HORIZONTAL');link.name='Cancelar cadastro';link.resize(343,44);link.layoutSizingVertical='FIXED';link.primaryAxisAlignItems='CENTER';link.counterAxisAlignItems='CENTER';link.fills=[];footer.appendChild(link);createdNodeIds.push(link.id);const text=label(link,'Cancelar cadastro');text.textAlignHorizontal='CENTER';await link.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[set('draftStep',key),nodeAction('N07')]}]);extraRoutes.push([link.id,'N07','Cancelar cadastro',key,'action']);mutatedNodeIds.push(footer.id);
}
for(const key of ['H02','F00']){
 const note=await figma.getNodeByIdAsync(STATE.annotations[key]);const link=figma.createAutoLayout('HORIZONTAL');link.name='Cenário / Sessão expirada';link.resize(375,44);link.layoutSizingVertical='HUG';link.paddingLeft=link.paddingRight=12;link.paddingTop=link.paddingBottom=12;link.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',soft)];link.cornerRadius=10;note.appendChild(link);createdNodeIds.push(link.id);label(link,'Sessão expirada → X06',351);await link.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[set('auth',false),set('errorReturn',key),nodeAction('X06')]}]);extraRoutes.push([link.id,'X06','Sessão expirada',key,'scenario']);mutatedNodeIds.push(note.id);
}
const kit=await figma.getNodeByIdAsync(STATE.kitId);kit.x=100;kit.y=-kit.height-120;mutatedNodeIds.push(kit.id);
const guide=await figma.getNodeByIdAsync(STATE.headerId);guide.resize(2937,guide.height);guide.layoutSizingVertical='HUG';mutatedNodeIds.push(guide.id);
let nextY=guide.y+guide.height+160;const bounds=[];
for(const key of ORDER){const section=await figma.getNodeByIdAsync(STATE.boards[key]);const board=await figma.getNodeByIdAsync(STATE.boardContents[key]);section.resizeWithoutConstraints(board.width,board.height);section.x=100;section.y=nextY;mutatedNodeIds.push(section.id);bounds.push({group:key,id:section.id,x:section.x,y:section.y,w:section.width,h:section.height});nextY+=section.height+160;}
const nativeText=[];for(const key of ['I02','I03','N06','X04']){const n=await figma.getNodeByIdAsync(STATE.annotations[key]);nativeText.push({key,id:n.id});}
figma.viewport.scrollAndZoomIntoView([guide]);
return {createdNodeIds,mutatedNodeIds,extraRoutes,bounds,nativeText,pageId:page.id};
