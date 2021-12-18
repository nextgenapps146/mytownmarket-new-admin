import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact, DealService } from 'src/services/deal.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  contactModel = new Contact();
  constructor(
    private dealService: DealService,
    private utils: UtilityService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  Continue() {
    this.dealService
      .contactus(this.contactModel)
      .then(async (res) => {
        // this.isFormSubmitted = true;
        this.utils.showToast('Thank you. We will soon get back to you.');
        this.router.navigate(['home']);

      })
      .catch((err) => console.log(err));
    // this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');
    // console.log(this.storeModel.name)
  }

}
