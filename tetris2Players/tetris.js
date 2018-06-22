class Tetris {
    constructor(element){

        this.score=element.querySelector('.score');
        this.canvas=element.querySelector('.tetris');
        this.context=this.canvas.getContext('2d');
        //this.context.scale(20,20);
        this.color=[null, '#ee0055', '#ff9900', '#ffff00', '#00ee99', '#0088dd', '#00ccff', '#ffaacc'];

        this.arena=new Arena(24,40);
        this.player=new Player(this);

        //keep refreshing the scene
        const update=(time=0)=>{
            this.player.update(time);
            this.draw();
            requestAnimationFrame(update);
        };
        update();
    }

    //single block
    drawMatrix(mat,offset) {
        mat.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if (value!==0){
                    this.context.fillStyle=this.color[value];
                    this.context.fillRect(x*10+offset.x*10,y*10+offset.y*10,10,10);
                }
            });
        });
    }
    draw(){
        this.context.fillStyle='#222';
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.drawMatrix(this.player.matrix,this.player.pos);
        this.drawMatrix(this.arena.matrix,{x:0,y:0});
        //mask
        this.context.fillStyle='#fff';
        this.context.fillRect(0,0,this.canvas.width,20);
    }

    updateScore(score) {
        this.score.innerText='Score : '+score;
    }

}