var Presses = 0;

const Button = document.getElementById("theButton");

function press() {
    Presses += 1;
    Button.style.rotate = Presses + "deg";
}
