// Enem Utils
import { get_positive_number, print } from './util/my_entsai_utils.js'
import { get_size } from './util/my_vetores_utils.js'
import { question } from 'readline-sync'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { mapear } from './util/my_refactor_utils.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Top 10 Escolas com Melhor Crescimento em Nota do ENEM
// Descrição: Lista as 10 escolas com maior crescimento nas notas do ENEM em um período específico.

// Top 5 Escolas por Área em Cada Estado
// Descrição: Lista as 5 melhores escolas em uma área específica para cada estado.

// funcao para exibir opcoes do menu principal
export function menu_enem(){
    const opcoes = [
        '-----------------------------------------------------------',
        '|==================== ENEM POR ESCOLA ====================|',
        '-----------------------------------------------------------',
        '1 - Top N Escolas Brasil (todas as áreas)',
        '2 - Melhor Escola por Estado',
        '3 - Ranking ENEM por Estado',
        '4 - Top N Escolas por Área',
        '5 - Top N Escolas por Estado e Rede',
        '6 - Média Nacional por Área',
        '7 - Melhor Escola por Área e Estado',
        '8 - Listas de Escolas por Estado Ordenada por Renda',
        '9 - Ranking ENEM por Região do País',
        '10 - Busca Escola Específica por Parte do Nome',
        '11 - Top 10 Escolas com Melhor Crescimento em Nota do ENEM',
        '12 - Top 5 Escolas por Área em Cada Estado',
        '0 - Sair',
        '-----------------------------------------------------------',
    ]
    return opcoes
}

// funcao para exibir opcoes do menu
export function get_opcoes(opcoes, label = 'Escolha uma das opções a seguir:'){
    print(label)
    for (let i = 0; i < get_size(opcoes); i++){
        print(`> ${opcoes[i]}`)
    }
    let opcao_escolhida = Number(question('Digite o número da opção desejada:\n'))
    return opcao_escolhida
}

// funcao para confgurar atributos de escola
function configurar_escola(codigo, nome, cidade, estado, tipo, renda, nivel, media_obj, nota_linguagens, nota_matematica,
    nota_naturezas, nota_humanas, nota_redacao
) {
    return {
        codigo,
        nome,
        cidade,
        estado,
        tipo,
        renda,
        nivel,
        media_obj, 
        nota_linguagens, 
        nota_matematica,
        nota_naturezas, 
        nota_humanas, 
        nota_redacao
    }
}

// funcao para inicializar escolas
export function inicializa_escolas() {
    const caminho_arquivo = path.resolve(__dirname, 'enem2014_nota_por_escola.txt')
    const data = fs.readFileSync(caminho_arquivo, 'utf8')

    return data
        .split('\n')
        .filter(linha => linha.trim())
        .map(linha => {
            const [codigo, nome, cidade, estado, tipo, renda, nivel, media_obj, nota_linguagens, nota_matematica,
                nota_naturezas, nota_humanas, nota_redacao] = linha.split(';')

            return configurar_escola(codigo, nome, cidade, estado, tipo, renda, nivel, media_obj, nota_linguagens, nota_matematica,
                nota_naturezas, nota_humanas, nota_redacao)
        })
}

// funcao para exibir dados das escolas
export function mostrar_escolas(escolas) {
    for (let escola of escolas) {
        let media_formatada = parseFloat(escola.media_obj.replace(',', '.'))
        const e = `
        Escola: ${escola.nome}
        | Código: ${escola.codigo}
        | Cidade: ${escola.cidade}
        | Estado: ${escola.estado}
        | Tipo: ${escola.tipo}
        | Nível: ${escola.nivel}
        | Média: ${media_formatada}\n`
        print(e)
    }
}

// funcao para exibir melhor escola por estado
export function mostrar_melhor_escola_por_estado(escolas, label='\n>>> Melhor Escola por Estado <<<\n'){
    print(label)
    for (let escola of escolas){
        let media_formatada = parseFloat(escola.media_obj.replace(',', '.'))
        const e =
        `\n> Escola: ${escola.nome} | Estado: ${escola.estado} | Nota Final: ${media_formatada.toFixed(2)}\n`
        print(e)
    }
}

// funcao para obter indice dos estados
export function obter_indice_estados(escolas) {
    const estados = obter_estados(escolas)

    print('\nEscolha um dos estados a seguir:')
    for (let i = 0; i < get_size(estados); i++) {
        print(`${i} - ${estados[i]}`)
    }
    print('----------------------------------')

    let indice = get_positive_number(('> '))
    if (indice < 0 || indice >= get_size(estados)) {
        return obter_indice_estados(escolas)
    }
    return indice
}

// funcao para obter estados sem repeticao
export function obter_estados(escolas) {
    const estados = []
    const estados_map = {}
    
    for (let i = 0; i < get_size(escolas); i++) {
        let estado = escolas[i].estado
        if (!estados_map[estado]) {
            estados_map[estado] = true
            estados.push(estado)
        }
    }
    return estados
}




