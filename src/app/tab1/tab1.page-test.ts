import {Component} from '@angular/core';

/*importazione libreria */
import {BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {Products} from '../product';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public scanData: string;
  public productList: any;
  public quantityRem: any;
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
    this.productList = new Map<string,Products>();
  }
  public productAdd(){
    if (!isNaN(this.quantityAdd) && this.quantityAdd>0){
      if (!this.productList.has(this.scanData)){
        this.productList.set(this.scanData,new Products());
      }
      else{
        this.productList.set(this.scanData,this.productList.get(this.scanData)+this.quantityAdd);
      }
    }
    this.quantityAdd = null;
    this.openScan();
  }
  public productRemove(product){
    this.checkNum = this.productList(product);
    if (!isNaN(this.quantityRem)){
      if (this.checkNum> this.quantityRem){
        this.productList.set(product,this.productList.get(product)-this.quantityRem);
      }
      else{
        this.productList.delete(product);
      }
    }
    this.quantityRem = null;
  }
  public openScan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scanData = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
