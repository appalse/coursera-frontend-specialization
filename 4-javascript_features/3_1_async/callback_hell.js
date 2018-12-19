function buyTicket(resolve, reject) {
	console.log("Buying tickets...");
	setTimeout( function(){
		Math.random() > .5 ? resolve({status: "PAYED"}) : reject({reason: "NO FLIGHT"});
	}, 500);
};

function successBuy(result) {
	console.info("Tickets were bought, status: " + result.status);
};

function failedBuy(result) {
	console.error("Tickets weren't bought, reason: " + result.reason);
};

function bookHotel(visa, resolve, reject) {
	console.log("Резервирование отеля...");
	setTimeout(function() {
		Math.random() > .5 ? resolve({ status: "RESERVED" }) : reject({ reason: "NO ROOMS" });
	}, 500);
};

function reserveHotel(reservation) {
	console.info("Отель забронирован, статус: " + reservation.status);
	buyTicket(successBuy, failedBuy);
};

function rejectHotel(reservation) {
	console.error("Отель отказал, причина: " + reservation.reason);
};

function acceptVisa(visa) {
	console.info("Виза готова, статус: " + visa.status);
	bookHotel(visa, reserveHotel, rejectHotel);
};

function rejectVisa(visa) {
	console.error("В визе отказано, причина: " + visa.reason);
};

function applyForVisa(documents, resolve, reject) {
	console.log("Обработка заявления...");
	setTimeout(function() {
		Math.random() > .5 ? resolve({ status: 'DONE' }) : reject({ reason: "BAD DOCUMENTS"});
	}, 500);
};

applyForVisa({}, acceptVisa, rejectVisa);
