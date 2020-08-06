"use-strict";

/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/

// Choose theme at random.
const colors = ["#D64163", "#fa625f", "#4874E2"];
const colorsDark = ["#c13b59", "#e15856", "#4168cb"];
const selColor = Math.floor(Math.random() * colors.length);
document.documentElement.style.setProperty('--primary', colors[selColor]);
document.documentElement.style.setProperty('--primary-dark', colorsDark[selColor]);

// Get canvas info from DOM.
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Default values.
let puck = { x: canvas.width / 2, y: canvas.height / 2 };
let puckVelocity = {}
let playerOne = { score: 0, paddle: 160 };
let playerTwo = { score: 0, paddle: 160 };

let ballImage = new Image();
ballImage.src= "assets/images/ball.png";

// Reset game.
function resetPuck(direction) {
    let angle = Math.random(-Math.PI / 4, Math.PI / 4);
    let xSpeed = 5 * Math.cos(angle) * direction;
    let ySpeed = 5 * Math.sin(angle) * direction;
    puckVelocity = {x: xSpeed , y: ySpeed};
    puck = { x: canvas.width / 2, y: canvas.height / 2 };
}

resetPuck(1);

// Show puck function.
function showPuck() {
    ctx.beginPath();
    ctx.arc(puck.x, puck.y, 10, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#666";
    ctx.stroke();
}

// Move puck.
function movePuck() {
    puck.x += puckVelocity.x;
    puck.y += puckVelocity.y;
    if (puck.y < 6 || puck.y > canvas.height - 6) {
        puckVelocity.y *= -1;
    }
    let reset = false;
    if (puck.x < 0) {
        playerTwo.score++;
        document.getElementById("playerTwoScore_ID").innerText = playerTwo.score;
        reset = -1;
    } else if (puck.x > canvas.width) {
        playerOne.score++;
        document.getElementById("playerOneScore_ID").innerText = playerOne.score;
        reset = 1;
    }
    if (reset != false) {
        resetPuck(reset);
        return;
    }
    if(puck.x - 5 < 20 && puck.y + 5 > playerOne.paddle && puck.y - 5 < playerOne.paddle + 100) {
        let angle = map(puck.y , playerOne.paddle , playerOne.paddle + 100 , -45 , 45);
        // Player one hit.
        puckVelocity.x  = 5 * Math.cos(angle *  Math.PI / 180);
        puckVelocity.y = 5 * Math.sin(angle * Math.PI / 180);
    }
    if(puck.x  > 600 && puck.y + 5 > playerTwo.paddle && puck.y - 5 < playerTwo.paddle + 100) {
        let angle = map(puck.y , playerTwo.paddle , playerTwo.paddle + 100 ,225 , 135);
        // Player one hit.
        puckVelocity.x  = 5 * Math.cos(angle *  Math.PI / 180);
        puckVelocity.y = 5 * Math.sin(angle * Math.PI / 180);
    }
}

// Show paddles.
function showPaddles() {
    ctx.beginPath();
    ctx.fillStyle = "#666";
    ctx.fillRect(0, playerOne.paddle, 20, 100);
    ctx.beginPath();
    ctx.fillStyle = "#666";
    ctx.fillRect(600,playerTwo.paddle, 20, 100);
}

// Paddle control function.
window.addEventListener("keydown" , function(e) {
    e.preventDefault();
    if(e.keyCode == 87) {
        playerOne.paddle -= 40;
    }
    if(e.keyCode == 83) {
        playerOne.paddle += 40;
    }
    if(e.keyCode == 38) {
        playerTwo.paddle -= 40;
    }
    if(e.keyCode == 40) {
        playerTwo.paddle += 40;
    }
});

// Draw function.
function draw() {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    showPuck();
    movePuck();
    showPaddles();
    window.requestAnimationFrame(draw);
}

draw();

// Map function map values between given range.
function map(n, start1, stop1, start2, stop2, withinBounds) {
    var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
        return newval;
    }
    if (start2 < stop2) {
        return constrain(newval, start2, stop2);
    } else {
        return constrain(newval, stop2, start2);
    }
}
