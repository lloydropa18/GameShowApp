// Variables
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const ul = document.querySelector('.phrase').firstElementChild;
const keyboard = document.getElementById('keyboard');
const hearts = document.querySelector('.life').children;
const btn = document.querySelectorAll('button');
const mainGame = document.getElementById('main-game');
let lives = 5;
const phrases = [
            'Yourlimitation',
            'Pushyourself',
            'Dreamit',
            'Dreambigger',
            'SeizeTheDay'
]

// if lives -1 the last index heart will be change the url 

// Functions

// Get the random phrase
function randomPhrase(){
    return phrases[Math.floor(Math.random()*phrases.length)];
}

// Append to html the phrase
function appendToHtml(){
    let phrase = randomPhrase();
    for (let i=0; i < phrase.length; i++){
        const li = document.createElement('li');
        li.textContent = phrase[i];
        if (phrase[i] == " "){
            li.style.backgroundColor = "transparent";
        }
        ul.appendChild(li);
    }
}

// Letter Checker
function letterChecker(guess){
    let correctLetter = null;
    const liLetter = document.querySelectorAll('li');
    for (let i=0;i <liLetter.length; i++){
        if (liLetter[i].textContent.toUpperCase() == guess.toUpperCase()){
            liLetter[i].setAttribute('class', 'show');
            correctLetter = liLetter[i].textContent;
        }
    }
    if (correctLetter !== null){
        return correctLetter;
    }
    return null;
}

// Lose Heart When Fail 
function loseHeart(){
    let src = hearts[lives].getAttribute('src');
    let newSrc = src.replace('/live','/lost');
    hearts[lives].setAttribute('src',newSrc);
}


// Check Win 
function checkWin(){
    // If Win 
    if (lives > 0){
        let allList = ul.children;
        let listShow = 0;
        for (let i=0; i < allList.length; i++){
            if (allList[i].className == 'show'){
                listShow++;
            };
        };  
        if (listShow == allList.length){
            reset("You Win. Try Again!" , '#F7C59F')
        };
    //  If Lose
    } else { 
        reset("You Lose. Try Again!" , "darkred")
    };
};

// Reset Function
function reset(winorlose, backgroundcolor){
    let h1 = overlay.firstElementChild;
    h1.textContent = winorlose;
    h1.style.color = "white"
    h1 = h1.textContent.toUpperCase();
    overlay.style.backgroundColor = backgroundcolor;
    overlay.style.display = "flex";
    startBtn.addEventListener('click',()=>{
        // Reset the random phrase
        while (ul.firstChild) {
            ul.removeChild(ul.lastChild);
        }
        appendToHtml();
        // Reset the keyboard
        for (let i=0;i < btn.length; i++){
            if ( btn[i].className == 'active'){
                btn[i].removeAttribute('class');
                btn[i].removeAttribute('disabled');
            } 
            if (btn[i].style.backgroundColor == "tomato"){
                btn[i].style.backgroundColor = "";
                btn[i].style.color = "";
            }
        }  
        // Reset the Life of the player
        lives = 5;
        // Reset the Hearts
        let loseHearts = document.querySelectorAll('.life img');
        for (let i = 0;i < loseHearts.length;i++){
            if (loseHearts[i].getAttribute('src').includes('/lost')){
                let src = loseHearts[i].getAttribute('src');
                let newSrc = src.replace('/lost','/live');
                loseHearts[i].setAttribute('src',newSrc);
            };
        }  
    });
   
};



// Event Handlers
startBtn.addEventListener('click',()=>{    
    overlay.style.display = "none";
    mainGame.style.display = "flex";
    appendToHtml();
})

keyboard.addEventListener('click',(e)=>{
    if (e.target.tagName == "BUTTON"){
        e.target.setAttribute('class', 'active');
        e.target.setAttribute('disabled','true');
        let guess = e.target.textContent;
        let letterfound = letterChecker(guess)
        if (letterfound == null) {
            lives -= 1;
            loseHeart();
            e.target.style.backgroundColor = "tomato";
            e.target.style.color = "white";
        };
        checkWin()
    }
})






