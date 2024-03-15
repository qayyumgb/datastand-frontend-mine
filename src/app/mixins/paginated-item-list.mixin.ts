import { BehaviorSubject, Observable } from 'rxjs';

import { Item } from './item.interface';

export class PaginatedItemListMixin {
  private _items = new BehaviorSubject<Item[]>([]);
  public readonly items$: Observable<Item[]> = this._items.asObservable();
  private _totalCount: number = 0;
  private _paginatedCount: number = 0;

  constructor() {}

  get items(): Item[] {
    return this._items.getValue();
  }

  set items(items: Item[]) {
    this._items.next(items);
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
    const currentItems = this.items;
    const updatedItems = [
      ...currentItems.slice(0, position),
      ...items,
      ...currentItems.slice(position),
    ];
    this.items = updatedItems;
    this._increaseCounts(items.length);
  }

  addItemsAboveId(items: Item[], id: number) {
    const index = this.items.findIndex((item) => item.id === id);
    this.addItems(items, index);
  }

  deleteAllItems() {
    this.items = [];
    this._totalCount = 0;
    this._paginatedCount = 0;
  }

  deleteItem(item: Item) {
    this.deleteItemById(item.id);
  }

  deleteItemById(id: number) {
    const updatedItems = this.items.filter((i) => i.id !== id);
    this.items = updatedItems;
    this._decreaseCounts();
  }

  overwriteItem(item: Item) {
    const index = this.items.findIndex((i) => i.id === item.id);
    const updatedItems = [...this.items];
    updatedItems[index] = item;
    this.items = updatedItems;
  }

  setItems<T extends Item>(items: T[]) {
    this.items = items;
    this._paginatedCount = items.length;
  }

  setTotalCount(num: number) {
    this._totalCount = num;
  }
}
