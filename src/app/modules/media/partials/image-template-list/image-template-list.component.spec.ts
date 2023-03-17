import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTemplateListComponent } from './image-template-list.component';

describe('ImageTemplateListComponent', () => {
  let component: ImageTemplateListComponent;
  let fixture: ComponentFixture<ImageTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTemplateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
