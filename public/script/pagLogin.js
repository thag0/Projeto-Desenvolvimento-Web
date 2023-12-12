import modLogin from './modulos/login.mjs'

document.getElementById('botaoEntrar').addEventListener('click', modLogin.fazerLogin);	
document.getElementById('botaoVoltar').addEventListener('click', modLogin.voltar);