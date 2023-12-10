document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById('btnEscolher');
    var closeButton = document.querySelector('.modal-content .close');
  
    // Verifique se os elementos foram selecionados corretamente
    console.log(modal, btn, closeButton);
  
    // Quando o usuário clica no botão, abre o modal
    btn.onclick = function() {
      modal.style.display = 'block';
    }
  
    // Quando o usuário clica no ícone "X", fecha o modal
    closeButton.onclick = function() {
      modal.style.display = 'none';
    }
  
    // Quando o usuário clica fora do modal, fecha o modal
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  });
  