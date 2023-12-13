/**
 * Cadastra o usuário no banco de dados usando os valores
 * pegos nos campos.
 */
function cadastrarUsuario(){
	var nome = document.getElementById('nome').value;
	var email = document.getElementById('email').value;
	var senha = document.getElementById('senha').value;
	var confirmarSenha = document.getElementById('confirmar_senha').value;

	nome = nome.trim()
	email = email.trim()
	senha = senha.trim()
	confirmarSenha = confirmarSenha.trim()

	if(senha !== confirmarSenha){
		alert('As senhas não coincidem. Verifique os campos.');
		return;
	}

	const usuario = {
		nome: nome,
		email: email,
		senha: senha
	};

	fetch('/cadastrar-usuario', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(usuario)
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
		
		if(data.sucess){
			window.location.href = '/index.html';
		}
		if(data.error){
			window.alert(data.message)
		}
	})
	.catch(error => {
		console.error('Erro ao cadastrar usuário:', error);
	});
}

/**
 * Consulta no banco de dados as informações de nome e senha
 * do usuário.
 */
function fazerLogin(){
   const nome = document.getElementById("nomeLogin").value;
   const senha = document.getElementById("senhaLogin").value;

   const usuario = {
      nome: nome,
      senha: senha
   };

   fetch('/fazer-login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
   })
   .then(response => response.json())
   .then(data => {
      if(data.login){
			const nomeUsuario = document.getElementById('nomeLogin')
         if(nomeUsuario){
				sessionStorage.setItem('usuarioLogado', data.nomeUsuario)
				if(data.admin){
					sessionStorage.setItem('usuarioAdmin', data.admin)
					window.location.href = '/pagAdmin.html'
				
				}else{
					window.location.href = '/index.html'
				}
			}
      
		}else{
         alert('Nome de usuário ou senha incorretos.')
      }
   })
   .catch(error => {
      console.error('Erro ao realizar login:', error)
   });
}

/**
 * Remove o usuário logado da sessão atual
 */
function logoff(){
	const pagina = window.location.href
	const nomeUsuario = sessionStorage.getItem('usuarioLogado')
	const usuarioAdmin = sessionStorage.getItem('usuarioAdmin')
	if(nomeUsuario){
		sessionStorage.removeItem('usuarioLogado')

		if(usuarioAdmin){
			sessionStorage.removeItem('usuarioAdmin')
			window.location.href = window.location.href = 'index.html';
		}else{
			window.location.href = pagina;
		}

	}
}

function redefinirSenha(email){
	console.log(email);
}

function mouseoverPass(obj){
	var obj = document.getElementById('senha');
	obj.type = "text";
}

function mouseoutPass(obj){
	var obj = document.getElementById('senha');
	obj.type = "password";
}

function mouseoverPass2(obj){
	var obj2 = document.getElementById('confirmar_senha');
	obj2.type = "text";
}

function mouseoutPass2(obj){
	var obj2 = document.getElementById('confirmar_senha');
	obj2.type = "password";
}

export default {
	cadastrarUsuario,
	fazerLogin,
	logoff,
	redefinirSenha,
	mouseoverPass,
	mouseoutPass,
	mouseoverPass2,
	mouseoutPass2
}   