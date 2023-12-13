import modLogin from './modulos/login.mjs'
import modFuncoes from './modulos/funcoes.mjs'

document.getElementById('botaoCadastrar').addEventListener('click', function (){
   var email = document.getElementById('email').value
   var senha = document.getElementById('senha').value
   var confirmar = document.getElementById('confirmarSenha').value

   if(!email || !senha || !confirmar){
      window.alert("Preencha todos os campos.")
      return
   }

   email = email.trim()
   senha = senha.trim()
   confirmar = confirmar.trim()

   if(senha === confirmar){
      modLogin.redefinirSenha(email, senha)

   }else{
      window.alert('As senhas não coincidem.')
   }
})

document.getElementById('botaoVoltar').addEventListener('click', modFuncoes.voltar)