/**
 * Autor: Kauan Rodrigues 
 * Objetivo: Model responsável pelo CRUD de dados de playlists no banco de dados
 * Data: 24/04/2025
 * Versão: 1.0
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Função para inserir uma nova playlist
const insertPlaylist = async function (playlist) {
    try {
        let sql = `INSERT INTO tbl_playlist (
                        titulo,
                        descricao,
                        foto_capa
                   ) VALUES (
                        '${playlist.nome}',
                        '${playlist.descricao}',
                        '${playlist.foto_capa}'
                   )`

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para atualizar uma playlist existente
const updatePlaylist = async function (playlist) {
    try {
        let sql = `UPDATE tbl_playlist SET
                      titulo = '${playlist.nome}',
                      descricao = '${playlist.descricao}',
                      foto_capa = '${playlist.foto_capa}'
                   WHERE id = ${playlist.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para deletar uma playlist pelo ID
const deletePlaylist = async function (id) {
    try {
        let sql = `DELETE FROM tbl_playlist WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para retornar todas as playlists
const selectAllPlaylists = async function () {
    try {
        let sql = `SELECT * FROM tbl_playlist ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        return result.length > 0 ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para retornar uma playlist por ID
const selectPlaylistById = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_playlist WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        return result.length > 0 ? result[0] : false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertPlaylist,
    updatePlaylist,
    deletePlaylist,
    selectAllPlaylists,
    selectPlaylistById
}
