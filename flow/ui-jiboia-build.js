// Execute via Figma use_figma against PlantMe 2.0, page 2:2.
const page = await figma.getNodeByIdAsync('2:2');
await figma.setCurrentPageAsync(page);
const section = await figma.getNodeByIdAsync('398:1310');
if (!section || section.type !== 'SECTION') throw new Error('Seção de continuação ausente');
await Promise.all([
  ['Nunito', 'Black'], ['Nunito', 'ExtraBold'], ['Nunito', 'Bold'],
  ['Manrope', 'Medium'], ['Manrope', 'Regular'], ['Manrope', 'SemiBold']
].map(([family, style]) => figma.loadFontAsync({ family, style })));

const allVariables = await figma.variables.getLocalVariablesAsync();
const token = Object.fromEntries(allVariables.filter(v => v.variableCollectionId === 'VariableCollectionId:190:230').map(v => [v.name, v]));
const made = [], changed = [];
const rgb = (r, g, b) => ({ r, g, b });
const color = {
  bg: rgb(.984, .980, .965), white: rgb(1, 1, 1), ink: rgb(.047, .098, .086),
  muted: rgb(.365, .388, .376), green: rgb(.084, .361, .204), pale: rgb(.930, .967, .914),
  pale2: rgb(.955, .977, .934), border: rgb(.845, .856, .843)
};
function track(n) { made.push(n.id); return n; }
function paint(name, fallback) {
  const base = { type: 'SOLID', color: fallback };
  return token[name] ? figma.variables.setBoundVariableForPaint(base, 'color', token[name]) : base;
}
function fill(n, name, fallback) { n.fills = [paint(name, fallback)]; }
function border(n, name = 'color/border/default') { n.strokes = [paint(name, color.border)]; n.strokeWeight = 1; }
function radius(n, amount = 16, name = 'radius/card') {
  n.cornerRadius = amount;
  if (token[name]) n.setBoundVariable('cornerRadius', token[name]);
}
function textNode(parent, name, value, x, y, width, font, size, tone, opts = {}) {
  const n = track(figma.createText());
  parent.appendChild(n); n.name = name;
  n.fontName = { family: font[0], style: font[1] };
  n.fontSize = size;
  n.lineHeight = { unit: 'PIXELS', value: opts.lineHeight || Math.round(size * 1.34) };
  n.characters = value;
  n.resize(width, Math.max(22, size * 1.4));
  n.textAutoResize = 'HEIGHT';
  n.x = x; n.y = y;
  if (opts.center) n.textAlignHorizontal = 'CENTER';
  fill(n, tone === 'muted' ? 'color/text/secondary' : tone === 'green' ? 'color/text/accent' : 'color/text/primary', color[tone] || color.ink);
  return n;
}
function rect(parent, name, x, y, w, h, tone = 'white', rad = 16, edge = false) {
  const n = track(figma.createFrame()); parent.appendChild(n);
  n.name = name; n.resize(w, h); n.x = x; n.y = y;
  fill(n, tone === 'pale' ? 'color/surface/accent' : tone === 'bg' ? 'color/background/default' : 'color/surface/default', color[tone] || color.white);
  if (rad) radius(n, rad);
  if (edge) border(n);
  return n;
}
function image(parent, name, hash, x, y, w, h, rad = 0) {
  const n = track(figma.createRectangle()); parent.appendChild(n); n.name = name;
  n.resize(w, h); n.x = x; n.y = y;
  n.fills = [{ type: 'IMAGE', imageHash: hash, scaleMode: 'FILL' }];
  if (rad) n.cornerRadius = rad;
  return n;
}
function cloneInto(sourceId, parent, name, x, y, w, h) {
  const src = page.findOne(n => n.id === sourceId);
  if (!src) throw new Error('Origem ausente: ' + sourceId);
  const n = src.clone(); parent.appendChild(n); n.name = name;
  if (w && h) n.resize(w, h);
  n.x = x; n.y = y;
  made.push(n.id, ...n.findAll(() => true).map(c => c.id));
  return n;
}
function phone(name, x, y, h = 667) {
  const f = track(figma.createFrame()); section.appendChild(f);
  f.name = name; f.resize(375, h); f.x = x; f.y = y; f.clipsContent = true;
  fill(f, 'color/background/default', color.bg);
  cloneInto('385:2489', f, 'iPhone Status bar', 0, 0, 375, 20);
  return f;
}
function back(f) { return cloneInto('373:1374', f, 'Voltar / 56 pt', 16, 44, 56, 56); }
function button(f, label, y = 596) {
  const n = cloneInto('382:2233', f, 'Ação principal / ' + label, 16, y, 343, 52);
  if (n.type === 'INSTANCE') n.setProperties({ 'Texto#314:2': label });
  const t = n.findOne(c => c.type === 'TEXT' && c.visible);
  if (t && t.characters !== label) { t.characters = label; changed.push(t.id); }
  return n;
}
function link(f, label, x, y, w = 343) {
  const zone = rect(f, 'Ação secundária / ' + label, x, y, w, 44, 'bg', 0);
  textNode(zone, 'Label', label, 0, 11, w, ['Manrope', 'SemiBold'], 14, 'green', { center: true });
  return zone;
}
function option(f, name, label, x, y, w, selected) {
  const c = rect(f, name, x, y, w, 48, selected ? 'pale' : 'white', 14, true);
  if (selected) border(c, 'color/border/selected');
  textNode(c, 'Label', label, 12, 13, w - 24, ['Manrope', 'SemiBold'], 13, selected ? 'green' : 'ink');
  return c;
}
function nav(source, dest) {
  return source.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{
    type: 'NODE', destinationId: dest.id, navigation: 'NAVIGATE',
    transition: { type: 'DISSOLVE', easing: { type: 'EASE_OUT' }, duration: .18 },
    resetScrollPosition: true
  }] }]);
}

