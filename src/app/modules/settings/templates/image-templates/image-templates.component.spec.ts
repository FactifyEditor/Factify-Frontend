import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTemplatesComponent } from './image-templates.component';

describe('ImageTemplatesComponent', () => {
  let component: ImageTemplatesComponent;
  let fixture: ComponentFixture<ImageTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
