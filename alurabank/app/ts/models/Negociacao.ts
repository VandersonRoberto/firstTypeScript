import { MeuObjeto } from './MeuObjeto';

export class Negociacao implements MeuObjeto<Negociacao>{

    // com readonly nao preciso mais criar com private e definir o get separado
    constructor(readonly data : Date, readonly quantidade: number, readonly valor: number){}

    get volume(){
        return this.quantidade * this.valor;
    }

    paraTexto() : void{

        console.log(
            `Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor},
            Volume: ${this.volume}`
        );
    }

    ehIgual(negociacao: Negociacao){
        return this.data.getDate() == negociacao.data.getDate() && 
               this.data.getMonth() == negociacao.data.getMonth() &&
               this.data.getFullYear() == negociacao.data.getFullYear() &&
               this.quantidade == negociacao.quantidade && 
               this.valor == negociacao.valor;
    }
}