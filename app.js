const words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');
const wordsCount = words.length;
const game = document.getElementById('game');
const cursor = document.getElementById('cursor');
const gameTimer = 30 * 1000; //in milliseconds
window.timer = null; 
window.gameStart = null; // created to check whether the game started or not

function randomWord() {
    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex - 1];
  }

function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function addClass(element, className) {
    element.className += " " + className;
}
function removeClass(element, className) {
    element.className = element.className.replace(className+ "")
}

function newGame(){            //Adding paragraph to the words div
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i < 200; i++) {
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }

    addClass(document.querySelector(".word"),"current");        //Adding current class to the word div containing span of letters
    addClass(document.querySelector(".letter"),"current");      //Adding current class to the letter 
    document.getElementById("info").innerHTML = (gameTimer / 1000) + "" ;
    window.timer = null; //when new game starts window.timer is null
}

function getWPM(){ 
    //Calculating WPM
    const words = [...document.querySelectorAll(".word")];   //getting all the words which are app have
    const lastTypedWord = document.querySelector(".word.current");  //getting last word we typed or trying to type
    const lastTypedWordIndex = words.indexOf(lastTypedWord); //getting last word's index
    const typedWords = words.slice(0, lastTypedWordIndex); //get words upto lastTypedWordIndex
    //To get correct words

    const correctWords = typedWords.filter(word => {
        const letters = [...word.children]; //getting all the children of word i.e. all the span tags inside the word
        const incorrectLetters = letters.filter(letter => letter.className.includes("incorrect")); //all the letter which are typed incorrectly
        const correctLetters = letters.filter(letter => letter.className.includes("correct")); //all the letter which are typed correctly

        //To a word to be correct it should have 0 incorrect letters and then correct letters will be = letters
        return incorrectLetters.length === 0 && correctLetters.length === letters.length;
    })
    return correctWords.length / gameTimer * 60000; //getting correct words
}

function gameOver(){
    clearInterval(window.timer);  //clearing the function
    addClass(game, "over");
    document.getElementById("info").innerHTML = `WPM : ${getWPM()}`;
}

