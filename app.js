/**********************************************************************************************************************************************************************************
 * Objetivo: API responsável pelas requisições do projeto de controle música
 * Data: 13/02/2025
 * Autor: Kauan Rodrigues 
 * Versões: 1.0
 * Observações:
 * ************ Para criar a API precisamos instalar:
 *              express   npm install express --save
 *              cors        npm install cors --save
 *              body-parser npm install body-parser --save
 * ************* Para criar conexão com o banco de dados MYSQL precisamos instalar:
 *               prisma        npm install prisma --save
 *               prisma/client npm install @prisma/client --save
 * 
 * Após a instalação do prisma é necessário inicializar o prisma:
 *             npx prisma init 
 * Para sincronização do prisma com o banco de dados podemos utilizar:
 *             npx prisma migrate dev 
 ***********************************************************************************************************************************************************************************/

//Import das bibliotecas para criar a API 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//Import das crotrollers do projeto
const controllerMusica = require('./controller/musica/controllerMusica.js')
const controllerArtista = require('./controller/artista/controllerArtista.js')
const controllerUsuario = require('./controller/usuario/controllerUsuario.js')
const controllerPlaylist = require('./controller/playlist/controllerPlaylist.js')
const controllerStatus = require('./controller/status/controllerStatus.js')
const controllerTipoPagamento = require('./controller/tipo_pagamento/controllerTipo_pagamento.js')
//criando o  formato de dados que sera recebido no body da requisição (post/put)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API

const app = express()

/****************************************************************************************************************
 * END POINTS PARA MÚSICA 
 ****************************************************************************************************************/

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST,PUT DELETE, OPTIONS')

    app.use(cors())
    next()

})

//Função para adicionar música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function (request, response) {

    //recebe ontentType da requisição para validar o formato de dados

    let contentType = request.headers['content-type']
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Função para listar musicas
app.get('/v1/controle-musicas/musica', cors(), async function (request, response) {

     //chama a função para retornar uma lista de usuario
     let result = await controllerMusica.listarMusica()

     response.status(result.status_code)
     response.json(result)
 })
 

//Função para procurar a música pelo id 
app.get('/v1/controle-musicas/musica/:id', cors(), async function (request, response) {
    
        let idMusica = request.params.id
        let result = await controllerMusica.buscarMusica(idMusica)

        response.status(result.status_code)
        response.json(result)
    
})

//Função para deletar uma música pelo id
app.delete('/v1/controle-musicas/musica/:id', cors(), async function (request, response){

    let idMusica = request.params.id
    let result = await controllerMusica.excluirMusica(idMusica)

    response.status(result.status_code)
    response.json(result)

})


//Função para atualizar uma música pelo id
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    let idMusica = request.params.id

    let dadosBody = request.body

    let result = await controllerMusica.atualizarMusica(dadosBody,idMusica, contentType)
    
    response.status(result.status_code)
    response.json(result)

})


/****************************************************************************************************************
 * END POINTS PARA USÚARIOS
 ****************************************************************************************************************/
//endpoint para inserir um usuario
app.post('/v1/controle-musicas/usuario', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de usuarios
app.get('/v1/controle-musicas/usuario', cors(), async function(request, response){

    //chama a função para retornar uma lista de usuario
    let result = await controllerUsuario.listarUsuario()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um usuario pelo id
app.get('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){

    let idUsuario = request.params.id

    let result = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um usuário
app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idUsuario = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um usuário
app.delete('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){
    let idUsuario = request.params.id

    let result = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})

/****************************************************************************************************************
 * END POINTS PARA ARTISTA
 ****************************************************************************************************************/

//endpoint para inserir um artista
app.post('/v1/controle-musicas/artista', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerArtista.inserirArtista(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de artista
app.get('/v1/controle-musicas/artista', cors(), async function(request, response){

    //chama a função para retornar uma lista de artista
    let result = await controllerArtista.listarArtista()
    console.log(result)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um artista pelo id
app.get('/v1/controle-musicas/artista/:id', cors(), async function(request, response){

    let idArtista = request.params.id

    let result = await controllerArtista.buscarArtista(idArtista)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um artista
app.put('/v1/controle-musicas/artista/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idArtista = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerArtista.atualizarArtista(dadosBody, idArtista, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um artista
app.delete('/v1/controle-musicas/artista/:id', cors(), async function(request, response){
    let idArtista = request.params.id

    let result = await controllerArtista.excluirArtista(idArtista)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições...')
})

/****************************************************************************************************************
 * ENDPOINTS PARA PLAYLIST
 ****************************************************************************************************************/

// Inserir uma nova playlist
app.post('/v1/controle-musicas/playlist', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerPlaylist.inserirPlaylist(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Atualizar uma playlist existente
app.put('/v1/controle-musicas/playlist/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let result = await controllerPlaylist.atualizarPlaylist(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Excluir uma playlist existente
app.delete('/v1/controle-musicas/playlist/:id', cors(), async function(request, response) {
    let id = request.params.id

    let result = await controllerPlaylist.excluirPlaylist(id)

    response.status(result.status_code)
    response.json(result)
})

// Listar todas as playlists
app.get('/v1/controle-musicas/playlist', cors(), async function(request, response) {
    let result = await controllerPlaylist.listarPlaylist()

    response.status(result.status_code)
    response.json(result)
})

// Buscar uma playlist por ID
app.get('/v1/controle-musicas/playlist/:id', cors(), async function(request, response) {
    let id = request.params.id

    let result = await controllerPlaylist.buscarPlaylist(id)

    response.status(result.status_code)
    response.json(result)
})
/****************************************************************************************************************
 * ENDPOINTS PARA STATUS
 ****************************************************************************************************************/

// Inserir um novo status
app.post('/v1/controle-musicas/status', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerStatus.inserirStatus(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Atualizar um status existente
app.put('/v1/controle-musicas/status/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let result = await controllerStatus.atualizarStatus(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Excluir um status existente
app.delete('/v1/controle-musicas/status/:id', cors(), async function(request, response) {
    let id = request.params.id

    let result = await controllerStatus.excluirStatus(id)

    response.status(result.status_code)
    response.json(result)
})

// Listar todos os status
app.get('/v1/controle-musicas/status', cors(), async function(request, response) {
    let result = await controllerStatus.listarStatus()

    response.status(result.status_code)
    response.json(result)
})

// Buscar um status por ID
app.get('/v1/controle-musicas/status/:id', cors(), async function(request, response) {
    let id = request.params.id

    let result = await controllerStatus.buscarStatus(id)

    response.status(result.status_code)
    response.json(result)
})
