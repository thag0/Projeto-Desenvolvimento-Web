import database from './database.js'

function recuperarFilme(){
  database.query('SELECT * FROM FILMES', (err, result) => {
      if(err){
         console.log(err)
      }
      if(result){
         console.log(result)
      }
   })
}

export default {
   recuperarFilme
}