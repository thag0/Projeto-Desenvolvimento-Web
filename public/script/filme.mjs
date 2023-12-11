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
      })
      .catch(error => {
         console.error('Erro ao obter dados do servidor:', error);
      });
}

export default {
   recuperarFilme
}