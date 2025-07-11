import { BoardTetris } from "./boardTetris.js";
import { TetrominosBag } from "./Tetromino.js";

export class Game{
    constructor(canvas,rows,cols,cellSize,space){
        this.boardTetris = new BoardTetris(canvas,rows,cols,cellSize,space);
        this.tetrominosBag =  new TetrominosBag(canvas,cellSize);
        this.currentTretomino = this.tetrominosBag.nextTetromino(); 
        this.keyboard();
        this.keys = {up:false,down:false};

        this.lastTime = 0;
        this.lastTime2 = 0;
    }

    update(){

        let currentTime = Date.now();
        let deltaTime = currentTime - this.lastTime;
        let deltaTime2 = currentTime - this.lastTime2;
        if(deltaTime >= 1000){
            this.autoMoveTetrominoDown();
            this.lastTime = currentTime;
        }
        if(deltaTime2 >= 50){
            this.boardTetris.draw();
            this.currentTretomino.draw(this.boardTetris);
            this.lastTime2 = currentTime;
            if(this.keys.down){
                this.moveTetrominoDown();
            }
        }
    }

    autoMoveTetrominoDown(){
        this.currentTretomino.move(1,0);
        if(this.blockTetromino()){
            this.currentTretomino.move(-1,0);
            this.placeTetromino();
        }
    }

    blockTetromino(){
        const tetrominoPositions = this.currentTretomino.currentPositions();
        for(let i = 0; i<tetrominoPositions.length; i++){
            if(!this.boardTetris.isEmpty(tetrominoPositions[i].row,tetrominoPositions[i].column)){
                return true;
            } 
        }
        return false;
    }

    moveTetrominoLeft(){
        this.currentTretomino.move(0,-1);
        if(this.blockTetromino()){
            this.currentTretomino.move(0,1);
        }
    }

    moveTetrominoRight(){
        this.currentTretomino.move(0,1);
        if(this.blockTetromino()){
            this.currentTretomino.move(0,-1);
        }
    }

    moveTetrominoDown(){
        this.currentTretomino.move(1,0);
        if(this.blockTetromino()){
            this.currentTretomino.move(-1,0);
        }
    }

    rotationTetrominoCW(){
        this.currentTretomino.rotation++;
        if(this.currentTretomino.rotation > this.currentTretomino.shapes.length-1){
            this.currentTretomino.rotation = 0;
        }
        if(this.blockTetromino()){
            this.rotationTetrominoCW();
        }
    }

    rotationTetrominoCCW(){
        this.currentTretomino.rotation--;
        if(this.currentTretomino.rotation<0){
            this.currentTretomino.rotation = this.currentTretomino.shapes.length - 1;
        }
        if(this.blockTetromino()){
            this.rotationTetrominoCW();
        }
    }

    placeTetromino(){
        const tetrominoPositions = this.currentTretomino.currentPositions();
        for(let i = 0; i < tetrominoPositions.length; i++){
            this.boardTetris.matriz[tetrominoPositions[i].row][tetrominoPositions[i].column] = this.currentTretomino.id;
        }

        this.boardTetris.clearFullRows();

        if(this.boardTetris.gameOver()){
            return true
        }else{
            this.currentTretomino = this.tetrominosBag.nextTetromino();
        }
    }
    
    keyboard(){
        window.addEventListener("keydown",(evt)=>{
            if(evt.key === "ArrowLeft"){
                this.moveTetrominoLeft();
            }
            if(evt.key === "ArrowRight"){
                this.moveTetrominoRight();
            }
            if(evt.key === "ArrowUp" && !this.keys.up){
                this.rotationTetrominoCW();
                this.keys.up = true;
            }
            if(evt.key === "ArrowDown"){
                this.keys.down = true;
            }
        });
        window.addEventListener("keyup",(evt)=>{
            if(evt.key === "ArrowUp"){
                this.keys.up = false;
            }
            if(evt.key === "ArrowDown"){
                this.keys.down = false;
            }
        });
    }
}