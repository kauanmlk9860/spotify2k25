/**
 * Autor: Kauan Rodrigues 
 * Objetivo: Model responsável pelo CRUD de dados de status no banco de dados
 * Data: 15/05/2025
 * Versão: 1.1
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir um novo status
const insertStatus = async function (status) {
    try {
        let sql = `INSERT INTO tbl_status (status)
                   VALUES ('${status.status}')`

        let result = await prisma.$executeRawUnsafe(sql)

        return result > 0
    } catch (error) {
        console.log(error)
        return false
    }
}

// Atualizar um status existente
const updateStatus = async function (status) {
    try {
        let sql = `UPDATE tbl_status SET
                      status = '${status.status}'
                   WHERE id = ${status.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result > 0
    } catch (error) {
        console.log(error)
        return false
    }
}

// Excluir um status por ID
const deleteStatus = async function (id) {
    try {
        let sql = `DELETE FROM tbl_status WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result > 0
    } catch (error) {
        console.log(error)
        return false
    }
}

// Listar todos os status
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

// Buscar um status por ID
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
