let intervalID;
initGame();

function initGame() {
	let array = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f', 'g', 'g', 'h', 'h'];
	const boxes = document.querySelectorAll('.box');

	loopGame(array, boxes);

}

function loopGame(array, boxes) {

	const btnRestart = document.getElementById('btnRestart');
	const btnStart = document.getElementById('btnStart');
	const btnStartContainer = document.getElementById('btnStartContainer');
	const scoreAndLevelContainer = document.getElementById('scoreAndLevelContainer');
	const btnRestartContainer = document.getElementById('btnRestartContainer');
	const timerContainer = document.getElementById('timerContainer');
	const inGameBoard = document.getElementById('inGame-board');
	const score = document.getElementById('scoreValue');
	const timer = document.getElementById('timer');
	let boxesFlippeds = [];

	btnStart.addEventListener('click', () => {
		scoreAndLevelContainer.classList.toggle('disabled');
		btnStartContainer.classList.toggle('disabled');
		btnRestartContainer.classList.toggle('disabled');
		timerContainer.classList.toggle('disabled');
		inGameBoard.style.pointerEvents = 'auto';
		timer.innerText = 30;
		changeTimer(timer);
	})

	btnRestart.addEventListener('click', () => {
		document.location.reload(true);
	});

	array = shuffleArray(array);

	for (let i = 0; i < array.length; i++) {

		boxes[i].addEventListener('click', () => {

			if (!boxes[i].classList.contains('checking')) {
				boxes[i].textContent = array[i];
				boxes[i].classList.add('checking');
				boxesFlippeds.push(boxes[i]);

				if (!boxes[i].classList.contains('checked')) {

					if (boxesFlippeds.length === 2) {

						inGameBoard.style.pointerEvents = 'none';

						if (boxesFlippeds[0].textContent === boxesFlippeds[1].textContent) {
							boxesFlippeds[0].classList.add('checked');
							boxesFlippeds[1].classList.add('checked');
							changeScore(score);
							inGameBoard.style.pointerEvents = 'auto';
						} else {
							hideNoParity(boxesFlippeds, inGameBoard);
						}
						boxesFlippeds = [];
					}
				}
			}
		});
	}
}

function hideNoParity(boxesFlippeds, inGameBoard) {
	setTimeout(function () {
		boxesFlippeds[0].textContent = '';
		boxesFlippeds[0].classList.remove('checking');

		boxesFlippeds[1].textContent = '';
		boxesFlippeds[1].classList.remove('checking');
		inGameBoard.style.pointerEvents = 'auto';
	}, 650)
}

function showEndGameMessage() {
	const endGameDiv = document.getElementById('inGame-EndGame');
	const inGameBoard = document.getElementById('inGame-board');
	const msgEndGame = document.getElementById('message-endGame');
	const score = document.getElementById('scoreValue');

	msgEndGame.innerText = `Você marcou ${score.innerText} de ${8} pontos.`;

	endGameDiv.classList.toggle('disabled');
	inGameBoard.classList.toggle('disabled');
}

function changeScore(score) {
	score.innerText++;

	if (score.innerText == 8) {
		showEndGameMessage();
		clearInterval(intervalID);
	}
}

function changeTimer(timer) {
	intervalID = setInterval(function () {
		timer.innerText = +timer.innerText - 1;
		if (timer.innerText == 0) {
			clearInterval(intervalID);
			showEndGameMessage();
		}
	}, 1000);
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}


