const deck = document.querySelector(".deck");
const card = document.getElementsByClassName("card");
const cardList = [...card];
let openedCards=[];
/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// opening card function
function openCard(e){
    e.target.classList.toggle("open");
    e.target.classList.toggle("show");
}

// loop throughall the cards and adds the event listener

for (let i = 0; i < card.length; i++){
       card[i].addEventListener("click", openCard);
       card[i].addEventListener("click", opened);  
}

// start the game function

function start(){
    let Scards = shuffle(cardList);
    let tempArray=[];
    for( let i = 0; i < Scards.length; i++){
        tempArray.forEach.call(Scards, function(item){
            deck.appendChild(item)
        })
    }
}
window.onload = start();

// function that change the class if both match

function match(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    console.log("yesss");
}

// function that change the class when the cards dont match
function fail(){
    openedCards[0].classList.add("fail");
    openedCards[1].classList.add("fail");
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "fail");
        openedCards[1].classList.remove("show", "open", "fail");
        openedCards = [];
    },1000);
}
// function to open 2 cards and compare them
function opened(e){
    openedCards.push(this);
    if(openedCards.length === 2 ){
            if(openedCards[0].type === openedCards[1].type){
                match();
                openedCards = [];
            }else{
                fail();
            }
    }

}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
