const express = require('express');
const mysql = require('mysql');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname+'/config.env')})



const apph = new express();
const porth = 10000;


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


  // Iniciar o servidor banco de dados


apph.listen({
    host:'0.0.0.0',
    port: 10000 || porth,
    }, () => {
    console.log(`Servidor HTTPS rodando na porta ${porth}`);
  });
//apph.listen(porth, () => {
//console.log(`Servidor html rodando na porta ${porth}`);
//});



