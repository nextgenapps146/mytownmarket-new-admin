import { Component } from '@angular/core';
import { Params, Router } from '@angular/router';
import { DealService } from 'src/services/deal.service';
import { LocationService } from 'src/services/location.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { forEach } from 'lodash';

@Component({
  selector: 'app-search-promotion',
  templateUrl: './search-promotion.page.html',
  styleUrls: ['./search-promotion.page.scss'],
})
export class SearchPromotionPage {

  promotions = [];
  selectLocation = '';
  locationDetails: any;

  searchitem = '';
  category : any;
  allCategoriesList: Array<object>;
  sliderCategoryClicked = false;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private dealService: DealService,
    public fs : AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ionViewWillEnter() {
    this.locationDetails = JSON.parse(localStorage.getItem('location'));
    this.selectLocation = this.locationDetails.name;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.category = params['category'];
      this.highlightCategory();
    });
    
    this.getPromotions();
  }

  highlightCategory() {
    let tobeDeletedIndex = null;
    const list = this.categoryService.getCategories();
    for (let i = 0; i < list.length; i++) {
      list[i]['selected'] = false;
      if (list[i]['name'] === this.category) {
        list[i]['selected'] = true;
        tobeDeletedIndex = i;
        break;
      }
    }
    if (!this.sliderCategoryClicked && tobeDeletedIndex !== null) {
      list.unshift(list[tobeDeletedIndex]);
      list.splice(tobeDeletedIndex + 1, 1);
    }
    this.allCategoriesList = list;
  }

  selectCategory(category) {
    this.sliderCategoryClicked = true;
    category['selected'] = true;
    const queryParams: Params = { category: category.name };

    this.router.navigate([], 
    {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge',
    });
    this.getPromotions(category.name);
  }

  getPromotions(category?) {
    this.dealService.getPromotionswithlocality(this.selectLocation).subscribe((res) => {
      this.promotions = res;
      this.promotions.sort();
    });
  }

  search(event){
    let searchKey : string = event.target.value;
    // let firstLetter = searchKey.toUpperCase();
    this.dealService.getPromotionssearch(this.selectLocation ,searchKey).subscribe(res => 
	    this.promotions = res 
 	  );
     console.log(searchKey);
     
 	  console.log(this.promotions)


  }

  SearchPromotion(){
    var searchitems = this.searchitem.split(''); 
    this.dealService.getPromotionssearch(this.selectLocation ,this.searchitem).subscribe(res => 
	    this.promotions = res 
 	  );
     console.log(this.searchitem);
     
 	  console.log(this.promotions)
  }

}
