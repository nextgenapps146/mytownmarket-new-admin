import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPromotionPage } from './search-promotion.page';

describe('SearchPromotionPage', () => {
  let component: SearchPromotionPage;
  let fixture: ComponentFixture<SearchPromotionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPromotionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPromotionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
