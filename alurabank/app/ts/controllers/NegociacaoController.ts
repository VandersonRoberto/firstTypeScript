import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index'
import { MensagemView, NegociacoesView } from '../views/index'
// import {logarTempoDeExecucao} from '../helpers/decorators/index'
import { domInject, throttle } from '../helpers/decorators/index'
import { NegociacaoService, HandlerFunction } from '../services/index';
import { imprime } from '../helpers/index'

export class NegociacaoController {

    // antes jquery
    // private _inputData: HTMLInputElement;

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _service = new NegociacaoService();

    constructor() {
        //antes jquery
        // this._inputData = <HTMLInputElement>document.querySelector("#data");

        //antes lazy load
        // this._inputData = $("#data");
        // this._inputQuantidade = $("#quantidade");
        // this._inputValor = $("#valor");

        this._negociacoesView.update(this._negociacoes);
    }

    // @logarTempoDeExecucao()
    @throttle(500)
    //antes do throttle
    // adiciona(event: Event) {
    adiciona() {

        //performance now antes do decorator
        //const t1 = performance.now();

        //com o throttle foi removido para trata nele
        //event.preventDefault();

        var data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update("Somente negociação em dias uteis, por favor");
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );


        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociacao adicionada com sucesso");

        imprime(negociacao, this._negociacoes);

        //const t2 = performance.now();
        //console.log(`O tempo de execucao eh de ${t2-t1} ms`)
    }

    private _ehDiaUtil(data: Date): boolean {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo
    }

    @throttle(500)
    async importaDados() {

        // const isOk: HandlerFunction = (res: Response) => {
        //     if (res.ok)
        //         return res;
        //     else {
        //         throw new Error(res.statusText);
        //     }
        // }

        try {
            const negociacoesParaImportar = await this._service
                .obterNegociacoes((res => {
                    if (res.ok)
                        return res;
                    else {
                        throw new Error(res.statusText);
                    }
                }));

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar
                .filter(negociacao =>
                    !negociacoesJaImportadas.some(jaImportada =>
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => {
                    this._negociacoes.adiciona(negociacao);

                })
            this._negociacoesView.update(this._negociacoes);
        }
        catch (erro) {
            this._mensagemView.update(erro.message);
        }
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}