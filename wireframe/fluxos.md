# Fluxos de telas — PlantMe 2.0

[Abrir o wireframe no Figma](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=155-265)

Os destinos abaixo descrevem o fluxo-base. Os estados compartilhados usam o contexto de origem; a seção de regras de cada tela informa essas variações. Os dados de plantas e conta são ilustrativos. A apresentação usa tons de cinza, sem imagens decorativas; fotos funcionais aparecem como espaços reservados identificados.

## Jornadas principais

**Primeiro acesso:** A00 → A01 → A02 → A03 → A04 → P00. Explorar primeiro → H00.

**Primeira planta por busca:** P00 → P01 → P03 → N00 → N02 → N03 → N05 → N08 → N09 → D00/H01.

**Cadastro manual:** P00 → P05 → N02 → N03 → N05 → N08 → N09. A rotina deve ser definida pela pessoa quando a espécie for desconhecida.

**Identificação:** P00 → I00 → I01/I02 → I03/I04 → I05 → I06 → P03/N00. Falha de identificação → I07 → nova foto, busca ou manual.

**Cuidado:** H02/C06/D00 → C00 → C01 → C02. Adiar → C03 → C05. Verificar sem regar → C04 → C05.

**Conta:** B00 → H02 ou contexto original. Criar conta → B01 → B02 → B09 → início correspondente. Recuperar senha → B05 → B06 → B07 → B08 → B00.

**Perfil e saída:** F00 → S00 → S06 → S07 → B00/H00. Excluir conta → S08 → S09 → S10 → A01.

## Inventário detalhado

### 01 · Entrada e onboarding

Primeiro acesso → personalização → primeira planta. Conta e permissões ficam no contexto de uso.

#### [A00 · PlantMe](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1250)

Cuidar da sua planta ficou fácil.

- Avanço automático → A01 conforme estado da sessão.

**Regra:** Após 1,2 s: primeiro acesso → A01; sessão válida → H02; visitante com plantas → H01; visitante sem plantas com onboarding concluído → H00.

**Cenários alternativos:**
- Sessão válida → H02.
- Visitante recorrente → H00.

#### [A01 · Boas-vindas ao PlantMe](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1273)

Um cuidado de cada vez. Cada passo conta.

- **Começar agora** → A02.
- **Já tenho uma conta** → B00.

**Regra:** Início da jornada. Criar conta é opcional; não perde preferências ao entrar.

#### [A02 · Vamos conhecer você melhor](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1293)

Qual é seu nível de experiência com plantas?

- **Continuar** → A03.
- Voltar → A01 ou contexto registrado, conforme a regra abaixo.

**Regra:** Seleção única. Exemplo: iniciante selecionado. Continuar habilita após escolha; voltar preserva resposta.

#### [A03 · Quais plantas você quer cultivar?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1317)

Escolha seus interesses. Você pode mudar depois.

- **Continuar** → A04.
- **Escolher depois** → A04.
- Voltar → A02 ou contexto registrado, conforme a regra abaixo.

**Regra:** Seleção múltipla e opcional. O resumo de A04 reflete exatamente as escolhas.

#### [A04 · Sua rotina verde começa agora](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1345)

Um cuidado de cada vez. Cada passo conta.

- **Adicionar minha primeira planta** → P00.
- **Explorar o app primeiro** → H00.
- Voltar → A03 ou contexto registrado, conforme a regra abaixo.

**Regra:** Onboarding concluído. Ainda não há planta, conta criada ou permissão de notificação concedida.

### 02 · Conta e recuperação de acesso

Acesso por e-mail. Retorno à ação original após autenticação; dados do visitante são preservados.

#### [B00 · Entrar na sua conta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1406)

Sua coleção, sempre com você.

- **Entrar** → H02.
- **Criar uma conta** → B01.
- Esqueci minha senha → B05.
- Voltar → A01 ou contexto registrado, conforme a regra abaixo.

**Regra:** Entrar retorna à origem quando chamado de Perfil ou sincronização. Exemplo padrão → início com coleção.

**Cenários alternativos:**
- Credenciais incorretas → B04.
- E-mail não verificado → B02.
- Sem conexão → X01.

#### [B01 · Criar sua conta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1441)

Salve suas plantas e sua evolução.

- **Criar conta** → B02.
- Termos e privacidade → F09.
- Voltar → B00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Aceite obrigatório; marketing não selecionado por padrão. Preferências e coleção local são mantidas.

**Cenários alternativos:**
- E-mail já cadastrado → B03.
- Campos inválidos → B10.

#### [B02 · Confira seu e-mail](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1475)

Enviamos um código para anna@email.com.

- **Verificar e continuar** → B09.
- **Reenviar código** → B11.
- **Corrigir e-mail** → B01.
- Voltar → B01 ou contexto registrado, conforme a regra abaixo.

**Regra:** Código expira em 10 min. Login pendente retorna à intenção de entrada.

**Cenários alternativos:**
- Código inválido ou expirado → B12.

#### [B03 · Este e-mail já tem conta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1503)

Você pode entrar ou recuperar sua senha.

- **Entrar** → B00.
- **Recuperar senha** → B05.
- Voltar → B01 ou contexto registrado, conforme a regra abaixo.

#### [B04 · Vamos tentar de novo](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1525)

E-mail ou senha não conferem.

- **Tentar entrar** → H02.
- **Recuperar senha** → B05.
- Voltar → B00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Preservar e-mail. Não confirmar publicamente se uma conta existe. Tentativas repetidas → pausa informada.

#### [B05 · Recuperar senha](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1549)

Informe o e-mail usado na sua conta.

- **Enviar código** → B06.
- Voltar → B00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Mensagem igual para e-mails existentes e inexistentes; não revelar existência da conta.

#### [B06 · Confira seu e-mail](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1570)

Se houver uma conta, você receberá um código.

