let listaDeItens = []
let itemAEditar

const form = document.getElementById("form-itens")                     // formulario
const itensInput = document.getElementById("receber-item")             // input
const ulItens = document.getElementById("lista-de-itens")              // lista de itens
const ulItensComprados = document.getElementById("itens-comprados")    // lista de itens comprados

// Adiciona um evento no formulario quando clicar no submit
form.addEventListener("submit", function(evento) {
    evento.preventDefault()
    salvarItem()
    mostrarItem()
})

// Salva o valor na variavel / verifica se o valor é duplicado / envia o objeto pra lista
function salvarItem() {
    const comprasItem = itensInput.value.toLowerCase()
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase())

    if(checarDuplicado) {
        alert("item já existe")

    } else {
    listaDeItens.push({
        checar: false,
        valor: comprasItem
    })
}
    // Limpa o campo
    itensInput.value = ''

    console.log(listaDeItens)
}

// Mostra os objeto na tela
function mostrarItem() {
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''

    // Para cada objeto da lista
    listaDeItens.forEach((elemento, index) => {
        // Se o checar do objeto da lista estiver checado crie este html na "ul"
        if(elemento.checar) {
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${elemento.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        // Senão crie este html na "ul"
        } else {
            ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${elemento.valor}"></input>
                </div>
                <div>
                    <button onclick="salvarEdicao()">
                        <i class="fa-regular fa-floppy-disk is-clickable"></i>
                    </button>
                    <i class="fa-regular is-clickable fa-pen-to-square editar"></i>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        }
    })


    // Seleciona todos os checkbox
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    // Para cada checkbox adicione um evento de click
    inputsCheck.forEach(i => { 
        i.addEventListener('click', (evento) => {
            // seleciona o indice
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            // muda o valor false/true no objeto da lista atraves do click no checkbox
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItem()
        })
    })

    // Seleciona todos os objetos que tem a classe deletar
    const deletarObjetos = document.querySelectorAll(".deletar")

    // Para cada objeto que tem a classe deletar adicione um evento de click
    deletarObjetos.forEach(i => { 
        i.addEventListener('click', (evento) => {
            // seleciona o indice
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            // deleta o objeto do indice selecionado atraves do click
            listaDeItens.splice(valorDoElemento, 1)
            mostrarItem()
        })
    })

    // Seleciona todos os objetos que tem a classe editar
    const editarItens = document.querySelectorAll(".editar")

    // Para cada objeto que tem a classe editar adicione um evento de click
    editarItens.forEach(i => { 
        i.addEventListener('click', (evento) => {
            // seleciona o indice e armazena na variavel itemAEditar atraves do click
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem()
        })
    })

}

// salvar edição
function salvarEdicao() {
    // Seleciona o indice armazenada na variavel itemAEditar e seleciona o texto do input e armazena na variavel itemEditado
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}] input[type="text"]`)
    // Seleciona o valor do itemEditado e armazena na --> listaDeItens no indice do itemAEditar
    listaDeItens[itemAEditar].valor = itemEditado.value
    itemAEditar = -1
    mostrarItem()

}
