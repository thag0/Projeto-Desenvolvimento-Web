import modFilme from './modulos/filme.mjs'
import modLogin from './modulos/login.mjs'
// import modDatabase from './modulos/database.mjs'

const usuarioLogado = sessionStorage.getItem('usuarioLogado')
const elemUsuarioLogado = document.getElementById("usuarioLogado")
if (elemUsuarioLogado){
    if(usuarioLogado){
        var imagem = document.getElementById('imgSair')
        imagem.style.display = 'block'
        elemUsuarioLogado.textContent = `Olá, ${usuarioLogado}`
        elemUsuarioLogado.removeAttribute('href')
    }else{
        elemUsuarioLogado.textContent = "Faça login ou cadastre-se";
        elemUsuarioLogado.href = "pagLogin.html"
    }
}

document.getElementById('imgSair').addEventListener('click', modLogin.logoff);

try{
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
        console.log('(pagAdmin) erro ao recuperar os dados de filmes')
    }

    preencherTabela('tabelaFilmes', filmes)
    preencherTabela('tabelaUsuarios', usuarios)

}catch(error){
    console.error('Erro ao recuperar dados do banco:', error)
}

function preencherTabela(tabelaID, dados) {
    const tabela = document.getElementById(tabelaID);
    const corpoTabela = tabela.querySelector('tbody');

    corpoTabela.innerHTML = '';
    dados.forEach(item => {
        const newRow = corpoTabela.insertRow();

        Object.keys(item).forEach((key, index) => {
            const cell = newRow.insertCell(index);
            cell.textContent = item[key];
        });

        // Aqui você pode adicionar botões de edição e remoção, se necessário
        // ...

    });
}

const tabelaFilmes = document.getElementById('tabelaFilmes').getElementsByTagName('tbody')[0];
const novaLinhaFilme = tabelaFilmes.insertRow();
novaLinhaFilme.classList.add('edit-row');
novaLinhaFilme.style.display = 'none';

const colunasFilmes = [
    'ID do Cartaz', 
    'Título', 
    'Elenco', 
    'Direção', 
    'Gênero', 
    'Duração', 
    'Sinopse', 
    'Imagem', 
    'Classificação'
];

colunasFilmes.forEach(coluna => {
    const novaCelula = novaLinhaFilme.insertCell();
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('editable');
    input.setAttribute('placeholder', coluna);
    novaCelula.appendChild(input);
});

const botoesCelulaFilme = novaLinhaFilme.insertCell();
const btnEditarFilme = document.createElement('button');
btnEditarFilme.textContent = 'Editar';
btnEditarFilme.classList.add('edit-button');
botoesCelulaFilme.appendChild(btnEditarFilme);

const btnRemoverFilme = document.createElement('button');
btnRemoverFilme.textContent = 'Remover';
btnRemoverFilme.classList.add('remove-button');
botoesCelulaFilme.appendChild(btnRemoverFilme);

const btnSaveFilme = document.createElement('button');
btnSaveFilme.textContent = 'Salvar';
btnSaveFilme.classList.add('save-button');
botoesCelulaFilme.appendChild(btnSaveFilme);

const tabelaUsuarios = document.getElementById('tabelaUsuarios').getElementsByTagName('tbody')[0];
const novaLinhaUsuario = tabelaUsuarios.insertRow();
novaLinhaUsuario.classList.add('edit-row');
novaLinhaUsuario.style.display = 'none';

const colunasUsuarios = [
    'Id', 
    'Nome', 
    'Email', 
    'Senha',
];

colunasUsuarios.forEach(coluna => {
    const novaCelula = novaLinhaUsuario.insertCell();
    const input = document.createElement('input');

    if(coluna === 'Senha'){
        input.setAttribute('type', 'password');
    
    }else{
        input.setAttribute('type', 'text');
    }

    input.classList.add('editable');
    input.setAttribute('placeholder', coluna);
    novaCelula.appendChild(input);
});

const selectCelulaUsuario = novaLinhaUsuario.insertCell();
const selectUsuario = document.createElement('select');
selectUsuario.classList.add('editable');

const optionAdmin = document.createElement('option');
optionAdmin.setAttribute('value', 'sim');
optionAdmin.textContent = 'Sim';
const optionUser = document.createElement('option');
optionUser.setAttribute('value', 'nao');
optionUser.textContent = 'Não';
selectUsuario.appendChild(optionAdmin);
selectUsuario.appendChild(optionUser);
selectCelulaUsuario.appendChild(selectUsuario);

const botoesCelulaUsuario = novaLinhaUsuario.insertCell();
const btnEditarUsuario = document.createElement('button');
btnEditarUsuario.textContent = 'Editar';
btnEditarUsuario.classList.add('edit-button');
botoesCelulaUsuario.appendChild(btnEditarUsuario);

const btnSalvarUsuario = document.createElement('button');
btnSalvarUsuario.textContent = 'Salvar';
btnSalvarUsuario.classList.add('save-button');
botoesCelulaUsuario.appendChild(btnSalvarUsuario);
btnSalvarUsuario.addEventListener('click', function (){
    const valoresUsuario = {};
    novaLinhaUsuario.querySelectorAll('.editable').forEach((input, index) => {
        const identificadorColuna = colunasUsuarios[index];
        const valorCampo = input.tagName === 'SELECT' ? input.value : input.getAttribute('placeholder');
        valoresUsuario[identificadorColuna] = valorCampo;
    });

    // console.log('Valores do usuário:', valoresUsuario);
});

const btnRemoverUsuario = document.createElement('button');
btnRemoverUsuario.textContent = 'Remover';
btnRemoverUsuario.classList.add('remove-button');
botoesCelulaUsuario.appendChild(btnRemoverUsuario);

document.getElementById('telaAdmFilmes').addEventListener('click', function () {
    const id = this.id;
    mostrarDiv(id);
});

document.getElementById('telaAdmUsuario').addEventListener('click', function () {
    const id = this.id;
    mostrarDiv(id);
});

function mostrarDiv(nomeDiv){
    var divs = document.querySelectorAll('.telas > div');
    for(var i = 0; i < divs.length; i++){
        if(divs[i].classList.contains(nomeDiv)){
            divs[i].style.display = 'block';
        
        }else{
            divs[i].style.display = 'none';
        }
    }
}

// Event listeners para os botões "Adicionar Filme" e "Adicionar Usuário"
document.getElementById('cadastrarFilme').addEventListener('click', function () {
    novaLinhaFilme.style.display = 'table-row'; // Mostra a nova linha em branco
});

document.getElementById('cadastrarUsuario').addEventListener('click', function () {
    novaLinhaUsuario.style.display = 'table-row'; // Mostra a nova linha em branco
});
