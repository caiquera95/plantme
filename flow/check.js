const {sections,screens,navigation}=require('./data.js');
const ids=new Set(screens.map(s=>s.id));
const issues=[];
if(ids.size!==screens.length)issues.push('IDs duplicados');
for(const s of screens){
 if(!sections[s.section])issues.push(`${s.id}: seção ausente`);
 if(!s.action?.to)issues.push(`${s.id}: ação principal sem destino`);
 const refs=[s.action,s.secondary,...(s.links||[]),...(s.tabs||[]),...(s.blocks||[]),{to:s.back},{to:s.next}];
 for(const r of refs)if(r?.to&&!ids.has(r.to))issues.push(`${s.id}: destino ausente ${r.to}`);
 if(s.nav&&!navigation.some(n=>n.id===s.nav))issues.push(`${s.id}: aba inválida ${s.nav}`);
 if(s.blocks.some(b=>b.kind==='input'&&!b.label))issues.push(`${s.id}: input sem label`);
}
for(const n of navigation)if(!ids.has(n.to))issues.push(`Navegação: destino ausente ${n.to}`);
const edges=s=>[s.action?.to,s.secondary?.to,s.back,s.next,...(s.links||[]).map(x=>x.to),...(s.tabs||[]).map(x=>x.to),...(s.blocks||[]).map(x=>x.to),...(s.nav?[...navigation.map(n=>n.to),'home-empty','plants-empty']:[])].filter(Boolean);
const seen=new Set(['splash']);const queue=['splash'];
while(queue.length){const id=queue.shift();for(const to of edges(screens.find(x=>x.id===id)))if(!seen.has(to)){seen.add(to);queue.push(to)}}
const onlyContext=screens.filter(s=>!seen.has(s.id)).map(s=>s.id);
const expectedContext=new Set(['loading','error']);
for(const id of onlyContext)if(!expectedContext.has(id))issues.push(`Estado isolado: ${id}`);
console.log(JSON.stringify({sections:sections.length,screens:screens.length,primaryActions:screens.filter(s=>s.action).length,navigation:navigation.map(n=>n.label),contextualOnlyStates:onlyContext,issues},null,2));
if(issues.length)process.exitCode=1;
