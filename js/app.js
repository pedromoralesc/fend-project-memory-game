const deck = document.querySelector(".deck");
const card = document.getElementsByClassName("card");
const cardList = [...card];
let openedCards=[];
let count = document.querySelector(".moves");
let moves =0;
let matchingCards= document.getElementsByClassName("match");
const stars = document.querySelectorAll(".stars li");
const restartIcon = document.querySelector(".restart")
let second = 0, minute = 0, hour=0;
const timer = document.querySelector(".timer");
let interval;
const modal= document.querySelector(".modal");

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
    e.target.classList.add("open", "show", "animated", "flipInY");

}

// loop throughall the cards and adds the event listener

for (let i = 0; i < card.length; i++){
       card[i].addEventListener("click", openCard);
       card[i].addEventListener("click", opened); 
       card[i].addEventListener("click", message); 
}

// start the game function

function start(){
    count.innerHTML ="0 Moves";
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
    openedCards[0].classList.remove("show", "open", "flipInY");
    openedCards[1].classList.remove("show", "open", "flipInY");
    openedCards[0].classList.add("match","rubberBand");
    openedCards[1].classList.add("match","rubberBand");
}

// function that change the class when the cards dont match
function fail(){
    openedCards[0].classList.remove("flipInY");
    openedCards[1].classList.remove("flipInY");
    openedCards[0].classList.add("fail","shake");
    openedCards[1].classList.add("fail","shake");
        setTimeout(function(){
            openedCards[0].classList.remove("show", "open", "fail","shake","animated");
            openedCards[1].classList.remove("show", "open", "fail","shake","animated");
            openedCards = [];
        },1200);
}

// function that add 1 to the count

function addToCount(){
    moves++;
        if(moves < 2){
            count.innerHTML = moves +" Move";

        }else{
            count.innerHTML = moves +" Moves";
        } 
        if(moves > 8 && moves < 16){
            stars[2].style.visibility ="collapse"
        }else if( moves >= 17){
            stars[1].style.visibility ="collapse"
        }
    if(moves === 1){second = 0 ; minute = 0; hour = 0; time()}
}

// function to open 2 cards and compare them
function opened(e){
    openedCards.push(this);
    if(openedCards.length === 2 ){
        addToCount();
            if(openedCards[0].type === openedCards[1].type){
                match();
                openedCards = [];
            }else{
                fail();
            }
    }

}
// function for the timer
function time(){
    interval = setInterval(function(){
        timer.innerHTML = "Time "+minute+" : "+second;
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
// function to restart the game

function reStart(){
    // card class reload
    for(let i = 0; i< cardList.length; i++){
        if(cardList[i].classList.contains("match")){
        cardList[i].classList.remove("animated", "match","rubberBand")
        }else{
            cardList[i].classList.remove("open", "show","flipInY", "animated")
        }
    }
    // stars reload
    for(var i = 0 ; i < 3; i++){
        stars[i].style.visibility="visible";
    }
    moves = 0;
    // timer reload
    timer.innerHTML = "Time 0:0";
    clearInterval(interval);
    start()
}

// modal popup
function message(){
    if(matchingCards.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
         modal.classList.add('is-visible');
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = finalTime;
        if(moves >= 0 && moves < 8){
            document.getElementById("raiting").innerHTML =" <i class='fa fa-star'></i> <i class='fa fa-star'></i> <i class='fa fa-star'></i>";
        }else if( moves > 8 && moves < 16){
            document.getElementById("raiting").innerHTML =" <i class='fa fa-star'></i> <i class='fa fa-star'></i>";
        }else{
            document.getElementById("raiting").innerHTML ="<i class='fa fa-star'></i>";
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