- **Validar código** → B07.
- **Reenviar código** → B11.
- Voltar → B05 ou contexto registrado, conforme a regra abaixo.

**Cenários alternativos:**
- Código expirado → B12.

#### [B07 · Definir nova senha](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1596)

Escolha uma senha que você ainda não usa.

- **Salvar nova senha** → B08.
- Voltar → B06 ou contexto registrado, conforme a regra abaixo.

**Cenários alternativos:**
- Senhas não conferem → B10.

#### [B08 · Senha atualizada](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1621)

Você já pode entrar com sua nova senha.

- **Voltar para entrar** → B00.

**Regra:** Recuperar senha não autentica automaticamente.

#### [B09 · Sua conta está pronta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1640)

Vamos continuar de onde você parou.

- **Continuar** → H00.
- **Ver meu perfil** → F00.

**Regra:** Primeira conta sem plantas → H00. Com plantas locais → H01. Login com coleção remota → H02.

**Cenários alternativos:**
- Com planta local → H01.
- Com coleção remota → H02.

#### [B10 · Confira os campos](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1665)

Falta ajustar um detalhe para continuar.

- **Corrigir cadastro** → B01.
- **Corrigir nova senha** → B07.
- Voltar → B01 ou contexto registrado, conforme a regra abaixo.

**Regra:** Estado reutilizável; erros específicos, foco no primeiro erro e dados válidos preservados.

#### [B11 · Código reenviado](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1691)

Confira sua caixa de entrada.

- **Voltar ao código** → B02.

**Regra:** Retorna a B02, B06 ou S04 conforme a origem do reenvio; o código anterior fica inválido.

#### [B12 · Este código não funcionou](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1710)

O código pode ter expirado ou estar incorreto.

- **Reenviar código** → B11.
- **Corrigir código** → B02.
- Voltar → B02 ou contexto registrado, conforme a regra abaixo.

**Regra:** No fluxo de recuperação, retorno é B06. Não descartar e-mail nem intenção original.

### 03 · Início, notificações e clima

Estados sem planta, primeira planta e coleção. A rotina é o centro do início.

#### [H00 · Bom dia, Anna](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1829)

Vamos começar sua rotina verde.

- **Adicionar primeira planta** → P00.
- Sua primeira planta começa aqui → P00.
- Dica verde do dia → L02.
- Minhas conquistas → L05.
- Navegação principal: aba Início; início, coleção e perfil consideram conta e existência de plantas.

**Regra:** Visitante ou conta sem plantas. Não mostrar tarefas, números de progresso ou alertas fictícios.

#### [H01 · Sua planta está pronta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1857)

A Jiboia já faz parte da sua coleção.

- **Ver minha planta** → D00.
- Próximo cuidado → C00.
- Ver minha Jiboia → D00.
- Dica verde do dia → L02.
- Navegação principal: aba Início; início, coleção e perfil consideram conta e existência de plantas.

**Regra:** Após a primeira planta, retornar aqui. O próximo cuidado depende da rotina salva.

#### [H02 · Bom dia, Anna](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1886)

Um cuidado de cada vez.

- Notificações → H04.
- São Paulo · 24° → H06.
- Cuidados de hoje → C06.
- plants → D00.
- Dica verde do dia → L02.
- Minhas conquistas → L05.
- Navegação principal: aba Início; início, coleção e perfil consideram conta e existência de plantas.
- Sessão expirada → X06; entrar novamente retorna à origem.

**Regra:** Clima é contexto; não conclui que a planta precisa de água. Cards abrem a planta selecionada.

**Cenários alternativos:**
- Tudo em dia → H03.
- Sem internet → X01.

#### [H03 · Tudo em dia por aqui](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1934)

Você já registrou os cuidados de hoje.

- Próximo cuidado → C06.
- Sua coleção → D01.
- Aprender algo novo → L00.
- Navegação principal: aba Início; início, coleção e perfil consideram conta e existência de plantas.

**Regra:** Estado após concluir cuidados do dia. Não exigir registro diário para manter conquistas.

#### [H04 · Notificações](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1961)

Novidades para sua rotina.

- **Marcar todas como lidas** → H05.
- Hora de conferir a Monstera → C00.
- Cuidado adiado da Jiboia → C00.
- Nova conquista → L06.
- Voltar → H02 ou contexto registrado, conforme a regra abaixo.

**Regra:** Tocar no alerta abre a planta/cuidado e marca como lido. Planta removida → H05 com aviso.

**Cenários alternativos:**
- Sem notificações → H05.
- Permissão desativada → F05.

#### [H05 · Tudo tranquilo](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-1999)

Você não tem notificações novas.

- **Ver próximos cuidados** → C06.
- Voltar → H02 ou contexto registrado, conforme a regra abaixo.

**Regra:** Lista vazia ou todas lidas. Não usar aviso alarmante.

#### [H06 · Clima da sua região](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2021)

Use como contexto para observar suas plantas.

- **Escolher minha cidade** → H07.
- **Usar minha localização** → H08.
- Alterar cidade → H07.
- Voltar → H02 ou contexto registrado, conforme a regra abaixo.

**Regra:** Cidade manual disponível sem GPS. Sem dados → ocultar clima no início e manter cuidados acessíveis.

#### [H07 · Escolher cidade](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2050)

Informe a cidade para consultar o clima.

- **Salvar cidade** → H06.
- São Paulo, SP → H06.
- São Paulo de Olivença, AM → H06.
- Voltar → H06 ou contexto registrado, conforme a regra abaixo.

**Regra:** Sem resultado → orientar nova busca. País/UF diferenciam cidades homônimas.

#### [H08 · Usar sua localização?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2081)

Precisamos dela apenas para sugerir sua cidade.

- **Permitir localização** → H06.
- **Escolher cidade manualmente** → H07.
- Clima perto de você → H07.
- Voltar → H06 ou contexto registrado, conforme a regra abaixo.

**Regra:** Tela explicativa precede o diálogo nativo do sistema. Negar → escolha manual, sem bloquear o app.

