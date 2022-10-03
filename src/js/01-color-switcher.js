function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

let intervalId = null;

startBtnRef.addEventListener('click', onStartBtnRef);
stopBtnRef.addEventListener('click', onStopBtnRef);

function onStartBtnRef(event) {
    intervalId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor()
    }, 1000)
    event.currentTarget.disabled = true;
    stopBtnRef.disabled = false;
};

function onStopBtnRef(event) {
clearInterval(intervalId);
event.currentTarget.disabled = true;
startBtnRef.disabled = false;

};