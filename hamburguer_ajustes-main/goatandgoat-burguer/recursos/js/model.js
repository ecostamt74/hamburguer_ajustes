
class IndexedDB {
    constructor(nomeDoBanco, versao) {
      this.nomeDoBanco = nomeDoBanco;
      this.versao = versao;
  
      // Abre a conexão com o IndexedDB de forma assíncrona
      const requisicao = indexedDB.open(this.nomeDoBanco, this.versao);
  
      requisicao.onupgradeneeded = (evento) => {
        const db = evento.target.result;
        // Crie object stores aqui (se necessário)
        db.createObjectStore('produtos', { keyPath: 'id' }); // Exemplo
      };
  
      requisicao.onsuccess = (evento) => {
        this.db = evento.target.result;
      };
  
      requisicao.onerror = (evento) => {
        console.error('Erro ao abrir o IndexedDB:', evento.target.error);
      };
    }
  
    insertProduto(produto, valor) {
        console.log(produto,valor);
        if (!this.db) {
          throw new Error('Conexão com o IndexedDB não estabelecida');
        }
      
        const transacao = this.db.transaction('produtos', 'readwrite');
        const objectStore = transacao.objectStore('produtos');
        console.log(produto,valor);
        objectStore.add({ nome: produto, valor: valor });
      }
  }