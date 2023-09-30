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


const apph = new express();
const porth = 5000;


//Rodar html no servidor
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


  // Iniciar o servidor banco de dados


  httpsServer.listen({
    host:'0.0.0.0',
    port: 5000 || porth,
  }, () => {
    console.log(`Servidor HTTPS rodando na porta ${porth}`);
  });
//apph.listen(porth, () => {
//    console.log(`Servidor html rodando na porta ${porth}`);
  //});



