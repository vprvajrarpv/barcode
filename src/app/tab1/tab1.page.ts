import {Component} from '@angular/core';

/*importazione libreria */
import {BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public scanData: any;
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


}
