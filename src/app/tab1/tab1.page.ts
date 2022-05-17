/* eslint-disable max-len */
import {Component} from '@angular/core';

/*importazione libreria */
import {BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {Products} from '../product';
import {NavigationExtras, Router} from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page{
  public scanData: string;
  public productList: any;
  public quantityAdd: any;
  public lotNumber: any;
  public expiration: any;
  /*passaggio variabile al costruttore, come fatto per HttpClient */
  constructor(private barcodeScanner: BarcodeScanner,private router: Router) {
    /*attivazione e lettura del codice a barre */
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scanData = barcodeData.text;
      this.productList = [];
      this.router = router;
    }).catch(err => {
      console.log('Error', err);
    });
  }
  /** Questo metodo controlla prima che il numero passato dall'applicazione sia effettivamente un numero, e maggiore di 0;
   *  dopodichè farà un cotrollo richiamando il metodo indexOfProduct per vedere se un prodotto esiste già, se non contiene
   *  il prodotto scannerizzato, allora creerà una nuova istanza di prodotto*/
  public productAdd(){
    if (!isNaN(this.quantityAdd) && this.quantityAdd > 0 && this.scanData !== ''
          && this.lotNumber !== '' && this.expiration !== '') {
      if (this.indexOfProduct(this.scanData,this.lotNumber) === -1) {
        const prod = new Products();
        prod.productCode = this.scanData;
        prod.quantity = parseInt(this.quantityAdd,10);
        prod.lotNumber = this.lotNumber;
        prod.expirationData = this.expiration;
        this.productList.push(prod);
      }
      else{
        this.productList[this.indexOfProduct(this.scanData,this.lotNumber)].quantity += parseInt(this.quantityAdd,10);
      }
      this.quantityAdd = null;
      this.lotNumber = null;
      this.expiration = null;
      this.openScan();
    }
  }
  /**
   * Questo metodo riceve in argomento un codice di un prodotto ed il suo indice dell'array, controlla che la quantità rimuovibile sia inferiore alla quantità disponbile,
   * e se effettivamente è inferiore, allora la scala dalla quantità totale del prodotto e azzera la quantità rimuovibile, se la quantità rimuovibile e uguale o superiore
   * alla quantità del prodotto, allora viene richiamato il metodo productRemove che rimuoverà il prodotto in questione
   *
   * @param product
   * @param i
   */
  public productRemove(product, i) {
    if (this.productList[i].removableQuantity > 0){
      if (this.productList[i].removableQuantity < this.productList[i].quantity) {
        this.productList[i].quantity -= this.productList[i].removableQuantity;
      }
      else {
        this.productList = this.removeItem(this.productList, i);
      }
    }
    this.productList[i].removableQuantity = null;
  }

  /**
   * Questo metodo aprirà il lettore di codici
   */
  public openScan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scanData = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }
  /**
   * Questo metodo viene utilizzato per cercare l'indice di un prodotto nell'array partendo dal suo codice ed il suo numero di lotto
   * , i due parametri del metodo.
   *
   * @param product
   * @param productLot
   */
  public indexOfProduct(productCode,productLot) {
    if (this.productList.length === 0) {
      return -1;
    }
    for (let i = 0; i < this.productList.length; i++){
      if (productCode === this.productList[i].productCode &&
          productLot === this.productList[i].lotNumber){
        return i;
      }
    }
    return -1;
  }
  /**
   * Questo metodo ha 2 parametri: un array da cui verrai tolto un elemento, e l'indice dell'elemento che verrà rimosso;
   * ritornerà l'array in questione senza l'elemento che è stato rimosso.
   *
   * @param arr
   * @param value
   */
  public removeItem(arr, value) {
    const index = value;
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  /**
   * Metodo che serve al tag "Disabled" per sapere quando disabilitare l'input, ovvero quando la stringa
   * del prodotto è vuota.
   */
  public inputDisable(){
    return this.scanData === '';
  }
  public passData(){
      const navigationExtras: NavigationExtras = {
        state: {
          productList: this.productList
        }
      };
      this.router.navigate(['tab2'], navigationExtras);
  }
}
