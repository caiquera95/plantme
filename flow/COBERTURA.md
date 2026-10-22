# Cobertura do pedido — 43 itens

Cada linha aponta para o estado do protótipo em [index.html](index.html). Tabs e sobreposições aparecem como estados separados na coluna lateral para facilitar a revisão do fluxo.

| Nº | Item solicitado | Estado(s) | Forma |
| ---: | --- | --- | --- |
| 1 | Splash | `splash` | Tela |
| 2 | Boas-vindas | `welcome` | Tela |
| 3 | Cuidados personalizados | `welcome` | Conteúdo integrado às boas-vindas |
| 4 | Nível de experiência | `experience` | Tela |
| 5 | Tipos de plantas e interesses | `interests` | Tela |
| 6 | Resumo do onboarding | `welcome`, `interests`, `first-plant` | Benefício nas Boas-vindas; transição direta para a primeira planta, sem tela extra |
| 7 | Criar conta | `signup`, `verify-email`, `email-resent` | Tela; confirmação posterior em Conta e estado de reenvio |
| 8 | Login | `login` | Tela |
| 9 | Esqueci minha senha | `forgot-password`, `reset-code`, `new-password` | Etapas |
| 10 | Adicionar primeira planta | `first-plant` | Tela |
| 11 | Identificação por foto/galeria | `identify`, `camera-permission`, `photo-review` | Tela, permissão e revisão |
| 12 | Resultado da identificação | `identify-result` | Tela |
| 13 | Busca por nome | `plant-search` | Tela |
| 14 | Configurar planta | `configure-plant`, `configure-routine`, `routine-adjust` | Etapas |
| 15 | Plano de cuidados criado | `plan-created` | Tela de resultado |
| 16 | Início | `home`, `home-empty` | Tela e estado vazio |
| 17 | Minhas plantas | `plants`, `plants-empty` | Aba principal e estado vazio |
| 18 | Busca/filtros da coleção | `collection-search` | Estado |
| 19 | Adicionar nova planta | `add-plant` | Tela |
| 20 | Detalhe — visão geral | `plant-detail` | Tab |
| 21 | Detalhe — cuidados | `plant-care` | Tab |
| 22 | Detalhe — histórico | `plant-history` | Tab |
| 23 | Registrar cuidado | `care-sheet` | Bottom sheet |
| 24 | Cuidado registrado | `care-success` | Modal |
| 25 | Central — hoje | `care-today` | Tab |
| 26 | Central — atrasadas | `care-late` | Tab |
| 27 | Central — próximas | `care-next` | Tab |
| 28 | Calendário | `calendar` | Tela |
| 29 | Dicas e cuidados | `tips` | Tela |
| 30 | Busca/filtros de conteúdos | `content-search` | Estado |
| 31 | Conteúdos salvos | `saved-content` | Estado |
| 32 | Detalhe do tutorial | `tutorial` | Tela |
| 33 | Alertas e notificações | `notifications` | Tela |
| 34 | Comunidade | `community`, `community-search` | Aba e busca |
| 35 | Detalhe de publicação | `post-detail` | Tela |
| 36 | Criar publicação | `create-post`, `post-success` | Tela e confirmação |
| 37 | Perfil | `profile` | Aba principal |
| 38 | Estatísticas | `statistics` | Tela |
| 39 | Conquistas | `achievements`, `achievement-modal` | Tela e modal |
| 40 | Configurações | `settings` | Tela |
| 41 | Conta | `account`, `edit-account`, `change-password`, `logout-confirm`, `logged-out` | Telas e confirmação |
| 42 | Preferências de notificações | `notification-settings` | Tela |
| 43 | Tema e idioma | `theme-language` | Tela |

Outros estados necessários para o fluxo: `notification-invite`, `notification-permission`, `care-postpone`, `post-comment-success`, `weather-preference`, `location-permission`, `privacy-help`, `privacy`, `terms`, `help`, `loading` e `error`.
