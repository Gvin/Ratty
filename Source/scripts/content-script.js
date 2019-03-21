const ratWidth = 200;
const ratHeight = 100;
const movementSpeed = 60;
const movementSmooth = 100;
const ratsToHeightRatio = 1000;

function getExpectedRatsCount() {
	return Math.ceil(document.body.clientHeight / ratsToHeightRatio);
}

function createWrapper(id) {
	var wrapper = document.createElement("div");
	wrapper.id = id;
	wrapper.style.position = "relative";
	document.body.insertBefore(wrapper, document.body.children[0]);
	return wrapper;
}

var ratsWrapper = createWrapper("ratsWrapper");
var poopsWrapper = createWrapper("poopsWrapper");
var housesWrapper = createWrapper("housesWrapper");

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function playSqueakSound() {
	var myAudio = new Audio(chrome.runtime.getURL("sounds/squeak.wav"));
	myAudio.play();
}

function getRandomPositionX() {
	return getRandomArbitrary(100, document.body.clientWidth - 300);
}

function getRandomPositionY() {
	return getRandomArbitrary(100, document.body.clientHeight - 200);
}

function createPoop(rat) {
	var poop = document.createElement("div");
	poop.style.backgroundImage = "url(" + chrome.runtime.getURL("images/Poop.png") + ")";
	poop.classList.add("entity");
	poop.classList.add("poop");

	var ratY = parseInt(rat.dataset.positionY);
	poop.style.top = (ratY + 60) + "px";
	var ratX = parseInt(rat.dataset.positionX);
	poop.style.left = (ratX + 90) + "px";

	poop.addEventListener("click", function() {
		poopsWrapper.removeChild(poop);
	});

	poopsWrapper.appendChild(poop);
}

function createHouse(rat) {
	var house = document.createElement("div");
	house.style.backgroundImage = "url(" + chrome.runtime.getURL("images/House.png") + ")";
	house.classList.add("entity");
	house.classList.add("house");

	var ratY = parseInt(rat.dataset.positionY);
	house.style.top = (ratY + 20) + "px";
	if (rat.dataset.direction == "-1") {
		house.style.left = "10px";
	} else {
		house.style.left = (document.body.clientWidth - 110) + "px";
	}

	window.setTimeout(function() {
		housesWrapper.removeChild(house);
	}, 3000);

	housesWrapper.appendChild(house);
}

function processRatWrapperClick(rat) {
	playSqueakSound();
	if (Math.random() > 0.5) {
		createPoop(rat);
	}
	var position = parseInt(rat.dataset.positionX);
	var path = 0;
	var prefix = "";
	if (rat.dataset.direction === "-1") {
		path = position;
		prefix = "scaleX(-1)";
	} else {
		path = document.body.clientWidth - position - ratWidth;
	}
	rat.style.transform = prefix + " translate3d(" + path + "px, 0px, 0px)";
	window.setTimeout(function() {
		createHouse(rat);
		ratsWrapper.removeChild(rat);
	}, 500);
}

function createRat() {
	var rat = document.createElement("div");
	rat.style.backgroundImage = "url(" + chrome.runtime.getURL("images/RatTransparent.png") + ")";
	rat.classList.add("entity");
	rat.classList.add("rat");

	if (Math.random() > 0.3) {
		rat.dataset.direction = -1;
		rat.style.transform = "scaleX(-1)";
	} else {
		rat.dataset.direction = 1;
	}

	rat.dataset.positionY = getRandomPositionY();
	rat.style.top = rat.dataset.positionY + "px";
	rat.dataset.positionX = getRandomPositionX();
	rat.style.left = rat.dataset.positionX + "px";

	rat.addEventListener("click", function() { processRatWrapperClick(rat); });

	ratsWrapper.appendChild(rat);
}

for (var i = 0; i < getExpectedRatsCount(); i++) {
	createRat();
}

setInterval(function() {
	if (ratsWrapper.children.length < getExpectedRatsCount()) {
		createRat();
	}
}, 10000);
