'use strict';


function Game() {

};

function Card() {

};

(function () { 
	function arrangeEmojiByCards() {
		function shuffle(array) {
		    var counter = array.length;
		    while (counter > 0) {
		        let index = Math.floor(Math.random() * counter);
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
				/*var pos = Math.floor(Math.random() * emojiIndexes.length);*/
				var emojiIndex = emojiIndexes.splice(0, 1);
				var emojiClass = 'emoji' + emojiIndex;
				element.classList.add(emojiClass);
			}

			setEmoji(cardIndex); // first of pair
			cardIndex++;

			setEmoji(cardIndex); // second of pair
			cardIndex++;
		}
	};
	arrangeEmojiByCards();

	/* ----------------------------------------------------------------------- */


		
	
	/* ----------------------------------------------------------------------- */

	const opened = 'opened';
	const success = 'success';
	const failure = 'failure';
	var cardElems = document.getElementsByClassName('card');
	// TODO тут нужно использовать делегирование, вместо навешивания обработчика на каждый card
	for (var i = 0; i < cardElems.length; i++) {

		cardElems[i].addEventListener('click', function(event) {
			var target = event.target;
			if (target.tagName != 'DIV') return;
			var parent = target.parentNode;
			if (parent.classList.contains(opened)) return;

			var openedCards = Array.from(document.getElementsByClassName(opened));
			openedCards = openedCards.filter(function(openedCard) {
				return !openedCard.classList.contains(success);
			});

			switch (openedCards.length) {
				case 0:
					break;
				case 1:
					function getEmojiName(parentNode) {
						var emojiName = undefined;	
						parentNode.childNodes.forEach(function(childNode) {
							if (childNode.tagName !== 'DIV') return;
							childNode.classList.forEach(function(className) {
								if (className.startsWith('emoji')) {
									emojiName = className;
								}
							});
						});
						return emojiName;
					}

					var emoji1 = getEmojiName(parent);
					var emoji2 = getEmojiName(openedCards[0]);

					if (emoji1 === emoji2) {
						parent.classList.add(success);
						openedCards[0].classList.add(success);
					} else {
						parent.classList.add(failure);
						openedCards[0].classList.add(failure);
					}					
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
			parent.classList.toggle(opened);

		});
	}
}());