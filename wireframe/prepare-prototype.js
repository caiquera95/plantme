const page=await figma.getNodeByIdAsync(STATE.pageId);await figma.setCurrentPageAsync(page);
await Promise.all(STATE.fonts.map(f=>figma.loadFontAsync(f)));
const createdNodeIds=[],mutatedNodeIds=[],deletedNodeIds=[];
const coll=figma.variables.createVariableCollection('PlantMe / Prototype flow');
const variables={},defaults={auth:false,hasPlants:false,manualMode:false,photoMode:'identify',photoReturn:'N00',photoLabel:'Identificar planta',errorReturn:'N08',errorSuccess:'N09',authOrigin:'A01',entryOrigin:'H00',detailOrigin:'D01',catalogOrigin:'P01',guideOrigin:'P03',prefOrigin:'F00',legalOrigin:'F00',codeOrigin:'B02',settingsReturn:'F05',draftStep:'N00',discardTo:'D00'};
for(const [name,value]of Object.entries(defaults)){
 const v=figma.variables.createVariable(name,coll,typeof value==='boolean'?'BOOLEAN':'STRING');
 // Boolean flow flags are deliberately generic; they are not visual tokens.
 v.scopes=typeof value==='boolean'?['ALL_SCOPES']:['TEXT_CONTENT'];v.hiddenFromPublishing=true;
 v.setValueForMode(coll.modes[0].modeId,value);v.setVariableCodeSyntax('WEB','var(--prototype-'+name+')');variables[name]=v.id;
}
for(const n of page.findAllWithCriteria({types:['RECTANGLE']})){
 if(n.name==='Foto / monstera'&&n.width>120){n.fills=[{type:'IMAGE',imageHash:'551ea827ce02d4f25a35f438a70081ca07187e16',scaleMode:'FILL'}];mutatedNodeIds.push(n.id);}
}
const splash=await figma.getNodeByIdAsync(STATE.screens.A00),footer=splash.children.find(c=>c.name==='Ações / Fixas');
if(footer){deletedNodeIds.push(footer.id);footer.remove();}
const review=await figma.getNodeByIdAsync(STATE.screens.I04);
const reviewButton=review.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Ação / Identificar planta');
reviewButton.setProperties({[STATE.properties.button_primary.label]:{type:'VARIABLE_ALIAS',id:variables.photoLabel}});mutatedNodeIds.push(reviewButton.id);
const resend=await figma.getNodeByIdAsync(STATE.screens.B11);
const buttons=resend.children.find(c=>c.name==='Ações / Fixas').children;
buttons[0].setProperties({[STATE.properties.button_primary.label]:'Voltar ao código'});mutatedNodeIds.push(buttons[0].id);
if(buttons[1]){deletedNodeIds.push(buttons[1].id);buttons[1].remove();}
const guide=await figma.getNodeByIdAsync(STATE.headerId);
const dark=await figma.variables.getVariableByIdAsync(STATE.variables.dark),white=await figma.variables.getVariableByIdAsync(STATE.variables.white);
function text(p,value,w,style){const t=figma.createText();t.fontName={family:'Inter',style:'Regular'};t.textStyleId=STATE.styles[style];t.characters=value;t.resize(w,22);t.textAutoResize='HEIGHT';t.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',dark)];p.appendChild(t);t.layoutSizingVertical='HUG';createdNodeIds.push(t.id);return t;}
text(guide,'Índice das jornadas / pontos de entrada',2800,'small');let row;const guideNodes=[];
for(let i=0;i<ENTRIES.length;i++){
 const e=ENTRIES[i];if(i%3===0){row=figma.createAutoLayout('HORIZONTAL');row.resize(2889,100);row.layoutSizingVertical='HUG';row.itemSpacing=24;row.fills=[];guide.appendChild(row);createdNodeIds.push(row.id);}
 const card=figma.createAutoLayout('VERTICAL');card.resize(920,100);card.layoutSizingVertical='HUG';card.paddingLeft=card.paddingRight=card.paddingTop=card.paddingBottom=16;card.itemSpacing=8;card.cornerRadius=14;card.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:1,g:1,b:1}},'color',white)];row.appendChild(card);createdNodeIds.push(card.id);
 text(card,e.title+' → '+e.entry,888,'strong');text(card,e.description,888,'caption');
 const sets=[{type:'SET_VARIABLE',variableId:variables.auth,variableValue:{type:'BOOLEAN',resolvedType:'BOOLEAN',value:['H','D','C','L','F','S','X'].includes(e.key)}},{type:'SET_VARIABLE',variableId:variables.hasPlants,variableValue:{type:'BOOLEAN',resolvedType:'BOOLEAN',value:['H','D','C','L','F','S','X'].includes(e.key)}}];
 await card.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[...sets,{type:'NODE',destinationId:STATE.screens[e.entry],navigation:'NAVIGATE',transition:null}]}]);guideNodes.push(card.id);
}
page.flowStartingPoints=[{nodeId:STATE.screens.A00,name:'01 / Jornada completa · primeiro acesso'},{nodeId:STATE.screens.H02,name:'02 / Rotina de quem já tem plantas'},{nodeId:STATE.screens.P00,name:'03 / Adicionar planta'},{nodeId:STATE.screens.I00,name:'04 / Identificar por foto'},{nodeId:STATE.screens.F00,name:'05 / Perfil e conta'},{nodeId:STATE.screens.S06,name:'06 / Sair da conta'}];
mutatedNodeIds.push(page.id,guide.id);
return {createdNodeIds,mutatedNodeIds,deletedNodeIds,runtime:variables,runtimeCollectionId:coll.id,guideNodes,startingPoints:page.flowStartingPoints};
