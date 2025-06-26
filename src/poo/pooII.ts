import { Produto } from "./pooI";

interface EstabelecimentoInterface {
  endereco: string;
  setor: string;
  filaDeEspera: number;
  retornaNomeDosProdutos: () => string[];
  diminuiFilaDeEspera(): void;
}

interface ReceitaInterface {
  remedios: string[];
  identificacaoDoMedico: string;
}

interface FarmaciaInterface extends EstabelecimentoInterface {
  compraRemedioPrescrito: (
    receita: ReceitaInterface,
    produtosAComprar: string[]
  ) => void;
}

interface RemedioInterface extends Produto {
  receitaObrigatoria?: boolean;
}

class Estabelecimento implements EstabelecimentoInterface {
  protected _filaDeEspera = 10;

  constructor(
    public endereco: string,
    public setor: string,
    protected produtos: Produto[],
    filaDeEspera?: number
  ) {
    this.filaDeEspera = filaDeEspera ?? this._filaDeEspera;
  }

  retornaNomeDosProdutos(): string[] {
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

class Farmacia extends Estabelecimento implements FarmaciaInterface {
  constructor(
    public endereco: string,
    public setor: string,
    protected produtos: RemedioInterface[],
    filaDeEspera?: number
  ) {
    super(endereco, setor, produtos, filaDeEspera);
  }

  public compraRemedioPrescrito(
    receita: ReceitaInterface,
    produtosAComprar: string[]
  ): void {
    const remediosDisponiveis = this.produtos.filter((produto) =>
      produtosAComprar.includes(produto.nome)
    );

    if (remediosDisponiveis.length === 0) {
      console.log("Infelizmente não temos os remédios em estoque.");
    }

    const remediosAutorizados = remediosDisponiveis.filter(produto => 
        !produto.receitaObrigatoria || receita.remedios.includes(produto.nome)
    //   if (!produto.receitaObrigatoria) {
    //     return true
    //   }
    //   return receita.remedios.includes(produto.nome);
    );

    console.log(remediosDisponiveis);
    console.log(remediosAutorizados);
  }
}

const supermercado = new Estabelecimento(
  "Ruda dos Abacates, 1320 - bloco A",
  "alimentação",
  [
    { nome: "Banana", valor: 8 },
    { nome: "Beijinho", valor: 2.5 },
    { nome: "Carne moída", valor: 20 },
  ],
  25
);

const farmaciaDoZe = new Farmacia(
  "Ruda X, 1299",
  "farmaceutico",
  [
    { nome: "Aspirina", valor: 8 },
    { nome: "Remédio controlado 1", valor: 80, receitaObrigatoria: true },
    { nome: "Remédio controlado 2", valor: 60, receitaObrigatoria: true },
    { nome: "Vitamina C", valor: 20 },
    { nome: "Creme hidratante", valor: 15 },
  ],
  25
);

//Não temos acesso diretamente no objeto instanciado a produtos e _filaDeEspera
// supermercado.produtos
// supermercado._filaDeEspera

supermercado.retornaNomeDosProdutos();
farmaciaDoZe.compraRemedioPrescrito(
  {
    remedios: ["Remédio controlado 1"],
    identificacaoDoMedico: "123-456-111",
  },
  ["Aspirina", "Shampoo", "Remédio controlado 1"]
);
