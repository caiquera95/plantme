// PlantMe — Flow 2.0, estritamente orientado pelo briefing.
// Executar com Figma use_figma no arquivo PlantMe 2.0.
const page = figma.getNodeById('557:1607');
await figma.setCurrentPageAsync(page);

const sectionIds = ['557:1608','557:1609','557:1610','557:1611','557:1612','557:1613'];
const componentIds = {
  row:'155:262', notice:'155:256', field:'155:250',
  choice:'155:259', button:'155:242', card:'155:253'
};
const components = Object.fromEntries(Object.entries(componentIds).map(([k,id])=>[k,figma.getNodeById(id)]));
const fontRegular={family:'Inter',style:'Regular'};
const fontMedium={family:'Inter',style:'Medium'};
const fontSemi={family:'Inter',style:'Semi Bold'};
await figma.loadFontAsync(fontRegular);
await figma.loadFontAsync(fontMedium);
await figma.loadFontAsync(fontSemi);

const C={white:{r:1,g:1,b:1},ink:{r:.16,g:.16,b:.16},muted:{r:.43,g:.43,b:.43},line:{r:.84,g:.84,b:.84},soft:{r:.95,g:.95,b:.95},dark:{r:.19,g:.19,b:.19}};
const fill=(color,opacity)=>({type:'SOLID',color,...(opacity===undefined?{}:{opacity})});
const I=(k,t,b='',to='')=>({k,t,b,to});
const screens=[
  {id:'splash',s:1,title:'PlantMe',sub:'Cuidar da sua planta ficou fácil.',items:[I('notice','[ Milo / logotipo ]','Placeholder de marca e mascote.')],cta:['Começar','welcome']},
  {id:'welcome',s:1,title:'Bem-vinda ao PlantMe',sub:'Organize suas plantas e saiba o próximo cuidado.',items:[I('card','Sua coleção em um lugar','Nome, foto, categoria e status de cada planta.'),I('card','Cuidados no tempo certo','Lembretes personalizados por planta.'),I('card','Aprenda no seu ritmo','Dicas simples para iniciantes e entusiastas.')],cta:['Criar conta','signup'],secondary:['Já tenho uma conta','login'],back:'splash'},
  {id:'signup',s:1,title:'Crie sua conta',sub:'Salve suas plantas para acessar de outro aparelho.',items:[I('row','Continuar com a Apple','Cadastro rápido.','experience'),I('row','Continuar com o Google','Cadastro rápido.','experience'),I('field','E-mail','seu@email.com'),I('field','Senha','Mínimo de 8 caracteres')],cta:['Criar conta com e-mail','experience'],secondary:['Já tenho uma conta','login'],back:'welcome',note:'Nome pode ser pedido depois, em Conta.'},
  {id:'login',s:1,title:'Entre na sua conta',sub:'Retome sua coleção e sua rotina.',items:[I('row','Entrar com a Apple','Use sua conta Apple.','home'),I('row','Entrar com o Google','Use sua conta Google.','home'),I('field','E-mail','seu@email.com'),I('field','Senha','Sua senha')],cta:['Entrar com e-mail','home'],secondary:['Esqueci minha senha','recover'],back:'welcome'},
  {id:'recover',s:1,title:'Recuperar acesso',sub:'Receba instruções no e-mail da sua conta.',items:[I('field','E-mail','seu@email.com'),I('notice','Confira sua caixa de entrada','O retorno leva você à tela de login.')],cta:['Enviar instruções','login'],back:'login',kind:'estado de autenticação'},
  {id:'experience',s:1,title:'Sua experiência',sub:'Vamos ajustar a linguagem das dicas.',items:[I('choice','Estou começando','Quero aprender o básico.'),I('choice','Já sei o básico','Tenho algumas plantas.'),I('choice','Experiente','Já mantenho uma rotina.')],cta:['Continuar','interests'],back:'signup'},
  {id:'interests',s:1,title:'Tipos de plantas',sub:'Quais você tem ou gostaria de cuidar?',items:[I('choice','Folhagens e plantas internas','Ex.: Jiboia, Monstera.'),I('choice','Suculentas e cactos','Ex.: Jade, Echeveria.'),I('choice','Flores e ervas','Ex.: Lírio, manjericão.')],cta:['Continuar','add_plant'],secondary:['Escolher depois','add_plant'],back:'experience'},

  {id:'add_plant',s:2,title:'Adicionar planta',sub:'Comece pela planta que você já tem.',items:[I('field','Nome popular ou científico','Ex.: Jiboia / Epipremnum aureum'),I('choice','Categoria','Folhagem · Suculenta · Flor · Outra'),I('row','Foto da planta','Enviar ou tirar agora.','photo_source'),I('notice','Foto opcional','Você pode adicioná-la depois.')],cta:['Continuar','plant_context'],back:'interests'},
  {id:'photo_source',s:2,title:'Foto da planta',sub:'Escolha como adicionar sua foto.',items:[I('row','Tirar uma foto','Solicitar câmera só ao tocar.','add_plant'),I('row','Escolher da galeria','Abrir seletor de fotos do iOS.','add_plant')],cta:['Voltar à planta','add_plant'],back:'add_plant',kind:'bottom sheet'},
  {id:'plant_context',s:2,title:'Onde ela vai ficar?',sub:'Local e luz ajudam a ajustar os cuidados.',items:[I('choice','Local','Sala · Quarto · Varanda · Outro'),I('choice','Luz do local','Indireta · Sol direto · Pouca luz'),I('notice','Exemplo: Jiboia','Sala de estar · luz indireta.')],cta:['Continuar','care_frequency'],back:'add_plant'},
  {id:'care_frequency',s:2,title:'Frequência de cuidados',sub:'Sugestões por espécie; ajuste quando precisar.',items:[I('field','Verificar antes de regar','A cada 7 dias'),I('field','Adubar','A cada 30 dias'),I('field','Podar','Conforme necessidade'),I('field','Trocar vaso','A cada 1–2 anos')],cta:['Revisar plano','review_plan'],back:'plant_context',note:'Frequências são exemplos editáveis, não regras universais.'},
  {id:'review_plan',s:2,title:'Revise os cuidados',sub:'Confira o plano da sua Jiboia antes de criar.',items:[I('card','Jiboia · folhagem','Sala de estar · luz indireta.'),I('card','Verificar a terra','Em 7 dias; regar só se estiver seca.'),I('card','Adubação','Em 30 dias.'),I('card','Poda e troca de vaso','Conforme necessidade; ajuste depois.')],cta:['Criar plano de cuidados','permission_ios'],secondary:['Ajustar frequências','care_frequency'],back:'care_frequency'},
  {id:'permission_ios',s:2,title:'Plano criado!',sub:'Sua Jiboia e os cuidados já foram salvos.',items:[],kind:'permissão do iOS'},

  {id:'home',s:3,title:'Bom dia, Anna',sub:'Sua rotina verde em um só lugar.',items:[I('card','Jiboia · precisa de atenção','Verificar a terra hoje.','plant_detail'),I('card','Próximo cuidado','Adubar a Jade em 3 dias.','alerts'),I('card','Dica verde do dia','Como saber se a terra está seca?','tutorial'),I('card','Conquista recente','Primeira planta adicionada.','achievements')],cta:['Ver minha coleção','collection'],nav:'home'},
  {id:'collection',s:3,title:'Minha coleção',sub:'Foto, nome e status de cada planta.',items:[I('grid','Jiboia','Conferir hoje','plant_detail'),I('grid','Jade','Em 3 dias','plant_detail'),I('grid','Monstera','Tudo em dia','plant_detail'),I('grid','Espada-de-São-Jorge','Em 5 dias','plant_detail')],cta:['Adicionar nova planta','add_plant'],nav:'collection',back:'home'},
  {id:'plant_detail',s:3,title:'Sua Jiboia',sub:'Folhagem · sala de estar · luz indireta.',items:[I('photo','[ Foto da Jiboia ]','Imagem da coleção.'),I('card','Próximo cuidado','Verificar a terra hoje.'),I('card','Rotina','Rega, adubação, poda e troca de vaso.')],cta:['Registrar cuidado','care_sheet'],nav:'collection',back:'collection'},
  {id:'care_sheet',s:3,title:'Registrar cuidado',sub:'Jiboia · escolha o que foi feito.',items:[I('choice','Tipo de cuidado','Regar · Adubar · Podar · Trocar vaso'),I('field','Quando?','Hoje'),I('field','Observação','Opcional'),I('notice','Antes de regar','Confira a umidade da terra.')],cta:['Salvar cuidado','care_success'],secondary:['Cancelar','plant_detail'],back:'plant_detail',kind:'bottom sheet'},
  {id:'care_success',s:3,title:'Cuidado registrado',sub:'O cuidado foi salvo no histórico da Jiboia.',items:[I('card','Registro de hoje','Rega · Jiboia.'),I('card','Próxima verificação','Em 7 dias.')],cta:['Voltar à planta','plant_detail'],kind:'modal'},
  {id:'alerts',s:3,title:'Cuidados e alertas',sub:'Acompanhe tarefas de hoje e vencidas.',items:[I('card','Hoje · Jiboia','Verificar se a terra está seca.','care_sheet'),I('card','Vencido · Monstera','Adubação atrasada há 2 dias.','care_sheet'),I('card','Próximo · Jade','Trocar vaso em 30 dias.','plant_detail'),I('notice','Clima local é opcional','Pode contextualizar lembretes, sem decidir rega sozinho.')],cta:['Abrir a Jiboia','plant_detail'],nav:'alerts',back:'home'},

  {id:'tips',s:4,title:'Dicas e cuidados',sub:'Tutoriais rápidos por planta e problema.',items:[I('choice','Filtrar dicas','Tipo de planta · Rega · Luz · Pragas'),I('row','Como replantar uma Jiboia','Tutorial rápido.','tutorial'),I('row','Como evitar pragas','Passos simples de prevenção.','tutorial'),I('row','Dicas salvas','Seus bookmarks.','saved_tips')],cta:['Abrir tutorial','tutorial'],back:'home'},
  {id:'saved_tips',s:4,title:'Dicas salvas',sub:'Conteúdos que você marcou para rever.',items:[I('row','Como replantar uma Jiboia','Salvo hoje.','tutorial'),I('notice','Salvar e remover','O bookmark é um estado da dica.')],cta:['Voltar às dicas','tips'],back:'tips',kind:'estado'},
  {id:'tutorial',s:4,title:'Como replantar',sub:'Tutorial rápido · Jiboia.',items:[I('photo','[ Imagem do tutorial ]','Placeholder funcional.'),I('card','1 · Observe as raízes','Veja se ocupam todo o vaso.'),I('card','2 · Prepare o novo vaso','Use drenagem e substrato adequado.'),I('card','3 · Acompanhe','Observe a planta nos próximos dias.')],cta:['Salvar dica','saved_tips'],back:'tips'},
  {id:'community',s:4,title:'Comunidade',sub:'Compartilhe fotos e aprendizados.',items:[I('row','Ana · nova folha na Jiboia','Foto de uma conquista.'),I('row','Caio · dúvida sobre Jade','Como cuidar no inverno?'),I('notice','Conversa leve','Respeito e troca de experiências.')],cta:['Criar publicação','create_post'],nav:'community'},
  {id:'create_post',s:4,title:'Criar publicação',sub:'Compartilhe uma foto ou aprendizado.',items:[I('field','Texto','O que você gostaria de contar?'),I('row','Adicionar foto','Opcional.'),I('choice','Tema','Dúvida · Dica · Conquista')],cta:['Publicar','community'],secondary:['Cancelar','community'],back:'community'},

  {id:'profile',s:5,title:'Perfil',sub:'Sua coleção e seus ajustes.',items:[I('row','Estatísticas','Acompanhe seus indicadores.','stats'),I('row','Conquistas','Marcos da sua rotina.','achievements'),I('row','Configurações','Conta, avisos, tema e idioma.','settings')],cta:['Abrir configurações','settings'],nav:'profile'},
  {id:'stats',s:5,title:'Estatísticas',sub:'Indicadores pedidos no briefing.',items:[I('card','Dias sem esquecer cuidados','Regra de contagem a definir.'),I('card','Plantas salvas de problemas','Critério de recuperação a definir.'),I('card','Saúde geral da coleção','Índice e fonte de dados a definir.')],cta:['Ver conquistas','achievements'],nav:'profile',back:'profile',note:'Sem números inventados antes de definir as métricas.'},
  {id:'achievements',s:5,title:'Conquistas',sub:'Motivação leve, sem incentivar excesso de rega.',items:[I('card','Primeira planta','Sua coleção começou.'),I('card','Primeiro cuidado','Você registrou uma ação.'),I('card','Rotina acompanhada','Conquista baseada em observação.')],cta:['Voltar ao perfil','profile'],nav:'profile',back:'profile'},
  {id:'settings',s:5,title:'Configurações',sub:'Ajuste o PlantMe para você.',items:[I('row','Conta','Nome, e-mail e senha.','account'),I('row','Notificações e clima','Avisos por planta; clima opcional.','notification_preferences'),I('row','Tema e idioma','Claro/escuro e linguagem.','theme_language'),I('row','Sair da conta','Encerrar esta sessão.','logout')],cta:['Abrir conta','account'],nav:'profile',back:'profile'},
  {id:'account',s:5,title:'Conta',sub:'Seus dados de acesso.',items:[I('field','Nome','Anna'),I('field','E-mail','anna@email.com'),I('field','Senha','••••••••'),I('notice','Alterar dados','Confirme sua identidade para mudar senha.')],cta:['Salvar alterações','settings'],nav:'profile',back:'settings'},
  {id:'notification_preferences',s:5,title:'Notificações',sub:'Escolha quais avisos deseja receber.',items:[I('choice','Lembretes e vencidos','Regar · Adubar · Trocar vaso · Atrasos'),I('field','Cidade para clima (opcional)','Ex.: São Paulo, SP'),I('notice','Clima local','Contexto para alertas; não substitui observar a planta.')],cta:['Salvar preferências','settings'],nav:'profile',back:'settings'},
  {id:'theme_language',s:5,title:'Tema e idioma',sub:'Ajuste aparência e linguagem.',items:[I('choice','Tema','Sistema · Claro · Escuro'),I('choice','Idioma','Português (Brasil)')],cta:['Salvar preferências','settings'],nav:'profile',back:'settings'},
  {id:'logout',s:5,title:'Sair da conta?',sub:'Sua coleção continuará salva na conta.',items:[I('notice','Neste aparelho','A sessão será encerrada.')],cta:['Sair da conta','welcome'],secondary:['Continuar no perfil','profile'],back:'settings',kind:'modal'}
];

