const express = require('express');
const mysql = require('mysql');

const app = new express();
const port = 3000; // Porta do servidor

const apph = new express();
const porth = 5000;

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection('mysql://byn5na033qbx7u0tlxj8:pscale_pw_AdI1bSbLsKnLJVclGIQa1VNWmkj5SMjMLxKr2G7O4Lz@aws.connect.psdb.cloud/matheusdb?ssl={"rejectUnauthorized":true}');

//trecho adicionado para evitar erro de politica do cors já que a url do site não bate com o da solicitação
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))


db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
  });

  // Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: false }));

// Rota para lidar com o envio do formulário
app.post('/enviar-formulario', (req, res) => {
    const { nome, qtd, preco, cod_vendedor } = req.body;
  
    const sql = 'INSERT INTO `matheusdb`.`Produtos` (`tipo`, `qtd`, `preco`, `cod_vendedor`) VALUES (?, ?, ?, ?);';
    const values = [nome, qtd, preco, cod_vendedor];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('Dados inseridos no banco de dados');
    });
  });


  app.post('/excluir-produto', (req, res) => {
    const { cod_vendedor } = req.body;
  
    const sql = 'DELETE FROM `matheusdb`.`Produtos` WHERE (`cod_produto` = ?);';
    const values = [cod_vendedor];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('Dado excluido no banco de dados');
    });
  });

  // Rota para buscar os dados do banco de dados e retorná-los como JSON
app.get('/dados-do-banco', (req, res) => {
    const sql = 'SELECT * FROM Produtos'; // Substitua "formulario" pelo nome da sua tabela
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
        return;
      }
      res.json(result);
    });
  });


//Rodar html no servidor porta 5000
apph.get('/', (req, res) => {
    res.sendFile("C:/Users/mathe/OneDrive/Área de Trabalho/E-COMMERCE/index.html"); 
  });
apph.get('/css/style.css', (req, res) => {
    res.sendFile("C:/Users/mathe/OneDrive/Área de Trabalho/E-COMMERCE/css/style.css"); 
});
apph.get('/js/index.js', (req, res) => {
    res.sendFile("C:/Users/mathe/OneDrive/Área de Trabalho/E-COMMERCE/js/index.js"); 
});

  // Iniciar o servidor banco de dados
app.listen(port, () => {
    console.log(`Servidor BD rodando na porta ${port}`);
  });

apph.listen(porth, () => {
    console.log(`Servidor html rodando na porta ${porth}`);
  });



