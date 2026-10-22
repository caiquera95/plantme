// Injetado com PAGE_ID, ROUTES e SCREEN_IDS. Cada rota é [nodeId, destino, label, origem, tipo].
const page=await figma.getNodeByIdAsync(PAGE_ID);await figma.setCurrentPageAsync(page);
const auth=await figma.variables.getVariableByIdAsync('VariableID:167:1217');
const hasPlants=await figma.variables.getVariableByIdAsync('VariableID:167:1218');
const onboardingComplete=await figma.variables.getVariableByIdAsync('VariableID:362:1470');
const modified=[];let connected=0,skipped=0;
function set(variable,value){return {type:'SET_VARIABLE',variableId:variable.id,variableValue:{type:'BOOLEAN',resolvedType:'BOOLEAN',value}}}
function eq(variable,value){return {type:'EXPRESSION',resolvedType:'BOOLEAN',value:{expressionFunction:'EQUALS',expressionArguments:[{type:'VARIABLE_ALIAS',resolvedType:'BOOLEAN',value:{type:'VARIABLE_ALIAS',id:variable.id}},{type:'BOOLEAN',resolvedType:'BOOLEAN',value}]}}}
function go(id){return {type:'NODE',destinationId:SCREEN_IDS[id],navigation:'NAVIGATE',transition:{type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:.16},resetScrollPosition:true}}
function choose(variable,yes,no){return {type:'CONDITIONAL',conditionalBlocks:[{condition:eq(variable,true),actions:[go(yes)]},{actions:[go(no)]}]}}
for(const [nodeId,to,label,source,type] of ROUTES){
 const n=await figma.getNodeByIdAsync(nodeId);if(!n||!SCREEN_IDS[to]){skipped++;continue}
 let actions=[];
 if(type==='back'||source==='email-resent'&&(label==='Digitar novo código'||label==='Fechar'))actions=[{type:'BACK'}];
 else if(to===source){skipped++;continue}
 else{
  if(source==='splash'&&to==='welcome')actions.push(set(auth,false),set(hasPlants,false),set(onboardingComplete,false));
  if(source==='configure-routine'&&to==='plan-created')actions.push(set(hasPlants,true));
  if(source==='signup'&&to==='experience')actions.push(set(auth,true),set(hasPlants,false),set(onboardingComplete,false));
  if(source==='interests'&&to==='first-plant')actions.push(set(onboardingComplete,true));
  if(source==='login'&&to==='experience')actions.push(set(auth,true));
  if(source==='logout-confirm'&&to==='logged-out')actions.push(set(auth,false));
  if(type==='nav'&&label==='Perfil')actions.push(go('profile'));
  else if(type==='nav'&&label==='Início')actions.push(choose(hasPlants,'home','home-empty'));
  else if(type==='nav'&&label==='Minhas plantas')actions.push(choose(hasPlants,'plants','plants-empty'));
  else if(source==='login'&&to==='experience')actions.push(choose(onboardingComplete,'loading','experience'));
  else if(source==='loading'&&to==='home')actions.push(choose(hasPlants,'home','home-empty'));
  else actions.push(go(to));
 }
 await n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions}]);modified.push(n.id);connected++;
}
if(ADD_SPLASH_TIMEOUT){const splash=await figma.getNodeByIdAsync(SCREEN_IDS.splash);await splash.setReactionsAsync([{trigger:{type:'AFTER_TIMEOUT',timeout:1.2},actions:[set(auth,false),set(hasPlants,false),set(onboardingComplete,false),go('welcome')]}]);modified.push(splash.id)}
const loading=await figma.getNodeByIdAsync(SCREEN_IDS.loading);await loading.setReactionsAsync([{trigger:{type:'AFTER_TIMEOUT',timeout:0.6},actions:[choose(hasPlants,'home','home-empty')]}]);modified.push(loading.id);
return {mutatedNodeIds:modified,connected,skipped,sourceCount:ROUTES.length};
