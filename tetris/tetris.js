const canvas=document.getElementById('tetris');
const context=canvas.getContext('2d');

//context.scale(20,20);

const matrix=[
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

const player={
    pos:{x:10,y:1},
    matrix:matrix,
};

const arena=createMatrix(12,20);
console.log(arena);
console.table(arena);

//accumulate part
function createMatrix(w,h) {
    const matrix=[];
    while (h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

//single block
function drawMatrix(mat,offset,color) {
    mat.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if (value!==0){
                context.fillStyle=color;
                context.fillRect(x*10+offset.x*10,y*10+offset.y*10,10,10);
            }
        });
    });
}

function draw(){
    context.fillStyle='#333';
    context.fillRect(0,0,canvas.width,canvas.height);
    drawMatrix(player.matrix,player.pos,'red');
}

let lastTime=0;
let dropCounter=0;

//block drop down
function droping() {
    player.pos.y++;
    dropCounter=0;
}

//keep refreshing the scene
function update(time=0){
    dropCounter+=time-lastTime;
    lastTime=time;
    if (dropCounter>1000){
        droping();
    }
    draw();
    requestAnimationFrame(update);
}

document.addEventListener('keydown',event=>{
    if (event.keyCode===37) player.pos.x--;
    if (event.keyCode===39) player.pos.x++;
    if (event.keyCode===38) {/*up rotate*/};
    if (event.keyCode===40) {droping();}
    if (event.keyCode===32) {/*space rotate*/};
    if (event.keyCode===13) {/*enter to bottom*/};
});

// - - - - - - - - - - - - - - - - - - - - //
update();