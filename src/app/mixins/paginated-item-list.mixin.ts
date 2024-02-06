interface Item {
  id: number;
}

export class PaginatedItemListMixin {
  _items: Item[] = [];
  _totalCount: number = 0;
  _paginatedCount: number = 0;

  constructor() {}

  get items(): Item[] {
    return this._items;
  }

  set items(items: Item[]) {
    this._items = items;
  }

  get paginatedCount() {
    return this._paginatedCount;
  }

  set paginatedCount(num: number) {
    this._paginatedCount = num;
  }

  get totalCount() {
    return this._totalCount;
  }

  set totalCount(num: number) {
    this._totalCount = num;
  }

  _increaseCounts(num: number = 1) {
    this._totalCount = this._totalCount + num;
    this._paginatedCount = this._paginatedCount + num;
  }

  _decreaseCounts(num: number = 1) {
    this._totalCount = this._totalCount - num;
    this._paginatedCount = this._paginatedCount - num;
  }

  addItem(item: Item, position: number = 0) {
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
    this._increaseCounts(items.length);
  }

  addItemsAboveId(items: Item[], id: number) {
    const index = this.items.findIndex((item) => item.id === id);
    this.addItems(items, index);
  }

  deleteAllItems() {
    this._items = [];
    this._totalCount = 0;
    this._paginatedCount = 0;
  }

  deleteItem(item: Item) {
    this.deleteItemById(item.id);
  }

  deleteItemById(id: number) {
    this._items = [...this._items?.filter((i) => i.id != id)!];
    this._decreaseCounts();
  }

  overwriteItem(item: Item) {
    const index = this.items.findIndex((i) => i.id === item.id);
    this._items![index] = item;
  }

  setItems<T extends Item>(items: T[]) {
    this._items = items;
    this._paginatedCount = items.length;
  }

  setTotalCount(num: number) {
    this._totalCount = num;
  }
}
