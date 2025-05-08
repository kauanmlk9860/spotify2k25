/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de artista
  * Data: 17/04/2025
  * Autor: Kauan Rodrigues 
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')

//import do arquivo DAO de música para manipular o db
const musicaDAO = require('../../model/DAO/playlist.js')
const { json } = require('body-parser')

//função para inserir uma nova música
const inserirPlaylist = async function(playlist, contentType){
    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) .toLowerCase() == 'application/json')
        {
        if (playlist.nome == undefined || playlist.nome == '' || playlist.nome == null || playlist.nome.length > 80 ||
            playlist.descricao == undefined || playlist.descricao == '' || playlist.descricao == null || playlist.descricao.length > 200 ||
            playlist.foto_capa == undefined || playlist.foto_capa.length > 200 
        ){
            return MESSAGE.ERROR_REQUIRE_FIELDS
        }else{
            let resultPlaylist = await playlistDAO.inserirPlaylist(playlist)
    
            if(resultPlaylist)
                return MESSAGE.SUCCESS_CREATED_ITEM //201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }else{
        return MESSAGE.ERROR_CONTENT_TYPE //415
    }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


module.exports = {
   inserirPlaylist
}