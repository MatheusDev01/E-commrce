function msg_prod_cad_sucesso () {
    alert("Produto cadastrado com sucesso")
}

function msg_prod_excluido_sucesso () {
    alert("Produto excluido com sucesso")
}

// Função para buscar e exibir os dados do banco de dados
function buscarDadosDoBanco () {
    fetch('https://ecommerce-projeto.onrender.com/dados-do-banco')
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById('tabela-dados');
            const tbody = tabela.getElementsByTagName('tbody')[0];
            tbody.innerHTML = ''; // Limpa qualquer conteúdo anterior

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.cod_produto}</td><td>${item.tipo}</td><td>${item.qtd}</td><td>${item.preco}</td><td>${item.cod_vendedor}</td><td><button>Editar</button></td><td>
                <form action="https://ecommerce-projeto.onrender.com/excluir-produto" method="post" onsubmit="msg_prod_excluido_sucesso()">
                <input style="display:none;" type="number" id="cod_vendedor" name="cod_vendedor" value="${item.cod_produto}">
                <input type="submit" value="Excluir">
                </form>
                </td>`;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}


function exibelogins () {
    var i = document.getElementById('gSignInWrapper').style.display
    if (i == 'none') {
        document.getElementById('gSignInWrapper').style = 'display:;'
    } else {
        document.getElementById('gSignInWrapper').style = 'display:none;'
    }
}


//LOGIN GOOGLE
var login;
function LoginSucesso (response) {
  const data = jwt_decode(response.credential);
  if (data != null){
  document.getElementById('name').innerText = "Signed in: " + data.name;
  login = true;
  exibeTelaLogin();
  } else {
    alert('O login não foi possível, tente novamente.')
  }
}

function exibeTelaLogin () {
  
    document.getElementById('TabelaProdutos').style = 'display:;'

    document.getElementById('CadastroProdutos').style = 'display:;'
}

