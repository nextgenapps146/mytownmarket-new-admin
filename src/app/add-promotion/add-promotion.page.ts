import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealService, Promotion } from 'src/services/deal.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.page.html',
  styleUrls: ['./add-promotion.page.scss'],
})
export class AddPromotionPage implements OnInit {
  promotionModel = new Promotion;
  promotionId = "";
  type = 'add';
  selectedPromotion: any;
  keyword: any;
  uid = '';
  constructor(
    private dealService: DealService,
    private utils: UtilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.uid = localStorage.getItem("uid");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.promotionId = params['promotionId'];
      if (params['type'] !== null && params['type'] !== undefined) {
        this.type = params['type'];
      }
      if (this.type === 'edit') {
        this.getPromotionInfo();
      }
      console.log(this.promotionId);
      console.log(this.type);

    });

  }

  getPromotionInfo() {
    this.dealService.getPromotion(this.promotionId).then((result) => {
      if (result.data() !== undefined) {
        this.selectedPromotion = result.data();
        this.promotionModel.name = this.selectedPromotion['name'];
        this.promotionModel.quantity = this.selectedPromotion['quantity'];
        this.promotionModel.saleprice = this.selectedPromotion['saleprice'];
        this.promotionModel.regularprice = this.selectedPromotion['regularprice'];
        this.promotionModel.type = this.selectedPromotion['type'];
        this.promotionModel.offer = this.selectedPromotion['offer'];
        this.promotionModel.category = this.selectedPromotion['category'];
        // this.userid = this.selectedLocation['createdbyid'];
      }
    });
  }

  async Continue() {
    if (this.type === 'add') {
      this.createPromotion();
    } else if (this.type === 'edit') {
      this.updatePromotion();
    }

  }

  createPromotion() {
    this.dealService
      .createPromotion(this.promotionModel)
      .then(async (res) => {
        // this.isFormSubmitted = true;
        this.utils.showToast('Promotion Created successfully');
        this.router.navigate(['my-store']);

      })
      .catch((err) => console.log(err));
    // this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');
    console.log(this.promotionModel.name)
  }


  updatePromotion() {
    this.dealService.updatePromotion(this.promotionId, this.promotionModel)
      .then(async (result) => {
        this.utils.showToast("Promotion  is Updated");
        this.router.navigate(['my-store']);
      })
      .catch((err) => console.log(err));
    // this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');
  }

  isContinueBtnEnable() {
    const p = this.promotionModel;
    if (p.type === '1') {
      return p.name && p.quantity && p.regularprice && p.saleprice && p.category ? true : false;
    } else if (p.type === '2') {
      p.quantity = '1';
      p.regularprice = 'na';
      p.saleprice = 'na';
      return p.name && p.quantity && p.regularprice && p.saleprice && p.category && p.offer ? true : false;
    }
  }

}
