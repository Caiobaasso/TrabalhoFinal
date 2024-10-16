const enderecoAPI = 'http://localhost:4000/partidos';

function carregarPartidos(){
    console.log('Tentando carregar partidos...');

    fetch(enderecoAPI).then((resposta)=>{ // Substitua pela URL da sua API
    return resposta.json();
    }).then((partidos) => {

        console.log('Partidos recebidos:', partidos);

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

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM totalmente carregado.");
    carregarPartidos();
});
