const visaProbability  = .9;
const hotelProbability = .6;
const ticketProbability  = .5;
const exceptionProbability = .2;


function applyForVisa(visa) {
	console.log("Process application...");
	visa.reason = "BAD DOCUMENTS";
	return new Promise(function(resolve, reject) {
			setTimeout(function() {
				Math.random() < visaProbability 
					? resolve(visa) 
					: reject(visa);
			}, 1000);
	});
};

function getVisa(visa) {
	if (Math.random() < exceptionProbability) throw new Error("RANDOM EXCEPTION");
	console.info("Visa is ready, visa number: " + visa.number);
	return new Promise(function(resolve, reject) {
		resolve(visa);
	});
}

function bookHotel(visa) {
	console.log("Hotel booking...");
	visa.booking = 456;
	visa.reason = "NO ROOMS";
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			Math.random() < hotelProbability 
				? resolve(visa) 
				: reject(visa);
		}, 500);
	});
};

function getBooking(visa) {
	console.info("Hotel is booked, visa number: " + visa.number + 
					", booking number: " + visa.booking);
	return new Promise(function(resolve, reject) {
		resolve(visa);
	});
}

function buyTicket(visa) {
	console.log("Ticket booking...");
	visa.ticket = 789;
	visa.reason = "NO FLIGHT";
	return new Promise(function(resolve, reject) {
		setTimeout( function(){
			Math.random() < ticketProbability
				? resolve(visa) 
				: reject(visa);
		}, 500);	
	});
};

function getTicket(visa) {
	console.info("Ticket is payed, visa number: " + visa.number + 
					", ticket number: " + visa.ticket);
}

applyForVisa({number: 123, reason: "-"})
	.then(getVisa)
	.then(bookHotel)
	.then(getBooking)
	.then(buyTicket)
	.then(getTicket)
	.catch(err => console.error(err.hasOwnProperty('reason') 
								? err.reason
								: err));