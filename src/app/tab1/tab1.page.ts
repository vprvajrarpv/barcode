import {Component} from '@angular/core';

/*importazione libreria */
import {BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {Products} from '../product';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page{
  public scanData: string;
  public productList: Products[];
  public quantityRem: number;
  public quantityAdd: any;
  private checkNum: number;
  /*passaggio variabile al costruttore, come fatto per HttpClient */
  constructor(private barcodeScanner: BarcodeScanner) {
    /*attivazione e lettura del codice a barre */
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scanData = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  public productAdd(){
    if (!isNaN(this.quantityAdd) && this.quantityAdd>0){
      if (this.indexOfProduct(this.scanData)===-1){
        var prod = new Products();
        this.productList.push(prod);
      }
      else{
        this.productList[this.indexOfProduct(this.scanData)].quantity += parseInt(this.quantityAdd,10);
      }
    }
    this.quantityAdd = null;
    this.openScan();
  }
  public productRemove(product,i){
    if (this.productList[i].removableQuantity<this.productList[i].quantity){
      this.productList[i].quantity -= this.productList[i].removableQuantity;
      this.productList[i].removableQuantity = null;
    }
    else {
      this.productList = this.removeItem(this.productList, i);
    }
  }
  public openScan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scanData = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }
  public hasProduct() {
    if (this.productList.length === 0) {
      return -1;
    }
    for (let i = 0; i < this.productList.length; i++) {
      if (this.scanData === this.productList[i].productCode){
        return i;
      }
    }
    return -1;
  }
  public indexOfProduct(product) {
    if (this.productList.length === 0) {
      return -1;
    }
    for (let i = 0; i < this.productList.length; i++){
      if (product === this.productList[i].productCode){
        return i;
      }
    }
    return -1;
  }
  public removeItem(arr, value) {
    var index = value;
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
