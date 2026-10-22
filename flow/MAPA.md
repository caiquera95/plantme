# PlantMe — mapa de UX

Fluxo principal de uma conta nova: **Splash → Boas-vindas → Criar conta (Apple ou e-mail) → Nível de experiência → Interesses opcionais → Adicionar primeira planta → Identificar/buscar/cadastrar → Configurar ambiente e luz → Ajustar rotina → Plano criado → Convite de notificações → Início**. O caminho **Boas-vindas → Entrar** só vai direto ao Início quando aquela conta já concluiu a personalização. Se ela ficou pendente, o login retoma em **Nível de experiência**. Uma conta configurada sem plantas vai ao **Início vazio**.

O cadastro aparece **antes da personalização**, seguindo a referência do Headspace fornecida pelo usuário. As Boas-vindas explicam em uma frase o valor do PlantMe e oferecem Criar conta ou Entrar. A conta pode ser criada pela Apple ou por e-mail. Depois, a pessoa informa seu nível de experiência; interesses são opcionais. Não há carrossel promocional, resumo obrigatório, assinatura nem paywall. No cadastro por e-mail, a confirmação fica disponível em **Perfil → Configurações → Conta**, sem bloquear a primeira planta; essa decisão pressupõe que o produto permita o uso inicial com e-mail pendente. É possível adicionar a planta depois: a conta permanece criada e o Início mostra o estado vazio. Se aceitar notificações, a permissão do iOS é solicitada somente depois do plano criado. Câmera e localização também são pedidas após a ação que precisa delas.

## Decisões e fundamento

- **Criar conta antes de personalizar.** Este projeto usa a sequência observada nas capturas do Headspace: acesso primeiro, perguntas depois. As respostas ficam vinculadas à conta desde o começo. A conta vem antes da planta conforme a ordem do briefing; as Boas-vindas explicam seu benefício concreto. O cadastro rápido pela Apple reduz entrada de dados. [Apple — Managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts)
- **Chegar cedo à primeira planta.** A orientação da Apple é manter onboarding breve e adiar configurações não essenciais; a pesquisa da Nielsen Norman Group recomenda perguntar apenas o que personaliza a experiência inicial. Por isso, há só duas perguntas, interesses são opcionais e o resumo promocional foi retirado. [Apple — Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding) · [NN/g — Mobile-App Onboarding](https://www.nngroup.com/articles/mobile-app-onboarding/)
- **Não interromper o cuidado por uma confirmação secundária.** E-mail pendente é mostrado em Conta; o caminho principal segue para adicionar a primeira planta. Esta é uma decisão de produto a validar com autenticação e segurança, não uma exigência universal de design.
- **Pedir permissões em contexto.** A câmera aparece ao escolher tirar foto e os lembretes depois de ver o plano. [Apple — Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding)
- **Validar com pessoas.** Observar se elas entendem o benefício da conta, conseguem adicionar a primeira planta e chegam ao plano sem ajuda. Se conta não for obrigatória para salvar uma planta, testar uma variante com cadastro após o plano, como recomenda a orientação da Apple sobre adiar sign-in. [Apple — Managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts)

## Estrutura e classificação

| Seção | Telas | Tabs, estados e sobreposições |
| --- | --- | --- |
| 01 — Onboarding | Splash, Boas-vindas | A pessoa escolhe Criar conta ou Entrar. |
| 02 — Autenticação | Criar conta por Apple ou e-mail, Login, Recuperação de senha, Confirmação de e-mail posterior | Ambos os caminhos convergem na personalização quando ela está pendente; contas configuradas seguem ao Início. |
| 03 — Personalização e ativação | Experiência, Interesses, Adicionar primeira planta, Foto/galeria, Resultado, Busca, Configuração, Rotina, Plano criado | Interesses podem ser pulados; câmera é contextual; busca e cadastro manual são alternativas. |
| 04 — Experiência principal | Início, Minhas plantas, Busca/filtros, Adicionar planta, Detalhe da planta, Alertas | Detalhe usa tabs Visão geral, Cuidados e Histórico. |
| 05 — Cuidados | Central e Calendário | Central usa tabs Hoje, Atrasadas e Próximas. |
| 06 — Conteúdo | Dicas, Busca/filtros, Salvos, Tutorial | Busca, filtros e salvos são estados de conteúdo. |
| 07 — Comunidade | Feed, Busca, Publicação, Criar publicação | Confirmações de publicação e comentário são modais. |
| 08 — Perfil e configurações | Perfil, Estatísticas, Conquistas, Configurações, Conta, Notificações, Tema/idioma, Clima, Ajuda | Preferências de horário e clima são opcionais posteriores. |
| 09 — Estados e modais | Registro de cuidado, Sucesso, Solo úmido, Conquista, Permissões, Sair, Carregamento, Erro | Registrar cuidado é bottom sheet; sucesso e confirmação são modais. |

## Navegação e regras

- Barra inferior: **Início · Minhas plantas · Cuidados · Comunidade · Perfil**. Cada item ocupa 1/5 da largura de 375 pt; a área de toque tem pelo menos 44 pt.
- Adicionar planta parte de Minhas plantas. Identificação sugere espécies, mas a pessoa confirma a espécie antes de salvar. Se não reconhecer, pode buscar ou cadastrar manualmente.
- Ambiente e luz são perguntados para cada planta. A rotina sugerida pode ser ajustada antes de salvar. O convite para lembretes vem após o plano.
- Registrar cuidado abre uma folha inferior contextual. Confirmar rega adiciona registro ao histórico e atualiza a agenda. “A terra ainda está úmida” agenda nova verificação e não registra uma rega.
- A tela de detalhe mantém visão geral, cuidados e histórico como tabs. A Central organiza hoje, atrasadas e próximas; o calendário detalha datas.
- Fotos de plantas e Milo são apenas espaços reservados. Textos são exemplos editáveis; termos e política exigem conteúdo editorial aprovado antes do lançamento.
- Sair da conta encerra a sessão. A coleção vinculada à conta permanece para o próximo login.
- Em produção, o estado **personalização concluída** e a coleção devem ser carregados da conta autenticada. As variáveis do protótipo apenas demonstram esses desvios.

## Entrega

Abra a [página flow no Figma](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=337-981) para revisar os frames editáveis e o protótipo. Há cinco pontos de entrada: primeiro acesso, Início, Cuidados, Comunidade e Perfil.

Abra [index.html](index.html) em um navegador para percorrer também a versão local. A coluna lateral permite inspecionar cada tela e a visão geral agrupa as seções. [data.js](data.js) contém títulos, conteúdos e destinos. Execute `node check.js` nesta pasta para auditar IDs, ações e rotas. O Figma contém 70 telas e estados em 375 × 667, com visual em escala de cinza.
