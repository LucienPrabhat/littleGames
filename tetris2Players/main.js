const playerElement=document.querySelectorAll('.player');
const tetris=[];

[...playerElement].forEach(element=>{
    tetris.push(new Tetris(element));
});


const keyList = (event)=>{
    [
        [65,68,87,83,32],[37,39,38,40,13]
    ].forEach((value,index)=>{

        const p=tetris[index].player;

        if (event.keyCode===value[3]) {
            //down/S  //p.drop();
            if (event.type==='keydown') p.dropInterval=p.DROP_QUICK;
            else p.dropInterval=p.DROP_SLOW;
        }

        if (event.type==='keydown') {
            if (event.keyCode===value[0]) p.move(-1);//left/A
            if (event.keyCode===value[1]) p.move(1);//right/D
            if (event.keyCode===value[2]) p.rotate(1)//up/W
            if (event.keyCode===value[4]) p.rotate(-1)//enter/space
        }

    });
};

document.addEventListener('keydown',keyList);
document.addEventListener('keyup',keyList);


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