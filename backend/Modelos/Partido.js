import PartidoDAO from "../Persistencia/PartidoDAO.js";

export default class Partido{
    #Nome
    #Sigla
    #Numero

    constructor(Nome,Sigla,Numero){
        this.#Nome = Nome;
        this.#Sigla = Sigla;
        this.#Numero = Numero;
    }

    get Nome(){
        return this.#Nome;
    }

    set Nome(novoNome){
        this.#Nome = novoNome;
    }

    get Sigla(){
        return this.#Sigla;
    }

    set Sigla(novoSigla){
        this.#Sigla = novoSigla;
    }

    get Numero(){
        return this.#Numero;
    }

    set Numero(novoNumero){
        this.#Numero = novoNumero;
    }

    async gravar(){
        const dao = new PartidoDAO();
        await dao.gravar(this);
    }

    async excluir(){
        const dao = new PartidoDAO();
        await dao.excluir(this);
    }

    async atualizar(){
        const dao = new PartidoDAO();
        await dao.atualizar(this);
    }

    async consultar(termoDePesquisa){
        const dao = new PartidoDAO();
        return await dao.consultar(termoDePesquisa);
    }

    toString(){
        return `Partido Numero: ${this.#Numero} - Nome: ${this.#Nome} - Sigla: ${this.#Sigla}`;
    }

    toJSON(){
        return {
            Nome: this.#Nome,
            Sigla: this.#Sigla,
            Numero: this.#Numero
        }
    }
}