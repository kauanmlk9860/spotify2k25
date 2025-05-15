/**
 * Autor: Kauan Rodrigues  
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de status
 * Data: 15/05/2025
 * Versão: 1.0
 */

// Import do arquivo de configurações de mensagens de status code
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO de status para manipular o DB
const statusDAO = require('../../model/DAO/status.js')

// Função para inserir um novo status
const inserirStatus = async function(status, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                status.descricao == undefined || status.descricao == '' || status.descricao == null || status.descricao.length > 255 ||
                status.concluido == undefined || status.concluido == '' || status.concluido == null || status.concluido.length > 1 ||
                status.aguardando == undefined || status.aguardando == '' || status.aguardando == null || status.aguardando.length > 1
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS // 400
            } else {
                let result = await statusDAO.insertStatus(status)
                return result ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para listar todos os status
const listarStatus = async function() {
    try {
        let dadosStatus = {}
        let resultStatus = await statusDAO.selectAllStatus()

        if (resultStatus != false || typeof(resultStatus) == 'object') {
            if (resultStatus.length > 0) {
                dadosStatus.status = true
                dadosStatus.status_code = 200
                dadosStatus.item = resultStatus.length
                dadosStatus.statusInfo = resultStatus
                return dadosStatus // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para buscar status por ID
const buscarStatus = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRE_FIELDS // 400
        } else {
            let dadosStatus = {}
            let resultStatus = await statusDAO.selectStatusById(id)

            if (resultStatus != false || typeof(resultStatus) == 'object') {
                dadosStatus.status = true
                dadosStatus.status_code = 200
                dadosStatus.statusInfo = resultStatus
                return dadosStatus // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar um status
const atualizarStatus = async function(status, id, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                status.descricao == undefined || status.descricao == '' || status.descricao == null || status.descricao.length > 255 ||
                status.concluido == undefined || status.concluido == '' || status.concluido == null || status.concluido.length > 1 ||
                status.aguardando == undefined || status.aguardando == '' || status.aguardando == null || status.aguardando.length > 1 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS // 400
            } else {
                let resultBusca = await buscarStatus(id)

                if (resultBusca.status_code == 200) {
                    status.id = id
                    let result = await statusDAO.updateStatus(status)
                    return result ? MESSAGE.SUCCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else if (resultBusca.status_code == 404) {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para excluir um status
const excluirStatus = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRE_FIELDS // 400
        } else {
            let resultBusca = await buscarStatus(id)

            if (resultBusca.status_code == 200) {
                let result = await statusDAO.deleteStatus(id)
                return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            } else if (resultBusca.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND // 404
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirStatus,
    listarStatus,
    buscarStatus,
    atualizarStatus,
    excluirStatus
}
