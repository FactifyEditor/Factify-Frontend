import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTemplatesComponent } from './video-templates.component';

describe('VideoTemplatesComponent', () => {
  let component: VideoTemplatesComponent;
  let fixture: ComponentFixture<VideoTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
