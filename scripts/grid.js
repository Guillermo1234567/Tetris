import { Tetromino } from "./Tetromino.js";

export class Grid{
    constructor(canvas, rows, cols, cellsize, space){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.rows = rows;
        this.cols = cols;
        this.cellsize = cellsize;
        this.space = space;
        this.matriz = [];
        this.restartMatriz();

        this.canvas.width = this.cols * this.cellsize + (this.space * this.cols);
        this.canvas.height = this.rows * this.cellsize + (this.space * this.rows);

        this.block = new Tetromino(this.canvas, this.cellsize);
    }

    restartMatriz(){
        for(let r = 0; r < this.rows; r++){
            this.matriz[r] = [];
            for(let c = 0; c < this.cols; c++){
                this.matriz[r][c] = 0;
            }
         }
    }

    drawSquere(x,y,side,color,bordercolor, border){
        const borderSize = side / border;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,side,side);

        this.ctx.strokeStyle = bordercolor;
        this.ctx.lineWidth = borderSize;
        this.ctx.strokeRect(x+borderSize/2, y+borderSize/2, side - borderSize, side - borderSize);
    }

    getCoordinates(col, row){
        return {x: col * (this.cellsize+this.space), y: row * (this.cellsize+this.space)}
    }

    draw(){
        for(let r=0; r<this.rows; r++){
            for(let c=0; c<this.cols; c++){
                const position = this.getCoordinates(c,r);

                if(this.matriz[r][c] !== 0){
                    this.block.drawBlock(position.x,position.y,this.matriz[r][c]);
                }else{
                this.drawSquere(position.x, position.y, this.cellsize, "#000", "#303030", 10);
                }
            }
        }
        this.printMatriz();
    }

    draw2(){
        this.drawBackground();
        for(let r=0; r<this.rows; r++){
            for(let c=0; c<this.cols; c++){
                const position = this.getCoordinates(c,r);

                if(this.matriz[r][c] !== 0){
                    if(this.matriz[r][c] === 2){
                        this.block.drawBlock(position.x + this.cellsize,position.y,this.matriz[r][c]);
                    } else if(this.matriz[r][c] === 3){
                        this.block.drawBlock(position.x,position.y,this.matriz[r][c]);
                    }else{
                         this.block.drawBlock(position.x + this.cellsize/2,position.y,this.matriz[r][c]);
                    }
                }
            }
        }
    }

    drawBackground(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }
    printMatriz(){
        let text = "";
        this.matriz.forEach((row)=>{
            text += row.join(" ") + "\n";
        });
        console.log(text);
    }
} 