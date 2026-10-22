# PlantMe — Foundation implementada

Arquivo: [PlantMe 2.0](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=2-2). Data: 07/10/2026.

## Criado

- **01 Primitive**: 58 variables de color, space, radius e opacity, com nomes e valores do JSON.
- **02 Semantic**: 48 variables, modes Light e Dark. Os 96 valores são aliases para Primitive; spacing tem o mesmo alias nos dois modes.
- **10 Text Styles** em Inter: Display/Large; Heading/Large, Medium e Small; Body/Large, Medium e Small; Label/Large, Medium e Small.
- **3 Effect Styles**: raised, floating e overlay, com cor, alpha, offset, blur e spread do JSON.
- Escopos específicos e sintaxe WEB derivada dos caminhos dos tokens. Nenhum Component Token criado.

## Aplicado às telas

Revisadas UI (2.335 nós), wireframe (4.736 nós) e Ícones (180 nós). Contagem final de propriedades vinculadas à Foundation:

| Página | Cor | Propriedades numéricas |
|---|---:|---:|
| ui design | 58 | 435 |
| wireframe | 165 | 5.310 |
| Ícones | 0 | 117 |

As contagens incluem vínculos herdados de componentes. A migração usou apenas valores exatos e intenção confirmada. Para espaçamentos sem função semântica correspondente no JSON, usou-se a escala Primitive com valor exato. Radius semântico foi aplicado quando função e valor coincidiam.

Nenhum Text Style ou Effect Style novo foi aplicado às telas: os valores existentes não tinham equivalência exata. Os estilos estão criados e disponíveis para adoção posterior.

## Exceções

[exceptions.json](exceptions.json) registra todas as **506 categorias** observadas, com propriedade, valor, motivo, quantidade e exemplos de node IDs. Registra também fundos de frames de ícones preservados por intenção ambígua.

Exemplos: marca #145C30, #1C3E18 e #548427 difere de #236327; texto #0E160E difere de #0C1916; wireframe usa #333333, #616161 e #1A1A1A; gaps de 10px e radius de 14px não pertencem à escala. Styles Mobile usam tamanhos, line heights ou tracking diferentes.

Fontes indisponíveis na UI: Satoshi Black, Satoshi Bold, Satoshi Variable Black e SF Pro Text Medium. Esses nós foram preservados.

## Validação

JSON válido, sem referências quebradas. Light e Dark têm estrutura idêntica. Os 58 valores primitivos e 96 aliases foram conferidos contra a fonte. Scopes e sintaxe WEB conferidos.

Figma representa opacity 0.4 e 0.64 com precisão binária; a tolerância de verificação foi 0.000001. O JSON não foi alterado.

Action, feedback e care status continuam separados. A migração conferiu quantidade de nós, parents, posições, dimensões e textos, sem alterações. Capturas finais da UI e do onboarding do wireframe foram revisadas visualmente.

## Decisões pendentes

**A Foundation está concluída; a adoção integral pelas telas depende de revisão das exceções.** É preciso decidir se os valores atuais de marca, tipografia, radius e espaçamento serão substituídos ou incorporados numa revisão dos tokens.

Light e Dark estão configurados na Foundation. As telas ainda têm valores locais e não estão totalmente prontas para alternar de tema. Coleções e estilos antigos foram preservados para manter seus usos existentes.

[implementation-state.json](implementation-state.json) contém IDs criados e nós alterados. [validation.json](validation.json) registra a verificação final. [plantme-foundation.tokens.json](plantme-foundation.tokens.json) é uma cópia local da fonte, sem alterações semânticas.

