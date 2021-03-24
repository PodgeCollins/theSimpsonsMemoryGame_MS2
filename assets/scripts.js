const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard;
let lockBoard;
let firstCard, secondCard;
let moves;
let remainingCards = 12;
let counter = document.querySelector(".moves");

const stars = document.querySelectorAll(".fa-star");

let starsList = document.querySelectorAll(".stars li");

/** Represents starting of a new game 
 */
document.body.onload = resetGame();

/** Represents Card flipping over
 flip class is added to memory-card class
 */
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
/**  Represents Move Counter, Timer & Stars
 */  
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
/** Represents clock 
*/
function startTimer() {
    interval = setInterval(function () {
        if (remainingCards == 0) {
            return;
        }
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

/** Represents two cards flipped over
Checks for matching pairs 
if theres no match unflip is called
*/ 

function checkForMatch() {
    // do cards march?
    if (firstCard.dataset.framework === secondCard.dataset.framework) {

        disableCards();


    } else {
        unFlipCards();
    }
}

/**  Represents the matched cards
 makes them unclickable
*/

function disableCards() {
    remainingCards -= 2;
    // its a match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    // cards cant be flipped back upon clicking
    resetBoard();
    if (remainingCards == 0) {
        congratulations();
    }
}

/** Represents the cards that dont match */
function unFlipCards() {

    lockBoard = true;

    // not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}
/** Allows the condition above to work by setting 
 firstCard and secondCard to nulls*/
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

}
/** Represents the cards being shuffled into new postions */
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}
/** Represents Congratulations modal once all cards are matched */
function congratulations() {
    // show congratulations modal
    document.getElementById("popup1").classList.add("show");

    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = minute + "m " + second + "s ";
}

/** close icon on modal*/
function closeModal() {
    document.getElementById("popup1").classList.remove("show");
}


/**  for user to play Again */
function playAgain() {
    document.getElementById("popup1").classList.remove("show");
    resetGame();
}

/** Represents the game starting again and everything being reset
 */
function resetGame() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    remainingCards = 12;
    //reset Cards
    cards.forEach(card => {
        card.classList.remove('flip');
    })

    //shuffle Cards

    shuffle();

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
    cards.forEach(card => card.addEventListener('click', flipCard));
}