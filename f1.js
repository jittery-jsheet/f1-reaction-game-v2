//console.log("Game is connected!");

//get elements from the index file
const lights = document.querySelectorAll('.light');
const startbtn = document.getElementById('start-btn'); // Fixed ID to match HTML
const message = document.getElementById('message');

startbtn.addEventListener('click', () => {
    //this hides the start button and clears previous messages
    startbtn.classList.add('hidden');
    message.textContent = "GET READY!";

    //ensures all lights are turned off before the start
    lights.forEach(light => light.classList.remove('on'));

    let lightIndex = 0;

    //this turns on the light every 1 second
    const turnOnLights = setInterval(() => {
        lights[lightIndex].classList.add('on');
        lightIndex++;
        
        //when all lights are on, stop the timer
        // THIS MUST REMAIN INSIDE THE INTERVAL BLOCK
        if (lightIndex === 5) {
            clearInterval(turnOnLights);
            message.textContent = "";
            
            //generate random delay between 500ms and 3000ms
            const randomDelay = Math.floor(Math.random() * 2500) + 500;
            
            //turn off all lights after the delay
            setTimeout(() => {
                lights.forEach(light => light.classList.remove('on'));

                //temporarily bring back the start button for testing
                //this will be removed when step 6 arrives
                startbtn.classList.remove('hidden');
            }, randomDelay);
        }
    }, 1000); // The interval correctly closes here now
});