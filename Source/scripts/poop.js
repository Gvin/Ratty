const PoopImagePath = "images/Poop.png";

class Poop extends Entity {
  constructor(wrapperElement, rat) {
    super(wrapperElement, rat.posX + 90, rat.posY + 60);
  }

  getImagePath() {
    return PoopImagePath;
  }

  configureElement() {
    this.element.classList.add("poop");

    var self = this;
    this.element.addEventListener("click", function() {
      self.handleClick();
    });
  }

  handleClick() {
    this.remove();
  }

  remove() {
    this.wrapperElement.removeChild(this.element);
  }
}
