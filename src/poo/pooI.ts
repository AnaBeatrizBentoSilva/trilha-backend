export type Produto = {
  nome: string;
  valor: number;
};

// class Estabelecimento {
//   private endereco: string;
//   private setor: string;
//   private produtos: Produto[];
//   constructor(endereco: string, setor: string, produtos: Produto[]) {
//     this.endereco = endereco;
//     this.setor = setor;
//     this.produtos = produtos;
//   }
// }

class EstabelecimentoBase {
  private _filaDeEspera = 10;

  constructor(
    public endereco: string,
    public setor: string,
    private produtos: Produto[],
    filaDeEspera?: number
  ) {
    this.filaDeEspera = filaDeEspera ?? this._filaDeEspera;
  }

  retornaNomeDosProdutos() {
    return this.produtos.map((produto) => produto.nome);
  }

  get filaDeEspera() {
    return this._filaDeEspera;
  }

  set filaDeEspera(fila: number) {
    if (fila <= 0) {
      return;
    }
    this._filaDeEspera = fila;
  }

  diminuiFilaDeEspera() {
    if (this._filaDeEspera === 0) {
      return;
    }
    this._filaDeEspera -= 1;
  }
}

const padaria = {
  endereco: "Rua dos Laranjais, 1320 - bloco D",
  setor: "alimentação",
  produtos: [
    { nome: "Pão", valor: 0.8 },
    { nome: "Arroz", valor: 10 },
    { nome: "Leite", valor: 5 },
    { nome: "Brigadeiro", valor: 1.5 },
    { nome: "Carne Moída", valor: 20 },
  ],
  retornaNomeDosProdutos() {
    // return padaria.produtos.map(produto => produto.nome)
    return this.produtos.map((produto) => produto.nome);
  },
  _filaDeEspera: 5,
  get filaDeEspera() {
    return this._filaDeEspera;
  },

  set filaDeEspera(fila: number) {
    if (fila <= 0) {
      return;
    }
    this._filaDeEspera = fila;
  }
};

const padaria2 = new EstabelecimentoBase(
  "Ruda dos Abacates, 1320 - bloco A",
  "alimentação",
  [
    { nome: "Banana", valor: 8 },
    { nome: "Beijinho", valor: 2.5 },
    { nome: "Brigadeiro", valor: 1.5 },
  ],
  -3
);

const padaria3 = new EstabelecimentoBase(
  "Ruda dos Morangos, 1320 - bloco B",
  "alimentação",
  [],
  27
);

console.log(padaria);
console.log(padaria.retornaNomeDosProdutos());
console.log(padaria2);
console.log(padaria2.retornaNomeDosProdutos());
padaria2.diminuiFilaDeEspera();
padaria2.diminuiFilaDeEspera();
padaria2.diminuiFilaDeEspera();
padaria2.diminuiFilaDeEspera();
padaria3.filaDeEspera = -100;
padaria3.filaDeEspera = 20;
console.log(padaria3.filaDeEspera);
console.log(padaria2.endereco);
console.log(padaria2.filaDeEspera);
