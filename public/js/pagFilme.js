//mostrar mensagem dinamicamente
const nomeUsuario = sessionStorage.getItem('nomeUsuario')
const elemNomeUsuario = document.getElementById("nomeUsuario")
if(elemNomeUsuario){
	if(nomeUsuario){
		elemNomeUsuario.textContent = `Olá, ${nomeUsuario}`

	}else{
		elemNomeUsuario.textContent = "Faça login ou cadastre-se"
	}
}

function recuperarFilmes(idCartaz){
   fetch(`/recuperar-filme?idCartaz=${idCartaz}`)
      .then(response => {
         if (!response.ok) {
            throw new Error('Erro ao obter dados do servidor.');
         }
         return response.json();
      })
      .then(data => {
			const filmes = data.message;
			console.log(data.message);
			const elementoFilmeTitulo = document.getElementById('filmeTitulo')
			const elementoFilmeElenco = document.getElementById('filmeElenco')
			const elementoFilmeDirecao = document.getElementById('filmeDirecao')
			const elementoFilmeGenero = document.getElementById('filmeGenero')
			const elementoFilmeDuracao = document.getElementById('filmeDuracao')
			const elementoFilmeSinopse = document.getElementById('filmeSinopse')
			
			const elementoSalaTitulo = document.getElementById('salaTitulo')
			
			//informações
			elementoFilmeTitulo.innerHTML = filmes[0].nome
			elementoFilmeElenco.innerHTML = filmes[0].elenco
			elementoFilmeDirecao.innerHTML = filmes[0].direcao
			elementoFilmeGenero.innerHTML = filmes[0].genero
			elementoFilmeDuracao.innerHTML = filmes[0].duracao
			elementoFilmeSinopse.innerHTML = filmes[0].sinopse
			
			//imagens
			const elementoFilmeClassificacao = document.getElementById('filmeClassificacao')
			const elementoFilmeImagem = document.getElementById('filmeImagem')
			elementoFilmeClassificacao.src = filmes[0].caminho_classificacao 
			elementoFilmeImagem.src = filmes[0].caminho_imagem

			elementoSalaTitulo.innerHTML = filmes[0].nome
      })
      .catch(error => {
         console.error('Erro ao obter dados do servidor:', error);
      });
}

document.addEventListener("DOMContentLoaded", function () {
	var modal = document.getElementById('myModal');
	var btn = document.getElementById('btnEscolher');
	var closeButton = document.querySelector('.modal-content .close');

	// Quando o usuário clica no botão, abre o modal
	btn.onclick = function () {
		modal.style.display = 'block';
	}

	// Quando o usuário clica no ícone "X", fecha o modal
	closeButton.onclick = function () {
		modal.style.display = 'none';
	}

	// Quando o usuário clica fora do modal, fecha o modal
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	}
	const container = document.querySelector('.container3');
	const seats = document.querySelectorAll('.row .seat:not(.occupied');
	const count = document.getElementById('count');
	const total = document.getElementById('total');
	const movieSelect = document.getElementById('movie');

	populateUI();
	let ticketPrice = +movieSelect.value;

	// Save selected movie index and price
	function setMovieData(movieIndex, moviePrice) {
		localStorage.setItem('selectedMovieIndex', movieIndex);
		localStorage.setItem('selectedMoviePrice', moviePrice);
	}

	// update total and count
	function updateSelectedCount() {
		const selectedSeats = document.querySelectorAll('.row .seat.selected');

		const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

		localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

		//copy selected seats into arr
		// map through array
		//return new array of indexes

		const selectedSeatsCount = selectedSeats.length;

		count.innerText = selectedSeatsCount;
		total.innerText = selectedSeatsCount * ticketPrice;
	}

	// get data from localstorage and populate ui
	function populateUI() {
		const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
		if (selectedSeats !== null && selectedSeats.length > 0) {
			seats.forEach((seat, index) => {
				if (selectedSeats.indexOf(index) > -1) {
					seat.classList.add('selected');
				}
			});
		}

		const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

		if (selectedMovieIndex !== null) {
			movieSelect.selectedIndex = selectedMovieIndex;
		}
	}

	// Movie select event
	movieSelect.addEventListener('change', (e) => {
		ticketPrice = +e.target.value;
		setMovieData(e.target.selectedIndex, e.target.value);
		updateSelectedCount();
	});

	// Seat click event
	container.addEventListener('click', (e) => {
		if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
			e.target.classList.toggle('selected');

			updateSelectedCount();
		}
	});

	// intial count and total
	updateSelectedCount();


});

export default {
	recuperarFilmes
}