import modFilme from './modulos/filme.mjs';
import modLogin from './modulos/login.mjs';

const usuarioLogado = sessionStorage.getItem('usuarioLogado')
const elemUsuarioLogado = document.getElementById("usuarioLogado")
if(elemUsuarioLogado){
	if(usuarioLogado){
		var imagem = document.getElementById('imgSair')
		imagem.style.display = 'block'
		elemUsuarioLogado.textContent = `Olá, ${usuarioLogado}`
        elemUsuarioLogado.removeAttribute('href')

	}else{
		elemUsuarioLogado.textContent = "Faça login ou cadastre-se"
		elemUsuarioLogado.href = "pagLogin.html"
	}
}

document.getElementById('imgSair').addEventListener('click', modLogin.logoff);

document.addEventListener('DOMContentLoaded', function() {
    var divUsuario = document.querySelector('.telaAdmUsuario');
    divUsuario.style.display = 'none';

    // ------------
    modFilme.recuperarTodosFilmes()
    modFilme.recuperarTodosUsuarios()

    var filmes
    var usuarios
    const filmesRecuperados = sessionStorage.getItem('admFilmesRecuperados')
    if(filmesRecuperados){
        filmes = JSON.parse(filmesRecuperados)
        
    }else{
        console.log('(pagAdmin) erro ao recuperar os dados de filmes');
    }

    const usuariosRecuperados = sessionStorage.getItem('admUsuariosRecuperados')
    if(usuariosRecuperados){
        usuarios = JSON.parse(usuariosRecuperados)

    }else{
        console.log('(pagAdmin) erro ao recuperar os dados de filmes');
    }


    function preencherTabela(tabelaID, dados){
        const tabela = document.getElementById(tabelaID);
        const corpoTabela = tabela.querySelector('tbody');

        // Remove todas as linhas existentes da tabela
        corpoTabela.innerHTML = '';

        dados.forEach(item => {
            const newRow = corpoTabela.insertRow();

            Object.keys(item).forEach((key, index) => {
                const cell = newRow.insertCell(index);
                cell.textContent = item[key];
            });

            const cellEditar = newRow.insertCell(-1);
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            cellEditar.appendChild(btnEditar);

            const cellRemover = newRow.insertCell(-1);
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            cellRemover.appendChild(btnRemover);
        });
    }

    // Preencher a tabela de filmes ao carregar a página
    window.addEventListener('load', function(){
        preencherTabela('tabelaFilmes', filmes);
    });

    // Preencher a tabela de usuários quando o botão "Usuários" for clicado
    window.addEventListener('click', function(){
        preencherTabela('tabelaUsuarios', usuarios);
    });
});

document.getElementById('telaAdmFilmes').addEventListener('click', function () {
    const id = this.id
    mostrarDiv(id)
 });

document.getElementById('telaAdmUsuario').addEventListener('click', function () {
    const id = this.id
    mostrarDiv(id)
 });

function mostrarDiv(nomeDiv){
    var divs = document.querySelectorAll('.telas > div');
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].classList.contains(nomeDiv)){
            divs[i].style.display = 'block';
        } else {
            divs[i].style.display = 'none';
        }
    }
}
