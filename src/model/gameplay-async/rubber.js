/// <reference path="../../_references.d.ts" />

import {rotate} from "./utils"
import {Board} from "./board";
import {Deck} from "../cards/deck";
import {Human} from "../players/human";

//implements tower.IGame
export class Rubber {

  constructor(deck: Deck) {
    this.boards = [];
    this.deck = deck;
  }

  async play(players: any) {
    console.log('playing rubber');

    this.players = [ new Human("player1"), new Human("player2"), new Human("player3"), new Human("player4") ];
    this.players.forEach((player) => { player.game = this });
    var dealer = this.cut();

    while(!this.playHasEnded()) {
      var board = new Board(this.deck);
      this.boards.push(board);
      await board.play(this.players, dealer);
      dealer = rotate(dealer);
    }
  }

  get north(): tower.IPlayer {
    return this.players[0];//tower.Seat.North];
  }

  get east(): tower.IPlayer {
    return this.players[1];//tower.Seat.East];
  }

  get south(): tower.IPlayer {
    return this.players[2];//tower.Seat.South];
  }

  get west(): tower.IPlayer {
    return this.players[3];//tower.Seat.West];
  }

  cut(): any {
    return 0;   // TODO
  }

  playHasEnded(): boolean {
    return false;
  }

  getRubberScore(): any {
    return undefined;
  }

  get memo() {
    return { "boardIndex": this.currentBoardIndex, "board": this.currentBoard.memo };
  }

  // public set memo(value: any) {
  // 	this.currentBoardIndex = Math.min(value.boardIndex, this.boards.length -1);
  // 	this.currentBoard.memo = value.board;
  // }

  // private currentBoardIndex: number = 0;

  get currentBoard(): tower.IBoard {
    //console.log('in current board')
    return this.boards[this.boards.length -1];
  }

  boards: any;
}