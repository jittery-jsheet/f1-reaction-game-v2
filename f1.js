//console.log("Game is connected!");

// 1. Get all necessary elements from the HTML
const lights = document.querySelectorAll('.light');
const startbtn = document.getElementById('start-btn');
const message = document.getElementById('message');
const resultBox = document.getElementById('result');
const timeDisplay = document.getElementById('time');
const bestDisplay = document.getElementById('best');

// 2. Setup a unified game state
let gameState = 'IDLE'; // Can only be: 'IDLE', 'RUNNING', or 'REACT'
let lightsOutTime = 0;
let bestTime = Infinity;
let sequenceInterval;
let dropTimeout;

// 3. Handle the START button click
startbtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the click from bleeding through to the document
    if (gameState !== 'IDLE') return; // Prevent double-clicks from messing up the timer
    
    gameState = 'RUNNING';
    
    // Reset the UI
    startbtn.classList.add('hidden');
    resultBox.classList.add('hidden');
    message.textContent = "GET READY!";
    lights.forEach(light => light.classList.remove('on'));
    
    let lightIndex = 0;

    // Start the light sequence
    sequenceInterval = setInterval(() => {
        lights[lightIndex].classList.add('on');
        lightIndex++;
        
        if (lightIndex === 5) {
            clearInterval(sequenceInterval);
            message.textContent = "";
            
            // Random delay between 0.5s and 3s
            // New line: Wait is now strictly between 0.5 and 1.5 seconds
            const randomDelay = Math.floor(Math.random() * 1000) + 500;
            
            dropTimeout = setTimeout(() => {
                lights.forEach(light => light.classList.remove('on'));
                gameState = 'REACT'; // Game is now waiting for player reaction
                lightsOutTime = Date.now();
            }, randomDelay);
        }
    }, 1000);
});

// 4. Handle the player clicking the screen
document.addEventListener('mousedown', (e) => {
    if (e.target === startbtn) return; // Ignore clicks directly on the start button

    if (gameState === 'RUNNING') {
        // JUMP START - Player clicked while lights were turning on OR before they went out
        clearInterval(sequenceInterval);
        clearTimeout(dropTimeout);
        
        lights.forEach(light => light.classList.remove('on'));
        message.textContent = "JUMP START! You clicked too early.";
        
        gameState = 'IDLE';
        startbtn.textContent = "TRY AGAIN";
        startbtn.classList.remove('hidden');
    } 
    else if (gameState === 'REACT') {
        // VALID REACTION - Player clicked after lights went out
        const reactionTime = Date.now() - lightsOutTime;
        
        if (reactionTime < bestTime) {
            bestTime = reactionTime;
        }
        
        timeDisplay.textContent = reactionTime + " ms";
        bestDisplay.textContent = bestTime + " ms";
        resultBox.classList.remove('hidden');
        
        gameState = 'IDLE';
        startbtn.textContent = "TRY AGAIN";
        startbtn.classList.remove('hidden');
    }
});