from pathlib import Path
import base64, html, json, zipfile, xml.etree.ElementTree as ET
out=Path('/Users/caiqueantonio/Documents/ChatGPT/PlantMe 2/output/plantme-icons-v3')
(out/'svg').mkdir(parents=True,exist_ok=True)
# Each silhouette is drawn on the same 24-unit grid. Internal cuts remain open in selected state.
icons=[
('inicio','Início','nav','M4.2 11.4C3.5 12 3.3 12.6 3.3 13.4v5.4c0 1.4.8 2.2 2.2 2.2h2.7c.8 0 1.3-.5 1.3-1.3v-4.1c0-.9.6-1.5 1.5-1.5h2c.9 0 1.5.6 1.5 1.5v4.1c0 .8.5 1.3 1.3 1.3h2.7c1.4 0 2.2-.8 2.2-2.2v-5.4c0-.8-.2-1.4-.9-2l-6.4-5.7c-.9-.8-1.9-.8-2.8 0Z',''),
('minhas-plantas','Minhas plantas','nav','M7 15.5q-.7 0-.6.8l.8 3.1Q7.6 21 9.2 21h5.6q1.6 0 2-1.6l.8-3.1q.1-.8-.6-.8Z','M12 15.5V9.2 M11.9 11.7C7.1 12.1 4.4 9.2 4.3 5c4.9-.7 7.5 2 7.6 6.7Z M12.2 9c.2-3.7 2.7-5.7 7.5-5.2-.2 3.6-2.8 5.4-7.5 5.2Z'),
('cuidados','Cuidados','nav','M7.2 4.3h-.3C4.6 4.3 3.5 5.6 3.5 8v9.3c0 2.5 1.2 3.7 3.7 3.7h9.6c2.5 0 3.7-1.2 3.7-3.7V8c0-2.4-1.1-3.7-3.4-3.7h-.3','M9.4 3.2h5.2c.8 0 1.3.5 1.3 1.3v1.1c0 .8-.5 1.3-1.3 1.3H9.4c-.8 0-1.3-.5-1.3-1.3V4.5c0-.8.5-1.3 1.3-1.3Z M8.1 14.2c1 1 1.8 1.8 2.7 2.6 1.9-1.9 3.7-3.7 5.2-5.2'),
('comunidade','Comunidade','nav','M12 3.4c-5.1 0-8.8 3-8.8 6.9 0 2.1 1.1 4 2.9 5.2l-.8 4.2q-.3 1.4 1 1l3.5-3.5q1.1.3 2.2.3c5.1 0 8.8-3.2 8.8-7.2S17.1 3.4 12 3.4Z','M8.2 10.4h.1 M12 10.4h.1 M15.8 10.4h.1'),
('perfil','Perfil','nav','M4.2 20.8c.4-4.1 3.4-6.5 7.8-6.5s7.4 2.4 7.8 6.5q.1.7-.6.7H4.8q-.7 0-.6-.7Z','M16.2 7.1a4.2 4.2 0 1 1-8.4 0 4.2 4.2 0 1 1 8.4 0Z'),
('rega','Rega','care','M12 2.7c-2 3.1-6.8 8.1-6.8 11.3a6.8 6.8 0 0 0 13.6 0c0-3.2-4.8-8.2-6.8-11.3Z','M8.3 14.2c.1 1.7 1.4 3 3.1 3.2'),
('adubacao','Adubação','care','M9.2 3.7h5.6c1.7 0 2.7 1 2.9 2.6l1.5 10.8c.4 2.6-.9 3.9-3.4 3.9H8.2c-2.5 0-3.8-1.3-3.4-3.9L6.3 6.3c.2-1.6 1.2-2.6 2.9-2.6Z','M6.7 9h10.6 M12 17.7v-3.7 M11.9 15c-2.2.1-3.4-1.2-3.5-2.9 2.1-.1 3.4.8 3.5 2.9Z M12.1 14.2c.1-1.8 1.4-2.8 3.5-2.8-.1 1.7-1.3 2.8-3.5 2.8Z'),
('luz','Luz','care','M16.3 12a4.3 4.3 0 1 1-8.6 0 4.3 4.3 0 1 1 8.6 0Z','M12 2.5v1.8 M12 19.7v1.8 M2.5 12h1.8 M19.7 12h1.8 M5.25 5.25l1.25 1.25 M17.5 17.5l1.25 1.25 M5.25 18.75l1.25-1.25 M17.5 6.5l1.25-1.25'),
('poda','Poda','care','M7.7 17.3a2.9 2.9 0 1 1-5.8 0 2.9 2.9 0 1 1 5.8 0Z M22.1 17.3a2.9 2.9 0 1 1-5.8 0 2.9 2.9 0 1 1 5.8 0Z','M7.5 15.6 18.7 3.8 M16.5 15.6 5.3 3.8 M12 10.7h.1'),
('lembrete','Lembrete','care','M5.2 10.5a6.8 6.8 0 0 1 13.6 0v3.6c0 .9.3 1.5.8 2.1.7.8.4 1.7-.7 1.7H5.1c-1.1 0-1.4-.9-.7-1.7.5-.6.8-1.2.8-2.1Z','M10 21h4 M12 1.7v1.5'),
('status','Status da planta','care','M20.1 4.1c-9-1.6-16.3 2.2-16.3 9.1 0 3.7 2.5 6.1 6 6.1 6.4 0 9.6-6.7 10.3-15.2Z','M8.1 12.2l2.6 2.6 5.2-5.2')]
IV='#FAF8F2'; GREEN='#214F38'; MUTED='#6C786F'; LINE='#DED FD5'.replace(' ',''); LIGHT='#E9EEDF'
def parts(item,selected=False):
    slug,label,group,body,detail=item
    # Both states use open contours. The selected state uses a stronger stroke with no added background shape.
    head = ''
    scale = ''
    art = f'<g{scale} fill="none" stroke="currentColor" stroke-width="{2.4 if selected else 1.9}" stroke-linecap="round" stroke-linejoin="round"><path d="{body}"/>'
    if detail:
        art += f'<path d="{detail}"/>'
    if slug == 'status':
        art += '<path d="M6 18c-1.4 1-2.4 2.1-3 3"/>'
    return head + art + '</g>'
