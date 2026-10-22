# PlantMe — Ícones v2

22 SVGs originais: 11 símbolos, cada um em estado normal e selecionado. Desenhados manualmente por paths, sem dependência de bibliotecas externas.

## Arquivos
- `svg/`: ícones individuais, 24 × 24.
- `prancha-comparativa.svg`: apresentação vetorial com aplicação na tela Início.
- `inicio-aplicacao.svg`: recomposição da referência 06, em 390 × 844.
- `index.html`: comparação interativa de tamanhos (20, 24, 32 e 48 px) e contraste.

## Construção e uso
Grade: 24 unidades. Traço: 1,8. Pontas e junções arredondadas. Cor padrão: #214F38. Cor principal via currentColor; para usar CSS, inserir o SVG inline e remover/substituir o atributo color da raiz. Os recortes claros das versões preenchidas usam #FAF8F2: ao mudar a paleta, ajustar também essa cor para preservar contraste. Alvo interativo mínimo de 44 × 44 pt, independente do tamanho do desenho.

Selecionado = preenchimento de silhueta; manter o rótulo e usar aria-current na aba ativa. Os ícones de cuidados podem usar selecionado em controles de escolha, sem implicar que uma tarefa foi concluída. Status da planta representa saudável; outras condições precisam de símbolos e rótulos próprios. Não inferir saúde clínica da planta com base apenas em tarefas registradas.

Navegação: Início (casa), Minhas plantas (vaso com duas folhas), Cuidados (prancheta marcada), Comunidade (balão de conversa), Perfil (pessoa). Cuidados: Rega (gota), Adubação (saco de adubo com broto), Luz (sol), Poda (tesoura), Lembrete (sino), Status (folha com check).

A tela aplicada é uma proposta estática baseada na composição fornecida, e não uma implementação funcional do aplicativo. Fotografias vêm da prancha do usuário, usada apenas como referência visual nesta entrega. Aprovação visual e teste com usuários ainda não realizados.
