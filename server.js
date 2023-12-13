import database from './public/script/modulos/database.mjs'
import express from 'express';
const app = new express();

app.use(express.static('./public'));
app.use(express.json())

//iniciar servidor
const porta = 3000;
app.listen(porta, () => {
	console.log(`(server) Servidor rodando em http://localhost:${porta}`);
});

const statusErro = 500
const statusAviso = 400

app.post('/cadastrar-usuario', (req, res) => {
   const { 
      nome, 
      email, 
      senha 
   } = req.body;

   if(!nome || !email || !senha){
      return res.status(statusAviso).json({ 
         error: true,
         message: 'Por favor, preencha todos os campos'
      });
   }

   const queryVerificarEmail = `SELECT * FROM usuarios WHERE email = '${email}'`;
   database.query(queryVerificarEmail, (err, result) => {
      if(err){
         const mensagem = 'Erro ao verificar e-mail existente'
         console.error('(server) ', mensagem, err);
         return res.status(statusErro).json({ 
            error: 'Erro ao verificar e-mail existente.',
            message: mensagem
         });
      }

      if(result.length > 0){
         return res.status(statusAviso).json({ 
				error: 'Este e-mail já está cadastrado.',
            message: 'Já existe um usuário cadastrado com este e-mail.'
			});
      }

      const queryCadastrar = `INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;
      database.query(queryCadastrar, (err, result) => {
         if(err){
            const mensagem = 'Erro ao verificar e-mail existente'
            console.error('(server) ', mensagem, err);
            return res.status(statusErro).json({ 
					error: true,
               message: mensagem
				});
         }

         const mensagem = 'Usuário cadastrado com sucesso.'
         console.log('(server) ', mensagem);
         res.json({
            sucess: true,
            message: mensagem
         });
      });
   });
});

app.post('/fazer-login', (req, res) => {
   const { 
      nome, 
      senha 
   } = req.body;

   const nomeFormatado = nome.trim()
   const queryVerificarLogin = `SELECT * FROM usuarios WHERE nome = '${nomeFormatado}' AND senha = '${senha}'`;
   database.query(queryVerificarLogin, (err, result) => {
      if(err){
         console.error('(server) Erro ao verificar login:', err)
         return res.status(statusErro).json({ 
            error: 'Erro ao verificar login.' 
         });
      }

      if(result.length > 0){
         console.log(`(server) Usuário '${result[0].nome}' logado.`)
         const usuario = result[0]
         res.json({
            login: true,
            nomeUsuario: usuario.nome,
            admin: usuario.admin
         });
      
      }else{
         console.log('(server) Nome de usuário ou senha incorretos.')
         res.status(statusAviso).json({ 
            error: 'Nome de usuário ou senha incorretos.' 
         });
      }
   });
});

app.post('/redefinir-senha', (req, res) => {
   const{
      email,
      senha,
      novaSenha
   } = req.body;

   const queryVerificarEmail = `SELECT * FROM usuarios WHERE email = '${email}'`
   database.query(queryVerificarEmail, (err, result) => {
      if(err){
         return res.status(statusErro).json({
            error: true,
            message: 'Erro ao consultar o email.'
         })
      }

      if(result.length > 0){
         //email econtrado
         const queryVerificarSenha = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}'`
         database.query(queryVerificarSenha, (err, result) =>{
            if(err){
               return res.status(statusErro).json({
                  error: true,
                  message: 'Senha não coincide com o regristro no banco de dados.'
               })
            }

            if(result.length > 0){
               //email e senha encontrados
               const queryAlterarSenha = `UPDATE usuarios SET senha = '${novaSenha}' WHERE email = '${email}' AND senha = '${senha}'`;
               database.query(queryAlterarSenha, (err, result) => {
                  if(err){
                     console.error(`(server) Erro ao redefinir a senha do usuário com email '${email}'`)
                  }
               
                  const mensagem = 'Senha redefinida.'
                  console.log('(server) ', mensagem)
                  return res.json({
                     sucess: true,
                     message: mensagem
                  })
               }) 
            }else{
               //senha errada
               const mensagem = 'A senha não coincide com o registro no banco de dados.'
               console.log('(server) ', mensagem)
               return res.status(statusErro).json({
                  error: true,
                  message: mensagem
               })
            }
         })
      }else{
         return res.status(statusAviso).json({
            error: true,
            message: 'Nenhum usuário encontrado com esse email.'
         })
      }
   })
})

app.post('/verificar-exclusao', (req, res) => {
   const {
      email,
      senha
   } = req.body;

   const queryVerificarEmail = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}'`
   database.query(queryVerificarEmail, (err, result) => {
      if(err){
         return res.status(statusErro).json({
            error: true,
            message: "(server) Erro ao fazer consulta no banco de dados."
         })

      }
      if(result.length > 0){
         return res.json({
            sucess: true,
            message: 'Usuário encontrado.'
         })
      
      }else{
         return res.json({
            error: true,
            message: 'Nenhum usuário encontrado com os campos fornecidos.'
         })
      }
   })
})

app.post('/excluir-usuario', (req, res) =>{
   const {
      email,
      senha
   } = req.body

   const queryRemoverUsuario = `DELETE FROM usuarios WHERE email = '${email}' AND senha = '${senha}'`
   database.query(queryRemoverUsuario, (err, result) =>{
      if(err){
         return res.json({
            error: true,
            message: 'Erro inesperado ao remover usuário'
         })
      }

      const mensagem = `Usuário removido`
      console.log('(server) ', mensagem)
      return res.json({
         sucess: true,
         message: mensagem
      })

   })
})

app.get('/recuperar-filme', (req, res) => {
   const idCartaz = req.query.idCartaz;
   if(!idCartaz){
      res.status(statusErro).send('O parâmetro idCartaz é obrigatório.');
      return;
   }

   const queryBuscarFilme = `SELECT * FROM FILMES WHERE id_filme = '${idCartaz}'`;
   database.query(queryBuscarFilme, (err, result) => {
      if(err){
         console.log(err);
         res.status(statusErro).send('Erro ao executar a consulta no banco de dados.');
      
      }else{
         res.json({
            message: result
         });
      }
   });
});

app.get('/recuperar-todos-filmes', (req, res) => {
   const queryBuscarFilme = `SELECT * FROM FILMES`;
   database.query(queryBuscarFilme, (err, result) => {
      if(err){
         console.log(err);
         res.status(statusErro).send('Erro ao executar a consulta no banco de dados.');
      
      }else{
         const filmes = result.map(filme => ({
            id: filme.id_filme,
            nome: filme.nome,
            elenco: filme.elenco,
            direcao: filme.direcao,
            genero: filme.genero,
            duracao: filme.duracao,
            sinopse: filme.sinopse,
            caminho_imagem: filme.caminho_imagem,
            caminho_classificacao: filme.caminho_classificacao,
         }));

         res.json({
            type: "filmes",
            message: filmes
         });
      }
   });
});

app.get('/recuperar-todos-usuarios', (req, res) => {
   const queryBuscarFilme = `SELECT * FROM USUARIOS`;
   database.query(queryBuscarFilme, (err, result) => {
      if(err){
         console.log(err);
         res.status(statusErro).send('Erro ao executar a consulta no banco de dados.');
      
      }else{
         res.json({
            type: "usuarios",
            message: result
         });
      }
   });
});