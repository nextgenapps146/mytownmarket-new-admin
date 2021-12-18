import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPromotionPage } from './add-promotion.page';

describe('AddPromotionPage', () => {
  let component: AddPromotionPage;
  let fixture: ComponentFixture<AddPromotionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromotionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPromotionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
