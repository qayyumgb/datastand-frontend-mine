import { CountMixin } from './count.mixin';

interface Item {
  id: number;
}

export class ItemsListMixin extends CountMixin {
  _items: Item[] = [];

  constructor() {
    super();
  }

  get items(): Item[] {
    return this._items;
  }

  set items(items: Item[]) {
    this._items = items;
  }

  addItem<T extends Item>(item: T, position: number = 0) {
    this.addItems([item], position);
  }

  addItemAboveId(item: Item, id: number) {
    this.addItemsAboveId([item], id);
  }

  addItems(items: Item[], position: number = 0) {
    this._items = [
      ...this._items!.slice(0, position),
      ...items,
      ...this._items!.slice(position),
    ];
    this.increaseCount(items.length);
  }

  addItemsAboveId(items: Item[], id: number) {
    const index = this.items.findIndex((item) => item.id === id);
    this.addItems(items, index);
  }

  deleteAllItems() {
    this._items = [];
    this.resetCount();
  }

  deleteItem(item: Item) {
    this.deleteItemById(item.id);
  }

  deleteItemById(id: number) {
    this._items = [...this._items?.filter((i) => i.id != id)!];
    this.decreaseCount();
  }

  overwriteItem(item: Item) {
    const index = this.items.findIndex((i) => i.id === item.id);
    this._items![index] = item;
  }

  setItems<T extends Item>(items: T[]) {
    this._items = items;
    this.setCount(items.length);
  }
}
