// Total function

const totalSumLi = document.querySelector('#total-price');
const totalSum = document.querySelector('.total__price');

function sum() {
	let sum =
		inputProducts.value * prices.productPrice +
		inputOrders.value * prices.orderPrice;
	if (chckBoxAcc.checked) {
		sum += prices.accounting;
	}
	if (chckBoxTerminal.checked) {
		sum += prices.terminal;
	}

	if (inputPackage.getAttribute('data-value') === 'Basic') {
		sum += prices.basic;
	}
	if (inputPackage.getAttribute('data-value') === 'Professional') {
		sum += prices.professional;
	}
	if (inputPackage.getAttribute('data-value') === 'Premium') {
		sum += prices.premium;
	}

	totalSum.innerHTML = `$${sum}`;

	totalSumLi.classList.add('open');
	if (sum === 0) {
		totalSumLi.classList.remove('open');
	}
}

//---------------------------------------//
// Prices object

const prices = {
	productPrice: 1.5,
	orderPrice: 2,
	basic: 30,
	professional: 40,
	premium: 50,
	accounting: 20,
	terminal: 20,
};

//---------------------------------------//
// First two inputs function

function calculate(el, price, mainEl, infoEl, sumEl) {
	mainEl.style = 'display:flex';
	infoEl.innerHTML = `${el.value} * $${price}`;
	sumEl.innerHTML = ` $${el.value * price}`;
	sum();
	if (el.value === '') {
		mainEl.style = 'display:none';
	}

	if (el.value.includes('.')) {
		mainEl.style = 'display:none';
		totalSumLi.classList.remove('open');
		el.nextElementSibling.innerHTML = 'Value should be integer';
	} else if (el.value < 0) {
		mainEl.style = 'display:none';
		totalSumLi.classList.remove('open');
		el.nextElementSibling.innerHTML = 'Value should be greater than 0';
	} else {
		el.nextElementSibling.innerHTML = '';
	}
}

//---------------------------------------//
// Input Products

const inputProducts = document.querySelector('#products');
const productsLi = document.querySelector('[data-id="products"]');
const productsCalc = document.querySelector('[data-id="products"] .item__calc');
const productsSum = document.querySelector('[data-id="products"] .item__price');

inputProducts.addEventListener('input', function () {
	calculate(this, prices.productPrice, productsLi, productsCalc, productsSum);
});

//---------------------------------------//
// Input Orders

const inputOrders = document.querySelector('#orders');
const ordersLi = document.querySelector('[data-id="orders"]');
const ordersCalc = document.querySelector('[data-id="orders"] .item__calc');
const ordersSum = document.querySelector('[data-id="orders"] .item__price');

inputOrders.addEventListener('input', function () {
	calculate(this, prices.orderPrice, ordersLi, ordersCalc, ordersSum);
});

//---------------------------------------//
// Packages

const dropdown = document.querySelector('#package');
const inputPackage = document.querySelector('.select__input');
const packageLi = document.querySelector('[data-id="package"]');
const packageCalc = document.querySelector('[data-id="package"] .item__calc');
const packageSum = document.querySelector('[data-id="package"] .item__price');

const packBasic = document.querySelector('[data-value="Basic"]');
const packProfessional = document.querySelector('[data-value="Professional"]');
const packPremium = document.querySelector('[data-value="Premium"]');

//---------------------------------------//
// Packages function

function calcPack(packName, price) {
	dropdown.classList.toggle('open');
	inputPackage.innerHTML = `${packName.getAttribute('data-value')}`;
	packageLi.style.display = 'flex';
	packageCalc.innerHTML = `${packName.getAttribute('data-value')}`;
	packageSum.innerHTML = ` $${price}`;
	inputPackage.setAttribute(
		'data-value',
		`${packName.getAttribute('data-value')}`
	);
	sum();
}

//---------------------------------------//
// Packages events

inputPackage.addEventListener('click', function () {
	dropdown.classList.toggle('open');
});

packBasic.addEventListener('click', function () {
	calcPack(this, prices.basic);
});

packProfessional.addEventListener('click', function () {
	calcPack(this, prices.professional);
});

packPremium.addEventListener('click', function () {
	calcPack(this, prices.premium);
});

//---------------------------------------//
// Checkbox function

function calcCheckbox(price, mainEl, sumEl) {
	mainEl.style.display = 'flex';
	sumEl.innerHTML = ` $${price}`;
	sum();
}

//---------------------------------------//
// Checkbox accounting

const chckBoxAcc = document.querySelector('#accounting');
const accountingLi = document.querySelector('[data-id="accounting"]');
const accountingSum = document.querySelector(
	'[data-id="accounting"] .item__price'
);

chckBoxAcc.addEventListener('click', function () {
	calcCheckbox(prices.accounting, accountingLi, accountingSum);
	this.checked === false ? (accountingLi.style.display = 'none') : 0;
});

//---------------------------------------//
// Checkbox terminal

const chckBoxTerminal = document.querySelector('#terminal');
const terminalLi = document.querySelector('[data-id="terminal"]');
const terminalSum = document.querySelector('[data-id="terminal"] .item__price');

chckBoxTerminal.addEventListener('click', function () {
	calcCheckbox(prices.terminal, terminalLi, terminalSum);
	this.checked === false ? (terminalLi.style.display = 'none') : 0;
});
