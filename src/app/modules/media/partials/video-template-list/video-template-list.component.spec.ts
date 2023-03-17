import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTemplateListComponent } from './video-template-list.component';

describe('VideoTemplateListComponent', () => {
  let component: VideoTemplateListComponent;
  let fixture: ComponentFixture<VideoTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTemplateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