def svg_icon(item,selected=False):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" color="{GREEN}"><title>{item[1]} — {"selecionado" if selected else "normal"}</title>{parts(item,selected)}</svg>'
for i in icons:
    for s in (False,True): (out/'svg'/f'{i[0]}-{"selecionado" if s else "normal"}.svg').write_text(svg_icon(i,s))
def ico(slug,x,y,size=24,selected=False,color=GREEN):
    it=next(i for i in icons if i[0]==slug)
    return f'<g transform="translate({x} {y}) scale({size/24})" color="{color}">{parts(it,selected)}</g>'
def text(x,y,t,size=16,weight=400,color=GREEN,extra=''):
    return f'<text x="{x}" y="{y}" font-family="Inter, -apple-system, Helvetica Neue, Arial, sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}" {extra}>{html.escape(str(t))}</text>'
def rect(x,y,w,h,fill,rx=0,stroke='none'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}"/>'
# Photographic details are clipped from the supplied UI reference, preserving the user's visual direction.
ref=Path('/Users/caiqueantonio/Downloads/2b3571f1-c812-4aa9-9035-5c647a6c7525.png')
photo='data:image/png;base64,'+base64.b64encode(ref.read_bytes()).decode()
def plant_photo(x,y,w,h,kind='monstera'):
    sx,sy,sw,sh={'monstera':(340,211,121,98),'jade':(476,390,122,106),'jiboia':(476,211,122,98)}[kind]
    return f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="{sx} {sy} {sw} {sh}" preserveAspectRatio="xMidYMid slice"><image width="1536" height="1024" href="{photo}"/></svg>'
