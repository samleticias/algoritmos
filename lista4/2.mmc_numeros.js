// Leia 2 (dois) números, calcule e escreva o mmc (mínimo múltiplo comum) entre os números lidos.
import { get_number, print } from '../utils/io_utils.js'

function main(){
    // 1 . Estado anterior
    const n1 = get_number('Digite o primeiro número: ')
    const n2 = get_number('Digite o segundo número: ')

    const mmc = calcular_mmc(n1, n2) // 3. Trabalho
    print(`O MMC de ${n1} e ${n2} é: ${mmc}`)

}

function calcular_mmc(n1, n2){ // 4. Convergenc. de dados
    return (n1 * n2) / calcular_mdc(n1, n2)
}

function calcular_mdc(n1, n2) {
    while (n2 !== 0) { // 2. Expressão de continuidade
        let temp = n2
        n2 = n1 % n2
        n1 = temp
    }
    return n1
}

main()
