import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestedLocationsPage } from './requested-locations.page';

describe('RequestedLocationsPage', () => {
  let component: RequestedLocationsPage;
  let fixture: ComponentFixture<RequestedLocationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedLocationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestedLocationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
