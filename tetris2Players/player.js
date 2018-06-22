class Player{
    constructor(tetris){

        this.tetris=tetris;
        this.arena=tetris.arena;

        this.DROP_SLOW=1000;
        this.DROP_QUICK=50;

        this.pos={x:0,y:0};
        this.matrix=null;
        this.score=0;
        this.dropCounter=0;
        this.dropInterval=this.DROP_SLOW;
        this.lastTime=0;
        this.reset();

    }

    reset() {
        const pieces='TOIJLZS';
        this.matrix=createPieces(pieces[pieces.length*Math.random()|0]);
        this.pos.y=0;
        this.pos.x=(this.arena.matrix[0].length-this.matrix[0].length)/2|0;
        if (this.arena.collide(this)){
            this.arena.clear();
            this.tetris.updateScore(0);
        }
    }

    drop() {
        this.pos.y++;
        if (this.arena.collide(this)){
            this.pos.y--;
            this.arena.merge(this);
            this.score+=this.arena.sweep();
            this.tetris.updateScore(this.score);
            this.reset();
        }
        this.dropCounter=0;
    }

    move(direction) {
        this.pos.x += direction;
        if(this.arena.collide(this)){
            this.pos.x -= direction;
        }
    }

    rotate(dir) {
        this._rotateMatrixs(this.matrix,dir);
        let offset=1;
        while (this.arena.collide(this)){
            this.pos.x+=offset;
            offset=-(offset+(offset>0?1:-1));
        }
    }

    _rotateMatrixs(matrix,dir) {
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

    update(time) {
        this.dropCounter+=time-this.lastTime;
        this.lastTime=time;
        if (this.dropCounter>this.dropInterval){
            this.drop();
        }
    }

}