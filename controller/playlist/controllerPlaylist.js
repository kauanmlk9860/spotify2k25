/**
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de playlist
 * Data: 17/04/2025
 * Autor: Kauan Rodrigues 
 * Versão: 1.0
 */

// Import do arquivo de configurações de mensagens de status code
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO de playlist para manipular o DB
const playlistDAO = require('../../model/DAO/playlist.js')

// Função para inserir uma nova playlist
const inserirPlaylist = async function (playlist, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !playlist.titulo || playlist.titulo.length > 80 ||
                !playlist.descricao || playlist.descricao.length > 200 ||
                !playlist.foto_capa || playlist.foto_capa.length > 200
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS // 400
            } else {
                let result = await playlistDAO.insertPlaylist(playlist)

                if (result)
                    return MESSAGE.SUCCESS_CREATED_ITEM // 201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar uma playlist existente
const atualizarPlaylist = async function (playlist, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !playlist.titulo || playlist.titulo.length > 80 ||
                !playlist.descricao || playlist.descricao.length > 200 ||
                !playlist.foto_capa || playlist.foto_capa.length > 200 ||
                !id || isNaN(id) || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS // 400
            } else {
                let resultBusca = await buscarPlaylist(id)

                if (resultBusca.status_code === 200) {
                    playlist.id = id
                    let result = await playlistDAO.updatePlaylist(playlist)

                    if (result)
                        return MESSAGE.SUCCESS_UPDATED_ITEM // 200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else if (resultBusca.status_code === 404) {
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

// Função para excluir uma playlist existente
const excluirPlaylist = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRE_FIELDS // 400
        } else {
            let resultBusca = await buscarPlaylist(id)

            if (resultBusca.status_code === 200) {
                let result = await playlistDAO.deletePlaylist(id)

                if (result)
                    return MESSAGE.SUCCESS_DELETED_ITEM // 200
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            } else if (resultBusca.status_code === 404) {
                return MESSAGE.ERROR_NOT_FOUND // 404
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para listar todas as playlists
const listarPlaylist = async function () {
    try {
        let result = await playlistDAO.selectAllPlaylists()

        if (result && typeof result === 'object') {
            if (result.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    quantidade: result.length,
                    playlists: result
                }
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

// Função para buscar uma playlist pelo ID
const buscarPlaylist = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRE_FIELDS // 400
        } else {
            let result = await playlistDAO.selectPlaylistById(id)

            if (result && typeof result === 'object') {
                return {
                    status: true,
                    status_code: 200,
                    playlist: result
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirPlaylist,
    atualizarPlaylist,
    excluirPlaylist,
    listarPlaylist,
    buscarPlaylist
}