game.addEventListener('keyup',function(event){
    const key = event.key;
    const currentWord  = document.querySelector(".word.current");
    const currentLetter = document.querySelector(".letter.current");  //getting the current letter
    const expectedKey = currentLetter?.innerHTML || " "; //variable name is expectedKey because this is key which is expected to be pressed and this help us to determine whether the key pressed is correct or wrong 
    const isLetter = key.length === 1 && key !== ' ';    //checking whether the presed key is letter and not space
    const isSpace = key == ' ';
    const isBackSpace = key === "Backspace";
    const isFirstLetter = currentLetter === currentWord.firstChild;

    if(document.querySelector("#game.over")){ //checking if over class if attached to #game 
        return; //returning nothing will stop the script

    }
 
    console.log({key, expectedKey});

    if(!window.timer && isLetter){  //i.e. when window.timer function is null and when a letter is pressed (isletter is also checked because if we refresh page using ctrl+r then without isletter the timer will start automatically)
        window.timer = setInterval(() => {
            if(!window.gameStart){  //chechking if game is not start 
                window.gameStart = (new Date()).getTime();   //this will give us the time passed in milliseconds but give same value to every time
            }

            const currentTime = (new Date()).getTime();   //getting current time
            const msPassed = currentTime - window.gameStart; //msPassed(milliseconds passed) this give how much time passed since game started in ms
            const sPassed = Math.round(msPassed / 1000); //Converting the ms in sec
            const sLeft = (gameTimer / 1000) - sPassed;  //subtracting sPassed from gameTimer gives us seconds :)

            if(sLeft <=0){
                gameOver(); 
                return; //other wise -> document.getElementById("info").innerHTML = sLeft + " "; will run
            }

            document.getElementById("info").innerHTML = sLeft + " ";
        }, 1000);
    }

    if (isLetter) {          //if pressed key is letter
        if (currentLetter) {
          addClass(currentLetter, key === expectedKey ? 'correct' : 'incorrect');  //if key the "current" class is added
          removeClass(currentLetter, 'current');    // The currentLetter is matched, Now, we are removing the class "current"
          if (currentLetter.nextSibling) {
            addClass(currentLetter.nextSibling, 'current');  //Adding "current" class to next element
          }
        } else {
        //   const incorrectLetter = document.createElement('span');
        //   incorrectLetter.innerHTML = key;
        //   incorrectLetter.className = 'letter incorrect extra';
        //   currentWord.appendChild(incorrectLetter);
        //   console.log(currentWord);
          
        }
      }

    if(isSpace){  //if pressed key is space 
        if(expectedKey !== " "){  // and if expected key is not space
            const letterToInvalidate = [...document.querySelectorAll(".word.current .letter:not(.correct)")]; //here we do :not(.correct) otherwise it will also select the correct letter not the remaining letters
            // console.log(letterToInvalidate);  //As letterToInvalidate is array we cannot directly add class to it so we use forEach
            letterToInvalidate.forEach(letter => {
                addClass(letter, "incorrect");
            })
        }
        removeClass(currentWord, "current");     //remove the "current" class from the current word
        addClass(currentWord.nextSibling, "current");  //adding the "current" class to the next sibling

        if(currentLetter){       //in the "if" statement, we are removing the "current" class from the currentLetter as pressing space will move us to next sibling add the "current" class will be added to next sibling but "current class" is still there in previous word's letter so to remove this error we remove class
            removeClass(currentLetter, "current");  
        }
        addClass(currentWord.nextSibling.firstChild, "current"); //adding the "current" class to the next sibling word
    }

    if(isBackSpace){         //on pressing Backspace, we want to go back to previous word(if on the next letter) or to the previous letter
        //make previous word current, last letter current
        if(currentLetter && isFirstLetter){

            removeClass(currentWord, "current"); //remove the "current" class from current word  
            addClass(currentWord.previousSibling, "current")  // and adding the "current" class to previous word
            removeClass(currentLetter, "current");  //After adding class to the current word we also remove the class from the first word of next letter
            addClass(currentWord.previousSibling.lastChild, "current");  // and adding the "current" class to last word of the previous word

            //Now removing correct and incorrect classes from the letter to make it default letter
            removeClass(currentWord.previousSibling.lastChild, "incorrect");
            removeClass(currentWord.previousSibling.lastChild, "correct");
        }
        if(currentLetter && !isFirstLetter){     //removing letter from same word
            removeClass(currentLetter,"current")  //removing the current class from the current letter and adding it to previous word(on next line)
            addClass(currentLetter.previousSibling,"current");
            removeClass(currentLetter.previousSibling, "incorrect");
            removeClass(currentLetter.previousSibling, "correct");

        }       
        if(!currentLetter){ //i.e. here we have "space" as expected letter
            addClass(currentWord.lastChild,"current");
            removeClass(currentWord.lastChild, "incorrect");
            removeClass(currentWord.lastChild, "correct");
        }
       
    }

    //Moving the lines up when the 2 line are typed---
    if(currentWord.getBoundingClientRect().top > 250){  //i.e. when from top, the first letter's position is more than 250 
        const words = document.getElementById("words");
        console.log("helo")
        const margin = parseInt(words.style.marginTop || "0px");  //getting margin top, if not have anything than it will be 0px
        words.style.marginTop = (margin -35) + 'px';

    }

    //MOVING THE CURSOR--------------
    const nextLetter = document.querySelector(".letter.current");
    const nextWord = document.querySelector(".word.current");
    if(nextLetter){
        cursor.style.top = nextLetter.getBoundingClientRect().top + 2 + "px";
        cursor.style.left = nextLetter.getBoundingClientRect().left + "px";
    }
    else{
        cursor.style.top = nextWord.getBoundingClientRect().top + 2 + "px";
        cursor.style.left = nextWord.getBoundingClientRect().right + "px";
    }
})

document.querySelector(".newGameBtn").addEventListener("click", () => {
    location.reload();
})

newGame();