import modFuncoes from '/script/modulos/funcoes.mjs';
import modLogin from '/script/modulos/login.mjs';

modFuncoes.usuarioLogado()

document.getElementById('botaoMoverEsquerda').addEventListener('click', modFuncoes.moverDireita);
document.getElementById('botaoMoverDireita').addEventListener('click', modFuncoes.moverEsquerda);
document.getElementById('emCartaz').addEventListener('click', modFuncoes.barraCartaz);
document.getElementById('emBreve').addEventListener('click', modFuncoes.barraBreve);
document.getElementById('imgSair').addEventListener('click', modLogin.logoff);


function salvarId(id){
   sessionStorage.setItem('idFilmeSelecionado', id)
}

document.getElementById('cartaz1').addEventListener('click', function () {
   const idFilme = this.id
   salvarId(idFilme)
   modFuncoes.selecionarFilme(idFilme)
});
document.getElementById('cartaz2').addEventListener('click', function () {
   const idFilme = this.id
   salvarId(idFilme)
   modFuncoes.selecionarFilme(idFilme)
});
document.getElementById('cartaz3').addEventListener('click', function () {
   const idFilme = this.id
   salvarId(idFilme)
   modFuncoes.selecionarFilme(idFilme)
});
document.getElementById('cartaz4').addEventListener('click', function () {
   const idFilme = this.id
   salvarId(idFilme)
   modFuncoes.selecionarFilme(idFilme)
});