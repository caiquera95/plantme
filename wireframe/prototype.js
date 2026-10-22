const page=await figma.getNodeByIdAsync(STATE.pageId);await figma.setCurrentPageAsync(page);
const runtime={};for(const [name,id]of Object.entries(STATE.runtime))runtime[name]=await figma.variables.getVariableByIdAsync(id);
const mutatedNodeIds=[];let current='';
function set(name,value){return {type:'SET_VARIABLE',variableId:runtime[name].id,variableValue:{type:typeof value==='boolean'?'BOOLEAN':'STRING',resolvedType:typeof value==='boolean'?'BOOLEAN':'STRING',value}};}
function equals(name,value){const type=typeof value==='boolean'?'BOOLEAN':'STRING';return {type:'EXPRESSION',resolvedType:'BOOLEAN',value:{expressionFunction:'EQUALS',expressionArguments:[{type:'VARIABLE_ALIAS',resolvedType:type,value:{type:'VARIABLE_ALIAS',id:runtime[name].id}},{type,resolvedType:type,value}]}};}
function nav(key){if(key===current)return null;return {type:'NODE',destinationId:STATE.screens[key],navigation:'NAVIGATE',transition:{type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:0.16},resetScrollPosition:true};}
function branch(name,table,fallback){return {type:'CONDITIONAL',conditionalBlocks:[...Object.entries(table).map(([value,target])=>({condition:equals(name,value==='true'?true:value==='false'?false:value),actions:[nav(target)].filter(Boolean)})),{actions:[nav(fallback)].filter(Boolean)}]};}
function home(){return {type:'CONDITIONAL',conditionalBlocks:[{condition:equals('hasPlants',false),actions:[nav('H00')].filter(Boolean)},{condition:equals('auth',false),actions:[nav('H01')].filter(Boolean)},{actions:[nav('H02')].filter(Boolean)}]};}
function profile(){return branch('auth',{'true':'F00'},'F01');}
function collection(){return branch('hasPlants',{'true':'D01'},'D02');}
const photoReturns={N00:'N00',P05:'P05',D03:'D03',D09:'D09',F02:'F02',F11:'F11'};
const authReturns={A01:'H02',F01:'F00',F00:'F00',H02:'H02',X06:'H02',S07:'H02'};
const formReturns={N08:'N08',C01:'C01',F02:'F02',D03:'D03',D09:'D09',F11:'F11',B00:'B00',P01:'P01',I05:'I04',L00:'L00',H02:'H02',S09:'S09'};
const formSuccess={N09:'N09',C02:'C02',F00:'F00',D00:'D00',D08:'D08',F15:'F15'};
const entryReturns={A04:'A04',H00:'H00',H01:'H01',H02:'H02',D01:'D01',D02:'D02',D05:'D05',F01:'F01'};
const prefReturns={F00:'F00',F01:'F01'};
const guideReturns={D00:'D00',P03:'P03'};
let count=0;
for(const r of ROUTES){
  const n=await figma.getNodeByIdAsync(r.nodeId);if(!n)continue;
  const pre=[],src=r.source,target=r.to,label=r.label;current=src;let destination=nav(target);
  if(src==='H02'||src==='F00'||src==='S00')pre.push(set('auth',true),set('hasPlants',true));
  if(src==='H01')pre.push(set('hasPlants',true));
  if(r.type==='nav'){
    if(label==='Início')destination=home();
    if(label==='Coleção')destination=collection();
    if(label==='Perfil')destination=profile();
  }
  if(target==='P00'&&['A04','H00','H01','H02','D01','D02','D05'].includes(src))pre.push(set('entryOrigin',src));
  if(src==='P00'&&r.type==='back')destination=branch('entryOrigin',entryReturns,'H00');
  if(target==='D00'&&['H01','H02','D01','D05','N09'].includes(src))pre.push(set('detailOrigin',src==='N09'?'D01':src));
  if(src==='D00'&&r.type==='back')destination=branch('detailOrigin',{H01:'H01',H02:'H02',D01:'D01',D05:'D05'},'D01');
  if(target==='P03'&&['P01','I06'].includes(src))pre.push(set('catalogOrigin',src));
  if(src==='P03'&&r.type==='back')destination=branch('catalogOrigin',{I06:'I06'},'P01');
  if(target==='P04')pre.push(set('guideOrigin',src));
  if(src==='P04'&&r.type==='back')destination=branch('guideOrigin',guideReturns,'P03');
  if(target==='B00'&&!src.startsWith('B'))pre.push(set('authOrigin',src));
  if(src==='X06'&&target==='B00')pre.push({type:'SET_VARIABLE',variableId:runtime.authOrigin.id,variableValue:{type:'VARIABLE_ALIAS',resolvedType:'STRING',value:{type:'VARIABLE_ALIAS',id:runtime.errorReturn.id}}});
  if(src==='B00'&&r.type==='back')destination=branch('authOrigin',{F01:'F01',X06:'X06',S07:'S07'},'A01');
  if((src==='B00'||src==='B04')&&/Entrar|entrar/.test(label)&&r.type==='action'){pre.push(set('auth',true),set('hasPlants',true));destination=branch('authOrigin',authReturns,'H02');}
  if(src==='B02'&&target==='B09')pre.push(set('auth',true),set('onboarded',true));
  if(src==='B09'&&label==='Continuar'){pre.push(set('auth',true));destination=home();}
  if(src==='B09'&&r.type==='scenario')pre.push(set('auth',true),set('hasPlants',target!=='H00'));
  if((src==='N08'&&target==='N09')||src==='N09')pre.push(set('hasPlants',true));
  if(src==='N09'&&target==='H01')destination=home();
  if(src==='A04')pre.push(set('onboarded',true));
  if(src==='A04'&&target==='H00')pre.push(set('hasPlants',false));
  if(src==='S06'&&target==='S07')pre.push(set('auth',false),set('hasPlants',false));
  if(src==='S09'&&target==='S10')pre.push(set('auth',false),set('hasPlants',false),set('onboarded',false));
  if(src==='S07'&&target==='H00')pre.push(set('auth',false),set('hasPlants',false),set('onboarded',true));
  if(target==='F03'&&(src==='F00'||src==='F01'))pre.push(set('prefOrigin',src));
  if(src==='F03'&&(r.type==='back'||label==='Salvar preferências'))destination=branch('prefOrigin',prefReturns,'F00');
  if(['F05','F07','F09'].includes(src)&&r.type==='back')destination=src==='F09'?branch('legalOrigin',{B01:'B01',F01:'F01'},'F00'):profile();
  if(src==='F05'&&label==='Salvar preferências')destination=profile();
  if(target==='F09'&&['F00','F01','B01'].includes(src))pre.push(set('legalOrigin',src));
  if(target==='N01'&&['N00','P05','D03','D09'].includes(src))pre.push(set('photoReturn',src),set('photoMode','attach'),set('photoLabel','Usar foto'));
  if(src==='I00'&&(target==='I01'||target==='I02'))pre.push(set('photoMode','identify'),set('photoReturn','I00'),set('photoLabel','Identificar planta'));
  if(src==='N01'&&(target==='I01'||target==='I02'))pre.push(set('photoMode','attach'),set('photoLabel','Usar foto'));
  if((src==='F02'||src==='F11')&&target==='I02')pre.push(set('photoMode','attach'),set('photoReturn',src),set('photoLabel','Usar foto'));
  if(src==='N01'&&(r.type==='back'||target==='N00'))destination=branch('photoReturn',photoReturns,'N00');
  if(['I01','I02','I03','I08','I09'].includes(src)&&(r.type==='back'||label==='Cancelar'||label==='Agora não'))destination=branch('photoReturn',photoReturns,'I00');
  if(src==='I04'&&target==='I05')destination=branch('photoReturn',photoReturns,'I05');
  if(src==='I04'&&r.type==='back')destination=branch('photoReturn',photoReturns,'I00');
  if((target==='B11'||target==='B12')&&['B02','B06','S04'].includes(src))pre.push(set('codeOrigin',src));
  if(src==='B11')destination=branch('codeOrigin',{B02:'B02',B06:'B06',S04:'S04'},'B02');
  if(src==='B12'&&(r.type==='back'||label==='Corrigir código'))destination=branch('codeOrigin',{B02:'B02',B06:'B06',S04:'S04'},'B02');
  if(target==='X04')pre.push(set('settingsReturn',src==='I08'?'I00':'F05'));
  if(src==='X04')destination=branch('settingsReturn',{I00:'I00',F05:'F05'},'F05');
  if(r.type==='scenario'&&['X01','X02','X03','X05','X06'].includes(target)){
    pre.push(set('errorReturn',src));
    const sample=INVENTORY.screens.find(s=>s.key===src),success=sample?.actions.find(a=>a.style==='primary')?.to||src;
    pre.push(set('errorSuccess',success));
    if(target==='X05')pre.push(set('discardTo',sample.back||'F00'));
  }
  if(src==='X01'&&(label==='Tentar reconectar'))destination=branch('errorReturn',formReturns,'H02');
  if(src==='X02')destination=branch('errorReturn',formReturns,'P01');
  if(src==='X03')destination=label==='Tentar salvar novamente'?branch('errorSuccess',formSuccess,'N09'):branch('errorReturn',formReturns,'N08');
  if(src==='X05')destination=label==='Descartar alterações'?branch('discardTo',{F00:'F00',D00:'D00'},'D00'):branch('errorReturn',{F02:'F02',D03:'D03'},'D03');
  if(target==='N07')pre.push(set('draftStep',src));
  if(src==='N07'&&label==='Continuar cadastro')destination=branch('draftStep',{N00:'N00',N02:'N02',N03:'N03',N05:'N05',N08:'N08'},'N00');
  if(src==='N07'&&target==='P00')destination=branch('entryOrigin',entryReturns,'P00');
  if(src==='N02'&&r.type==='back')destination=branch('manualMode',{'true':'P05'},'N00');
  if(src==='P05'&&target==='N02')pre.push(set('manualMode',true));
  if(src==='P03'&&target==='N00')pre.push(set('manualMode',false));
  if(src==='I06'&&target==='N00')pre.push(set('manualMode',false));
  if(src==='N00'&&r.type==='back')destination=branch('catalogOrigin',{I06:'I06'},'P03');
  if(src==='N01'&&label==='Usar foto atual')destination=branch('photoReturn',photoReturns,'N00');
  const actions=[...pre,destination].filter(Boolean);
  await n.setReactionsAsync(actions.length?[{trigger:{type:'ON_CLICK'},actions}]:[]);mutatedNodeIds.push(n.id);if(actions.length)count++;
}
return {mutatedNodeIds,connectionCount:count,groups:GROUPS};
