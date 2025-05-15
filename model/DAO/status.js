/**
 * Autor: Kauan Rodrigues 
 * Objetivo: Model responsável pelo CRUD de dados de status no banco de dados
 * Data: 15/05/2025
 * Versão: 1.0
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Função para inserir um novo status
const insertStatus = async function (status) {
    try {
        let sql = `INSERT INTO tbl_status (
                        descricao,
                        concluido,
                        aguardando
                   ) VALUES (
                        '${status.descricao}',
                        '${status.concluido}',
                        '${status.aguardando}'
                   )`

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para atualizar um status existente
const updateStatus = async function (status) {
    try {
        let sql = `UPDATE tbl_status SET
                      descricao = '${status.descricao}',
                      concluido = '${status.concluido}',
                      aguardando = '${status.aguardando}'
                   WHERE id = ${status.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para deletar um status pelo ID
const deleteStatus = async function (id) {
    try {
        let sql = `DELETE FROM tbl_status WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para retornar todos os status
const selectAllStatus = async function () {
    try {
        let sql = `SELECT * FROM tbl_status ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        return result.length > 0 ? result : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para retornar um status por ID
const selectStatusById = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_status WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        return result.length > 0 ? result[0] : false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertStatus,
    updateStatus,
    deleteStatus,
    selectAllStatus,
    selectStatusById
}