**Cenários alternativos:**
- Localização negada → H07.

### 04 · Adicionar por busca ou manualmente

Três entradas: buscar, identificar e cadastro manual. Seleção da espécie precede personalização.

#### [P00 · Adicionar planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2267)

Como você quer começar?

- Buscar pelo nome → P01.
- Identificar por foto → I00.
- Adicionar manualmente → P05.
- Voltar → H00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Ação central + e CTAs de primeira planta levam aqui. Cancelar retorna à origem, sem criar rascunho vazio.

#### [P01 · Buscar uma planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2300)

Busque por nome popular ou científico.

- Monstera deliciosa → P03.
- Monstera adansonii → P03.
- Jiboia → P03.
- Não sei o nome → I00.
- Voltar → P00 ou contexto registrado, conforme a regra abaixo.

**Cenários alternativos:**
- Nenhum resultado → P02.
- Carregando catálogo → X00.
- Falha na busca → X02.

#### [P02 · Nenhuma planta encontrada](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2345)

Não encontramos “Monstera azul”.

- **Adicionar manualmente** → P05.
- **Tentar outra busca** → P01.
- **Identificar por foto** → I00.
- Voltar → P01 ou contexto registrado, conforme a regra abaixo.

**Regra:** Busca sem resultado não é erro. Preservar texto e oferecer alternativas.

#### [P03 · Monstera deliciosa](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2370)

Costela-de-adão

- **Adicionar às minhas plantas** → N00.
- Guia da espécie → P04.
- Voltar → P01 ou contexto registrado, conforme a regra abaixo.

**Regra:** Detalhe do catálogo; ainda não é uma planta da coleção. Resultado de foto usa a mesma tela.

#### [P04 · Guia da Monstera](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2403)

Um ponto de partida para o cultivo.

- **Adicionar esta espécie** → N00.
- Voltar → P03 ou contexto registrado, conforme a regra abaixo.

**Regra:** Conteúdo editorial da espécie deve ser validado na implementação; o wireframe define a hierarquia.

#### [P05 · Cadastrar manualmente](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2427)

Tudo bem se você ainda não souber a espécie.

- **Continuar** → N02.
- Foto · opcional → N01.
- Voltar → P00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Nome obrigatório; espécie e foto opcionais. Origem manual usa plano personalizado em N03.

**Cenários alternativos:**
- Nome não preenchido → P06.

#### [P06 · Dê um nome à sua planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2458)

Assim você vai encontrá-la na coleção.

- **Corrigir e continuar** → P05.
- Voltar → P05 ou contexto registrado, conforme a regra abaixo.

### 05 · Identificação e permissões

Foto → revisão → análise → sugestões com confirmação humana. Busca e manual sempre disponíveis.

#### [I00 · Identificar sua planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2542)

Escolha uma foto clara das folhas.

- **Tirar foto** → I01.
- **Escolher da galeria** → I02.
- **Adicionar manualmente** → P05.
- Voltar → P00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Não pedir câmera até a pessoa escolher tirar foto. Galeria usa seletor nativo de fotos.

#### [I01 · Permitir acesso à câmera?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2567)

Precisamos da câmera para fotografar sua planta.

- **Permitir e abrir câmera** → I03.
- **Agora não** → I00.
- Voltar → I00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Pré-permissão → diálogo nativo. Permissão já concedida pula esta tela.

**Cenários alternativos:**
- Câmera negada → I08.

#### [I02 · Escolher uma foto](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2592)

Selecione apenas a imagem que deseja usar.

- **Usar foto selecionada** → I04.
- **Cancelar** → I00.
- Voltar → I00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Representação do seletor nativo, não uma tela customizada. Foto também pode vir do cadastro N01.

**Cenários alternativos:**
- Imagem inválida → I09.

#### [I03 · Fotografar planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2618)

Enquadre uma planta por vez.

- **Capturar foto** → I04.
- **Escolher da galeria** → I02.
- Voltar → I00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Representação da captura. Cancelar não descarta outros dados do cadastro.

#### [I04 · A foto ficou boa?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2640)

Confira se as folhas estão visíveis.

- **Identificar planta** → I05.
- **Tirar outra foto** → I03.
- Voltar → I00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Foto deve ser revisada antes de envio. No cadastro de foto pessoal, ação é “Usar foto” e retorna à origem.

#### [I05 · Buscando sua planta…](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2662)

Estamos analisando a foto.

- **Ver sugestões** → I06.
- **Cancelar análise** → I00.

**Regra:** Estado de processamento. Na implementação avança automaticamente; botão serve para demonstrar o protótipo.

**Cenários alternativos:**
- Sem identificação → I07.
- Falha de conexão → X02.

#### [I06 · Esta pode ser sua planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2687)

Confira as sugestões antes de confirmar.

- **Confirmar Monstera deliciosa** → N00.
- **Nenhuma destas** → I07.
- Monstera deliciosa → P03.
- Monstera adansonii → P03.
- Voltar → I04 ou contexto registrado, conforme a regra abaixo.

**Regra:** Não tratar reconhecimento como certeza. Confirmar uma alternativa leva ao detalhe da espécie selecionada.

#### [I07 · Ainda não conseguimos identificar](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2721)

Uma nova foto pode ajudar.

- **Tentar outra foto** → I03.
- **Buscar pelo nome** → P01.
- **Cadastrar manualmente** → P05.
- Voltar → I00 ou contexto registrado, conforme a regra abaixo.

#### [I08 · A câmera está desativada](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2745)

Você pode liberar o acesso nos ajustes do aparelho.

- **Ver orientação dos ajustes** → X04.
- **Escolher da galeria** → I02.
- **Buscar pelo nome** → P01.
- Voltar → I00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Não repetir o diálogo nativo após negação permanente. Abrir ajustes somente por ação explícita.

#### [I09 · Não conseguimos usar esta foto](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2769)

