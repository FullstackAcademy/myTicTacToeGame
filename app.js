// ***************** STATE ******************
let state = {};


const resetState = () => {
    //state.board = ['', '', '', '', '', '', '', '', ''];
    state.board = [
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
        {value: '', isClicked: false},
    ]
    state.currentPlayer = 'X';


}
state.winningCombination = {
    0: [[1,2],[3,6],[4,8]],
    1: [[0,2],[4,7]],
    2: [[0,1],[5,8],[4,6]],
    3: [[0,6],[4,5]],
    4: [[3,5],[1,7],[0,8]],
    5: [[3,4],[2,8]],
    6: [[7,8],[0,3],[2,4]],
    7: [[6,8],[1,4]],
    8: [[6,7],[2,5],[0,4]]
}

const x = 'X';
const circle = 'O';
let winningPlayer;
state.winType = 'Draw';
let numberOfTurnsLeft = 9;



state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];

state.players = ['', ''];
state.currentPlayerIdx = 0;
state.scores = [0, 0];
state.lastClickedIdx = -1;

// ***************** DOM SELECTOR ******************
const scoreElem = document.querySelector('#score')
const boardElem = document.querySelector('#board');
const playerTurnElem = document.querySelector('#player-turn');
const winningMessageElem = document.querySelector('#winning-text')
const restartElem = document.querySelector('#restart')



// ***************** GAME LOGIC HELPER FUNCTIONS *****************
const changeTurn = () => {
    state.currentPlayerIdx = Math.abs(state.currentPlayerIdx-1);
    
}

// ***************** WINNING FUNCTIONS ******************
const gameWinner = (chosenIdx) => {
    
    for (let j = 0; j < state.winningCombination.length; j++) {
        const currentEntry = state.board[chosenIdx];
        const OptionA = state.board[winningCombination[j][0]];
        const OptionB = state.board[winningCombination[j][1]];
        
        if (currentEntry === OptionA && OptionA === OptionB) {
            break;
            return `Winner is ${winningPlayer}`;
        } else {
            break;
            return "It's a draw";
        }
    }
}



// ***************** DOM MANIPULATION FUNCTIONS *****************
const renderBoard = () => {
    boardElem.innerHTML = '';
    for (let i = 0; i < state.board.length; ++i) {
        const card = state.board[i];
        const cellElem = document.createElement('div');
        cellElem.classList.add('cell');
        cellElem.dataset.index = i;
        cellElem.innerHTML = card;
        boardElem.appendChild(cellElem);
    }
}

const renderPlayer = () => {
    let text;
    if(!state.players[0] || !state.players[1]) {
        text = `
        <input name="player1" placeholder="Player 1">
        <input name="player2" placeholder="Player 2">
        <button class="start">Start</button>
        `
    } else {
        text = `It's currently ${state.getCurrentPlayer()}'s turn.`
    }
    playerTurnElem.innerHTML = text;
}

const renderScore = () => {
    scoreElem.innerHTML = `
    <div>${state.players[0]}: ${state.scores[0]}</div>
    <div>${state.players[1]}: ${state.scores[1]}</div>
    `;
}

const renderRestart = () => {
    restartElem.innerHTML = `
    <button class="Restart">Restart Game</button>
    `
}

const render = () => {
    renderScore();
    renderBoard();
    renderPlayer();
    renderRestart();
    
}

//***************** TRIGGERING ON EACH TURN CLICK *****************
const takeTurn = (cellIdx) => {
    if(!state.players[0] || !state.players[1]) return;

    const card = state.board[cellIdx];
    if(card.isClicked) return;
    card.isClicked = true;

        // state.board[cellIdx] = state.currentPlayer;
        // state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
    
    const lastPlayerTurn = state.board[state.lastClickedIdx];
    state.lastClickedIdx = cellIdx;
    
    numberOfTurnsLeft--;

    changeTurn();
    
}


//***************** EVENT LISTENERS *****************
boardElem.addEventListener('click', function(event) {
    if (event.target.className === 'cell') {
        let cellIdx = event.target.dataset.index;
        takeTurn(cellIdx);
        gameWinner();
        
        render();
    }
})




playerTurnElem.addEventListener('click', function(event) {
    if(event.target.className !== 'start') return;
    
    const player1Input = document.querySelector('input[name=player1]');
    state.players[0] = player1Input.value;
    console.log('state.players[0]', state.players[0]);
    const player2Input = document.querySelector('input[name=player2]');
    state.players[1] = player2Input.value;
    console.log('state.players[1]', state.players[1]);
    
    render();
    
    
})

restartElem.addEventListener('click', function() {
    render();
    
})

// ***************** BOOTSTRAPPING *****************
resetState();
render();



