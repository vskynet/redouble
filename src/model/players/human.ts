/// <reference path="../../_references.d.ts" />

import Player = require("./player");

class Human extends Player {

    public static $inject = [ "$q", "name", "$rootScope" ];

    constructor($q: ng.IQService, name: string, $rootScope: ng.IScope) {   
         super($q, name);
    }

    private pendingBid: ng.IDeferred<tower.IBid>;
    
	public bid(game: tower.IGame): ng.IPromise<tower.IBid> {
        console.log('in human');

        console.log(this.game.currentBoard.bidding.eastBid);

        if (this.awaitingBid)
            throw new Error("bid is already pending");
        
        // this.$rootScope.$apply(() => {
        //     this.pendingBid = this.$q.defer<tower.IBid>();
        // })

        this.pendingBid = this.$q.defer<tower.IBid>();
     //   this.$rootScope.$digest();

		return this.pendingBid.promise;
	}

    public get awaitingBid(): boolean {
        return !!this.pendingBid;
    }
    
    public makeBid(bid: tower.IBid) {
        if (!this.awaitingBid)
            throw new Error("unexpected bid!");
        
        this.pendingBid.resolve(bid);
        this.pendingBid = undefined;
    }
    
    private pendingPlay: ng.IDeferred<tower.ICard>;

	public play(game: tower.IGame): ng.IPromise<tower.ICard> {
        if (this.awaitingPlay)
            throw new Error("play is already pending");
        
		this.pendingPlay = this.$q.defer<tower.ICard>();

		return this.pendingPlay.promise;
	}
    
    public get awaitingPlay() {
        return !!this.pendingPlay;
    }
    
    public makePlay(card: tower.ICard) {
        if (!this.awaitingPlay)
            throw new Error("unexpected card!");
        
        this.hand.play(card);
        this.pendingPlay.resolve(card);
        this.pendingPlay = undefined;
    }

    public get isHuman() {
        return true;
    }
}

export = Human;