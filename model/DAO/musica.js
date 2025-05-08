/*

* Objetivo: Model responsável pelo CRUD de dados de música no Banco de Dados 
* Data: 13/02/25
* Autor: Kauan 
* Versão: 1.0
*/

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir uma nova música no banco de dados
const insertMusica = async function(musica){
try {
        
    let sql = `insert into tbl_musica ( nome,
                                        link,
                                        duracao,
                                        data_lancamento,
                                        foto_capa,
                                        letra
                                        )
                                values (
                                        '${musica.nome}',
                                        '${musica.link}',
                                        '${musica.duracao}',
                                        '${musica.data_lancamento}',
                                        '${musica.foto_capa}',
                                        '${musica.letra}'
                                        )`



    //executa o script SQL no DB e aguarda o retorno do DB
    let result = await prisma.$executeRawUnsafe(sql)


    if(result){
        return true
    }else{
        return false
    }

    } catch (error){
        return false
    }
}

//função para atualizar uma música existente no banco de dados
const updateMusica = async function(musica){
    try {
        
        let sql = `update tbl_musica set nome =              '${musica.nome}',
                                         link =              '${musica.link}',
                                         duracao =           '${musica.duracao}',
                                         data_lancamento =   '${musica.data_lancamento}',
                                         foto_capa =         '${musica.foto_capa}',
                                         letra =             '${musica.letra}'
        where id=${musica.id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

//função para excluir uma música existente no banco de dados
const deleteMusica = async function(id){
    try {
       
        //Script SQL 
        let sql = 'delete from tbl_musica where id='+id
    
    
        //Exeuta o script SQL no BD e aguada o retorno dos daods 
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true
        else 
            return false
    
    
    } catch (error) {
        return false 
    }
}

//função para retornar todas as músicas do banco de dados
const selectAllMusica = async function(){
try {

    //Script SQL 
    let sql = 'select * from tbl_musica order by id desc'


    //Exeuta o script SQL no BD e aguada o retorno dos daods 
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else 
        return false


} catch (error) {
    return false 
}
}

//função para listar uma música pelo ID no banco de dados
const selectByIdMusica = async function(id){
    try {
       
    //Script SQL 
    let sql = 'select * from tbl_musica where id='+id


    //Exeuta o script SQL no BD e aguada o retorno dos daods 
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
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}