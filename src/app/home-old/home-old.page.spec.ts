import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeOldPage } from './home-old.page';

describe('HomeOldPage', () => {
    let component: HomeOldPage;
    let fixture: ComponentFixture<HomeOldPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeOldPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeOldPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
