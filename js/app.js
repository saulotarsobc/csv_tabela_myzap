let form = document.querySelector("#form");
let contatos = "";
let variaveis = "";

$("#form").on("submit", function (event) {
    event.preventDefault();
    processarTabela();
});

$("#mensagem").on("input", function () {
    criarModelo();
});

function processarTabela() {
    $("#thead").html("");
    $("#tbody").html("");
    $("#variaveis").html("");
    variaveis = [];
    $.ajax({
        url: "./api/processar-csv.php",
        method: "POST",
        data: new FormData(form),
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
            let tableHeader = data[0];
            for (let i in tableHeader) {
                $("#thead").append(`<th scope="col">${i.toUpperCase()}</th>`);
                let variavel = "{{" + i + "}}";
                variaveis.push(variavel);
                $("#variaveis").append(` ${variavel}`);
            };
            $("#thead").append(`<th scope="col" colspan="2">STATUS DE ENVIO</th>`);
            data.shift();
            contatos = data;
            data.forEach(element => {
                let row = "<tr>";
                for (let i in element) {
                    row += `<td>${element[i]}</td>`;
                }
                if (element["id"]) {
                    row += `<td colspan="2" ><input disabled class="form-control style="background-color:yellow;width:100%" type="text" name="${element["id"]}" id="${element["id"]}" value="Não enviado"></td>`;
                } else {
                    row += `<td>Sem identificador único </td>`;
                }
                row += "</tr>";
                $("#tbody").append(row);
            });
        },
    });
};

function criarModelo() {
    let mensagemModelo = comporMensagem(contatos[0]);
    $("#mensagemModelo").html(mensagemModelo);
    // console.log(mensagemModelo);
};

$("#enviarMensagens").on("click", function () {
    console.warn("enviarMensagens")
    contatos.forEach(contato => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "sessionkey": $("#sessionkey").val(),
            },
            body: JSON.stringify({
                "session": $("#session").val(),
                "number": contato["whatsapp"],
                "text": comporMensagem(contato),
            })
        };
        fetch($("#urlApi").val() + "/sendText", options)
            .then(res => {
                return res;
            }).then(function (res) {
                return (res.json())
            }).then(function (res) {
                console.log(res);
                if (res['result'] == 200) {
                    $("#" + contato["id"]).val("Enviado").css("background-color", "#70da70"); // sucesso
                } else {
                    if (res["error"]) {
                        $("#" + contato["id"]).val(res["error"]).css("background-color", "#f49090"); // falha
                    } else {
                        $("#" + contato["id"]).val("Falha ao enviar").css("background-color", "#f49090"); // falha
                    }
                    if (res["status"] == "error") {
                        if (res["message"]) {
                            $("#" + contato["id"]).val(res["message"]).css("background-color", "#f49090"); // falha
                        }
                    }
                }

                if (res['result'] == 401) {
                    if (res["messages"]) {
                        $("#" + contato["id"]).val(res["messages"]).css("background-color", "#f49090"); // falha
                    }
                }
            })
            .catch(err => {
                // console.error(err);
            });
    });
});

$("#testarConexao").on("click", () => {
    const form = new FormData();
    form.append("session", $("#session").val());
    form.append("number", "559392135722");

    const options = {
        method: 'POST',
        headers: {
            'sessionkey': $("#sessionkey").val(),
        }
    };

    options.body = form;

    fetch($("#urlApi").val() + "/verifyNumber", options)
        .then(res => {
            console.warn(JSON.stringify(res));
            if (res.status == 200) {
                $("#testarConexao").removeClass("btn-danger");
                $("#testarConexao").removeClass("btn-secondary");
                $("#testarConexao").addClass("btn-success");
            }
            if (res.status != 200) {
                $("#testarConexao").removeClass("btn-secondary");
                $("#testarConexao").removeClass("btn-success");
                $("#testarConexao").addClass("btn-danger");
            }
            return res.json();
        }).then(json => {
            console.log(json);
            $("#testarConexao").val(json['messages'])
            if(json.error){
                $("#testarConexao").removeClass("btn-secondary");
                $("#testarConexao").removeClass("btn-success");
                $("#testarConexao").addClass("btn-danger");
                $("#testarConexao").val(json.error);
            }
        })
        .catch(err => {
            $("#testarConexao").val("Falha! Verifique URL").removeClass("btn-secondary").addClass("btn-danger")
            console.error(err)
        });
});

function comporMensagem(contato) {
    let messagem = $("#mensagem").val();
    if (typeof (contatos) != "string") {
        variaveis.forEach(variavel => {
            let variavelLimpa = (variavel.replace(/\{|\}/g, ""));
            messagem = messagem.replace(variavel, contato[variavelLimpa])
        });
    }
    return messagem;
};
