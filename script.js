// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
musicSound.play();
let board = document.querySelector('.board');
let music = document.getElementById('music');
let upbtn = document.querySelector('.fa-arrow-up');
let downbtn = document.querySelector('.fa-arrow-down');
let leftbtn = document.querySelector('.fa-arrow-left');
let rightbtn = document.querySelector('.fa-arrow-right');
let speed = 8;
let score = 0;
let isPlaying = false;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
};

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >18 || snake[0].x <0 || snake[0].y >18 || snake[0].y <0){
        return true;
    }
    return false;
};

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        // if(score>hiscoreval){
        //     hiscoreval = score;
        //     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        //     hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        // }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
  move();
  function move(){
    const velocity = getInputDir()
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    
    snakeArr[0].x += velocity.x;
    snakeArr[0].y += velocity.y;
  }

  
    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


};


// Main logic starts here


// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval = JSON.parse(hiscore);
//     hiscoreBox.innerHTML = "High Score: " + hiscore;
// }

window.requestAnimationFrame(main);
    inputDir = {x: 0, y: 0} // Start the game
    lastinputDir = {x: 0, y: 0}
    
window.addEventListener('keydown', e =>{
    
    switch (e.key) {
        case "ArrowUp":
            upbtn.style.color ="white";
            downbtn.style.color ="black";
            leftbtn.style.color ="black";
            rightbtn.style.color ="black";
          if(lastinputDir.y !==0 )break
           inputDir = {x:0, y:-1}
          break;

        case "ArrowDown":
            downbtn.style.color ="white";
            upbtn.style.color ="black";
            leftbtn.style.color ="black";
            rightbtn.style.color ="black";
           if(lastinputDir.y !==0 )break
           inputDir = {x:0, y:1}
            break;

        case "ArrowLeft":
            leftbtn.style.color ="white";
            downbtn.style.color ="black";
            upbtn.style.color ="black";
            rightbtn.style.color ="black";
          if(lastinputDir.x !==0 )break
            inputDir = {x:-1, y:0}
            break;

        case "ArrowRight":
            rightbtn.style.color ="white";
            downbtn.style.color ="black";
            leftbtn.style.color ="black";
            uptbtn.style.color ="black";
          if(lastinputDir.x !==0 )break
          inputDir = {x:1, y:0}
            break;
  
    }

});


// play music
const playMusic = ()=>{
  isPlaying = true;
  musicSound.play();
  music.classList.replace("fa-volume-off", "fa-volume-up");
};

// pause music
const pauseMusic = ()=>{
  isPlaying = false;
  musicSound.pause();
  musicSound.currentTime =0;
  music.classList.replace("fa-volume-up", "fa-volume-off");
};

music.addEventListener("click",()=>{
  isPlaying ? pauseMusic() : playMusic();
});

upbtn.addEventListener("click", ()=> changedir('up'));
leftbtn.addEventListener("click", ()=> changedir('left'));
rightbtn.addEventListener("click", ()=> changedir('right'));
downbtn.addEventListener("click", ()=> changedir('down'));
const changedir =(direction) => {
    switch (direction) {
        case "up":
          if(lastinputDir.y !==0 )break
           inputDir = {x:0, y:-1}
          break;

        case "down":
           if(lastinputDir.y !==0 )break
           inputDir = {x:0, y:1}
            break;

        case "left":
          if(lastinputDir.x !==0 )break
            inputDir = {x:-1, y:0}
            break;

        case "right":
          if(lastinputDir.x !==0 )break
          inputDir = {x:1, y:0}
            break;
  
    }
};

function getInputDir(){
    lastinputDir = inputDir;
    return inputDir;
};
