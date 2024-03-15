import { BehaviorSubject, Observable, map } from 'rxjs';

import { Item } from './item.interface';
import { PaginatedItemListMixin } from './paginated-item-list.mixin';

export class PaginatedItemListWithMultiSelectionMixin extends PaginatedItemListMixin {
  private selectedItemIdsSubject = new BehaviorSubject<number[]>([]);
  public readonly selectedItemIds$: Observable<number[]> =
    this.selectedItemIdsSubject.asObservable();
  public readonly numSelectedItems$: Observable<number> =
    this.selectedItemIds$.pipe(
      map((selectedItemIds) => selectedItemIds.length)
    );

  constructor() {
    super();
  }

  get selectedItemIds(): number[] {
    return this.selectedItemIdsSubject.getValue();
  }

  set selectedItemIds(ids: number[]) {
    this.selectedItemIdsSubject.next(ids);
  }

  clearSelection(): void {
    this.selectedItemIds = [];
  }

  override deleteAllItems(): void {
    super.deleteAllItems();
    this.clearSelection();
  }

  override deleteItem(item: Item): void {
    super.deleteItem(item);
    this.deselectItem(item);
  }

  override deleteItemById(id: number): void {
    super.deleteItemById(id);
    this.deselectItemById(id);
  }

  deselectItem(item: Item): void {
    this.deselectItemById(item.id);
  }

  deselectItemById(id: number): void {
    const index = this.selectedItemIds.indexOf(id);
    if (index !== -1) {
      const updatedIds = [...this.selectedItemIds];
      updatedIds.splice(index, 1);
      this.selectedItemIds = updatedIds;
    }
  }

  getSelectedItems(): Item[] {
    return this.items.filter((item) => this.selectedItemIds.includes(item.id));
  }

  isItemIdSelected(id: number): boolean {
    return this.selectedItemIds.includes(id);
  }

  isItemSelected(item: Item): boolean {
    return this.isItemIdSelected(item.id);
  }

  isAnyItemSelected(): boolean {
    return this.selectedItemIds.length > 0;
  }

  selectAllItems(): void {
    this.selectedItemIds = this.items.map((item) => item.id);
  }

  selectItemById(id: number): void {
    if (!this.selectedItemIds.includes(id)) {
      const updatedIds = [...this.selectedItemIds, id];
      this.selectedItemIds = updatedIds;
    }
  }

  selectItem(item: Item): void {
    this.selectItemById(item.id);
  }

  toggleSelectAllItems(): void {
    if (this.selectedItemIds.length > 0) {
      this.clearSelection();
    } else {
      this.selectAllItems();
    }
  }
}
