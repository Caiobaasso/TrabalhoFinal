import conectar from "./Conexao.js";
import Partido from "../Modelos/Partido.js";

export default class PartidoDAO {

    async gravar(partido){
        if (partido instanceof Partido){
            const conexao = await conectar();
            const sql = `INSERT INTO partido (Nome,Sigla,Numero) value (?,?,?)`;

            const parametros = [
                partido.Nome,
                partido.Sigla,
                partido.Numero
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
        }
    }

    async excluir(partido){
        if (partido instanceof Partido){
            const conexao = await conectar();
            const sql = `DELETE FROM partido WHERE Numero = ?`;
            const parametros = [partido.Numero];
            await conexao.execute(sql,parametros);
        }
    }

    async atualizar(partido){
        if (partido instanceof Partido){
            const conexao = await conectar();
            const sql = `UPDATE partido SET Nome = ?, Sigla = ?, WHERE Numero = ?`;
            const parametros = [
                partido.Nome,
                partido.Sigla,
                partido.Numero,
            ];
            await conexao.execute(sql, parametros);
        }
    }

    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql = "";
        if (isNaN(parseInt(termoDePesquisa))){
            sql = `SELECT * FROM partido WHERE Nome LIKE ?`;
            termoDePesquisa = '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM partido WHERE Numero = ?`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        
        let listaPartidos = [];

        for (const registro of registros){
            const partido = new Partido(
                registro.Nome,
                registro.Sigla,
                registro.Numero);
            listaPartidos.push(partido);
        }
        return listaPartidos;
    }
}