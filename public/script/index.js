import funcoes from '/script/modulos/funcoes.mjs';
import login from '/script/modulos/login.mjs';

//informações do usuário logado
const elmUsuarioLogado = sessionStorage.getItem('usuarioLogado')
if(elmUsuarioLogado){
   var elmTextoLogin = document.getElementById('usuarioLogado')
   elmTextoLogin.removeAttribute('href')
   
}else{
   var elmTextoLogin = document.getElementById('usuarioLogado')
   elmTextoLogin.href = "pagLogin.html"
}

const funcoesMain = {
   moverDireita: funcoes.moverDireita,
   moverEsquerda: funcoes.moverEsquerda,
   selecionarFilme: funcoes.selecionarFilme,
   emCartaz: funcoes.barraCartaz,
   emBreve: funcoes.barraBreve,
   logoff: login.logoff
}

function salvarId(id){
   sessionStorage.setItem('idFilmeSelecionado', id)
}

document.getElementById('cartaz1').addEventListener('click', function () {
   const idFilme = this.id
   salvarId(idFilme)
   funcoesMain.selecionarFilme(idFilme)
});
document.getElementById('cartaz2').addEventListener('click', function () {
   const idFilme = this.id
   salvarId(idFilme)
   funcoesMain.selecionarFilme(idFilme)
});
document.getElementById('cartaz3').addEventListener('click', function () {
   const idFilme = this.id
   salvarId(idFilme)
   funcoesMain.selecionarFilme(idFilme)
});
document.getElementById('cartaz4').addEventListener('click', function () {
   const idFilme = this.id
   salvarId(idFilme)
   funcoesMain.selecionarFilme(idFilme)
});


document.getElementById('botaoMoverEsquerda').addEventListener('click', funcoesMain.moverDireita);
document.getElementById('botaoMoverDireita').addEventListener('click', funcoesMain.moverEsquerda);

document.getElementById('emCartaz').addEventListener('click', funcoesMain.emCartaz);
document.getElementById('emBreve').addEventListener('click', funcoesMain.emBreve);

document.getElementById('imgSair').addEventListener('click', funcoesMain.logoff);