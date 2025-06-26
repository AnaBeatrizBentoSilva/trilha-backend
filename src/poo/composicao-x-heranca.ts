// class Animal{
//     public nome: string
//     public idadeEmMeses: number
//     constructor(nome: string, idadeEmMeses: number){
//         this.nome = nome
//         this.idadeEmMeses = idadeEmMeses
//     }
// }

interface AnimalInterface {
  nome: string;
  idadeEmMeses: number;
  comer: () => void;
}

class Animal implements AnimalInterface {
  constructor(public nome: string, public idadeEmMeses: number) {}

  comer(): void {
    console.log(`${this.nome} se alimentou`);
  }
}

class AnimalVoador extends Animal implements AnimalInterface {
  constructor(
    public nome: string,
    public idadeEmMeses: number,
    public penas?: boolean
  ) {
    super(nome, idadeEmMeses);
  }

  voa(): void {
    console.log(`${this.nome} voou`);
  }
}

const cachorro = new Animal("Rex", 10);
const mosca = new AnimalVoador("Mosca-x", 0.1);
const pato = new AnimalVoador("Carlos", 5)

cachorro.comer();
mosca.comer();
mosca.voa();

export{}