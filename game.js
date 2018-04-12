"use strict";
window.addEventListener("click", d_by_click);
let k;
function d_by_click(id) {
    switch (id) {
        case 'U':
            if (k !== D) k = 'U';
            break;
        case 'R':
            if (k !== 'L') k = 'R';
            break;
        case 'L':
            if (k !== 'R') k = 'L';
            break;
        case 'D':
            if (k !== 'U') k = 'D';
            break;
    }
}

function crash(head, array) {
    let bool = false;
    array.reduce((b, ele) => {
        bool = (head.x === ele.x && head.y === ele.y) ? true : false;
    }, false);
    return bool;
}

const init = () => {

    const cvs = document.querySelector("canvas");
    const ctx = cvs.getContext("2d");
    // event listining
    cvs.width = document.documentElement.clientWidth;
    cvs.height = document.documentElement.clientHeight;

    window.addEventListener("keydown", dirct);

    //key control
    let d;
    function dirct(event) {
        if (event.keyCode == 37 && d !== "R") {
            d = "L";
        } else if (event.keyCode == 38 && d !== "D") {
            d = "U";
        } else if (event.keyCode == 39 && d !== "L") {
            d = "R";
        } else if (event.keyCode == 40 && d !== "U") {
            d = "D";
        }
    }

    // the cell init
    if (window.screen.availHeight <= 390 || window.screen.availWidth <= 800) {
        var b = 25;
    } else if (window.screen.availHeight <= 1024 || window.screen.availWidth <= 750) {
        var b = 25;
    } else {
        var b = 27;
    }
    let score = 0;
    let foodImg;
    const loadImge = new Promise((res, rej) => {
        let Img = new Image();
        Img.onload = () => res(Img);
        Img.onerror = () => rej(new Error('Could not load the food'));
        Img.src = './food.jpg';
    });

    // snake 

    let snake = [];
    snake[0] = { x: 3 * b, y: 2 * b };

    let food = { x: Math.floor(Math.random() * (cvs.width - b)), y: Math.floor(Math.random() * (cvs.height - 2 * b)) };

    function game() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        snake.map((ele, i) => {
            ctx.fillStyle = (i === 0) ? 'green' : 'red';
            ctx.fillRect(ele.x, ele.y, b, b);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(ele.x, ele.y, b, b);
        });

        loadImge
            .then((img) => {
                ctx.drawImage(img, food.x, food.y, b, b)
            })
            .catch((err) => {
                throw new Error(`food cannot be loaded ${err}`);
            })

        let snakex = snake[0].x;
        let snakey = snake[0].y;

        if (d === "L" || k === "L") snakex -= b;

        if (d === "U" || k === "U") snakey -= b;

        if (d === "R" || k === "R") snakex += b;

        if (d === "D" || k === "D") snakey += b;

        if (Math.abs(snakex - food.x) <= 15 && Math.abs(snakey - food.y) <= 15) {
            score += 1;
            ctx.fillText(`Score: ${score}`, b, b);
            food = { x: Math.floor(Math.random() * 390), y: Math.floor(Math.random() * 380) };

        } else {
            snake.pop();
        }

        let newHead = { x: snakex, y: snakey };

        if (snakex < 0 || snakex > cvs.width || snakey < 0 || snakey > cvs.height || crash(newHead, snake)) {
            ctx.fillStyle = "white";
            ctx.font = '30px Changa one';
            ctx.fill()
            ctx.fillText(`Game Over you scored: ${score}`, cvs.width / 4, cvs.height / 2);
            clearInterval(G);
            var die = true;

        }
        if (die) {
            document.querySelector("button").onclick = init
            document.querySelector("button").textContent = 'Star'
        }
        if (!die) document.querySelector("button").onclick = ''

        snake.unshift(newHead);

        ctx.font = "25px Changa one";
        ctx.fillStyle = "white";
        ctx.fillText(`Score: ${score}`, b, b);
        ctx.fill()

    }
    let G = setInterval(game, 1000 / 10);

}