const created=[];const links=[];const frameById={};const componentRows=[];
function track(n){created.push(n.id);return n;}
function tx(parent,name,value,x,y,w,size=14,style='Regular',color=C.ink){
  const n=track(figma.createText());parent.appendChild(n);n.name=name;n.fontName=style==='Semi Bold'?fontSemi:style==='Medium'?fontMedium:fontRegular;n.fontSize=size;n.fills=[fill(color)];n.characters=value;n.resize(w,20);n.textAutoResize='HEIGHT';n.x=x;n.y=y;return n;
}
function rect(parent,name,x,y,w,h,bg=C.white,stroke=null,r=0){
  const n=track(figma.createFrame());parent.appendChild(n);n.name=name;n.resize(w,h);n.x=x;n.y=y;n.fills=[fill(bg)];n.strokes=stroke?[fill(stroke)]:[];n.cornerRadius=r;return n;
}
function component(parent,kind,title,body,to){
  const n=track(components[kind].createInstance());parent.appendChild(n);n.name=`${kind} / ${title}`;
  const defs={row:{'Title#155:12':title,'Body#155:13':body},notice:{'Title#155:8':title,'Body#155:9':body},field:{'Title#155:4':title,'Body#155:5':body},choice:{'Title#155:10':title,'Body#155:11':body},card:{'Title#155:6':title,'Body#155:7':body},button:{'Label#155:0':title}};
  n.setProperties(defs[kind]);
  if(['row','card','choice','notice'].includes(kind)){n.strokes=[fill(C.line)];n.strokeWeight=1;}
  if(to)links.push({node:n,to});componentRows.push(n.id);return n;
}
function gridCard(parent,title,body,to){
  const n=rect(parent,`grid / ${title}`,0,0,158,145,C.white,C.line,12);
  rect(n,'[ foto da planta ]',10,10,138,65,C.soft,null,8);
  tx(n,'Nome',title,10,83,138,title==='Espada-de-São-Jorge'?11:13,'Semi Bold');
  tx(n,'Status',body,10,107,138,11,'Regular',C.muted);
  if(to)links.push({node:n,to});return n;
}
function nav(parent,current){
  const bar=rect(parent,'Navegação principal',0,605,375,62,C.soft,C.line,0);
  const tabs=[['Início','home'],['Minhas\nplantas','collection'],['Cuidados','alerts'],['Comunidade','community'],['Perfil','profile']];
  tabs.forEach(([label,to],i)=>{const cell=rect(bar,`Aba / ${label.replace('\n',' ')}`,i*75,0,75,62,to===current?{r:.88,g:.88,b:.88}:C.soft,null,0);const caption=tx(cell,'Label',label,3,20,69,10,'Medium',C.ink);caption.textAlignHorizontal='CENTER';links.push({node:cell,to});});
}
function mobile(d,index){
  const sec=figma.getNodeById(sectionIds[d.s]);const col=index%4,row=Math.floor(index/4);
  const frame=rect(sec,`${d.id} · ${d.title}${d.kind?' · '+d.kind:''}`,30+col*440,80+row*740,375,667,C.white,C.line,0);frame.clipsContent=true;frameById[d.id]=frame;
  tx(frame,'Hora','19:02',16,8,80,10,'Medium');tx(frame,'Sinal','••• ▰',316,8,44,10,'Medium');
  if(d.back){const back=rect(frame,'Voltar',16,35,44,44,C.soft,null,9);tx(back,'Seta','‹',12,4,25,28,'Regular');links.push({node:back,to:d.back});}
  const title=tx(frame,'Título',d.title,20,88,335,22,'Semi Bold');
  const subtitle=tx(frame,'Descrição',d.sub,20,Math.max(119,88+title.height+4),335,13,'Regular',C.muted);
  const contentY=Math.max(166,subtitle.y+subtitle.height+16);
  if(d.id==='permission_ios'){
    const b=rect(frame,'Plano salvo / Jiboia',20,contentY,335,178,C.soft,C.line,13);
    tx(b,'Planta','Jiboia · folhagem',16,15,303,16,'Semi Bold');
    tx(b,'Local','Sala de estar · luz indireta',16,46,303,12,'Regular',C.muted);
    tx(b,'Rega','Verificar a terra em 7 dias',16,78,303,13,'Medium');
    tx(b,'Adubação','Adubação em 30 dias',16,108,303,13,'Medium');
    tx(b,'Outros','Poda e troca de vaso conforme necessidade',16,138,303,11,'Regular',C.muted);
    rect(frame,'Escurecimento do sistema',0,0,375,667,{r:.35,g:.35,b:.35},null,0).opacity=.52;
    const alert=rect(frame,'Alerta nativo do iOS',37,226,301,228,C.white,null,18);
    tx(alert,'Título do alerta','“PlantMe” deseja enviar notificações',18,20,265,15,'Semi Bold');
    tx(alert,'Texto do alerta','Você receberá lembretes dos cuidados das suas plantas.',18,82,265,12,'Regular',C.muted);
    const deny=rect(alert,'Não permitir',0,140,301,44,C.white,C.line,0);tx(deny,'Label','Não permitir',86,14,130,13,'Medium');links.push({node:deny,to:'home'});
    const allow=rect(alert,'Permitir',0,184,301,44,C.white,C.line,0);tx(allow,'Label','Permitir',111,14,90,13,'Medium');links.push({node:allow,to:'home'});
    return;
  }
  let y=contentY;
  if(d.id==='collection'){
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){const it=d.items[r*2+c];const n=gridCard(frame,it.t,it.b,it.to);n.x=20+c*177;n.y=y+r*160;}
  }else{
    const stack=track(figma.createFrame());frame.appendChild(stack);stack.name='Conteúdo';stack.layoutMode='VERTICAL';stack.resize(335,100);stack.primaryAxisSizingMode='AUTO';stack.counterAxisSizingMode='FIXED';stack.itemSpacing=10;stack.paddingTop=0;stack.paddingBottom=0;stack.paddingLeft=0;stack.paddingRight=0;stack.fills=[];stack.strokes=[];stack.x=20;stack.y=y;
    for(const it of d.items){if(it.k==='photo'){const ph=rect(stack,'Imagem / '+it.t,0,0,335,118,C.soft,C.line,9);tx(ph,'Placeholder',it.t,15,43,305,14,'Medium',C.muted);if(it.to)links.push({node:ph,to:it.to});}else component(stack,it.k,it.t,it.b,it.to);}
  }
  if(d.note)tx(frame,'Nota',d.note,20,d.nav?503:513,335,10,'Regular',C.muted);
  if(d.cta){const button=component(frame,'button',d.cta[0],'',d.cta[1]);button.x=20;button.y=d.nav?544:(d.secondary?558:594);}
  if(d.secondary){const n=rect(frame,'Ação secundária / '+d.secondary[0],20,610,335,44,C.white,null,0);const caption=tx(n,'Label',d.secondary[0],10,13,315,12,'Medium');caption.textAlignHorizontal='CENTER';links.push({node:n,to:d.secondary[1]});}
  if(d.nav)nav(frame,d.nav);
}

