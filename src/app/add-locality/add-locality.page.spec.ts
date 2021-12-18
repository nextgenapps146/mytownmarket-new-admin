import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLocalityPage } from './add-locality.page';

describe('AddLocalityPage', () => {
  let component: AddLocalityPage;
  let fixture: ComponentFixture<AddLocalityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocalityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLocalityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
