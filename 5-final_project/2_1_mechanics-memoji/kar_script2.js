'use strict';


function Game() {
	this.__shuffle = function(array) {
		var counter = array.length;
		while (counter > 0) {
			var index = Math.floor(Math.random() * counter);
			counter--;
			// swap the last element with it
			var temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
		return array;
	};

	this.emojiIndexes = this.__shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]);

	this.__getEmojiClass = function() {
		var emojiIndex = this.emojiIndexes.shift();
		return 'emoji' + emojiIndex;
	};

	this.__setEmoji = function(idx) {
		var cssSelector = '#card' + idx + ' .card__face--back';
		var element = document.querySelector(cssSelector);			
		element.classList.add(this.__getEmojiClass());
	};

};

Game.prototype.arrangeEmojiByCards = function() {
	var cardIndex = 1;
	while (this.emojiIndexes.length > 0) {
		this.__setEmoji(cardIndex); // first of pair
		this.__setEmoji(cardIndex + 1); // second of pair
		cardIndex += 2;
	}
}

/* ----------------------------------------------------------------------- */
const opened = 'opened';
const success = 'success';
const failure = 'failure';

function Card(cardFace) {
	this.currentCard = cardFace.parentNode;



	this.__getOpenedCards = function() {
		var openedCards = Array.from(document.getElementsByClassName(opened));
		openedCards = openedCards.filter(function(openedCard) {
			return !openedCard.classList.contains(success);
		}, this);
		return openedCards;
	}

	this.__openSecondCard = function(previousOpenedCard) {
		function getEmojiName(card) {
			var emojiName = undefined;	
			card.childNodes.forEach(function(childNode) {
				if (childNode.tagName !== 'DIV') return;
				childNode.classList.forEach(function(className) {
					if (className.startsWith('emoji')) {
						emojiName = className;
					}
				});
			});
			return emojiName;
		}

		var emoji1 = getEmojiName(this.currentCard);
		var emoji2 = getEmojiName(previousOpenedCard);

		var resultClassName = emoji1 === emoji2 ? success : failure;
		this.currentCard.classList.add(resultClassName);
		previousOpenedCard.classList.add(resultClassName);
	};

	this.__openThirdCard = function(openedCards) {
		openedCards.forEach(function(elem) {
			if (!elem.classList.contains(success)) {
				elem.classList.remove(opened);
			}
		});

		var failureCards = Array.from(document.getElementsByClassName(failure));
		failureCards.forEach(function(elem) {
			elem.classList.remove(failure);
		});	
	};
};

Card.prototype.processClick = function() {
	if (this.currentCard.classList.contains(opened)) return;

	var openedCards = this.__getOpenedCards(); /* only active opened cards, without green (success) cards */

	switch (openedCards.length) {
		case 0:
			/* nothing to do*/;
			break;
		case 1:
			this.__openSecondCard(openedCards[0]);
			break;
		case 2:
			this.__openThirdCard(openedCards);
			break;
		default:
			throw 'too many opened cards';
	}
	this.currentCard.classList.toggle(opened);
};

/* ----------------------------------------------------------------------- */
(function () { 
	var game = new Game();
	game.arrangeEmojiByCards();	

	/* ----------------------------------------------------------------------- */
	var cardsElem = document.getElementById('cards');
	cardsElem.addEventListener('click', function(event) {
		event.preventDefault();
		if (event.target.classList.contains('card__face')) {
			var card = new Card(event.target);
			card.processClick();
		}
	});

}());