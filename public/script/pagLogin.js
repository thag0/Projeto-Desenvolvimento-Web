import modLogin from './modulos/login.mjs'
import modFuncoes from './modulos/funcoes.mjs'

document.getElementById('botaoEntrar').addEventListener('click', modLogin.fazerLogin);	
document.getElementById('botaoVoltar').addEventListener('click', modFuncoes.voltar);