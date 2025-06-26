type Constructor = new (...args: any[]) => {};
type GConstructor<T = {}> = new(...args: any[]) => T;
type AnimalProps = GConstructor<{nome: string, idadeEmMeses: number}>;

function MixinVoa<TBase extends AnimalProps>(superClasse: TBase){
  return class extends superClasse{
    constructor(...args: any) {
      super(args[0])
    }
    voar(){
      console.log(`${this.nome} voou`);
    }
  }
}

function MixinNada<TBase extends AnimalProps>(superClasse: TBase){
  return class extends superClasse{
    constructor(...args: any) {
      super(args[0])
    }
    nadar(){
      console.log(`${this.nome} nadou`);
    }
  }
}

function MixinAnda<TBase extends AnimalProps>(superClasse: TBase){
  return class extends superClasse{
    constructor(...args: any) {
      super(args[0])
    }
    andar(){
      console.log(`${this.nome} andou`);
    }
  }
}

interface AnimalInterface {
  nome: string;
  idadeEmMeses: number;
  comer: () => void;
}

class Animal implements AnimalInterface {
  public nome: string;
  public idadeEmMeses: number;
  constructor({nome, idadeEmMeses} : {nome: string, idadeEmMeses: number}) {
    this.nome = nome;
    this.idadeEmMeses = idadeEmMeses;
  }

  comer(): void {
    console.log(`${this.nome} se alimentou`);
  }
}

class AnimalVoadorAndadorNadador extends (MixinNada(MixinAnda(MixinVoa(Animal)))){}
class AnimalVoadorAndador extends (MixinAnda(MixinVoa(Animal))){}

const cachorro = new Animal({nome: "Rex", idadeEmMeses: 10});
const mosca = new (MixinVoa(Animal))({nome: "Mosca-x", idadeEmMeses: 0.1});
const pato = new (MixinNada(MixinAnda(MixinVoa(Animal))))({nome:"Carlos", idadeEmMeses: 36})

const pato2 = new AnimalVoadorAndadorNadador({nome: "Steve", idadeEmMeses: 12});

cachorro.comer();

mosca.comer();
mosca.voar();

pato.andar();
pato.nadar();
pato.voar();

pato2.andar();
pato2.nadar();
pato2.voar();
