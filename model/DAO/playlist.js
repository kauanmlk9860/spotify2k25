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
const insertPlaylist = async function(playlist){
    try {
        let sql = `insert into tbl_playlist (
                                            titulo,
                                            descricao,
                                            foto_capa
                                            )
                                    values (
                                            '${playlist.nome}',
                                            '${playlist.descricao}',
                                            '${playlist.foto_capa}'
                                            )`
        //executa o script sql no banco de dados e aguarda o retorno do db
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
 insertPlaylist
}