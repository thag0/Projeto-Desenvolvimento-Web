const primeiraVisita = sessionStorage.getItem('firstVisit') === null

// Mostrar nome do usuário logado
if(primeiraVisita){
	localStorage.removeItem('usuarioLogado')
	sessionStorage.setItem('firstVisit', 'true')
}

// Limpar valores locais quando fechar a aba
window.addEventListener('beforeunload', function (){
	sessionStorage.removeItem('firstvisit')
	localStorage.removeItem('usuarioLogado')
});

// -------------

function selecionarFilme(idFilme){
	window.location.href = "pagFilme.html";
}

function barraCartaz(){
	var cartaz = document.getElementById("barraCartaz");
	var breve = document.getElementById("barraBreve");

	cartaz.style.display = "block";
	breve.style.display = "none";
}

function barraBreve(){
	var cartaz = document.getElementById("barraCartaz");
	var breve = document.getElementById("barraBreve");

	breve.style.display = "block";
	cartaz.style.display = "none";
}

/* para pagina adm*/
function barraFilme(){
	var filme = document.getElementById("barraFilme");
	var user = document.getElementById("barraUser");

	filme.style.display = "block";
	user.style.display = "none";
}

function barraUser(){
	var filme = document.getElementById("barraFilme");
	var user = document.getElementById("barraUser");

	user.style.display = "block";
	filme.style.display = "none";
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

/**
 * Mostra dinamicamente o nome do usuário logado ou uma 
 * mensagem de fazer cadastro
 */
function usuarioLogado(){
   const usuarioLogado = sessionStorage.getItem('usuarioLogado')
   const elemUsuarioLogado = document.getElementById("usuarioLogado")
   if(elemUsuarioLogado){
      if(usuarioLogado){
			var elmTextoLogin = document.getElementById('usuarioLogado')
			const usuarioAdmin = sessionStorage.getItem('usuarioAdmin')
			if(usuarioAdmin === "1"){
				elemUsuarioLogado.href = "pagAdmin.html"
   
			}else{
				elmTextoLogin.removeAttribute('href')
			}
   
         var imagem = document.getElementById('imgSair')
         imagem.style.display = 'block'
         elemUsuarioLogado.textContent = `Olá, ${usuarioLogado}`
   
      }else{
         elemUsuarioLogado.textContent = "Faça login ou cadastre-se"
         elemUsuarioLogado.href = "pagLogin.html"
      }
   }
}

/**
 * Retorna pra última página.
 */
function voltar(){
	window.history.back()
}

export default {
	selecionarFilme,
	barraCartaz,
	barraBreve,
	barraFilme,
	barraUser,
	moverDireita,
	moverEsquerda,
	usuarioLogado,
	voltar
}