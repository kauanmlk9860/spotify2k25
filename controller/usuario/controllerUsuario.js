/**
  * Autor: Kauan Rodrigues  
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de usuário
  * Data: 24/04/2025
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const usuarioDAO = require('../../model/DAO/usuario.js')
const { json } = require('body-parser')

//funcao pra inserir um novo usuário
const inserirUsuario = async function(usuario, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                usuario.nome == undefined || usuario.nome == '' || usuario.nome == null || usuario.nome.length > 50 ||
                usuario.username == undefined || usuario.username == '' || usuario.username == null || usuario.username.length > 45 ||
                usuario.email == undefined || usuario.email == '' || usuario.email == null || usuario.email.length > 75 ||
                usuario.senha == undefined || usuario.senha == '' || usuario.senha == null || usuario.senha.length > 8
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if(resultUsuario)
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

const listarUsuario = async function(){
    try {
        let dadosUsuario = {}

        //chamar a função que retorna as musicas
        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false || typeof(resultUsuario) == 'object')
        {
            //criando um objeto JSON para retornar a lista de usuarios
            if(resultUsuario.length > 0){
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.item = resultUsuario.length
                dadosUsuario.usuario = resultUsuario
                return dadosUsuario //200
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

//função para listar um usuario pelo ID
const buscarUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosUsuario = {}
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200
                    dadosUsuario.usuario = resultUsuario
                    return dadosUsuario //200
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

//função para atualizar um usuário existente
const atualizarUsuario = async function(usuario, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                usuario.nome == undefined || usuario.nome == '' || usuario.nome == null || usuario.nome.length > 50 ||
                usuario.username == undefined || usuario.username == '' || usuario.username == null || usuario.username.length > 45 ||
                usuario.email == undefined || usuario.email == '' || usuario.email == null || usuario.email.length > 75 ||
                usuario.senha == undefined || usuario.senha == '' || usuario.senha == null || usuario.senha.length > 8 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultUsuario = await buscarUsuario(id)

                if(resultUsuario.status_code == 200){
                    //update
                    usuario.id = id //adiciona o atributo id no json e e coloca o id da música que chegou na controller
                    let result = await usuarioDAO.updateUsuario(usuario)

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
const excluirUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            // validar se o ID existe
            let resultUsuario = await buscarUsuario(id)

            if(resultUsuario.status_code == 200){
                // delete da musica
                let result = await usuarioDAO.deleteUsuario(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultUsuario.status_code == 404){
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
    inserirUsuario,
    listarUsuario,
    buscarUsuario,
    atualizarUsuario,
    excluirUsuario
}