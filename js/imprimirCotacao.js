const lista = document.querySelectorAll('[data-lista]');

function selecaoCotacao(nome, valor) {
    lista.forEach((listaItem) => {
        if (listaItem.id == nome) {
            imprimirCotacao(listaItem, nome, valor)
        }
    })
}

function imprimirCotacao(lista, nome, valor) {
    
    lista.innerHTML = ''
    const listaNomes = {
        "dolar": "dorales",
        "moeda": "moedas",
        "peso": "pesos"
    }

    for(let mult = 1; mult <= 1000; mult *=10) {
        const listaItem = document.createElement('li')
        listaItem.innerHTML = `${mult} ${mult == 1 ? nome : listaNomes[nome]}: R$${(valor * mult).toFixed(2)}`
        lista.appendChild(listaItem)
    }

}

export default selecaoCotacao;