section.resizeWithoutConstraints(2780, 1740); changed.push(section.id);
const guide = textNode(section, 'Mapa do fluxo', 'Jiboia selecionada  →  ambiente e luz  →  rotina sugerida  →  plano salvo  →  lembretes opcionais  →  Início', 30, 45, 2600, ['Nunito', 'ExtraBold'], 17, 'ink');

// 1. Dados reais da planta: a espécie está definida, mas o cadastro ainda não foi salvo.
const setup = phone('01 / Conheça sua Jiboia', 30, 130);
const setupBack = back(setup);
textNode(setup, 'Título', 'Conheça sua Jiboia', 16, 116, 343, ['Nunito', 'Black'], 24, 'ink');
textNode(setup, 'Descrição', 'Conte onde ela vai ficar para sugerirmos os cuidados.', 16, 151, 343, ['Manrope', 'Medium'], 14, 'muted');
const plant = rect(setup, 'Espécie selecionada', 16, 191, 343, 70, 'white', 16, true);
image(plant, 'Foto / Jiboia', '9d81221336e52eeb17f8e484b4a8110e60f088e9', 9, 9, 52, 52, 10);
textNode(plant, 'Espécie', 'Jiboia', 73, 12, 238, ['Nunito', 'ExtraBold'], 17, 'ink');
textNode(plant, 'Nome científico', 'Epipremnum aureum', 73, 36, 238, ['Manrope', 'Medium'], 12, 'muted');
textNode(setup, 'Label / Nome', 'Nome da planta', 16, 278, 343, ['Manrope', 'SemiBold'], 14, 'ink');
const nameField = rect(setup, 'Campo / Nome da planta', 16, 302, 343, 54, 'white', 12, true);
textNode(nameField, 'Valor', 'Minha Jiboia', 14, 15, 310, ['Manrope', 'Medium'], 15, 'ink');
textNode(setup, 'Label / Ambiente', 'Onde ela fica?', 16, 367, 343, ['Manrope', 'SemiBold'], 14, 'ink');
const place = rect(setup, 'Seletor / Ambiente', 16, 391, 343, 50, 'white', 12, true);
textNode(place, 'Selecionado', 'Sala de estar', 14, 13, 285, ['Manrope', 'Medium'], 14, 'ink');
textNode(place, 'Expandir', '⌄', 309, 9, 20, ['Nunito', 'Bold'], 20, 'green');
textNode(setup, 'Label / Luz', 'Como é a luz nesse local?', 16, 454, 343, ['Manrope', 'SemiBold'], 14, 'ink');
option(setup, 'Luz / Indireta / selecionada', 'Luz indireta', 16, 480, 166, true);
option(setup, 'Luz / Sol direto', 'Sol direto', 192, 480, 167, false);
const unknownLight = link(setup, 'Não sei informar', 16, 535);
const setupCta = button(setup, 'Continuar');

