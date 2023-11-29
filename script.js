let table = document.querySelector('.table');
fillTable(table, 10, 10);
let startBtn = document.querySelector('.start')
let tryAgainBtn = document.querySelector('.try-again');
let cellsNumList = getCellsNum(10, 0, 99);
let timerSeconds = 12;
let body = document.querySelector('body');
let timerId;
let gameStarted = false;

let tdList = document.querySelectorAll('.table td');

startBtn.addEventListener('click', function () {
    if (!gameStarted) {
        gameStarted = true;
        startTimer();

        for (let i = 0; i < tdList.length; i++) {
            tdList[i].textContent = '';

            tdList[i].addEventListener('click', function func() {
                if (gameStarted) {
                    if (cellsNumList.includes(i)) {
                        this.classList.add('green');
                        cellsNumList.splice(cellsNumList.indexOf(i), 1);

                        if (cellsNumList.length === 0) {
                            endGame(true);
                        }
                    } else {
                        this.classList.add('red');
                    }

                    this.removeEventListener('click', func);
                }
            });
        }
    }
});

function startTimer() {
    let timerDisplay = document.querySelector('.timer span');

    let seconds = timerSeconds;

    timerId = setInterval(function () {
        timerDisplay.textContent = seconds;
        if (seconds <= 10) {
            timerDisplay.classList.add('animated-element');
        }
        if (seconds <= 0) {
            endGame(false);
        } else {
            seconds--;
        }
    }, 1000);
}

function endGame(isWinner) {
    gameStarted = false;
    clearInterval(timerId);
    if (isWinner) {
        alert('Поздравляем! Вы угадали все ячейки!');
        body.removeChild(startBtn);
        tryAgainBtn.style.display = 'block';
    } else {
        alert('Вы проиграли. Время истекло.');
        body.removeChild(startBtn);
        tryAgainBtn.style.display = 'block';
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCellsNum(count, min, max) {
    return shuffleArray(createIntArray(min, max)).slice(0, count);
}

function createIntArray(min, max) {
    let res = [];

    for (let i = min; i <= max; i++) {
        res.push(i);
    }

    return res;
}

function shuffleArray(arr) {
    let res = [];

    while (arr.length > 0) {
        let random = getRandomInt(0, arr.length - 1);
        let elem = arr.splice(random, 1)[0];
        res.push(elem);
    }

    return res;
}

function fillTable(table, cols, rows) {
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            tr.append(td);
        }

        table.append(tr);
    }
}