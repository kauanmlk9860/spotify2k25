/**
 * Autor: Kauan Rodrigues
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de status
 * Data: 15/05/2025
 * Versão: 1.1
 */

const statusDAO = require('../../model/DAO/status.js')
const MESSAGE = require('../../modulo/config.js')

// Inserir novo status
const inserirStatus = async function (dadosStatus, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (dadosStatus.status == undefined || dadosStatus.status == '' || dadosStatus.status.length > 100) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                const result = await statusDAO.insertStatus(dadosStatus)
                return result ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Listar todos os status
const listarStatus = async function () {
    try {
        const dados = await statusDAO.selectAllStatus()
        if (dados && dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                quantidade: dados.length,
                status_itens: dados
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Buscar status por ID
const buscarStatus = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return MESSAGE.ERROR_REQUIRE_FIELDS

        const dados = await statusDAO.selectStatusById(id)
        return dados ? {
            status: true,
            status_code: 200,
            status_item: dados
        } : MESSAGE.ERROR_NOT_FOUND
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Atualizar status por ID
const atualizarStatus = async function (dadosStatus, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                dadosStatus.status == undefined || dadosStatus.status == '' || dadosStatus.status.length > 100 ||
                id == undefined || id == '' || isNaN(id)
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                dadosStatus.id = id
                const result = await statusDAO.updateStatus(dadosStatus)
                return result ? MESSAGE.SUCCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Excluir status por ID
const excluirStatus = async function (id) {
    try {
        if (id == '' || id == undefined || isNaN(id) || id <= 0)
            return MESSAGE.ERROR_REQUIRE_FIELDS

        const result = await statusDAO.deleteStatus(id)
        return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_NOT_FOUND
    } catch {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirStatus,
    listarStatus,
    buscarStatus,
    atualizarStatus,
    excluirStatus
}
