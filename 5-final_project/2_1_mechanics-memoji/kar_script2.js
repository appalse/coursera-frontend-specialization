'use strict';



(function () { 

	arrangeEmojiByCards();

	function arrangeEmojiByCards() {
		function shuffle(array) {
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
		}

		var emojiIndexes = shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]);
		var cardIndex = 0;
		while (emojiIndexes.length > 0) {

			function setEmoji(idx) {
				var cssSelector = '#card' + (idx + 1) + ' .card__face--back';
				var element = document.querySelector(cssSelector);
				var emojiIndex = emojiIndexes.splice(0, 1);
				var emojiClass = 'emoji' + emojiIndex;
				element.classList.add(emojiClass);
			};

			setEmoji(cardIndex); // first of pair
			setEmoji(cardIndex + 1); // second of pair
			cardIndex += 2;
		}
	};
	

	/* ----------------------------------------------------------------------- */
	var cardsElem = document.getElementById('cards');
	cardsElem.addEventListener('click', function(event) {
		event.preventDefault();
		if (event.target.classList.contains('card__face')) {
			clickOnCard(event.target);
		}
	});

	function clickOnCard(cardFace) {
		const opened = 'opened';
		const success = 'success';
		const failure = 'failure';

		var currentCard = cardFace.parentNode;
		if (currentCard.classList.contains(opened)) return;

		var openedCards = Array.from(document.getElementsByClassName(opened));
		openedCards = openedCards.filter(function(openedCard) {
			return !openedCard.classList.contains(success);
		});

		switch (openedCards.length) {
			case 0:
				break;
			case 1:
				var previousOpenedCard = openedCards[0];

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

				var emoji1 = getEmojiName(currentCard);
				var emoji2 = getEmojiName(previousOpenedCard);

				var resultClassName = emoji1 === emoji2 ? success : failure;
				currentCard.classList.add(resultClassName);
				previousOpenedCard.classList.add(resultClassName);

				break;
			case 2:
				openedCards.forEach(function(elem) {
					if (!elem.classList.contains(success)) {
						elem.classList.remove(opened);
					}
				});					
				var failureCards = Array.from(document.getElementsByClassName(failure));
				failureCards.forEach(function(elem) {
					elem.classList.remove(failure);
				});	
				break;
			default:
				throw 'too many opened cards';
		}
		currentCard.classList.toggle(opened);
	}

}());