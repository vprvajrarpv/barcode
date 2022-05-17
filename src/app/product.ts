export class Products{
  private _productCode: any;
  private _quantity: number;
  private _removableQuantity: number;
  private _lotNumber: any;
  private _expirationData: any;
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

  get lotNumber(): any {
    return this._lotNumber;
  }

  set lotNumber(value: any) {
    this._lotNumber = value;
  }

  get expirationData(): any {
    return this._expirationData;
  }

  set expirationData(value: any) {
    this._expirationData = value;
  }
}
