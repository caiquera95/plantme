# PlantMe 2.0 — wireframe de alta fidelidade

Criado em 7 de outubro de 2026. [Abrir o wireframe no Figma](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=155-265).

125 telas e estados organizados em 12 jornadas, com layout mobile de 375 × 667, textos e hierarquia editáveis, componentes reutilizáveis e conexões de protótipo. As telas usam tons de cinza e ícones funcionais. As ilustrações decorativas foram removidas; as áreas funcionais de foto usam espaços reservados identificados. Os estilos Mobile em Inter e ações em Manrope formam a base de tipografia; Nunito aparece na marca. A identidade visual completa fica para as telas finais de UI.

## Como revisar

1. Abra a página **wireframe** e comece pelo índice das jornadas.
2. Use os seis pontos de entrada do protótipo ou selecione uma tela específica para iniciar nela.
3. Leia as regras abaixo de cada tela: destinos, validação, retorno e efeitos sobre os dados.
4. Para revisar erros e alternativas, use os links de cenário no canvas ou inicie o protótipo diretamente no estado correspondente.
5. Ao finalizar o UI, mantenha essas regras e transforme os padrões repetidos em componentes finais. Aplique a paleta da marca, as fotos e o mascote somente nesta etapa de UI.

Os formulários, seletores e conteúdos usam dados de exemplo. O protótipo demonstra a navegação; não executa autenticação, câmera, reconhecimento, envio de mensagens, exportação, clima ou exclusão real. Serviços externos, persistência offline e textos editoriais/jurídicos precisam ser implementados ou aprovados.

## Jornadas cobertas

| Jornada | Telas/estados | Objetivo |
| --- | ---: | --- |
| 01 · Entrada e onboarding | 5 | Primeiro acesso → personalização → primeira planta. Conta e permissões ficam no contexto de uso. |
| 02 · Conta e recuperação de acesso | 13 | Acesso por e-mail. Retorno à ação original após autenticação; dados do visitante são preservados. |
| 03 · Início, notificações e clima | 9 | Estados sem planta, primeira planta e coleção. A rotina é o centro do início. |
| 04 · Adicionar por busca ou manualmente | 7 | Três entradas: buscar, identificar e cadastro manual. Seleção da espécie precede personalização. |
| 05 · Identificação e permissões | 10 | Foto → revisão → análise → sugestões com confirmação humana. Busca e manual sempre disponíveis. |
| 06 · Personalização e primeira rotina | 10 | Nome e foto → ambiente → rotina → lembretes → salvar. Voltar preserva o rascunho. |
| 07 · Coleção e detalhes da planta | 12 | Lista, filtros, dados, guia e evolução. Editar, arquivar e remover têm consequências distintas. |
| 08 · Cuidados, agenda e histórico | 15 | Verificar → decidir → registrar ou adiar. Registro, edição e pausa atualizam a agenda. |
| 09 · Dicas, conteúdo e conquistas | 7 | Aprender com conteúdo editorial, salvar dicas e acompanhar progresso com critérios explícitos. |
| 10 · Perfil e preferências | 16 | Perfil autenticado e visitante; edição de dados, experiência, interesses, notificações e suporte. |
| 11 · Segurança, sair e excluir conta | 13 | Sair encerra a sessão; excluir apaga os dados da conta. Ações e consequências não se confundem. |
| 12 · Estados transversais e recuperação | 8 | Padrões aplicáveis à origem: carregamento, offline, falha, alterações não salvas e sessão expirada. |

## Decisões de navegação

- **Conta opcional:** começar como visitante, cadastrar plantas e criar conta depois preservando os dados locais.
- **Navegação:** Início, Coleção, ação central de adicionar planta, Dicas e Perfil.
- **Cadastro:** buscar, identificar ou adicionar manualmente; dados da planta só são criados após confirmar o salvamento.
- **Permissões no contexto:** câmera ao fotografar; notificações ao ativar lembretes; localização ao pedir clima local. Negar não bloqueia os demais caminhos.
- **Fotos:** anexar foto ao perfil/planta/suporte retorna ao formulário de origem. Esse caminho não dispara identificação.
- **Cuidados:** verificar antes de regar; registrar cuidado, adiar ou registrar verificação sem rega são ações diferentes.
- **Rotina:** adiar altera a tarefa atual; editar intervalo altera a recorrência; pausar interrompe alertas; arquivar preserva o histórico.
- **Remoção:** apagar planta, apagar registro e excluir conta têm confirmações separadas e consequências explícitas.
- **Sair:** encerra a sessão e oculta dados privados neste aparelho; a coleção da conta continua salva.
- **Erros:** dados válidos e rascunhos permanecem; retentar repete a operação correspondente sem duplicar gravações.
- **Retornos compartilhados:** formulários de foto, recuperação, ajustes nativos e erros retornam ao contexto que os chamou.
- **Onboarding concluído:** visitantes recorrentes não repetem a apresentação; a splash considera sessão e existência de plantas.

## Verificação realizada

A auditoria confirmou 125 telas de 375 × 667 em 12 seções, 1.378 textos editáveis e 475 instâncias de componentes. A versão atual tem 22 espaços reservados para fotos, 18 imagens decorativas removidas e nenhum preenchimento de imagem ou cor fora da escala de cinza. Nenhum destino referenciado estava ausente; não foram encontrados textos colapsados, transbordamento de texto ou sobreposição entre jornadas. As fontes renderizadas são Inter, Nunito e Manrope.

A verificação é estrutural e visual; testes de usabilidade e validação editorial continuam necessários quando o produto for implementado.

## Arquivos desta pasta

- **fluxos.md:** mapa completo das telas, ações e regras.
- **inventory.json:** inventário estruturado de telas e estados.
- **figma-state.json:** IDs de telas, componentes, variáveis e conexões para continuidade.
- **validation.json:** auditoria da versão inicial.
- **monochrome-validation.json:** auditoria da versão atual em tons de cinza.
- **monochrome.js:** transformação do wireframe para tons de cinza e espaços reservados.
- **monochrome-*.json:** paleta e registro das alterações desta revisão.
- **build_inventory.py** e arquivos JavaScript: fontes da construção.
- **figma-*.json:** registro das fases e IDs criados ou modificados.
