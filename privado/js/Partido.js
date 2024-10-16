const formPartido = document.querySelector('form');
const enderecoAPI = 'http://localhost:4000/partidos';
buscarTodosPartidos();

let motivoAcao = "CADASTRAR";

formPartido.onsubmit = validarCampos;

function gravarPartido() {
    const objetoPartido = {
        Numero: document.getElementById('numero').value,
        Nome: document.getElementById('nome').value,
        Sigla: document.getElementById('sigla').value
    };

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoPartido)
    }).then((resposta) => resposta.json())
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        } else {
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function excluirPartido() {
    fetch(enderecoAPI, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numero: document.getElementById('numero').value })
    }).then((resposta) => resposta.json())
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        } else {
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function atualizarPartido() {
    const objetoPartido = {
        numero: document.getElementById('numero').value,
        nome: document.getElementById('nome').value,
        sigla: document.getElementById('sigla').value
    };

    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoPartido)
    }).then((resposta) => resposta.json())
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        } else {
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function buscarTodosPartidos() {
    fetch(enderecoAPI, { method: 'GET' })
    .then((resposta) => resposta.json())
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirTabelaPartidos(respostaAPI.listaPartidos);
        } else {
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function validarCampos(evento) {
    const numero = document.getElementById('numero').value;
    const nome = document.getElementById('nome').value;
    const sigla = document.getElementById('sigla').value;

    evento.stopPropagation();
    evento.preventDefault();

    if (numero && nome && sigla) {
        if (motivoAcao == "CADASTRAR") {
            gravarPartido();
        } else if (motivoAcao == "EDITAR") {
            atualizarPartido();
            motivoAcao = "CADASTRAR";
        } else if (motivoAcao == "EXCLUIR") {
            excluirPartido();
            motivoAcao = "CADASTRAR";
        }

        formPartido.reset();
        buscarTodosPartidos();
        return true;
    } else {
        exibirMensagem('Por favor, preencha todos os campos do formulário.');
        return false;
    }
}

function exibirMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = `<p style='color: ${cor};'>${mensagem}</p>`;
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}

function exibirTabelaPartidos(listaPartidos) {
    if (listaPartidos.length > 0) {
        const espacoTabela = document.getElementById('containerTabela');
        const tabela = document.createElement('table');
        tabela.classList = "table table-striped table-hover";
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>Número</th>
                <th>Nome</th>
                <th>Sigla</th>
                <th>Ações</th>
            </tr>
        `;
        const corpo = document.createElement('tbody');
        for (const partido of listaPartidos) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${partido.numero}</td>
                <td>${partido.nome}</td>
                <td>${partido.sigla}</td>
                <td>
                    <button onclick="selecionarPartido('${partido.numero}','${partido.nome}','${partido.sigla}','EDITAR')">Alterar</button>
                    <button onclick="selecionarPartido('${partido.numero}','${partido.nome}','${partido.sigla}','EXCLUIR')">Excluir</button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        espacoTabela.innerHTML = "";
        espacoTabela.appendChild(tabela);
    } else {
        exibirMensagem('Nenhum partido encontrado.');
    }
}

function selecionarPartido(numero, nome, sigla, motivo) {
    document.getElementById('numero').value = numero;
    document.getElementById('nome').value = nome;
    document.getElementById('sigla').value = sigla;

    motivoAcao = motivo;
    const botaoConfirmacao = document.getElementById('botaoConfirmacao');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmacao.innerHTML = 'EDITAR';
    } else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    }
}

function carregarPartidos(){
    fetch(enderecoAPI). then((resposta)=>{ // Substitua pela URL da sua API
    return resposta.json();
    }).then((partidos) => {
        const selectPartidos = document.getElementById('partido-select');
        // Limpa o select antes de preencher
        selectPartidos.innerHTML = '';
        // Adiciona uma opção padrão
        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.text = 'Selecione um partido';
        selectPartidos.appendChild(optionDefault);
        
        // Preenche o select com os partidos retornados
        for (let i=0; i<partidos.length; i++) {
        const option = document.createElement('option');
        option.value = partidos[i].Nome;
        option.text = partidos[i].Nome;
        selectPartidos.appendChild(option);
        };
    }).catch((erro) => {
    console.error('Erro:', erro.message);
    });
}

    