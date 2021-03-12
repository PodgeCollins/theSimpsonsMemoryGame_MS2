const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;


function flipCard(){
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        // first click
    } else{
        hasFlippedCard = false;
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
}

function unFlipCards(){
            // not a match
            setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            }, 1500);
}


cards.forEach(card=>card.addEventListener('click', flipCard));