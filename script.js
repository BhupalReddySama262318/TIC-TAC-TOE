// let boxes = document.querySelectorAll(".box");
// let resetBtn = document.querySelector("#reset-btn");
// let newBtn = document.querySelector("#new-btn");
// let msgContainer = document.querySelector(".msg-container");
// let msg = document.querySelector("#msg");
// let main = document.querySelector(".main");

// let turnO = true;

// const winPatterns =[
//     [0,1,2],
//     [0,3,6],
//     [0,4,8],
//     [1,4,7],
//     [2,5,8],
//     [2,4,6],
//     [3,4,5],
//     [6,7,8],
// ];


// const resetGame = () => {
//     turnO = true;
//     enableBoxes();
//     msgContainer.classList.add("hide");
//     main.classList.remove("hide1");
// }



// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         if(turnO){
//             box.innerText = "O";
//             box.classList.add("o-style");
//             turnO = false;
//         }else{
//             box.innerText = "X";
//             turnO = true;
//             box.classList.add("x-style")
//         }
//         box.disabled = true;

//         checkWinner();
//     });
// });


// const enableBoxes = () => {
//     for(let box of boxes){
//         box.disabled = false;
//         box.innerText = "";
//     }
// }


// const disableBoxes = () => {
//     for(let box of boxes){
//         box.disabled = true;
//     }
// }


// const showWinner = (winner) => {
//     msg.innerText = `Congratulations, Winner is ${winner}`;
//     msgContainer.classList.remove("hide");
//     main.classList.add("hide1");
//     disableBoxes();
// }


// const checkWinner = () => {
//     for(let pattern of winPatterns){
//         let pos1Val = boxes[pattern[0]].innerText;
//         let pos2Val = boxes[pattern[1]].innerText;
//         let pos3Val = boxes[pattern[2]].innerText;
    
//         if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
//             if(pos1Val ===  pos2Val && pos2Val === pos3Val){
//                 showWinner(pos1Val);
//             }
//         }
//     }
// }

// newBtn.addEventListener("click",resetGame);
// resetBtn.addEventListener("click",resetGame);

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let main = document.querySelector(".main");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    main.classList.remove("hide1");
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-style", "x-style");
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    main.classList.add("hide1");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    main.classList.add("hide1");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            return pos1Val;
        }
    }
    return null;
};

const checkDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;
        }
    }
    return true;
};

const findBestMove = (player) => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];

        if (values.filter(val => val === player).length === 2 && values.includes("")) {
            let emptyIndex = values.indexOf("");
            return pattern[emptyIndex];
        }
    }
    return null;
};

const computerMove = () => {
    let move = findBestMove("X");
    if (move === null) {
        move = findBestMove("O");
        if (move === null) {
            let availableBoxes = [];
            boxes.forEach((box, index) => {
                if (box.innerText === "") {
                    availableBoxes.push(index);
                }
            });
            if (availableBoxes.length > 0) {
                let randomIndex = Math.floor(Math.random() * availableBoxes.length);
                move = availableBoxes[randomIndex];
            }
        }
    }

    if (move !== null) {
        let box = boxes[move];
        box.innerText = "X";
        box.classList.add("x-style");
        box.disabled = true;

        setTimeout(() => {
            let winner = checkWinner();
            if (winner) {
                showWinner(winner);
            } else if (checkDraw()) {
                showDraw();
            } else {
                turnO = true;
            }
        }, 100); // Adding a small delay to ensure the move is visually updated
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o-style");
            box.disabled = true;

            let winner = checkWinner();
            if (winner) {
                showWinner(winner);
            } else if (checkDraw()) {
                showDraw();
            } else {
                turnO = false;
                setTimeout(computerMove, 500);
            }
        }
    });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
