document.querySelector('#button').addEventListener('click', startGame)

let card = document.getElementsByClassName('card');
let cards = [...card];
const deck = document.querySelector('.deck');
let openedCards = [];
let matchedCard = document.getElementsByClassName("match");
let doubleFlip = false;
function display() {
   console.log(cards);
}
for (var i = 0; i < cards.length; i++) {
   card = cards[i];
   card.addEventListener("click", flipCard);
   card.addEventListener("click", cardOpen);
   card.addEventListener("click", congratulations);
}

function flipCard() {
   doubleFlip = false;
   if (this.classList.contains('flipCard')) {
      alert('Card Already Opened');
      doubleFlip = true;
   } else {
      this.classList.toggle('flipCard')
   }
}

// Shuffles cards
//Returns as array
function shuffle(array) {
   let currentIndex = array.length,
      temporaryValue,
      randomIndex;

   if (matchedCard.length > 0) {
      while (matchedCard.length > 0) {
         matchedCard[0].classList.toggle('flipCard');
         matchedCard[0].classList.toggle('makeBig');
         matchedCard[0].classList.toggle('match');
      }
   }

   while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }
   return array;
}
document.body.onload = startGame();
function startGame() {
   cards = shuffle(cards);
   cards.forEach(card => card.classList.remove('flipCard'));
   openedCards = [];
   displayNewDeck(cards);
}

function displayNewDeck(array) {
   const shuffledCards = cards;
   for (let i = 0; i < array.length; i++) {
      array.forEach.call(shuffledCards, function (item) {
         deck.appendChild(item);
      });
   }
}

function cardOpen() {
   if (this.classList.contains('flipCard') && doubleFlip === false) {
      openedCards.push(this);

      const len = openedCards.length;

      if (len === 2) {
         if (openedCards[0].type === openedCards[1].type) {

            console.log(openedCards[0], openedCards[1]);
            matched();
         } else {
            unmatched();
            console.log("UNMATCHED");
         }
      }
   }
}

function matched() {
   openedCards[0].classList.add('match');
   openedCards[1].classList.add('match');
   document.querySelector('#matchInfo').innerHTML = 'Match';
   cards.forEach(card => card.classList.add('disabled'));
   setTimeout(() => {
      openedCards[0].classList.add('makeBig');
      openedCards[1].classList.add('makeBig');
      openedCards = [];
	  cards.forEach(card => card.classList.add('disabled'));
   }, 500);
   setTimeout(() => {
	  cards.forEach(card => card.classList.remove('disabled'));
   }, 500);
   enableCards();
}
function unmatched() {
   document.querySelector('#matchInfo').innerHTML = 'Not A Match';
   cards.forEach(card => card.classList.add('disabled'));
   setTimeout(() => {
      openedCards[0].classList.remove('flipCard');
      openedCards[1].classList.remove('flipCard');
      openedCards = [];
      
   }, 1000);
   
   enableCards();

}

function enableCards() {
	setTimeout(() => {
	  cards.forEach(card => card.classList.remove('disabled'));
   }, 1000);
}
function congratulations() {
   if (matchedCard.length == 16) {
      document.querySelector('#matchInfo').innerHTML = 'WINNER!!!! Click restart to play again.';
   }
}