import modLogin from './modulos/login.mjs'
import modFuncoes from './modulos/funcoes.mjs'

document.getElementById('botaoCadastrar').addEventListener('click', modLogin.cadastrarUsuario);	
document.getElementById('botaoVoltar').addEventListener('click', modFuncoes.voltar);