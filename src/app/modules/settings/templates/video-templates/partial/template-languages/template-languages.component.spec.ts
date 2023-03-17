import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateLanguagesComponent } from './template-languages.component';

describe('TemplateLanguagesComponent', () => {
  let component: TemplateLanguagesComponent;
  let fixture: ComponentFixture<TemplateLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateLanguagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
