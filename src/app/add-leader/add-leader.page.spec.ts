import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLeaderPage } from './add-leader.page';

describe('AddLeaderPage', () => {
  let component: AddLeaderPage;
  let fixture: ComponentFixture<AddLeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
