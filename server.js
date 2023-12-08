const express = require('express');
const database = require('./public/js/database.js')
const app = express();

app.use(express.static('./public'));
app.use(express.json())

//iniciar servidor
const porta = 3000;
app.listen(porta, () => {
	console.log(`(server) Servidor rodando em http://localhost:${porta}`);
});

app.get('/consulta', (req, res) => {
   const q = 'SELECT * FROM teste'

   database.query(q, (err, result) => {
      if(err){
         res.status(500).send('(server) Erro ao executar a consulta');
      
		}else{
			if(result){
				res.json(result);
			
			}else{
				console.log('(server) resposta da query vazia.')
			}
      }
   });
});

app.post('/cadastrar-usuario', (req, res) => {
   const { nome, email, senha } = req.body;

   if(!nome || !email || !senha){
      return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
   }

   const queryVerificarEmail = `SELECT * FROM usuarios WHERE email = '${email}'`;
   database.query(queryVerificarEmail, (err, result) => {
      if(err){
         console.error('(server) Erro ao verificar e-mail existente:', err);
         return res.status(500).json({ error: 'Erro ao verificar e-mail existente.' });
      }

      if(result.length > 0){
         return res.status(400).json({ 
				error: 'Este e-mail já está cadastrado.',
            message: 'Já existe um usuário cadastrado com este e-mail.'
			});
      }

      const queryCadastrar = `INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;
      database.query(queryCadastrar, (err, result) => {
         if(err){
            console.error('(server) Erro ao cadastrar usuário:', err);
            return res.status(500).json({ 
					error: 'Erro ao cadastrar usuário.' 
				});
         }

         console.log('(server) Usuário cadastrado com sucesso.');
         res.json({
            sucess: true 
         });
      });
   });
});

app.post('/verificar-login', (req, res) => {
   const { 
      nome, 
      senha 
   } = req.body;

   const nomeFormatado = nome.trim()
   const queriVerificarLogin = `SELECT * FROM usuarios WHERE nome = '${nomeFormatado}' AND senha = '${senha}'`;
   database.query(queriVerificarLogin, (err, result) => {
      if(err){
         console.error('(server) Erro ao verificar login:', err);
         return res.status(500).json({ 
            error: 'Erro ao verificar login.' 
         });
      }

      if(result.length > 0){
         console.log('(server) Login bem-sucedido.');
         const nomeUsuario = result[0].nome
         res.json({
            login: true,
            nomeUsuario: nomeUsuario
         });
      
      }else{
         console.log('(server) Nome de usuário ou senha incorretos.');
         res.status(401).json({ 
            error: 'Nome de usuário ou senha incorretos.' 
         });
      }
   });
});