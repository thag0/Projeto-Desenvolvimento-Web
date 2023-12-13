import modLogin from './modulos/login.mjs'
import modFuncoes from './modulos/funcoes.mjs'

document.getElementById('botaoConfirmar').addEventListener('click', modLogin.redefinirSenha);	
document.getElementById('botaoVoltar').addEventListener('click', modFuncoes.voltar);