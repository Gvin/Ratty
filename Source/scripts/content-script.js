const ratsToHeightRatio = 1000;
const ratsAppearanceInterval = 30000;

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

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomPositionX() {
  return getRandom(100, document.body.clientWidth - 300);
}

function getRandomPositionY() {
  return getRandom(100, document.body.clientHeight - 200);
}

function getCurrentRatsCount() {
  return ratsWrapper.children.length;
}

function spawnRat() {
  var posY = getRandomPositionY();
  var posX = getRandomPositionX();
  var direction = RatDirection.Right;
  if (Math.random() > 0.5) {
    direction = RatDirection.Left;
  }

  var rat = new Rat(ratsWrapper, posX, posY, direction, poopsWrapper, housesWrapper);
  rat.create();
}

setInterval(function() {
  if (getCurrentRatsCount() < getExpectedRatsCount()) {
    spawnRat();
  }
}, ratsAppearanceInterval);
