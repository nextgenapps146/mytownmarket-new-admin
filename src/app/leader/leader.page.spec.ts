import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeaderPage } from './leader.page';

describe('LeaderPage', () => {
    let component: LeaderPage;
    let fixture: ComponentFixture<LeaderPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LeaderPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(LeaderPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
