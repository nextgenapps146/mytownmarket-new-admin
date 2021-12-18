import { Component, OnInit } from '@angular/core';
import { DealService } from 'src/services/deal.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {
  stores = [];
  locationDetails: any;
  selectLocation = '';
  constructor(
    private dealService: DealService
  ) { }

  ngOnInit() {
    this.locationDetails = JSON.parse(localStorage.getItem('location'));
    this.selectLocation = this.locationDetails.name;
    this.getStores();
  }
  getStores() {
    this.dealService.getStoreswithlocality(this.selectLocation).subscribe((res) => {
      this.stores = res;
      this.stores.sort();
      console.log(this.stores)
    });
  }

}
