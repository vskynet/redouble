import React from "react";
import TestUtils from "react-addons-test-utils";

import BidComponent from "../../components/bid.jsx";
import BiddingHistory from "../bidding-history.jsx";
import {BoardBuilder} from "../../../model/game/board-builder";

describe('Bidding History', () => {

	it('displays the right headings', () => {
		let board = BoardBuilder.create().toQuery();
		let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={board}/>);
		let headings = TestUtils.scryRenderedDOMComponentsWithTag(biddingHistory, 'th');

		expect(headings.length).to.equal(4);
		expect(headings[0].textContent).to.equal('north');
	});

	it('displays all the bids', () => {
		let board = BoardBuilder
			.create()
			.makeBid("no bid")
			.toQuery();

		let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={board}/>);
		let bids = TestUtils.scryRenderedComponentsWithType(biddingHistory, BidComponent);
		expect(bids.length).to.equal(1);
  });
});
