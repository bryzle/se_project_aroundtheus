export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      return element;
    });
  }

  addItem(element) {
    const card = this._container.append(element);
  }
}
