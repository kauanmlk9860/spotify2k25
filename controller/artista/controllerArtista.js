/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de artista
  * Data: 17/04/2025
  * Autor: Kauan Rodrigues 
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const artistaDAO = require('../../model/DAO/artista.js')
const { json } = require('body-parser')

//funcao pra inserir um novo artista
const inserirArtista = async function(artista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                artista.nome == undefined || artista.nome == '' || artista.nome == null || artista.nome.length > 50 ||
                artista.biografia == undefined ||  artista.biografia.length > 250
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultArtista = await artistaDAO.insertArtista(artista)

                if(resultArtista)
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
 // funçao para listar todos os artistas 
const listarArtista = async function(){
    try {
        let dadosArtista = {}

        //chamar a função que retorna os artistas
        let resultArtista = await artistaDAO.selectAllArtista()
        console.log(resultArtista)
        if(resultArtista != false || typeof(resultArtista) == 'object')
        {
            //criando um objeto JSON para retornar a lista de Artistas
            if(resultArtista.length > 0){
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.item = resultArtista.length
                dadosArtista.artista = resultArtista
                return dadosArtista //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para listar um artista pelo ID
const buscarArtista = async function(id){
    try {
        console.log(id)
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            let dadosArtista = {}
            let resultArtista = await artistaDAO.selectByIdArtista(id)
            console.log(resultArtista)
            
            if(resultArtista != false || typeof(resultArtista) == 'object'){
                if(resultArtista.length > 0){
                    dadosArtista.status = true
                    dadosArtista.status_code = 200
                    dadosArtista.artista = resultArtista
                    return dadosArtista //200
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

//função para atualizar um artista existente
const atualizarArtista = async function(artista, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                artista.nome == undefined || artista.nome == '' || artista.nome == null || artista.nome.length > 50 ||
                artista.biografia == undefined ||  artista.biografia.length > 250 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultArtista = await buscarArtista(id)

                if(resultArtista.status_code == 200){
                    //update
                    artista.id = id //adiciona o atributo id no json e e coloca o id da artista que chegou na controller
                    let result = await artistaDAO.updateArtista(artista)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultArtista.status_code == 404){
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

//função para excluir um artista existente
const excluirArtista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultArtista = await buscarArtista(id)

            if(resultArtista.status_code == 200){
                //delete
                let result = await artistaDAO.deleteArtista(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultArtista.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirArtista,
    listarArtista,
    buscarArtista,
    atualizarArtista,
    excluirArtista
}