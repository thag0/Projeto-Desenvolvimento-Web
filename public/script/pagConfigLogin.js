import modFuncoes from './modulos/funcoes.mjs'

document.getElementById('botaoVoltar').addEventListener('click', modFuncoes.voltar);
// Encontre o elemento de link Configurar
const linkConfigurar = document.querySelector('#apagarConta');

// Encontre o modal
const modal = document.getElementById('myModal');

// Encontre o elemento de fechar
const span = document.getElementsByClassName('close')[0];

// Quando o link Configurar for clicado, exiba o modal
linkConfigurar.addEventListener('click', function() {
  modal.style.display = 'block';
});

// Quando o usuário clicar em X, feche o modal
span.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Quando o usuário clicar fora do modal, feche-o
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Adicione aqui a lógica para o botão Apagar (btnApagar)
const btnApagar = document.getElementById('btnApagar');
btnApagar.addEventListener('click', function() {
  // Adicione aqui a lógica para apagar o login
  // Por exemplo, pode ser uma chamada AJAX para o servidor para processar a exclusão
  // Depois de apagar com sucesso, feche o modal: modal.style.display = 'none';
});
