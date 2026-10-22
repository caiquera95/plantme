# PlantMe — flow

Wireframes básicos navegáveis para revisar arquitetura, conteúdo, estados e destinos antes do UI design final.

- [Abrir a página flow no Figma](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=337-981)
- [Abrir protótipo local](index.html)
- [Mapa do fluxo e regras](MAPA.md)
- [Cobertura dos 43 itens](COBERTURA.md)
- [Continuação em UI do cadastro da Jiboia](UI_JIBOIA.md)
- `data.js`: inventário de telas, conteúdo e rotas
- `check.js`: auditoria automática das ligações

Use o menu à esquerda para escolher uma tela ou comece pelo Splash. As caixas de imagem e Milo são placeholders. A interface usa apenas tons neutros e uma área iOS de **375 × 667 pt**. Os controles interativos têm pelo menos 44 pt de altura.

No Figma, são **70 telas e estados em 9 seções**. Há cinco pontos de entrada no protótipo: primeiro acesso, Início, Cuidados, Comunidade e Perfil. A ordem inicial é **01 Onboarding (Splash e Boas-vindas) → 02 Autenticação (Criar conta ou Entrar) → 03 Personalização e ativação (Experiência, Interesses e primeira planta)**. Criar conta leva à Experiência; entrar retoma a Experiência se ela estiver pendente e leva ao Início ou Início vazio se já estiver concluída. Não há telas de assinatura ou promoção. A confirmação do e-mail pode ser feita depois em Conta. `figma-state.json` guarda os IDs das telas e das rotas para continuidade.

O protótipo ilustra a navegação; inputs e seleções mostram a estrutura e não gravam dados. Autenticação, permissões, câmera, identificação e publicações estão representadas por estados simulados.
