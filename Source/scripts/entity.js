class Entity {
  constructor(wrapperElement, posX, posY) {
  	this.posX = posX;
  	this.posY = posY;
  	this.wrapperElement = wrapperElement;
  }

  create() {
  	this.element = document.createElement("div");

    this.element.style.backgroundImage = "url(" + chrome.runtime.getURL(this.getImagePath()) + ")";

  	this.element.classList.add("entity");

    this.element.style.left = this.posX + "px";
    this.element.style.top = this.posY + "px";

  	this.configureElement();

    this.wrapperElement.appendChild(this.element);
  }

  getImagePath() {
    // Will be overriden in child classes.
  }

  configureElement() {
  	// Will be overriden in child classes.
  }
}
