export class CountMixin {
  _count: number = 0;

  constructor() {}

  get count(): number {
    return this._count;
  }

  set count(num: number) {
    this._count = num;
  }

  decreaseCount(num: number = 1) {
    this._count = this._count - num;
  }

  increaseCount(num: number = 1) {
    this._count = this._count + num;
  }

  resetCount() {
    this._count = 0;
  }

  setCount(num: number) {
    this._count = num;
  }
}
