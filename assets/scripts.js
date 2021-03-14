const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard(){

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        // first click
    } else{
        
        secondCard = this;
        // second click
        
        checkForMatch();
    }
}

function checkForMatch(){
    // do cards march?
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            // its a match
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            disableCards();
            
        } else {
            unFlipCards();
        }
}

function disableCards(){
            // its a match
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            // cards cant be flipped back upon clicking
            resetBoard();
}

function unFlipCards(){

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


cards.forEach(card=>card.addEventListener('click', flipCard));