Escolha outra imagem para continuar.

- **Escolher outra imagem** → I02.
- **Buscar pelo nome** → P01.
- Voltar → I00 ou contexto registrado, conforme a regra abaixo.

### 06 · Personalização e primeira rotina

Nome e foto → ambiente → rotina → lembretes → salvar. Voltar preserva o rascunho.

#### [N00 · Conheça sua nova planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2845)

Monstera deliciosa · Costela-de-adão

- **Continuar** → N02.
- Foto da minha planta → N01.
- Voltar → P03 ou contexto registrado, conforme a regra abaixo.
- Cancelar cadastro → N07; continuar retorna ao passo em andamento.

**Regra:** Foto do catálogo como padrão. Nome obrigatório. Se vier da identificação, voltar retorna ao resultado.

**Cenários alternativos:**
- Cancelar cadastro → N07.

#### [N01 · Foto da sua planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2875)

Você pode usar a foto do catálogo ou uma foto sua.

- **Tirar foto** → I01.
- **Escolher da galeria** → I02.
- **Usar foto atual** → N00.
- Voltar → N00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Modo foto do cadastro: captura → revisão → usar foto → retorna N00/P05/D03; não inicia identificação.

#### [N02 · Onde ela vai ficar?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2899)

O ambiente ajuda a ajustar os cuidados.

- **Continuar** → N03.
- Voltar → N00 ou contexto registrado, conforme a regra abaixo.
- Cancelar cadastro → N07; continuar retorna ao passo em andamento.

**Regra:** Local e luz podem ser ajustados depois. “Ainda não sei” oferece orientação, sem inventar condição.

#### [N03 · Monte a rotina de cuidados](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2926)

Use a proposta como ponto de partida.

- **Continuar** → N05.
- Verificar substrato → N04.
- Adubação → N04.
- Voltar → N02 ou contexto registrado, conforme a regra abaixo.
- Cancelar cadastro → N07; continuar retorna ao passo em andamento.

**Regra:** Com espécie: proposta editável. Manual: definir cuidados sem recomendação automática. Não lembrar última rega é válido.

#### [N04 · Ajustar cuidado](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2958)

Defina uma rotina que faça sentido para sua planta.

- **Salvar ajuste** → N03.
- Voltar → N03 ou contexto registrado, conforme a regra abaixo.

**Regra:** Intervalo positivo; primeira data não pode ficar no passado. Mesma edição é usada em C07.

#### [N05 · Quer receber lembretes?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-2983)

Avisamos quando for hora de conferir sua planta.

- **Ativar lembretes** → N06.
- **Agora não** → N08.
- Voltar → N03 ou contexto registrado, conforme a regra abaixo.
- Cancelar cadastro → N07; continuar retorna ao passo em andamento.

**Regra:** Somente aqui solicitar permissão nativa. Negar mantém rotina salva com avisos internos.

**Cenários alternativos:**
- Permissão negada → N08.

#### [N06 · Ativar notificações](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3008)

Permita os alertas do PlantMe no aparelho.

- **Permitir** → N08.
- **Não permitir** → N08.
- Voltar → N05 ou contexto registrado, conforme a regra abaixo.

**Regra:** Diálogo nativo do sistema. Estado concedido/negado armazenado; não pedir a cada planta.

#### [N07 · Descartar este cadastro?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3031)

Sua planta ainda não foi salva.

- **Continuar cadastro** → N00.
- **Descartar cadastro** → P00.

**Regra:** Confirmação ao sair com alterações. Cancelar retorna ao passo em andamento, preservando os dados.

#### [N08 · Confira sua planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3050)

Está tudo pronto para começar.

- **Salvar planta** → N09.
- Rotina de cuidados → N03.
- Dados e ambiente → N02.
- Voltar → N05 ou contexto registrado, conforme a regra abaixo.
- Cancelar cadastro → N07; continuar retorna ao passo em andamento.

**Regra:** Criar planta somente ao salvar. Clique repetido não duplica cadastro. Falha mantém rascunho.

**Cenários alternativos:**
- Falha ao salvar → X03.

#### [N09 · Sua planta foi adicionada!](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3084)

Agora você pode acompanhar cada cuidado.

- **Ver minha planta** → D00.
- **Ir para o início** → H01.

**Regra:** Primeira planta → H01; próximas → H02. Confirmação pode ser um estado breve em vez de uma tela extra.

### 07 · Coleção e detalhes da planta

Lista, filtros, dados, guia e evolução. Editar, arquivar e remover têm consequências distintas.

#### [D01 · Minha coleção](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3184)

3 plantas crescendo com você.

- **Adicionar planta** → P00.
- chips → D05.
- plants → D00.
- Plantas arquivadas → D06.
- Navegação principal: aba Coleção; início, coleção e perfil consideram conta e existência de plantas.

**Cenários alternativos:**
- Coleção vazia → D02.
- Sem resultado → D05.

#### [D02 · Sua coleção começa aqui](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3232)

Adicione uma planta para acompanhar sua evolução.

- **Adicionar primeira planta** → P00.
- Navegação principal: aba Coleção; início, coleção e perfil consideram conta e existência de plantas.

**Regra:** Estado sem plantas. Conta opcional. Não confundir coleção vazia com falha de carregamento.

#### [D00 · Monstera](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3251)

Monstera deliciosa · Sala de estar

- **Registrar cuidado** → C01.
- Conferir substrato → C00.
- Histórico de cuidados → C09.
- Guia da espécie → P04.
- Fotos e evolução → D08.
- Opções da planta → D04.
- Voltar → D01 ou contexto registrado, conforme a regra abaixo.

**Regra:** Detalhe da planta da coleção. Fonte dos dados: cadastro e registros reais. Não diagnosticar automaticamente.

**Cenários alternativos:**
- Histórico vazio → C10.

#### [D03 · Editar minha planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3302)

