import { Component } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public productList: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.productList = this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }
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
  public removeItem(arr, value) {
    var index = value;
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
