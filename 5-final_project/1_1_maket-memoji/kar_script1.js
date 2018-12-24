'use strict';

(function () { 

	const opened = 'opened';
	var cardElems = document.getElementsByClassName('card');
	for (var i = 0; i < cardElems.length; i++) {
		cardElems[i].addEventListener('click', function(event) {
			if (event.target.tagName == 'DIV') {
				event.target.parentNode.classList.toggle(opened);
			}
		});
	}

	

}());