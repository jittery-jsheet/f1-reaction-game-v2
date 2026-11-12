//console.log("Game is connected!");

//get elements from the index file
const lights = document.querySelectorAll('.light');
const startbtn = document.getElementById('start-btn');
const message = document.getElementById('message');

startbtn.addEventListener('click', () => {
    //this hides the start button and clears previous messages
    startbtn.classList.add('hidden');
    message.textContent = "GET READY!";

    //enures all lights are turned off before the start
    lights.forEach(light => light.classList.remove('on'));

    let lightIndex = 0;

    //this turns on the light every 1 second
    const turnOnLights = setInterval(() => {
        lights[lightIndex].classList.add('on');
        lightIndex++;
    }, 1000);

})