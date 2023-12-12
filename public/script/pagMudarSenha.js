import modLogin from './modulos/login.mjs'

document.getElementById('botaoConfirmar').addEventListener('click', modLogin.redefinirSenha);	
document.getElementById('botaoVoltar').addEventListener('click', modLogin.voltar);