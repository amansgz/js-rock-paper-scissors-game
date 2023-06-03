const GAME_OPTIONS = [
	{
		name: 'rock',
		emoji: '✊ ',
		beats: 'scissors'
	},
	{
		name: 'paper',
		emoji: '🖐️ ',
		beats: 'rock'
	},
	{
		name: 'scissors',
		emoji: '✌️ ',
		beats: 'paper'
	}
];


const displayChoices = document.getElementById('displayChoices');
const displayChoicesPlayer = document.getElementById('displayChoicesPlayer');
const choicesPlayer = document.querySelectorAll('[data-name]');
const displayScore = document.querySelectorAll('[data-name]')
let computerScore = 0;
let playerScore = 0;


choicesPlayer.forEach(choice => {
	choice.addEventListener('click', e => {
		const playerSelection = GAME_OPTIONS.find(playerChoice => playerChoice.name === choice.dataset.name);
		const computerSelection = getComputerChoice();
	
		playGame(playerSelection, computerSelection);
	});
});	

function getComputerChoice() {
	const index = Math.floor(Math.random() * GAME_OPTIONS.length);
	const computerSelection = GAME_OPTIONS[index];
	return computerSelection;
}
	
function playGame(playerSelection, computerSelection) {
	const playerWins = isWinner(playerSelection, computerSelection);
	const computerWins = isWinner(computerSelection, playerSelection);

	showSelections(computerSelection, computerWins);
	showSelections(playerSelection, playerWins);

	if (playerWins) {
		incrementScore(playerPoints);
		displayWinnerScore(playerPoints);
	} 
	if (computerWins) {
		incrementScore(computerPoints);
		displayWinnerScore(computerPoints);
	}
}

function isWinner(selection, opponentSelection) {
	return selection.beats === opponentSelection.name;
}

function showSelections(choice, winner){
	const selection = document.createElement('p');
	selection.textContent = choice.emoji;
	selection.classList.add('choice-selection');
	displayChoices.append(selection); 

	if (winner) selection.classList.add('winner-choice');

	setTimeout(() => {
		selection.classList.remove('winner-choice');	
		selection.remove();
	}, 800);
}

function incrementScore(score) {
	score.textContent = parseInt(score.textContent) + 1;
}

function displayWinnerScore(score) {
	const winnerMsg = document.createElement('h2');
	winnerMsg.classList.add('winner-text')
	
	const btnReload = document.createElement('button');
	btnReload.classList.add('btnReload')
	btnReload.textContent = 'Play again';

	displayScore.forEach((score) => { 
		if (score.textContent == 3){
			winnerMsg.textContent = `${score.dataset.name} wins !`;
			setTimeout(() => {
				displayChoices.style.display = 'block';
				displayChoices.style.paddingTop = '2rem';
				displayChoices.append(winnerMsg, btnReload);
				displayChoicesPlayer.style.pointerEvents = 'none';

				btnReload.addEventListener('click', () => {
					location.reload()
				});		
			}, 1000);	
		} 
	})	
}