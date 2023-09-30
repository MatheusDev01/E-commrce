const express = require('express');
const mysql = require('mysql');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname+'/config.env')})
const https = require('https');
const fs = require('fs');

const privateKey = fs.readFileSync(__dirname+'/localhost-key.pem', 'utf8');
const certificate = fs.readFileSync(__dirname+'/localhost.pem', 'utf8');


const credentials = {
  key: privateKey,
  cert: certificate,
};

const app = new express();
const port = 3000; // Porta do servidor

const apph = new express();
const porth = 5000;


// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection(process.env.DB_ACESS);

//trecho adicionado para evitar erro de politica do cors já que a url do site não bate com o da solicitação
const cors=require("cors");
const { config, configDotenv } = require('dotenv');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

//conectar ao banco de dados
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
    res.sendFile(__dirname+"/index.html"); 
  });
apph.get('/css/style.css', (req, res) => {
    res.sendFile(__dirname+"/css/style.css"); 
});
apph.get('/js/index.js', (req, res) => {
    res.sendFile(__dirname+"/js/index.js"); 
});


const httpsServer = https.createServer(credentials, apph);
const httpsServerbd = https.createServer(credentials, app);

  // Iniciar o servidor banco de dados
httpsServerbd.listen(port, () => {
    console.log(`Servidor BD rodando na porta ${port}`);
  });


  httpsServer.listen(porth, () => {
    console.log(`Servidor HTTPS rodando na porta ${porth}`);
  });
//apph.listen(porth, () => {
//    console.log(`Servidor html rodando na porta ${porth}`);
  //});



