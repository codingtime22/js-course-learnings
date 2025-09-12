import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
	id: '1',
	deliveryDays: 7,
	priceCents: 0
}, {
	id: '2',
	deliveryDays: 3,
	priceCents: 499
}, {
	id: '3',
	deliveryDays: 1,
	priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
	let deliveryOption;

	deliveryOptions.forEach((option) => {
		if (option.id === deliveryOptionId) {
			deliveryOption = option;
		} 
	});

	return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
	/*
	const today = dayjs();
	let date = today.add(deliveryOption.deliveryDays, 'days');

	adjustForWeekend(date);

	const everyOptionDeliveryDate2 = [
		date.format('dddd, MMMM D')
	];

	return everyOptionDeliveryDate2;
	*/

	let date = dayjs();
	let daysToAdd = deliveryOption.deliveryDays;

	while (daysToAdd > 0) {
		date = date.add(1, 'day');
		if (date.day() !== 0 && date.day() !== 6) {
			daysToAdd--;
		}
	}

	return [date.format('dddd, MMMM D')];
}