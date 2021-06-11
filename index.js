function enviarDados() {
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;
    //console.log("digitou = " + txtLogin + "/" + txtSenha);

    var msgBody = {
        email: txtLogin,
        racf: txtLogin,
        senha: txtSenha
    }

    var cabecalho = {
        method: "POST",
        body: JSON.stringify(msgBody),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch("http://localhost:8080/login", cabecalho).then(resp => tratarResposta(resp));
}

function tratarResposta(resp) {
    if (resp.status == 200) {
        resp.json().then(user => {
            localStorage.setItem("userDASH", JSON.stringify(user));
            window.location = "relatorios.html";
            //console.log(user);
        });
    } else if (resp.status == 404) {
        document.getElementById("msg").innerHTML = "Usuário não encontrado";
    } else if (resp.status == 403) {
        document.getElementById("msg").innerHTML = "Senha Inválida";
    } else {
        document.getElementById("msg").innerHTML = "Erro desconhecido";
    }
}