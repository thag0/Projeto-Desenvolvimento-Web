const primeiraVisita = sessionStorage.getItem('firstVisit') === null

// Mostrar nome do usuário logado
if (primeiraVisita){
	localStorage.removeItem('nomeUsuario')
	sessionStorage.setItem('firstVisit', 'true')
}

// Limpar valores locais quando fechar a aba
window.addEventListener('beforeunload', function (){
	sessionStorage.removeItem('firstvisit')
	localStorage.removeItem('nomeUsuario')
});

//mostrar mensagem dinamicamente
const nomeUsuario = sessionStorage.getItem('nomeUsuario')
const elemNomeUsuario = document.getElementById("nomeUsuario")
if(elemNomeUsuario){
	if(nomeUsuario){
		elemNomeUsuario.textContent = `Olá, ${nomeUsuario}`

	}else{
		elemNomeUsuario.textContent = "Faça login ou cadastre-se"
	}
}

// -------------

function login(){
	location.href = "telaLogin.html"
}

function executaAcao(){
	location.href = "pagFilme.html";
}

function baCartaz(){
	var cartaz = document.getElementById("barraCartaz");
	var breve = document.getElementById("barraBreve");

	cartaz.style.display = "block";
	breve.style.display = "none";
}

function baBreve(){
	var cartaz = document.getElementById("barraCartaz");
	var breve = document.getElementById("barraBreve");

	breve.style.display = "block";
	cartaz.style.display = "none";
}

function moverDireita(){
	const container = document.querySelector('.container');
	const filmes = container.querySelectorAll('.item');
	const ultimoFilme = filmes[filmes.length - 1];
	container.insertBefore(ultimoFilme, filmes[0]);
}

function moverEsquerda(){
	const container = document.querySelector('.container');
	const filmes = container.querySelectorAll('.item');
	const primeiroFilme = filmes[0];
	container.appendChild(primeiroFilme);
}

export default {
	Login: login,
	executaAcao,
	baCartaz,
	baBreve,
	moverDireita,
	moverEsquerda
}