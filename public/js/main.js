const primeiraVisita = sessionStorage.getItem('firstVisit') === null

// Mostrar nome do usuário logado
if(primeiraVisita){
   localStorage.removeItem('nomeUsuario')
   sessionStorage.setItem('firstVisit', 'true')
}

// Limpar valores locais quando fechar a aba
window.addEventListener('beforeunload', function () {
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

const chk = document.getElementById('chk')

chk.addEventListener('change', () => {
  document.body.classList.toggle('tema')
})

function Login(){
  location.href="telaLogin.html"
}
function executaAcao(){
    location.href = "pagFilme.html";
}

function passarFilmes(){
  if(true){
      //passe para direita
  }else{
      //passe para esqueda
  }
  
}

function baCartaz() {
	var cartaz = document.getElementById("barraCartaz");
	var breve = document.getElementById("barraBreve");

	cartaz.style.display = "block";
	breve.style.display = "none";
}

function baBreve() {
	var cartaz = document.getElementById("barraCartaz");
	var breve = document.getElementById("barraBreve");

	breve.style.display = "block";
	cartaz.style.display = "none";
}

let filmes = ["f1", "f2", "f3", "f4"];

function moverDireita() {
	let ultimoFilme = filmes.pop();
	filmes.unshift(ultimoFilme);
	rearranjarFilmes();
}

function moverEsquerda() {
	let primeiroFilme = filmes.shift();
	filmes.push(primeiroFilme);
	rearranjarFilmes();
}

function rearranjarFilmes() {
	let conteudo = document.querySelector('.conteudo');
	filmes.forEach(filmeId => {
		let filme = document.getElementById(filmeId);
		conteudo.appendChild(filme);
	});
}