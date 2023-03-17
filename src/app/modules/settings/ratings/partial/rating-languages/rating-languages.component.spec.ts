import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingLanguagesComponent } from './rating-languages.component';

describe('RatingLanguagesComponent', () => {
  let component: RatingLanguagesComponent;
  let fixture: ComponentFixture<RatingLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingLanguagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
