export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems(items, renderer) {
    this._items.forEach((item) => {
      this._renderer(item);
      /* return element; */
    });
  }

  addItem(element) {
    const card = this._container.append(element);
  }
}
