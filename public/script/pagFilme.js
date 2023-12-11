import login from '/script/modulos/login.mjs';
import filme from '/script/modulos/filme.mjs';
import funcoes from './modulos/funcoes.mjs'

const funcoesLogin = {
	logoff: login.logoff
}

const funcoesRecuperar = {
	recuperarFilme: filme.recuperarFilme
}

funcoes.usuarioLogado()

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

document.getElementById('imgSair').addEventListener('click', funcoesLogin.logoff);
const idCartaz = sessionStorage.getItem("idFilmeSelecionado")
funcoesRecuperar.recuperarFilme(idCartaz)