def home():
    a=[rect(0,0,390,844,IV),text(24,30,'9:41',14,600),text(305,30,'•••  ▰',15,600),text(24,85,'BOM DIA,',11,500,MUTED),text(24,120,'Antonio',32,650),ico('minhas-plantas',153,96,24),ico('lembrete',286,81,24),rect(330,78,36,36,LIGHT,18),ico('perfil',338,86,20),text(24,154,'Suas plantas precisam de um pouco',15,400,MUTED),text(24,176,'de atenção hoje.',15,400,MUTED),text(24,222,'Hoje',23,650),text(287,220,'2 tarefas',13,400,MUTED),rect(24,241,342,126,'#FFFFFF',16,'#E9E8E0'),plant_photo(36,253,78,98),text(130,276,'Monstera',17,600),ico('rega',130,288,18),text(155,303,'Regar hoje',13,400,MUTED),rect(130,315,222,44,GREEN,18),text(241,342,'Marcar como regada',13,600,IV,'text-anchor="middle"'),rect(24,379,342,88,'#FFFFFF',16,'#E9E8E0'),plant_photo(36,391,65,64,'jade'),text(116,409,'Jade',17,600),ico('adubacao',116,422,18),text(142,437,'Adubar hoje',13,400,MUTED),text(341,431,'›',25),text(24,513,'Minhas plantas',23,650),text(300,511,'Ver todas',12,500)]
    for j,(name,key) in enumerate([('Monstera','monstera'),('Jiboia','jiboia'),('Jade','jade')]):
        x=24+j*118
        a.extend([plant_photo(x,532,106,88,key),text(x,642,name,13,600),ico('status',x,651,14),text(x+20,663,'Saudável',11,400,MUTED)])
    a.extend([rect(24,689,342,63,LIGHT,12),ico('status',39,706,26,True),text(78,714,'Um cuidado de cada vez.',14,600),text(78,735,'Sua rotina verde está crescendo.',12,400,MUTED),rect(0,770,390,74,IV),'<path d="M0 770H390" stroke="#DED FD5"/>'.replace('DED FD5','DEDFD5')])
    for j,it in enumerate(icons[:5]):
        x=j*78
        a.extend([ico(it[0],x+27,783,24,j==0,GREEN if j==0 else MUTED),text(x+39,825,it[1],9,600 if j==0 else 400,GREEN if j==0 else MUTED,'text-anchor="middle"')])
    a.append(rect(135,836,120,4,GREEN,2))
    return ''.join(a)
homesvg=f'<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">{home()}</svg>'
(out/'inicio-aplicacao.svg').write_text(homesvg)
board=[rect(0,0,1600,1190,IV),text(64,64,'PlantMe',30,750),text(66,97,'SISTEMA DE ÍCONES  /  EDIÇÃO CURVAS',11,600,MUTED),text(64,160,'Pequenos gestos.',48,650),text(64,214,'Uma linguagem própria.',48,650),text(66,253,'11 símbolos para orientar a rotina de cuidado.',17,400,MUTED),text(66,305,'NAVEGAÇÃO',12,600),text(260,305,'NORMAL',11,500,MUTED),text(369,305,'SELECIONADO',11,500,MUTED),text(524,305,'24 PX',11,500,MUTED),text(625,305,'CUIDADOS',12,600),text(810,305,'NORMAL',11,500,MUTED),text(920,305,'SELECIONADO',11,500,MUTED)]
for group,x,items in [('nav',64,icons[:5]),('care',624,icons[5:])]:
    for n,it in enumerate(items):
        y=327+n*94
        board.extend([f'<path d="M{x} {y+83}h480" stroke="#DEDFD5"/>',text(x,y+44,it[1],16,550),ico(it[0],x+213,y+20,38),rect(x+321,y+8,64,64,LIGHT,16),ico(it[0],x+334,y+21,38,True)])
        if group=='nav': board.append(ico(it[0],x+464,y+27,24))
