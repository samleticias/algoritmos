// Leia um numero X e, a seguir, leia e escreva uma lista de números com o término da lista ocorrendo
// quando a soma de dois números consecutivos da lista for igual a X.
import { get_number, print } from '../utils/io_utils.js'

function obter_soma_numeros(x) {
    let n1 = get_number('Digite um número da lista: ')
    let n2 = get_number('Digite um número da lista: ')
    
    while (n1 + n2 !== x) {
        n1 = n2
        n2 = get_number('Digite um número da lista: ')
    }
    
    return n1 + n2
}

function main() {
    const x = get_number('Digite um número: ')
    const soma = obter_soma_numeros(x)
    print(`A soma ${soma} é igual ao número X`)
}

main()
