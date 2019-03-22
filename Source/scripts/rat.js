const RatRightImagePath = "images/RatTransparentRight.png";
const RatLeftImagePath = "images/RatTransparentLeft.png";
const SqueakSoundPath = "sounds/squeak.wav";
const RatRunawayTime = 2000;
const RatArrivalTime = 2000;
const RatWidth = 200;

const RatDirection = {
  Right: 1,
  Left: -1
};

class Rat extends Entity {
  constructor(wrapperElement, posX, posY, direction, poopWrapper, houseWrapper) {
    super(wrapperElement, posX, posY);
    this.direction = direction;
    this.poopWrapper = poopWrapper;
    this.houseWrapper = houseWrapper;

    this.removed = false;
  }

  getImagePath() {
    if (this.direction === RatDirection.Left) {
      return RatLeftImagePath;
    }
    return RatRightImagePath;
  }

  configureElement() {
    this.element.classList.add("rat");
    this.element.style.left = this.getInitialX();

    var self = this;
    
    window.setTimeout(function() {
      self.startInitialMovement();
    }, 0);

    window.setTimeout(function() {
      self.completeInitialMovement();
    }, RatArrivalTime);
  }

  handleClick() {
    this.playSqueakSound();
    this.placeHouse();
    this.placePoop();
    this.startRunawayMovement();
  }

  remove() {
    if (this.removed) {
      return;
    }

    this.removed = true;
    this.wrapperElement.removeChild(this.element);
  }

  placeHouse() {
    var house = new House(this.houseWrapper, this);
    house.create();
  }

  placePoop() {
    if (Math.random() > 0.3) {
      var poop = new Poop(this.poopWrapper, this);
      poop.create();
    }
  }

  playSqueakSound() {
    var myAudio = new Audio(chrome.runtime.getURL("sounds/squeak.wav"));
    myAudio.play();
  }

  startRunawayMovement() {
    var distance = 0;

    if (this.direction === RatDirection.Right) {
      var distance = document.body.clientWidth - this.posX - RatWidth;
    } else {
      var distance = -this.posX;
    }

    this.setMoving(distance);

    var self = this;
    this.element.addEventListener("webkitTransitionEnd", function() {
      self.remove();
    });

    var self = this;
    window.setTimeout(function() {
      self.remove();
    }, RatRunawayTime);
  }

  getInitialX() {
    if (this.direction === RatDirection.Right) {
      return "0px";
    }
    return (document.body.clientWidth - RatWidth) + "px";
  }

  startInitialMovement() {
    var distance = 0;

    if (this.direction === RatDirection.Right) {
      distance = this.posX;
    } else {
      var initialX = document.body.clientWidth - RatWidth;
      var distance = -(initialX - this.posX);
    }

    this.setMoving(distance);
  }

  completeInitialMovement() {
    this.removeMovingClass();
    this.element.style.left = this.posX + "px";
    this.element.style.transform = "";

    var self = this;
    this.element.addEventListener("click", function() {
      self.handleClick();
    });
  }

  getMovingClass(distance) {
    var realDistance = Math.abs(distance);
    if (realDistance < 500) {
      return "moving-05";
    } 
    if (realDistance < 1000) {
      return "moving-10";
    }
    return "moving-15";
  }

  setMoving(distance) {
    this.element.classList.add(this.getMovingClass(distance));
    this.element.style.transform = "translate3d(" + distance + "px, 0px, 0px)";
  }

  removeMovingClass() {
    this.element.classList.remove("moving-15");
    this.element.classList.remove("moving-10");
    this.element.classList.remove("moving-05");
  }
}
