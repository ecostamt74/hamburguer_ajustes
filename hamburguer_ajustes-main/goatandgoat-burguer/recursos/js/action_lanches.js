/*---------Comprar--------*/
const itensCarrinho = document.querySelector("#mostra_valor");
const NOMEBANCO = 'goatBurger2';
const NOMETABELA = 'produtos';
let qtd = 0; // Quantidade total de itens no carrinho
let valor = 0; // Valor total

let db;
const request = window.indexedDB.open(NOMEBANCO, 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore(NOMETABELA, { keyPath: "id", autoIncrement: true });
    objectStore.createIndex('nome', 'nome', { unique: false });
    objectStore.createIndex('valor', 'valor', { unique: false });
};

request.onsuccess = (event) => {
    db = event.target.result; // Atualizar referência db
};

request.onerror = (event) => {
    console.error("Erro ao abrir o banco de dados: ", event.target.error);
};

function comprar(q, v, h) {
    qtd += q;
    valor += v;

    itensCarrinho.textContent = String(qtd).padStart(2, '0'); // Atualiza o valor no carrinho
    console.log(`Quantidade: ${qtd}, Valor total: R$${valor}`);
    adicionarProduto(h, v);
}

function adicionarProduto(nome, valor) {
    const produtoEscolhido = { nome: nome, valor: valor };

    const transaction = db.transaction(NOMETABELA, 'readwrite');
    const loja = transaction.objectStore(NOMETABELA);

    const req = loja.add(produtoEscolhido);

    req.onsuccess = () => {
        console.log("Produto adicionado com sucesso.");
    };

    req.onerror = (event) => {
        console.error("Erro ao adicionar produto: ", event.target.error);
    };

    transaction.onerror = (event) => {
        console.log("Erro na transação: ", event);
    };
}
function listarProduto() {
  const rw = db.transaction(NOMETABELA, 'readonly'); // Criar a transação
  const loja = rw.objectStore(NOMETABELA); // Usar a transação correta

  loja.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
          const texto = `Lanche ${cursor.value.nome} = ${cursor.value.valor}`;
          criarParagrafoModal(texto);
          cursor.continue();
      } else {
          console.log("No more entries!");
      }
  };
}

function criarParagrafoModal(texto) {
    const conteinerPar = document.getElementById('modal_corpo');
    if (!conteinerPar) return; // Verifica se o container existe
    const novoPar = document.createElement('p');
    novoPar.textContent = texto;
    conteinerPar.appendChild(novoPar);
}

 function limparBanco() {
    const transaction = db.transaction(NOMETABELA, 'readwrite');
    const store = transaction.objectStore(NOMETABELA);
    
    const req = store.clear();
    req.onsuccess = () => {
        console.log("Store cleared");
    };
    
    req.onerror = (evt) => {
        console.error("Erro ao limpar o objeto: ", evt.target.errorCode);
    };
}

/* -------- Remove elemento  do id modal_corpo--------*/
function removerElemento() {
    const conteinerPar = document.getElementById('modal_corpo');
    if (!conteinerPar) return; // Verifica se o container existe
    while (conteinerPar.firstChild) {
        conteinerPar.removeChild(conteinerPar.firstChild);
    }
}
/*-------Fim Comprar-----*/
