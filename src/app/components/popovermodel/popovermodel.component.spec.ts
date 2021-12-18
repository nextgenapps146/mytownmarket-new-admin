import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopovermodelComponent } from './popovermodel.component';

describe('PopovermodelComponent', () => {
  let component: PopovermodelComponent;
  let fixture: ComponentFixture<PopovermodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopovermodelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopovermodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