// Mapa curto do fluxo e origem dos requisitos.
const mapSec=figma.getNodeById(sectionIds[0]);
const map=rect(mapSec,'Mapa principal · escopo do briefing',30,75,1760,480,C.white,C.line,12);
tx(map,'Título','PlantMe · Flow 2.0',32,28,1600,30,'Semi Bold');
tx(map,'Subtítulo','Telas e estados móveis editáveis · briefing original + apoios mínimos para a jornada',32,70,1600,15,'Regular',C.muted);
const steps=[['Acesso','Splash → Boas-vindas → Conta'],['Personalizar','Experiência → Tipos'],['Primeira planta','Nome/foto/categoria → Local/luz'],['Plano','Frequências → Revisão → Permissão'],['Uso diário','Dashboard → Coleção → Cuidados']];
steps.forEach(([title,body],i)=>{const x=32+i*342;const box=rect(map,`Etapa ${i+1} / ${title}`,x,125,315,125,C.soft,C.line,11);tx(box,'Título',title,14,17,287,17,'Semi Bold');tx(box,'Fluxo',body,14,54,287,13,'Regular',C.muted);});
tx(map,'Linha 1','Escopo explícito: autenticação Apple/Google/e-mail; dashboard; coleção; dicas; alertas; estatísticas; configurações.',32,288,1680,15,'Medium');
tx(map,'Linha 2','Produto: comunidade e conquistas aparecem em nível essencial. Clima é opcional. Indicadores sem fórmula ficam marcados para definição.',32,323,1680,14,'Regular',C.muted);
tx(map,'Linha 3','Representação: telas principais + estados de foto, cuidado, sucesso e permissão; nenhuma assinatura, promoção ou tela duplicada de tab.',32,356,1680,14,'Regular',C.muted);

const counters=[0,0,0,0,0,0];for(const d of screens){mobile(d,counters[d.s]++);}
let connected=0;const missing=[];
function screenOf(node){let n=node;while(n&&n.parent?.type!=='SECTION')n=n.parent;return n;}
for(const {node,to} of links){const destination=frameById[to];if(!destination){missing.push({source:node.name,to});continue;}if(screenOf(node)?.id===destination.id)continue;await node.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:destination.id,navigation:'NAVIGATE',transition:{type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:.2}}]}]);connected++;}
return {createdNodeIds:created,pageId:page.id,sectionIds,screenIds:Object.fromEntries(Object.entries(frameById).map(([id,n])=>[id,n.id])),screenCount:screens.length,connected,missing,countsBySection:counters};
