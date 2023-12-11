import login from '/script/modulos/login.mjs'

const funcoesLogin = {
   fazerLogin: login.fazerLogin,
   voltar: login.voltar
}

document.getElementById('botaoEntrar').addEventListener('click', funcoesLogin.fazerLogin);	
document.getElementById('botaoVoltar').addEventListener('click', funcoesLogin.voltar);