/*---------comprar--------*/
const itensCarrinho = document.querySelector("#mostra_valor");
const NOMEBANCO = 'goatBurger2';
const NOMETABELA = 'produtos';
let qtd = 0; // Declarando 'qtd' dentro da função
let valor = 0; // Declarando 'valor' dentro da função

let db;
const request = window.indexedDB.open(NOMEBANCO, 1);

request.onupgradeneeded = (event) => {
    // Salvar a interface IDBDatabase
    db = event.target.result;
    console.log(db);
    // Criar um objectStore para este banco de dados
    const objectStore = db.createObjectStore(NOMETABELA, { keyPath: "id", autoIncrement: true });
    objectStore.createIndex('nome', 'nome', { unique: false });
    objectStore.createIndex('valor', 'valor', { unique: false });
};

request.onsuccess = (event) => { // Mover getObjectStore aqui
    db = event.target.result; // Atualizar referência db
};

function comprar(q, v, h) {

    qtd += q;
    valor += v;

    //console.log(qtd, valor, h, v);
    //console.log(`Quantidade: ${qtd}, Valor total: R$${valor}`);
    itensCarrinho.textContent = qtd < 10 ? "0" + qtd : qtd;

    adicionarProduto(h, v);

}

function adicionarProduto(nome, valor) {
    console.log(nome, valor);
    let produtoEscolhido = { nome: nome, valor: valor };

    const rw = db.transaction(NOMETABELA, 'readwrite'); // Use a instância db
    const loja = rw.objectStore(NOMETABELA);
    let req;
    try {
        req = loja.add(produtoEscolhido);
    } catch (e) {
        console.log(e);
    }

    rw.onerror = (event) => {
        console.log("erro", event);

    };

    rw.onsuccess = (event) => {
        console.log("sucesso", event);
       // listarProduto(loja);
    };
}

function listarProduto() {
  const rw = db.transaction(NOMETABELA, 'readonly'); // Use a instância db
  const loja = rw.objectStore(NOMETABELA);
    loja.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        console.log(`Lanche ${cursor.value.nome} = ${cursor.value.valor} ` );
        let  texto = `Lanche ${cursor.value.nome} = ${cursor.value.valor} `;
        criarParagrafoModal(texto)
        cursor.continue();
      } else {
        console.log("No more entries!");
      }
    };

  };

  function criarParagrafoModal(texto){
     let conteinerPar = document.getElementById('modal_corpo')
      let novoPar = document.createElement('p')
      novoPar.textContent = texto
      conteinerPar.appendChild(novoPar);
  }

  /*function limparBanco() {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
      displayActionSuccess("Store cleared");
      displayPubList(store);
    };
    req.onerror = function (evt) {
      console.error("clearObjectStore:", evt.target.errorCode);
      displayActionFailure(this.error);
    };
  }
  */

/*---------remove elementos do id modal_corpo-------*/
  function removerElemento(){
    let conteinerPar = document.getElementById('modal_corpo');
    const paragrafos = conteinerPar.querySelectorAll('p');
    for (let paragrafo of paragrafos) {
      conteinerPar.removeChild(paragrafo);
    }
  }



/*-------fim comprar-----*/