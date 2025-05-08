/**
 * Autor: Kauan Rodrigues 
 * objetivo: model responsável pelo CRUD de dados de usuários no banco de dados
 * data: 24/04/2025
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir um novo usuário no banco de dados
const insertUsuario = async function(usuario){
    try {
        let sql = `insert into tbl_usuario (
                                            nome,
                                            username,
                                            email,
                                            senha
                                            )
                                    values (
                                            '${usuario.nome}',
                                            '${usuario.username}',
                                            '${usuario.email}',
                                            '${usuario.senha}'
                                            )`
        //executa o script sql no banco de dados e aguarda o retorno do db
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
      console.log(error)
        return false
    }
}

//função para atualizar um usuário existente no banco de dados
const updateUsuario = async function(usuario){
    try {
        let sql = `update tbl_usuario set nome = '${usuario.nome}',
                                          username = '${usuario.username}',
                                          email = '${usuario.email}',
                                          senha = '${usuario.senha}'
                                where id=${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

        } catch (error) {
            return false
        }
}

//função para excluir uma usuário existente no banco de dados
const deleteUsuario = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_usuario where id='+id

        //executa o script
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todos os usuarios do banco de dados
const selectAllUsuario = async function(){
    try {
        let sql = 'select * from tbl_usuario order by id desc'

        //executa o script sql no db e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//função para listar um usuário pelo ID no banco de dados
const selectByIdUsuario = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_usuario where id='+id

        //executa o script
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}