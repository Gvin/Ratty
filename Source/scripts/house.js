const HouseImagePath = "images/House.png";
const HouseDisappearsAfter = 5000;

class House extends Entity {
  constructor(wrapperElement, rat) {
    var initialX = 0;
    if (rat.direction === RatDirection.Right) {
      initialX = document.body.clientWidth - 110;
    }

    super(wrapperElement, initialX, rat.posY + 20);
  }

  getImagePath() {
    return HouseImagePath;
  }

  configureElement() {
    this.element.classList.add("house");

    var self = this;
    window.setTimeout(function() {
      self.remove();
    }, HouseDisappearsAfter);
  }

  remove() {
    this.wrapperElement.removeChild(this.element);
  }
}
