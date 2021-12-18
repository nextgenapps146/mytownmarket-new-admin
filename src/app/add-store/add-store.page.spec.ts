import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddStorePage } from './add-store.page';

describe('AddStorePage', () => {
  let component: AddStorePage;
  let fixture: ComponentFixture<AddStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
