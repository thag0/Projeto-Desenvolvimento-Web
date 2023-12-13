import modFuncoes from './modulos/funcoes.mjs'

document.getElementById('botaoVoltar').addEventListener('click', modFuncoes.voltar)
document.getElementById('botaoConfirmar').addEventListener('click', function(){
   console.log("Implementar redefinição de senha por email.")
})