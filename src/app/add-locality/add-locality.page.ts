import { Component, OnInit } from '@angular/core';
import { Locality, LocationService } from 'src/services/location.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-add-locality',
  templateUrl: './add-locality.page.html',
  styleUrls: ['./add-locality.page.scss'],
})
export class AddLocalityPage implements OnInit {
  localityModel = new Locality();
  cities = [];
  city = '';
  constructor(
    private locationService: LocationService,
    private utils: UtilityService
  ) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.locationService.getCities().subscribe((res) => {
        this.cities = res;
        this.cities.sort();

        console.log(this.cities)
    });
}

setCity(e) {
  this.city = e.target.value;
  this.localityModel.city = this.city;
  console.log(this.city)
}

createCity() {
  this.locationService
    .createCity(this.localityModel)
    .then(async (result) => {
      this.utils.showToast('Locality Created');
    })
    .catch((err) => console.log(err));
  console.log(this.localityModel.name)
}

}