// 2. Revisão do plano, com edição opcional antes de salvar.
const routine = phone('02 / Revise os cuidados', 475, 130);
const routineBack = back(routine);
textNode(routine, 'Título', 'Cuidados sugeridos', 16, 116, 343, ['Nunito', 'Black'], 24, 'ink');
textNode(routine, 'Descrição', 'Uma rotina inicial para a sua Jiboia.', 16, 151, 343, ['Manrope', 'Medium'], 14, 'muted');
const ctx = rect(routine, 'Contexto da planta', 16, 197, 343, 62, 'pale', 14);
textNode(ctx, 'Resumo', 'Minha Jiboia  ·  Sala de estar', 14, 10, 310, ['Manrope', 'SemiBold'], 14, 'ink');
textNode(ctx, 'Luz', 'Luz indireta', 14, 33, 310, ['Manrope', 'Medium'], 12, 'muted');
const water = rect(routine, 'Cuidado / Rega / Ajustar', 16, 275, 343, 107, 'white', 16, true);
textNode(water, 'Tipo', 'Verificar umidade', 15, 13, 245, ['Nunito', 'ExtraBold'], 17, 'ink');
textNode(water, 'Intervalo', 'A cada 7 dias', 15, 43, 230, ['Manrope', 'SemiBold'], 14, 'green');
textNode(water, 'Nota', 'Regue apenas se a terra estiver seca.', 15, 70, 295, ['Manrope', 'Medium'], 12, 'muted');
textNode(water, 'Ajustar', 'Ajustar', 260, 18, 68, ['Manrope', 'SemiBold'], 13, 'green');
const feed = rect(routine, 'Cuidado / Adubação', 16, 394, 343, 88, 'white', 16, true);
textNode(feed, 'Tipo', 'Adubação', 15, 14, 230, ['Nunito', 'ExtraBold'], 17, 'ink');
textNode(feed, 'Intervalo', 'A cada 30 dias', 15, 46, 230, ['Manrope', 'SemiBold'], 14, 'green');
textNode(feed, 'Ajustar', 'Ajustar', 260, 22, 68, ['Manrope', 'SemiBold'], 13, 'green');
textNode(routine, 'Observação', 'A frequência é uma sugestão. Você pode mudá-la depois.', 16, 501, 343, ['Manrope', 'Medium'], 12, 'muted');
const routineCta = button(routine, 'Criar plano de cuidados');

// 3. Plano já salvo; o convite de notificação vem depois do benefício concreto.
const ready = phone('03 / Seu plano está pronto', 920, 130);
const hero = rect(ready, 'Fundo / celebração', 0, 20, 375, 273, 'pale', 0);
image(hero, 'Milo / celebração', '4172cc8dc068ae23978519e6ec316ad86c4032dc', 81, 10, 213, 213);
textNode(ready, 'Título', 'Seu plano está pronto!', 16, 310, 343, ['Nunito', 'Black'], 25, 'ink', { center: true });
textNode(ready, 'Descrição', 'Minha Jiboia já faz parte da sua rotina.', 22, 349, 331, ['Manrope', 'Medium'], 14, 'muted', { center: true });
const summary = rect(ready, 'Resumo do primeiro plano', 16, 404, 343, 126, 'white', 16, true);
textNode(summary, 'Linha 1', 'Verificar umidade', 16, 14, 225, ['Manrope', 'SemiBold'], 14, 'ink');
textNode(summary, 'Prazo 1', 'Em 7 dias', 243, 14, 84, ['Manrope', 'SemiBold'], 13, 'green');
const divider = track(figma.createRectangle()); summary.appendChild(divider); divider.name = 'Divisor'; divider.resize(311, 1); divider.x = 16; divider.y = 61; fill(divider, 'color/border/subtle', color.border);
textNode(summary, 'Linha 2', 'Adubação', 16, 79, 225, ['Manrope', 'SemiBold'], 14, 'ink');
textNode(summary, 'Prazo 2', 'Em 30 dias', 240, 79, 87, ['Manrope', 'SemiBold'], 13, 'green');
const readyCta = button(ready, 'Continuar');

// 4. Convite opcional; pedir permissão somente após a escolha explícita.
const reminder = phone('04 / Lembretes opcionais', 1365, 130);
const reminderBack = back(reminder);
textNode(reminder, 'Título', 'Quer receber lembretes?', 16, 121, 343, ['Nunito', 'Black'], 24, 'ink');
textNode(reminder, 'Descrição', 'A gente avisa quando chegar a hora de conferir sua Jiboia.', 16, 161, 343, ['Manrope', 'Medium'], 14, 'muted');
const preview = rect(reminder, 'Prévia de notificação', 16, 236, 343, 150, 'pale', 18);
textNode(preview, 'App', 'PlantMe  ·  hoje, 9h', 16, 14, 311, ['Manrope', 'SemiBold'], 12, 'green');
textNode(preview, 'Título', 'Hora de conferir a Jiboia', 16, 47, 311, ['Nunito', 'ExtraBold'], 17, 'ink');
textNode(preview, 'Mensagem', 'Toque a terra e regue apenas se estiver seca.', 16, 81, 307, ['Manrope', 'Medium'], 13, 'muted');
textNode(reminder, 'Nota', 'Você pode ajustar o horário ou desativar os avisos em Configurações.', 16, 413, 343, ['Manrope', 'Medium'], 13, 'muted');
const reminderCta = button(reminder, 'Ativar lembretes', 544);
const skip = link(reminder, 'Agora não', 16, 602);

