const canvas=document.getElementById('tetris');
const context=canvas.getContext('2d');

//context.scale(20,20);

const player={
    pos:{x:0,y:0},
    matrix:null,
    score:0,
};
const arena=createMatrix(24,40);
const color=[null, '#ee0055', '#ff9900', '#ffff00', '#00ee99', '#0088dd', '#00ccff', '#ffaacc'];

function playerReset() {
    const pieces='TOIJLZS';
    player.matrix=createPieces(pieces[pieces.length*Math.random()|0]);
    player.pos.y=0;
    player.pos.x=(arena[0].length-player.matrix[0].length)/2|0;
    if (collide(arena,player)){
        arena.forEach(row=>row.fill(0));
        updateScore(0);
    }
}
function createPieces(type) {
    switch (type){
        case 'T':
            return [
                [0,0,0],
                [1,1,1],
                [0,1,0],];
        case 'O':
            return [
                [2,2],
                [2,2],];
        case 'I':
            return [
                [0,3,0,0],
                [0,3,0,0],
                [0,3,0,0],
                [0,3,0,0]];
        case 'J':
            return [
                [0,4,0],
                [0,4,0],
                [4,4,0],];
        case 'L':
            return [
                [0,5,0],
                [0,5,0],
                [0,5,5],];
        case 'Z':
            return [
                [6,6,0],
                [0,6,6],
                [0,0,0],];
        case 'S':
            return [
                [0,7,7],
                [7,7,0],
                [0,0,0],];
    }
}

//accumulate part
function createMatrix(w,h) {
    const matrix=[];
    while (h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

//single block
function drawMatrix(mat,offset) {
    mat.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if (value!==0){
                context.fillStyle=color[value];
                context.fillRect(x*10+offset.x*10,y*10+offset.y*10,10,10);
            }
        });
    });
}
function draw(){
    context.fillStyle='#222';
    context.fillRect(0,0,canvas.width,canvas.height);
    drawMatrix(player.matrix,player.pos);
    drawMatrix(arena,{x:0,y:0});
    //mask
    context.fillStyle='#fff';
    context.fillRect(0,0,canvas.width,20);
}

//record total accumulation
function merge(arena,player) {
    player.matrix.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if (value!==0){
                arena[y+player.pos.y][x+player.pos.x]=value;
            }
        });
    });
}

function collide(arena,player) {
    const [m,o]=[player.matrix,player.pos];
    for (let y=0;y<m.length;++y){
        for (let x=0;x<m[y].length;++x){
            //if there is a value '1' duplicate in same place
            if (m[y][x]!==0 && (arena[y+o.y] && arena[y+o.y][x+o.x])!==0){
                return true;//yes it collide
            }
        }
    }
    return false;
}

function arenaSweep() {
    let combo=false;
    outerLoop:for (let y=arena.length-1;y>=0;--y){
            for (let x=0;x<arena[y].length;++x){
                if (arena[y][x]===0) continue outerLoop;
            }
            const row=arena.splice(y,1)[0].fill(0);
            arena.unshift(row);
            ++y;
            player.score += combo? player.score : 10;
            updateScore(player.score);
            combo=true;
    }
}

function updateScore(score) {
    document.getElementById('score').innerText='Score : '+score;
}

// > > > > > actions < < < < <
function playerMove(direction) {
    player.pos.x += direction;
    if(collide(arena,player)){
        player.pos.x -= direction;
    }
}
function playerRotate(dir) {
    rotate(player.matrix,dir);
    let offset=1;
    while (collide(arena,player)){
        player.pos.x+=offset;
        offset=-(offset+(offset>0?1:-1));
    }
}
function rotate(matrix,dir) {
    //rotate=transport+reverse
    for (let y=0;y<matrix.length;++y){
        for (let x=0;x<y;++x){
            [matrix[x][y],matrix[y][x]]=[matrix[y][x],matrix[x][y]];
        }
    }
    if (dir>0){
        //clockwise >> reverse column
        matrix.forEach(row=>row.reverse());
    }else{
        //counterclockwise >> reverse row
        matrix.reverse();
    }
}

let lastTime=0;
let dropCounter=0;

//block drop down
function droping() {
    player.pos.y++;
    if (collide(arena,player)){
        player.pos.y--;
        merge(arena,player);
        arenaSweep();
        playerReset();
    }
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
    if (event.keyCode===37) playerMove(-1);
    if (event.keyCode===39) playerMove(1);
    if (event.keyCode===38) {/*up*/ playerRotate(1)}
    if (event.keyCode===40) {droping();droping();}
    if (event.keyCode===32) {/*space*/ playerRotate(-1)}
    if (event.keyCode===13) {/*enter*/}
});

// - - - - - - - - - - - - - - - - - - - - //

playerReset();
update();