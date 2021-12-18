import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchemePage } from './scheme.page';

describe('SchemePage', () => {
  let component: SchemePage;
  let fixture: ComponentFixture<SchemePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
