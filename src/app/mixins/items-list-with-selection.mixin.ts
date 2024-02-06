import { CountMixin } from './count.mixin';

interface Item {
  id: number;
}

export class ItemsListWithSelectionMixin extends CountMixin {
  _items: Item[] = [];
  _selectedItemId: number | null = null;

  constructor() {
    super();
  }

  get items(): Item[] {
    return this._items;
  }

  get selectedItemId(): number | null {
    return this._selectedItemId;
  }

  get selectedItem(): Item | null {
    return this._items.find((item) => item.id === this._selectedItemId) || null;
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

  clearSelection() {
    this._selectedItemId = null;
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

  hasSelectedItem() {
    return this._selectedItemId != null;
  }

  overwriteItem(item: Item) {
    const index = this.items.findIndex((i) => i.id === item.id);
    this._items![index] = item;
  }

  selectItemById(id: number) {
    this._selectedItemId = id;
  }

  selectItem(item: Item) {
    this.selectItemById(item.id);
  }

  selectFirstItem() {
    this.selectItem(this.items[0]);
  }

  selectLastItem() {
    this.selectItem(this.items[this.items.length - 1]);
  }

  setItems<T extends Item>(items: T[]) {
    this._items = items;
    this.setCount(items.length);
  }
}
