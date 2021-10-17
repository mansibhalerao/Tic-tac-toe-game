import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares!: string[];
  xIsNext!: boolean;
  winner!: string;
  isTie!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.newgame();
  }

  newgame(){
      this.squares = Array(9).fill(null);
      this.xIsNext= true;
      this.winner = "";
      this.isTie = false;
  }

  get player(){
    return this.xIsNext ? 'X':'O';
  }

  makeMove(idx : number){
    if(this.winner || this.isTie){
      this.newgame();
    }
    else{
    if(!this.squares[idx]) {
      this.squares.splice(idx,1,this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
    this.isTie = this.findIfTie();
  }
  }

  
  calculateWinner(){
       const lines = [
         [0,1,2],
         [3,4,5],
         [6,7,8],
         [0,3,6],
         [1,4,7],
         [2,5,8],
         [0,4,8],
         [2,4,6]
       ];

       for(let i=0;i<lines.length ;i++){
         const [a,b,c] = lines[i];
         if(this.squares[a] && this.squares[a]==this.squares[b] && this.squares[a] == this.squares[c]){ 
          return this.squares[a];
         }
       }
      return "";
  }

  findIfTie(){
    for(let i=0;i<this.squares.length;i++){
      if(!this.squares[i]){
        return false;
      }
    }
    if(this.winner){
      return false;
    }
    return true;
  }

}
