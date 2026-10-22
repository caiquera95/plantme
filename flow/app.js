const byId = Object.fromEntries(screens.map(s => [s.id,s]));
const $ = (q,root=document) => root.querySelector(q);
const esc = v => String(v ?? '').replace(/[&<>"']/g,c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let current = new URLSearchParams(location.search).get('screen') || 'splash';
if (!byId[current] && current !== 'overview') current='splash';
const routeOrigin={};
let hasPlants=true;
let onboardingComplete=true;
function go(id,label=''){
 if(current==='email-resent'&&(label==='Digitar novo código'||label==='Fechar'))id=routeOrigin['email-resent']||id;
 if(current==='login'&&id==='experience'&&onboardingComplete)id=hasPlants?'home':'home-empty';
 if(current==='signup'&&id==='experience'){hasPlants=false;onboardingComplete=false;}
 if(current==='interests'&&id==='first-plant')onboardingComplete=true;
 if(current==='configure-routine'&&id==='plan-created')hasPlants=true;
 if(id==='splash'||(current==='splash'&&id==='welcome')){hasPlants=false;onboardingComplete=false;}
 if(label==='Início'&&id==='home'&&!hasPlants)id='home-empty';
 if(label==='Minhas plantas'&&id==='plants'&&!hasPlants)id='plants-empty';
 if(!byId[id] && id!=='overview')return;
 if(byId[id]&&byId[current]&&id!==current)routeOrigin[id]=current;
 current=id;history.pushState({id},'',`?screen=${encodeURIComponent(id)}`);render();
}
window.addEventListener('popstate',()=>{current=new URLSearchParams(location.search).get('screen')||'splash';render()});
function block(b){
 const clickable=b.to?` data-go="${esc(b.to)}" role="button" tabindex="0"`:'';
 const details=b.detail?`<span>${esc(b.detail)}</span>`:'';
 if(b.kind==='input')return `<div class="block input"><label>${esc(b.label)}</label><input placeholder="${esc(b.detail)}" aria-label="${esc(b.label)}"></div>`;
 return `<div class="block ${esc(b.kind)}${b.to?' link':''}"${clickable}><strong>${esc(b.label)}</strong>${details}</div>`;
}
function button(a,cls){return a?`<button type="button" class="${cls}" data-go="${esc(a.to)}">${esc(a.label)}</button>`:''}
function screenMarkup(s,{background=false,overlay=false}={}){
 const nav=s.nav&&!overlay?`<nav class="bottom-nav" aria-label="Navegação principal">${navigation.map(n=>`<button type="button" data-go="${n.to}" class="${n.id===s.nav?'active':''}">${esc(n.label)}</button>`).join('')}</nav>`:'';
 const back=s.back?`<button class="back" data-go="${esc(routeOrigin[s.id]||s.back)}" title="Voltar" aria-label="Voltar">‹</button>`:'';
 const tabs=s.tabs?`<div class="tabs" role="tablist">${s.tabs.map(t=>`<button role="tab" aria-selected="${t.to===s.id}" class="${t.to===s.id?'active':''}" data-go="${t.to}">${esc(t.label)}</button>`).join('')}</div>`:'';
 const footer=`<footer class="footer">${button(s.action,'primary')}${button(s.secondary,'secondary')}${s.links?`<div class="links">${s.links.map(x=>button(x,'text-link')).join('')}</div>`:''}</footer>`;
 return `<div class="app-screen"><header class="screen-head"><h1>${esc(s.title)}</h1><p>${esc(s.subtitle)}</p>${back}</header>${tabs}<div class="body">${s.blocks.map(block).join('')}</div>${footer}${nav}</div>`;
}
function device(s){
 if(s.presentation){const bg=byId[routeOrigin[s.id]]||byId[s.back]||byId['plant-detail'];return `<div class="device"><div class="status"><span>19:02</span><span>●●● ▰</span></div>${screenMarkup(bg,{background:true})}<div class="overlay"><div class="${s.presentation}">${screenMarkup(s,{overlay:true})}</div></div></div>`}
 return `<div class="device"><div class="status"><span>19:02</span><span>●●● ▰</span></div>${screenMarkup(s)}</div>`;
}
function list(){let out='';sections.forEach((name,i)=>{const group=screens.filter(s=>s.section===i);out+=`<details ${group.some(s=>s.id===current)?'open':''}><summary>${esc(name)} · ${group.length}</summary>${group.map(s=>`<button class="screen-link ${s.id===current?'active':''}" data-go="${s.id}">${esc(s.title)}</button>`).join('')}</details>`});$('#screen-list').innerHTML=out}
function overview(){return `<div class="overview">${sections.map((name,i)=>`<div class="overview-section">${esc(name)}</div>${screens.filter(s=>s.section===i).map(s=>`<button class="overview-item" data-go="${s.id}"><span>${esc(s.id)}</span><strong>${esc(s.title)}</strong><small>${esc(s.presentation||'tela / estado')}</small></button>`).join('')}`).join('')}</div>`}
function render(){
 list();const s=byId[current];$('#section-name').textContent=s?sections[s.section]:'Mapa geral';$('#screen-id').textContent=s?`${s.id} · ${screens.indexOf(s)+1}/${screens.length}`:`${screens.length} telas e estados`;
 $('#view').innerHTML=s?device(s):overview();$('#screen-note').textContent=s?.note||'Clique nas ações, tabs ou itens da lista para percorrer o fluxo.';
 document.title=`PlantMe flow · ${s?.title||'Visão geral'}`;
}
document.addEventListener('click',e=>{const target=e.target.closest('[data-go]');if(target)go(target.dataset.go,target.textContent.trim());else if(e.target.closest('.choice,.check'))e.target.closest('.choice,.check').classList.toggle('selected')});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('[data-go]'))go(e.target.dataset.go)});
$('#overview-button').onclick=()=>go('overview');$('#start-button').onclick=()=>go('splash');render();
