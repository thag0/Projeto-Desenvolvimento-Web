/**
 * Usa o id do cartaz pra fazer uma busca no banco de dados
 * @param {*} idCartaz índice do cartaz na pagina inicial 
 */
function recuperarFilme(idCartaz){
   fetch(`/recuperar-filme?idCartaz=${idCartaz}`)
	.then(response => {
		if (!response.ok) {
			throw new Error('Erro ao obter dados do servidor.');
		}
		return response.json();
	})
	.then(data => {
		const filmes = data.message;
		
		const elmSalaTitulo = document.getElementById('salaTitulo')
		elmSalaTitulo.innerHTML = filmes[0].nome
		
		//informações do filme
		const elmFilmeTitulo = document.getElementById('filmeTitulo')
		const elmFilmeElenco = document.getElementById('filmeElenco')
		const elmFilmeDirecao = document.getElementById('filmeDirecao')
		const elmFilmeGenero = document.getElementById('filmeGenero')
		const elmFilmeDuracao = document.getElementById('filmeDuracao')
		const elmFilmeSinopse = document.getElementById('filmeSinopse')
		elmFilmeTitulo.innerHTML = filmes[0].nome
		elmFilmeElenco.innerHTML = filmes[0].elenco
		elmFilmeDirecao.innerHTML = filmes[0].direcao
		elmFilmeGenero.innerHTML = filmes[0].genero
		elmFilmeDuracao.innerHTML = filmes[0].duracao
		elmFilmeSinopse.innerHTML = filmes[0].sinopse
		
		//imagens
		const elmFilmeClassificacao = document.getElementById('filmeClassificacao')
		const elmFilmeImagem = document.getElementById('filmeImagem')
		elmFilmeClassificacao.src = filmes[0].caminho_classificacao 
		elmFilmeImagem.src = filmes[0].caminho_imagem

		//titulo da pagina dinamico
		document.title = 'Cine - ' + filmes[0].nome
	})
	.catch(error => {
		console.error('Erro ao obter dados do servidor:', error);
	});
}

/**
 * Devolve a lista completa de filmes salvos no banco de dados
*/
function recuperarTodosFilmes(){
	fetch('/recuperar-todos-filmes')
	.then(response => response.json())
	.then(data => {
		if(data){
			if(data.type === 'filmes'){
				const filmesRecuperados = data.message
				sessionStorage.setItem('admFilmesRecuperados', JSON.stringify(filmesRecuperados))
			}
		}
	})
	.catch(error =>{
		console.error('Erro ao recuperar todos os filmes: ', error)
	})
}

/**
 * Devolve a lista completa de usuários salvos no banco de dados
 */
function recuperarTodosUsuarios(){
	fetch('/recuperar-todos-usuarios')
	.then(response => response.json())
	.then(data => {
		if(data){
			if(data.type === 'usuarios'){
				const usuariosRecuperados = data.message
				sessionStorage.setItem('admUsuariosRecuperados', JSON.stringify(usuariosRecuperados))
			}
		}
	})
	.catch(error =>{
		console.error('Erro ao recuperar todos os usuários: ', error)
	})
}

export default {
   recuperarFilme,
	recuperarTodosFilmes,
	recuperarTodosUsuarios,
}