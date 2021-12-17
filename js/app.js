const inputProducts = document.querySelector('#products');
const productsLi = document.querySelector('[data-id="products"]');
const productsCalc = document.querySelector('[data-id="products"] .item__calc');
const productsSum = document.querySelector('[data-id="products"] .item__price');

const inputOrders = document.querySelector('#orders');
const ordersLi = document.querySelector('[data-id="orders"]');
const ordersCalc = document.querySelector('[data-id="orders"] .item__calc');
const ordersSum = document.querySelector('[data-id="orders"] .item__price');

const packBasic = document.querySelector('[data-value="Basic"]');
const packProfessional = document.querySelector('[data-value="Professional"]');
const packPremium = document.querySelector('[data-value="Premium"]');

const chckBoxAcc = document.querySelector('#accounting');
const accountingLi = document.querySelector('[data-id="accounting"]');
const accountingSum = document.querySelector(
	'[data-id="accounting"] .item__price'
);

const chckBoxTerminal = document.querySelector('#terminal');
const terminalLi = document.querySelector('[data-id="terminal"]');
const terminalSum = document.querySelector('[data-id="terminal"] .item__price');

const dropdown = document.querySelector('#package');
const inputPackage = document.querySelector('.select__input');
const packageLi = document.querySelector('[data-id="package"]');
const packageCalc = document.querySelector('[data-id="package"] .item__calc');
const packageSum = document.querySelector('[data-id="package"] .item__price');

const totalSumLi = document.querySelector('#total-price');
const totalSum = document.querySelector('.total__price');

const prices = {
	productPrice: 0.5,
	orderPrice: 0.25,
	basic: 20,
	professional: 30,
	premium: 40,
	accounting: 15,
	terminal: 10,
};

function calculate(el, price, mainEl, infoEl, sumEl) {
	mainEl.style = 'display:flex';
	infoEl.innerHTML = `${el.value} * $${price}`;
	sumEl.innerHTML = ` $${el.value * price}`;
	sum();
	if (el.value === '') {
		mainEl.style = 'display:none';
	}
	if (el.value < 0 || el.value.includes('.', ',')) {
		mainEl.style = 'display:none';
		totalSumLi.classList.remove('open');
		el.nextElementSibling.innerHTML =
			'Value should be integer and greater than 0';
	} else {
		el.nextElementSibling.innerHTML = '';
	}
}

inputProducts.addEventListener('input', function (e) {
	calculate(this, prices.productPrice, productsLi, productsCalc, productsSum);
});

inputOrders.addEventListener('input', function (e) {
	calculate(this, prices.orderPrice, ordersLi, ordersCalc, ordersSum);
});

inputPackage.addEventListener('click', function () {
	dropdown.classList.toggle('open');
});

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

packBasic.addEventListener('click', function () {
	calcPack(this, prices.basic);
});

packProfessional.addEventListener('click', function () {
	calcPack(this, prices.professional);
});

packPremium.addEventListener('click', function () {
	calcPack(this, prices.premium);
});

//--------------------------//

const total = document.querySelector('#total-price');

function calcCheckbox(price, mainEl, sumEl) {
	mainEl.style.display = 'flex';
	sumEl.innerHTML = ` $${price}`;
	sum();
}

chckBoxAcc.addEventListener('click', function () {
	calcCheckbox(prices.accounting, accountingLi, accountingSum);
	if (this.checked === false) {
		accountingLi.style.display = 'none';
	}
});

chckBoxTerminal.addEventListener('click', function () {
	calcCheckbox(prices.terminal, terminalLi, terminalSum);
	if (this.checked === false) {
		terminalLi.style.display = 'none';
	}
});

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
