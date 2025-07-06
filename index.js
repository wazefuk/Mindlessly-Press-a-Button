var Presses = 0;
var PressesPerPress = 1;
var AutoclickerDelay = 500;
var Gold = 0;
var autoclickerBuy = false;

const Button = document.getElementById("theButton");
const Pressp = document.getElementById("pressp");
const Goldp = document.getElementById("goldp");
const Pressesperpressp = document.getElementById("pppp");

document.addEventListener('keyup', (event) => {
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'e') {
        press();
    }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateUI() {
    Button.style.rotate = Presses % 360 + "deg";
    Pressp.innerText = Presses + " presses";
    Goldp.innerText = Gold + " gold";
    Pressesperpressp.innerHTML = PressesPerPress + " presses per press";
    document.getElementById("upg-press1").disabled = Presses < 360;
    document.getElementById("upg-press5").disabled = Presses < 850;
    document.getElementById("upg-autoclicker").disabled = Presses < 350 || autoclickerBuy;
}

function press() {
    Presses += PressesPerPress;
    updateUI();
}

async function Autoclicker() {
    while (true) {
        await sleep(AutoclickerDelay);
        press();
    }
}

function buyUpgrade(input) {
    switch (input) {
        case 1:
            if (Presses >= 360) {
                Presses -= 360;
                PressesPerPress++;
            }
            break;
        case 2:
            if (Presses >= 800) {
                Presses -= 800;
                PressesPerPress += 5;
            }
            break;
        case 3:
            if (Presses >= 3500 && autoclickerBuy == false) {
                Presses -= 3500;
                Autoclicker();
                document.getElementById("upg-autoclicker").disabled = true;
                document.getElementById("upg-autoclicker").title = "Already bought!";
                autoclickerBuy = true;
            }
            break;
        default:
            console.log("Invalid upgrade ID, no logic found");
    }
    updateUI();
}

updateUI();
