let listaDeItens = []
let itemAEditar

const form = document.getElementById("form-itens")                     // formulario
const itensInput = document.getElementById("receber-item")             // input
const ulItens = document.getElementById("lista-de-itens")              // lista de itens
const ulItensComprados = document.getElementById("itens-comprados")    // lista de itens comprados

// adiciona um evento quando clica no submit
form.addEventListener("submit", function(evento) {
    evento.preventDefault()
    salvarItem()
    mostrarItem()
})

// salva os itens na tela / verifica se o item é duplicado / envia os itens pra lista
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

    itensInput.value = ''

    console.log(listaDeItens)
}

// mostra os itens na tela
function mostrarItem() {
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''

    listaDeItens.forEach((elemento, index) => {
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


    // Pega todos os objetos e decide qual vai checar atraves do click
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach(i => { 
        i.addEventListener('click', (evento) => {
            // pega o valor de cada elemento
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            // marca como checked o elemento pelo valor do elemento
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItem()
        })
    })

    // Pega todos os objetos e decide qual vai deletar atraves do click
    const deletarObjetos = document.querySelectorAll(".deletar")

    deletarObjetos.forEach(i => { 
        i.addEventListener('click', (evento) => {
            // pega o valor de cada elemento
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            // deleta objetos
            listaDeItens.splice(valorDoElemento, 1)
            mostrarItem()
        })
    })

    // Pega todos os objetos e decide qual vai editar atraves do click 
    const editarItens = document.querySelectorAll(".editar")

    editarItens.forEach(i => { 
        i.addEventListener('click', (evento) => {
            // pega o valor de cada elemento
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem()
        })
    })

}

function salvarEdicao() {
    const itemEditado = document.querySelectorAll(`[data-value="${itemAEditar}] input[type="text"]`)
    console.log(itemEditado.value)
}