Mantenha os dados da sua planta atualizados.

- **Salvar alterações** → D00.
- **Ajustar rotina** → C07.
- Trocar foto → N01.
- Corrigir espécie → P01.
- Voltar → D00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Edição não cria outra planta. Corrigir espécie pede revisão da rotina; histórico é preservado.

**Cenários alternativos:**
- Sair sem salvar → X05.

#### [D04 · Opções da planta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3340)

Monstera · Sua coleção

- **Voltar para a planta** → D00.
- Editar dados → D03.
- Editar rotina → C07.
- Arquivar planta → D07.
- Remover planta → D10.
- Voltar → D00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Pode ser apresentado como menu inferior; representado completo para explicitar todas as ações.

#### [D05 · Buscar na coleção](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3377)

Nenhum resultado para “Samambaia”.

- **Limpar busca e filtros** → D01.
- **Adicionar outra planta** → P00.
- Navegação principal: aba Coleção; início, coleção e perfil consideram conta e existência de plantas.

**Regra:** Chips filtram local, busca filtra nome/espécie. Filtros vazios não ocultam o CTA de adicionar.

#### [D06 · Plantas arquivadas](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3405)

Histórico guardado, cuidados pausados.

- **Voltar à coleção** → D01.
- Jiboia da varanda → D11.
- Voltar → D01 ou contexto registrado, conforme a regra abaixo.

**Regra:** Arquivadas não contam como tarefas pendentes e não geram notificações.

#### [D07 · Arquivar Monstera?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3431)

Os cuidados serão pausados e o histórico ficará guardado.

- **Arquivar planta** → D06.
- **Manter na coleção** → D00.

**Regra:** Arquivar interrompe lembretes sem apagar registros.

#### [D08 · Evolução da Monstera](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3450)

Um registro de cada etapa.

- **Adicionar foto e nota** → D09.
- 7 de outubro → D09.
- 30 de setembro → D09.
- Voltar → D00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Exemplo ilustrativo de dados. Timeline ordenada por data; estado vazio usa convite à primeira foto.

#### [D09 · Registrar evolução](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3481)

Guarde uma foto e uma observação.

- **Salvar registro** → D08.
- Adicionar foto → N01.
- Voltar → D08 ou contexto registrado, conforme a regra abaixo.

**Regra:** Foto obrigatória neste registro; nota opcional. Foto volta a esta origem; não altera imagem principal automaticamente.

**Cenários alternativos:**
- Falha ao salvar → X03.

#### [D10 · Remover esta planta?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3511)

Monstera e seu histórico serão apagados.

- **Manter planta** → D00.
- **Remover planta** → D01.
- **Arquivar em vez de remover** → D07.

**Regra:** Remover cancela lembretes. Se for a última planta, destino é D02. Confirmação não é só um ícone.

**Cenários alternativos:**
- Última planta removida → D02.

#### [D11 · Jiboia arquivada](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3535)

Você pode ver o histórico ou voltar a cuidar.

- **Restaurar e revisar rotina** → C07.
- **Remover definitivamente** → D10.
- Ver histórico → C09.
- Voltar → D06 ou contexto registrado, conforme a regra abaixo.

**Regra:** Restaurar requer nova próxima data; não disparar todos os lembretes antigos acumulados.

### 08 · Cuidados, agenda e histórico

Verificar → decidir → registrar ou adiar. Registro, edição e pausa atualizam a agenda.

#### [C00 · Conferir a Monstera](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3718)

Verificação de substrato · Hoje

- **Registrar cuidado** → C01.
- **Adiar verificação** → C03.
- **Ainda está úmido** → C04.
- Rotina atual → C07.
- Voltar → D00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Lembrete/push abre este cuidado. Planta arquivada ou removida → aviso e retorno à coleção.

#### [C01 · Registrar cuidado](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3747)

Monstera · Sala de estar

- **Salvar cuidado** → C02.
- Voltar → D00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Selecionar um tipo. Registrar cuidado real não é obrigatório para dispensar uma verificação. Proibir data futura.

**Cenários alternativos:**
- Falha no registro → X03.

#### [C02 · Cuidado registrado](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3778)

Sua rotina foi atualizada.

- **Voltar para a planta** → D00.
- **Ver cuidados de hoje** → C06.
- Ver histórico → C09.

**Regra:** Evento salvo atualiza histórico e próxima tarefa correspondente. Mostrar opção de corrigir pelo histórico.

#### [C03 · Adiar verificação](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3802)

Quando você quer conferir a Monstera?

- **Confirmar adiamento** → C05.
- Voltar → C00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Nova data futura obrigatória. Adiar muda só a tarefa atual, não a frequência geral.

#### [C04 · Ainda está úmido](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3826)

Tudo bem, você pode verificar novamente depois.

- **Salvar verificação** → C05.
- **Ajustar intervalo da rotina** → C07.
- Voltar → C00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Evento “verificação sem rega” no histórico. Próxima verificação editável; não marcar rega como feita.

#### [C05 · Verificação reagendada](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3850)

Você pode acompanhar a próxima data na agenda.

- **Voltar para a planta** → D00.
- **Ver agenda** → C06.

**Regra:** No caso de C04, também confirmar salvamento da verificação sem rega.

#### [C06 · Agenda de cuidados](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3869)

O que está previsto para suas plantas.

- Monstera · Verificar substrato → C00.
- Jiboia · Verificação adiada → C00.
- Espada · Limpar folhas → C00.
- Voltar → H02 ou contexto registrado, conforme a regra abaixo.

**Regra:** Hoje inclui pendentes e atrasados com rótulo. Não ordenar por urgência clínica. Aba concluídos abre histórico.

**Cenários alternativos:**
- Agenda vazia → H03.

#### [C07 · Rotina da Monstera](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3913)

Ajuste cuidados, intervalos e horários.

