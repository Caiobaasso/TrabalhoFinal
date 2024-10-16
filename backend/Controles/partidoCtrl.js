import Partido from "../Modelos/Partido.js";

export default class PartidoCtrl {

    async gravar(req, res) {
        res.type('application/json');
    
        if(req.method  === 'POST' && req.is('application/json')){
            const dados = req.body;
            const Nome = dados.Nome;
            const Sigla = dados.Sigla;
            const Numero = dados.Numero;

            if(Nome && Sigla && Numero){
                const partido = new Partido(Nome,Sigla,Numero);
                partido.gravar().then(()=>{
                    res.status(201);
                    res.json({
                        "status":true,
                        "message":"Partido gravado com sucesso!",
                    });
                }).catch((erro)=>{
                    res.status(500);
                    res.json({
                        "status":false,
                        "message": "Não foi possível armazenar o Partido!" + erro.message
                    })
                });
            }
            else{
                res.status(400);
                res.json({
                    "status":false,
                    "message": "Por favor, informe todos os dados do Partido, conforme documentação da API!"
                });
            }
        }
        else{
            res.status(405);
            res.json({
                "status":false,
                "message": "Requisição inválida! Esperado o método POST e dados no formato JSON!"
            })
        }
    }

    atualizar(req,res){
        res.type('application/json');
        if(req.method  === 'PUT' && req.is('application/json')){
            const dados = req.body;
            const Nome = dados.Nome;
            const Sigla = dados.Sigla;
            const Numero = dados.Numero;

            if(Numero && Nome && Sigla){
                const partido = new Partido(Nome,Sigla,Numero);
                partido.atualizar().then(()=>{
                    res.status(200);
                    res.json({
                        "status":true,
                        "message":"Partido atualizado com sucesso!",
                    });
                }).catch((erro)=>{
                    res.status(500);
                    res.json({
                        "status":false,
                        "message": "Não foi possível atualizar o Partido!" + erro.message
                    })
                });
            }
            else{
                res.status(400);
                res.json({
                    "status":false,
                    "message": "Por favor, informe todos os dados do Partido, conforme documentação da API!"
                });
            }
        }
        else{
            res.status(405);
            res.json({
                "status":false,
                "message": "Requisição inválida! Esperado o método PUT e dados no formato JSON!"
            })
        }
    }

    excluir(req,res){
        if(req.method  === 'DELETE' && req.is("application/json")){
            const dados = req.body;
            const Numero = dados.Numero;
            if(Numero){
                const partido = new Partido(Numero);
                partido.excluir().then(()=>{
                    res.status(200);
                    res.json({
                        "status":true,
                        "message":"Partido excluído com sucesso!",
                    });
                }).catch((erro)=>{
                    res.status(500);
                    res.json({
                        "status":false,
                        "message": "Não foi possível excluir o Partido!" + erro.message
                    })
                })
            }
            else{
                res.status(400);
                res.json({
                    "status":false,
                    "message": "Por favor, informe o Código do Partido, conforme documentação da API!"
                });
            }
        }
        else{
            res.status(405);
            res.json({
                "status":false,
                "message": "Requisição inválida! Esperado o método DELETE!"
            })
        }
    }

    consultar(req,res){
        res.type('application/json');
        if(req.method  === 'GET'){
            const termoDePesquisa= req.params.termoDePesquisa;
            const partido = new Partido(0);
            partido.consultar(termoDePesquisa).then((partido)=>{
                res.status(200);
                res.json(partido);
            })
            .catch((erro)=>{
                res.status(500);
                res.json({
                    "status":false,
                    "message": "Erro ao Consultar o Partido!" + erro.message
                })
            })
        }
        else{
            res.status(405);
            res.json({
                "status":false,
                "message": "Requisição inválida! Esperado o método GET!"
            })
        }
    }
}