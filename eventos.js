function recuperarInfo() {
    var userStr = localStorage.getItem("userDASH");
    if (!userStr) {
        window.location = "index.html";
    }

    var user = JSON.parse(userStr);

    /*document.getElementById("fotoUser").innerHTML = `<img src="${user.linkFoto}" width="100%">`;
    document.getElementById("bioUser").innerHTML = `<h4>${user.nome}</h4>
                                                    <hr>
                                                    <strong>Racf:</strong> ${user.racf} </br>
                                                    <strong>Email:</strong> ${user.email} </br>
                                                    <strong>Ramal:</strong> ${user.ramal} </br>
                                                    <strong>Departamento:</strong> ${user.departamento} </br>
                                                    <button type="button" class="btn btn-primary" onclick="logout()">Logout</button>`;
*/
}

function logout() {
    localStorage.removeItem("userDASH");
    window.localion = "index.html"
}

function gerarRelatorio() {
    var dataInicio = document.getElementById("dataInicio").value;
    var dataFim = document.getElementById("dataFim").value;
    //console.log("digitou = " + dataInicio + "/" + dataFim);

    // 1 - enviar os dados para o backend
    // 2 - ao chegar a resposta, precisamos extrair o JSON (lista de eventos)
    // 3 - gerar dinamicamente uma tabela com os valores
    fetch("http://localhost:8080/eventosporperiodo?inicio=" + dataInicio + "&fim=" + dataFim)
        .then(resposta => resposta.json())
        .then(lista => preencherRelatorio2(lista));
}

function toDateISO(dateStr) {
    return dateStr.split('-').reverse().join('/');
}

function preencherRelatorio(lista) {
    var strTabela = `<table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Data</th>
                                <th scope="col">Evento</th>
                                <th scope="col">Equipamento</th>
                                <th scope="col">IP</th>
                            </tr>
                        </thead>
                        <tbody>`;
    for (i=0; i<lista.length; i++) {
        var evento = lista[i];
        strTabela = strTabela + `<tr>
                                    <th scope="row">${evento.numSeq}</th>
                                    <td>${toDateISO(evento.data)}</td>
                                    <td>${evento.alarme.nome}</td>
                                    <td>${evento.equipamento.hostname}</td>
                                    <td>${evento.equipamento.ipAddr}</td>
                            </tr>`;
    }
    strTabela = strTabela + `</tbody>
                    </table>`;
    document.getElementById("tabelaRelatorio").innerHTML = strTabela;
    
}

function preencherRelatorio2(lista){
    //console.log("to na funcao");

    var dados = [];
    for (i=0;i<lista.length; i++){
        let evento = lista[i];
        let eventoAr = [evento.numSeq, toDateISO(evento.data), evento.alarme.nome, evento.equipamento.hostname, evento.equipamento.ipAddr];
        dados.push(eventoAr);
    }
    $("#tabelaRelatorio").DataTable({
        data: dados,
        columns: [
            {title:"#"},
            {title:"Data"},
            {title:"Alarme"},
            {title:"Hostname"},
            {title:"IP"}
        ]
    });
}

function logout() {
    localStorage.clear("userDASH");
    window.location = "index.html";
}