- **Adicionar cuidado** → C08.
- **Salvar rotina** → D00.
- Verificar substrato → C08.
- Adubação → C08.
- Limpeza de folhas → C08.
- Pausar todos os lembretes → C13.
- Voltar → D00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Editar não apaga registros. Se vier de restauração, salvar reativa a planta e define próxima data.

#### [C08 · Editar cuidado](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3953)

Monstera · Rotina personalizada

- **Salvar cuidado** → C07.
- **Remover da rotina** → C14.
- Voltar → C07 ou contexto registrado, conforme a regra abaixo.

**Regra:** Intervalo deve ser maior que zero. Para novo cuidado, não exibir “Remover”. Desativar mantém configuração.

#### [C09 · Histórico de cuidados](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-3979)

Monstera · Registros da sua rotina

- **Registrar outro cuidado** → C01.
- Rega · Hoje às 09:00 → C11.
- Verificação · 30 de setembro → C11.
- Voltar → D00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Dados de exemplo. Filtros não mudam a agenda. Histórico real ordenado do mais recente para o antigo.

**Cenários alternativos:**
- Nenhum registro → C10.

#### [C10 · Cada cuidado conta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4019)

Você ainda não registrou cuidados nesta planta.

- **Registrar primeiro cuidado** → C01.
- Voltar → D00 ou contexto registrado, conforme a regra abaixo.

#### [C11 · Detalhe do registro](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4039)

Monstera · Rega

- **Salvar correção** → C09.
- **Excluir registro** → C12.
- Voltar → C09 ou contexto registrado, conforme a regra abaixo.

**Regra:** Corrigir último cuidado recalcula próxima tarefa aplicável. Registros mais antigos não sobrescrevem o último.

#### [C12 · Excluir este registro?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4064)

Este cuidado será removido do histórico.

- **Manter registro** → C11.
- **Excluir registro** → C09.

**Regra:** Confirmação específica; excluir histórico não remove a planta.

#### [C13 · Pausar lembretes?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4083)

Sua planta continua na coleção.

- **Pausar lembretes** → C07.
- **Manter lembretes** → C07.

**Regra:** Pausa da rotina difere de arquivamento. Próximas tarefas pausadas têm rótulo e não geram push.

#### [C14 · Remover este cuidado?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4103)

A verificação recorrente deixará de aparecer na agenda.

- **Manter cuidado** → C08.
- **Remover da rotina** → C07.

**Regra:** Excluir a configuração cancela só as ocorrências futuras desse cuidado.

### 09 · Dicas, conteúdo e conquistas

Aprender com conteúdo editorial, salvar dicas e acompanhar progresso com critérios explícitos.

#### [L00 · Dicas para cultivar](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4248)

Aprenda no seu ritmo.

- Entenda a luz indireta → L02.
- Observe antes de regar → L02.
- Dicas salvas → L03.
- Navegação principal: aba Dicas; início, coleção e perfil consideram conta e existência de plantas.

**Regra:** Personalizar por nível e interesses. Não inventar diagnósticos ou prometer identificar doenças.

**Cenários alternativos:**
- Busca de conteúdo → L01.
- Falha ao carregar → X02.

#### [L01 · Buscar dicas](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4291)

Encontre uma orientação para sua rotina.

- **Limpar busca** → L00.
- Entenda a luz indireta → L02.
- Voltar → L00 ou contexto registrado, conforme a regra abaixo.

**Cenários alternativos:**
- Sem resultado → L04.

#### [L02 · Entenda a luz indireta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4318)

Guia para iniciantes · 3 min de leitura

- **Salvar dica** → L03.
- **Voltar às dicas** → L00.
- Aplicar na minha planta → D03.
- Voltar → L00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Texto demonstrativo, substituir por conteúdo editorial validado. Origem início, busca ou salvos define o retorno.

#### [L03 · Dicas salvas](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4347)

Para consultar quando precisar.

- **Explorar mais dicas** → L00.
- Entenda a luz indireta → L02.
- Voltar → L00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Salvar/desmarcar é imediato e reversível. Sem favoritos → convite para explorar.

#### [L04 · Não encontramos dicas](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4371)

Tente uma palavra mais simples.

- **Tentar outra busca** → L01.
- **Explorar categorias** → L00.
- Voltar → L01 ou contexto registrado, conforme a regra abaixo.

#### [L05 · Minhas conquistas](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4393)

Seu progresso, no seu ritmo.

- Primeira planta → L06.
- Primeiro cuidado → L06.
- Conhecendo minha planta → L06.
- Voltar → H02 ou contexto registrado, conforme a regra abaixo.

**Regra:** Conquistas não incentivam rega excessiva ou cuidado diário desnecessário. Critérios baseados em ações úteis.

#### [L06 · Primeiro cuidado](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4424)

Você deu o primeiro passo na sua rotina.

- **Voltar às conquistas** → L05.
- Continuar aprendendo → L00.
- Voltar → L05 ou contexto registrado, conforme a regra abaixo.

**Regra:** Estado bloqueado mostra critério; concluído mostra data. Nunca usar número inventado de plantas “salvas”.

### 10 · Perfil e preferências

Perfil autenticado e visitante; edição de dados, experiência, interesses, notificações e suporte.

#### [F00 · Meu perfil](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4525)

Anna · anna@email.com

- Editar perfil → F02.
- Preferências de cultivo → F03.
- Notificações → F05.
- Conquistas → L05.
- Ajuda e suporte → F07.
- Privacidade e termos → F09.
- Conta e segurança → S00.
- Navegação principal: aba Perfil; início, coleção e perfil consideram conta e existência de plantas.
- Sessão expirada → X06; entrar novamente retorna à origem.

**Regra:** Dados reais da conta. Coleção local é vinculada ao autenticar; não apagar sem confirmação.

#### [F01 · Seu perfil](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4572)

Você está usando o PlantMe como visitante.

