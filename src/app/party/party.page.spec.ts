import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartyPage } from './party.page';

describe('PartyPage', () => {
    let component: PartyPage;
    let fixture: ComponentFixture<PartyPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PartyPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(PartyPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
