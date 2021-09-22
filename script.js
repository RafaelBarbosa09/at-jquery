const imagens = [
	'img/android.png',
	'img/android.png',
	'img/chrome.png',
	'img/chrome.png',
	'img/facebook.png',
	'img/facebook.png',
	'img/firefox.png',
	'img/firefox.png',
	'img/googleplus.png',
	'img/googleplus.png',
	'img/html5.png',
	'img/html5.png',
	'img/twitter.png',
	'img/twitter.png',
	'img/windows.png',
	'img/windows.png'
]

var inicio;

$(document).ready(function () {
	montaJogo();
});

$(function () {
	var app = {
		divClone: $('.tabuleiro').clone(),
		cartas: imagens,

		init: function () {
			$('.tabuleiro').replaceWith(app.divClone.clone());

			$('.butaoInicio').click(function () {
				alert('Atenção! O jogo vai começar.')
				app.embaralhar();

				inicio = new Date().getTime();

				$('.butaoInicio').off();

				setTimeout(function () {
					$('img').fadeOut(250, 'linear', function () {
						app.cartaVerso();
					});
				}, 3000);
			});

			$('.butaoReset').click(function () {
				app.init();
			});
		},

		cartaVerso: function () {
			$('.desmarcada').each(function (index) {
				$(this).html('<img src="img/cross.png">').fadeIn(300).slideDown(300, 'linear');
			});
		},

		cartaFrente: function () {
			$('.cartas').each(function (index) {
				$(this).html('<img src="' + $(this).data('cardValue') + '">');
			});
		},

		embaralhar: function () {
			let random = 0;
			let temp = 0;
			for (let i = 1; i < app.cartas.length; i++) {
				random = Math.round(Math.random() * i);
				temp = app.cartas[i];
				app.cartas[i] = app.cartas[random];
				app.cartas[random] = temp;
			}
			app.atribuiCarta();
			app.cartaFrente();
		},

		atribuiCarta: function () {
			$('.cartas').each(function (index) {
				$(this).attr('data-card-value', app.cartas[index]);
			});
			app.handleClick();
		},

		handleClick: function () {
			$('.cartas').bind('click', function () {
				$(this).addClass('selected').slideUp(250, function () {
					$(this).html('<img src="' + $(this).data('cardValue') + '">').fadeIn(150);
				});
				app.checaParidade();
			});
		},

		checaParidade: function () {
			if ($('.selected').length === 2) {
				if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
					// alert('Acertou, miserável!')
					$('.selected').each(function () {
						$(this).html('<img src="' + $(this).data('cardValue') + '">').removeClass('desmarcada').addClass('combinada');
					});

					$('.selected').each(function () {
						$(this).removeClass('selected');
					});

					$('.combinada').each(function () {
						$(this).off('click');
					});

					app.checaFimDoJogo();
				} else {
					// alert('Errou!')
					setTimeout(function () {
						$('.selected').slideUp(100);

						$('.selected').each(function () {
							$(this).html('').removeClass('selected');
						});
						app.cartaVerso();
					}, 1000);
				}
			}
		},

		checaFimDoJogo: function () {
			if ($('.desmarcada').length === 0) {
				var fim = new Date().getTime();
				var tempoTotal = fim - inicio;

				mins = new Date(tempoTotal).getMinutes();
				secs = new Date(tempoTotal).getSeconds();

				alert(`O jogo acabou!! Você Levou ${mins} Minutos e ${secs} segundos!`);
				app.init();
			}
		},
	};
	app.init();
});

function criaDiv(numero) {
	let div = document.createElement('div');
	div.setAttribute("class", "cartas desmarcada");

	document.querySelector(".tabuleiro").appendChild(div);

	const img = imagens[numero];
	let teste = criaImg(img);

	div.appendChild(teste);

}

function criaImg(img) {
	let imgTag = document.createElement('img');
	imgTag.setAttribute("src", img);

	return imgTag;
}

function criaBotoes() {
	let divBotao = document.createElement('div');
	divBotao.setAttribute("class", "botoes");

	let btnInicio = document.createElement('button');
	btnInicio.setAttribute("class", "butaoInicio");
	btnInicio.textContent = "Iniciar";

	let btnReset = document.createElement('button');
	btnReset.setAttribute("class", "butaoReset");
	btnReset.textContent = "Parar";

	document.querySelector(".tabuleiro").appendChild(divBotao);
	document.querySelector(".botoes").appendChild(btnInicio);
	document.querySelector(".botoes").appendChild(btnReset);
}

function montaJogo() {
	for (let i = 0; i < 16; i++) {
		criaDiv(i);
	}
	criaBotoes();
}