board.extend([text(64,913,'DESENHO',11,600,MUTED),text(64,943,'Grade 24 × 24 · traço 1,9 px',18,550),text(64,971,'Curvas contínuas. Cantos arredondados.',14,400,MUTED),text(64,995,'Traço mais forte para indicar seleção.',14,400,MUTED),text(624,943,'Verde floresta',18,550),rect(624,962,32,32,GREEN,16),text(669,984,GREEN,14,500),text(624,1021,'Cor herdada por currentColor.',13,400,MUTED),text(1160,87,'APLICAÇÃO / INÍCIO',11,600,MUTED),text(1160,118,'390 × 844 px',20,600),'<g transform="translate(1160 149)">',rect(-1,-1,392,846,'#DEDFD5',28),home(),'</g>',text(1160,1025,'Ícones de 24 px • alvos de 44 px ou mais',12,400,MUTED),text(1160,1050,'Composição baseada na referência 06 — Início.',11,400,MUTED),'<path d="M64 1100H1536" stroke="#DEDFD5"/>',text(64,1136,'Cuidar da sua planta ficou fácil.',17,500),text(1536,1136,'PLANTME  /  03',11,600,MUTED,'text-anchor="end"')])
boardsvg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1190" viewBox="0 0 1600 1190">'+''.join(board)+'</svg>'
(out/'prancha-comparativa.svg').write_text(boardsvg)
# Standalone interactive review: exact-size phone, selectable states, size and background checks.
rows=''.join(f'<article><h3>{i[1]}</h3><div class="pair"><div>{svg_icon(i)}<span>Normal</span></div><div>{svg_icon(i,True)}<span>Selecionado</span></div></div><a href="svg/{i[0]}-normal.svg" download>SVG normal ↓</a> <a href="svg/{i[0]}-selecionado.svg" download>Selecionado ↓</a></article>' for i in icons)
page='''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PlantMe — Família de ícones</title><style>
*{box-sizing:border-box}body{margin:0;background:#faf8f2;color:#214f38;font-family:Inter,-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif}header,main,footer{max-width:1440px;margin:auto;padding:40px}header{border-bottom:1px solid #dedfd5}header strong{font-size:27px}h1{font-size:clamp(36px,5vw,64px);letter-spacing:-2px;max-width:740px;margin:30px 0 16px}p{color:#6c786f;line-height:1.6}main{display:grid;grid-template-columns:1fr 390px;gap:60px}.tools{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin:20px 0 28px}button,select,a{font:inherit}button,select{min-height:44px;background:transparent;color:inherit;border:1px solid #adb5a5;border-radius:8px;padding:8px 16px;cursor:pointer}button:focus-visible,a:focus-visible,select:focus-visible{outline:3px solid #b8804b;outline-offset:4px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:#dedfd5;border:1px solid #dedfd5}article{padding:24px;background:#faf8f2}h3{font-size:16px;margin:0 0 24px}.pair{display:flex;gap:36px;margin-bottom:24px}.pair>div{display:flex;min-width:72px;flex-direction:column;align-items:center;gap:14px}.pair svg{width:var(--size,32px);height:var(--size,32px);color:inherit}.pair span{font-size:11px;color:#6c786f}a{font-size:12px;color:inherit;text-underline-offset:3px;margin-right:10px}.dark article{background:#173c2b;color:#faf8f2;--icon-cutout:#173c2b}.dark .pair span{color:#ccd8c7}.phone{width:390px;max-width:100%;overflow:hidden;border-radius:24px;border:1px solid #dedfd5}.phone img{display:block;width:100%}aside{position:sticky;top:20px;align-self:start}.caption{font-size:12px}footer{border-top:1px solid #dedfd5;font-size:13px}.board{font-size:14px} @media(max-width:1000px){main{grid-template-columns:1fr}aside{position:static}}@media(max-width:560px){header,main,footer{padding:24px}.grid{grid-template-columns:1fr}.pair{gap:48px}}
</style><header><strong>PlantMe</strong><h1>Pequenos gestos.<br>Uma linguagem própria.</h1><p>Onze ícones originais para acompanhar cada etapa do cuidado.<br>Grade de 24 px · traço de 1,9 px · versões normal e selecionada.</p><a class="board" href="prancha-comparativa.svg">Abrir prancha comparativa ↗</a></header><main><section><h2>A família</h2><div class="tools"><label for="size">Tamanho</label><select id="size"><option value="20">20 px</option><option value="24">24 px</option><option value="32" selected>32 px</option><option value="48">48 px</option></select><button id="contrast" aria-pressed="false">Testar fundo escuro</button></div><div class="grid">'''+rows+'''</div></section><aside><h2>Aplicação no Início</h2><p class="caption">390 × 844 px · ícones de 24 px na navegação.</p><div class="phone"><img src="inicio-aplicacao.svg" alt="Tela Início do PlantMe com tarefas de rega e adubação, coleção e cinco abas com os ícones originais."></div><p class="caption">Recomposição da tela 06 fornecida como referência.<br>Fotografias extraídas visualmente da própria referência.</p></aside></main><footer>O traço mais forte indica seleção. Status e urgência devem sempre aparecer acompanhados de texto.</footer><script>document.querySelector('#size').addEventListener('change',e=>document.querySelector('.grid').style.setProperty('--size',e.target.value+'px'));document.querySelector('#contrast').addEventListener('click',e=>{const on=document.querySelector('.grid').classList.toggle('dark');e.target.setAttribute('aria-pressed',String(on));e.target.textContent=on?'Usar fundo claro':'Testar fundo escuro'})</script></html>'''
(out/'index.html').write_text(page)
(out/'LEIA-ME.md').write_text('''# PlantMe — Ícones v3

22 SVGs originais: 11 símbolos, cada um em estado normal e selecionado. Desenhados manualmente por paths, sem dependência de bibliotecas externas.

## Arquivos
- `svg/`: ícones individuais, 24 × 24.
- `prancha-comparativa.svg`: apresentação vetorial com aplicação na tela Início.
- `inicio-aplicacao.svg`: recomposição da referência 06, em 390 × 844.
- `index.html`: comparação interativa de tamanhos (20, 24, 32 e 48 px) e contraste.

## Construção e uso
Grade: 24 unidades. Traço: 1,9. Pontas e junções arredondadas. Cor padrão: #214F38. Cor principal via currentColor; para usar CSS, inserir o SVG inline e remover/substituir o atributo color da raiz. Os recortes claros das versões preenchidas usam #FAF8F2: ao mudar a paleta, ajustar também essa cor para preservar contraste. Alvo interativo mínimo de 44 × 44 pt, independente do tamanho do desenho.

Selecionado = traço reforçado; manter o rótulo e usar aria-current na aba ativa. Os ícones de cuidados podem usar selecionado em controles de escolha, sem implicar que uma tarefa foi concluída. Status da planta representa saudável; outras condições precisam de símbolos e rótulos próprios. Não inferir saúde clínica da planta com base apenas em tarefas registradas.

Navegação: Início (casa), Minhas plantas (vaso com duas folhas), Cuidados (prancheta marcada), Comunidade (balão de conversa), Perfil (pessoa). Cuidados: Rega (gota), Adubação (saco de adubo com broto), Luz (sol), Poda (tesoura), Lembrete (sino), Status (folha com check).

A tela aplicada é uma proposta estática baseada na composição fornecida, e não uma implementação funcional do aplicativo. Fotografias vêm da prancha do usuário, usada apenas como referência visual nesta entrega. Aprovação visual e teste com usuários ainda não realizados.
''')
for p in (out/'svg').glob('*.svg'): ET.parse(p)
ET.parse(out/'inicio-aplicacao.svg'); ET.parse(out/'prancha-comparativa.svg')
with zipfile.ZipFile(out/'plantme-icones-svg.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in (out/'svg').glob('*.svg'): z.write(p,p.relative_to(out))
    z.write(out/'LEIA-ME.md','LEIA-ME.md')
print(f'Criados {len(list((out/"svg").glob("*.svg")))} ícones SVG, prancha, aplicação, HTML e ZIP. XML validado.')
