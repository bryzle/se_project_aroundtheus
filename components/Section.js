export default class Section {
    constructor({items, renderer},containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;

    }

    renderItems() {
        this._items.forEach( (item) =>{
            const element = this._renderer(item);
            return element;
        })}

    addItems(element) {
        const card = this._containerSelector.append(element);
        return card;
    }
    
}