- **Criar conta** → B01.
- **Já tenho uma conta** → B00.
- Preferências de cultivo → F03.
- Notificações → F05.
- Ajuda e suporte → F07.
- Privacidade e termos → F09.
- Navegação principal: aba Perfil; início, coleção e perfil consideram conta e existência de plantas.

**Regra:** Visitante não tem ação “Sair da conta”. Plantas locais permanecem ao criar conta.

#### [F02 · Editar perfil](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4610)

Como você quer aparecer no PlantMe?

- **Salvar perfil** → F00.
- Alterar foto → I02.
- Voltar → F00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Nome obrigatório. Foto opcional. Picker retorna ao perfil; não inicia identificação.

**Cenários alternativos:**
- Sair com alterações → X05.
- Falha ao salvar → X03.

#### [F03 · Preferências de cultivo](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4643)

Personalize as dicas para o seu momento.

- **Salvar preferências** → F00.
- Nível de experiência → F04.
- Meus interesses → F10.
- Voltar → F00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Mudar nível/interesses altera recomendações de conteúdo, não muda intervalos das plantas sem revisão.

#### [F04 · Seu nível de experiência](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4673)

Você pode mudar quando quiser.

- **Salvar nível** → F03.
- Voltar → F03 ou contexto registrado, conforme a regra abaixo.

#### [F10 · Meus interesses](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4695)

Escolha o que quer cultivar.

- **Salvar interesses** → F03.
- Voltar → F03 ou contexto registrado, conforme a regra abaixo.

**Regra:** Seleção múltipla; nenhuma escolha é válida. Sugestões gerais quando vazio.

#### [F05 · Notificações](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4721)

Você decide como receber os avisos.

- **Salvar preferências** → F00.
- Permissão no aparelho → F06.
- Voltar → F00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Permissão do sistema prevalece. Desativar push não exclui tarefas nem histórico. Horários por planta prevalecem sobre padrão.

**Cenários alternativos:**
- Permissão do sistema negada → F06.

#### [F06 · Avisos desativados no aparelho](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4753)

Sua rotina continua disponível no app.

- **Ver ajustes do aparelho** → X04.
- **Continuar sem avisos** → F05.
- Voltar → F05 ou contexto registrado, conforme a regra abaixo.

**Regra:** Não fingir que um toggle interno concede permissão nativa. Revalidar permissão ao retornar dos ajustes.

#### [F07 · Ajuda e suporte](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4775)

Como podemos ajudar?

- Como adicionar uma planta? → F08.
- Como funcionam os lembretes? → F08.
- Como guardar minha coleção? → F08.
- Enviar uma mensagem ao suporte → F11.
- Voltar → F00 ou contexto registrado, conforme a regra abaixo.

#### [F08 · Como funcionam os lembretes?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4809)

Ajuda do PlantMe

- **Voltar à ajuda** → F07.
- Gerenciar notificações → F05.
- Voltar → F07 ou contexto registrado, conforme a regra abaixo.

**Regra:** Cada pergunta usa a mesma estrutura de artigo com conteúdo correspondente; não repetir esta resposta em todas.

#### [F09 · Privacidade e informações](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4835)

Conheça como o PlantMe funciona.

- Política de privacidade → F12.
- Termos de uso → F13.
- Sobre o PlantMe → F14.
- Voltar → F00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Quando aberto do cadastro, voltar retorna a B01 preservando os campos.

#### [F11 · Falar com o suporte](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4866)

Conte o que aconteceu.

- **Enviar mensagem** → F15.
- Anexo · opcional → I02.
- Voltar → F07 ou contexto registrado, conforme a regra abaixo.

**Regra:** Envio real somente na implementação e após toque da pessoa. Não incluir senhas ou fotos da coleção automaticamente.

**Cenários alternativos:**
- Falha no envio → X03.

#### [F12 · Política de privacidade](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4897)

Leia antes de decidir sobre seus dados.

- **Voltar às informações** → F09.
- Voltar → F09 ou contexto registrado, conforme a regra abaixo.

**Regra:** Documento jurídico ainda precisa de conteúdo aprovado. Fluxo e hierarquia definidos; não tratado como política já válida.

#### [F13 · Termos de uso](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4920)

Informações sobre o serviço.

- **Voltar às informações** → F09.
- Voltar → F09 ou contexto registrado, conforme a regra abaixo.

**Regra:** Conteúdo jurídico pendente de redação/aprovação; não inventar direitos ou condições.

#### [F14 · Sobre o PlantMe](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4944)

Cuidar da sua planta ficou fácil.

- **Voltar** → F09.
- Voltar → F09 ou contexto registrado, conforme a regra abaixo.

#### [F15 · Mensagem enviada](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-4966)

O suporte vai responder pelo e-mail informado.

- **Voltar à ajuda** → F07.

**Regra:** Não prometer prazo de resposta sem definição operacional.

### 11 · Segurança, sair e excluir conta

Sair encerra a sessão; excluir apaga os dados da conta. Ações e consequências não se confundem.

#### [S00 · Conta e segurança](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5174)

Anna · anna@email.com

- Alterar senha → S01.
- Alterar e-mail → S03.
- Exportar meus dados → S05.
- Sair da conta → S06.
- Excluir minha conta → S08.
- Voltar → F00 ou contexto registrado, conforme a regra abaixo.

#### [S01 · Alterar senha](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5214)

Confirme sua senha atual para continuar.

- **Salvar nova senha** → S02.
- **Esqueci a senha atual** → B05.
- Voltar → S00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Atualização exige sessão recente ou reautenticação. Senhas diferentes → erro junto ao campo.

**Cenários alternativos:**
- Dados inválidos → B10.

#### [S02 · Senha alterada](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5243)

Sua conta foi atualizada.

- **Voltar à segurança** → S00.

**Regra:** Encerrar outras sessões; manter sessão atual conforme política de autenticação.

#### [S03 · Alterar e-mail](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5261)

Confirme sua identidade e o novo endereço.

