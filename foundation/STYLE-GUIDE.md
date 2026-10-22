# PlantMe / Style Guide

[Abrir no Figma](https://www.figma.com/design/l6fOEzCk3migCg7NOUlNRl/PlantMe-2.0?node-id=203-230)

Página criada: Style Guide. Pranchas lado a lado inspiradas na organização do SkinBoost, com conteúdo e valores próprios do PlantMe.

- Identidade e princípios: assinatura original, fotografia existente e arquitetura Primitive → Semantic → interface.
- Cores primitivas: as 35 cores, organizadas em Green, Neutral, Blue, Amber e Red.
- Cores semânticas: 34 tokens com pares Light/Dark, amostras, HEX resolvidos e aliases reais.
- Tipografia: os 10 Text Styles em Inter, pesos, tamanhos, line heights e letter spacing.
- Espaço e forma: 13 Primitive Space, 10 Semantic Space, 7 Primitive Radius e 4 Semantic Radius, além de exemplos de screenInset e section.
- Opacidade e elevação: 3 opacidades, matriz Neutral e os Effect Styles raised, floating e overlay.
- Light e Dark na prática: exemplos com Semantic Tokens, Text Styles e Effect Styles.

Validação final: 1.236 camadas descendentes editáveis; 7 pranchas; todos os 48 semânticos representados por vínculos; 10 estilos de texto e 3 de efeito aplicados; nenhum conteúdo fora dos limites dos pais. As três imagens são fotografias discretas reutilizadas do arquivo, não capturas de interfaces. Inter para documentação/interface; Nunito Black preservado em duas cópias da assinatura original.

As 58 variáveis Primitive e 48 Semantic permanecem existentes e sem alterações. Não foram criados Component Tokens nem definições de grid/breakpoints ausentes na Foundation.

Limitação observada: o vínculo nativo de opacity do Figma interpreta números como percentuais. Os tokens do JSON usam fração: 0.4, 0.64 e 1. As 39 amostras de opacidade usam literals equivalentes para renderizar 40%, 64% e 100%, sem modificar a fonte. Essa representação está explicada no próprio guia.

Os IDs e a evidência da validação estão em style-guide-state.json.
