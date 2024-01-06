let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn=document.querySelector("#new-btn");
let winMsg=document.querySelector(".win-box p");
let winBox=document.querySelector(".win-box");
let gameBox=document.querySelector(".game-box");

let playerX = true;
let count=0;

const winPatterns = [
    // every row
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // every column
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // every diagonal
    [0, 4, 8], [2, 4, 6]
];

// add event listeners to individual boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (playerX) {
            box.innerHTML = "X";
        }
        else if (!playerX) {
            box.innerHTML = "O";
        }
        playerX = !playerX;
        count++;
        box.disabled = true;
        checkWinner();
        if(count===9 && !checkWinner()){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    disableBoxes();
    winMsg.innerHTML="Draw";
    winBox.classList.remove("hide");
    resetBtn.classList.add("hide");
    gameBox.style.opacity=0.1;
}

const showWinner=(winner)=>{
    disableBoxes();
    winMsg.innerHTML=`Player ${winner} Won`;
    winBox.classList.remove("hide");
    resetBtn.classList.add("hide");
    gameBox.style.opacity=0.1;
};

const checkWinner = () => {
    for (let pat of winPatterns) {
        let pos1 = boxes[pat[0]].innerText;
        let pos2 = boxes[pat[1]].innerText;
        let pos3 = boxes[pat[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    playerX = true;
    count=0;
    winBox.classList.add("hide");
    resetBtn.classList.remove("hide");
    gameBox.style.opacity=1;
    enableBoxes();
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click",resetGame);