- **Enviar código de confirmação** → S04.
- Voltar → S00 ou contexto registrado, conforme a regra abaixo.

**Regra:** E-mail atual continua válido até verificar o novo. E-mail em uso gera erro sem perda de sessão.

#### [S04 · Confirmar novo e-mail](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5283)

Enviamos um código para anna.novo@email.com.

- **Confirmar alteração** → S00.
- **Corrigir novo e-mail** → S03.
- Voltar → S03 ou contexto registrado, conforme a regra abaixo.

**Regra:** Código expira em 10 min. Reenvio no contexto desta troca; não voltar ao cadastro de conta.

**Cenários alternativos:**
- Código expirado → B12.

#### [S05 · Exportar meus dados](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5309)

Receba uma cópia das suas informações.

- **Solicitar exportação** → S12.
- Voltar → S00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Somente e-mail verificado. Processo assíncrono com confirmação, disponibilidade e expiração informadas.

#### [S06 · Sair da sua conta?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5332)

Sua coleção ficará salva na conta.

- **Continuar conectado** → F00.
- **Sair da conta** → S07.

**Regra:** Sair não exclui a conta. Limpar dados privados em cache e cancelar alertas locais desta sessão. Não reapresentar onboarding inteiro.

#### [S07 · Você saiu da conta](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5352)

Sua coleção continua salva.

- **Entrar novamente** → B00.
- **Explorar como visitante** → H00.

**Regra:** Novo visitante não vê coleção privada da conta anterior. A tela de entrada não mantém senha preenchida.

#### [S08 · Excluir minha conta?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5371)

Esta ação apagará sua conta e os dados vinculados.

- **Manter minha conta** → S00.
- **Continuar exclusão** → S09.
- Guardar uma cópia antes → S05.
- Voltar → S00 ou contexto registrado, conforme a regra abaixo.

**Regra:** Primeira confirmação informa consequências. Não executar exclusão apenas ao abrir esta tela.

#### [S09 · Confirmar exclusão](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5397)

Confirme sua identidade para apagar a conta.

- **Excluir definitivamente** → S10.
- **Cancelar** → S00.
- Voltar → S08 ou contexto registrado, conforme a regra abaixo.

**Regra:** Reautenticação e aceite obrigatórios. Após confirmação inicia exclusão; falha não mostra sucesso.

**Cenários alternativos:**
- Falha na exclusão → S11.

#### [S10 · Sua conta foi excluída](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5423)

O processo de exclusão foi concluído.

- **Voltar às boas-vindas** → A01.

**Regra:** Mostrar somente após confirmação real do backend. Se processo for assíncrono, informar pendência em vez de concluído.

#### [S11 · Não foi possível excluir](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5441)

Sua conta continua ativa.

- **Tentar novamente** → S09.
- **Voltar à segurança** → S00.

**Regra:** Preservar intenção, exigir identidade recente; não reenviar operação sem proteção contra duplicidade.

#### [S12 · Exportação solicitada](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5460)

Você receberá uma atualização no seu e-mail.

- **Voltar à segurança** → S00.

**Regra:** Distinguir pedido recebido de arquivo pronto. Notificação abre informação da exportação, não a coleção.

### 12 · Estados transversais e recuperação

Padrões aplicáveis à origem: carregamento, offline, falha, alterações não salvas e sessão expirada.

#### [X00 · Carregando suas plantas…](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5562)

Só mais um instante.

- **Ver conteúdo carregado** → D01.
- Voltar → H02 ou contexto registrado, conforme a regra abaixo.

**Regra:** Skeleton acompanha a estrutura final. Botão apenas para demonstrar o protótipo; avanço é automático.

**Cenários alternativos:**
- Falha → X02.

#### [X01 · Você está sem conexão](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5588)

Sua coleção salva neste aparelho continua disponível.

- **Tentar reconectar** → H02.
- **Ver minha coleção** → D01.
- Ver coleção disponível → D01.

**Regra:** Offline não equivale a logout. Escritas locais suportadas mostram pendência de sincronização; sem suporte, preservar rascunho.

**Cenários alternativos:**
- Sincronização pendente → X07.

#### [X02 · Não conseguimos carregar](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5615)

Tente novamente em alguns instantes.

- **Tentar novamente** → P01.
- **Voltar** → P00.

**Regra:** Componente reutilizável. Retentar repete só a operação que falhou; voltar retorna à origem, não sempre à busca.

#### [X03 · Não foi possível salvar](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5634)

Seus dados preenchidos continuam aqui.

- **Voltar ao formulário** → N08.
- **Tentar salvar novamente** → N09.

**Regra:** Destinos dependem da origem (cadastro, cuidado, edição ou suporte). Não duplicar operação em retentativas.

#### [X04 · Ajustes do aparelho](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5653)

Ative a permissão desejada para o PlantMe.

- **Voltar ao PlantMe** → F05.
- **Continuar sem permissão** → I00.

**Regra:** Na implementação abre Ajustes nativos. Retorno verifica a permissão e volta à origem; não é tela própria do produto.

#### [X05 · Sair sem salvar?](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5672)

Você tem alterações ainda não salvas.

- **Continuar editando** → D03.
- **Descartar alterações** → D00.

**Regra:** Aplicar somente com mudanças. Retornos correspondem ao formulário em andamento; não apagar dados já salvos.

#### [X06 · Sua sessão expirou](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5691)

Entre novamente para sincronizar sua coleção.

- **Entrar novamente** → B00.
- **Continuar como visitante** → S07.

**Regra:** Não descartar trabalho. Ao escolher visitante, ocultar dados privados da sessão anterior e explicar o retorno.

#### [X07 · Aguardando sincronização](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=163-5711)

Seu registro foi salvo neste aparelho.

- **Tentar sincronizar** → H02.
- **Voltar à coleção** → D01.

**Regra:** Só usar se houver gravação offline real. Antes de sair com pendências, sincronizar ou oferecer confirmação específica.
