let board = document.getElementById("puzzleBoard")

let image = document.getElementById("mainImage").src

let moves = 0
let time = 0
let timer

function startGame(){

board.innerHTML=""

moves = 0
time = 0

document.getElementById("moves").innerText=moves
document.getElementById("time").innerText=time

clearInterval(timer)

timer=setInterval(()=>{

time++

document.getElementById("time").innerText=time

},1000)

let pieces=[0,1,2,3,4,5,6,7,8]

pieces.sort(()=>Math.random()-0.5)

pieces.forEach(i=>{

let piece=document.createElement("div")

piece.className="piece"

piece.draggable=true

let x=(i%3)*100
let y=Math.floor(i/3)*100

piece.style.backgroundImage=`url(${image})`

piece.style.backgroundPosition=`-${x}px -${y}px`

addEvents(piece)

board.appendChild(piece)

})

}

let dragSrc=null

function addEvents(piece){

piece.addEventListener("dragstart",function(){

dragSrc=this

})

piece.addEventListener("dragover",function(e){

e.preventDefault()

})

piece.addEventListener("drop",function(){

let temp=this.style.backgroundPosition

this.style.backgroundPosition=dragSrc.style.backgroundPosition

dragSrc.style.backgroundPosition=temp

moves++

document.getElementById("moves").innerText=moves

checkWin()

})

}

function checkWin(){

let correct=0

let all=document.querySelectorAll(".piece")

all.forEach((p,i)=>{

let x=(i%3)*100
let y=Math.floor(i/3)*100

if(p.style.backgroundPosition===`-${x}px -${y}px`){

correct++

}

})

if(correct===9){

clearInterval(timer)

document.getElementById("message").innerText="🎉 Puzzle Completed!"

}

}

function restartGame(){

startGame()

}