import login from '/script/modulos/login.mjs'

const funcoesRedefinir = {
   redefinirSenha: login.redefinirSenha,
   voltar: login.voltar
}

document.getElementById('botaoConfirmar').addEventListener('click', funcoesRedefinir.redefinirSenha);	
document.getElementById('botaoVoltar').addEventListener('click', funcoesRedefinir.voltar);