// 5. Representação da permissão nativa, pedida no momento certo.
const permission = reminder.clone(); section.appendChild(permission); permission.name = '05 / Permissão do iOS'; permission.x = 1810; permission.y = 130;
made.push(permission.id, ...permission.findAll(() => true).map(n => n.id));
const shade = track(figma.createRectangle()); permission.appendChild(shade); shade.name = 'Escurecimento / sistema'; shade.resize(375, 667); shade.x = 0; shade.y = 0; shade.fills = [{ type: 'SOLID', color: rgb(0, 0, 0), opacity: .38 }];
const alert = rect(permission, 'Alerta nativo / notificações', 37, 231, 301, 224, 'white', 18);
textNode(alert, 'Título', '“PlantMe” deseja enviar notificações', 17, 21, 267, ['Nunito', 'ExtraBold'], 16, 'ink', { center: true });
textNode(alert, 'Mensagem', 'Você receberá lembretes dos cuidados das suas plantas.', 19, 80, 263, ['Manrope', 'Medium'], 13, 'muted', { center: true });
const noPermission = link(alert, 'Não permitir', 0, 133, 301);
const yesPermission = link(alert, 'Permitir', 0, 179, 301);

// 6. Destino: reutiliza a Home já desenhada para a primeira planta.
const existingHome = await figma.getNodeByIdAsync('122:595');
const home = existingHome.clone(); section.appendChild(home); home.name = '06 / Início com a Jiboia'; home.x = 2255; home.y = 130;
made.push(home.id, ...home.findAll(() => true).map(n => n.id));

// Variante contextual: editar o intervalo e voltar à revisão.
const adjust = routine.clone(); section.appendChild(adjust); adjust.name = '02a / Ajustar intervalo de rega'; adjust.x = 475; adjust.y = 950;
made.push(adjust.id, ...adjust.findAll(() => true).map(n => n.id));
const scrim = track(figma.createRectangle()); adjust.appendChild(scrim); scrim.name = 'Escurecimento / sheet'; scrim.resize(375, 667); scrim.x = 0; scrim.y = 0; scrim.fills = [{ type: 'SOLID', color: rgb(0, 0, 0), opacity: .35 }];
const sheet = rect(adjust, 'Painel inferior / Ajustar rega', 0, 270, 375, 397, 'white', 22);
textNode(sheet, 'Título', 'Ajustar rega', 16, 24, 343, ['Nunito', 'Black'], 21, 'ink');
textNode(sheet, 'Descrição', 'Quando você quer conferir a terra?', 16, 59, 343, ['Manrope', 'Medium'], 13, 'muted');
option(sheet, '5 dias', '5 dias', 16, 113, 105, false);
option(sheet, '7 dias / selecionado', '7 dias', 135, 113, 105, true);
option(sheet, '10 dias', '10 dias', 254, 113, 105, false);
textNode(sheet, 'Dica', 'Isso é um lembrete para verificar a umidade. Regue só se a terra estiver seca.', 16, 188, 343, ['Manrope', 'Medium'], 13, 'muted');
const saveAdjustment = button(sheet, 'Salvar intervalo', 316);
saveAdjustment.x = 16;

// Human-readable labels on the canvas keep main and optional paths distinct.
textNode(section, 'Rótulo / edição opcional', 'Opcional: ajustar a rega antes de criar o plano', 475, 901, 750, ['Manrope', 'SemiBold'], 14, 'muted');

// Main navigation and contextual branches.
await nav(setupBack, await figma.getNodeByIdAsync('382:2320'));
await nav(setupCta, routine);
await nav(routineBack, setup);
await nav(routineCta, ready);
await nav(water, adjust);
await nav(feed, adjust);
await nav(saveAdjustment, routine);
await nav(readyCta, reminder);
await nav(reminderBack, ready);
await nav(reminderCta, permission);
await nav(skip, home);
await nav(noPermission, home);
await nav(yesPermission, home);

// The existing species detail now confirms the species instead of prematurely saving the plant.
const oldCta = await figma.getNodeByIdAsync('382:2233');
if (oldCta.type === 'INSTANCE') oldCta.setProperties({ 'Texto#314:2': 'Usar esta espécie' });
const oldLabel = oldCta.findOne(n => n.type === 'TEXT' && n.visible);
if (oldLabel && oldLabel.characters !== 'Usar esta espécie') { oldLabel.characters = 'Usar esta espécie'; changed.push(oldLabel.id); }
await nav(oldCta, setup); changed.push(oldCta.id);
const resultCard = await figma.getNodeByIdAsync('373:1566');
await nav(resultCard, await figma.getNodeByIdAsync('382:2320')); changed.push(resultCard.id);

return {
  createdNodeIds: made, mutatedNodeIds: changed,
  sectionId: section.id,
  screens: [setup, routine, adjust, ready, reminder, permission, home].map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y, width: n.width, height: n.height })),
  mainRoute: ['373:1371', '382:2320', setup.id, routine.id, ready.id, reminder.id, permission.id, home.id]
};
