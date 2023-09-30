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
var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '629244222367-9rc7h0o9fqondat3an2oo5jtemqfv85o.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('customBtn'));
    });
  };
  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          document.getElementById('name').innerText = "Signed in: " +
              googleUser.getBasicProfile().getName();
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

