/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de artista
  * Data: 17/04/2025
  * Autor: Kauan Rodrigues 
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')

//import do arquivo DAO de música para manipular o db
const musicaDAO = require('../../model/dao/musica.js')
const { json } = require('body-parser')

//função para inserir uma nova música
const inserirMusica = async function(musica, contentType){
    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) .toLowerCase() == 'application/json')
        {
        if (musica.nome == undefined || musica.nome == '' || musica.nome == null || musica.nome.length > 80 ||
            musica.link == undefined || musica.link == '' || musica.link == null || musica.link.length > 200 ||
            musica.duracao == undefined || musica.duracao == '' || musica.duracao == null || musica.duracao.length > 5 ||
            musica.data_lancamento == undefined || musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento.length > 10 ||
            musica.foto_capa == undefined || musica.foto_capa.length > 200 ||
            musica.letra == undefined
        ){
            return MESSAGE.ERROR_REQUIRE_FIELDS
        }else{
            let resultMusica = await musicaDAO.insertMusica(musica)
    
            if(resultMusica)
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

//função para atualizar uma música existente
const atualizarMusica = async function(musica, id, contentType){
    try {
        if(String(contentType) .toLowerCase() == 'application/json')
            {
            if (musica.nome == undefined || musica.nome == '' || musica.nome == null || musica.nome.length > 80 ||
                musica.link == undefined || musica.link == '' || musica.link == null || musica.link.length > 200 ||
                musica.duracao == undefined || musica.duracao == '' || musica.duracao == null || musica.duracao.length > 5 ||
                musica.data_lancamento == undefined || musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento.length > 10 ||
                musica.foto_capa == undefined || musica.foto_capa.length > 200 ||
                musica.letra == undefined || id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultMusica = await buscarMusica(id)

                if(resultMusica.status_code == 200){
                    //update
                    musica.id = id //adiciona o atributo id no json e coloca o id da música que chegou na controller
                    let result = await musicaDAO.updateMusica(musica)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultMusica.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para excluir uma música existente
const excluirMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            // validar se o ID existe
            let resultMusica = await buscarMusica(id)

            if(resultMusica.status_code == 200){
                // delete da musica
                let result = await musicaDAO.deleteMusica(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultMusica.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para retornar todas as música
const listarMusica = async function(){
    try {
        let dadosMusica = {}

        //chamar a função que retorna as musicas
        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false || typeof(resultMusica) == 'object')
        {
            //criando um objeto JSON para retornar a lista de musicas
            if(resultMusica.length > 0){
                dadosMusica.status = true
                dadosMusica.status_code = 200
                dadosMusica.item = resultMusica.length
                dadosMusica.musicas = resultMusica
                return dadosMusica //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para listar uma música pelo ID
const buscarMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosMusica = {}
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                    dadosMusica.status = true
                    dadosMusica.status_code = 200
                    dadosMusica.musicas = resultMusica
                    return dadosMusica //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}