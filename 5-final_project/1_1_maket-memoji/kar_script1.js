'use strict';

const cards = document.querySelectorAll('.card');

function flipCard() {
  this.classList.toggle('opened');
}

cards.forEach(card => card.addEventListener('click', flipCard));