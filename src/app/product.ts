export class Products{
  private _productCode: any;
  private _quantity: any;
  private _removableQuantity: any;
  constructor() {
  }


  get productCode(): any {
    return this._productCode;
  }

  set productCode(value: any) {
    this._productCode = value;
  }

  get quantity(): any {
    return this._quantity;
  }

  set quantity(value: any) {
    this._quantity = value;
  }

  get removableQuantity(): any {
    return this._removableQuantity;
  }

  set removableQuantity(value: any) {
    this._removableQuantity = value;
  }
}
