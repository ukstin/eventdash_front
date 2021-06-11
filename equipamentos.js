function recuperarInfo() {
    var userStr = localStorage.getItem("userDASH");
    if (!userStr) {
        window.location = "index.html";
    }

    fetch("http://localhost:8080/equipamentos")
    .then(resposta => resposta.json())
    .then(lista => preencherRelatorio(lista));
}

function preencherRelatorio(lista) {
    var strTabela = `<table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">IP</th>
        </tr>
    </thead>
    <tbody>`;
    for (i=0; i<lista.length; i++) {
    var eqto = lista[i];
    strTabela = strTabela + `<tr>
                    <th scope="row">${eqto.id}</th>
                    <td>${eqto.hostname}</td>
                    <td>${eqto.ipAddr}</td>
                    </tr>`;
    }
    strTabela = strTabela + `</tbody>
    </table>`;
    document.getElementById("tabelaRelatorio").innerHTML = strTabela;
}

function logout() {
    localStorage.clear("userDASH");
    window.location = "index.html";
}