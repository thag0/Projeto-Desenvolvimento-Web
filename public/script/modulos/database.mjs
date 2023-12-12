import mysql from 'mysql';

// logar mysql
// mysql -h localhost -u root -p

const conexao = mysql.createConnection({
   connectionLimit: 1,
   host: 'localhost',
   user: 'root',
   password: '2020',
   database: 'CINEMA'
})

conexao.connect((err) => {
   if(err){
      console.error(`(database) Erro ao conectar ao banco de dados "${conexao.config.database}"`, err);
   
   }else{
      console.log(`(database) Conectado ao banco de dados "${conexao.config.database}"`);
   }
})

function query(sql, callback){
   conexao.query(sql, (err, result) => {
      if(err){
         console.error('(database) Erro ao executar a query:', err);
      }else{
         console.log(`(database) Query "${sql}" realizada com sucesso.`);
      }
      callback(err, result);
   });
}

export default {
   query,
   conexao
}