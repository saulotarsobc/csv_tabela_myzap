<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.css">
</head>

<body>

    <div class="container col-md-10 col-sm-12">

        <!-- CREDENCIAS DA API -->
        <h2>
            Envio de Mensagem no Whatsapp usando a API
            <a class="text-success" target="_blank" href="https://github.com/billbarsch/myzap">Myzap</a>
        </h2>

        <h5>Versão 4.0.3</h5>

        <hr>


        <!-- FORMULARIO DA API -->
        <label for="">Credenciais da API:</label>

        <div class="row mt-2">
            <div class="col-sm-12">
                <label for="urlApi">URL:</label>
                <input id="urlApi" name="urlApi" class="form-control" type="text">
            </div>

            <div class="col-6">
                <label for="session">Session:</label>
                <input id="session" class="form-control" type="password" value="">
            </div>

            <div class="col-6">
                <label for="sessionkey">Session Key:</label>
                <input id="sessionkey" class="form-control" type="password" value="">
            </div>

            <div class="col-12 mt-2">
                <input id="testarConexao" class="form-control btn btn-secondary" type="button"
                    value="Testar conexão com API">
            </div>
        </div>

        <hr>

        <!-- FORMULARIO COM CSV -->
        <div class="row">
            <form class="col" id="form" method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <input required class="form-control custom-file-input" id="file" name="file" type="file"
                        accept=".csv">
                    <input class="form-control btn btn-primary mt-2" type="submit" value="Carregar contatos">
                </div>
            </form>

            <hr class="mt-2">

            <div class="form-group">
                <label for="variaveis">Variaveis que voçê pode usar na mensagem:</label>
                <textarea disabled class="form-control" name="variaveis" id="variaveis" rows="3"
                    placeholder="Listarei as variaveis que voçê pode usar na composição de sua mensagem"></textarea>

            </div>
        </div>

        <hr>

        <!-- COMPOR MENSAGEM -->
        <div class="row">
            <!-- Oi *{{nome}}*, tudo bem? id:{{id}} whatsapp: {{whatsapp}} -->
            <div class="mt-2 col-md-6 col-sm-12">
                <label class="custom-file-label" for="mensagem">Compor Mensagem:</label>
                <textarea class="form-control" name="mensagem" id="mensagem" rows="5"
                    placeholder="Sem mensagem definida"></textarea>
            </div>

            <div class="mt-2 col-md-6 col-sm-12">
                <label class="custom-file-label" for="mensagemModelo">Modelo baseado no primeiro
                    contato:</label>
                <textarea disabled class="form-control" name="mensagemModelo" id="mensagemModelo" rows="5"
                    placeholder="Sem mensagem definida"></textarea>
            </div>

            <div class="col-sm-12">
                <button class="col btn btn-success mt-2 form-control " id="enviarMensagens">ENVIAR MENSAGENS</button>
            </div>
        </div>

        <hr>

        <!-- TABELA -->
        <div class="row m-2">
            <h2>Contatos:</h2>
            <table class="table table-striped table-light table-hover">
                <!-- <table class="table"> -->
                <thead>
                    <tr id="thead">
                        <th scope="col">ID</th>
                        <th scope="col">NOME</th>
                        <th scope="col">WHATSAPP</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr>
                        <td>1</td>
                        <td>Exemplo 1</td>
                        <td>55999999999</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Exemplo 2</td>
                        <td>55988888888</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <script src="./node_modules/jquery/dist/jquery.js"></script>
    <script src="./js/app.js"></script>
</body>

</html>