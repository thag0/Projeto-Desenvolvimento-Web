import modLogin from './modulos/login.mjs'
import modFuncoes from './modulos/funcoes.mjs'

document.getElementById('botaoVoltar').addEventListener('click', modFuncoes.voltar);
document.getElementById('botaoConfirmar').addEventListener('click', function () {
	var email = document.getElementById('email').value
	var senha = document.getElementById('senha').value
	var novaSenha = document.getElementById('novaSenha').value

	email = email.trim()
	senha = senha.trim()
	novaSenha = novaSenha.trim()

	if (!email || !senha || !novaSenha) {
		window.alert("Por favor, preencha todos os campos.")
		return
	}

	if (senha === novaSenha) {
		window.alert("A nova senha não pode ser igual a atual.")
		return
	}

	modLogin.redefinirSenha(email, senha, novaSenha)
});

// Encontre o elemento de link Configurar
const linkConfigurar = document.querySelector('#apagarConta');

// Encontre o modal
const modal = document.getElementById('myModal');

// Encontre o elemento de fechar
const span = document.getElementsByClassName('close')[0];

// Quando o link Configurar for clicado, exiba o modal
linkConfigurar.addEventListener('click', function () {
	modal.style.display = 'block';
});

// Quando o usuário clicar em X, feche o modal
span.addEventListener('click', function () {
	modal.style.display = 'none';
});

// Quando o usuário clicar fora do modal, feche-o
window.addEventListener('click', function (event) {
	if (event.target === modal) {
		modal.style.display = 'none';
	}
});

const btnApagar = document.getElementById('botaoApagar');
btnApagar.addEventListener('click', function () {
	var email = document.getElementById('emailExclusao').value
	var senha = document.getElementById('senhaExclusao').value

	email = email.trim()
	senha = senha.trim()
	if(!email || !senha){
		window.alert('Por favor, preencha todos os campos.')
		return
	}

	modLogin.verificarExclusao(email, senha)
});
