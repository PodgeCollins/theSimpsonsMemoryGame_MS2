const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let counter = document.querySelector(".moves");

const stars = document.querySelectorAll(".fa-star");

let starsList = document.querySelectorAll(".stars li");


document.body.onload = resetGame();

function resetGame() {
    //reset Cards


    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}




function flipCard() {

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    // first click
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        moveCounter();
    } else {
        // second click
        secondCard = this;
        checkForMatch();

    }
}

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


function checkForMatch() {
    // do cards march?
    if (firstCard.dataset.framework === secondCard.dataset.framework) {

        disableCards();


    } else {
        unFlipCards();
    }
}


function disableCards() {
    // its a match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    // cards cant be flipped back upon clicking
    resetBoard();
}

function unFlipCards() {

    lockBoard = true;

    // not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];




}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();







cards.forEach(card => card.addEventListener('click', flipCard));
