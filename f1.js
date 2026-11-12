// 1. Get all necessary elements from the HTML
const lights = document.querySelectorAll('.light');
const startbtn = document.getElementById('start-btn'); // Matches your HTML ID
const message = document.getElementById('message');
const resultBox = document.getElementById('result');
const timeDisplay = document.getElementById('time');
const bestDisplay = document.getElementById('best');

// 2. Setup game state variables
let gameState = 'IDLE';
let lightsOutTime = 0;
let sequenceInterval;
let dropTimeout;
// --- LOCAL STORAGE: RETRIEVE DATA ---
// Check the browser's memory for a saved score. If nothing is there, default to Infinity.
let savedBest = localStorage.getItem('f1BestScore');
let bestTime = savedBest ? parseInt(savedBest) : Infinity;

// If a saved time exists, display it on the screen immediately when the page loads
if (bestTime !== Infinity) {
    bestDisplay.textContent = bestTime + " ms";
    timeDisplay.textContent = "-"; 
    resultBox.classList.remove('hidden');
}
// ------------------------------------
// 3. Handle the START button click
startbtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (gameState !== 'IDLE') return; 
    
    gameState = 'RUNNING';
    
    startbtn.classList.add('hidden');
    resultBox.classList.add('hidden');
    message.textContent = "GET READY!";
    lights.forEach(light => light.classList.remove('on'));
    
    let lightIndex = 0;

    sequenceInterval = setInterval(() => {
        lights[lightIndex].classList.add('on');
        lightIndex++;
        
        if (lightIndex === 5) {
            clearInterval(sequenceInterval);
            message.textContent = "";
            
            // Beginner-friendly 0.5s to 1.5s delay
            const randomDelay = Math.floor(Math.random() * 1000) + 500;
            
            dropTimeout = setTimeout(() => {
                lights.forEach(light => light.classList.remove('on'));
                gameState = 'REACT'; 
                lightsOutTime = Date.now();
            }, randomDelay);
        }
    }, 1000);
});
// 4. Handle the player clicking the screen
document.addEventListener('mousedown', (e) => {
    if (e.target === startbtn) return; 

    if (gameState === 'RUNNING') {
        clearInterval(sequenceInterval);
        clearTimeout(dropTimeout);
        
        lights.forEach(light => light.classList.remove('on'));
        message.textContent = "JUMP START! You clicked too early.";
        
        gameState = 'IDLE';
        startbtn.textContent = "TRY AGAIN";
        startbtn.classList.remove('hidden');
    } 
    else if (gameState === 'REACT') {
        const reactionTime = Date.now() - lightsOutTime;
        
        // --- LOCAL STORAGE: SAVE DATA ---
        // If the new reaction time is faster than the saved best time, update it
        if (reactionTime < bestTime) {
            bestTime = reactionTime;
            localStorage.setItem('f1BestScore', bestTime); // Save to the browser's digital locker!
        }
        // --------------------------------
        timeDisplay.textContent = reactionTime + " ms";
        bestDisplay.textContent = bestTime + " ms";
        resultBox.classList.remove('hidden');
        
        gameState = 'IDLE';
        startbtn.textContent = "TRY AGAIN";
        startbtn.classList.remove('hidden');
    }
});