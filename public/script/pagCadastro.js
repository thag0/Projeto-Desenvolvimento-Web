import login from '/script/modulos/login.mjs'

const funcoesCadastro = {
   fazerCadastro: login.cadastrarUsuario,
   voltar: login.voltar
}

document.getElementById('botaoCadastrar').addEventListener('click', funcoesCadastro.fazerCadastro);	
document.getElementById('botaoVoltar').addEventListener('click', funcoesCadastro.voltar);